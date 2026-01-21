import { useNavigate } from "react-router-dom";
import { ChevronRight, Users } from "lucide-react";
import Community from "../pages/Community";


export default function CommunityBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-gray-100 border border-gray-200 rounded-xl overflow-hidden mt-12">
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-10 gap-6">

        {/* Left */}
        <div className="flex flex-col gap-3 max-w-xl">
          <div className="flex items-center gap-2 text-primary font-semibold tracking-wide text-sm uppercase">
            <Users className="w-4 h-4" />
            Live Community Chat
          </div>

          <h2 className="font-emirates text-3xl md:text-4xl text-dark leading-snug">
            Chat with Fellow Commuters in Real Time
          </h2>

          <p className="text-sm md:text-base text-gray-600">
            Get live crowd updates, platform info and travel alerts directly from Mumbai local commuters.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/community")}
          className="group inline-flex items-center gap-2 bg-primary hover:bg-red-700 transition-all text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-md"
        >
          Open Community Chat
          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

      </div>
    </section>
  );
}
