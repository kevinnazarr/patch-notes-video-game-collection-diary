import { describe, it, expect, beforeEach } from "vitest";
import { saveGames, loadGames } from "../gameStorage";
import type { Game } from "../../types/game";

function makeGame(overrides: Partial<Game> = {}): Game {
  return {
    id: "test-1",
    title: "Test Game",
    platform: "PC",
    format: "digital",
    status: "not-started",
    ...overrides,
  };
}

describe("gameStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("saveGames", () => {
    it("saves games to localStorage", () => {
      const games = [makeGame()];
      saveGames(games);
      const raw = localStorage.getItem("video-game-collection-diary");
      expect(raw).toBeTruthy();
      expect(JSON.parse(raw!)).toEqual(games);
    });

    it("overwrites previous data", () => {
      saveGames([makeGame({ id: "1" })]);
      saveGames([makeGame({ id: "2" }), makeGame({ id: "3" })]);
      const loaded = loadGames();
      expect(loaded).toHaveLength(2);
      expect(loaded[0].id).toBe("2");
    });
  });

  describe("loadGames", () => {
    it("returns empty array when localStorage is empty", () => {
      expect(loadGames()).toEqual([]);
    });

    it("loads valid games from localStorage", () => {
      const games = [
        makeGame({ id: "1", title: "Game One" }),
        makeGame({ id: "2", title: "Game Two", status: "completed" }),
      ];
      localStorage.setItem(
        "video-game-collection-diary",
        JSON.stringify(games),
      );
      const loaded = loadGames();
      expect(loaded).toHaveLength(2);
      expect(loaded[0].title).toBe("Game One");
      expect(loaded[1].status).toBe("completed");
    });

    it("filters out malformed entries", () => {
      const mixed = [
        makeGame({ id: "1" }),
        { id: 123, title: "bad" },
        null,
        "string",
        makeGame({ id: "2", status: "invalid-status" }),
      ];
      localStorage.setItem(
        "video-game-collection-diary",
        JSON.stringify(mixed),
      );
      const loaded = loadGames();
      expect(loaded).toHaveLength(1);
      expect(loaded[0].id).toBe("1");
    });

    it("returns empty array for malformed JSON", () => {
      localStorage.setItem(
        "video-game-collection-diary",
        "not-valid-json{{{",
      );
      const loaded = loadGames();
      expect(loaded).toEqual([]);
    });

    it("returns empty array for non-array data", () => {
      localStorage.setItem(
        "video-game-collection-diary",
        JSON.stringify({ not: "an array" }),
      );
      const loaded = loadGames();
      expect(loaded).toEqual([]);
    });

    it("preserves optional note field", () => {
      const game = makeGame({ id: "1", note: "Great game!" });
      localStorage.setItem(
        "video-game-collection-diary",
        JSON.stringify([game]),
      );
      const loaded = loadGames();
      expect(loaded[0].note).toBe("Great game!");
    });

    it("handles game without note", () => {
      const game = makeGame({ id: "1" });
      delete game.note;
      localStorage.setItem(
        "video-game-collection-diary",
        JSON.stringify([game]),
      );
      const loaded = loadGames();
      expect(loaded[0].note).toBeUndefined();
    });

    it("validates all format values", () => {
      localStorage.setItem(
        "video-game-collection-diary",
        JSON.stringify([
          makeGame({ id: "1", format: "physical" }),
          makeGame({ id: "2", format: "digital" }),
          makeGame({ id: "3", format: "invalid" }),
        ]),
      );
      const loaded = loadGames();
      expect(loaded).toHaveLength(2);
    });

    it("validates all status values", () => {
      localStorage.setItem(
        "video-game-collection-diary",
        JSON.stringify([
          makeGame({ id: "1", status: "not-started" }),
          makeGame({ id: "2", status: "in-progress" }),
          makeGame({ id: "3", status: "completed" }),
          makeGame({ id: "4", status: "dropped" }),
          makeGame({ id: "5", status: "invalid" }),
        ]),
      );
      const loaded = loadGames();
      expect(loaded).toHaveLength(4);
    });
  });
});
