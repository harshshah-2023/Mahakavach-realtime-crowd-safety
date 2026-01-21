import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Help() {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-dark font-inter select-none">

      {/* ================= HERO ================= */}
      <section className="w-full pt-28 pb-20 px-6 md:px-12 lg:px-32">
        <div className="max-w-4xl">
          <h1 className="font-emirates text-4xl md:text-5xl text-dark mb-4">
            Help & Support
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Get quick answers, explore documentation, or reach out to our support team.
            We’re here to make your railway experience smoother.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 max-w-xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            placeholder="Search topics, e.g. platform alerts, PNR issues..."
            className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
      </section>


      {/* ================= QUICK TOPICS ================= */}
      <section className="px-6 md:px-12 lg:px-32 pb-24">
        <div className="max-w-6xl">
          <h2 className="font-emirates text-2xl text-dark mb-6">
            Common Topics
          </h2>

          <div classname="space-y-1">
            {[
              "Platform & Train Status",
              "Crowd Heatmap Accuracy",
              "PNR & Booking Issues",
              "Community Chat Policies",
              "Safety & Incident Reporting"
            ].map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.15 }}
                className="w-full text-left px-0 py-3 text-sm text-gray-700 hover:text-primary border-b border-gray-200"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </section>


      {/* ================= CONTACT SECTION ================= */}
      <section className="px-6 md:px-12 lg:px-32 pb-28 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 pt-20">

          {/* Text Block */}
          <div>
            <h3 className="font-emirates text-2xl text-dark mb-4">
              Contact Support
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mb-8">
              For product issues, integration queries, or commuter safety concerns,
              our support team typically responds within 24–48 hours.
            </p>

            <ul className="text-sm space-y-2 text-gray-700">
              <li>Email: support@mahakavach.in</li>
              <li>Hours: 10 AM – 6 PM IST</li>
            </ul>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <input
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <input
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <textarea
              rows={5}
              placeholder="How can we help?"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none resize-none focus:border-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white text-sm px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Submit
            </button>
          </form>

        </div>
      </section>

    </div>
  );
}
