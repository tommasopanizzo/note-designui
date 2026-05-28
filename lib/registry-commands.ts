export const SITE_URL = "https://note-designui.vercel.app";
export const CHUMY_REGISTRY_URL = `${SITE_URL}/r/{name}.json`;

export type NoteModeId = "notepad" | "cards" | "stacked";

export function noteInstallCommand(mode: NoteModeId) {
  return `npx shadcn@latest add @chumy/note-${mode}`;
}

export const REGISTRY_SETUP_COMMAND =
  `npx shadcn@latest registry add @chumy=${CHUMY_REGISTRY_URL}`;
