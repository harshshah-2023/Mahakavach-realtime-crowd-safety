import React, { useState } from "react";
import { motion } from "framer-motion";
import crowdpic from "../assets/crowdPic.png"
import { useNavigate } from "react-router-dom";
import station from "../assets/stationsx.png"
import trainx from "../assets/trainsx.png"
import crowdx from "../assets/crowdx.png"
import talksx from "../assets/talksx.png"

export default function MahakavachAbout() {
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);

  const cards = [
    {
      id: 0,
      title: "LIVE movement Crowd at Mumabi Sub-urban Raliways",
      desc: "Crowd density predictions for trains, coaches & platforms before congestion forms.",
      num: "01",
      route: "/rush-hours",
      image: station
    },
    {
      id: 1,
      title: "At station? Update Mumbaikars abour Crowd",
      desc: "Context-aware risk indicators for women’s coaches using crowd, time & history.",
      num: "02",
       route: "/contribute",
        image: trainx
    },
    {
      id: 2,
      title: "Talk to Mumbaikars Currently Travelling",
      desc: "Early crowd surge alerts for commuters and operators during peak conditions.",
      num: "03",
       route: "/community",
       image: talksx
       
    },
    {
      id: 3,
      title: "Check Rush at All the Stations",
      desc: "Reliable APIs for crowd trends, alerts, and emergency coordination.",
      num: "04",
       route: "/Dashboard",
         image: crowdx
    },
  ];
  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <section className="w-full bg-gray-100 py-20 px-6 md:px-16 lg:px-28 select-none mt-10">

      {/* TOP FEATURE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-16">

        {cards.map((card, i) => {
          const isHighlighted =
            hoverIndex === i || (hoverIndex === null && i === 1);

          return (
            <motion.div
              key={card.id}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => handleCardClick(card.route)}
              animate={{
  backgroundColor: isHighlighted ? "#D60201" : "#ffffff",
  color: isHighlighted ? "#ffffff" : "#1a1a1a",
  scale: isHighlighted ? 1.03 : 1,
  boxShadow: isHighlighted
    ? "0px 10px 30px rgba(214,2,1,0.35)"
    : "0px 4px 12px rgba(0,0,0,0.06)",
}}

              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-xl p-6 flex flex-col items-start border border-gray-200 cursor-pointer"
            >
              <div
                className={`font-semibold mb-2 tracking-wide ${
                  isHighlighted ? "text-white" : "text-primary"
                }`}
              >
                {card.num}
              </div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p
                className={`text-sm leading-relaxed ${
                  isHighlighted ? "text-white/90" : "text-gray-600"
                }`}
              >
                {card.desc}
              </p>
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: isHighlighted ? "brightness(0.9)" : "brightness(1)"
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MAIN ABOUT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-10 ">
        
        {/* Left Image Block */}
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <img
            src={crowdpic}
            alt="Mahakavach"
            className="w-full h-full object-cover"
          />
          <div className="absolute left-4 top-4 bg-primary text-white px-4 py-2 rounded-lg shadow-md text-sm font-semibold">
            Travelling in Rush ? 
          </div>
        </div>

        {/* Right Content */}
        <div>
          <p className="text-primary uppercase tracking-widest font-semibold mb-2">
            Planning your commute?
          </p>

          <h2 className="text-3xl font-bold leading-snug mb-4">
            Choose the Least Crowded Train Before You Board
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed text-xl font-emirates">
            Mahakavach is a crowd intelligence system for Mumbai’s suburban rail
            network. It predicts crowd density at stations, trains, and individual
            coaches using schedules, delays, context signals, and privacy-safe
            commuter inputs , helping travelers and operators act early.
          </p>
         {/* <button
  onClick={() => navigate("/station/CSMT/trains")}
  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
>
  View arriving trains
</button> */}




          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mb-8 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary font-bold">•</span> Station & Platform Heatmaps
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary font-bold">•</span> Coach-Level Crowd Estimates
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary font-bold">•</span> Predictive Crowd Alerts
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary font-bold">•</span> Operator & Commuter Dashboards
            </li>
          </ul>

          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold">80 Lakh+</span>
              <span className="text-xs text-gray-500">Daily Riders Impacted</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold">120+</span>
              <span className="text-xs text-gray-500">Stations Modeled</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold">Per Coach</span>
              <span className="text-xs text-gray-500">Crowd Prediction</span>
            </div>
          </div>

          <button
           onClick={() => navigate("/Dashboard")}
          className="mt-8 bg-primary text-white text-sm px-6 py-3 rounded-lg shadow hover:bg-red-500 transition cursor-pointer">

           Find a Less Crowded Train →
          </button>
        </div>
      </div>
    </section>
  );
}
