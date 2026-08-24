import { useState } from "react";
import type { Game, GameFormat, GameStatus } from "./types/game";
import { useGames } from "./hooks/useGames";
import { Header } from "./components/Header";
import { SummaryBar } from "./components/SummaryBar";
import { GameForm } from "./components/GameForm";
import { GameList } from "./components/GameList";
import { EmptyState } from "./components/EmptyState";

function App() {
  const { games, addGame, updateGame, deleteGame } = useGames();
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  function handleSubmit(
    title: string,
    platform: string,
    format: GameFormat,
    status: GameStatus,
    note?: string,
  ) {
    if (editingGame) {
      updateGame(editingGame.id, title, platform, format, status, note);
      setEditingGame(null);
    } else {
      addGame(title, platform, format, status, note);
    }
  }

  function handleEdit(game: Game) {
    setEditingGame(game);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingGame(null);
  }

  function handleDelete(id: string) {
    deleteGame(id);
    if (editingGame?.id === id) {
      setEditingGame(null);
    }
  }

  function scrollToForm() {
    const formEl = document.querySelector(".game-form-section");
    formEl?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="app-container">
      <Header />
      <SummaryBar games={games} />
      <GameForm
        editingGame={editingGame}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
      />
      {games.length === 0 ? (
        <EmptyState onAddClick={scrollToForm} />
      ) : (
        <GameList games={games} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
