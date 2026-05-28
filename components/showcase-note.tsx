"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

function CopyInstallButton({
  command,
  label,
  copied,
  onCopy,
  className,
}: {
  command: string;
  label: string;
  copied: boolean;
  onCopy: (e: React.MouseEvent) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      title={command}
      className={cn(
        "mt-3 flex max-w-[260px] items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] text-[var(--muted-foreground)] transition",
        "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
        "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        copied && "opacity-100 text-[var(--foreground)]",
        className,
      )}
    >
      {copied ? <Check className="size-3 shrink-0" /> : <Copy className="size-3 shrink-0" />}
      <span className="truncate">{label}</span>
    </button>
  );
}

export function ShowcaseNote({
  title,
  description,
  command,
  commandLabel,
  children,
}: {
  title: string;
  description: string;
  command: string;
  commandLabel: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  }

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[rgba(255,255,255,0.45)] p-4 shadow-[0_18px_50px_rgba(71,50,24,0.08)] backdrop-blur-sm transition hover:shadow-[0_22px_60px_rgba(71,50,24,0.10)] sm:p-5">
      <div className="absolute inset-x-5 top-0 h-6 rounded-b-2xl bg-[linear-gradient(180deg,rgba(0,0,0,0.08),transparent)]" />
      <div className="flex min-h-[420px] items-center justify-center rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.56),rgba(255,255,255,0.22))] px-3 py-6">
        {children}
      </div>

      <div className="mt-5">
        <h2 className="text-3xl leading-none text-[#2d2418]">{title}</h2>
        <p className="mt-2 font-sans text-sm leading-5 text-[var(--muted-foreground)]">
          {description}
        </p>
        <CopyInstallButton
          command={command}
          label={commandLabel}
          copied={copied}
          onCopy={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void copyCommand();
          }}
        />
      </div>
    </article>
  );
}
