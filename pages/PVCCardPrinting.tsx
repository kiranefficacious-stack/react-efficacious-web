import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Printer, ShieldCheck, UserCheck, 
  Layers, Lock, Wifi, Briefcase, Smile, Tag,
  CheckCircle2, ArrowRight, Zap, ChevronLeft, ChevronRight, Fingerprint
} from 'lucide-react';
import Contact from '../components/Contact';

// --- CUSTOM ANIMATION COMPONENTS ---

const HeroVisual = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000">
      <div className="relative w-[300px] h-[480px] lg:w-[350px] lg:h-[550px] preserve-3d">
          
          {/* Floating ID Card */}
          <motion.div
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 lg:w-80 lg:h-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20"
             initial={{ rotateX: 20, rotateY: -20, y: 0 }}
             animate={{ 
                 rotateX: [20, -10, 20], 
                 rotateY: [-20, 20, -20],
                 y: [0, -20, 0]
             }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
              {/* Card Design Layer */}
              <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800">
                  <div className="h-full w-1/3 bg-cyan-600 absolute right-0 top-0" />
                  <div className="absolute top-4 left-4 flex gap-4 items-center">
                      <div className="w-12 h-12 bg-slate-300 dark:bg-slate-600 rounded-lg flex items-center justify-center overflow-hidden">
                          <UserCheck size={24} className="text-slate-500" />
                      </div>
                      <div>
                          <div className="h-2 w-24 bg-slate-300 dark:bg-slate-600 rounded mb-1.5" />
                          <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                      </div>
                  </div>
                  
                  {/* Hologram Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0"
                    animate={{ opacity: [0, 0.5, 0], x: [-200, 200] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                  />
                  
                  {/* Chip */}
                  <div className="absolute bottom-4 left-4 w-10 h-8 bg-yellow-500/80 rounded-md border border-yellow-600 grid grid-cols-2 gap-[1px] p-[2px]">
                      {[...Array(4)].map((_, i) => (
                          <div key={i} className="bg-yellow-400/50 rounded-[1px]" />
                      ))}
                  </div>

                  <div className="absolute bottom-4 right-4 text-white font-bold text-xs">
                      EFFICACIOUS
                  </div>
              </div>
          </motion.div>

          {/* Floating Security Badge */}
          <motion.div
             className="absolute top-20 right-0 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2 z-30"
             animate={{ y: [-10, 10, -10] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
              <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-lg text-green-600">
                  <ShieldCheck size={20} />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Secure NFC</span>
          </motion.div>

          {/* Floating Tech Badge */}
          <motion.div
             className="absolute bottom-40 left-0 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2 z-30"
             animate={{ y: [10, -10, 10] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
              <div className="bg-cyan-100 dark:bg-cyan-900/30 p-1.5 rounded-lg text-cyan-600">
                  <Wifi size={20} />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">RFID Ready</span>
          </motion.div>

          {/* Background Elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div className="w-[400px] h-[400px] border border-dashed border-cyan-500/20 rounded-full animate-spin-slow" />
              <div className="w-[300px] h-[300px] border border-cyan-500/10 rounded-full absolute" />
          </div>
      </div>
    </div>
  );
};

const DesignVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="relative w-72 h-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex">
                {/* Palette Sidebar */}
                <div className="w-12 border-r border-slate-100 dark:border-slate-700 flex flex-col items-center py-4 gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500" />
                    <div className="w-6 h-6 rounded-full bg-slate-300" />
                    <div className="w-6 h-6 rounded-full bg-orange-400" />
                </div>
                
                {/* Canvas Area */}
                <div className="flex-1 p-4 relative">
                    <motion.div 
                        className="w-full h-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <div className="text-xs text-slate-400">Drag Elements Here</div>
                    </motion.div>
                    
                    {/* Floating Element being placed */}
                    <motion.div 
                        className="absolute top-1/2 left-1/2 w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg shadow-lg flex items-center justify-center"
                        initial={{ x: 50, y: -50, scale: 0 }}
                        animate={{ x: -20, y: -10, scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                        <UserCheck size={24} className="text-slate-400" />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

const PrintingVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative perspective-1000">
             <div className="relative w-80 h-40 bg-slate-800 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
                 {/* Card Moving Through */}
                 <motion.div 
                    className="absolute w-40 h-24 bg-white rounded-lg shadow-md z-10 flex items-center justify-center"
                    initial={{ x: -200 }}
                    animate={{ x: 200 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 >
                     {/* Partial Print Effect */}
                     <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-transparent w-1/2 opacity-50" />
                     <div className="text-[8px] font-bold text-slate-300">PRINTING...</div>
                 </motion.div>

                 {/* Print Head */}
                 <div className="absolute top-0 w-16 h-full bg-slate-700 z-20 shadow-xl border-x border-slate-600 flex flex-col items-center py-2">
                     <div className="w-12 h-1 bg-green-500 shadow-[0_0_10px_#22c55e] mb-1" />
                     <div className="w-full flex-1 flex justify-center">
                         <div className="w-1 h-full bg-cyan-400/50 blur-sm" />
                         <div className="w-1 h-full bg-magenta-400/50 blur-sm mx-1" />
                         <div className="w-1 h-full bg-yellow-400/50 blur-sm" />
                     </div>
                 </div>
             </div>
        </div>
    )
}

const EncodingVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="w-48 h-32 bg-white dark:bg-slate-800 rounded-xl border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)] flex items-center justify-center relative">
                {/* Chip */}
                <div className="w-12 h-10 bg-yellow-500/20 border border-yellow-500 rounded grid grid-cols-2 gap-1 p-1">
                    <div className="bg-yellow-500/50 rounded-[1px]" />
                    <div className="bg-yellow-500/50 rounded-[1px]" />
                    <div className="bg-yellow-500/50 rounded-[1px]" />
                    <div className="bg-yellow-500/50 rounded-[1px]" />
                </div>

                {/* Waves */}
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 border-2 border-cyan-500 rounded-xl"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                    />
                ))}
            </div>
        </div>
    )
}

const DeliveryVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
             <div className="grid grid-cols-2 gap-2 transform rotate-12">
                 {[1, 2, 3, 4].map(i => (
                     <motion.div
                        key={i}
                        className="w-24 h-16 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.2, type: "spring" }}
                     >
                         <UserCheck size={16} className="text-cyan-600" />
                     </motion.div>
                 ))}
             </div>
             
             <motion.div
                className="absolute bottom-10 right-10 bg-green-500 text-white p-2 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
             >
                 <CheckCircle2 size={24} />
             </motion.div>
        </div>
    )
}

