import { useState } from "react";
import { motion } from "framer-motion";
// import suburbanMap from "../assets/banner.png";
import mumbaimap from "../assets/mumbai-local-trains.jpg"
import { TrainFront, MapPin } from "lucide-react";

// Beginner-friendly rail info
const corridors = [
  {
    id: "western",
    name: "Western Line",
    color: "text-orange-600",
    description: "Runs from Churchgate to Dahanu Road through major western suburbs like Bandra, Andheri, Borivali & Virar.",
    routes: [
      { direction: "South → North", path: "Churchgate → Dahanu Road" },
      { direction: "North → South", path: "Dahanu Road → Churchgate" },
    ],
    keyStations: ["Churchgate", "Mumbai Central", "Dadar", "Bandra", "Andheri", "Borivali", "Virar"],
  },
  {
    id: "central",
    name: "Central Line",
    color: "text-green-600",
    description: "Covers Mumbai CST to Kasara & Khopoli via major hubs like Dadar, Thane & Kalyan.",
    routes: [
      { direction: "South → North-East", path: "CST → Kasara" },
      { direction: "South → South-East", path: "CST → Khopoli" },
    ],
    keyStations: ["CST", "Dadar", "Kurla", "Ghatkopar", "Mulund", "Thane", "Kalyan"],
  },
  {
    id: "harbour",
    name: "Harbour Line",
    color: "text-blue-600",
    description: "Connects CST to Panvel & Andheri via Wadala, Kurla, Vashi & Nerul.",
    routes: [
      { direction: "South → East", path: "CST → Panvel" },
      { direction: "South → West", path: "CST → Andheri" },
    ],
    keyStations: ["CST", "Wadala Road", "Kurla", "Vashi", "Nerul", "Belapur", "Panvel"],
  },
];

export default function Route() {
  const [selected, setSelected] = useState("western");
  const corridor = corridors.find(c => c.id === selected);

  return (
    <section className="w-full bg-white select-none">

      {/* HERO */}
     <div className="relative w-full h-[45vh] flex items-center justify-center overflow-hidden">

  {/* Premium gray gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#1f1f1f] to-[#2c2c2c]" />

  {/* Subtle depth overlay */}
  <div className="absolute inset-0 bg-black/25" />

  <div className="relative z-10 text-center text-white px-6">
    <h1 className="text-4xl md:text-6xl font-serif tracking-wide">
      Mumbai Rail Routes
    </h1>

    <p className="mt-3 text-sm md:text-base text-white/85 max-w-2xl mx-auto">
      Understand how Mumbai travels across its massive suburban rail network.
    </p>
  </div>
</div>


      {/* OVERVIEW CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 py-16">
        <OverviewCard icon={<TrainFront className="w-8 h-8" />} title="3 Corridors" detail="Western, Central & Harbour" />
        <OverviewCard icon={<TrainFront className="w-8 h-8" />} title="Hundreds of Trains" detail="High frequency peak hours" />
        <OverviewCard icon={<MapPin className="w-8 h-8" />} title="120+ Stations" detail="Across Greater Mumbai region" />
      </div>

      {/* MAP */}
      <div className="w-full max-w-6xl mx-auto px-6 mb-16">
        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <img src={mumbaimap} alt="Map" className="w-full object-cover hover:scale-[1.02] transition duration-500" />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">Swipe/Zoom for details</p>
      </div>

      {/* SELECTOR TAB */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-10">
          {corridors.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                selected === c.id ? "bg-primary text-white border-primary" : "border-gray-300 text-gray-700 hover:border-black"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* CORRIDOR DETAILS */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
          <h2 className={`text-2xl font-semibold ${corridor.color}`}>{corridor.name}</h2>
          <p className="text-sm text-gray-600 mt-2 max-w-2xl">{corridor.description}</p>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Operating Directions</h3>
            <div className="space-y-2">
              {corridor.routes.map((r, idx) => (
                <div key={idx} className="p-3 border rounded-lg bg-gray-50 text-sm">
                  <span className="font-semibold text-gray-800">{r.direction}:</span> {r.path}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Major Stations</h3>
            <div className="flex flex-wrap gap-2">
              {corridor.keyStations.map((s, idx) => (
                <span key={idx} className="px-3 py-1 text-xs rounded-full bg-gray-100 border text-gray-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TERMINALS + INTERCHANGE */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-xl font-semibold mb-4">Important Interchange & Terminal Stations</h2>
        <div className="text-sm text-gray-600 leading-relaxed space-y-2">
          <p><b>Dadar</b> connects Western & Central lines.</p>
          <p><b>Wadala Road</b> connects Harbour to Trans-harbour.</p>
          <p><b>Kurla</b> connects Harbour to Central.</p>
          <p><b>Thane & Kalyan</b> act as major junctions on Central.</p>
        </div>
      </div>
    </section>
  );
}

/* Small card component */
function OverviewCard({ icon, title, detail }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="p-6 border border-gray-200 rounded-xl bg-gray-50 shadow-sm">
      <div className="text-primary mb-3">{icon}</div>
      <div className="font-semibold text-gray-800">{title}</div>
      <div className="text-sm text-gray-600 mt-1">{detail}</div>
    </motion.div>
  );
}