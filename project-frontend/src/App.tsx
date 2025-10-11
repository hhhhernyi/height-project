import { useState, useEffect, useCallback } from "react";
import DashboardComponent from "./components/DashboardComponent";
import FormComponent from "./components/FormComponent";

const API_BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL ?? "http://localhost:4000";
const API_ENDPOINT = `${API_BASE_URL}/heights`;

type HistoricalRecord = {
  date: string;
  hy: number;
  hp: number;
  hs: number;
  hr: number;
};


function App() {
  const [historyData, setHistoryData] = useState<HistoricalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoryData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(API_ENDPOINT);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: HistoricalRecord[] = await res.json();
      setHistoryData(data);
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

  // Last record for Form display
  const lastRecord = historyData.length > 0 ? historyData[historyData.length - 1] : null;
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

      {/* Responsive layout */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <DashboardComponent
            historyData={historyData}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
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