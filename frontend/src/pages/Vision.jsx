const Vision = () => {
  return (
    <div className="w-full bg-[#0b0b0b] text-white">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b] via-[#111] to-[#161616]" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-20">
          <span className="block text-xs tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
            Our Vision
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight max-w-4xl">
            Making Every Train Journey <br className="hidden sm:block" />
            <span className="text-white/90">Safer, Smarter, Predictable</span>
          </h1>

          <p className="mt-8 text-base sm:text-lg text-white/75 max-w-3xl leading-relaxed">
            We envision a future where commuters understand what lies ahead
            before they step onto the platform — not after the rush begins.
          </p>
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="py-24 sm:py-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6">
            The Challenge We Aim to Solve
          </h2>

          <p className="text-white/75 leading-relaxed text-base sm:text-lg">
            Urban rail networks move millions daily, yet commuters still travel
            blind — uncertain about crowd intensity, sudden surges, or platform
            safety. This lack of foresight compromises comfort, safety, and
            decision-making for passengers and operators alike.
          </p>
        </div>
      </section>

      {/* ================= VISION PILLARS ================= */}
      <section className="bg-[#111] py-24 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20">
          <h2 className="font-serif text-2xl sm:text-3xl mb-16">
            Our Vision Pillars
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Predict Before Congestion",
                text:
                  "Anticipate crowd formation across trains and stations using real-time intelligence before congestion becomes a safety risk.",
              },
              {
                title: "Commuter-Centric Design",
                text:
                  "Deliver clear, actionable signals that help commuters choose safer coaches, better timings, and calmer routes.",
              },
              {
                title: "Trust & Privacy First",
                text:
                  "Design systems that respect anonymity, minimise data exposure, and earn long-term public trust.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl p-8 hover:border-white/20 transition"
              >
                <h3 className="text-lg font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW WE ACHIEVE ================= */}
      <section className="py-24 sm:py-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6">
            How We Move Toward This Vision
          </h2>

          <p className="text-white/75 leading-relaxed text-base sm:text-lg">
            By combining real-time commuter signals, historical patterns,
            AI-driven crowd analysis, and community participation, Mahakavach
            evolves as a living system — adapting continuously to the rhythm of
            the city.
          </p>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="bg-[#111] py-24 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20">
          <h2 className="font-serif text-2xl sm:text-3xl mb-16">
            Impact at Scale
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "For Commuters",
                text:
                  "Reduced uncertainty, safer boarding, and confidence in daily travel decisions.",
              },
              {
                title: "For Operators",
                text:
                  "Better crowd visibility, improved response planning, and smarter resource allocation.",
              },
              {
                title: "For Cities",
                text:
                  "Resilient transport infrastructure built on data, transparency, and trust.",
              },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="py-28 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6">
            A Smarter Future for Public Transport
          </h2>

          <p className="text-white/75 leading-relaxed text-base sm:text-lg">
            Our vision is not to monitor movement —
            <br className="hidden sm:block" />
            but to empower millions to travel with foresight, safety, and
            confidence every single day.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Vision;
