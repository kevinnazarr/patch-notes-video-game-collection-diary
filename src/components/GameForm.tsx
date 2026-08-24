import { useState, useRef, useEffect } from "react";
import type { Game, GameFormat, GameStatus } from "../types/game";
import { ALL_STATUSES, ALL_FORMATS, STATUS_LABELS, FORMAT_LABELS } from "../types/game";

interface GameFormProps {
  editingGame: Game | null;
  onSubmit: (title: string, platform: string, format: GameFormat, status: GameStatus, note?: string) => void;
  onCancel: () => void;
}

interface FormErrors { title?: string; platform?: string; }

const PLATFORMS = ["Nintendo Switch","PS5","PS4","Xbox Series X","PC","Steam Deck","Xbox One","PS3","Nintendo 3DS","Game Boy Advance"];

function FormBody({ editingGame, onSubmit, onCancel }: GameFormProps) {
  const [title, setTitle] = useState(editingGame?.title ?? "");
  const [platform, setPlatform] = useState(editingGame?.platform ?? "");
  const [format, setFormat] = useState<GameFormat>(editingGame?.format ?? "physical");
  const [status, setStatus] = useState<GameStatus>(editingGame?.status ?? "not-started");
  const [note, setNote] = useState(editingGame?.note ?? "");
  const [errors, setErrors] = useState<FormErrors>({});
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editingGame) titleRef.current?.focus(); }, [editingGame]);

  function validate() {
    const e: FormErrors = {};
    if (!title.trim()) e.title = "Title is required";
    if (!platform.trim()) e.platform = "Platform is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit(title.trim(), platform.trim(), format, status, note.trim() || undefined);
    setErrors({});
  }

  return (
    <form className="game-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <h2>{editingGame ? "Edit Game" : "Add Game"}</h2>
        {editingGame && <button type="button" className="btn btn-ghost" onClick={onCancel} data-testid="cancel-button">Cancel</button>}
      </div>
      {Object.keys(errors).length > 0 && <div className="form-errors" role="alert" data-testid="form-errors">Please fix the errors below.</div>}
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="game-title">Title <span className="required" aria-hidden="true">*</span></label>
          <input ref={titleRef} id="game-title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. The Legend of Zelda: Tears of the Kingdom" aria-required="true" aria-invalid={!!errors.title} data-testid="input-title" />
          {errors.title && <div className="error-message" role="alert">{errors.title}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="game-platform">Platform <span className="required" aria-hidden="true">*</span></label>
          <input id="game-platform" type="text" value={platform} onChange={e => setPlatform(e.target.value)} placeholder="e.g. Nintendo Switch, PS5, PC" list="platform-suggestions" aria-required="true" aria-invalid={!!errors.platform} data-testid="input-platform" />
          <datalist id="platform-suggestions">{PLATFORMS.map(p => <option key={p} value={p} />)}</datalist>
          {errors.platform && <div className="error-message" role="alert">{errors.platform}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="game-format">Format</label>
          <select id="game-format" value={format} onChange={e => setFormat(e.target.value as GameFormat)} data-testid="input-format">
            {ALL_FORMATS.map(f => <option key={f} value={f}>{FORMAT_LABELS[f]}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="game-status">Status</label>
          <select id="game-status" value={status} onChange={e => setStatus(e.target.value as GameStatus)} data-testid="input-status">
            {ALL_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </div>
        <div className="form-group full-width">
          <label htmlFor="game-note">Personal Note</label>
          <textarea id="game-note" value={note} onChange={e => setNote(e.target.value)} placeholder="Optional note about this game..." data-testid="input-note" />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" data-testid="submit-button">{editingGame ? "Save Changes" : "Add Game"}</button>
        {editingGame && <button type="button" className="btn btn-secondary" onClick={onCancel} data-testid="cancel-bottom-button">Cancel</button>}
      </div>
    </form>
  );
}

export function GameForm(props: GameFormProps) {
  return <div className="game-form-section"><FormBody key={props.editingGame?.id ?? "new"} {...props} /></div>;
}
