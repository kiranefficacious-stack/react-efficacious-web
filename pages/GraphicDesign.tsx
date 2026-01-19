import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, PenTool, Layers, Image, Type, 
  Lightbulb, Search, MousePointer2, Share2, 
  CheckCircle2, ArrowRight, Printer, Brush,
  Monitor, Box, Zap, ChevronLeft, ChevronRight, Pen
} from 'lucide-react';
import Contact from '../components/Contact';

// --- CUSTOM ANIMATION COMPONENTS ---

const HeroVisual = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000">
       {/* Background Glow */}
       <motion.div 
         animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
         transition={{ duration: 6, repeat: Infinity }}
         className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-[100px]"
       />

       {/* Floating Canvas Elements */}
       <div className="relative w-[320px] h-[400px] lg:w-[400px] lg:h-[500px]">
          {/* Main Artboard */}
          <motion.div
            initial={{ rotateY: 15, rotateX: 5 }}
            animate={{ rotateY: -15, rotateX: -5 }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute inset-0 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden z-10"
          >
              <div className="h-8 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 p-6 relative">
                  {/* Design Composition */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-80"
                  />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                    className="absolute top-1/3 left-1/3 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-80"
                  />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, type: "spring" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black text-slate-900 dark:text-white tracking-tighter z-10"
                  >
                      DESIGN
                  </motion.div>
              </div>
          </motion.div>

          {/* Floating Tool Palettes */}
          <motion.div
             initial={{ x: -50, y: 50, opacity: 0 }}
             animate={{ x: -80, y: 100, opacity: 1 }}
             transition={{ delay: 1 }}
             className="absolute left-0 bottom-1/4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-3 z-20"
          >
              {[PenTool, Type, Image, Layers].map((Icon, i) => (
                  <div key={i} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg cursor-pointer text-slate-600 dark:text-slate-300">
                      <Icon size={20} />
                  </div>
              ))}
          </motion.div>

          <motion.div
             initial={{ x: 50, y: -50, opacity: 0 }}
             animate={{ x: 60, y: 40, opacity: 1 }}
             transition={{ delay: 1.2 }}
             className="absolute right-0 top-1/4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-2 z-20 w-32"
          >
              <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Color</div>
              {['bg-pink-500', 'bg-purple-500', 'bg-blue-500', 'bg-emerald-500', 'bg-yellow-500', 'bg-slate-900'].map((bg, i) => (
                  <div key={i} className={`h-8 rounded-md ${bg} shadow-sm cursor-pointer hover:scale-110 transition-transform`} />
              ))}
          </motion.div>
       </div>
    </div>
  );
};

const ResearchVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative perspective-1000">
             <div className="relative w-80 h-80">
                 {/* Moodboard Grid */}
                 <div className="grid grid-cols-2 gap-4 rotate-6">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="h-32 bg-orange-100 dark:bg-orange-900/30 rounded-2xl p-4 flex items-center justify-center border border-dashed border-orange-300 dark:border-orange-700"
                     >
                         <Lightbulb className="text-orange-500" size={32} />
                     </motion.div>
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg transform translate-y-8"
                     >
                         <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600" />
                     </motion.div>
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="h-40 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl -mt-8 relative z-10 flex flex-col gap-2"
                     >
                         <div className="w-8 h-8 rounded-full bg-purple-500" />
                         <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded" />
                         <div className="h-2 w-2/3 bg-slate-100 dark:bg-slate-800 rounded" />
                     </motion.div>
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                        className="h-24 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg transform rotate-3"
                     >
                         <Search size={32} />
                     </motion.div>
                 </div>

                 {/* Connecting Lines */}
                 <svg className="absolute inset-0 pointer-events-none overflow-visible">
                     <motion.path 
                        d="M 50 50 Q 150 150 250 50" 
                        fill="none" 
                        stroke="#94a3b8" 
                        strokeWidth="2" 
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                     />
                 </svg>
             </div>
        </div>
    )
}

const ConceptVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
             <div className="relative w-80 h-64 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border-4 border-slate-200 dark:border-slate-700 p-8 overflow-hidden">
                 {/* Grid Background */}
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                 
                 {/* Sketching Animation */}
                 <svg className="w-full h-full overflow-visible">
                     <motion.path
                        d="M 50 150 C 50 50, 200 50, 200 150"
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                     />
                     <motion.rect
                        x="40" y="140" width="20" height="20"
                        fill="white" stroke="#ec4899" strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                     />
                     <motion.rect
                        x="190" y="140" width="20" height="20"
                        fill="white" stroke="#ec4899" strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5 }}
                     />
                     <motion.circle
                        cx="125" cy="58" r="6"
                        fill="#ec4899"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 }}
                     />
                 </svg>

                 {/* Floating Pencil */}
                 <motion.div
                    className="absolute z-20"
                    animate={{ 
                        x: [50, 125, 200, 50],
                        y: [150, 50, 150, 150],
                        rotate: [-10, 0, 10, -10]
                    }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                 >
                     <div className="text-slate-800 dark:text-slate-200 filter drop-shadow-lg -translate-x-1 -translate-y-full">
                         <Pen size={32} className="fill-current" />
                     </div>
                 </motion.div>
             </div>
        </div>
    )
}

const DesignStepVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative perspective-1000">
            {/* Layer Stack */}
            <div className="relative w-64 h-64 transform rotate-x-12">
                 {[1, 2, 3].map((i) => (
                     <motion.div
                        key={i}
                        className="absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center"
                        initial={{ z: 0, opacity: 0 }}
                        animate={{ 
                            z: i * 40, 
                            y: i * -20,
                            opacity: 1 
                        }}
                        transition={{ delay: i * 0.3 }}
                        style={{ transform: `translateZ(${i*40}px) translateY(${i*-20}px)` }}
                     >
                         {i === 1 && <div className="w-full h-full bg-slate-100 dark:bg-slate-700/50 rounded-2xl" />}
                         {i === 2 && <div className="w-32 h-32 bg-purple-500/20 rounded-full" />}
                         {i === 3 && (
                             <div className="text-center">
                                 <h3 className="text-2xl font-black text-slate-900 dark:text-white">Brand</h3>
                                 <p className="text-xs text-slate-500 uppercase tracking-widest">Identity</p>
                             </div>
                         )}
                     </motion.div>
                 ))}

                 {/* Cursor Interaction */}
                 <motion.div
                    className="absolute -right-10 bottom-10 z-50 text-slate-900 dark:text-white"
                    initial={{ x: 20, y: 20, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 2 }}
                 >
                     <MousePointer2 size={32} className="fill-current" />
                 </motion.div>
            </div>
        </div>
    )
}

const DeliveryVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="relative">
                {/* Folder/Box */}
                <motion.div
                    className="w-40 h-32 bg-blue-500 rounded-b-xl relative z-10 flex items-center justify-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                >
                    <div className="absolute -top-4 left-0 w-20 h-6 bg-blue-600 rounded-t-lg" />
                    <div className="text-white font-bold text-lg">Assets</div>
                </motion.div>
                
                {/* Lid */}
                <motion.div
                    className="absolute top-0 left-0 w-40 h-32 bg-blue-400 rounded-xl origin-bottom shadow-lg z-20"
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: -180, opacity: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />

                {/* Flying Files */}
                {[
                    { ext: 'AI', color: 'bg-orange-500', x: -60, y: -80, rotate: -15 },
                    { ext: 'PDF', color: 'bg-red-500', x: 0, y: -120, rotate: 0 },
                    { ext: 'SVG', color: 'bg-yellow-500', x: 60, y: -80, rotate: 15 },
                    { ext: 'PNG', color: 'bg-green-500', x: 80, y: -20, rotate: 30 },
                ].map((file, i) => (
                    <motion.div
                        key={i}
                        className={`absolute top-10 left-10 w-16 h-20 ${file.color} rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md border-2 border-white dark:border-slate-800 z-0`}
                        initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
                        animate={{ 
                            y: file.y, 
                            x: file.x, 
                            rotate: file.rotate,
                            opacity: 1 
                        }}
                        transition={{ delay: 1 + (i * 0.2), type: "spring" }}
                    >
                        {file.ext}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}


// --- DATA ---

const processSteps = [
  {
    id: 1,
    title: "Discovery & Research",
    tagline: "Understanding the Brand",
    description: "We begin by diving deep into your brand's core values, target audience, and competitors. Through moodboards and visual audits, we establish a direction that resonates.",
    details: ["Brand Audit", "Competitor Analysis", "Visual Strategy", "Moodboarding"],
    icon: <Search className="w-6 h-6" />,
    color: "text-orange-500",
    bg: "bg-orange-500",
    component: ResearchVisual
  },
  {
    id: 2,
    title: "Concept & Sketching",
    tagline: "Drafting Ideas",
    description: "Ideas take shape on paper first. We sketch multiple concepts, exploring metaphors and layouts to find the most compelling visual solution for your project.",
    details: ["Brainstorming", "Rough Sketches", "Wireframing", "Concept Selection"],
    icon: <PenTool className="w-6 h-6" />,
    color: "text-pink-500",
    bg: "bg-pink-500",
    component: ConceptVisual
  },
  {
    id: 3,
    title: "Design & Refinement",
    tagline: "Crafting the Visuals",
    description: "Selected concepts are digitized and refined. We meticulously adjust typography, color palettes, and spacing to create polished, professional assets.",
    details: ["Vectorization", "Typography Selection", "Color Theory", "Iterative Feedback"],
    icon: <Palette className="w-6 h-6" />,
    color: "text-purple-500",
    bg: "bg-purple-500",
    component: DesignStepVisual
  },
  {
    id: 4,
    title: "Delivery & Guidelines",
    tagline: "Final Polish",
    description: "We don't just send files; we deliver a comprehensive system. You receive all necessary formats along with brand guidelines to ensure consistency across all media.",
    details: ["Source Files", "Brand Book", "Print Ready Assets", "Digital Formats"],
    icon: <Box className="w-6 h-6" />,
    color: "text-blue-500",
    bg: "bg-blue-500",
    component: DeliveryVisual
  }
];

const tools = [
    { name: "Figma", icon: <PenTool size={24} />, desc: "UI & Prototyping" },
    { name: "Illustrator", icon: <PenTool size={24} />, desc: "Vector Graphics" },
    { name: "Photoshop", icon: <Image size={24} />, desc: "Photo Editing" },
    { name: "InDesign", icon: <Layers size={24} />, desc: "Print Layouts" },
    { name: "After Effects", icon: <Monitor size={24} />, desc: "Motion Graphics" },
    { name: "Canva", icon: <Brush size={24} />, desc: "Rapid Design" },
];

const features = [
    {
        title: "Brand Identity",
        desc: "Logos, color palettes, and typography that tell your unique story.",
        icon: <Zap className="text-yellow-500" />
    },
    {
        title: "Print Collateral",
        desc: "Business cards, brochures, and banners designed for high-quality production.",
        icon: <Printer className="text-blue-500" />
    },
    {
        title: "Social Media Kits",
        desc: "Consistent, engaging templates for Instagram, LinkedIn, and Facebook.",
        icon: <Share2 className="text-pink-500" />
    }
];

const GraphicDesign: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 8000);
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
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
             <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="design-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#design-grid)" className="text-slate-900 dark:text-white" />
             </svg>
         </div>

         <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <Palette size={14} /> Creative Studio
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                        Crafting Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400">Masterpieces</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-xl">
                        We blend creativity with strategy to build compelling brand identities and visual assets that captivate your audience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2">
                            Start a Project <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            View Work
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

      {/* --- PROCESS SECTION --- */}
      <section className="py-24 bg-white dark:bg-slate-900 relative border-t border-slate-100 dark:border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">The Creative Process</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        From abstract ideas to concrete deliverables, we follow a structured path to perfection.
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
                        <div className="order-1 lg:order-2 h-[400px] lg:h-[500px] w-full relative flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden">
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

      {/* --- TOOLS SECTION --- */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Design Arsenal</h2>
                <p className="text-slate-600 dark:text-slate-400">Industry-standard tools we use to bring visions to life.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {tools.map((tool, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex flex-col items-center gap-3 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-700 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="text-slate-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors transform group-hover:scale-110 duration-300">
                            {tool.icon}
                        </div>
                        <div className="text-center">
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">{tool.name}</span>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{tool.desc}</span>
                        </div>
                    </motion.div>
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
                className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-pink-500/30"
            >
                {/* Decor */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 relative z-10 tracking-tight">
                    Ready to elevate your brand?
                </h2>
                <p className="text-pink-100 text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light">
                    Let's create something that makes your business unforgettable.
                </p>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-white text-pink-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-50 transition-colors shadow-lg active:scale-95 relative z-10">
                    Get a Quote
                </button>
            </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default GraphicDesign;