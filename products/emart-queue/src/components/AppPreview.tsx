import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, MapPin, Search, QrCode,
  Navigation, X, Info, Home, Ticket, CalendarDays, Smartphone
} from 'lucide-react';

// ── QR Code SVG ─────────────────────────────────────────────────────
function QRCodeSVG() {
  return (
    <svg viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" className="w-full h-full">
      <rect width="33" height="33" fill="white" />
      {/* Top-left finder */}
      <rect x="0" y="0" width="7" height="7" fill="#111" />
      <rect x="1" y="1" width="5" height="5" fill="white" />
      <rect x="2" y="2" width="3" height="3" fill="#111" />
      {/* Top-right finder */}
      <rect x="26" y="0" width="7" height="7" fill="#111" />
      <rect x="27" y="1" width="5" height="5" fill="white" />
      <rect x="28" y="2" width="3" height="3" fill="#111" />
      {/* Bottom-left finder */}
      <rect x="0" y="26" width="7" height="7" fill="#111" />
      <rect x="1" y="27" width="5" height="5" fill="white" />
      <rect x="2" y="28" width="3" height="3" fill="#111" />
      {/* Timing patterns */}
      <rect x="8" y="6" width="1" height="1" fill="#111"/><rect x="10" y="6" width="1" height="1" fill="#111"/>
      <rect x="12" y="6" width="1" height="1" fill="#111"/><rect x="14" y="6" width="1" height="1" fill="#111"/>
      <rect x="6" y="8" width="1" height="1" fill="#111"/><rect x="6" y="10" width="1" height="1" fill="#111"/>
      <rect x="6" y="12" width="1" height="1" fill="#111"/><rect x="6" y="14" width="1" height="1" fill="#111"/>
      {/* Data modules */}
      <rect x="8" y="8" width="2" height="2" fill="#111"/>
      <rect x="12" y="8" width="1" height="1" fill="#111"/><rect x="14" y="8" width="2" height="1" fill="#111"/>
      <rect x="18" y="8" width="1" height="1" fill="#111"/><rect x="21" y="8" width="2" height="1" fill="#111"/>
      <rect x="24" y="8" width="3" height="1" fill="#111"/>
      <rect x="9" y="9" width="1" height="2" fill="#111"/><rect x="11" y="9" width="1" height="1" fill="#111"/>
      <rect x="15" y="9" width="2" height="1" fill="#111"/><rect x="19" y="9" width="1" height="1" fill="#111"/>
      <rect x="23" y="9" width="2" height="1" fill="#111"/>
      <rect x="8" y="10" width="1" height="1" fill="#111"/><rect x="11" y="10" width="3" height="1" fill="#111"/>
      <rect x="16" y="10" width="2" height="1" fill="#111"/><rect x="20" y="10" width="1" height="1" fill="#111"/>
      <rect x="25" y="10" width="2" height="1" fill="#111"/>
      <rect x="10" y="11" width="2" height="1" fill="#111"/><rect x="14" y="11" width="1" height="1" fill="#111"/>
      <rect x="17" y="11" width="1" height="1" fill="#111"/><rect x="20" y="11" width="3" height="1" fill="#111"/>
      <rect x="24" y="11" width="1" height="1" fill="#111"/>
      <rect x="8" y="12" width="1" height="1" fill="#111"/><rect x="11" y="12" width="2" height="2" fill="#111"/>
      <rect x="15" y="12" width="1" height="1" fill="#111"/><rect x="18" y="12" width="2" height="1" fill="#111"/>
      <rect x="22" y="12" width="1" height="1" fill="#111"/><rect x="25" y="12" width="2" height="1" fill="#111"/>
      <rect x="9" y="13" width="1" height="1" fill="#111"/><rect x="14" y="13" width="1" height="2" fill="#111"/>
      <rect x="17" y="13" width="1" height="1" fill="#111"/><rect x="20" y="13" width="1" height="1" fill="#111"/>
      <rect x="23" y="13" width="2" height="1" fill="#111"/>
      <rect x="8" y="14" width="1" height="1" fill="#111"/><rect x="10" y="14" width="3" height="1" fill="#111"/>
      <rect x="16" y="14" width="1" height="1" fill="#111"/><rect x="19" y="14" width="2" height="1" fill="#111"/>
      <rect x="24" y="14" width="3" height="1" fill="#111"/>
      <rect x="9" y="15" width="2" height="1" fill="#111"/><rect x="13" y="15" width="1" height="1" fill="#111"/>
      <rect x="17" y="15" width="2" height="1" fill="#111"/><rect x="22" y="15" width="1" height="1" fill="#111"/>
      <rect x="25" y="15" width="1" height="1" fill="#111"/>
      <rect x="8" y="16" width="3" height="1" fill="#111"/><rect x="13" y="16" width="2" height="1" fill="#111"/>
      <rect x="16" y="16" width="1" height="1" fill="#111"/><rect x="19" y="16" width="2" height="1" fill="#111"/>
      <rect x="23" y="16" width="3" height="1" fill="#111"/>
      <rect x="9" y="17" width="1" height="1" fill="#111"/><rect x="12" y="17" width="1" height="1" fill="#111"/>
      <rect x="15" y="17" width="3" height="1" fill="#111"/><rect x="20" y="17" width="1" height="1" fill="#111"/>
      <rect x="24" y="17" width="2" height="1" fill="#111"/>
      <rect x="8" y="20" width="2" height="1" fill="#111"/><rect x="12" y="20" width="3" height="1" fill="#111"/>
      <rect x="9" y="21" width="1" height="1" fill="#111"/><rect x="11" y="21" width="1" height="2" fill="#111"/>
      <rect x="14" y="21" width="2" height="1" fill="#111"/>
      <rect x="8" y="22" width="1" height="1" fill="#111"/><rect x="13" y="22" width="1" height="2" fill="#111"/>
      <rect x="10" y="24" width="2" height="1" fill="#111"/>
      <rect x="9" y="26" width="1" height="1" fill="#111"/><rect x="11" y="26" width="2" height="1" fill="#111"/>
      <rect x="8" y="28" width="3" height="1" fill="#111"/><rect x="12" y="28" width="1" height="1" fill="#111"/>
      <rect x="9" y="30" width="2" height="1" fill="#111"/>
    </svg>
  );
}