// --- DATA ---

const processSteps = [
  {
    id: 1,
    title: "Design & Data Integration",
    tagline: "Layout Creation",
    description: "We start by creating a professional layout tailored to your brand. Employee data is securely integrated, merged with the design templates, and prepared for batch processing.",
    details: ["Custom Templates", "Data Merging", "Photo Optimization", "Proofing"],
    icon: <Layers className="w-6 h-6" />,
    color: "text-blue-500",
    bg: "bg-blue-500",
    component: DesignVisual
  },
  {
    id: 2,
    title: "Thermal Transfer Printing",
    tagline: "High Definition",
    description: "Using advanced thermal transfer technology, we print edge-to-edge high-resolution images. This ensures vibrant colors and sharp text that lasts.",
    details: ["300 DPI Resolution", "Edge-to-Edge", "Color Matching", "UV Protection"],
    icon: <Printer className="w-6 h-6" />,
    color: "text-cyan-500",
    bg: "bg-cyan-500",
    component: PrintingVisual
  },
  {
    id: 3,
    title: "Smart Encoding",
    tagline: "Chip Programming",
    description: "For smart cards, we encode RFID or NFC chips during the printing process. This enables access control, attendance tracking, and cashless payments.",
    details: ["RFID / NFC", "Magstripe", "Access Control", "Data Encryption"],
    icon: <Wifi className="w-6 h-6" />,
    color: "text-yellow-500",
    bg: "bg-yellow-500",
    component: EncodingVisual
  },
  {
    id: 4,
    title: "Quality Check & Delivery",
    tagline: "Final Inspection",
    description: "Every card undergoes a manual quality check for print errors and chip functionality. Approved cards are packaged securely and dispatched for delivery.",
    details: ["Visual Inspection", "Chip Testing", "Secure Packaging", "Fast Dispatch"],
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: "text-green-500",
    bg: "bg-green-500",
    component: DeliveryVisual
  }
];

const cardTypes = [
    { 
        title: "Employee ID Cards", 
        desc: "Professional identification for corporate environments.", 
        icon: <Briefcase size={32} className="text-cyan-500" /> 
    },
    { 
        title: "Smart / RFID Cards", 
        desc: "Contactless cards for access control and attendance.", 
        icon: <Wifi size={32} className="text-teal-500" /> 
    },
    { 
        title: "Membership Cards", 
        desc: "Durable cards for clubs, gyms, and loyalty programs.", 
        icon: <UserCheck size={32} className="text-blue-500" /> 
    },
    { 
        title: "Event Badges", 
        desc: "Oversized or standard badges for conferences and expos.", 
        icon: <Tag size={32} className="text-purple-500" /> 
    },
    { 
        title: "Visitor Passes", 
        desc: "Temporary, reusable cards for guest management.", 
        icon: <Smile size={32} className="text-orange-500" /> 
    },
    { 
        title: "Gift Cards", 
        desc: "High-quality printed cards with magnetic stripes or barcodes.", 
        icon: <Zap size={32} className="text-pink-500" /> 
    },
];

