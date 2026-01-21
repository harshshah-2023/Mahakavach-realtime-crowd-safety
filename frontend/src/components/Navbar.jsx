import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/llogo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [hoverTab, setHoverTab] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const panelRef = useRef(null);
  const navigate = useNavigate(); 

  const menu = [
    {
      label: "CROWD INFO",
      path: "/book",
      panel: (
        <div className="grid grid-cols-3 gap-12 py-10">
          <div>
            <h3 className="font-semibold mb-3">Crowd at Station</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><Link to="/book/search">Crowd at Platform</Link></li>
              <li><Link to="/book/miles">Crowd in Train</Link></li>
              {/* <li><Link to="/book/offers">Special offers</Link></li> */}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Check Crowd at Line</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><Link to="/book/hotels">Habour Line</Link></li>
              <li><Link to="/book/car">Central Line</Link></li>
              <li><Link to="/book/insurance">Western Line</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Check Crowd Date</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><Link to="/book/timetable">Check For date</Link></li>
              <li><Link to="/book/multicity">Check For Event</Link></li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      label: "COMMUNITY",
      path: "/manage",
      panel: (
        <div className="grid grid-cols-3 gap-12 py-10">
          <div>
            <h3 className="font-semibold mb-3">Chat with Community</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><Link to="/manage/cancel">Hourbour line</Link></li>
              <li><Link to="/manage/change">Central Line</Link></li>
              <li><Link to="/manage/upgrade">Western Line</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Check in online</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><Link to="/manage/checkin">Check-in options</Link></li>
            </ul>
          </div>
          
        </div>
      ),
    },
    {
      label: "UPDATE CROWD STATUS",
      path: "/manage",
      panel: (
        <div className="grid grid-cols-3 gap-12 py-10">
          <div>
            <h3 className="font-semibold mb-3">UPDATE CROWD AT LINE</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><Link to="/manage/cancel">Hourbour line</Link></li>
              <li><Link to="/manage/change">Central Line</Link></li>
              <li><Link to="/manage/upgrade">Western Line</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">UPDATE CROWD AT STATION</h3>
            {/* <ul className="space-y-2 text-sm text-gray-800">
              <li><Link to="/manage/checkin">CSTM</Link></li>
               <li><Link to="/manage/checkin">MUMBAI CENTRAL</Link></li>
                      <li><Link to="/manage/checkin">SEACH</Link></li>
            </ul> */}
          </div>
          
        </div>
      ),
    },
    { label: "CHECK ROUTE", path: "/routepage",  },
    { label: "HELP", path: "/help" },
    { label: "FAQ", path: "/faq" },
    { label: "ABOUT", path: "/about" },
  ];


  const shownTab = activeTab ?? hoverTab;

  // Click-outside logic
  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setActiveTab(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-[#2e2e2e] text-white select-none shadow-md">
      
      {/* NAVBAR CONTAINER */}
      <div className="relative max-w-[1400px] mx-auto flex items-center h-20 px-10 z-2">
        
        {/* Ribbon Logo (not flush to left) */}
       <Link
  to="/"
  className="absolute -top-2 left-10 w-26 h-32 bg-red-700 flex items-center justify-center shadow-xl rounded-b-md"
>
  <img
    src={logo}
    alt="MahaKavach Logo"
    className="w-full h-auto object-contain p-1 "
  />
</Link>

        {/* Menu */}
       {/* Menu */}
<div className="ml-40 flex items-center gap-10 font-semibold tracking-wide text-sm">
  {menu.map((item) => {
    // Items without panel (like ABOUT, CHECK ROUTE) - render as Link
    if (!item.panel) {
      return (
        <Link
          key={item.label}
          to={item.path}
          className="pb-2 transition border-b-2 border-transparent hover:border-red-600"
        >
          {item.label}
        </Link>
      );
    }
    
    // Items with panel (like CROWD INFO, COMMUNITY) - render as button with dropdown
    return (
      <button
        key={item.label}
        onMouseEnter={() => setHoverTab(item.label)}
        onMouseLeave={() => setHoverTab(null)}
        onClick={() => setActiveTab(item.label)}
        className={`pb-2 transition border-b-2 ${
          shownTab === item.label
            ? "border-red-600"
            : "border-transparent hover:border-gray-400"
        }`}
      >
        {item.label}
      </button>
    );
  })}
</div>

        {/* Right utilities */}
        <div className="ml-auto flex items-center gap-6 text-sm">
          <Globe className="w-5 h-5 cursor-pointer" />
          <Search className="w-5 h-5 cursor-pointer" />
          <Link to="/login" className="font-semibold hover:text-gray-300">LOG IN</Link>
        </div>
      </div>

      {/* PANEL */}
      <AnimatePresence>
  {shownTab && (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute left-0 top-20 w-full z-50 bg-white text-[#1a1a1a] border-t border-gray-300 shadow-2xl"
    >
      <div className="max-w-[1400px] mx-auto px-10">
        {menu.find((m) => m.label === shownTab)?.panel}
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
