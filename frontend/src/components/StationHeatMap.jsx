import { HEAT_THEME } from "../utils/heatColors";
import { useEffect, useState } from "react";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  AlertTriangle,
  Thermometer,
  Calendar,
  BarChart3,
  Info
} from "lucide-react";

export default function StationHeatMap({ density = "UNKNOWN" }) {
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
    <div className="space-y-6">
      {/* Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-700 font-medium">Current Status</span>
            <Thermometer className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ 
                backgroundColor: theme.base,
                animationDuration: pulseDuration
              }}
            />
            <span className="text-2xl font-bold" style={{ color: theme.base }}>
              {density.replace("_", " ")}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Updated {stationStats.lastUpdate}</p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-700 font-medium">Peak Hours</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="space-y-1">
            {stationStats.peakHours.map((hour, idx) => (
              <div key={idx} className="flex items-center text-sm">
                <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                <span className="font-medium">{hour}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-700 font-medium">Weekly Trend</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex items-center">
            <BarChart3 className="w-5 h-5 text-emerald-500 mr-2" />
            <span className="text-lg font-bold text-emerald-700">{stationStats.weeklyTrend}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Compared to last week</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-700 font-medium">Dwell Time</span>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-700">{stationStats.averageDwellTime}</div>
          <p className="text-sm text-gray-600 mt-1">Average time spent in station</p>
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

      {/* Additional Info Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Live Alerts & Notices</h3>
          </div>
          <div className="space-y-3">
            {stationStats.alerts.length > 0 ? (
              stationStats.alerts.map((alert, idx) => (
                <div key={idx} className="flex items-start p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <p className="text-sm text-amber-800">{alert}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-600">No active alerts. Station operating normally.</p>
              </div>
            )}
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">Last checked: {stationStats.lastUpdate}</p>
            </div>
          </div>
        </div>

        {/* Facilities Panel */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center mb-4">
            <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center mr-2">
              <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Available Facilities</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {stationStats.facilities.map((facility, idx) => (
              <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-700">{facility}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>All facilities open until 11:00 PM</span>
            </div>
          </div>
        </div>

        {/* Recommendations Panel */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm p-5">
          <div className="flex items-center mb-4">
            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center mr-2">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Smart Recommendations</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <p className="text-sm text-gray-700 font-medium mb-1">Best time to travel</p>
              <p className="text-xs text-gray-600">Consider traveling during non-peak hours (10:00 AM - 4:00 PM)</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <p className="text-sm text-gray-700 font-medium mb-1">Fastest exit route</p>
              <p className="text-xs text-gray-600">Use North Exit for quick access to parking and taxis</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <p className="text-sm text-gray-700 font-medium mb-1">Alternative platforms</p>
              <p className="text-xs text-gray-600">Platform 3 (East Wing) currently has lower crowd density</p>
            </div>
          </div>
        </div>
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