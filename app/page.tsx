import { ShowcaseNote } from "@/components/showcase-note";
import { NotepadNote } from "@/components/notepad-note";
import { PostitCardsBoard } from "@/components/postit-cards-board";
import { PostitStackedBoard } from "@/components/postit-stacked-board";

const SHOWCASES = [
  {
    id: "notepad",
    title: "Notepad",
    description: "A quick ruled sheet for notes, checklists, and reminders.",
    commandLabel: "@chumy/note-notepad",
    command: "npx shadcn@latest add @chumy/note-notepad",
    content: <NotepadNote editable={false} />,
    editorContent: <NotepadNote editable />,
  },
  {
    id: "cards",
    title: "Post-it Cards",
    description: "A freeform board with editable notes, add/remove included.",
    commandLabel: "@chumy/note-cards",
    command: "npx shadcn@latest add @chumy/note-cards",
    content: <PostitCardsBoard editable={false} />,
    editorContent: <PostitCardsBoard editable />,
  },
  {
    id: "stacked",
    title: "Post-it Stacked",
    description: "A note stack with bring-to-front and fast insert.",
    commandLabel: "@chumy/note-stacked",
    command: "npx shadcn@latest add @chumy/note-stacked",
    content: <PostitStackedBoard editable={false} />,
    editorContent: <PostitStackedBoard editable />,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#fbfbfb,#f5f5f5)] px-6 py-12 text-[var(--foreground)] dark:bg-[linear-gradient(to_bottom,#171717,#121212)]">
      <section className="mx-auto w-full max-w-[1400px] space-y-10">
        <header className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
            Notes collection
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#2d2418] sm:text-5xl">
            Sticky notes that feel real.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-6 text-[var(--muted-foreground)] sm:text-base">
            Three styles, one goal: capture ideas fast in a simple, visual way.
          </p>
        </header>

        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-center font-sans text-xs font-medium uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
              Preview (read-only)
            </h2>
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
              {SHOWCASES.map((entry) => (
                <ShowcaseNote
                  key={`${entry.id}-preview`}
                  title={entry.title}
                  description={entry.description}
                  command={entry.command}
                  commandLabel={entry.commandLabel}
                >
                  {entry.content}
                </ShowcaseNote>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-center font-sans text-xs font-medium uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
              Editor (editable)
            </h2>
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
              {SHOWCASES.map((entry) => (
                <ShowcaseNote
                  key={`${entry.id}-editor`}
                  title={entry.title}
                  description={entry.description}
                  command={entry.command}
                  commandLabel={entry.commandLabel}
                >
                  {entry.editorContent}
                </ShowcaseNote>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
