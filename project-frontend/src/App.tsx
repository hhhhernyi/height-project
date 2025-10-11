import { useState, useEffect, useCallback } from "react";
import DashboardComponent from "./components/DashboardComponent";
import FormComponent from "./components/FormComponent";
import type { HistoricalRecord } from "./type";
import { fetchHeights } from "./services/heightService";

type RawHeightEntry = {
  id: number;
  child_id: number;
  measurement_date: string;
  height_cm: number;
};

type ChildKey = "hy" | "hp" | "hs" | "hr";
type GroupedRecord = { date: string } & Partial<Record<ChildKey, number>>;

function App() {
  const [historyData, setHistoryData] = useState<HistoricalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoryData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const rawData: RawHeightEntry[] = await fetchHeights();

      // Group entries by date
      const grouped: Record<string, GroupedRecord> = {};
      const idToKey: Record<number, ChildKey> = {
        1: "hy",
        2: "hp",
        3: "hs",
        4: "hr",
      };

      rawData.forEach((entry) => {
        const date = entry.measurement_date;
        if (!grouped[date]) grouped[date] = { date };
        const key = idToKey[entry.child_id];
        if (key) grouped[date][key] = entry.height_cm;
      });

      // Forward-fill missing values
      let lastHy: number | null = null;
      let lastHp: number | null = null;
      let lastHs: number | null = null;
      let lastHr: number | null = null;

      const formatted: HistoricalRecord[] = Object.values(grouped)
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((record) => {
          if (record.hy != null) lastHy = record.hy;
          if (record.hp != null) lastHp = record.hp;
          if (record.hs != null) lastHs = record.hs;
          if (record.hr != null) lastHr = record.hr;

          return {
            date: record.date,
            hy: lastHy,
            hp: lastHp,
            hs: lastHs,
            hr: lastHr,
          };
        });

      setHistoryData(formatted);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Could not load height history data.");
      setHistoryData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistoryData();
  }, [fetchHistoryData]);

  const lastRecord =
    historyData.length > 0 ? historyData[historyData.length - 1] : null;
  const familyDataForForm = lastRecord
    ? {
        last_hy_height: lastRecord.hy,
        last_hp_height: lastRecord.hp,
        last_hs_height: lastRecord.hs,
        last_hr_height: lastRecord.hr,
      }
    : null;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <header className="w-full max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-extrabold text-slate-800 text-center">
          Family Height Tracker
        </h1>
      </header>

      <div className="w-full max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-12">
        <div className="bg-white rounded-xl shadow-lg p-4 w-[95%] mx-auto md:w-full md:col-span-8">
          <DashboardComponent
            historyData={historyData}
            isLoading={isLoading}
            error={error}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 w-[95%] mx-auto md:w-full md:col-span-4">
          <FormComponent
            familyData={familyDataForForm}
            onDataSubmitted={fetchHistoryData}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
