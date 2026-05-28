"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";

import { createId } from "@/lib/notes/ids";
import { NOTE_COLORS } from "@/lib/notes/palette";

type StackNote = {
  id: number;
  lines: string[];
  color: string;
};

type NoteStack = {
  id: number;
  notes: StackNote[];
};

const ROTATIONS = [2, -5, -9, -13, -17, -21];
const OFFSETS = [
  { x: 0, y: 0 },
  { x: -10, y: 8 },
  { x: 8, y: 14 },
  { x: -14, y: 20 },
  { x: 6, y: 26 },
  { x: -8, y: 32 },
];

const INITIAL_STACKS: NoteStack[] = [
  {
    id: 1,
    notes: [
      { id: 11, lines: ["nudges.", "not answers."], color: NOTE_COLORS[0] },
      { id: 12, lines: ["type here..."], color: NOTE_COLORS[2] },
      { id: 13, lines: ["another idea..."], color: NOTE_COLORS[1] },
    ],
  },
];

export function PostitStackedBoard({ editable = false }: { editable?: boolean }) {
  const [stacks, setStacks] = useState(INITIAL_STACKS);
  const [colorCursor, setColorCursor] = useState(0);

  function nextColor() {
    const next = (colorCursor + 1) % NOTE_COLORS.length;
    setColorCursor(next);
    return NOTE_COLORS[next];
  }

  function updateLine(stackId: number, noteId: number, lineIndex: number, value: string) {
    if (!editable) return;
    setStacks((current) =>
      current.map((stack) =>
        stack.id !== stackId
          ? stack
          : {
              ...stack,
              notes: stack.notes.map((note) =>
                note.id !== noteId
                  ? note
                  : {
                      ...note,
                      lines: note.lines.map((line, index) => (index === lineIndex ? value : line)),
                    },
              ),
            },
      ),
    );
  }

  function addLine(stackId: number, noteId: number, lineIndex: number) {
    if (!editable) return;
    setStacks((current) =>
      current.map((stack) =>
        stack.id !== stackId
          ? stack
          : {
              ...stack,
              notes: stack.notes.map((note) =>
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
            },
      ),
    );
  }

  function bringToFront(stackId: number, noteId: number) {
    if (!editable) return;
    setStacks((current) =>
      current.map((stack) => {
        if (stack.id !== stackId) return stack;
        const note = stack.notes.find((entry) => entry.id === noteId);
        if (!note) return stack;
        return {
          ...stack,
          notes: [note, ...stack.notes.filter((entry) => entry.id !== noteId)],
        };
      }),
    );
  }

  function deleteNote(stackId: number, noteId: number) {
    if (!editable) return;
    setStacks((current) =>
      current
        .map((stack) =>
          stack.id !== stackId
            ? stack
            : { ...stack, notes: stack.notes.filter((note) => note.id !== noteId) },
        )
        .filter((stack) => stack.notes.length > 0),
    );
  }

  function addNoteToLastStack() {
    if (!editable) return;
    if (stacks.length === 0) {
      addStack();
      return;
    }

    const color = nextColor();
    setStacks((current) =>
      current.map((stack, index) =>
        index !== current.length - 1
          ? stack
          : {
              ...stack,
              notes: [
                { id: createId(), lines: ["new note..."], color },
                ...stack.notes,
              ],
            },
      ),
    );
  }

  function addStack() {
    if (!editable) return;
    const color = nextColor();
    setStacks((current) => [
      ...current,
      {
        id: createId(),
        notes: [{ id: createId(), lines: ["new note..."], color }],
      },
    ]);
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col items-center gap-4 [font-family:var(--font-caveat)]">
      <div className="flex flex-wrap items-center justify-center gap-10">
        {stacks.map((stack) => (
          <div key={stack.id} className="flex flex-col items-center">
            <div className="relative h-[260px] w-[240px]">
              {[...stack.notes].reverse().map((note, reverseIndex) => {
                const noteIndex = stack.notes.length - 1 - reverseIndex;
                const layer = noteIndex;
                const isFront = noteIndex === 0;
                const rotation = ROTATIONS[Math.min(layer, ROTATIONS.length - 1)];
                const offset = OFFSETS[Math.min(layer, OFFSETS.length - 1)];

                return (
                  <article
                    key={note.id}
                    onClick={editable ? () => !isFront && bringToFront(stack.id, note.id) : undefined}
                    className="absolute left-[10px] top-[10px] min-h-[220px] w-[220px] rounded-[2px_2px_4px_4px] transition duration-300"
                    style={{
                      background: note.color,
                      zIndex: stack.notes.length - layer,
                      transform: `rotate(${rotation}deg) translate(${offset.x}px, ${offset.y}px)`,
                      boxShadow: isFront
                        ? "0 3px 8px rgba(0,0,0,.12), 0 8px 24px rgba(0,0,0,.10)"
                        : "0 1px 4px rgba(0,0,0,.09), 0 3px 8px rgba(0,0,0,.07)",
                      cursor: editable ? (isFront ? "default" : "pointer") : "default",
                    }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[26px] rounded-t-[2px] bg-black/7" />
                    {editable ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteNote(stack.id, note.id);
                        }}
                        className="absolute right-2 top-1.5 z-10 rounded p-1 text-black/30 opacity-0 transition hover:bg-black/8 hover:text-red-700 hover:opacity-100"
                        aria-label="Delete note"
                      >
                        <X className="size-3.5" />
                      </button>
                    ) : null}
                    {!isFront ? (
                      <span className="absolute bottom-2 right-2.5 text-xs text-black/20">
                        {layer + 1}/{stack.notes.length}
                      </span>
                    ) : null}
                    <div className="relative z-10 p-[42px_20px_22px]">
                      {note.lines.map((line, lineIndex) => (
                        <textarea
                          key={lineIndex}
                          value={line}
                          rows={1}
                          spellCheck={false}
                          readOnly={!editable}
                          onClick={editable ? (event) => event.stopPropagation() : undefined}
                          onKeyDown={
                            editable
                              ? (event) => {
                                  if (event.key !== "Enter") return;
                                  event.preventDefault();
                                  addLine(stack.id, note.id, lineIndex);
                                }
                              : undefined
                          }
                          onChange={
                            editable
                              ? (event) =>
                                  updateLine(stack.id, note.id, lineIndex, event.target.value)
                              : undefined
                          }
                          className="block w-full resize-none overflow-hidden border-0 border-b border-transparent bg-transparent text-[22px] leading-[1.5] text-[#1a1408] font-normal outline-none transition focus:border-b-black/20 read-only:cursor-default"
                        />
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-2 text-[13px] tracking-[0.03em] text-black/35">
              {stack.notes.length} note
            </div>
          </div>
        ))}
      </div>

      {editable ? (
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={addNoteToLastStack}
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-dashed border-black/20 bg-white/70 px-4 py-2 text-[17px] text-[#555] transition hover:scale-105 hover:border-black/35 hover:bg-white/95"
          >
            <Plus className="size-4" />
            Add note
          </button>
          <button
            type="button"
            onClick={addStack}
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-dashed border-black/20 bg-white/70 px-4 py-2 text-[17px] text-[#555] transition hover:scale-105 hover:border-black/35 hover:bg-white/95"
          >
            <Plus className="size-4" />
            New stack
          </button>
        </div>
      ) : null}
    </div>
  );
}
