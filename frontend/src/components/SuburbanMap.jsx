import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, TrainFront, Route, Plus, Minus, Layers } from "lucide-react";
import suburbanMap from "../assets/mumbai-local-trains.jpg";

export default function SuburbanMapPro() {
  const [scale, setScale] = useState(1);
  const [overlay, setOverlay] = useState(true);

  const zoomIn = () => setScale((s) => Math.min(2.2, s + 0.2));
  const zoomOut = () => setScale((s) => Math.max(0.8, s - 0.2));

  return (
    <section className="w-full bg-[#f8f8f8] py-24 px-6 select-none border-t border-gray-200">

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="font-emirates text-3xl md:text-4xl text-dark">
          Mumbai Suburban Rail Network
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
          Explore Mumbai’s interconnected rail ecosystem spanning 3 corridors, 120+ stations,
          interchange hubs, and suburban extension routes.
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-6xl mx-auto flex justify-end items-center gap-3 mb-4">
        <button
          onClick={() => setOverlay(!overlay)}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm hover:bg-gray-50"
        >
          <Layers className="w-4 h-4 text-primary" />
          {overlay ? "Hide Labels" : "Show Labels"}
        </button>

        <button onClick={zoomOut} className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          <Minus className="w-4 h-4 text-primary" />
        </button>
        <button onClick={zoomIn} className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          <Plus className="w-4 h-4 text-primary" />
        </button>
      </div>

      {/* MAP FRAME */}
      <div className="max-w-6xl mx-auto rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden relative">

        {/* Map Container */}
        <div className="overflow-auto w-full h-[600px] md:h-[650px] p-8">
          <motion.div
            style={{ scale }}
            className={`w-full transition-transform duration-500 ${overlay ? "" : "opacity-80"}`}
          >
            <img
              src={suburbanMap}
              alt="Mumbai Suburban Rail Network"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>

      </div>

      {/* LEGEND */}
      <div className="max-w-6xl mx-auto mt-10">
        <h3 className="text-lg font-semibold text-dark mb-4">Legend</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <LegendItem color="bg-blue-500" label="Harbour Line" />
          <LegendItem color="bg-red-500" label="Western Line" />
          <LegendItem color="bg-green-500" label="Central Line" />
          <LegendItem color="bg-yellow-500" label="MRTS (Under Construction)" />
        </div>
      </div>

      {/* STATISTICS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
        <Stat icon={<MapPin />} label="Stations" value="120+" />
        <Stat icon={<TrainFront />} label="Daily Riders" value="80L+" />
        <Stat icon={<Route />} label="Corridors" value="3" />
      </div>

      {/* AUX INFO */}
      <div className="max-w-6xl mx-auto mt-16">
        <h3 className="font-emirates text-2xl text-dark mb-4">Network Insights</h3>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>• Western Line runs parallel to the western coastline and handles massive rush hour load.</li>
          <li>• Harbour Line connects major dock, industrial, and business clusters across the city.</li>
          <li>• Central Line stretches deep into suburban megaclusters like Kalyan, Thane and Karjat.</li>
          <li>• Interchange hubs like Dadar, Kurla and Andheri form the busiest cross-network nodes.</li>
        </ul>
      </div>

    </section>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2 shadow-sm">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-gray-800 text-xs">{label}</span>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="w-6 h-6 text-primary">{icon}</div>
      <div className="flex flex-col">
        <span className="font-semibold text-dark">{value}</span>
        <span className="text-xs text-gray-600">{label}</span>
      </div>
    </div>
  );
}
