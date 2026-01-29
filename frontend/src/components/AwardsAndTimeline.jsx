import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "../assets/logo2.png";

const timeline = [
  {
    year: "Before You Leave",
    title: "Station Crowd Awareness",
    text:
      "Check how crowded your boarding station is right now. Avoid arriving during extreme congestion and plan entry timing more confidently.",
  },
  {
    year: "At the Platform",
    title: "Coach-Level Crowd Visibility",
    text:
      "Understand which sections of the train are relatively less crowded before boarding, helping you distribute safely along the platform.",
  },
  {
    year: "During Peak Hours",
    title: "Rush Hour Intelligence",
    text:
      "Identify active rush windows across Central, Harbour, and Western lines, and adjust travel choices during high-density periods.",
  },
  {
    year: "Everyday Travel",
    title: "Safety-First Crowd Signals",
    text:
      "Crowd insights are generated using real-time signals, historical trends, and commuter inputs — without storing any personal or facial data.",
  },
];

export default function AwardsAndTimeline() {
  const containerRef = useRef(null);

  // Scroll progress of timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  // Height of center line grows with scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="w-full bg-gray-100 select-none">

      {/* ================= TRUST PANEL ================= */}
      <div className="w-full bg-white py-20 px-4 text-center">
        <span className="tracking-[0.25em] text-xs uppercase text-gray-500">
          Travel Smarter Before You Board
        </span>

        <div className="mt-8 mx-auto w-28 h-28 rounded-full overflow-hidden border border-gray-300 bg-white">
          <img src={logo} alt="MahaKavach" className="w-full h-full object-cover" />
        </div>

        <h2 className="font-emirates text-3xl md:text-4xl lg:text-5xl text-dark mt-6">
          What You Can Check Before Boarding
        </h2>

        <p className="max-w-3xl mx-auto mt-4 text-gray-600 text-sm md:text-base font-medium">
          Mahakavach helps Mumbai commuters make informed decisions — reducing
          uncertainty, crowd stress, and platform risk before every journey.
        </p>
      </div>

      {/* ================= SCROLL TIMELINE ================= */}
      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto px-4 py-20"
      >
        {/* Center Static Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[1.5px] bg-gray-300" />

        {/* Animated Progress Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-primary origin-top"
        />

        <div className="space-y-16 md:space-y-24">
          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-md" />
                  <span className="mt-3 text-xs uppercase tracking-widest text-primary font-semibold">
                    {item.year}
                  </span>
                </div>

                {/* Card */}
                <motion.div
                  initial={{ scale: 0.96 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 w-full md:w-[46%] mt-10 md:mt-0 ${
                    isLeft ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <h4 className="text-lg font-semibold text-dark">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
