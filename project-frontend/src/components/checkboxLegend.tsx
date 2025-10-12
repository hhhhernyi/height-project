import React from "react";

type CheckboxLegendProps = {
  visibleLines: { hy: boolean; hp: boolean; hs: boolean; hr: boolean };
  setVisibleLines: React.Dispatch<
    React.SetStateAction<{ hy: boolean; hp: boolean; hs: boolean; hr: boolean }>
  >;
};

const labels: Record<keyof CheckboxLegendProps["visibleLines"], string> = {
  hy: "HY",
  hp: "HP",
  hs: "HS",
  hr: "HR",
};

const colors: Record<keyof CheckboxLegendProps["visibleLines"], string> = {
  hy: "#ef4444",
  hp: "#3b82f6",
  hs: "#f97316",
  hr: "#22c55e",
};

export default function CheckboxLegend({
  visibleLines,
  setVisibleLines,
}: CheckboxLegendProps) {
  const toggle = (key: keyof typeof visibleLines) => {
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex gap-4 mb-4">
      {Object.keys(visibleLines).map((key) => {
        const k = key as keyof typeof visibleLines;
        return (
          <label key={k} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={visibleLines[k]}
              onChange={() => toggle(k)}
            />
            <span
              style={{
                color: colors[k],
                fontWeight: 500,
              }}
            >
              {labels[k]}
            </span>
          </label>
        );
      })}
    </div>
  );
}
