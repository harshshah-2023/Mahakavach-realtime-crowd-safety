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
    <section className="w-full bg-[#f8f8f8] py-12 sm:py-16 md:py-24 px-4 sm:px-6 select-none border-t border-gray-200">

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-10 md:mb-14">
        <h2 className="font-emirates text-2xl sm:text-3xl md:text-4xl text-dark px-2">
          Mumbai Suburban Rail Network
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-xs sm:text-sm md:text-base mt-3 sm:mt-4 px-2 leading-relaxed">
          Explore Mumbai's interconnected rail ecosystem spanning 3 corridors, 120+ stations,
          interchange hubs, and suburban extension routes.
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-end items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-2">
        <button
          onClick={() => setOverlay(!overlay)}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-md text-xs sm:text-sm shadow-sm hover:bg-gray-50 flex-shrink-0"
        >
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          <span className="hidden xs:inline">{overlay ? "Hide Labels" : "Show Labels"}</span>
          <span className="inline xs:hidden">{overlay ? "Hide" : "Show"}</span>
        </button>

        <div className="flex gap-1 sm:gap-2">
          <button 
            onClick={zoomOut} 
            className="p-1.5 sm:p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 flex-shrink-0"
          >
            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          </button>
          <button 
            onClick={zoomIn} 
            className="p-1.5 sm:p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          </button>
        </div>
      </div>

      {/* MAP FRAME */}
      <div className="max-w-6xl mx-auto rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-lg sm:shadow-xl border border-gray-200 overflow-hidden relative">

        {/* Map Container */}
        <div className="overflow-auto w-full h-[400px] xs:h-[450px] sm:h-[500px] md:h-[600px] lg:h-[650px] p-4 sm:p-6 md:p-8">
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
      <div className="max-w-6xl mx-auto mt-6 sm:mt-8 md:mt-10 px-2">
        <h3 className="text-base sm:text-lg font-semibold text-dark mb-3 sm:mb-4">Legend</h3>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
          <LegendItem color="bg-blue-500" label="Harbour Line" />
          <LegendItem color="bg-red-500" label="Western Line" />
          <LegendItem color="bg-green-500" label="Central Line" />
          <LegendItem color="bg-yellow-500" label="MRTS (Under Construction)" />
        </div>
      </div>

      {/* STATISTICS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-14 px-2">
        <Stat icon={<MapPin />} label="Stations" value="120+" />
        <Stat icon={<TrainFront />} label="Daily Riders" value="80L+" />
        <Stat icon={<Route />} label="Corridors" value="3" />
      </div>

      {/* AUX INFO */}
      <div className="max-w-6xl mx-auto mt-8 sm:mt-12 md:mt-16 px-2">
        <h3 className="font-emirates text-xl sm:text-2xl text-dark mb-3 sm:mb-4">Network Insights</h3>
        <ul className="text-gray-600 text-xs sm:text-sm space-y-1.5 sm:space-y-2">
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
    <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-gray-200 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm">
      <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${color}`} />
      <span className="text-gray-800 text-xs sm:text-xs">{label}</span>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm">
      <div className="w-5 h-5 sm:w-6 sm:h-6 text-primary">{icon}</div>
      <div className="flex flex-col">
        <span className="font-semibold text-dark text-sm sm:text-base">{value}</span>
        <span className="text-xs text-gray-600">{label}</span>
      </div>
    </div>
  );
}