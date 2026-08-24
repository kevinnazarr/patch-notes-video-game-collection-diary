import type { Game } from "../types/game";

const STORAGE_KEY = "video-game-collection-diary";

export function saveGames(games: Game[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  } catch {
    if (import.meta.env.DEV) {
      console.warn("Failed to save games to localStorage");
    }
  }
}

export function loadGames(): Game[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const valid: Game[] = [];
    for (const item of parsed) {
      if (
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.platform === "string" &&
        (item.format === "physical" || item.format === "digital") &&
        (item.status === "not-started" ||
          item.status === "in-progress" ||
          item.status === "completed" ||
          item.status === "dropped")
      ) {
        valid.push({
          id: item.id,
          title: item.title,
          platform: item.platform,
          format: item.format,
          status: item.status,
          note: typeof item.note === "string" ? item.note : undefined,
        });
      }
    }
    return valid;
  } catch {
    if (import.meta.env.DEV) {
      console.warn("Malformed data in localStorage, resetting collection");
    }
    return [];
  }
}
