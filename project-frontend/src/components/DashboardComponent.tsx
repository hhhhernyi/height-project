// DashboardComponent.tsx

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type HistoricalRecord = {
  date: string;
  hy: number;
  hp: number;
  hs: number;
  hr: number;
};

const sampleData: HistoricalRecord[] = [
  { date: "2025-01-01", hy: 170.1, hp: 165.0, hs: 120.0, hr: 115.0 },
  { date: "2025-01-15", hy: 170.2, hp: 165.1, hs: 120.1, hr: 115.3 },
  { date: "2025-01-30", hy: 170.5, hp: 165.2, hs: 120.2, hr: 115.8 },
  { date: "2025-02-15", hy: 170.6, hp: 165.3, hs: 120.3, hr: 116.0 },
  { date: "2025-03-01", hy: 170.7, hp: 165.4, hs: 120.4, hr: 116.2 },
  { date: "2025-03-15", hy: 170.8, hp: 165.5, hs: 120.5, hr: 116.4 },
];

const DashboardComponent: React.FC = () => {
  const graphData = sampleData.map((record) => ({
    name: record.date.substring(5),
    hy: record.hy,
    hp: record.hp,
    hs: record.hs,
    hr: record.hr,
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-700 mb-4 text-center">
        Family Height Dashboard
      </h2>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" label={{ value: "Height (cm)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="hy" stroke="#4f46e5" strokeWidth={2} name="HY" dot={false} />
            <Line type="monotone" dataKey="hp" stroke="#ef4444" strokeWidth={2} name="HP" dot={false} />
            <Line type="monotone" dataKey="hs" stroke="#10b981" strokeWidth={2} name="HS" dot={false} />
            <Line type="monotone" dataKey="hr" stroke="#f59e0b" strokeWidth={2} name="HR" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardComponent;