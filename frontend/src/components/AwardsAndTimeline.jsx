import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo2.png"

const timeline = [
  {
    year: "2022",
    title: "Concept Validation",
    text: "Modeled crowd dynamics across Mumbai stations and validated safety risk scoring for commuter environments.",
    image: null,
  },
  {
    year: "2023",
    title: "Pilot on Harbour Line",
    text: "Live crowd heatmaps and coach-level safety indicators tested between Panvel ↔ CSMT corridor with early adopter groups.",
    image: "/placeholder-image.jpg", // replace with your asset
  },
  {
    year: "2024",
    title: "City-Level Expansion",
    text: "Western & Central lines onboarded with structured commuter feedback loops, enabling better alert distribution logic.",
    image: null,
  },
  {
    year: "2025",
    title: "Live Deployment & Governance",
    text: "Mahakavach deployed across Mumbai suburban network, supporting millions of commuters with real-time insights.",
    image: null,
  },
];

export default function AwardsAndTimeline() {
  return (
    <section className="w-full bg-gray-100 select-none">
      
      {/* ====================== SECTION 1 — AWARDS PANEL ====================== */}
      <div className="w-full bg-white py-20 text-center px-6">
        
        {/* Small Label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="tracking-[0.25em] text-xs uppercase text-gray-500"
        >
          Verified Commuter Insights
        </motion.span>

          <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-10 mx-auto"
        >
          <div className="w-32 h-32 mx-auto border border-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs">
           <div className="w-32 h-32 rounded-full overflow-hidden bg-white">
  <img
    src={logo}
    alt="MahaKavach Logo"
    className="w-full h-full object-cover"
  />
</div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="font-emirates text-3xl md:text-4xl lg:text-5xl text-dark mt-4"
        >
          Mumbai’s Most Reliable Railway Safety Platform
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-3xl mx-auto mt-5 text-gray-600 leading-relaxed text-sm md:text-base font-bold"
        >
          Trusted by daily commuters across Mumbai rail lines. Built to deliver real-time safety alerts,
          crowd insights, and accurate platform information that helps millions travel smarter.
        </motion.p>

        {/* Logo Placeholder */}
      

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-14 max-w-4xl mx-auto text-gray-500 text-xs leading-relaxed"
        >
          Disclaimer: Real-time accuracy depends on commuter submissions and available railway data.
          Mahakavach aggregates insights to improve situational awareness for commuters, authorities,
          and safety responders.
        </motion.p>
      </div>


      {/* ====================== SECTION 2 — METRICS + TIMELINE ====================== */}
    {/* ====================== PREMIUM TIMELINE SECTION ====================== */}
<div className="w-full bg-gray-100 py-24 px-6">
  
  {/* Section Title */}
  <div className="max-w-6xl mx-auto text-center mb-20">
    <h3 className="font-emirates text-3xl md:text-4xl text-dark">
      Building a Better Railway Experience, One Milestone at a Time
    </h3>
    <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mt-4">
      From early conceptual modeling to live deployment across Mumbai’s busiest rail corridors,
      Mahakavach evolves through meaningful commuter-driven insights and safety innovation.
    </p>
  </div>

  {/* Timeline Container */}
  <div className="relative max-w-6xl mx-auto">
    
    {/* Vertical Line */}
    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[1.5px] bg-gray-300" />

    <div className="space-y-20">
      {timeline.map((item, index) => {
        const isLeft = index % 2 === 0;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`relative flex flex-col lg:flex-row items-start gap-10 ${
              isLeft ? "lg:pr-[55%]" : "lg:pl-[55%]"
            }`}
          >
            {/* Marker + Year */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center ${
                isLeft ? "lg:-translate-x-1/2" : "lg:-translate-x-1/2"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-primary border border-white shadow-md"></div>
              <span className="mt-3 text-primary text-xs tracking-widest uppercase font-semibold">
                {item.year}
              </span>
            </div>

            {/* Timeline Card */}
            <div
              className={`bg-white border border-gray-200 shadow-lg rounded-xl p-8 lg:w-[48%] ${
                isLeft ? "lg:ml-0" : "lg:mr-0"
              }`}
            >
              <h4 className="text-lg font-semibold text-dark">{item.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed mt-2">
                {item.text}
              </p>

              {item.image && (
                <img
                  src={item.image}
                  alt="timeline"
                  className="rounded-xl mt-5 w-full h-48 object-cover border border-gray-200"
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</div>

    </section>
  );
}
