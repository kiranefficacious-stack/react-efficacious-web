import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import {
  QrCode, Calendar, Clock, ShieldCheck, Smartphone,
  Building2, CheckCircle2, ArrowRight, ArrowDown,
  BarChart3, Bell, Layers, Wifi,
  Landmark, ShoppingBag, Flame, Phone,
  ZapIcon, Cross, Play, Download,
  MapPin, Timer, ChevronRight, Home,
  LayoutGrid, Settings, User, Star,
  Utensils, Activity, Search
} from 'lucide-react';
import Contact from '../components/Contact';
import { useContent } from '../hooks/useContent';

const motion = m as any;

// ── Inline Phone Shell ──────────────────────────────────────────────────────
const PhoneShell: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`relative w-[240px] h-[480px] rounded-[38px] bg-slate-900 shadow-2xl border-[6px] border-slate-700 overflow-hidden ${className}`}>
    {/* Notch */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-b-2xl z-50" />
    {/* Screen */}
    <div className="absolute inset-0 overflow-hidden rounded-[32px]">
      {children}
    </div>
  </div>
);

// ── Screen 1: Home / Select Service ────────────────────────────────────────
const ScreenHome = () => (
  <div className="h-full flex flex-col bg-slate-50 text-slate-800">
    {/* Header */}
    <div className="bg-violet-600 px-4 pt-8 pb-6 rounded-b-[2rem]">
      <div className="flex justify-between items-center text-white mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <User size={13} />
          </div>
          <span className="text-xs font-semibold">Hello, Rahul 👋</span>
        </div>
        <Bell size={15} className="text-white/80" />
      </div>
      <h3 className="text-white font-extrabold text-base leading-tight mb-1">Book your slot,<br />skip the queue.</h3>
      <div className="mt-3 flex items-center bg-white/20 backdrop-blur rounded-xl px-3 py-2 gap-2">
        <Search size={12} className="text-white/70" />
        <span className="text-xs text-white/60">Search service provider...</span>
      </div>
    </div>

    {/* Categories */}
    <div className="px-3 pt-3 pb-1">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">Nearby Services</p>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Bank', icon: <Landmark size={14} />, color: 'bg-blue-100 text-blue-600' },
          { label: 'Post', icon: <MapPin size={14} />, color: 'bg-orange-100 text-orange-600' },
          { label: 'Health', icon: <Cross size={14} />, color: 'bg-emerald-100 text-emerald-600' },
          { label: 'Temple', icon: <ShieldCheck size={14} />, color: 'bg-rose-100 text-rose-600' },
        ].map((c, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-9 h-9 rounded-xl ${c.color} flex items-center justify-center`}>{c.icon}</div>
            <span className="text-[8px] font-semibold text-slate-600">{c.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Provider list */}
    <div className="px-3 flex-1 overflow-hidden space-y-2 mt-2">
      {[
        { name: 'SBI Branch - Sector 7', wait: '~12 min', slots: '8 free', color: 'bg-blue-500' },
        { name: 'India Post Office', wait: '~5 min', slots: '12 free', color: 'bg-orange-500' },
        { name: 'Apollo Clinic', wait: '~20 min', slots: '3 free', color: 'bg-emerald-500' },
      ].map((p, i) => (
        <div key={i} className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg ${p.color} flex items-center justify-center shrink-0`}>
            <Building2 size={14} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold text-slate-800 truncate">{p.name}</p>
            <p className="text-[8px] text-slate-400">{p.wait} • {p.slots}</p>
          </div>
          <ChevronRight size={12} className="text-slate-300 shrink-0" />
        </div>
      ))}
    </div>

    {/* Bottom nav */}
    <div className="bg-white border-t border-slate-100 px-4 py-2 flex justify-around">
      {[<Home size={16} />, <LayoutGrid size={16} />, <Bell size={16} />, <Settings size={16} />].map((ic, i) => (
        <div key={i} className={`p-1 ${i === 0 ? 'text-violet-600' : 'text-slate-300'}`}>{ic}</div>
      ))}
    </div>
  </div>
);