const features = [
    { icon: <Fingerprint className="w-6 h-6" />, title: "High Security", desc: "Holograms & UV printing options." },
    { icon: <Layers className="w-6 h-6" />, title: "Durability", desc: "Long-lasting PVC material." },
    { icon: <Zap className="w-6 h-6" />, title: "Fast Turnaround", desc: "Quick bulk printing services." },
    { icon: <Lock className="w-6 h-6" />, title: "Data Privacy", desc: "Secure handling of personal data." },
];

const PVCCardPrinting: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextStep = () => setActiveStep((prev) => (prev + 1) % processSteps.length);
  const prevStep = () => setActiveStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);

  const ActiveComponent = processSteps[activeStep].component;

  return (
    <div className="w-full overflow-hidden bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
         <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
             {/* Micro-text Pattern */}
             <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="micro-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                         <circle cx="1" cy="1" r="1" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#micro-grid)" />
             </svg>
         </div>

         <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <CreditCard size={14} /> Identity Solutions
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                        Secure Identities, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400">Professional Finish</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-xl">
                        High-quality PVC card printing services for corporate, education, and events. From simple IDs to smart access cards.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2">
                            Get a Quote <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            View Samples
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <HeroVisual />
                </motion.div>
            </div>
         </div>
      </section>

      {/* --- CARD TYPES GRID --- */}
      <section className="py-24 bg-white dark:bg-slate-900 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Identity Solutions for Everyone</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        We cater to diverse industries with specialized card printing needs.
                    </p>
                </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cardTypes.map((card, i) => (
                    <motion.div 
                        key={i}
                        className="group bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            {card.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{card.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {card.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/50 relative border-t border-slate-100 dark:border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Production Process</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        State-of-the-art thermal printing ensures durability and security.
                    </p>
                </motion.div>
            </div>

            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                    >
                        {/* Text Content */}
                        <div className="order-2 lg:order-1 relative">
                            <div className="relative z-10">
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${processSteps[activeStep].bg} bg-opacity-10 border border-${processSteps[activeStep].color.split('-')[1]}-200 dark:border-${processSteps[activeStep].color.split('-')[1]}-800 text-xs font-bold uppercase tracking-widest ${processSteps[activeStep].color.replace('text', 'text')} mb-6`}
                                >
                                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                    Step 0{activeStep + 1}
                                </motion.div>
                                
                                <motion.h3 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight"
                                >
                                    {processSteps[activeStep].title}
                                </motion.h3>
                                
                                <motion.p 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
                                >
                                    {processSteps[activeStep].description}
                                </motion.p>

                                <motion.ul 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="grid grid-cols-2 gap-4 mb-8"
                                >
                                    {processSteps[activeStep].details.map((detail, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                                            <CheckCircle2 size={18} className={processSteps[activeStep].color} />
                                            {detail}
                                        </li>
                                    ))}
                                </motion.ul>
                            </div>
                        </div>

                        {/* Visual Side */}
                        <div className="order-1 lg:order-2 h-[400px] lg:h-[500px] w-full relative flex items-center justify-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                                <ActiveComponent />
                        </div>
                    </motion.div>
                </AnimatePresence>

                 {/* Controls */}
                <div className="flex justify-center mt-12 gap-3 relative z-30">
                    <button onClick={prevStep} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><ChevronLeft size={20} /></button>
                    {processSteps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveStep(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === activeStep 
                                ? `${processSteps[activeStep].bg} w-10`
                                : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                            }`}
                        />
                    ))}
                    <button onClick={nextStep} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><ChevronRight size={20} /></button>
                </div>
            </div>
         </div>
      </section>

      {/* --- FEATURES STRIP --- */}
      <section className="py-16 bg-cyan-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-8">
                  {features.map((f, i) => (
                      <div key={i} className="flex flex-col items-center text-center text-white">
                          <div className="mb-4 p-3 bg-white/20 rounded-full backdrop-blur-sm">
                              {f.icon}
                          </div>
                          <h4 className="font-bold text-lg mb-1">{f.title}</h4>
                          <p className="text-cyan-100 text-sm">{f.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-white dark:bg-dark-bg transition-colors duration-300" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-cyan-600 to-teal-700 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-cyan-500/30"
            >
                {/* Decor */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 relative z-10 tracking-tight">
                    Order Your Cards Today
                </h2>
                <p className="text-cyan-100 text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light">
                    Fast, reliable, and secure printing services delivered to your doorstep.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                     <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-white text-cyan-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-50 transition-colors shadow-lg active:scale-95">
                        Bulk Order Inquiry
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                        Download Brochure
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default PVCCardPrinting;