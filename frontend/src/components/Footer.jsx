import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Globe, Shield, AlertCircle, Users, TrendingUp } from "lucide-react";
import logo from "../assets/llogo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] text-gray-300 select-none border-t border-[#2A2A2A] relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      {/* HORIZONTAL RIBBON with LOGO - Left Side */}
      <div className="absolute -left-2 top-20 w-52 h-32 bg-red-700 flex items-center justify-center shadow-2xl rounded-r-xl z-20 border-r-2 border-red-800 pl-4">
        <img
          src={logo}
          alt="MahaKavach Logo"
          className="w-full h-auto object-contain p-6"
        />
      </div>

      <div className="relative z-10 pt-20 pb-8 pl-6">
        {/* TOP FOOTER */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 pb-12">
          
          {/* BRAND - Takes 2 columns */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-5">
            <h3 className="text-2xl font-emirates text-white">Build For Mumbai</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Real-time commuter safety platform for Mumbai suburban railways,
              powered by AI-driven crowd intelligence and community collaboration.
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-4 h-4 text-red-500" />
                <span className="text-gray-300">Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="w-4 h-4 text-red-500" />
                <span className="text-gray-300">12,000+ Active Users</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2 bg-[#2A2A2A] px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">Live Platform</span>
              </div>
              <div className="flex items-center gap-2 bg-[#2A2A2A] px-3 py-1.5 rounded-full">
                <Shield className="w-3 h-3 text-red-500" />
                <span className="text-xs text-gray-300">Privacy First</span>
              </div>
            </div>
          </div>

          {/* PLATFORM */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wide flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              Platform
            </h4>
            <div className="flex flex-col gap-2.5">
              <FooterLink to="/community" label="Community Chat" />
              <FooterLink to="/crowd/platform" label="Platform Heatmap" />
              <FooterLink to="/crowd/train" label="Train Crowd Levels" />
              <FooterLink to="/crowd/upload" label="Upload Status" />
              <FooterLink to="/alerts" label="Live Alerts" />
            </div>
          </div>

          {/* LINES & ROUTES */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              Lines
            </h4>
            <div className="flex flex-col gap-2.5">
              <FooterLink to="/lines/western" label="Western Line" />
              <FooterLink to="/lines/central" label="Central Line" />
              <FooterLink to="/lines/harbour" label="Harbour Line" />
              <FooterLink to="/stations" label="All Stations" />
              <FooterLink to="/routes" label="Route Map" />
            </div>
          </div>

          {/* RESOURCES */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wide flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Resources
            </h4>
            <div className="flex flex-col gap-2.5">
              <FooterLink to="/help" label="Help Center" />
              <FooterLink to="/docs" label="Documentation" />
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms of Use" />
              <FooterLink to="/api" label="Developer API" />
            </div>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wide flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-500" />
              Contact
            </h4>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-red-500 mt-[3px] flex-shrink-0" />
                <span className="break-all">contact@mahakavach.in</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-4 h-4 text-red-500 mt-[3px] flex-shrink-0" />
                <span>+91 93215 56789</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-red-500 mt-[3px] flex-shrink-0" />
                <span>Mumbai Central, India</span>
              </div>
            </div>

            {/* Emergency Button */}
            <button className="mt-2 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-lg">
              <AlertCircle className="w-4 h-4" />
              Report Emergency
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full border-t border-[#2A2A2A] shadow-inner" />

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 gap-4">

          {/* COPYRIGHT */}
          <div className="flex flex-col md:flex-row items-center gap-2 text-xs text-gray-500 order-2 md:order-1">
            <p>© {new Date().getFullYear()} MahaKavach. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <p>Built with ❤️ for Mumbai Commuters</p>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-6 order-1 md:order-2">
            <SocialButton label="Twitter" url="https://twitter.com" />
            <SocialButton label="LinkedIn" url="https://linkedin.com" />
            <SocialButton label="GitHub" url="https://github.com" />
            <SocialButton label="Instagram" url="https://instagram.com" />
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
      </div>
    </footer>
  );
}

/* Sub Components */
const FooterLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
  >
    {label}
  </Link>
);

const SocialButton = ({ label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-wider font-semibold hover:scale-105 transform duration-200"
  >
    {label}
  </a>
);