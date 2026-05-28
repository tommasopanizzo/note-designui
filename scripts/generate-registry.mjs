import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const presets = [
  {
    name: "note-notepad",
    fileName: "note-notepad.tsx",
    exportName: "NoteNotepad",
    title: "Note Notepad",
    description: "Ruled notepad note with editable lines.",
    source: `"use client";

import { NotepadNote } from "@/components/notepad-note";

export function NoteNotepad() {
  return <NotepadNote />;
}
`,
  },
  {
    name: "note-cards",
    fileName: "note-cards.tsx",
    exportName: "NoteCards",
    title: "Note Cards",
    description: "Free board of editable post-it cards.",
    source: `"use client";

import { PostitCardsBoard } from "@/components/postit-cards-board";

export function NoteCards() {
  return <PostitCardsBoard />;
}
`,
  },
  {
    name: "note-stacked",
    fileName: "note-stacked.tsx",
    exportName: "NoteStacked",
    title: "Note Stacked",
    description: "Editable stacked notes with bring-to-front interaction.",
    source: `"use client";

import { PostitStackedBoard } from "@/components/postit-stacked-board";

export function NoteStacked() {
  return <PostitStackedBoard />;
}
`,
  },
];

const presetItems = [];
const defaultDir = path.join(root, "registry", "default");
fs.rmSync(defaultDir, { recursive: true, force: true });

for (const preset of presets) {
  const dir = path.join(defaultDir, preset.name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, preset.fileName), preset.source);
  presetItems.push({
    name: preset.name,
    type: "registry:component",
    title: preset.title,
    description: preset.description,
    registryDependencies: ["@chumy/note-core"],
    dependencies: ["clsx", "tailwind-merge"],
    categories: ["note"],
    files: [{ path: `registry/default/${preset.name}/${preset.fileName}`, type: "registry:component" }],
  });
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "chumy",
  homepage: "https://github.com/tommasopanizzo/note-designui",
  items: [
    {
      name: "note-core",
      type: "registry:ui",
      title: "Note Core",
      description: "Editable note components adapted from raw HTML experiments.",
      dependencies: ["clsx", "tailwind-merge", "lucide-react"],
      categories: ["note"],
      files: [
        { path: "components/notepad-note.tsx", type: "registry:ui" },
        { path: "components/postit-cards-board.tsx", type: "registry:ui" },
        { path: "components/postit-stacked-board.tsx", type: "registry:ui" },
        { path: "lib/utils.ts", type: "registry:lib" },
      ],
    },
    ...presetItems,
  ],
};

fs.writeFileSync(path.join(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n");
console.log("OK: registry.json + 3 note presets");
