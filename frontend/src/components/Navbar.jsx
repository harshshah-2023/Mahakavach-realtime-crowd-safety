import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/llogo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [hoverTab, setHoverTab] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(null);
  const panelRef = useRef(null);
  const navigate = useNavigate(); 

  const menu = [
    {
      label: "CROWD INFO",
      path: "/book",
      panel: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 py-6 sm:py-8 lg:py-10">
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Crowd at Station</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
              <li><Link to="/book/search" onClick={() => setActiveTab(null)}>Crowd at Platform</Link></li>
              <li><Link to="/book/miles" onClick={() => setActiveTab(null)}>Crowd in Train</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Check Crowd at Line</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
              <li><Link to="/book/hotels" onClick={() => setActiveTab(null)}>Habour Line</Link></li>
              <li><Link to="/book/car" onClick={() => setActiveTab(null)}>Central Line</Link></li>
              <li><Link to="/book/insurance" onClick={() => setActiveTab(null)}>Western Line</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Check Crowd Date</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
              <li><Link to="/book/timetable" onClick={() => setActiveTab(null)}>Check For date</Link></li>
              <li><Link to="/book/multicity" onClick={() => setActiveTab(null)}>Check For Event</Link></li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      label: "COMMUNITY",
      path: "/manage",
      panel: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 py-6 sm:py-8 lg:py-10">
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Chat with Community</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
              <li><Link to="/manage/cancel" onClick={() => setActiveTab(null)}>Hourbour line</Link></li>
              <li><Link to="/manage/change" onClick={() => setActiveTab(null)}>Central Line</Link></li>
              <li><Link to="/manage/upgrade" onClick={() => setActiveTab(null)}>Western Line</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Check in online</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
              <li><Link to="/manage/checkin" onClick={() => setActiveTab(null)}>Check-in options</Link></li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      label: "UPDATE CROWD STATUS",
      path: "/manage",
      panel: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 py-6 sm:py-8 lg:py-10">
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">UPDATE CROWD AT LINE</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
              <li><Link to="/manage/cancel" onClick={() => setActiveTab(null)}>Hourbour line</Link></li>
              <li><Link to="/manage/change" onClick={() => setActiveTab(null)}>Central Line</Link></li>
              <li><Link to="/manage/upgrade" onClick={() => setActiveTab(null)}>Western Line</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">UPDATE CROWD AT STATION</h3>
          </div>
        </div>
      ),
    },
    { label: "CHECK ROUTE", path: "/routepage" },
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

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setMobileSubMenu(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-[#2e2e2e] text-white select-none shadow-md relative">
      
      {/* NAVBAR CONTAINER */}
      <div className="relative max-w-[1400px] mx-auto flex items-center h-16 sm:h-20 px-4 sm:px-6 lg:px-10 z-20">
        
        {/* Ribbon Logo */}
        <Link
          to="/"
          className="absolute -top-1 sm:-top-2 left-4 sm:left-6 lg:left-10 w-20 sm:w-24 lg:w-26 h-24 sm:h-28 lg:h-32 bg-red-700 flex items-center justify-center shadow-xl rounded-b-md z-30"
        >
          <img
            src={logo}
            alt="MahaKavach Logo"
            className="w-full h-auto object-contain p-1"
          />
        </Link>

        {/* Mobile Center Title */}
        <div className="lg:hidden flex-1 flex items-center justify-center ml-16 mr-12">
          <div className="text-center">
            {/* <h1 className="text-base sm:text-lg font-bold text-white">Mahakavach</h1>
            <p className="text-[10px] sm:text-xs text-gray-300">'For Mumbaikars'</p> */}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex ml-32 xl:ml-40 items-center gap-6 xl:gap-10 font-semibold tracking-wide text-xs xl:text-sm">
          {menu.map((item) => {
            if (!item.panel) {
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="pb-2 transition border-b-2 border-transparent hover:border-red-600 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              );
            }
            
            return (
              <button
                key={item.label}
                onMouseEnter={() => setHoverTab(item.label)}
                onMouseLeave={() => setHoverTab(null)}
                onClick={() => setActiveTab(item.label)}
                className={`pb-2 transition border-b-2 whitespace-nowrap ${
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

        {/* Right utilities - Desktop */}
        <div className="hidden lg:flex ml-auto items-center gap-4 xl:gap-6 text-sm">
          <Globe className="w-4 h-4 xl:w-5 xl:h-5 cursor-pointer" />
          <Search className="w-4 h-4 xl:w-5 xl:h-5 cursor-pointer" />
          <Link to="/login" className="font-semibold hover:text-gray-300">LOG IN</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden z-30 p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop PANEL */}
      <AnimatePresence>
        {shownTab && !mobileMenuOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hidden lg:block absolute left-0 top-16 sm:top-20 w-full z-50 bg-white text-[#1a1a1a] border-t border-gray-300 shadow-2xl"
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
              {menu.find((m) => m.label === shownTab)?.panel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden fixed top-16 sm:top-20 right-0 w-4/5 sm:w-72 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] bg-[#2e2e2e] z-40 overflow-y-auto shadow-2xl"
          >
            <div className="p-6 space-y-6">
              {/* Mobile Menu Items */}
              {menu.map((item) => (
                <div key={item.label}>
                  {!item.panel ? (
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 text-sm font-semibold border-b border-gray-600 hover:text-red-500 transition"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => setMobileSubMenu(mobileSubMenu === item.label ? null : item.label)}
                        className="w-full flex justify-between items-center py-3 text-sm font-semibold border-b border-gray-600 hover:text-red-500 transition"
                      >
                        <span>{item.label}</span>
                        <span className="text-xl">{mobileSubMenu === item.label ? "−" : "+"}</span>
                      </button>
                      
                      <AnimatePresence>
                        {mobileSubMenu === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-[#3a3a3a] rounded-lg mt-2 p-4"
                          >
                            {item.panel}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile utilities */}
              <div className="flex items-center gap-6 pt-6 border-t border-gray-600">
                <Globe className="w-5 h-5 cursor-pointer hover:text-red-500" />
                <Search className="w-5 h-5 cursor-pointer hover:text-red-500" />
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-semibold hover:text-red-500"
                >
                  LOG IN
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30 top-16 sm:top-20"
        />
      )}
    </div>
  );
}