import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import { Calendar, MapPin, ChevronDown, Search } from "lucide-react";
import MahakavachAbout from "../components/MahakavachAbout";
import PlatformStatusBanner from "../components/PlatformStatusBanner";
import Community from "./Community";
import CommunityBanner from "../components/CommunityBanner";
import AwardsAndTimeline from "../components/AwardsAndTimeline";
import SuburbanMap from "../components/SuburbanMap";
// import Bannerimg from "../assets/Bannerimg";
import BannerImg from "./../assets/BannerImg.png";
import { useState } from "react";
import { Calendar, MapPin, ChevronDown, Search, ArrowRight, Clock, Users } from "lucide-react";
import { STATIONS } from "../data/stations";
import About from "./About";
import StationCrowdPanel from "../components/StationCrowdPanel";



const tabs = [
  // { 
  //   key: "book", 
  //   label: "Identify Less Crowded Travel Options", 
  //   tagline: "Plan Your Smooth Journey",
  //   icon: Calendar 
  // },
  { 
    key: "pnr", 
    label: "Train Crowd", 
    tagline: "Know the Rush in Trains Arriving at Your Station",
    icon: Search 
  },
  {
  key: "charts",
  label: "Station Crowd",
  tagline: "View overall crowd status at a station",
  icon: Users
}

  // { 
  //   key: "live", 
  //   label: "Live Crowd Movement", 
  //   tagline: "Get Crowd Movement Trend",
  //   icon: Clock 
  // },
];

export default function Landing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pnr");
  const [stationQuery, setStationQuery] = useState("");
const [suggestions, setSuggestions] = useState([]);

const [stationCrowd, setStationCrowd] = useState(null);
const [crowdLoading, setCrowdLoading] = useState(false);


const handleStationChange = (value) => {
  setStationQuery(value);
  if (!value) {
    setSuggestions([]);
    return;
  }
  const filtered = STATIONS.filter(s =>
    s.toLowerCase().startsWith(value.toLowerCase())
  ).slice(0, 6); // limit results
  setSuggestions(filtered);
};

const goToStation = (station) => {
  setStationQuery(station);
  setSuggestions([]);
  navigate(`/station/${station}/trains`);

  // fixing train problem
  // navigate(`/station/${station}`);
};


