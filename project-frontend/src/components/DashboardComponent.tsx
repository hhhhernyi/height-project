import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { parseISO, format } from "date-fns";
import type { HistoricalRecord } from "../type";

type DashboardProps = {
  historyData: HistoricalRecord[];
  isLoading: boolean;
  error: string | null;
  visibleLines: { hy: boolean; hp: boolean; hs: boolean; hr: boolean };
};

export default function DashboardComponent({
  historyData,
  isLoading,
  error,
  visibleLines,
}: DashboardProps) {
  if (isLoading) return <div className="text-slate-600">Loading chart...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!historyData || historyData.length === 0)
    return <div className="text-slate-600">No data yet.</div>;

  return (
    <ResponsiveContainer width="100%" height={360}>
      <LineChart
        data={historyData}
        margin={{ top: 20, right: 20, bottom: 60, left: 20 }} // 👈 extra bottom margin
      >
        <XAxis
          dataKey="date"
          type="category"
          tickFormatter={(dateStr: string) =>
            format(parseISO(dateStr), "dd-MMM-yyyy")
          }
          tickMargin={25} // 👈 pushes labels further down
          angle={-30}
          textAnchor="end"
          tick={{ fontSize: 12, fontWeight: 500 }} // 👈 clearer labels
        />
        <YAxis domain={[0, "dataMax + 10"]} tickCount={6} />
        <Tooltip
          labelFormatter={(dateStr) =>
            format(parseISO(String(dateStr)), "dd-MMM-yyyy")
          }
        />

        {visibleLines.hy && (
          <Line
            type="monotone"
            dataKey="hy"
            name="HY"
            stroke="#ef4444"
            connectNulls
            dot={false}
            activeDot={false}
            isAnimationActive
            animationDuration={350}
          />
        )}
        {visibleLines.hp && (
          <Line
            type="monotone"
            dataKey="hp"
            name="HP"
            stroke="#3b82f6"
            connectNulls
            dot={false}
            activeDot={false}
            isAnimationActive
            animationDuration={350}
          />
        )}
        {visibleLines.hs && (
          <Line
            type="monotone"
            dataKey="hs"
            name="HS"
            stroke="#f97316"
            connectNulls
            dot={false}
            activeDot={false}
            isAnimationActive
            animationDuration={350}
          />
        )}
        {visibleLines.hr && (
          <Line
            type="monotone"
            dataKey="hr"
            name="HR"
            stroke="#22c55e"
            connectNulls
            dot={false}
            activeDot={false}
            isAnimationActive
            animationDuration={350}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
