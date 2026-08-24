import { useState, useCallback, useEffect } from "react";
import type { Game, GameFormat, GameStatus } from "../types/game";
import { loadGames, saveGames } from "../storage/gameStorage";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useGames() {
  const [games, setGames] = useState<Game[]>(() => loadGames());

  useEffect(() => {
    saveGames(games);
  }, [games]);

  const addGame = useCallback(
    (
      title: string,
      platform: string,
      format: GameFormat,
      status: GameStatus,
      note?: string,
    ) => {
      const newGame: Game = {
        id: generateId(),
        title,
        platform,
        format,
        status,
        note: note || undefined,
      };
      setGames((prev) => [...prev, newGame]);
    },
    [],
  );

  const updateGame = useCallback(
    (
      id: string,
      title: string,
      platform: string,
      format: GameFormat,
      status: GameStatus,
      note?: string,
    ) => {
      setGames((prev) =>
        prev.map((game) =>
          game.id === id
            ? {
                ...game,
                title,
                platform,
                format,
                status,
                note: note || undefined,
              }
            : game,
        ),
      );
    },
    [],
  );

  const deleteGame = useCallback((id: string) => {
    setGames((prev) => prev.filter((game) => game.id !== id));
  }, []);

  return { games, addGame, updateGame, deleteGame };
}
