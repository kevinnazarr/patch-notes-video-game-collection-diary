import type { Game } from "../types/game";
import { STATUS_LABELS, FORMAT_LABELS } from "../types/game";

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
}

export function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  return (
    <article className="game-card" data-testid="game-card">
      <div className="game-card-header">
        <div>
          <div className="game-card-title" data-testid="game-title">{game.title}</div>
          <div className="game-card-platform" data-testid="game-platform">{game.platform}</div>
        </div>
      </div>
      <div className="game-card-meta">
        <span className="format-badge" data-testid="game-format">{FORMAT_LABELS[game.format]}</span>
        <span className={`status-chip ${game.status}`} data-testid="game-status">
          <span className="dot" aria-hidden="true" />
          {STATUS_LABELS[game.status]}
        </span>
      </div>
      {game.note && <div className="game-card-note" data-testid="game-note">&ldquo;{game.note}&rdquo;</div>}
      <div className="game-card-actions">
        <button type="button" className="btn btn-ghost" onClick={() => onEdit(game)} aria-label={`Edit ${game.title}`} data-testid="edit-button">Edit</button>
        <button type="button" className="btn btn-danger" onClick={() => { if (window.confirm(`Delete "${game.title}"?`)) onDelete(game.id); }} aria-label={`Delete ${game.title}`} data-testid="delete-button">Delete</button>
      </div>
    </article>
  );
}
