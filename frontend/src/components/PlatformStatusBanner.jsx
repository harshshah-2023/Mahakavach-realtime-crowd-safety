import { motion } from "framer-motion";
import { ChevronRight, TrainFront } from "lucide-react";
import platformImg from "../assets/platform.jpg";

export default function PlatformStatusBanner() {
  // Custom easing for a "heavy", luxurious reveal
  const luxuryEase = [0.25, 0.1, 0.25, 1.0];

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden select-none flex items-center bg-[#0a0a0a]">
      
      {/* --- Background Layer --- */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          className="w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${platformImg})` }}
        />
      </div>

      {/* --- Gradients for Readability & Mood --- */}
      {/* 1. Heavy dark gradient from left to allow white text to pop */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent z-0" />
      {/* 2. Bottom vignette for grounding */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0" />

      {/* --- Content Container --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="flex flex-col justify-center">
          
          {/* Decorative Top Line (Gold) */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: luxuryEase }}
            className="w-16 h-[2px] bg-[#D4AF37] mb-6"
          />

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: luxuryEase }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-[#D4AF37] font-medium tracking-[0.2em] text-xs uppercase">
              Live Insights
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: luxuryEase }}
            // NOTE: Ensure 'font-serif' is mapped to Playfair Display or similar in Tailwind
            className="font-serif text-white text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6"
          >
            Platform Status <br />
            <span className="italic text-white/80 font-light">Redefined.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: luxuryEase }}
            className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-10 border-l-2 border-white/10 pl-6"
          >
            Experience seamless travel. Know exactly which platform your train arrives on, with real-time crowd analytics at your fingertips.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: luxuryEase }}
          >
            <button className="group relative overflow-hidden bg-[#C8102E] text-white px-8 py-4 rounded-sm shadow-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,16,46,0.4)]">
              {/* Button content */}
              <div className="relative z-10 flex items-center gap-4">
                <span className="font-sans text-sm tracking-widest uppercase font-semibold">
                  Check Status
                </span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              
              {/* Hover Effect Layer (Gold Sheen) */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </motion.div>
        </div>

        {/* --- Right Side Decorative Element (Glass Card) --- */}
        <div className="hidden lg:flex items-center justify-end relative">
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: luxuryEase }}
                className="w-72 h-40 backdrop-blur-md bg-white/5 border border-white/10 rounded-sm p-6 flex flex-col justify-between"
             >
                <div className="flex justify-between items-start">
                    <TrainFront className="text-[#D4AF37] w-6 h-6" />
                    <span className="text-xs text-white/50 tracking-wider">NEXT ARRIVAL</span>
                </div>
                <div>
                    <div className="text-3xl text-white font-serif">12:45 <span className="text-base text-white/50 font-sans">PM</span></div>
                    <div className="text-sm text-gray-400 mt-1">Platform 4 &bull; On Time</div>
                </div>
             </motion.div>
        </div>
      </div>
    </section>
  );
}