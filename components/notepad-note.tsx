"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const INITIAL_LINES = [
  "no ads.",
  "no browser",
  "no app store",
  "no social media",
  "no TikTok",
  "no camera",
  "no tracking",
  "no data-selling",
];

export function NotepadNote({ editable = false }: { editable?: boolean }) {
  const [lines, setLines] = useState(INITIAL_LINES);

  function updateLine(index: number, value: string) {
    if (!editable) return;
    setLines((current) => current.map((line, i) => (i === index ? value : line)));
  }

  function addLine() {
    if (!editable) return;
    setLines((current) => [...current, ""]);
  }

  function removeLastLine() {
    if (!editable) return;
    setLines((current) => (current.length > 1 ? current.slice(0, -1) : current));
  }

  function removeLine(index: number) {
    if (!editable) return;
    setLines((current) => {
      if (current.length <= 1) return current;
      return current.filter((_, i) => i !== index);
    });
  }

  return (
    <div className="flex w-full max-w-[320px] flex-col items-center gap-3 [font-family:var(--font-caveat)]">
      <div className="relative min-h-[380px] w-[280px] rotate-[-2deg] rounded-[3px_3px_4px_4px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.10),0_8px_24px_rgba(0,0,0,0.06)] transition duration-300 hover:translate-y-[-3px] hover:scale-[1.01] hover:shadow-[0_2px_4px_rgba(0,0,0,0.09),0_8px_24px_rgba(0,0,0,0.14),0_16px_40px_rgba(0,0,0,0.08)]">
        <div
          className="pointer-events-none absolute inset-0 rounded-inherit"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent 0px, transparent 27px, #c5d4f0 27px, #c5d4f0 28px)",
            backgroundPosition: "0 16px",
            opacity: 0.55,
          }}
        />
        <div className="pointer-events-none absolute bottom-0 left-[54px] top-0 w-[1.5px] bg-[#e8a0a0] opacity-85" />
        <div className="relative z-10 px-5 pb-7 pl-[68px] pt-5">
          {lines.map((line, index) => (
            <div key={index} className="flex h-7 items-center gap-2.5">
              {editable ? (
                <button
                  type="button"
                  onClick={() => removeLine(index)}
                  className="mt-px shrink-0 text-[15px] leading-none font-bold text-[#d64040] transition hover:opacity-75"
                  aria-label={`Remove line ${index + 1}`}
                >
                  x
                </button>
              ) : (
                <span aria-hidden className="w-[14px]" />
              )}
              <input
                value={line}
                spellCheck={false}
                readOnly={!editable}
                onChange={editable ? (event) => updateLine(index, event.target.value) : undefined}
                className="h-7 w-full border-0 border-b border-transparent bg-transparent text-[18px] leading-7 text-[#1a1a1a] font-normal outline-none transition focus:border-b-[rgba(214,64,64,0.3)] read-only:cursor-default"
              />
            </div>
          ))}
        </div>
      </div>

      {editable ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addLine}
            className="inline-flex items-center gap-1 rounded-full border border-black/15 px-4 py-1.5 text-[15px] text-[#444] transition hover:border-black/30 hover:bg-black/6"
          >
            <Plus className="size-3.5" />
            Add line
          </button>
          <button
            type="button"
            onClick={removeLastLine}
            className="inline-flex items-center gap-1 rounded-full border border-black/15 px-4 py-1.5 text-[15px] text-[#444] transition hover:border-black/30 hover:bg-black/6"
          >
            <Minus className="size-3.5" />
            Remove last
          </button>
        </div>
      ) : null}
    </div>
  );
}
