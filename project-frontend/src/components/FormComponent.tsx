// FormComponent.tsx

import React, { useState } from "react";
import CheckPin from "./CheckPinComponent";

type HeightState = {
  hy: string;
  hp: string;
  hs: string;
  hr: string;
  [key: string]: string; // ✅ this allows dynamic access like heights[key]
};


interface FormComponentProps {
  familyData: { [key: string]: number | string | null } | null;
  onDataSubmitted: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ familyData, onDataSubmitted }) => {
  const [heights, setHeights] = useState<HeightState>({ hy: "", hp: "", hs: "", hr: "" });
  const [isPinVisible, setIsPinVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHeights((prev) => ({ ...prev, [name]: value }));
  };

  // For now, just console.log instead of POST
  const submitFormData = async (pin: string) => {
    setIsSubmitting(true);

    const payload = Object.entries(heights)
      .filter(([, value]) => value !== "")
      .map(([key, value]) => ({
        name: key.toUpperCase(),
        height: parseFloat(value),
      }));

    console.log("Form data to submit:", { records: payload, pin });

    // Reset form
    setHeights({ hy: "", hp: "", hs: "", hr: "" });
    setIsPinVisible(false);
    setIsSubmitting(false);

    // Call parent refresh (no-op for now)
    onDataSubmitted();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmitDisabled) {
      setIsPinVisible(true);
    }
  };

  const isSubmitDisabled =
    Object.values(heights).every((value) => value === "") || isSubmitting;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
        <h3 className="font-bold text-indigo-800 mb-2">Last Recorded Heights</h3>
        {familyData ? (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-700">
            <li><span className="font-medium">HY:</span> {familyData.last_hy_height || "--"} cm</li>
            <li><span className="font-medium">HP:</span> {familyData.last_hp_height || "--"} cm</li>
            <li><span className="font-medium">HS:</span> {familyData.last_hs_height || "--"} cm</li>
            <li><span className="font-medium">HR:</span> {familyData.last_hr_height || "--"} cm</li>
          </ul>
        ) : (
          <p className="text-sm text-slate-500">No data available.</p>
        )}
      </div>

      <form onSubmit={handleSubmitForm} className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold text-slate-700 text-center">
          Enter Today&apos;s Height
        </h2>

        {["hy", "hp", "hs", "hr"].map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={`${key}-height`} className="text-sm font-medium text-slate-600">
              {key.toUpperCase()} height (cm):
            </label>
            <input
              id={`${key}-height`}
              name={key}
              value={heights[key] || ""}
              onChange={handleChange}
              type="number"
              className="mt-1 w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="e.g., 170.5"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="w-full mt-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <CheckPin
        isVisible={isPinVisible}
        onPinValidated={(pin) => submitFormData(pin)}
        onCancel={() => setIsPinVisible(false)}
      />
    </div>
  );
};

export default FormComponent;