export function createId(): number {
  // Keep IDs numeric for existing components/state.
  // Prefer crypto when available to reduce collision risk vs Date.now().
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const buffer = new Uint32Array(1);
    crypto.getRandomValues(buffer);
    return buffer[0]!;
  }

  return Math.floor(Date.now() + Math.random() * 1000);
}