// ── Screen 2: Slot Booking ──────────────────────────────────────────────────
const ScreenBooking = () => (
  <div className="h-full flex flex-col bg-white text-slate-800">
    <div className="bg-violet-600 px-4 pt-8 pb-5">
      <p className="text-[9px] text-violet-200 font-semibold mb-0.5">SBI Branch — Sector 7</p>
      <h3 className="text-white font-extrabold text-sm">Choose Your Slot</h3>
    </div>

    <div className="flex-1 px-3 pt-3 overflow-hidden flex flex-col gap-2">
      {/* Date row */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {['Mon\n14', 'Tue\n15', 'Wed\n16', 'Thu\n17', 'Fri\n18'].map((d, i) => (
          <div key={i} className={`shrink-0 w-10 rounded-xl flex flex-col items-center py-2 text-[8px] font-bold leading-tight ${i === 0 ? 'bg-violet-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
            {d.split('\n').map((l, j) => <span key={j}>{l}</span>)}
          </div>
        ))}
      </div>

      {/* Time slots */}
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Available Times</p>
      <div className="grid grid-cols-3 gap-1.5">
        {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'].map((t, i) => (
          <div key={i} className={`text-center py-2 rounded-xl text-[9px] font-bold border ${i === 2 ? 'bg-violet-600 text-white border-violet-600 shadow-md' : i === 4 ? 'bg-slate-100 text-slate-300 border-slate-100 line-through' : 'border-violet-200 text-violet-600 bg-violet-50'}`}>
            {t}
          </div>
        ))}
      </div>

      {/* Service type */}
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">Service Type</p>
      <div className="space-y-1.5">
        {['Account Inquiry', 'Loan Application', 'Cash Deposit'].map((s, i) => (
          <div key={i} className={`flex items-center gap-2 p-2 rounded-xl border text-[9px] font-semibold ${i === 0 ? 'bg-violet-50 border-violet-300 text-violet-700' : 'border-slate-100 text-slate-500'}`}>
            <div className={`w-3 h-3 rounded-full border-2 shrink-0 flex items-center justify-center ${i === 0 ? 'border-violet-500' : 'border-slate-300'}`}>
              {i === 0 && <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />}
            </div>
            {s}
          </div>
        ))}
      </div>

      <motion.button
        className="mt-auto w-full py-2.5 bg-violet-600 text-white rounded-xl font-bold text-[10px] shadow-lg shadow-violet-500/30 flex items-center justify-center gap-1.5"
        whileTap={{ scale: 0.97 }}
      >
        Confirm Booking <ArrowRight size={11} />
      </motion.button>
    </div>
  </div>
);

// ── Screen 3: QR Pass ───────────────────────────────────────────────────────
const ScreenQR = () => (
  <div className="h-full flex flex-col bg-[#0c0a1e] text-white">
    <div className="px-4 pt-8 pb-2">
      <p className="text-[9px] text-violet-300 font-semibold">Booking Confirmed ✓</p>
      <h3 className="font-extrabold text-sm mt-0.5">Your Entry Pass</h3>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center px-4 gap-3">
      {/* Provider info */}
      <div className="w-full bg-white/10 backdrop-blur rounded-2xl p-3 text-center border border-white/10">
        <p className="text-[8px] text-slate-400">Service Provider</p>
        <p className="font-bold text-xs text-white mt-0.5">SBI Branch — Sector 7</p>
        <div className="flex justify-center gap-4 mt-2">
          <div>
            <p className="text-[8px] text-slate-400">Date</p>
            <p className="text-[9px] font-bold text-violet-300">Mon, Apr 14</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-[8px] text-slate-400">Time Slot</p>
            <p className="text-[9px] font-bold text-violet-300">10:00 AM</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-[8px] text-slate-400">Token</p>
            <p className="text-[9px] font-bold text-violet-300">#A-042</p>
          </div>
        </div>
      </div>

      {/* QR Box */}
      <div className="w-36 h-36 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-500/30">
        <div className="w-28 h-28">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="white"/>
            {/* Simplified visual QR pattern */}
            <rect x="10" y="10" width="25" height="25" rx="3" fill="#0c0a1e"/>
            <rect x="65" y="10" width="25" height="25" rx="3" fill="#0c0a1e"/>
            <rect x="10" y="65" width="25" height="25" rx="3" fill="#0c0a1e"/>
            <rect x="14" y="14" width="17" height="17" rx="1.5" fill="white"/>
            <rect x="69" y="14" width="17" height="17" rx="1.5" fill="white"/>
            <rect x="14" y="69" width="17" height="17" rx="1.5" fill="white"/>
            <rect x="17" y="17" width="11" height="11" rx="1" fill="#7c3aed"/>
            <rect x="72" y="17" width="11" height="11" rx="1" fill="#7c3aed"/>
            <rect x="17" y="72" width="11" height="11" rx="1" fill="#7c3aed"/>
            {/* Data pixels */}
            {[42,48,55,62,70,38,52,58,65,75,40,46,60,68,45,50,56].map((x, i) => (
              <rect key={i} x={x % 55 + 35} y={x % 45 + 30} width="4" height="4" fill="#0c0a1e"/>
            ))}
            {[43,51,59,67,39,47,63,71,41,53,61,43].map((x, i) => (
              <rect key={i} x={x % 40 + 20} y={x % 30 + 42} width="3" height="3" fill="#0c0a1e"/>
            ))}
          </svg>
        </div>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
        </span>
        <span className="text-[9px] text-slate-300">Show this at entry — valid until 10:15 AM</span>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>
    </div>

    {/* Bottom action */}
    <div className="px-4 pb-5">
      <div className="w-full py-2 border border-white/10 rounded-xl flex items-center justify-center gap-1.5 text-[9px] font-semibold text-slate-300">
        <Bell size={10} /> Queue updates: 3 ahead of you
      </div>
    </div>
  </div>
);

// ── How It Works Steps ──────────────────────────────────────────────────────
const steps = [
  { step: '01', title: 'Open App & Find Service', desc: 'Search nearby banks, post offices, hospitals, temples, gas agencies and more.', color: 'from-violet-500 to-indigo-600', icon: <Search size={20} /> },
  { step: '02', title: 'Pick Date & Time Slot', desc: 'Browse real-time available slots and reserve one that fits your schedule.', color: 'from-indigo-500 to-fuchsia-600', icon: <Calendar size={20} /> },
  { step: '03', title: 'Get Your QR Pass', desc: 'An encrypted QR code entry pass is instantly generated and saved to your phone.', color: 'from-fuchsia-500 to-pink-600', icon: <QrCode size={20} /> },
  { step: '04', title: 'Arrive & Walk In', desc: 'Arrive near your slot time, scan QR at entry — no token, no line, no waiting.', color: 'from-pink-500 to-rose-600', icon: <CheckCircle2 size={20} /> },
];

// ── Supported Sectors ───────────────────────────────────────────────────────
const sectors = [
  { title: 'Banks & ATMs', icon: <Landmark size={22} />, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30' },
  { title: 'Post Offices', icon: <MapPin size={22} />, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/30' },
  { title: 'Hospitals & Clinics', icon: <Cross size={22} />, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' },
  { title: 'LPG / Gas Agencies', icon: <Flame size={22} />, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30' },
  { title: 'Mobile Operators', icon: <Phone size={22} />, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/30' },
  { title: 'Mandirs & Temples', icon: <ShieldCheck size={22} />, color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/30' },
  { title: 'Govt. Offices', icon: <Building2 size={22} />, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' },
  { title: 'Shopping Centres', icon: <ShoppingBag size={22} />, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30' },
];

// ── Features ────────────────────────────────────────────────────────────────
const features = [
  {
    title: 'Smart Slot Booking',
    description: 'Users open the mobile app, choose a service provider, pick date & time, check live availability and confirm — all in under 60 seconds. No phone calls, no physical visits.',
    details: ['Live Slot Availability', 'Category & Location Filter', 'Instant SMS + App Confirmation'],
    color: 'bg-violet-600', glow: 'bg-violet-400', textAccent: 'text-violet-600', border: 'border-violet-200 dark:border-violet-800',
    screen: <ScreenBooking />,
  },
  {
    title: 'Encrypted QR Entry Pass',
    description: 'On confirmation, the app generates a unique encrypted QR code tied to the booking. The user presents it at the venue entry scanner — completely contactless, no printed token required.',
    details: ['One-time Encrypted QR', 'Auto-expires After Slot', 'Offline Display Support'],
    color: 'bg-indigo-600', glow: 'bg-indigo-400', textAccent: 'text-indigo-600', border: 'border-indigo-200 dark:border-indigo-800',
    screen: <ScreenQR />,
  },
  {
    title: 'Live Queue Position Updates',
    description: 'The app shows real-time queue position and estimated wait time. Push notifications alert the user when their turn is approaching — you only need to arrive 5 minutes before you\'re called.',
    details: ['Real-time Queue Position', 'ETA Push Notifications', 'Auto Turn Alerts'],
    color: 'bg-fuchsia-600', glow: 'bg-fuchsia-400', textAccent: 'text-fuchsia-600', border: 'border-fuchsia-200 dark:border-fuchsia-800',
    screen: <ScreenHome />,
  },
];

// ── Main Component ───────────────────────────────────────────────────────────
const ESmartQueue: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const screens = [<ScreenHome />, <ScreenBooking />, <ScreenQR />];
  const { data } = useContent();
  const product = data.products.find((p: any) => p.href === '/products/emart-queue');

  return (
    <div className="w-full bg-slate-50 dark:bg-dark-bg transition-colors duration-300">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0c0a1e]">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.12]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid-q" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20h40M20 0v40" fill="none" stroke="#7c3aed" strokeWidth="0.6" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-q)" />
          </svg>
        </div>
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-700/25 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-700/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c0a1e]/80 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

            {/* Left: Copy */}
            <motion.div
              className="flex-1 text-white text-center lg:text-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-xs font-bold uppercase tracking-wider mb-6 text-violet-300">
                <ZapIcon size={13} className="fill-violet-400 text-violet-400" />
                Mobile App • iOS & Android
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6">
                End Queues.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                  Start Living.
                </span>
              </h1>

              <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed font-light">
                <strong className="text-white font-semibold">emart Queue</strong> is a mobile app that lets users book time slots at banks, post offices, hospitals, temples & more — enter with a QR code, zero waiting in line.
              </p>

              {/* App Store Badges */}
              <div className="flex flex-wrap flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <a 
                  href={product?.appStoreLink || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-start gap-4 bg-white text-slate-900 px-6 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-xl w-[210px]"
                >
                  <svg className="w-7 h-7 fill-current mb-0.5 shrink-0" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/></svg>
                  <div className="flex flex-col items-start leading-none text-left">
                    <span className="text-[10px] font-semibold text-slate-500 mb-1">Download on the</span>
                    <span className="text-base font-bold tracking-tight leading-none">App Store</span>
                  </div>
                </a>
                <a 
                  href={product?.playStoreLink || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-start gap-4 bg-white text-slate-900 px-6 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-xl w-[210px]"
                >
                  <svg className="w-6 h-6 fill-current mb-0.5 shrink-0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                  <div className="flex flex-col items-start leading-none text-left">
                    <span className="text-[10px] font-semibold text-slate-500 mb-1">GET IT ON</span>
                    <span className="text-base font-bold tracking-tight leading-none">Google Play</span>
                  </div>
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                {[
                  { val: '70%', label: 'Wait time reduced' },
                  { val: '50+', label: 'Sectors supported' },
                  { val: '0', label: 'Physical queues' },
                ].map((s, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-3xl font-extrabold text-violet-300">{s.val}</div>
                    <div className="text-xs text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: 3 Phones */}
            <motion.div
              className="flex-1 flex items-end justify-center gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <PhoneShell className="-rotate-6 mb-0 shadow-violet-900/40 opacity-80 scale-[0.88]">
                <ScreenHome />
              </PhoneShell>
              <PhoneShell className="z-10 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.6)]">
                <ScreenBooking />
              </PhoneShell>
              <PhoneShell className="rotate-6 mb-0 shadow-violet-900/40 opacity-80 scale-[0.88]">
                <ScreenQR />
              </PhoneShell>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown size={28} />
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 border border-violet-100 dark:border-violet-800 text-violet-600 dark:text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Clock size={13} /> 4-Step Process
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">From App to Entry — 60 Seconds</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Download the app, book in seconds, walk straight in. No physical presence required until your slot.</p>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-12px)] w-full h-0.5 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 z-0" />
                )}
                <div className="relative z-10 bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-700 transition-all hover:shadow-lg h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                    {step.icon}
                  </div>
                  <div className="text-3xl font-black text-slate-100 dark:text-slate-800 mb-2">{step.step}</div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE PHONE DEMO ── */}
      <section className="py-24 bg-slate-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left: Screen selector */}
            <motion.div
              className="flex-1 space-y-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 border border-violet-100 dark:border-violet-800 text-violet-600 dark:text-violet-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Smartphone size={13} /> App Walkthrough
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                See the emart Queue<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">app in action</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400">Tap a screen below to explore each step of the user journey — from discovering a service to walking through the entry gate.</p>

              <div className="space-y-3 mt-4">
                {[
                  { label: 'Home & Service Discovery', desc: 'Browse nearby providers by category or search', icon: <Home size={18} /> },
                  { label: 'Slot Booking', desc: 'Pick date, time slot & service type', icon: <Calendar size={18} /> },
                  { label: 'QR Entry Pass', desc: 'Show QR at entry & track queue position live', icon: <QrCode size={18} /> },
                ].map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveScreen(i)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${activeScreen === i ? 'bg-violet-50 dark:bg-violet-900/30 border-violet-300 dark:border-violet-700 shadow-sm' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-800'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activeScreen === i ? 'bg-violet-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                      {tab.icon}
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${activeScreen === i ? 'text-violet-700 dark:text-violet-300' : 'text-slate-800 dark:text-slate-200'}`}>{tab.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{tab.desc}</div>
                    </div>
                    {activeScreen === i && <div className="ml-auto w-2 h-2 bg-violet-500 rounded-full animate-pulse" />}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right: Phone */}
            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-violet-500/20 blur-[80px] rounded-full scale-75" />
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, y: 20, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <PhoneShell className="relative z-10 shadow-[0_40px_100px_-20px_rgba(124,58,237,0.5)]">
                    {screens[activeScreen]}
                  </PhoneShell>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOR USERS vs FOR PROVIDERS ── */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">One Platform, Two Sides</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">emart Queue serves both the citizen booking appointments and the service provider managing them.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Users */}
            <motion.div
              className="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-700 p-8 text-white"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
                <Smartphone size={24} />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-violet-200 mb-2">For End Users</div>
              <h3 className="text-2xl font-extrabold mb-3">The Mobile App</h3>
              <p className="text-violet-100 text-sm leading-relaxed mb-6">Citizens download the app, find service providers near them, book a time slot, and get a QR entry pass — all without leaving their home.</p>
              <div className="space-y-2.5">
                {['Browse all nearby service providers', 'Real-time slot availability check', 'Encrypted QR code entry pass', 'Live queue position tracking', 'Push notifications for turn alerts', 'Booking history & rebooking'].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 size={16} className="text-violet-200 shrink-0" />
                    <span className="text-violet-100">{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-7">
                <a 
                  href={product?.appStoreLink || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-violet-700 px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:scale-105 transition-transform"
                >
                  <Smartphone size={14} /> App Store
                </a>
                <a 
                  href={product?.playStoreLink || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-violet-700 px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:scale-105 transition-transform"
                >
                  <Play size={14} className="fill-violet-700" /> Google Play
                </a>
              </div>
            </motion.div>

            {/* For Providers */}
            <motion.div
              className="rounded-3xl bg-slate-50 dark:bg-slate-800 p-8 border border-slate-100 dark:border-slate-700"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/40 text-violet-600 rounded-2xl flex items-center justify-center mb-5">
                <BarChart3 size={24} />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-violet-500 mb-2">For Service Providers</div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">Admin Dashboard</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">Banks, post offices, hospitals, and offices get a powerful web dashboard to control their slots, monitor arrivals, and manage capacity in real time.</p>
              <div className="space-y-2.5">
                {['Set daily slot capacity & timings', 'Live arrival monitoring dashboard', 'QR scanner for gate entry validation', 'Walk-in token issuance fallback', 'Multi-branch management', 'Reports & analytics'].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 size={16} className="text-violet-500 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-7 flex items-center gap-2 bg-violet-600 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-lg shadow-violet-500/20 hover:bg-violet-500 transition-colors"
              >
                Register Your Organisation <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SUPPORTED SECTORS ── */}
      <section className="py-20 bg-slate-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Works Everywhere There's a Queue</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">emart Queue integrates with any service provider that generates waiting lines.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {sectors.map((s, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-slate-800 p-4 rounded-2xl flex flex-col items-center gap-2.5 text-center border border-slate-100 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-700 transition-all hover:shadow-md group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">{s.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ZIG-ZAG ── */}
      <div className="flex flex-col">
        {features.map((f, index) => (
          <section key={index} className="py-24 lg:py-32 relative overflow-hidden">
            {index % 2 === 1 && <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/30 -z-10" />}
            <div className={`absolute top-1/2 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} -translate-y-1/2 w-96 h-96 ${f.glow} opacity-10 blur-[100px] rounded-full -z-10`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Text */}
                <motion.div
                  className="flex-1 space-y-7"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center text-white shadow-lg`}>
                      <Smartphone size={24} />
                    </div>
                    <span className="text-6xl font-black text-slate-200 dark:text-slate-800/50 select-none">0{index + 1}</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">{f.title}</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{f.description}</p>
                  <div className="space-y-3">
                    {f.details.map((d, i) => (
                      <div key={i} className={`flex items-center gap-3 p-4 bg-white/70 dark:bg-slate-800/70 rounded-xl border ${f.border} shadow-sm backdrop-blur-sm`}>
                        <CheckCircle2 size={18} className={f.textAccent} />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{d}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Phone mockup */}
                <motion.div
                  className="flex-1 flex justify-center"
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="relative">
                    <div className={`absolute inset-0 ${f.glow} opacity-25 blur-[70px] rounded-full scale-90`} />
                    <PhoneShell className={`relative z-10 shadow-[0_30px_80px_-15px_rgba(124,58,237,0.4)]`}>
                      {f.screen}
                    </PhoneShell>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── STATS STRIP ── */}
      <section className="py-20 bg-gradient-to-br from-violet-700 via-fuchsia-700 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { val: '70%', label: 'Reduction in Wait Time' },
              { val: '50+', label: 'Service Categories' },
              { val: 'Zero', label: 'Physical Queues Needed' },
            ].map((s, i) => (
              <div key={i} className="p-6">
                <motion.div
                  className="text-5xl font-black text-white mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 180 }}
                >
                  {s.val}
                </motion.div>
                <div className="text-violet-100 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP DOWNLOAD CTA ── */}
      <section className="py-20 bg-[#0c0a1e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20h40M20 0v40" fill="none" stroke="#7c3aed" strokeWidth="0.6" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-cta)" />
          </svg>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/20 blur-[100px] rounded-full" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-violet-500/30">
              <Timer size={30} className="text-white" />
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">Ready to ditch the queue?</h2>
            <p className="text-slate-300 text-lg mb-8">Download emart Queue today and never waste another minute standing in line.</p>
            <div className="flex flex-wrap flex-row items-center justify-center gap-4">
              <a 
                href={product?.appStoreLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-start gap-4 bg-white text-slate-900 px-6 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-xl w-[210px]"
              >
                <svg className="w-7 h-7 fill-current mb-0.5 shrink-0" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/></svg>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[10px] font-semibold text-slate-500 mb-1">Download on the</span>
                  <span className="text-base font-bold tracking-tight leading-none">App Store</span>
                </div>
              </a>
              <a 
                href={product?.playStoreLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-start gap-4 bg-white text-slate-900 px-6 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-xl w-[210px]"
              >
                <svg className="w-6 h-6 fill-current mb-0.5 shrink-0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[10px] font-semibold text-slate-500 mb-1">GET IT ON</span>
                  <span className="text-base font-bold tracking-tight leading-none">Google Play</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default ESmartQueue;
