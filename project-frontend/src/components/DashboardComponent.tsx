import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { parseISO, format } from "date-fns";
import type { HistoricalRecord } from "../type";

type DashboardProps = {
  historyData: HistoricalRecord[];
  isLoading: boolean;
  error: string | null;
};

export default function DashboardComponent({
  historyData,
  isLoading,
  error,
}: DashboardProps) {
  if (isLoading) return <div className="text-slate-600">Loading chart...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!historyData || historyData.length === 0)
    return <div className="text-slate-600">No data yet.</div>;

  return (
    <ResponsiveContainer width="100%" height={360}>
      <LineChart data={historyData}>
        <XAxis
          dataKey="date"
          type="category"
          tickFormatter={(dateStr: string) =>
            format(parseISO(dateStr), "dd-MMM-yyyy")
          }
          tickMargin={12}
          angle={-30}
          textAnchor="end"
          tick={{ fontSize: 10 }}
        />
        <YAxis domain={[0, "dataMax + 10"]} tickCount={6} />
        <Tooltip
          labelFormatter={(dateStr) =>
            format(parseISO(String(dateStr)), "dd-MMM-yyyy")
          }
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          wrapperStyle={{ bottom: 80 }}
        />
        <Line type="monotone" dataKey="hy" stroke="#ef4444" connectNulls dot={false} activeDot={false}/>
        <Line type="monotone" dataKey="hp" stroke="#3b82f6" connectNulls dot={false} activeDot={false}/>
        <Line type="monotone" dataKey="hs" stroke="#f97316" connectNulls dot={false} activeDot={false}/>
        <Line type="monotone" dataKey="hr" stroke="#22c55e" connectNulls dot={false} activeDot={false}/>
      </LineChart>
    </ResponsiveContainer>
  );
}
