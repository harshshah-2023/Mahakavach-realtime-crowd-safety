import { useNavigate } from "react-router-dom";
import { ChevronRight, Users } from "lucide-react";

export default function CommunityBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-gray-100 border border-gray-200 rounded-xl overflow-hidden mt-12">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-8 py-8 lg:py-10 gap-6">

        {/* Left Content */}
        <div className="flex flex-col gap-3 max-w-xl text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-red-600 font-semibold tracking-wide text-xs lg:text-sm uppercase">
            <Users className="w-4 h-4" />
            Live Community Chat
          </div>

          <h2 className="font-emirates text-2xl lg:text-3xl xl:text-4xl text-gray-900 leading-snug">
            Chat with Fellow Commuters in Real Time
          </h2>

          <p className="text-sm lg:text-base text-gray-600">
            Get live crowd updates, platform info and travel alerts directly from Mumbai local commuters.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/community")}
          className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-all text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-md hover:shadow-lg min-w-[200px]"
        >
          Open Community Chat
          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

      </div>
    </section>
  );
}