const fetchStationCrowd = async (station) => {
  if (!station) return;

  setCrowdLoading(true);
  setStationCrowd(null);

  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/stations/${station}/crowd`
    );
    const data = await res.json();
    setStationCrowd(data);
  } catch (err) {
    console.error("Failed to fetch station crowd", err);
  } finally {
    setCrowdLoading(false);
  }
};



  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col font-inter text-black">
      
      {/* TOP NAV */}
     

      {/* HERO SECTION */}
      <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] bg-cover bg-center flex items-end inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"
       style={{ backgroundImage: `url(${BannerImg})` }}
      >
        {/* Title layer */}
        {/* <div className="absolute top-14 left-32 text-red-700 drop-shadow-2xl">
          <div className="font-emirates text-5xl tracking-wide mb-2">Indian Railways</div>
          <div className="text-lg font-bold tracking-widest uppercase">
            Safety | Security | Punctuality
          </div>
        </div> */}

        {/* Booking Card */}
         <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="relative -mb-26 w-[90%] sm:w-[85%] max-w-6xl mx-auto px-4 sm:px-0"
    >
      {/* Glassmorphic Card with Gradient Border */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden pb-2">
        {/* Gradient Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 "></div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -z-10"></div>

        <div className="p-4 sm:p-6 md:p-8">
          {/* Header Section */}
          <div className="mb-4 sm:mb-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-gray-900 bg-clip-text text-transparent mb-2"
            >
              {tabs.find(t => t.key === activeTab)?.tagline}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-xs sm:text-sm"
            >
              {activeTab === "book" && "Plan your commute using predicted crowd levels and train frequency data."}
              {activeTab === "pnr" && "Know how crowded the incoming train is and plan your boarding better."}
              {activeTab === "charts" && "Access coach occupancy insights prior to boarding."}
              {activeTab === "live" && "Track passenger flow patterns across station ."}
            </motion.p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "book" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {/* From Station */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">origin Station</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-700" />
                      <input 
                        placeholder="Mumbai CST" 
                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* To Station */}
                 {/* To Station */}
<div className="flex flex-col">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Destination Station </label>
  <div className="relative">
    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
    <input 
      placeholder="Panvel Junction"
      className="w-full pl-10 pr-3 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium"
    />
  </div>
</div>

                  {/* Travel Date */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Date of Travel</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                      <input 
                        type="date" 
                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* Class */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Class</label>
                    <div className="relative">
                      <select className="w-full appearance-none px-3 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium cursor-pointer">
                        <option>All Classes</option>
                        <option>General</option>
                        <option>First Class</option>
                        <option>AC Local</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Quota */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Quota</label>
                    <div className="relative">
                      <select className="w-full appearance-none px-3 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium cursor-pointer">
                        <option>General</option>
                        <option>Ladies</option>
                        <option>Fast Local</option>
                        <option>Slow Local(Default)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center pt-2">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-bold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 text-sm sm:text-base"
                  >
                    <Search className="w-4 h-4" />
                    <span>View Travel Options</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === "pnr" && (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
  <input
    value={stationQuery}
    onChange={(e) => handleStationChange(e.target.value)}
    placeholder="Enter Station (e.g. Airl)"
    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-red-500 text-sm sm:text-base"
  />

  {suggestions.length > 0 && (
    <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-56 overflow-auto">
      {suggestions.map(station => (
        <div
          key={station}
          onClick={() => goToStation(station)}
          className="px-4 py-2 cursor-pointer hover:bg-red-50 text-xs sm:text-sm"
        >
          {station}
        </div>
      ))}
    </div>
  )}
</div>
 {/* fixing the train problem 1// */}
   {/* onClick={() => stationQuery && navigate(`/station/${stationQuery}`)} og */}
             <motion.button
  onClick={() => stationQuery && navigate(`/station/${stationQuery}`)}
  className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold whitespace-nowrap"
>
  <Search className="w-4 h-4" />
  Check Status
</motion.button>

              </div>
            )}

{activeTab === "charts" && (
  <div className="space-y-4">

    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <input
          value={stationQuery}
          onChange={(e) => handleStationChange(e.target.value)}
          placeholder="Enter Station Code (e.g. PNVL)"
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-red-500"
        />

        {suggestions.length > 0 && (
          <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-56 overflow-auto">
            {suggestions.map((station) => (
              <div
                key={station}
                onClick={() => {
                  setStationQuery(station);
                  setSuggestions([]);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-red-50 text-sm"
              >
                {station}
              </div>
            ))}
          </div>
        )}
      </div>

      <motion.button
        onClick={() =>
          stationQuery &&
          navigate(`/station-crowd/${stationQuery.toUpperCase()}`)
        }
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        <Users className="w-4 h-4" />
        View Station Crowd
      </motion.button>
    </div>

    <p className="text-xs text-gray-500">
      You’ll be redirected to a detailed station crowd view
    </p>
  </div>
)}


            {activeTab === "live" && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-3 sm:p-4">
                  <p className="text-gray-700 text-xs sm:text-sm">
                   Help the system by Update the Info for more accurate results.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    placeholder="Enter Train Number" 
                    className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-red-500 focus:bg-white transition-all font-medium text-sm sm:text-base"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg font-bold shadow-lg shadow-red-500/30 transition-all text-sm sm:text-base whitespace-nowrap"
                  >
                    <Clock className="w-4 h-4" />
                    Track Live
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
      </div>
      {/* RUSH HOURS CTA */}


      <div className="flex-1" />
      <div className="mt-20 sm:mt-24 md:mt-30">
       <MahakavachAbout/>
        <div className="mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20">
       <PlatformStatusBanner/>
       </div>
       <div className="mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20">
       <CommunityBanner/>
       </div>
        <div className="mt-12 sm:mt-16 md:mt-20">
       <AwardsAndTimeline/>
       </div>
       <SuburbanMap/>
      </div>
       <div className="mt-12 sm:mt-16 md:mt-20">
       <About/>
       </div>
     
    </div>
  );
}