export type SeriesKey = "hy" | "hp" | "hs" | "hr";

export type HistoricalRecord = {
  date: string;
  hy: number | null;
  hp: number | null;
  hs: number | null;
  hr: number | null;
};
