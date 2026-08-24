export type GameStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "dropped";

export type GameFormat = "physical" | "digital";

export interface Game {
  id: string;
  title: string;
  platform: string;
  format: GameFormat;
  status: GameStatus;
  note?: string;
}

export const STATUS_LABELS: Record<GameStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "completed": "Completed",
  "dropped": "Dropped",
};

export const FORMAT_LABELS: Record<GameFormat, string> = {
  physical: "Physical",
  digital: "Digital",
};

export const ALL_STATUSES: GameStatus[] = [
  "not-started",
  "in-progress",
  "completed",
  "dropped",
];

export const ALL_FORMATS: GameFormat[] = ["physical", "digital"];
