// ui/CrowdModal.jsx
import { useState } from "react";

export default function CrowdModal({ onClose, onSubmit }) {
  const [level, setLevel] = useState(null);
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-sm p-5 space-y-3">
        <div className="text-lg font-semibold text-gray-900">Crowd Level</div>
        <div className="grid grid-cols-3 gap-2">
          {["Low", "Moderate", "High"].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`py-2 rounded-lg border text-sm ${
                level === l ? "bg-primary text-white border-primary" : "border-gray-300"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <textarea
          maxLength={120}
          placeholder="Optional note (120 chars)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none h-24"
        />
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-3 py-2 text-sm text-gray-600">
            Cancel
          </button>
          <button
            disabled={!level}
            onClick={() => onSubmit(level, note)}
            className={`px-4 py-2 text-sm rounded-lg ${
              level ? "bg-primary text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
