import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import faqHero from "../assets/banner.png"; // replace with your hero image

const faqCategories = [
  {
    category: "General",
    items: [
      {
        q: "What is Mahakavach?",
        a: "Mahakavach is an AI-driven commuter safety platform for the Mumbai suburban railway network, providing real-time crowd insights, platform alerts, and women's coach risk predictions."
      },
      {
        q: "Is Mahakavach an official government app?",
        a: "Mahakavach is built to integrate with civic safety and public commuter systems. Official partnerships and integrations will be announced publicly as they occur."
      }
    ]
  },
  {
    category: "Safety & Features",
    items: [
      {
        q: "How does the women's coach safety score work?",
        a: "Safety scores are computed using commuter inputs, historical patterns, and contextual risk factors such as time, occupancy, and station segments."
      },
      {
        q: "How accurate are the crowd levels?",
        a: "Accuracy depends on commuter density and available data points. Mahakavach uses aggregation and validation logic to improve reliability over time."
      }
    ]
  },
  {
    category: "Data & Privacy",
    items: [
      {
        q: "Do you collect personal data?",
        a: "We minimize personal data collection and avoid sensitive identifiers. Crowd insights are aggregated without exposing personal identity."
      },
      {
        q: "Is location tracking required?",
        a: "Optional location sharing improves accuracy for station-level insights but is never mandatory for basic usage."
      }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
    )
  }));

  return (
    <div className="w-full min-h-screen bg-white text-dark font-inter select-none">

      {/* ===== HERO ===== */}
      <section className="relative w-full h-[55vh] overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${faqHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 px-8 md:px-16 lg:px-24 pb-20"
        >
          <p className="tracking-[0.25em] text-xs text-[#D4AF37] uppercase mb-3">
            Help & Support
          </p>
          <h1 className="font-emirates text-4xl md:text-6xl text-white leading-tight">
            Frequently Asked Questions
          </h1>
        </motion.div>
      </section>

      {/* ===== SEARCH BAR ===== */}
      <section className="py-14 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto space-y-16">

          {filteredCategories.map((category, i) => (
            category.items.length > 0 && (
              <div key={i}>
                <h2 className="font-emirates text-2xl md:text-3xl mb-6 text-dark">
                  {category.category}
                </h2>

                <div className="space-y-4">
                  {category.items.map((item, j) => {
                    const idx = `${i}-${j}`;
                    return (
                      <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                        >
                          <span className="font-medium text-sm md:text-base text-dark">{item.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              openIndex === idx ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {openIndex === idx && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35 }}
                            >
                              <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-200">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          ))}

          {filteredCategories.every(c => c.items.length === 0) && (
            <p className="text-center text-gray-600 text-sm">
              No results found. Try different keywords.
            </p>
          )}
        </div>
      </section>

      {/* ===== CTA FOOTER ===== */}
      <section className="py-20 bg-gray-100 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-emirates text-2xl md:text-3xl mb-3"
        >
          Still need assistance?
        </motion.h3>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          Our support team will help you with any questions.
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-red-700 transition">
          Contact Support
        </button>
      </section>

    </div>
  );
}
