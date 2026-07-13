import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Users, ChevronLeft, ChevronRight, PieChart, Bell } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    badge: "Safe to School... Safe to Home",
    icon: ShieldCheck,
    title: "Pioneering Education",
    highlight: "Management",
    suffix: "& Security",
    desc: "Completely revolutionize your school with an integrated platform for Admins, Teachers, Students, and Parents. Featuring real-time RFID tracking & automated administration.",
    features: ["RFID Attendance", "Parent Tracking App", "Automated Fee Management"],
    mockupType: "parent"
  },
  {
    id: 2,
    badge: "For Administrators & Staff",
    icon: PieChart,
    title: "Empower Your",
    highlight: "Administrators",
    suffix: "with Insights",
    desc: "Take full control of school operations with our comprehensive dashboards. Monitor attendances, manage transport, and oversee financials from a centralized hub, securely.",
    features: ["Real-time Analytics", "Transport Management", "Centralized Control"],
    mockupType: "admin"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-200/50 dark:bg-primary-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 animate-blob" />
        <div className="absolute top-48 -left-24 w-72 h-72 bg-blue-200/50 dark:bg-blue-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000" />
      </div>

      {/* Floating Slider Navigation */}
      <button 
        onClick={prevSlide}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 xl:left-8 z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 items-center justify-center text-slate-400 hover:bg-white hover:text-primary-600 hover:border-primary-200 transition-all hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={nextSlide}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 xl:right-8 z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 items-center justify-center text-slate-400 hover:bg-white hover:text-primary-600 hover:border-primary-200 transition-all hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[600px]">
          <div className="max-w-2xl relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-medium mb-6">
                  <slide.icon className="h-4 w-4" />
                  <span>{slide.badge}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6 transition-colors duration-300">
                  {slide.title} <span className="text-primary-600 dark:text-primary-400 font-bold">{slide.highlight}</span> {slide.suffix}
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed h-[120px] md:h-auto transition-colors duration-300">
                  {slide.desc}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a href="https://apps.apple.com/in/app/e-smart-school/id6448924052" target="_blank" rel="noopener noreferrer" className="bg-slate-900 border border-slate-900 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                    <img src="/esmart-school/apple-icon.svg" className="h-6 w-6 invert" alt="Apple" />
                    <div className="text-left flex flex-col justify-center">
                       <span className="text-[10px] leading-tight opacity-80 font-medium">Download on the</span>
                       <span className="text-sm leading-tight">App Store</span>
                    </div>
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=net.esmarts.app.esmart&hl=en_IN" target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-200 text-slate-900 px-6 py-3.5 rounded-full font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm">
                    <img src="/esmart-school/google-play-icon.svg" className="h-5 w-5" alt="Google Play" />
                    <div className="text-left flex flex-col justify-center">
                       <span className="text-[10px] leading-tight text-slate-500 font-medium">GET IT ON</span>
                       <span className="text-sm leading-tight">Google Play</span>
                    </div>
                  </a>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {slide.features.map((text, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-primary-500" />
                      {text}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          <div className="relative lg:ml-auto flex justify-center h-[600px] items-center w-full">
            <AnimatePresence mode="wait">
              {slide.mockupType === "parent" ? (
                <motion.div 
                   key="mockup-parent"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.5 }}
                   className="absolute w-full flex justify-center"
                >
                  <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="relative mx-auto border-gray-900 bg-gray-900 border-[8px] rounded-[2.5rem] h-[550px] w-[270px] shadow-2xl flex-shrink-0 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
                  >
                    {/* Phone Hardware Details */}
                    <div className="w-[100px] h-[15px] bg-gray-900 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
                    <div className="h-[32px] w-[3px] bg-gray-900 absolute -start-[11px] top-[100px] rounded-s-lg"></div>
                    <div className="h-[32px] w-[3px] bg-gray-900 absolute -start-[11px] top-[140px] rounded-s-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-900 absolute -end-[11px] top-[120px] rounded-e-lg"></div>
                    
                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                      <img
                        src="/esmart-school/screenshots/app-home.jpeg"
                        alt="eSMARTs App – Home Dashboard"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Floating badge */}
                  <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-12 bg-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 z-30 transform-gpu"
                  >
                    <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="pr-2">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">SMS Alert</p>
                      <p className="text-sm font-bold text-slate-900 leading-none">Child is Safe</p>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                   key="mockup-admin"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.5 }}
                   className="absolute w-full flex justify-center"
                >
                  <motion.div 
                     animate={{ y: [0, 10, 0] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="relative mx-auto border-gray-900 bg-gray-900 border-[8px] rounded-[2.5rem] h-[550px] w-[270px] shadow-2xl flex-shrink-0 transform rotate-[2deg] hover:rotate-0 transition-transform duration-500"
                  >
                     {/* Phone Hardware Details */}
                    <div className="w-[100px] h-[15px] bg-gray-900 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
                    <div className="h-[32px] w-[3px] bg-gray-900 absolute -start-[11px] top-[100px] rounded-s-lg"></div>
                    <div className="h-[32px] w-[3px] bg-gray-900 absolute -start-[11px] top-[140px] rounded-s-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-900 absolute -end-[11px] top-[120px] rounded-e-lg"></div>
                    
                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                      <img
                        src="/esmart-school/screenshots/app-schedule.jpeg"
                        alt="eSMARTs App – My Schedule"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Floating badge */}
                  <motion.div 
                     animate={{ y: [0, 10, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-12 bg-slate-900 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800 z-30 transform-gpu"
                  >
                    <div className="bg-primary-500/20 p-2.5 rounded-xl text-primary-400">
                      <PieChart className="h-5 w-5" />
                    </div>
                    <div className="pr-2">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Live Stats</p>
                      <p className="text-sm font-bold text-white leading-none">Updating...</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Slider Dots */}
        <div className="flex items-center justify-center w-full relative z-30 mt-12 lg:mt-16">
           <div className="flex gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-200 shadow-md">
             {slides.map((s, i) => (
               <button 
                 key={s.id} 
                 onClick={() => setCurrentSlide(i)}
                 className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === i ? 'w-8 bg-primary-600' : 'bg-slate-300 hover:bg-primary-300'}`}
                 aria-label={`Go to slide ${i + 1}`}
               />
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}

