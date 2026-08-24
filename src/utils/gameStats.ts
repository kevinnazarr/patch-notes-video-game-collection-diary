import type { Game, GameStatus } from "../types/game";

export interface GameStats {
  total: number;
  notStarted: number;
  inProgress: number;
  completed: number;
  dropped: number;
}

export function calculateGameStats(games: Game[]): GameStats {
  const counts: Record<GameStatus, number> = {
    "not-started": 0,
    "in-progress": 0,
    "completed": 0,
    dropped: 0,
  };

  for (const game of games) {
    counts[game.status]++;
  }

  return {
    total: games.length,
    notStarted: counts["not-started"],
    inProgress: counts["in-progress"],
    completed: counts["completed"],
    dropped: counts["dropped"],
  };
}
