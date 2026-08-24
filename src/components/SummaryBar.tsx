import type { Game } from "../types/game";
import { calculateGameStats } from "../utils/gameStats";

interface SummaryBarProps {
  games: Game[];
}

export function SummaryBar({ games }: SummaryBarProps) {
  const stats = calculateGameStats(games);

  return (
    <div className="summary-bar" role="region" aria-label="Collection summary">
      <div className="summary-item total">
        <div className="count" data-testid="total-count">
          {stats.total}
        </div>
        <div className="label">Total</div>
      </div>
      <div className="summary-item not-started">
        <div className="count" data-testid="not-started-count">
          {stats.notStarted}
        </div>
        <div className="label">Not Started</div>
      </div>
      <div className="summary-item in-progress">
        <div className="count" data-testid="in-progress-count">
          {stats.inProgress}
        </div>
        <div className="label">In Progress</div>
      </div>
      <div className="summary-item completed">
        <div className="count" data-testid="completed-count">
          {stats.completed}
        </div>
        <div className="label">Completed</div>
      </div>
      <div className="summary-item dropped">
        <div className="count" data-testid="dropped-count">
          {stats.dropped}
        </div>
        <div className="label">Dropped</div>
      </div>
    </div>
  );
}
