import type { Game } from "../types/game";
import { GameCard } from "./GameCard";

interface GameListProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
}

export function GameList({ games, onEdit, onDelete }: GameListProps) {
  return (
    <div className="game-list-section">
      <div className="game-list">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
