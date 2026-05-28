"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

import { createId } from "@/lib/notes/ids";
import { NOTE_COLORS } from "@/lib/notes/palette";
import { cn } from "@/lib/utils";

type NoteCard = {
  id: number;
  mode: "list" | "text";
  lines: string[];
  text: string;
  color: string;
  rotation: string;
};

const ROTATIONS = ["rotate-[-3deg]", "rotate-[2.5deg]", "rotate-[-1.5deg]", "rotate-[3.5deg]", "rotate-[-2.5deg]", "rotate-[1deg]"];
const FIXED_SIZE_MAX_LINES = 6;

const INITIAL_NOTES: NoteCard[] = [
  {
    id: 1,
    mode: "list",
    lines: ["nudges.", "not answers."],
    text: "",
    color: NOTE_COLORS[0],
    rotation: ROTATIONS[1],
  },
  {
    id: 2,
    mode: "text",
    lines: [],
    text: "type here...",
    color: NOTE_COLORS[2],
    rotation: ROTATIONS[0],
  },
];

export function PostitCardsBoard({ editable = false }: { editable?: boolean }) {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [colorIndex, setColorIndex] = useState(1);
  const [fixedSize, setFixedSize] = useState(true);
  const [pendingFocus, setPendingFocus] = useState<{ noteId: number; lineIndex: number } | null>(
    null,
  );

  useEffect(() => {
    if (!editable) return;
    if (!pendingFocus) return;
    const element = document.querySelector<HTMLTextAreaElement>(
      `[data-note-id="${pendingFocus.noteId}"][data-line-index="${pendingFocus.lineIndex}"]`,
    );
    if (!element) return;
    element.focus();
    setPendingFocus(null);
  }, [notes, pendingFocus]);

  function updateLine(noteId: number, lineIndex: number, value: string) {
    if (!editable) return;
    setNotes((current) =>
      current.map((note) =>
        note.id === noteId
          ? {
              ...note,
              lines: note.lines.map((line, index) => (index === lineIndex ? value : line)),
            }
          : note,
      ),
    );
  }

  function addLine(noteId: number, lineIndex: number) {
    if (!editable) return;
    setPendingFocus({ noteId, lineIndex: lineIndex + 1 });
    setNotes((current) =>
      current.map((note) =>
        note.id !== noteId
          ? note
          : {
              ...note,
              lines: [
                ...note.lines.slice(0, lineIndex + 1),
                "",
                ...note.lines.slice(lineIndex + 1),
              ],
            },
      ),
    );
  }

  function deleteLine(noteId: number, lineIndex: number) {
    if (!editable) return;
    setNotes((current) =>
      current.map((note) => {
        if (note.id !== noteId || note.lines.length <= 1) return note;
        return {
          ...note,
          lines: note.lines.filter((_, index) => index !== lineIndex),
        };
      }),
    );
    setPendingFocus({ noteId, lineIndex: Math.max(0, lineIndex - 1) });
  }

  function updateText(noteId: number, value: string) {
    if (!editable) return;
    setNotes((current) =>
      current.map((note) => (note.id === noteId ? { ...note, text: value } : note)),
    );
  }

  function deleteNote(noteId: number) {
    if (!editable) return;
    setNotes((current) => current.filter((note) => note.id !== noteId));
  }

  function addNote(mode: "list" | "text") {
    if (!editable) return;
    const nextIndex = (colorIndex + 2) % NOTE_COLORS.length;
    setColorIndex(nextIndex);
    setNotes((current) => [
      ...current,
      {
        id: createId(),
        mode,
        lines: mode === "list" ? ["new line..."] : [],
        text: mode === "text" ? "type here..." : "",
        color: NOTE_COLORS[nextIndex],
        rotation: ROTATIONS[current.length % ROTATIONS.length],
      },
    ]);
  }

  return (
    <div className="flex w-full max-w-[340px] flex-col items-center gap-4 [font-family:var(--font-caveat)]">
      {editable ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setFixedSize(true)}
            className={cn(
              "rounded-full border px-3 py-1 text-[15px] transition",
              fixedSize
                ? "border-black/35 bg-white/90 text-[#333]"
                : "border-black/20 bg-white/60 text-[#666] hover:bg-white/80",
            )}
          >
            Fixed size
          </button>
          <button
            type="button"
            onClick={() => setFixedSize(false)}
            className={cn(
              "rounded-full border px-3 py-1 text-[15px] transition",
              !fixedSize
                ? "border-black/35 bg-white/90 text-[#333]"
                : "border-black/20 bg-white/60 text-[#666] hover:bg-white/80",
            )}
          >
            Flexible height
          </button>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {notes.map((note) => (
          <article
            key={note.id}
            className={cn(
              "group relative w-[220px] shrink-0 rounded-[2px_2px_4px_4px] transition duration-300 hover:z-10 hover:translate-y-[-6px] hover:scale-[1.02]",
              fixedSize ? "h-[220px] overflow-hidden" : "min-h-[220px]",
              note.rotation,
            )}
            style={{
              background: note.color,
              boxShadow: "0 2px 6px rgba(0,0,0,.10), 0 6px 18px rgba(0,0,0,.08)",
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[26px] rounded-t-[2px] bg-black/7" />
            {editable ? (
              <button
                type="button"
                onClick={() => deleteNote(note.id)}
                className="absolute right-2 top-1.5 z-10 rounded p-1 text-black/30 opacity-0 transition hover:bg-black/8 hover:text-red-700 group-hover:opacity-100"
                aria-label="Delete note"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
            <div className="relative z-10 p-[42px_20px_22px]">
              {note.mode === "list" ? (
                note.lines.map((line, lineIndex) => (
                  <textarea
                    key={lineIndex}
                    data-note-id={note.id}
                    data-line-index={lineIndex}
                    value={line}
                    rows={1}
                    spellCheck={false}
                    readOnly={!editable}
                    onKeyDown={
                      editable
                        ? (event) => {
                            if (event.key === "Backspace" && line === "") {
                              event.preventDefault();
                              deleteLine(note.id, lineIndex);
                              return;
                            }
                            if (event.key !== "Enter") return;
                            if (fixedSize && note.lines.length >= FIXED_SIZE_MAX_LINES) return;
                            event.preventDefault();
                            addLine(note.id, lineIndex);
                          }
                        : undefined
                    }
                    onChange={
                      editable ? (event) => updateLine(note.id, lineIndex, event.target.value) : undefined
                    }
                    className="block w-full resize-none overflow-hidden border-0 border-b border-transparent bg-transparent text-[22px] leading-[1.5] text-[#1a1408] font-normal outline-none transition focus:border-b-black/20 read-only:cursor-default"
                  />
                ))
              ) : (
                <textarea
                  value={note.text}
                  spellCheck={false}
                  readOnly={!editable}
                  onChange={editable ? (event) => updateText(note.id, event.target.value) : undefined}
                  onInput={
                    editable
                      ? (event) => {
                          const element = event.currentTarget;
                          element.style.height = "0px";
                          element.style.height = `${element.scrollHeight}px`;
                        }
                      : undefined
                  }
                  className="block min-h-[136px] w-full resize-none overflow-hidden border-0 bg-transparent text-[22px] leading-[1.5] text-[#1a1408] font-normal outline-none read-only:cursor-default"
                />
              )}
            </div>
          </article>
        ))}
      </div>

      {editable ? (
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => addNote("list")}
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-dashed border-black/20 bg-white/70 px-5 py-2 text-[18px] text-[#555] transition hover:scale-105 hover:border-black/35 hover:bg-white/95"
          >
            <Plus className="size-4" />
            New list
          </button>
          <button
            type="button"
            onClick={() => addNote("text")}
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-dashed border-black/20 bg-white/70 px-5 py-2 text-[18px] text-[#555] transition hover:scale-105 hover:border-black/35 hover:bg-white/95"
          >
            <Plus className="size-4" />
            New text
          </button>
        </div>
      ) : null}
    </div>
  );
}
