import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import heroImg from "../assets/BannerImg.png"; // replace with your banner
import aboutImg1 from "../assets/banner.png";   // commuter/crowd photo
import aboutImg2 from "../assets/BannerImg.png";   // trains/platform safety

export default function About() {
  return (
    <div className="w-full min-h-screen bg-white text-dark font-inter select-none">

      {/* =================== CINEMATIC HERO =================== */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">

        {/* Background Cinematic Layer */}
        {/* <div className="absolute inset-0 z-0">
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
        </div> */}

        {/* Luxury Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30" />

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25,0.1,0.25,1] }}
          className="relative z-10 text-center px-6"
        >
          <p className="tracking-[0.3em] uppercase text-xs text-[#D4AF37] mb-4">
            Mumbai Suburban Network
          </p>
          <h1 className="font-emirates text-white text-4xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight">
            Where Millions Move,<br />
            <span className="text-white/80 italic font-light">
              We Bring Clarity.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/80 text-sm md:text-base leading-relaxed mt-6">
            Safety, awareness and dignity for every commuter — powered by real-time intelligence and human empathy.
          </p>
        </motion.div>

      </section>

      {/* =================== PHILOSOPHY STATEMENT =================== */}
      <section className="py-28 px-6 md:px-20 lg:px-32 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-emirates text-3xl md:text-5xl text-center leading-snug mb-10"
        >
          Our Purpose is Simple:<br />
          <span className="text-primary italic">
            Protect Every Journey.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="max-w-4xl mx-auto text-gray-600 text-center leading-relaxed text-sm md:text-[1.1rem]"
        >
          For millions across Mumbai, the suburban rail is not just a commute — it is survival.
          In packed coaches and chaotic platforms, information becomes life-saving currency.
          Mahakavach was born from a belief that no commuter should be left unaware, unsafe,
          or unheard — no matter the hour, the crowd, or the complexity of the city.
        </motion.p>
      </section>

      {/* =================== FLAGSHIP VISUAL BLOCK =================== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-6 md:px-20 lg:px-32 items-center py-20">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={heroImg} className="rounded-3xl shadow-2xl object-cover" alt="" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="tracking-[0.25em] uppercase text-xs text-primary font-semibold mb-3">
            Our Mission
          </p>
          <h3 className="font-emirates text-3xl md:text-4xl leading-snug mb-6">
            Turning Chaos Into<br />Knowledge and Safety.
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Rush hours in Mumbai are intense, unpredictable, and risky — especially for women.
            We transform dispersed commuter data into structured visibility:
            predictive crowd maps, platform alerts, and women coach safety signals,
            all in real time.
          </p>
        </motion.div>

      </section>

      {/* =================== IMPACT METRICS (PREMIUM) =================== */}
      <section className="w-full bg-[#111] text-white py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {[
            ["80 Lakh+", "Daily Riders"],
            ["120+", "Stations Connected"],
            ["3 Lines", "Western / Central / Harbour"],
            ["Real-Time", "Crowd Intelligence"]
          ].map(([num, label], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            >
              <div className="text-3xl md:text-4xl font-emirates text-[#D4AF37]">
                {num}
              </div>
              <div className="text-xs mt-2 tracking-widest opacity-70 uppercase">
                {label}
              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* =================== FUTURE VISION =================== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-6 md:px-20 lg:px-32 items-center py-28">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="tracking-[0.25em] uppercase text-xs text-primary font-semibold mb-3">
            Our Vision
          </p>
          <h3 className="font-emirates text-3xl md:text-4xl leading-snug mb-6">
            A City Where<br />Movement is Safe by Design.
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
            Our long-term ambition is to build human-centered
            transport intelligence for India’s megacities.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            From predictive emergency response to women-focused safety layers
            and integrated commuter governance, Mahakavach is shaping the
            future of real-time urban mobility.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={heroImg} className="rounded-3xl shadow-2xl object-cover" alt="" />
        </motion.div>

      </section>

      {/* =================== MEANINGFUL CTA =================== */}
      <section className="py-28 text-center bg-white">
        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-emirates text-3xl md:text-4xl mb-8"
        >
          This is More Than Technology.<br />
          <span className="italic text-primary">It is Civic Responsibility.</span>
        </motion.h3>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-3 bg-primary text-white px-9 py-3 rounded-md font-semibold tracking-wider hover:bg-red-700 transition"
        >
          Explore the Vision
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </section>

    </div>
  );
}
