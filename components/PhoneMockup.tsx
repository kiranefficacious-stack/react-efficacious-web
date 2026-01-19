import React from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  Bus,
  Calendar,
  Navigation,
  Clock,
  Utensils,
  Bell,
  Wifi,
  Signal,
  Activity,
  Heart,
  FileText,
  Briefcase,
  CheckSquare,
  Building2,
  ShieldCheck,
  Key,
  Truck,
  Star,
  Phone,
  ChevronRight,
  Home,
  LayoutGrid,
  Settings,
  MapPin,
  Download,
  Play,
  Smartphone,
  BookOpen,
  AlertCircle,
  CreditCard,
  Receipt,
  CheckCircle2,
  DollarSign,
  QrCode,
} from "lucide-react";

const motion = m as any;

interface PhoneMockupProps {
  activeSlide: number;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ activeSlide }) => {
  // Reusable Bottom Nav for app-like feel
  const BottomNav = ({ active = 0 }) => (
    <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-3 pb-5 flex justify-around items-center z-40 text-slate-400">
      <div
        className={`flex flex-col items-center gap-0.5 ${
          active === 0 ? "text-brand-500 scale-110" : "hover:text-slate-600"
        }`}
      >
        <Home size={20} strokeWidth={active === 0 ? 2.5 : 2} />
      </div>
      <div
        className={`flex flex-col items-center gap-0.5 ${
          active === 1 ? "text-brand-500 scale-110" : "hover:text-slate-600"
        }`}
      >
        <LayoutGrid size={20} strokeWidth={active === 1 ? 2.5 : 2} />
      </div>
      <div
        className={`flex flex-col items-center gap-0.5 ${
          active === 2 ? "text-brand-500 scale-110" : "hover:text-slate-600"
        }`}
      >
        <Bell size={20} strokeWidth={active === 2 ? 2.5 : 2} />
      </div>
      <div
        className={`flex flex-col items-center gap-0.5 ${
          active === 3 ? "text-brand-500 scale-110" : "hover:text-slate-600"
        }`}
      >
        <Settings size={20} strokeWidth={active === 3 ? 2.5 : 2} />
      </div>
    </div>
  );

  const screens: Record<number, React.ReactNode> = {
    // Screen 0: School App (Generic)
    0: (
      <div
        key="school"
        className="h-full flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 relative"
      >
        {/* App Header */}
        <div className="bg-brand-600 p-5 pb-8 rounded-b-[2rem] shadow-lg relative z-10">
          <div className="flex justify-between items-center text-white mb-4">
            <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm">
              <User size={16} />
            </div>
            <span className="font-semibold text-sm tracking-wide">
              eSmart Parent
            </span>
            <Bell size={16} />
          </div>
          <div className="text-white pl-1">
            <p className="text-xs opacity-80 mb-0.5 font-medium">
              Good Morning,
            </p>
            <h3 className="text-2xl font-bold tracking-tight">Aryan Sharma</h3>
            <div className="flex items-center justify-between mt-3">
              <p className="text-[10px] bg-white/20 inline-block px-2.5 py-1 rounded-full text-white backdrop-blur-sm font-medium">
                Class 5-B
              </p>
              <div className="text-[10px] bg-emerald-500/90 px-2.5 py-1 rounded-full text-white font-bold shadow-sm">
                Fee Paid
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 p-4 -mt-4 overflow-hidden flex flex-col gap-3 pb-20">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center gap-2 group hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar size={18} />
              </div>
              <div className="text-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Attendance
                </span>
                <p className="font-bold text-lg text-slate-900 dark:text-white">
                  98%
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center gap-2 group hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText size={18} />
              </div>
              <div className="text-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Homework
                </span>
                <p className="font-bold text-lg text-slate-900 dark:text-white">
                  2{" "}
                  <span className="text-xs font-normal text-slate-400">
                    New
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Transport Card */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                  <Bus size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    Bus Tracker
                  </p>
                  <p className="font-bold text-sm">Arriving in 10m</p>
                </div>
              </div>
              <div className="animate-pulse">
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </div>
            {/* Mini Map Line */}
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden flex relative z-10">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            {/* Decor */}
            <div className="absolute right-0 bottom-0 opacity-5">
              <Bus size={60} />
            </div>
          </div>

          {/* App Store Promo */}
          <div className="mt-auto space-y-2">
            <p className="text-[10px] text-center text-slate-400 font-medium">
              Download the App
            </p>
            <div className="flex gap-2 justify-center">
              <button className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-black py-2 px-3 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
                <Smartphone size={14} className="fill-current" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[8px] font-medium opacity-80">
                    Download on
                  </span>
                  <span className="text-[10px] font-bold">App Store</span>
                </div>
              </button>
              <button className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-black py-2 px-3 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
                <Play size={14} className="fill-current" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[8px] font-medium opacity-80">
                    GET IT ON
                  </span>
                  <span className="text-[10px] font-bold">Google Play</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <BottomNav active={0} />
      </div>
    ),

    // Screen 1: Truck Tracker
    1: (
      <div
        key="tracker"
        className="h-full flex flex-col bg-slate-900 text-white relative overflow-hidden"
      >
        {/* Content from previous file... Simplified for brevity if needed but keeping original */}
        <div className="absolute inset-0 z-0 bg-[#1e293b]">
          {/* Custom Map Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern
                id="city-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <rect
                  x="10"
                  y="10"
                  width="15"
                  height="15"
                  fill="currentColor"
                  opacity="0.5"
                />
                <rect
                  x="35"
                  y="35"
                  width="20"
                  height="10"
                  fill="currentColor"
                  opacity="0.3"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#city-grid)" />
            </svg>
          </div>
          {/* Route Path SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            viewBox="0 0 300 600"
            preserveAspectRatio="none"
          >
            <path
              d="M 80 100 C 80 100, 200 200, 150 300 S 100 450, 220 500"
              stroke="#334155"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 80 100 C 80 100, 200 200, 150 300 S 100 450, 220 500"
              stroke="#3b82f6"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="10 5"
              className="animate-[dash_20s_linear_infinite]"
            />
            <defs>
              <style>{`@keyframes dash { to { stroke-dashoffset: -1000; } }`}</style>
            </defs>
          </svg>
          {/* Moving Vehicle */}
          <motion.div
            className="absolute z-20"
            animate={{
              left: ["20%", "55%", "45%", "50%", "70%"],
              top: ["18%", "35%", "50%", "70%", "82%"],
              rotate: [45, 30, 0, -20, 10],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/30 rounded-full blur-md animate-pulse" />
              <div className="w-10 h-10 bg-blue-600 rounded-full border-2 border-white shadow-xl flex items-center justify-center transform -rotate-45">
                <Truck size={18} className="text-white fill-white" />
              </div>
            </div>
          </motion.div>
        </div>
        {/* Top Overlay UI */}
        <div className="relative z-30 p-4 pt-10">
          <div className="flex justify-between items-start">
            <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/50 shadow-xl flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <div>
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                  Status
                </p>
                <p className="text-xs font-bold tracking-wide">On Route</p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Sheet Driver Card */}
        <div className="mt-auto relative z-30 m-3 p-4 bg-slate-800/95 backdrop-blur-xl rounded-[1.5rem] border border-slate-700/50 shadow-2xl">
          <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-4 opacity-50" />
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-500 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                  <User size={20} className="text-slate-300" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-white">Rajesh Kumar</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Vehicle: Tata Ace • MH-04-AB-1234
              </p>
            </div>
          </div>
        </div>
      </div>
    ),

    // Screen 2: Restaurant
    2: (
      <div
        key="restaurant"
        className="h-full flex flex-col bg-white dark:bg-black text-slate-800 dark:text-white relative"
      >
        {/* Simplified for brevity - reuse structure from previous */}
        <div className="p-4 pt-10 flex items-center justify-between bg-white dark:bg-black sticky top-0 z-10">
          <div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Delivering to
            </p>
            <h3 className="font-bold text-sm text-rose-500 flex items-center gap-1 cursor-pointer hover:underline">
              Home, Sector 7 <ChevronRight size={14} />
            </h3>
          </div>
        </div>
        <div className="px-4 mb-4">
          <div className="w-full h-28 bg-gradient-to-br from-rose-500 to-orange-600 rounded-2xl p-4 text-white relative overflow-hidden shadow-lg shadow-rose-500/20">
            <div className="relative z-10 flex flex-col justify-center h-full">
              <h3 className="font-extrabold text-2xl leading-none w-2/3 mb-2">
                50% OFF
              </h3>
              <p className="text-xs opacity-90">On your first pizza order</p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 overflow-y-auto grid grid-cols-2 gap-3 pb-24 content-start">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl p-2.5 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col group hover:shadow-md transition-shadow"
            >
              <div className="w-full aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl mb-2.5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600">
                  <Utensils size={24} />
                </div>
              </div>
              <h4 className="font-bold text-xs mb-0.5 truncate text-slate-900 dark:text-white">
                Gourmet Burger
              </h4>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                $12.99
              </span>
            </div>
          ))}
        </div>
        <BottomNav active={0} />
      </div>
    ),

    // Screen 3: Health
    3: (
      <div
        key="health"
        className="h-full flex flex-col bg-emerald-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 relative"
      >
        <div className="bg-emerald-600 p-5 pt-10 rounded-b-[2.5rem] shadow-lg relative z-10 text-white">
          <h3 className="text-2xl font-bold mb-1">Hello, Sarah</h3>
          <p className="text-xs opacity-90 mb-5">
            Your daily vitals look good today!
          </p>
        </div>
        <div className="p-4 -mt-2 flex-1 pb-20 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                Heart Rate
              </p>
              <p className="font-bold text-xl text-slate-900 dark:text-white">
                72{" "}
                <span className="text-[10px] font-normal text-slate-400">
                  bpm
                </span>
              </p>
            </div>
          </div>
        </div>
        <BottomNav active={0} />
      </div>
    ),

    // Screen 4: Team (Enhanced)
    4: (
      <div
        key="team"
        className="h-full flex flex-col bg-violet-50 dark:bg-slate-900 text-slate-800 dark:text-white relative"
      >
        <div className="bg-violet-600 p-5 pt-10 pb-8 rounded-b-[2rem] shadow-lg relative z-10">
          <div className="flex justify-between items-center text-white mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">John Developer</h4>
                <p className="text-[10px] opacity-80">Frontend Team</p>
              </div>
            </div>
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-md">
              <Bell size={16} />
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-white text-violet-700 py-3 rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2">
              <Clock size={14} /> Clock In
            </button>
            <button className="flex-1 bg-violet-500/50 text-white py-3 rounded-xl font-bold text-xs border border-white/20 flex items-center justify-center gap-2">
              <Briefcase size={14} /> Apply Leave
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 -mt-2 space-y-4 overflow-y-auto pb-20">
          <div>
            <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-3 flex justify-between items-center">
              Today's Tasks{" "}
              <span className="text-[10px] bg-violet-100 dark:bg-violet-900/30 text-violet-600 px-2 py-0.5 rounded-full">
                3 Pending
              </span>
            </h4>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 shadow-sm"
                >
                  <div
                    className={`w-5 h-5 rounded border-2 ${
                      i === 1
                        ? "bg-violet-500 border-violet-500"
                        : "border-slate-300 dark:border-slate-600"
                    } flex items-center justify-center`}
                  >
                    {i === 1 && (
                      <CheckSquare size={12} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-xs font-bold ${
                        i === 1
                          ? "line-through text-slate-400"
                          : "text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {i === 1
                        ? "Morning Standup"
                        : i === 2
                        ? "Update Documentation"
                        : "Review Pull Request"}
                    </p>
                    <p className="text-[9px] text-slate-400">Due: 5:00 PM</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-3">
              Team Status
            </h4>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 min-w-[60px]"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                        i === 3 ? "bg-amber-500" : "bg-green-500"
                      }`}
                    />
                  </div>
                  <span className="text-[9px] font-medium text-slate-600 dark:text-slate-400 truncate w-full text-center">
                    {i === 1
                      ? "Sarah"
                      : i === 2
                      ? "Mike"
                      : i === 3
                      ? "Alex"
                      : "Emma"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomNav active={1} />
      </div>
    ),

    // Screen 5: Society (Enhanced)
    5: (
      <div
        key="society"
        className="h-full flex flex-col bg-indigo-50 dark:bg-slate-900 text-slate-800 dark:text-white relative"
      >
        <div className="bg-indigo-600 p-5 pt-10 pb-8 rounded-b-[2rem] shadow-lg relative z-10">
          <div className="flex justify-between items-center text-white mb-6">
            <div>
              <p className="text-xs opacity-80 mb-0.5">My Flat</p>
              <h3 className="text-xl font-bold">A-101</h3>
              <p className="text-[10px] opacity-70">Gokuldham Society</p>
            </div>
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-md">
              <Bell size={16} />
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-white text-indigo-700 py-2.5 rounded-xl font-bold text-[10px] shadow-md flex flex-col items-center justify-center gap-1">
              <ShieldCheck size={16} /> Pre-Approve
            </button>
            <button className="flex-1 bg-indigo-500/50 text-white py-2.5 rounded-xl font-bold text-[10px] border border-white/20 flex flex-col items-center justify-center gap-1">
              <CreditCard size={16} /> Pay Bill
            </button>
            <button className="flex-1 bg-indigo-500/50 text-white py-2.5 rounded-xl font-bold text-[10px] border border-white/20 flex flex-col items-center justify-center gap-1">
              <AlertCircle size={16} /> Helpdesk
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 -mt-2 space-y-4 overflow-y-auto pb-20">
          {/* Visitors Card */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 bg-green-100 text-green-700 rounded-bl-xl text-[10px] font-bold">
              Expected
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <Truck size={18} className="text-slate-500" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Amazon Delivery</h4>
                <p className="text-[10px] text-slate-500">
                  Gate Pass:{" "}
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    9284
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full h-10 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700">
              <QrCode size={16} className="text-slate-400" />
            </div>
          </div>

          {/* Notice Board */}
          <div>
            <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-2">
              Notice Board
            </h4>
            <div className="space-y-2">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border-l-4 border-l-red-500 shadow-sm flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    AGM Meeting
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Sunday, 10:00 AM @ Clubhouse
                  </p>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border-l-4 border-l-blue-500 shadow-sm flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Water Tank Cleaning
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Monday, Water supply affected
                  </p>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </div>
            </div>
          </div>
        </div>
        <BottomNav active={0} />
      </div>
    ),

    // --- E-SMART SCHOOL DEEP DIVE SCREENS (10-14) ---
    // (Previous screens remain unchanged, truncated for brevity in this response but kept in file)
    10: (
      <div
        key="school-dash"
        className="h-full flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 relative"
      >
        <div className="bg-brand-600 p-5 pt-12 pb-8 rounded-b-[2rem] shadow-lg relative z-10 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold">Aryan Sharma</h3>
              <p className="text-xs opacity-90">Class 5-B • Roll No. 24</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <User size={20} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
              <CheckSquare size={12} /> Present
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
              <Star size={12} /> Avg: 88%
            </div>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3 -mt-4 relative z-20">
          {["Attendance", "Homework", "Fees", "Transport"].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-2"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  i === 0
                    ? "bg-green-100 text-green-600"
                    : i === 1
                    ? "bg-blue-100 text-blue-600"
                    : i === 2
                    ? "bg-orange-100 text-orange-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {i === 0 ? (
                  <Calendar size={18} />
                ) : i === 1 ? (
                  <BookOpen size={18} />
                ) : i === 2 ? (
                  <Receipt size={18} />
                ) : (
                  <Bus size={18} />
                )}
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {item}
              </span>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4">
          <h4 className="text-sm font-bold mb-3 text-slate-900 dark:text-white">
            Recent Notices
          </h4>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex gap-3 items-center">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <Bell size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Exam Schedule Released
              </p>
              <p className="text-[10px] text-slate-500">
                Mid-term exams start from 15th...
              </p>
            </div>
          </div>
        </div>
        <BottomNav active={0} />
      </div>
    ),

    11: (
      <div
        key="school-attendance"
        className="h-full flex flex-col bg-white dark:bg-slate-900 text-slate-800 dark:text-white relative"
      >
        <div className="p-4 pt-10 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h3 className="font-bold text-lg">Attendance</h3>
          <div className="text-xs bg-brand-100 dark:bg-brand-900/30 text-brand-600 px-2 py-1 rounded-lg font-bold">
            Oct 2023
          </div>
        </div>
        <div className="p-4 flex-1 overflow-hidden">
          <div className="grid grid-cols-7 gap-2 mb-6 text-center text-xs font-bold text-slate-400">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <span key={d}>{d}</span>
            ))}
            {[...Array(31)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center rounded-full text-xs ${
                  i === 12
                    ? "bg-red-100 text-red-600 font-bold"
                    : i === 24
                    ? "bg-brand-600 text-white shadow-lg"
                    : i % 7 === 0
                    ? "text-slate-300"
                    : "bg-green-50 text-green-600"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Present</span>
              </div>
              <span className="font-bold">24 Days</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm font-medium">Absent</span>
              </div>
              <span className="font-bold">1 Day</span>
            </div>
            <button className="w-full py-3 mt-4 bg-brand-600 text-white rounded-xl font-bold text-sm shadow-lg">
              Apply Leave
            </button>
          </div>
        </div>
        <BottomNav active={1} />
      </div>
    ),

    12: (
      <div
        key="school-fees"
        className="h-full flex flex-col bg-slate-50 dark:bg-slate-900 relative"
      >
        <div className="bg-slate-900 p-5 pt-10 pb-16 rounded-b-[2rem] text-white relative z-0">
          <p className="text-xs text-slate-400 font-medium mb-1">Total Due</p>
          <h3 className="text-3xl font-bold">₹ 12,500</h3>
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle size={12} /> Due by 15th Nov
          </p>
        </div>
        <div className="flex-1 px-4 -mt-8 relative z-10 overflow-y-auto pb-20">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-1 mb-4">
            <div className="flex p-1 bg-slate-100 dark:bg-slate-700 rounded-xl">
              <button className="flex-1 py-2 text-xs font-bold bg-white dark:bg-slate-600 rounded-lg shadow-sm">
                Pending
              </button>
              <button className="flex-1 py-2 text-xs font-bold text-slate-500">
                Paid
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Q3 Tuition Fee
                  </h4>
                  <p className="text-[10px] text-slate-500">Oct - Dec 2023</p>
                </div>
                <span className="font-bold text-brand-600">₹ 8,500</span>
              </div>
              <button className="w-full py-2 bg-brand-50 text-brand-700 rounded-lg text-xs font-bold mt-2">
                Pay Now
              </button>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Transport Fee
                  </h4>
                  <p className="text-[10px] text-slate-500">Bus Route #12</p>
                </div>
                <span className="font-bold text-brand-600">₹ 4,000</span>
              </div>
              <button className="w-full py-2 bg-brand-50 text-brand-700 rounded-lg text-xs font-bold mt-2">
                Pay Now
              </button>
            </div>
          </div>
        </div>
        <BottomNav active={3} />
      </div>
    ),

    13: (
      <div
        key="school-transport"
        className="h-full flex flex-col bg-slate-900 text-white relative"
      >
        <div className="absolute inset-0 bg-[#1e293b]">
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern
              id="map-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#map-grid)" />
          </svg>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 300 600"
            preserveAspectRatio="none"
          >
            <path
              d="M 150 550 C 50 450, 250 350, 150 250"
              stroke="#3b82f6"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="8 4"
            />
            <circle cx="150" cy="550" r="4" fill="#3b82f6" />
            <circle cx="150" cy="250" r="4" fill="#ef4444" />
          </svg>
          <motion.div
            className="absolute"
            animate={{ top: ["85%", "40%"], left: ["50%", "50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-10 h-10 -ml-5 -mt-5 bg-yellow-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-slate-900">
              <Bus size={18} />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[8px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
              Speed: 40km/h
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 mt-auto m-3 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Ramesh Driver
                </h4>
                <p className="text-[10px] text-slate-500">Bus No: MH-04-1234</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg">
              <Phone size={18} className="fill-current" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg text-center">
              <p className="text-[8px] text-slate-400 uppercase font-bold">
                ETA
              </p>
              <p className="font-bold text-slate-900 dark:text-white">10 min</p>
            </div>
            <div className="flex-1 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg text-center">
              <p className="text-[8px] text-slate-400 uppercase font-bold">
                Distance
              </p>
              <p className="font-bold text-slate-900 dark:text-white">2.5 km</p>
            </div>
          </div>
        </div>
      </div>
    ),

    14: (
      <div
        key="school-results"
        className="h-full flex flex-col bg-white dark:bg-slate-900 text-slate-800 dark:text-white relative"
      >
        <div className="p-4 pt-10 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-lg">Academic Results</h3>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="bg-brand-600 text-white p-5 rounded-2xl shadow-lg mb-6 text-center">
            <p className="text-xs opacity-80 font-medium uppercase tracking-widest mb-1">
              Overall Grade
            </p>
            <h2 className="text-5xl font-black mb-1">A+</h2>
            <p className="text-sm font-medium">92% Percentage</p>
          </div>
          <div className="space-y-3">
            {[
              { sub: "Mathematics", mark: 95, color: "bg-blue-500" },
              { sub: "Science", mark: 88, color: "bg-green-500" },
              { sub: "English", mark: 90, color: "bg-purple-500" },
              { sub: "History", mark: 85, color: "bg-orange-500" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 text-xs">
                  {s.sub.substring(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-bold">{s.sub}</span>
                    <span className="text-xs font-bold text-slate-500">
                      {s.mark}/100
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${s.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.mark}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomNav active={1} />
      </div>
    ),
  };

  return (
    <motion.div
      className="relative w-[280px] h-[560px] min-h-[560px] lg:w-[320px] lg:h-[640px] lg:min-h-[640px] flex-shrink-0 preserve-3d"
      style={{ perspective: "1000px" }}
      animate={{
        rotateY: [-8, 8],
        rotateX: [2, -2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-slate-900 rounded-[3.5rem] shadow-[0_0_0_10px_#1e293b,0_30px_60px_-15px_rgba(0,0,0,0.6)] border-[6px] border-slate-800 overflow-hidden z-20">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-50 flex items-center justify-between px-3 shadow-md">
          <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border-[0.5px] border-slate-800"></div>
          <div className="w-16 h-4 bg-black rounded-full flex items-center justify-end">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]"></div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="absolute top-3.5 left-8 right-8 flex justify-between items-center text-[10px] font-bold text-white/90 z-40">
          <span>9:41</span>
          <div className="flex gap-1.5 items-center">
            <Signal size={12} />
            <Wifi size={12} />
            <div className="w-5 h-2.5 rounded-[3px] border border-white/40 relative flex items-center p-[1px]">
              <div className="bg-white rounded-[1px] w-full h-full"></div>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="w-full h-full bg-white dark:bg-slate-950 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              className="w-full h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {screens[activeSlide] || screens[0]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-1.5 bg-black/20 dark:bg-white/20 rounded-full z-50 backdrop-blur-md"></div>
      </div>

      {/* Gloss/Reflection Overlay */}
      <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-white/25 via-transparent to-transparent pointer-events-none z-30 mix-blend-overlay border-[1px] border-white/20"></div>

      {/* Side Buttons */}
      <div className="absolute top-28 -left-[12px] w-[5px] h-10 bg-slate-700 rounded-l-md border-l border-slate-600 shadow-sm"></div>
      <div className="absolute top-44 -left-[12px] w-[5px] h-14 bg-slate-700 rounded-l-md border-l border-slate-600 shadow-sm"></div>
      <div className="absolute top-36 -right-[12px] w-[5px] h-20 bg-slate-700 rounded-r-md border-r border-slate-600 shadow-sm"></div>
    </motion.div>
  );
};

export default PhoneMockup;
