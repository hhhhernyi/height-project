import React, { useState } from "react";

interface CheckPinProps {
  isVisible: boolean;
  onPinValidated: (pin: string) => void; // now passes pin back
  onCancel: () => void;
}

const CheckPin: React.FC<CheckPinProps> = ({ isVisible, onPinValidated, onCancel }) => {
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [showPin, setShowPin] = useState(false); // 👈 new state

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinInput(e.target.value);
    setPinError("");
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.length === 4) {
      onPinValidated(pinInput);
      setPinInput("");
    } else {
      setPinError("PIN must be 4 digits.");
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="mt-4 p-4 bg-slate-50 border border-slate-300 rounded-lg shadow-inner"
      role="region"
      aria-live="polite"
    >
      <h3 className="text-md font-semibold mb-3 text-slate-800">Please Verify Your PIN</h3>
      <form onSubmit={handlePinSubmit} className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <input
            type={showPin ? "text" : "password"} // 👈 toggle type
            value={pinInput}
            onChange={handlePinChange}
            maxLength={4}
            className={`flex-1 p-2 border ${
              pinError ? "border-red-500" : "border-slate-300"
            } rounded-md text-base focus:ring-2 focus:ring-indigo-500`}
            placeholder="Enter 4-digit PIN"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPin((prev) => !prev)}
            className="px-2 py-1 text-sm border border-slate-400 rounded-md bg-white hover:bg-slate-100"
          >
            {showPin ? "Hide" : "Show"}
          </button>
        </div>

        {pinError && <p className="text-sm text-red-500 font-medium">{pinError}</p>}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setPinInput("");
              setPinError("");
              onCancel();
            }}
            className="py-1 px-3 border border-slate-400 rounded-md text-sm text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pinInput.length !== 4}
            className="py-1 px-3 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 transition-colors text-sm disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckPin;