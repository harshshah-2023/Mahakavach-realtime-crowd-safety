import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Install: npm install framer-motion
import { 
  ArrowRight, 
  GitBranch, 
  Cpu, 
  BarChart3,
  Shield,
  Sparkles,
  ChevronRight,
  Clock,
  TrendingUp,
  MapPin
} from "lucide-react"; // Install: npm install lucide-react

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F14] via-[#0F172A] to-[#1E293B] text-white overflow-x-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/30 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-2xl font-bold tracking-tight"
          >
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <span>Maha<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Kavach</span></span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
            >
              <Sparkles className="w-4 h-4 group-hover:text-blue-400" />
              Demo
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
            >
              <Cpu className="w-4 h-4 group-hover:text-purple-400" />
              Architecture
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
            >
              <BarChart3 className="w-4 h-4 group-hover:text-green-400" />
              Roadmap
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
            >
              <GitBranch className="w-4 h-4 group-hover:text-orange-400" />
              GitHub
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/demo")}
              className="ml-4 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/20"
            >
              Launch App
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/20 mb-8"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Phase 1 Live · Real-time Station Prediction
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Predict Crowd
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Before It Forms
              </span>
            </h1>

            <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-2xl">
              MahaKavach leverages advanced AI to forecast crowd density across Mumbai's 
              local train network using real-time schedules, historical patterns, and 
              predictive analytics — enabling proactive decisions before congestion peaks.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">99%</div>
                <div className="text-sm text-gray-400 mt-1">Prediction Accuracy</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">150+</div>
                <div className="text-sm text-gray-400 mt-1">Stations Covered</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-gray-400 mt-1">Real-time Updates</div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/demo")}
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-3"
              >
                <span className="font-semibold">View Live Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Cpu className="w-5 h-5" />
                <span>View Architecture</span>
              </motion.button>
            </div>
          </motion.div>

          {/* PREDICTION CARD */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-pink-400/10 rounded-3xl blur-xl"></div>

            <div className="relative bg-gradient-to-br from-[#141821] to-[#0F172A] backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/50">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    Crowd Predictor
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">Real-time station analysis</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Live</span>
                </div>
              </div>

              {/* Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    Train Line
                  </label>
                  <div className="relative group">
                    <select className="w-full bg-[#0B0F14]/50 border border-white/10 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer appearance-none group-hover:border-white/30">
                      <option className="bg-[#0F172A]">Harbour Line</option>
                      <option className="bg-[#0F172A]" disabled>Central (Coming Soon)</option>
                      <option className="bg-[#0F172A]" disabled>Western (Coming Soon)</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    Station
                  </label>
                  <div className="relative group">
                    <select className="w-full bg-[#0B0F14]/50 border border-white/10 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer appearance-none group-hover:border-white/30">
                      <option className="bg-[#0F172A]">Select Station</option>
                      <option className="bg-[#0F172A]">CST (Chhatrapati Shivaji Terminus)</option>
                      <option className="bg-[#0F172A]">Kurla Junction</option>
                      <option className="bg-[#0F172A]">Vashi Station</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    Time Window
                  </label>
                  <div className="relative group">
                    <select className="w-full bg-[#0B0F14]/50 border border-white/10 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer appearance-none group-hover:border-white/30">
                      <option className="bg-[#0F172A]">Next 30 minutes</option>
                      <option className="bg-[#0F172A]">Next 60 minutes</option>
                      <option className="bg-[#0F172A]">Next 90 minutes</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                {/* Prediction Indicator */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Predicted Crowd Level</div>
                      <div className="text-2xl font-bold mt-1">Medium</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/30">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30 font-semibold text-lg flex items-center justify-center gap-3 group"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Prediction
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Uses schedule and historical data only. No personal data collected.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Landing;