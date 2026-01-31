import { HEAT_THEME } from "../utils/heatColors";
import { useEffect, useState } from "react";
import {
  TrendingUp,
  Clock,
  Users,
  AlertTriangle,
  Info,
  ShieldCheck,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";

//  const navigate = useNavigate(); 

export default function StationHeatMap({ density = "UNKNOWN" }) {
   const navigate = useNavigate(); 
  const theme = HEAT_THEME[density] || HEAT_THEME.UNKNOWN;

 
  
  const pulseDuration = {
    VERY_LOW: "6s",
    LOW: "5s",
    MEDIUM: "4s",
    HIGH: "3s",
    VERY_HIGH: "2s",
    UNKNOWN: "0s"
  }[density];

  const platformWidth = 800;
  const platformHeight = 80;
  const concourseWidth = 420;
  const concourseHeight = 140;

  // State for responsive scaling
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for additional info
  const stationStats = {
    lastUpdate: new Date().toLocaleTimeString(),
    peakHours: ["07:00-09:00", "17:00-19:00"],
    weeklyTrend: "+12% vs last week",
    averageDwellTime: "4.2 mins",
    facilities: ["WiFi", "Coffee Shop", "Restrooms", "Ticket Counter"],
    alerts: density === "HIGH" || density === "VERY_HIGH" ? [
      "Consider using alternative exits",
      "Platform 1 is busier than Platform 2"
    ] : []
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  console.log("StationHeatMap density:", density);
  console.log("Theme color:", theme.base);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-14">
      {/* Top Info Cards */}

      {/* ================= HERO STATUS STRIP ================= */}
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          <div>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">
              Live Crowd Status
            </p>

            <div className="flex items-center gap-4">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.base }}
              />
              <h1
                className="text-3xl md:text-4xl font-semibold"
                style={{ color: theme.base }}
              >
                {density.replace("_", " ")}
              </h1>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Last updated · {stationStats.lastUpdate}
            </p>
          </div>

          <div className="flex gap-10 text-sm">
            <div>
              <p className="text-gray-400">Weekly trend</p>
              <p className="font-semibold text-gray-900">
                {stationStats.weeklyTrend}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Avg. dwell time</p>
              <p className="font-semibold text-gray-900">
                {stationStats.averageDwellTime}
              </p>
            </div>
          </div>
        </div>
      </div>
  

      {/* Main Station Map Container */}
      <div className="relative w-full max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 p-4 md:p-6">
        {/* Premium station title */}
        <div className="mb-4 md:mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-serif">CENTRAL STATION</h2>
          <p className="text-gray-600 text-xs md:text-sm uppercase tracking-wider">Upper View Schematic</p>
          <div className="mt-2 flex justify-center items-center space-x-2">
            <div className="flex items-center text-sm text-gray-500">
              <Info className="w-4 h-4 mr-1" />
              Live crowd heat map
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              Auto-refresh every 30s
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox="0 0 1000 600"
            className="w-full min-w-[320px] block"
            style={{ 
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.08))",
              maxHeight: isMobile ? "400px" : "auto"
            }}
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
              </pattern>
              
              <linearGradient id="platformGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f9fafb" />
                <stop offset="100%" stopColor="#f3f4f6" />
              </linearGradient>
              
              <filter id="heatGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="heatGlowStrong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <style>{`
              .heat-pulse {
                animation: pulse ${pulseDuration} ease-in-out infinite;
              }
              .heat-pulse-platform {
                animation: pulsePlatform ${pulseDuration} ease-in-out infinite;
              }
              @keyframes pulse {
                0% { opacity: 0.6; }
                50% { opacity: 1; }
                100% { opacity: 0.6; }
              }
              @keyframes pulsePlatform {
                0% { opacity: 0.7; }
                50% { opacity: 1; }
                100% { opacity: 0.7; }
              }
            `}</style>

            <rect width="1000" height="600" fill="url(#grid)" opacity="0.3"/>

            {/* HEAT LAYERS */}
            <g transform="translate(100, 250)">
              <rect
                width={platformWidth}
                height={platformHeight}
                rx="8"
                fill={theme.base}
                className="heat-pulse-platform"
                filter="url(#heatGlowStrong)"
                opacity="0.8"
              />
            </g>

            <g transform="translate(100, 370)">
              <rect
                width={platformWidth}
                height={platformHeight}
                rx="8"
                fill={theme.base}
                className="heat-pulse-platform"
                filter="url(#heatGlowStrong)"
                opacity="0.8"
              />
            </g>

            <g transform="translate(50, 60)">
              <rect
                width="200"
                height="120"
                rx="12"
                fill={theme.base}
                className="heat-pulse"
                filter="url(#heatGlow)"
                opacity="0.8"
              />
            </g>

            <g transform="translate(290, 50)">
              <rect
                width={concourseWidth}
                height={concourseHeight}
                rx="12"
                fill={theme.base}
                className="heat-pulse"
                filter="url(#heatGlow)"
                opacity="0.8"
              />
            </g>

            <g transform="translate(750, 60)">
              <rect
                width="200"
                height="120"
                rx="12"
                fill={theme.base}
                className="heat-pulse"
                filter="url(#heatGlow)"
                opacity="0.8"
              />
            </g>

            {/* STATION STRUCTURE (same as before) */}
            <g transform="translate(50, 60)">
              <rect width="200" height="120" fill="none" stroke="#111827" strokeWidth="2.5" rx="12"/>
              <rect x="70" y="20" width="60" height="80" fill="#f3f4f6" stroke="#374151" strokeWidth="1.5" rx="4"/>
              <line x1="100" y1="20" x2="100" y2="100" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,4"/>
              <text x="100" y="110" textAnchor="middle" fill="#111827" fontSize={isMobile ? "12" : "14"} fontWeight="bold">ENTRY</text>
              <text x="100" y="130" textAnchor="middle" fill="#4b5563" fontSize={isMobile ? "9" : "10"} fontWeight="500">Main Entrance</text>
            </g>

            <g transform="translate(290, 50)">
              <rect width={concourseWidth} height={concourseHeight} fill="none" stroke="#111827" strokeWidth="2.5" rx="12"/>
              <line x1="30" y1="70" x2={concourseWidth-30} y2="70" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="8,4"/>
              <line x1="30" y1="90" x2={concourseWidth-30} y2="90" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="8,4"/>
              <circle cx="100" cy="35" r="6" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <circle cx={concourseWidth-100} cy="35" r="6" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <circle cx="210" cy="35" r="6" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <circle cx={concourseWidth-210} cy="35" r="6" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <text x={concourseWidth/2} y="20" textAnchor="middle" fill="#111827" fontSize={isMobile ? "12" : "14"} fontWeight="bold">CONCOURSE</text>
            </g>

            <g transform="translate(100, 250)">
              <rect width={platformWidth} height={platformHeight} fill="none" stroke="#111827" strokeWidth="2" rx="8"/>
              <line x1="20" y1={platformHeight-2} x2={platformWidth-20} y2={platformHeight-2} stroke="#dc2626" strokeWidth="3"/>
              <line x1="150" y1="15" x2="170" y2="15" stroke="#4b5563" strokeWidth="2"/>
              <line x1="350" y1="15" x2="370" y2="15" stroke="#4b5563" strokeWidth="2"/>
              <line x1="550" y1="15" x2="570" y2="15" stroke="#4b5563" strokeWidth="2"/>
              <line x1="750" y1="15" x2="770" y2="15" stroke="#4b5563" strokeWidth="2"/>
              <text x={platformWidth/2} y="25" textAnchor="middle" fill="#111827" fontSize={isMobile ? "12" : "14"} fontWeight="bold">PLATFORM 1 (Northbound)</text>
            </g>

            <g transform="translate(100, 335)">
              <line x1="0" y1="5" x2={platformWidth} y2="5" stroke="#374151" strokeWidth="4"/>
              <line x1="0" y1="15" x2={platformWidth} y2="15" stroke="#374151" strokeWidth="4"/>
              {[...Array(16)].map((_, i) => (
                <rect key={`sleeper-${i}`} x={i * 50 + 10} y="0" width="30" height="20" fill="#1f2937" rx="2"/>
              ))}
            </g>

            <g transform="translate(100, 370)">
              <rect width={platformWidth} height={platformHeight} fill="none" stroke="#111827" strokeWidth="2" rx="8"/>
              <line x1="20" y1="2" x2={platformWidth-20} y2="2" stroke="#dc2626" strokeWidth="3"/>
              <line x1="150" y1={platformHeight-15} x2="170" y2={platformHeight-15} stroke="#4b5563" strokeWidth="2"/>
              <line x1="350" y1={platformHeight-15} x2="370" y2={platformHeight-15} stroke="#4b5563" strokeWidth="2"/>
              <line x1="550" y1={platformHeight-15} x2="570" y2={platformHeight-15} stroke="#4b5563" strokeWidth="2"/>
              <line x1="750" y1={platformHeight-15} x2="770" y2={platformHeight-15} stroke="#4b5563" strokeWidth="2"/>
              <text x={platformWidth/2} y="55" textAnchor="middle" fill="#111827" fontSize={isMobile ? "12" : "14"} fontWeight="bold">PLATFORM 2 (Southbound)</text>
            </g>

            <g transform="translate(750, 60)">
              <rect width="200" height="120" fill="none" stroke="#111827" strokeWidth="2.5" rx="12"/>
              <rect x="70" y="20" width="60" height="80" fill="#f3f4f6" stroke="#374151" strokeWidth="1.5" rx="4"/>
              <line x1="100" y1="20" x2="100" y2="100" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,4"/>
              <text x="100" y="110" textAnchor="middle" fill="#111827" fontSize={isMobile ? "12" : "14"} fontWeight="bold">EXIT</text>
              <text x="100" y="130" textAnchor="middle" fill="#4b5563" fontSize={isMobile ? "9" : "10"} fontWeight="500">To City Center</text>
            </g>

            <path d="M 250 130 L 290 130 L 290 190 L 250 190" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6,4"/>
            <path d="M 750 130 L 710 130 L 710 190 L 750 190" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6,4"/>
            
            <g transform="translate(450, 190)">
              <rect x="0" y="0" width="80" height="60" fill="#f9fafb" stroke="#6b7280" strokeWidth="1.5" rx="4"/>
              <line x1="0" y1="15" x2="80" y2="15" stroke="#9ca3af" strokeWidth="1"/>
              <line x1="0" y1="30" x2="80" y2="30" stroke="#9ca3af" strokeWidth="1"/>
              <line x1="0" y1="45" x2="80" y2="45" stroke="#9ca3af" strokeWidth="1"/>
              <text x="40" y="10" textAnchor="middle" fill="#4b5563" fontSize={isMobile ? "9" : "10"}>STAIRS</text>
            </g>

            {!isMobile && (
              <g transform="translate(850, 520)">
                <line x1="0" y1="0" x2="100" y2="0" stroke="#111827" strokeWidth="2"/>
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#111827" strokeWidth="2"/>
                <line x1="100" y1="-5" x2="100" y2="5" stroke="#111827" strokeWidth="2"/>
                <text x="50" y="20" textAnchor="middle" fill="#4b5563" fontSize="11">50m</text>
                <text x="50" y="35" textAnchor="middle" fill="#6b7280" fontSize="9" fontStyle="italic">Scale 1:200</text>
              </g>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-200">
          <div className="flex flex-col items-center">
            <div className="mb-2 text-base md:text-lg font-semibold text-gray-900 text-center">
              Current Station Crowd Level:
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
              <div 
                className="w-8 h-8 rounded-full flex-shrink-0"
                style={{ 
                  backgroundColor: theme.base,
                  animation: `pulse ${pulseDuration} ease-in-out infinite`,
                  boxShadow: `0 0 20px ${theme.base}`
                }}
              ></div>
              <span 
                className="px-3 md:px-4 py-2 rounded-full text-white font-bold text-base md:text-lg text-center"
                style={{ backgroundColor: theme.base }}
              >
                {density.replace("_", " ")}
              </span>
            </div>
            <div className="mt-2 text-xs md:text-sm text-gray-600 text-center">
              Pulse rate: {pulseDuration === "0s" ? "No pulse" : `Every ${pulseDuration}`}
              {density !== "UNKNOWN" && (
                <span className="block md:inline md:ml-2 mt-1 md:mt-0">
                  • {isMobile ? "Scroll →" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

  {/* PEAK WINDOWS */}
  <div className="rounded-2xl border border-gray-200 bg-white px-6 py-6">
    <div className="flex items-center gap-3 mb-4">
      <Clock className="w-5 h-5 text-gray-500" />
      <h3 className="text-sm font-semibold tracking-wide">
        Typical Peak Windows
      </h3>
    </div>

    <div className="space-y-3">
      {stationStats.peakHours.map((h, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
          <span className="text-sm text-gray-700">{h}</span>
        </div>
      ))}
    </div>

    <p className="text-xs text-gray-400 mt-4">
      Derived from historical congestion patterns
    </p>
  </div>

  {/* SYSTEM CONFIDENCE */}
  <div className="rounded-2xl border border-gray-200 bg-white px-6 py-6">
    <div className="flex items-center gap-3 mb-4">
      <ShieldCheck className="w-5 h-5 text-gray-500" />
      <h3 className="text-sm font-semibold tracking-wide">
        Signal Confidence
      </h3>
    </div>

    <p className="text-sm text-gray-700 leading-relaxed">
      Crowd levels are computed using real-time commuter inputs,
      historical trends, and station telemetry.
    </p>

    <p className="text-xs text-gray-400 mt-4">
      No personal or facial data is stored
    </p>
  </div>

  {/* LIVE NOTICES */}
  <div className="rounded-2xl border border-gray-200 bg-white px-6 py-6">
    <div className="flex items-center gap-3 mb-4">
      <AlertTriangle className="w-5 h-5 text-amber-500" />
      <h3 className="text-sm font-semibold tracking-wide">
        Live Notices
      </h3>
    </div>

    {stationStats.alerts.length > 0 ? (
      <div className="space-y-3">
        {stationStats.alerts.map((a, i) => (
          <div
            key={i}
            className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900"
          >
            {a}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-600">
        No active advisories at this station.
      </p>
    )}
  </div>

  {/* ================= CONTRIBUTE CARD ================= */}
<button
  onClick={() => navigate("/contribute")}
  className="
    group text-left relative overflow-hidden
    rounded-2xl border border-[#D4AF37]/40
    bg-gradient-to-br from-white via-white to-[#FFF9E6]
    px-6 py-6
    transition-all duration-300
    hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]
    hover:border-[#D4AF37]
  "
>
  {/* subtle gold accent line */}
  <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent bg-red-700" />

  <div className="flex items-center gap-3 mb-4">
    <div
      className="
        w-10 h-10 rounded-full
        bg-[#B11226]
        flex items-center justify-center
        shadow-md
      "
    >
      <Activity className="w-5 h-5 text-[#D4AF37] animate-pulse" />
    </div>

    <h3 className="text-sm font-semibold tracking-wide text-gray-900">
      Update Crowd Status
    </h3>
  </div>

  <p className="text-sm text-gray-700 leading-relaxed">
    Are you currently at this station? Help fellow commuters by
    sharing the latest crowd conditions.
  </p>

  <div className="mt-6 flex items-center justify-between">
    <span className="text-xs text-gray-500">
      Takes less than 10 seconds
    </span>

    <span
      className="
        text-sm font-semibold
        text-[#B11226]
        flex items-center gap-1
        group-hover:text-[#8E0E1F]
        transition
      "
    >
      Contribute
      <span className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </span>
  </div>
</button>

</div>


      {/* Mobile instructions */}
      {isMobile && (
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>↔️ Scroll horizontally to view full station layout</p>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @keyframes pulsePlatform {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}