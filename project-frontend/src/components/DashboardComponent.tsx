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

type DashboardProps = {
  historyData: HistoricalRecord[];
  isLoading: boolean;
  error: string | null;
};

const DashboardComponent: React.FC<DashboardProps> = ({ historyData, isLoading, error }) => {
  const graphData = historyData.map((record) => ({
    name: record.date.substring(5), // e.g. "01-15"
    hy: record.hy,
    hp: record.hp,
    hs: record.hs,
    hr: record.hr,
  }));

  if (isLoading) return <p className="text-center text-slate-500">Loading chart...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (graphData.length === 0) return <p className="text-center text-slate-500">No data available.</p>;

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
