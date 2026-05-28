"use client";

import { ArrowUpRight, Star } from "lucide-react";

import { GITHUB_REPO } from "@/lib/project-links";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function ProjectTopbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-[#fbfbfb]/90 text-foreground shadow-sm backdrop-blur-md dark:border-border dark:bg-[#171717]/90 dark:text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent, transparent 4px, rgba(0,0,0,0.06) 4px, rgba(0,0,0,0.06) 5px)",
        }}
      />

      <div className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <p className="min-w-0 text-base leading-snug sm:text-lg">
          <span className="font-semibold text-foreground">Hey there</span>
          <span className="hidden text-muted-foreground sm:inline"> — </span>
          <span className="hidden text-muted-foreground sm:inline">
            glad you stopped by. Hope you like the notes
          </span>
          <span className="text-muted-foreground sm:hidden"> · enjoy the notes</span>
        </p>

        <nav aria-label="GitHub" className="flex shrink-0 items-center gap-2.5">
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
          >
            <GitHubIcon className="size-4" />
            <span className="hidden sm:inline">View on GitHub</span>
            <span className="sm:hidden">GitHub</span>
            <ArrowUpRight className="size-3.5 opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </a>
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <Star className="size-4 text-amber-500" />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="sm:hidden">Star</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export const ProjectBanner = ProjectTopbar;