// ── Status Bar ───────────────────────────────────────────────────────
function PhoneStatusBar({ purple = false }: { purple?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-4 py-[5px] text-[9px] font-bold flex-shrink-0 ${purple ? 'bg-purple-700 text-white' : 'bg-white text-slate-800'}`}>
      <span>4:55</span>
      <div className="flex items-center gap-0.5">
        <span className="text-[8px]">5G</span>
        <span>▮▮▮</span>
        <span className="ml-0.5">⚡34</span>
      </div>
    </div>
  );
}

// ── SCREEN 1: Home ───────────────────────────────────────────────────
function HomeScreen() {
  const bookings = [
    { label: 'Hair Cutting',  sub: 'Modern Hair Designer',  time: '11:00 ~ 11:45', bg: 'bg-green-500' },
    { label: 'Software dev',  sub: 'Efficacious • BOOKED',  time: '05:15 ~ 06:00', bg: 'bg-red-400' },
    { label: "Men's Grooming",sub: 'Modern Hair Designer',  time: '10:30 ~ 11:00', bg: 'bg-slate-400' },
    { label: 'Hair Styling',  sub: 'Modern Hair Designer',  time: '10:00 ~ 10:30', bg: 'bg-yellow-400' },
  ];
  return (
    <>
      <PhoneStatusBar purple />
      <div className="bg-purple-600 px-3 pt-1 pb-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <MapPin size={10} className="text-white" />
            <div>
              <p className="text-[9px] font-extrabold text-white tracking-wide leading-none">HELLO, KIRAN 👋</p>
              <p className="text-[8px] text-purple-200">Panvel, 410206 ▾</p>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-white/30 flex items-center justify-center text-white text-[8px] font-bold">K</div>
        </div>
        <h2 className="text-white font-extrabold text-[13px] leading-tight mb-2.5">Book your slot,<br/>skip the queue</h2>
        <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-2.5 py-1.5">
          <Search size={9} className="text-white/70" />
          <span className="text-[8px] text-white/70">Find banks, post offices, operators...</span>
        </div>
      </div>
      <div className="flex-1 bg-slate-50 overflow-y-auto">
        <div className="px-3 pt-2.5">
          <p className="text-[7px] font-extrabold text-slate-400 tracking-[0.15em] mb-1.5">NEARBY SERVICES</p>
          <div className="flex gap-1.5 mb-3">
            {[{e:'🏢',l:'Health11',c:'bg-blue-50'},{e:'🏥',l:'health12345',c:'bg-orange-50'},{e:'🚚',l:'Logistics',c:'bg-teal-50'},{e:'💻',l:'Software D...',c:'bg-yellow-50'}].map(s=>(
              <div key={s.l} className="flex flex-col items-center gap-0.5 w-12">
                <div className={`w-10 h-10 ${s.c} rounded-xl flex items-center justify-center text-lg`}>{s.e}</div>
                <span className="text-[6.5px] text-slate-500 text-center leading-tight">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-3">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[7px] font-extrabold text-slate-400 tracking-[0.15em]">MY BOOKINGS</p>
            <p className="text-[7px] text-purple-600 font-bold">15 FOUND</p>
          </div>
          <div className="space-y-1.5">
            {bookings.map((b,i)=>(
              <div key={i} className="flex items-center gap-2 bg-white rounded-xl px-2 py-1.5 shadow-sm">
                <div className={`w-8 h-8 ${b.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <QrCode size={12} className="text-white"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-slate-800 truncate">{b.label}</p>
                  <p className="text-[7px] text-slate-400 truncate">~ {b.sub}</p>
                </div>
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <p className="text-[8px] font-medium text-slate-600">{b.time}</p>
                  <ChevronRight size={9} className="text-slate-300"/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── SCREEN 2: Search ─────────────────────────────────────────────────
function SearchScreen() {
  const providers = [
    { name: 'Efficacious',           addr: 'Sushma Nivas, Sector 1, Road No. 6, New Panvel', icon: '👤', bg: 'bg-purple-100' },
    { name: 'Modern Hair Designer',  addr: 'New Panvel Maharashtra',                          icon: '✂️', bg: 'bg-slate-100' },
    { name: 'Shree Enterprises',     addr: 'Shusma Nivas, Sector 1, Road No. 6, New Panvel', icon: '👔', bg: 'bg-slate-100' },
  ];
  return (
    <>
      <PhoneStatusBar purple />
      <div className="bg-purple-600 px-3 pt-1 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2.5">
          <ChevronLeft size={15} className="text-white"/>
          <span className="text-white font-extrabold text-[14px]">Search</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm">
          <Search size={10} className="text-slate-400"/>
          <span className="text-[8px] text-slate-400 flex-1">Find banks, post offices, operators...</span>
          <Search size={10} className="text-slate-400"/>
        </div>
      </div>
      <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden">
        <div className="px-3 pt-3 flex-1">
          <p className="text-[7px] font-extrabold text-slate-400 tracking-[0.15em] mb-2">SERVICE PROVIDERS</p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
            {providers.map((p,i)=>(
              <div key={i} className="flex items-center gap-2.5 px-3 py-2.5">
                <div className={`w-9 h-9 ${p.bg} rounded-full flex items-center justify-center text-lg flex-shrink-0`}>{p.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9.5px] font-bold text-slate-800">{p.name}</p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <MapPin size={7} className="text-slate-400 flex-shrink-0"/>
                    <p className="text-[7px] text-slate-400 truncate">{p.addr}</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-slate-200 flex-shrink-0"/>
              </div>
            ))}
          </div>
        </div>
        {/* Keyboard */}
        <div className="bg-slate-700 px-1.5 py-2 flex-shrink-0 mt-auto">
          <div className="flex justify-center gap-0.5 mb-1">
            {'qwertyuiop'.split('').map(k=>(
              <div key={k} className="flex-1 bg-slate-500 rounded text-[5.5px] text-white text-center py-[3px]">{k}</div>
            ))}
          </div>
          <div className="flex justify-center gap-0.5 mb-1 px-2">
            {'asdfghjkl'.split('').map(k=>(
              <div key={k} className="flex-1 bg-slate-500 rounded text-[5.5px] text-white text-center py-[3px]">{k}</div>
            ))}
          </div>
          <div className="flex justify-center gap-0.5 px-5">
            {'zxcvbnm'.split('').map(k=>(
              <div key={k} className="flex-1 bg-slate-500 rounded text-[5.5px] text-white text-center py-[3px]">{k}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── SCREEN 3: My Bookings ────────────────────────────────────────────
function BookingsScreen() {
  const upcoming = [
    { label: 'Hair Styling',  time: '06:30 ~ 07:00', bg: 'bg-cyan-400' },
    { label: 'Hair Coloring', time: '05:30 ~ 06:00', bg: 'bg-green-500' },
    { label: 'Hair Styling',  time: '04:30 ~ 05:00', bg: 'bg-red-400' },
    { label: 'Hair Coloring', time: '08:00 ~ 08:30', bg: 'bg-slate-400' },
  ];
  const history = [
    { name: 'Efficacious',         detail: 'Software dev • 2026-06-27 09:00 AM' },
    { name: 'Efficacious',         detail: 'AI Development • 2026-06-09 11:15 AM' },
    { name: 'Modern Hair Designer',detail: 'Hair Styling • 2026-06-05 08:30 AM' },
  ];
  return (
    <>
      <PhoneStatusBar purple />
      <div className="bg-purple-600 px-3 pt-1 pb-3 flex items-center gap-2 flex-shrink-0">
        <ChevronLeft size={15} className="text-white"/>
        <span className="text-white font-extrabold text-[14px]">My Bookings</span>
      </div>
      <div className="flex-1 bg-slate-50 overflow-y-auto">
        <div className="bg-white divide-y divide-slate-100">
          {upcoming.map((b,i)=>(
            <div key={i} className="flex items-center gap-2 px-3 py-2">
              <div className={`w-8 h-8 ${b.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <QrCode size={12} className="text-white"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-slate-800">{b.label}</p>
                <p className="text-[7px] text-slate-400">~ Modern Hair Designer ...</p>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <p className="text-[8px] font-medium text-slate-700">{b.time}</p>
                <ChevronRight size={9} className="text-slate-300"/>
              </div>
            </div>
          ))}
        </div>
        <div className="px-3 pt-3">
          <p className="text-[7px] font-extrabold text-slate-400 tracking-[0.15em] mb-2">BOOKING HISTORY</p>
          <div className="space-y-2">
            {history.map((h,i)=>(
              <div key={i} className="flex items-start gap-2 bg-white rounded-xl px-2.5 py-2 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X size={10} className="text-slate-400"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-slate-800">{h.name}</p>
                  <p className="text-[7px] text-slate-400 leading-snug">{h.detail}</p>
                </div>
                <span className="text-[6.5px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">CANCEL</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── SCREEN 4: Confirmed Ticket ───────────────────────────────────────
function TicketScreen() {
  return (
    <>
      <PhoneStatusBar purple />
      <div className="bg-purple-600 px-3 pt-1 pb-5 flex-shrink-0 relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ChevronLeft size={15} className="text-white"/>
            <span className="text-white font-extrabold text-[13px]">My Bookings</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 shadow shadow-green-400/60"/>
        </div>
        <div className="text-center">
          <span className="bg-white/20 text-white text-[6.5px] font-extrabold px-2.5 py-0.5 rounded-full tracking-widest">CONFIRMED TICKET</span>
          <h2 className="text-white font-extrabold text-[15px] mt-1.5 leading-tight">Modern Hair Designer</h2>
          <p className="text-purple-200 text-[7px] tracking-widest mt-0.5">THURSDAY, JUNE 25, 2026</p>
        </div>
        {/* Arch cutout */}
        <div className="absolute -bottom-3 left-0 right-0 h-6 bg-slate-50 rounded-t-[50%]"/>
      </div>
      <div className="flex-1 bg-slate-50 overflow-y-auto pt-2">
        {/* QR */}
        <div className="flex justify-center mb-2">
          <div className="w-28 h-28 bg-white rounded-2xl shadow-lg p-3">
            <QRCodeSVG/>
          </div>
        </div>
        <div className="px-4 text-center mb-1">
          <p className="text-[6.5px] font-extrabold text-slate-400 tracking-[0.18em]">ENTRY PASS CODE</p>
          <p className="text-[11px] font-extrabold text-slate-700 tracking-widest mt-0.5">8CAB8AF1C991</p>
        </div>
        <div className="px-4">
          <div className="h-px bg-slate-200 my-2"/>
          <div className="flex gap-3 mb-2">
            <div className="flex-1">
              <p className="text-[6.5px] font-extrabold text-slate-400 tracking-[0.15em] mb-1">DATE</p>
              <div className="flex items-center gap-1">
                <span className="text-[10px]">📅</span>
                <span className="text-[8px] font-bold text-slate-700">June 27, 2026</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[6.5px] font-extrabold text-slate-400 tracking-[0.15em] mb-1">TIME WINDOW</p>
              <div className="flex items-center gap-1">
                <span className="text-[10px]">⏳</span>
                <span className="text-[8px] font-bold text-slate-700">11:00 ~ 11:45</span>
              </div>
            </div>
          </div>
          <div className="h-px bg-slate-200 mb-2"/>
          <div className="space-y-1.5 mb-3">
            <div className="flex justify-between">
              <span className="text-[7.5px] text-slate-400 font-semibold">CUSTOMER NAME:</span>
              <span className="text-[7.5px] font-extrabold text-slate-800">kiran kshirsagar</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[7.5px] text-slate-400 font-semibold">SERVICE NAME:</span>
              <span className="text-[7.5px] font-extrabold text-slate-800">Hair Cutting</span>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 flex gap-2">
            <Info size={11} className="text-blue-500 flex-shrink-0 mt-0.5"/>
            <div>
              <p className="text-[8px] font-bold text-slate-800 mb-0.5">Instructions</p>
              <p className="text-[6.5px] text-slate-500 leading-relaxed">Please arrive 5-10 minutes before your slot. Show this QR code to the receptionist or at the automated entry kiosk.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── SCREEN 5: Location ───────────────────────────────────────────────
function LocationScreen() {
  return (
    <div className="flex flex-col h-full">
      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Map SVG */}
        <svg viewBox="0 0 240 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect width="240" height="320" fill="#eaeaf0"/>
          {/* Blocks / buildings */}
          <rect x="10"  y="60"  width="30" height="20" fill="#d8d8e4" rx="2"/>
          <rect x="50"  y="50"  width="20" height="35" fill="#d0d0dc" rx="2"/>
          <rect x="80"  y="70"  width="25" height="15" fill="#d8d8e4" rx="2"/>
          <rect x="150" y="55"  width="40" height="25" fill="#d0d0dc" rx="2"/>
          <rect x="200" y="65"  width="30" height="20" fill="#d8d8e4" rx="2"/>
          <rect x="10"  y="150" width="45" height="30" fill="#d0d0dc" rx="2"/>
          <rect x="65"  y="140" width="30" height="40" fill="#d8d8e4" rx="2"/>
          <rect x="160" y="145" width="50" height="35" fill="#d0d0dc" rx="2"/>
          <rect x="10"  y="230" width="35" height="25" fill="#d8d8e4" rx="2"/>
          <rect x="55"  y="220" width="40" height="35" fill="#d0d0dc" rx="2"/>
          <rect x="150" y="225" width="45" height="30" fill="#d8d8e4" rx="2"/>
          <rect x="205" y="235" width="30" height="20" fill="#d0d0dc" rx="2"/>
          {/* Main roads */}
          <rect x="0"  y="100" width="240" height="12" fill="white"/>
          <rect x="0"  y="195" width="240" height="10" fill="white"/>
          <rect x="108" y="0"  width="12"  height="320" fill="white"/>
          <rect x="35"  y="0"  width="8"   height="320" fill="white"/>
          <rect x="195" y="0"  width="8"   height="320" fill="white"/>
          {/* Diagonal road */}
          <line x1="0" y1="80" x2="240" y2="180" stroke="white" strokeWidth="7"/>
          {/* Water strip */}
          <path d="M48 0 Q52 60 46 120 Q40 180 50 240 Q58 300 52 320" stroke="#b8d4e8" strokeWidth="14" fill="none"/>
          {/* Road labels */}
          <text x="115" y="110" fontSize="5.5" fill="#aaa" fontFamily="sans-serif">Kalina Kurla Road</text>
          <text x="20"  y="110" fontSize="5"   fill="#aaa" fontFamily="sans-serif">Mithi River</text>
          <text x="130" y="190" fontSize="5.5" fill="#aaa" fontFamily="sans-serif">Flyover</text>
          <text x="135" y="165" fontSize="6"   fill="#999" fontFamily="sans-serif" fontWeight="500">GANDHI MAIDAN</text>
        </svg>
        {/* Search bar overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center gap-2 z-10">
          <button className="w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center">
            <ChevronLeft size={13} className="text-slate-700"/>
          </button>
          <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-md">
            <Search size={10} className="text-purple-600"/>
            <span className="text-[8px] text-slate-400">Search your location...</span>
          </div>
        </div>
        {/* Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10">
          <MapPin size={22} className="text-purple-600 drop-shadow-lg" fill="#9333ea"/>
        </div>
        {/* Coordinates */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/75 text-white text-[7.5px] px-3 py-1 rounded-full font-mono tracking-wide backdrop-blur-sm z-10">
          19.0760 , 72.8777
        </div>
      </div>
      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl px-4 pt-2.5 pb-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex-shrink-0">
        <div className="w-8 h-1 bg-slate-300 rounded-full mx-auto mb-3"/>
        <div className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-xl p-2.5 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Navigation size={12} className="text-white" fill="white"/>
            </div>
            <div>
              <p className="text-[9.5px] font-extrabold text-purple-700">Use Current Location</p>
              <p className="text-[7px] text-purple-400">Using device GPS</p>
            </div>
          </div>
          <ChevronRight size={13} className="text-purple-400"/>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex-1 h-px bg-slate-200"/>
          <span className="text-[6.5px] text-slate-400 whitespace-nowrap">or pin on map</span>
          <div className="flex-1 h-px bg-slate-200"/>
        </div>
        <p className="text-[6.5px] text-slate-400 text-center mb-2">Scroll the map and drop the pin on your location</p>
        <button className="w-full flex items-center justify-center gap-1.5 bg-slate-200 text-slate-400 rounded-xl py-2">
          <MapPin size={9}/>
          <span className="text-[8px] font-semibold">Confirm Location</span>
        </button>
      </div>
    </div>
  );
}

// ── Phone Frame ──────────────────────────────────────────────────────
function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* Outer shell */}
      <div className="relative bg-slate-800 rounded-[2.8rem] p-[10px] shadow-[0_40px_80px_-10px_rgba(0,0,0,0.6)] border border-slate-700">
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-20 w-[3px] h-7 bg-slate-600 rounded-l-full"/>
        <div className="absolute -left-[3px] top-32 w-[3px] h-10 bg-slate-600 rounded-l-full"/>
        <div className="absolute -left-[3px] top-[176px] w-[3px] h-10 bg-slate-600 rounded-l-full"/>
        <div className="absolute -right-[3px] top-28 w-[3px] h-14 bg-slate-600 rounded-r-full"/>
        {/* Inner bezel */}
        <div className="bg-slate-900 rounded-[2.4rem] p-[3px]">
          {/* Screen */}
          <div className="relative w-[240px] h-[490px] bg-white rounded-[2.1rem] overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center">
              <div className="w-10 h-[3px] bg-slate-700 rounded-full"/>
            </div>
            <div className="pt-5 flex flex-col h-full overflow-hidden">
              {children}
            </div>
            {/* Home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-slate-300 rounded-full"/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Screen Registry ──────────────────────────────────────────────────
const SCREENS = [
  {
    id: 'home',     label: 'Home Dashboard',    desc: 'Book slots & track bookings',        icon: Home,         component: HomeScreen,
  },
  {
    id: 'search',   label: 'Provider Search',   desc: 'Find nearby service providers',      icon: Search,       component: SearchScreen,
  },
  {
    id: 'bookings', label: 'My Bookings',       desc: 'Manage appointments & history',      icon: CalendarDays, component: BookingsScreen,
  },
  {
    id: 'ticket',   label: 'Entry Ticket',      desc: 'QR pass code for seamless entry',    icon: Ticket,       component: TicketScreen,
  },
  {
    id: 'location', label: 'Location Picker',   desc: 'GPS-powered location selection',     icon: MapPin,       component: LocationScreen,
  },
];

// ── Main Section ─────────────────────────────────────────────────────
export function AppPreview() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  function goTo(next: number) {
    setDir(next > active ? 1 : -1);
    setActive(next);
  }
  function prev() { goTo((active - 1 + SCREENS.length) % SCREENS.length); }
  function next() { goTo((active + 1) % SCREENS.length); }

  const { component: ActiveScreen } = SCREENS[active];

  return (
    <section id="app-preview" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none"/>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-500/5 blur-3xl rounded-full pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-600/20 text-primary-400 text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            <Smartphone size={13}/> Mobile App
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4 tracking-tight">
            Powerful App in Your Hands
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Book appointments, track queues in real-time, and scan QR codes — from a single, beautiful interface.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">

          {/* ── Phone Mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex items-center gap-5"
          >
            {/* Prev Arrow */}
            <button
              id="app-preview-prev-btn"
              onClick={prev}
              aria-label="Previous screen"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600/40 border border-white/10 hover:border-primary-500/50 flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <ChevronLeft size={18}/>
            </button>

            <PhoneFrame>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={active}
                  custom={dir}
                  initial={{ x: dir * 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: dir * -60, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="flex flex-col h-full overflow-hidden"
                >
                  <ActiveScreen/>
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>

            {/* Next Arrow */}
            <button
              id="app-preview-next-btn"
              onClick={next}
              aria-label="Next screen"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600/40 border border-white/10 hover:border-primary-500/50 flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <ChevronRight size={18}/>
            </button>
          </motion.div>

          {/* ── Screen Selector ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-2.5 w-full max-w-xs"
          >
            {SCREENS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  id={`app-screen-tab-${s.id}`}
                  onClick={() => goTo(i)}
                  className={`text-left flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-200 border ${
                    isActive
                      ? 'bg-primary-600 border-primary-500 shadow-lg shadow-primary-600/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? 'bg-white/20' : 'bg-white/10'}`}>
                    <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'}/>
                  </div>
                  <div>
                    <p className={`font-bold text-sm leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>{s.label}</p>
                    <p className={`text-xs mt-0.5 ${isActive ? 'text-primary-200' : 'text-slate-500'}`}>{s.desc}</p>
                  </div>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60"/>}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {SCREENS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to screen ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-primary-500' : 'w-2 h-2 bg-white/25 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
