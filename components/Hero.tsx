
import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft, Shield, Map, Utensils, Activity, Users, Building2 } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

const motion = m as any;

const slides = [
  {
    id: 0,
    tag: "Education ERP",
    title: "eSmart School",
    highlight: "Safe, Secure & Easy",
    description: "Revolutionizing school operations with child security as the prime focus. A complete ERP for modern educational institutes.",
    color: "from-brand-500 via-brand-600 to-purple-600",
    icon: <Shield className="w-5 h-5" />,
    btnText: "Explore Schools",
    href: "/products/esmart-school",
    blobColor: "rgba(14,165,233,0.4)" // Sky
  },
  {
    id: 1,
    tag: "Fleet Management",
    title: "eSmart Truck",
    highlight: "Real-time Tracking",
    description: "Advanced vehicle tracking offering live monitoring, fuel theft prevention, and route deviation alerts for total fleet control.",
    color: "from-blue-500 via-indigo-600 to-cyan-500",
    icon: <Map className="w-5 h-5" />,
    btnText: "View Solutions",
    href: "/products/esmart-track",
    blobColor: "rgba(59,130,246,0.4)" // Blue
  },
  {
    id: 2,
    tag: "Hospitality",
    title: "eSmart Restaurant",
    highlight: "Smart Dining",
    description: "Digitized ordering, kitchen management, and profitability analytics to enhance the dining experience for modern customers.",
    color: "from-rose-500 via-pink-600 to-orange-500",
    icon: <Utensils className="w-5 h-5" />,
    btnText: "See Features",
    href: "/products/esmart-restaurant",
    blobColor: "rgba(244,63,94,0.4)" // Rose
  },
  {
    id: 3,
    tag: "Healthcare",
    title: "eSmart Health",
    highlight: "Patient Care First",
    description: "Integrated hospital management solutions streamlining patient records, appointments, and medical services efficiently.",
    color: "from-emerald-500 via-teal-600 to-cyan-500",
    icon: <Activity className="w-5 h-5" />,
    btnText: "Learn More",
    href: "/products/esmart-health",
    blobColor: "rgba(16,185,129,0.4)" // Emerald
  },
  {
    id: 4,
    tag: "Workforce",
    title: "eSmart Team",
    highlight: "Boost Productivity",
    description: "Comprehensive workforce management tools for attendance tracking, task delegation, and team collaboration.",
    color: "from-violet-500 via-purple-600 to-fuchsia-500",
    icon: <Users className="w-5 h-5" />,
    btnText: "Get Started",
    href: "/products/esmart-team",
    blobColor: "rgba(139,92,246,0.4)" // Violet
  },
  {
    id: 5,
    tag: "Housing",
    title: "eSmart Society",
    highlight: "Secure Living",
    description: "Complete management system for housing societies ensuring security, visitor tracking, and smooth administration.",
    color: "from-indigo-500 via-blue-600 to-sky-500",
    icon: <Building2 className="w-5 h-5" />,
    btnText: "View Details",
    href: "/products/esmart-society",
    blobColor: "rgba(99,102,241,0.4)" // Indigo
  }
];

// Inline SVGs for Store Buttons
const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
  </svg>
);

const PlayStoreIcon = ({ className }: { className?: string }) => (
   <svg className={className} viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
   </svg>
);

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider with reset on interaction
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Reduced to 4 seconds
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeContent = slides[currentSlide];
  const nextColor = slides[(currentSlide + 1) % slides.length]?.blobColor || slides[0].blobColor;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-white dark:bg-dark-bg transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Grid Pattern */}
         <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" className="text-slate-900 dark:text-white" />
         </svg>

         {/* Gradient Blobs */}
        <motion.div 
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-40 dark:opacity-20" 
            animate={{ 
                background: `radial-gradient(circle, ${activeContent.blobColor} 0%, rgba(0,0,0,0) 70%)`
            }}
            transition={{ duration: 1.5 }}
        />
        <motion.div 
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-40 dark:opacity-20"
            animate={{ 
                background: `radial-gradient(circle, ${nextColor} 0%, rgba(0,0,0,0) 70%)`
            }}
            transition={{ duration: 1.5 }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Text Content Slider */}
          <div className="flex-1 text-center lg:text-left z-20 w-full min-h-[450px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeContent.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }} // Faster transition
                    className="w-full"
                >
                    <motion.div 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm mb-8 mx-auto lg:mx-0"
                    >
                        <span className="p-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white">
                            {activeContent.icon}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                            {activeContent.tag}
                        </span>
                    </motion.div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                    {activeContent.title} <br className="hidden lg:block"/>
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeContent.color}`}>
                        {activeContent.highlight}
                    </span>
                    </h1>

                    <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                        {activeContent.description}
                    </p>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex flex-col items-center lg:items-start gap-8">
                {/* Main Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 w-full">
                  <Link to={activeContent.href} className="group w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-lg shadow-brand-600/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 overflow-hidden relative">
                    <span className="relative z-10">{activeContent.btnText}</span>
                    <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                  
                  {/* Navigation Pills */}
                  <div className="flex items-center gap-4 bg-white/50 dark:bg-slate-800/50 p-2 rounded-full backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                      <button 
                        onClick={prevSlide}
                        className="p-3 rounded-full hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all active:scale-95"
                        aria-label="Previous Slide"
                      >
                          <ChevronLeft size={20} />
                      </button>
                      <div className="flex gap-2 px-2">
                          {slides.map((_, i) => (
                              <button 
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-brand-600 w-8' : 'bg-slate-300 dark:bg-slate-600 w-2 hover:bg-brand-400'}`}
                                aria-label={`Go to slide ${i + 1}`}
                              />
                          ))}
                      </div>
                      <button 
                        onClick={nextSlide}
                        className="p-3 rounded-full hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all active:scale-95"
                        aria-label="Next Slide"
                      >
                          <ChevronRight size={20} />
                      </button>
                  </div>
                </div>

                {/* App Store Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <a href="#" className="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg border border-transparent dark:border-slate-200">
                        <AppleIcon className="w-6 h-6 fill-current mb-1" />
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[9px] font-medium opacity-80 mb-0.5">Download on the</span>
                            <span className="text-sm font-bold tracking-tight">App Store</span>
                        </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg border border-transparent dark:border-slate-200">
                        <PlayStoreIcon className="w-5 h-5 fill-current mb-0.5" />
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[9px] font-medium opacity-80 mb-0.5">GET IT ON</span>
                            <span className="text-sm font-bold tracking-tight">Google Play</span>
                        </div>
                    </a>
                </div>
            </div>
          </div>

          {/* 3D Phone Slider Visual */}
          <motion.div 
            className="flex-1 flex justify-center items-center relative w-full lg:h-[640px] perspective-1000 z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
             <div className="relative">
                {/* Glow behind phone */}
                <motion.div 
                    className="absolute inset-0 blur-[100px] rounded-full opacity-60"
                    animate={{ 
                        background: activeContent.blobColor.replace('0.4', '0.6')
                    }}
                    transition={{ duration: 1 }}
                />
                
                {/* Render Phone Mockup */}
                <PhoneMockup activeSlide={currentSlide} />

                {/* Floating Status Badge */}
                <motion.div 
                    className="absolute -right-12 top-24 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-30 hidden lg:block"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={`status-${currentSlide}`} // Re-animate on slide change
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center text-brand-600">
                            {activeContent.icon}
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">System Status</p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <p className="font-bold text-slate-900 dark:text-white">Online</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
