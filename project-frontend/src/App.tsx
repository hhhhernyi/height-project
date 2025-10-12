import { useEffect, useState } from "react";
import DashboardComponent from "./components/DashboardComponent";
import CheckboxLegend from "./components/checkboxLegend";
import FormComponent from "./components/FormComponent";
import Footer from "./components/footer";
import { fetchHeights } from "./services/heightService";
import type { HistoricalRecord } from "./type";

// Raw API record from backend
interface HeightApiRecord {
  id: number;
  child_id: number;
  measurement_date: string;
  height_cm: number;
}

export default function App() {
  const [historyData, setHistoryData] = useState<HistoricalRecord[]>([]);
  const [latestSummary, setLatestSummary] = useState<{
    hy: number | null;
    hp: number | null;
    hs: number | null;
    hr: number | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [visibleLines, setVisibleLines] = useState({
    hy: true,
    hp: true,
    hs: true,
    hr: true,
  });

  async function loadData() {
    setIsLoading(true);
    try {
      const raw: HeightApiRecord[] = await fetchHeights();

      // --- Build chart data grouped by date ---
      const grouped: Record<
        string,
        { date: string; hy?: number; hp?: number; hs?: number; hr?: number }
      > = {};

      for (const rec of raw) {
        const date = rec.measurement_date;
        if (!grouped[date]) {
          grouped[date] = { date };
        }
        switch (rec.child_id) {
          case 1:
            grouped[date].hy = rec.height_cm;
            break;
          case 2:
            grouped[date].hp = rec.height_cm;
            break;
          case 3:
            grouped[date].hs = rec.height_cm;
            break;
          case 4:
            grouped[date].hr = rec.height_cm;
            break;
        }
      }

      const transformed: HistoricalRecord[] = Object.values(grouped)
        .map((g) => ({
          date: g.date,
          hy: g.hy ?? null,
          hp: g.hp ?? null,
          hs: g.hs ?? null,
          hr: g.hr ?? null,
        }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      setHistoryData(transformed);

      // --- Build latest summary per child ---
      const sorted = [...raw].sort(
        (a, b) =>
          new Date(a.measurement_date).getTime() -
          new Date(b.measurement_date).getTime()
      );
      const latestMap: Record<number, HeightApiRecord> = {};
      for (const rec of sorted) {
        latestMap[rec.child_id] = rec; // later overwrites earlier
      }
      setLatestSummary({
        hy: latestMap[1]?.height_cm ?? null,
        hp: latestMap[2]?.height_cm ?? null,
        hs: latestMap[3]?.height_cm ?? null,
        hr: latestMap[4]?.height_cm ?? null,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Main content */}
      <div className="flex-grow p-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Chart + Legend */}
            <div className="md:w-2/3 w-full bg-white rounded shadow p-4">
              <CheckboxLegend
                visibleLines={visibleLines}
                setVisibleLines={setVisibleLines}
              />
              <DashboardComponent
                historyData={historyData}
                isLoading={isLoading}
                error={error}
                visibleLines={visibleLines}
              />
            </div>

            {/* Right: Form */}
            <div className="md:w-1/3 w-full bg-white rounded shadow p-4">
              <h2 className="text-lg font-semibold mb-2">Controls</h2>
              <FormComponent
                familyData={latestSummary}
                onDataSubmitted={loadData}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
}
