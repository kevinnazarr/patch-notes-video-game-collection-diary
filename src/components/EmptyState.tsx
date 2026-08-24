interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state-icon" aria-hidden="true">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="8" cy="12" r="1.5" />
          <circle cx="16" cy="10" r="1" />
          <circle cx="18" cy="12" r="1" />
          <circle cx="16" cy="14" r="1" />
          <circle cx="14" cy="12" r="1" />
        </svg>
      </div>
      <h3>Your collection is empty</h3>
      <p>Add your first game to start building your library.</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onAddClick}
        data-testid="empty-add-button"
      >
        Add Game
      </button>
    </div>
  );
}
