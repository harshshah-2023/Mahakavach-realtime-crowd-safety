import { useRef, useState } from "react";
import {
  Camera,
  Upload,
  CheckCircle,
  MapPin,
  X,
  Shield,
  ChevronRight,
} from "lucide-react";
import { STATIONS } from "../data/stations";

export default function CrowdUpload() {
  const fileInputRef = useRef(null);
  const [stationQuery, setStationQuery] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleStationChange = (value) => {
    setStationQuery(value);
    setSelectedStation("");
    if (!value) return setSuggestions([]);
    setSuggestions(
      STATIONS.filter((s) =>
        s.toLowerCase().startsWith(value.toLowerCase())
      ).slice(0, 6)
    );
  };

  const selectStation = (station) => {
    setStationQuery(station);
    setSelectedStation(station);
    setSuggestions([]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setStationQuery("");
    setSelectedStation("");
    setSuggestions([]);
    setPreview(null);
    setSubmitted(false);
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs tracking-[0.3em] uppercase text-gray-500">
              MahaKavach Community Signal
            </span>
          </div>

          <h1 className="font-emirates text-3xl sm:text-4xl md:text-5xl text-dark mb-4">
            Share Live Crowd Conditions
          </h1>

          <p className="text-gray-600 leading-relaxed">
            Your real-time input improves platform awareness, crowd prediction,
            and safer commuting for thousands of daily travellers.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="relative bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-xl p-5 sm:p-8 max-w-4xl">

          {/* PROGRESS INDICATOR */}
          {!submitted && (
            <div className="flex items-center justify-between text-xs text-gray-500 mb-8">
              <Step active label="Station" />
              <ChevronRight className="w-4 h-4" />
              <Step active={!!preview} label="Photo" />
              <ChevronRight className="w-4 h-4" />
              <Step active={submitted} label="Submit" />
            </div>
          )}

          {!submitted ? (
            <>
              {/* STATION INPUT */}
              <div className="mb-10">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Station name
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={stationQuery}
                    onChange={(e) => handleStationChange(e.target.value)}
                    placeholder="Type station (e.g. Andheri)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
                  {stationQuery && (
                    <button
                      onClick={() => handleStationChange("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>

                {suggestions.length > 0 && (
                  <div className="mt-2 rounded-xl border border-gray-200 overflow-hidden bg-white shadow-lg">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => selectStation(s)}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {selectedStation && (
                  <p className="mt-3 text-sm font-medium text-green-600">
                    Selected: {selectedStation}
                  </p>
                )}
              </div>

              {/* UPLOAD */}
              {!preview ? (
                <button
                  disabled={!selectedStation}
                  onClick={() => fileInputRef.current.click()}
                  className={`w-full rounded-2xl border-2 border-dashed p-10 flex flex-col items-center text-center transition
                    ${
                      selectedStation
                        ? "border-primary bg-primary/5 hover:bg-primary/10"
                        : "border-gray-300 bg-gray-100 cursor-not-allowed"
                    }`}
                >
                  <Camera className="w-10 h-10 text-primary mb-4" />
                  <span className="font-semibold text-dark">
                    Upload crowd photo
                  </span>
                  <span className="text-sm text-gray-500 mt-1">
                    Platform or train entry view preferred
                  </span>
                </button>
              ) : (
                <>
                  <div className="relative rounded-2xl overflow-hidden border mb-6">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-56 sm:h-72 object-cover"
                    />
                    <button
                      onClick={resetForm}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setSubmitted(true)}
                    className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                  >
                    Submit Crowd Report
                  </button>
                </>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
              />
            </>
          ) : (
            /* SUCCESS */
            <div className="text-center py-14">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-dark mb-2">
                Report received
              </h2>
              <p className="text-gray-600 mb-6">
                Your update for {selectedStation} will help nearby commuters.
              </p>
              <button
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                Submit another report
              </button>
            </div>
          )}
        </div>

        {/* FOOTNOTE */}
        <p className="text-xs text-gray-500 mt-10 max-w-4xl">
          All uploads are anonymous. Images are processed for crowd density only
          and automatically expire. MahaKavach is a public safety initiative.
        </p>
      </div>
    </section>
  );
}

/* Step Indicator */
function Step({ active, label }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2.5 h-2.5 rounded-full ${
          active ? "bg-primary" : "bg-gray-300"
        }`}
      />
      <span>{label}</span>
    </div>
  );
}
