import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Shield, 
  AlertCircle, 
  Users, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MessageCircle
} from "lucide-react";
import logo from "../assets/llogo.png";

export default function Footer() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const mobileSections = [
    {
      id: 'about',
      title: 'About Us',
      links: [
        { label: 'About Us', to: '/about' },
        { label: 'Careers', to: '/careers' },
        { label: 'Media Centre', to: '/media' },
        { label: 'Our Mission', to: '/mission' },
        { label: 'Our Team', to: '/team' },
        { label: 'Community', to: '/community' },
      ]
    },
    {
      id: 'platform',
      title: 'Platform',
      links: [
        { label: 'Community Chat', to: '/community' },
        { label: 'Platform Heatmap', to: '/crowd/platform' },
        { label: 'Train Crowd Levels', to: '/crowd/train' },
        { label: 'Upload Status', to: '/crowd/upload' },
        { label: 'Live Alerts', to: '/alerts' },
      ]
    },
    {
      id: 'lines',
      title: 'Rail Lines',
      links: [
        { label: 'Western Line', to: 'rush-hours/western' },
        { label: 'Central Line', to: '/rush-hours/central' },
        { label: 'Harbour Line', to: 'rush-hours/harbour' },
        { label: 'All Stations', to: '/stations' },
        { label: 'Route Map', to: '/' },
      ]
    },
    {
      id: 'help',
      title: 'Help',
      links: [
        { label: 'Help Center', to: '/help' },
        { label: 'Travel Updates', to: '/updates' },
        { label: 'FAQ', to: '/faq' },
        { label: 'Safety Guidelines', to: '/safety' },
      ]
    },
    {
      id: 'resources',
      title: 'Resources',
      links: [
        { label: 'Documentation', to: '/docs' },
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms of Use', to: '/terms' },
        { label: 'Cookie Policy', to: '/cookies' },
        { label: 'Contact Us', to: '/contact' },
      ]
    }
  ];

  const socialLinks = [
    // { icon: <Facebook className="w-5 h-5 text-white" />, label: "Facebook", url: "#" },
    { icon: <Twitter className="w-5 h-5 text-white" />, label: "Twitter", url: "https://x.com/HarshShah745967" },
    { icon: <Linkedin className="w-5 h-5 text-white" />, label: "LinkedIn", url: "https://www.linkedin.com/in/harsh-shah-9848hs" },
    { icon: <Instagram className="w-5 h-5 text-white" />, label: "Instagram", url: "#" },
    // { icon: <Youtube className="w-5 h-5 text-white" />, label: "YouTube", url: "#" },
    { icon: <MessageCircle className="w-5 h-5 text-white" />, label: "GitHub", url: "https://github.com/harshshah-2023" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] text-gray-300 select-none border-t border-[#2A2A2A] relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-red-600 rounded-full blur-2xl lg:blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-56 lg:w-80 h-56 lg:h-80 bg-blue-600 rounded-full blur-2xl lg:blur-3xl"></div>
      </div>

      {/* MOBILE & TABLET: Full width red ribbon with centered logo */}
      <div className="lg:hidden w-full bg-red-700 py-5 flex items-center justify-center z-20 relative shadow-xl">
        <img
          src={logo}
          alt="MahaKavach Logo"
          className="h-14 w-auto object-contain"
        />
      </div>

      {/* DESKTOP: Left side ribbon with logo */}
      <div className="hidden lg:flex absolute -left-2 top-20 w-52 h-32 bg-red-700 items-center justify-center shadow-2xl rounded-r-xl z-20 border-r-2 border-red-800 pl-4">
        <img
          src={logo}
          alt="MahaKavach Logo"
          className="w-full h-auto object-contain p-6"
        />
      </div>

      <div className="relative z-10 lg:pt-20 pb-6 lg:pb-8 pl-0 lg:pl-6">
        {/* MOBILE & TABLET: Collapsible sections */}
        <div className="lg:hidden pt-2">
          {mobileSections.map((section) => (
            <div key={section.id} className="border-b border-[#2A2A2A]">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full py-4 px-4 flex items-center justify-between text-white font-semibold text-base"
              >
                {section.title}
                {openSections[section.id] ? (
                  <ChevronUp className="w-5 h-5 text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white" />
                )}
              </button>
              
              {openSections[section.id] && (
                <div className="pb-4 px-4">
                  {section.links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className="block py-2 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* DESKTOP: Original grid layout */}
        <div className="hidden lg:grid max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 pb-12">
          
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
                <span className="text-gray-300">LIVE Active Users</span>
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
              <FooterLink to="/rush-hours/western" label="Western Line" />
              <FooterLink to="/rush-hours/central" label="Central Line" />
              <FooterLink to="/rush-hours/harbour" label="Harbour Line" />
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
                <span className="break-all">harshshah9848@gmail.com</span>
              </div>

              {/* <div className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-4 h-4 text-red-500 mt-[3px] flex-shrink-0" />
                <span>+91 93215 56789</span>
              </div> */}

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

        {/* MOBILE & TABLET: App Download Section */}
        <div className="lg:hidden px-4 py-6 border-b border-[#2A2A2A]">
          <h3 className="text-white font-semibold text-lg mb-4">MahaKavach App</h3>
          <p className="text-gray-400 text-sm mb-4">
            Book and manage your safety on the go.
          </p>
          
          <div className="flex flex-col gap-3">
            <button className="w-full bg-black border border-gray-700 rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
              <span className="text-white font-medium">Download on the App Store</span>
            </button>
            
            <button className="w-full bg-black border border-gray-700 rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
              <span className="text-white font-medium">GET IT ON Google Play</span>
            </button>
            
            <button className="w-full bg-black border border-gray-700 rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
              <span className="text-white font-medium">EXPLORE IT ON AppGallery</span>
            </button>
          </div>
        </div>

        {/* MOBILE & TABLET: Social Media Section */}
        <div className="lg:hidden px-4 py-6 border-b border-[#2A2A2A]">
          <h3 className="text-white font-semibold text-lg mb-4">Connect with us</h3>
          <p className="text-gray-400 text-sm mb-4">
            Share your MahaKavach experience.
          </p>
          
          <div className="grid grid-cols-3 gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="flex flex-col items-center justify-center p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors"
              >
                <div className="mb-1">
                  {social.icon}
                </div>
                <span className="text-xs text-gray-300">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* MOBILE & TABLET: Newsletter Subscription */}
        <div className="lg:hidden px-4 py-6 border-b border-[#2A2A2A]">
          <h3 className="text-white font-semibold text-lg mb-2">
            Talk with the Developer 
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            write a message , will get response with 24 hrs
          </p>
          
          <div className="flex gap-2 mb-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
          
          <p className="text-xs text-gray-500">
            Unsubscribe or change your preferences
          </p>
        </div>

        {/* MOBILE & TABLET: Contact Info */}
        <div className="lg:hidden px-4 py-6 border-b border-[#2A2A2A]">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-white mt-1 flex-shrink-0" />
              <span className="text-gray-300 text-sm">harshshah9848@gmail.com</span>
            </div>
           
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-white mt-1 flex-shrink-0" />
              <span className="text-gray-300 text-sm">Mumbai, India</span>
            </div>
          </div>
          
          <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
            <AlertCircle className="w-5 h-5 text-white" />
            Report Emergency
          </button>
        </div>

        {/* MOBILE & TABLET: Bottom Legal Links */}
        <div className="lg:hidden px-4 py-6">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {['Accessibility', 'Contact us', 'Privacy policy', 'Terms and conditions', 'Cookie Policy', 'Sitemap'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-500 text-xs hover:text-gray-300 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="text-center text-gray-500 text-xs">
            <p className="mb-1">© {new Date().getFullYear()} MahaKavach. All Rights Reserved.</p>
            <p>Built with ❤️ for Mumbai Commuters</p>
          </div>
        </div>

        {/* DESKTOP: DIVIDER */}
        <div className="hidden lg:block w-full border-t border-[#2A2A2A] shadow-inner" />

        {/* DESKTOP: BOTTOM FOOTER */}
        <div className="hidden lg:flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 py-8 gap-4">

          {/* COPYRIGHT */}
          <div className="flex flex-col lg:flex-row items-center gap-2 text-xs text-gray-500 order-2 lg:order-1">
            <p>© {new Date().getFullYear()} MahaKavach. All rights reserved.</p>
            <span className="hidden lg:inline">•</span>
            <p>Built with ❤️ for Mumbai Commuters</p>
          </div>




          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-6 order-1 lg:order-2">
            <SocialButton label="Twitter" url="https://x.com/HarshShah745967" />
            <SocialButton label="LinkedIn" url="https://www.linkedin.com/in/harsh-shah-9848hs" />
            <SocialButton label="GitHub" url="https://github.com/harshshah-2023" />
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