# note-designui

A small Next.js demo + shadcn registry for “notes” UI components (sticky notes / notepad), adapted from raw HTML experiments.

- Notepad
- Post-it Cards
- Post-it Stacked

## What’s included

- **Three note styles**: a ruled notepad, a freeform cards board, and stacked sticky notes
- **Two modes**: a read-only preview and a fully editable sandbox
- **shadcn registry support**: each note preset can be installed via `shadcn add`
- **Client-side state**: all examples run locally in the browser (no backend)

## Dev

```bash
npm install
npm run dev
```

## Install (shadcn)

- `npx shadcn@latest add @chumy/note-notepad`
- `npx shadcn@latest add @chumy/note-cards`
- `npx shadcn@latest add @chumy/note-stacked`

If you want to consume these as a registry in a different project, check `components.json` (it points to the hosted registry endpoint used by shadcn).

## Modes: Preview vs Editor

On the page (`app/page.tsx`) there are two sections:

- **Preview (read-only)**: inputs are `readOnly`; no add/delete actions; no keyboard shortcuts; no bring-to-front
- **Editor (editable)**: everything is interactive

This distinction is controlled via the `editable` prop on the components:

- `NotepadNote({ editable?: boolean })`
- `PostitCardsBoard({ editable?: boolean })`
- `PostitStackedBoard({ editable?: boolean })`

Example:

```tsx
<NotepadNote editable={false} />
<NotepadNote editable />
```

## Project structure (quick map)

- `app/page.tsx`: renders the page sections and the three showcases
- `components/`: UI components (the actual note implementations)
- `lib/notes/`: shared note helpers (palette + ids)
- `registry.json` + `public/r/*.json`: registry metadata and generated artifacts for shadcn
- `scripts/generate-registry.mjs`: generates `registry.json` and preset entries

## Components & data model

### `NotepadNote`

**Props**

- `editable?: boolean` (default `false`)

**Internal data**

- `lines: string[]` (ruled sheet lines)

**Enabled actions when `editable === true`**

- remove line (button “x”)
- edit line
- `Add line` / `Remove last`

**Behavior notes**

- The ruled sheet is intentionally “simple”: it’s meant to feel like a quick scratchpad.
- In preview mode, inputs are still rendered to preserve layout, but they are `readOnly`.

---

### `PostitCardsBoard`

**Props**

- `editable?: boolean` (default `false`)

**Internal data**

```ts
type NoteCard = {
  id: number;
  mode: "list" | "text";
  lines: string[];
  text: string;
  color: string;
  rotation: string;
};
```

**Key fields**

- **`mode`**:
  - `"list"`: uses `lines[]` (one textarea per line)
  - `"text"`: uses `text` (single textarea)
- **`color`**: sticky color (CSS string, e.g. `#f5c842`)
- **`rotation`**: Tailwind class (e.g. `rotate-[-3deg]`)

**Enabled actions when `editable === true`**

- delete note (icon `X`)
- for `"list"`:
  - `Enter` adds a line after (if fixed size and max lines allow it)
  - `Backspace` on an empty line deletes the line
- toggle `Fixed size` / `Flexible height`
- create notes `New list` / `New text`

**UX details**

- Cards get a subtle lift/scale on hover to make the board feel tactile.
- “Fixed size” limits the number of list lines to keep the card shape consistent.

---

### `PostitStackedBoard`

**Props**

- `editable?: boolean` (default `false`)

**Internal data**

```ts
type StackNote = {
  id: number;
  lines: string[];
  color: string;
};

type NoteStack = {
  id: number;
  notes: StackNote[];
};
```

**Key fields**

- a stack (`NoteStack`) contains `notes[]`
- a note (`StackNote`) contains:
  - `lines[]` (one textarea per line)
  - `color` (CSS string)

**Enabled actions when `editable === true`**

- click a “back” note => `bringToFront`
- `Enter` on a line => adds a line
- delete note (icon `X`)
- `Add note` (adds a note to the last stack)
- `New stack` (adds a new stack)

**UX details**

- Notes behind the front one are clickable to “pull them” forward.
- Stacks can grow: add notes to the last stack, or create a new stack.

## Shared utilities

### Palette

`lib/notes/palette.ts`:

- `NOTE_COLORS`: color list used by the boards.

### ID

`lib/notes/ids.ts`:

- `createId()`: generates a numeric ID (uses `crypto.getRandomValues` when available).

## Registry generation

This repo includes a small script to generate shadcn registry metadata.

```bash
npm run registry:generate
```

It produces/updates:

- `registry.json`
- `public/r/registry.json`
- `public/r/note-*.json`

## Notes on customization

- **Colors**: tweak `NOTE_COLORS` in `lib/notes/palette.ts`
- **Copy & typography**: the page title/subtitle lives in `app/page.tsx`
- **Layout**: each component is self-contained; you can move them into your own app and wire persistence later (localStorage, DB, etc.)
