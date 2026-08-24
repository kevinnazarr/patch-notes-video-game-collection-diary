import { describe, it, expect } from "vitest";
import { calculateGameStats } from "../gameStats";
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

describe("calculateGameStats", () => {
  it("returns zero counts for an empty collection", () => {
    const stats = calculateGameStats([]);
    expect(stats.total).toBe(0);
    expect(stats.notStarted).toBe(0);
    expect(stats.inProgress).toBe(0);
    expect(stats.completed).toBe(0);
    expect(stats.dropped).toBe(0);
  });

  it("counts total correctly", () => {
    const games = [
      makeGame({ id: "1" }),
      makeGame({ id: "2" }),
      makeGame({ id: "3" }),
    ];
    expect(calculateGameStats(games).total).toBe(3);
  });

  it("counts not-started games", () => {
    const games = [
      makeGame({ id: "1", status: "not-started" }),
      makeGame({ id: "2", status: "not-started" }),
      makeGame({ id: "3", status: "completed" }),
    ];
    expect(calculateGameStats(games).notStarted).toBe(2);
  });

  it("counts in-progress games", () => {
    const games = [
      makeGame({ id: "1", status: "in-progress" }),
      makeGame({ id: "2", status: "in-progress" }),
      makeGame({ id: "3", status: "in-progress" }),
    ];
    expect(calculateGameStats(games).inProgress).toBe(3);
  });

  it("counts completed games", () => {
    const games = [
      makeGame({ id: "1", status: "completed" }),
      makeGame({ id: "2", status: "not-started" }),
    ];
    expect(calculateGameStats(games).completed).toBe(1);
  });

  it("counts dropped games", () => {
    const games = [
      makeGame({ id: "1", status: "dropped" }),
      makeGame({ id: "2", status: "dropped" }),
      makeGame({ id: "3", status: "completed" }),
    ];
    expect(calculateGameStats(games).dropped).toBe(2);
  });

  it("handles mixed statuses correctly", () => {
    const games = [
      makeGame({ id: "1", status: "not-started" }),
      makeGame({ id: "2", status: "in-progress" }),
      makeGame({ id: "3", status: "completed" }),
      makeGame({ id: "4", status: "completed" }),
      makeGame({ id: "5", status: "dropped" }),
    ];
    const stats = calculateGameStats(games);
    expect(stats.total).toBe(5);
    expect(stats.notStarted).toBe(1);
    expect(stats.inProgress).toBe(1);
    expect(stats.completed).toBe(2);
    expect(stats.dropped).toBe(1);
  });
});
