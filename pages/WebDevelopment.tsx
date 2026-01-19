import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, PenTool, Code2, Bug, Rocket, 
  Smartphone, Globe, Cpu, Layers, Zap, CheckCircle2, ArrowRight,
  Search, FileText, MessageSquare, ChevronLeft, ChevronRight, Check, Cloud,
  Monitor, Database, Server, Terminal
} from 'lucide-react';
import Contact from '../components/Contact';

// --- CUSTOM ANIMATION COMPONENTS ---

const DiscoveryVisual = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative perspective-1000">
       {/* Orbiting System */}
       <div className="relative w-80 h-80 lg:w-96 lg:h-96">
           {/* Center Core */}
           <motion.div 
             className="absolute inset-0 m-auto w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-xl opacity-60"
             animate={{ scale: [1, 1.2, 1] }}
             transition={{ duration: 3, repeat: Infinity }}
           />
           <div className="absolute inset-0 m-auto w-24 h-24 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center z-10 border border-amber-100 dark:border-amber-900/50">
               <Lightbulb size={40} className="text-amber-500" />
           </div>

           {/* Orbit 1 */}
           <motion.div 
             className="absolute inset-0 m-auto w-60 h-60 border border-slate-200 dark:border-slate-700 rounded-full"
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           >
               <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg text-blue-500">
                   <Search size={20} />
               </motion.div>
           </motion.div>

           {/* Orbit 2 */}
            <motion.div 
             className="absolute inset-0 m-auto w-80 h-80 lg:w-96 lg:h-96 border border-dashed border-slate-300 dark:border-slate-600 rounded-full"
             animate={{ rotate: -360 }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           >
               <motion.div className="absolute bottom-1/4 left-0 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg text-purple-500">
                   <FileText size={20} />
               </motion.div>
               <motion.div className="absolute top-1/4 right-0 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg text-emerald-500">
                   <MessageSquare size={20} />
               </motion.div>
           </motion.div>
       </div>
    </div>
  );
};

const DesignVisual = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative perspective-1000">
       <motion.div 
         className="relative w-80 h-52 lg:w-96 lg:h-60 preserve-3d"
         initial={{ rotateX: 60, rotateZ: -30 }}
         animate={{ rotateX: 60, rotateZ: -30, y: [0, -15, 0] }}
         transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
       >
          {/* Layer 1: Wireframe */}
          <motion.div 
            className="absolute inset-0 bg-slate-100 dark:bg-slate-800/80 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-lg flex flex-col p-6 gap-3"
            initial={{ z: 0 }}
            animate={{ z: 0 }}
          >
             <div className="w-1/3 h-3 bg-slate-300 dark:bg-slate-600 rounded" />
             <div className="w-full h-24 bg-slate-200 dark:bg-slate-700/50 rounded border border-dashed border-slate-300 dark:border-slate-600" />
             <div className="flex gap-3">
                 <div className="w-1/2 h-12 bg-slate-200 dark:bg-slate-700/50 rounded" />
                 <div className="w-1/2 h-12 bg-slate-200 dark:bg-slate-700/50 rounded" />
             </div>
          </motion.div>

          {/* Layer 2: UI Elements */}
          <motion.div 
            className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 border-2 border-pink-200 dark:border-pink-900/50 rounded-xl shadow-xl flex flex-col p-6 gap-3"
            initial={{ z: 0, opacity: 0 }}
            animate={{ z: 60, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
             <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/50" />
                 <div className="w-32 h-3 bg-slate-800 dark:bg-white rounded" />
             </div>
             <div className="w-full h-24 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded flex items-center justify-center text-sm font-bold text-pink-500">
                 Hero Section
             </div>
          </motion.div>

          {/* Layer 3: Final Polish */}
          <motion.div 
             className="absolute -right-16 -bottom-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-50"
             initial={{ x: 30, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 1.2 }}
          >
              <div className="bg-pink-500 p-3 rounded-xl text-white">
                  <PenTool size={20} />
              </div>
              <div>
                  <div className="w-20 h-2.5 bg-slate-200 dark:bg-slate-600 rounded mb-1.5" />
                  <div className="w-12 h-2.5 bg-slate-100 dark:bg-slate-700 rounded" />
              </div>
          </motion.div>
       </motion.div>
    </div>
  );
};

const DevelopmentVisual = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
        <div className="relative w-[400px] h-[280px] lg:w-[480px] lg:h-[320px]">
            {/* Code Editor Window */}
            <motion.div 
                className="absolute inset-0 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                {/* Title Bar */}
                <div className="bg-slate-800 px-6 py-3 flex items-center gap-3 border-b border-slate-700">
                    <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                        <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                    </div>
                    <div className="ml-4 text-xs text-slate-400 font-mono">App.tsx</div>
                </div>
                
                {/* Code Content */}
                <div className="p-6 font-mono text-xs sm:text-sm leading-loose">
                    <div className="flex">
                        <span className="text-slate-600 w-8 text-right mr-4 select-none">1</span>
                        <span className="text-pink-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-300">App</span>() {'{'}
                    </div>
                    <div className="flex">
                        <span className="text-slate-600 w-8 text-right mr-4 select-none">2</span>
                        <span className="ml-4 text-pink-400">return</span> (
                    </div>
                    <div className="flex">
                        <span className="text-slate-600 w-8 text-right mr-4 select-none">3</span>
                        <span className="ml-8 text-slate-300">{'<'}</span><span className="text-green-400">Layout</span><span className="text-slate-300">{'>'}</span>
                    </div>
                     <div className="flex">
                        <span className="text-slate-600 w-8 text-right mr-4 select-none">4</span>
                        <span className="ml-12 text-slate-300">{'<'}</span><span className="text-green-400">Hero</span>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex"
                    >
                        <span className="text-slate-600 w-8 text-right mr-4 select-none">5</span>
                        <span className="ml-16 text-cyan-300">title</span>=<span className="text-orange-300">"Welcome"</span>
                    </motion.div>
                     <div className="flex">
                        <span className="text-slate-600 w-8 text-right mr-4 select-none">6</span>
                        <span className="ml-12 text-slate-300">{'/>'}</span>
                         <motion.div 
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-2 h-5 bg-blue-500 ml-1 inline-block align-middle"
                        />
                    </div>
                     <div className="flex">
                        <span className="text-slate-600 w-8 text-right mr-4 select-none">7</span>
                        <span className="ml-8 text-slate-300">{'</'}</span><span className="text-green-400">Layout</span><span className="text-slate-300">{'>'}</span>
                    </div>
                    <div className="flex">
                        <span className="text-slate-600 w-8 text-right mr-4 select-none">8</span>
                        <span className="text-slate-300">{'}'}</span>
                    </div>
                </div>
            </motion.div>

            {/* Floating Element */}
             <motion.div 
                className="absolute -right-6 -bottom-6 bg-blue-600 text-white p-4 rounded-full shadow-xl z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
            >
                <Code2 size={28} />
            </motion.div>
        </div>
    </div>
  );
};

const TestingVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative perspective-1000">
             <div className="relative">
                {/* Browser Window */}
                <motion.div 
                    className="w-96 h-64 lg:w-[450px] lg:h-[300px] bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden relative z-0"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                >
                    <div className="h-8 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center px-3 gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    </div>
                    <div className="p-5 space-y-3">
                        <div className="w-1/3 h-3 bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="w-full h-32 bg-slate-100 dark:bg-slate-700/50 rounded" />
                    </div>
                </motion.div>

                {/* Mobile Overlay */}
                <motion.div 
                    className="absolute -right-10 -bottom-10 w-32 h-56 bg-slate-900 rounded-[2rem] border-4 border-slate-800 shadow-2xl z-10 overflow-hidden"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Screen Content */}
                    <div className="w-full h-full bg-slate-800 p-3 flex flex-col items-center pt-5 space-y-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700" />
                        <div className="w-20 h-2 bg-slate-700 rounded" />
                        <div className="w-full h-16 bg-slate-700/50 rounded" />
                    </div>
                    
                    {/* Scanner */}
                    <motion.div 
                        className="absolute left-0 right-0 h-0.5 bg-green-400 shadow-[0_0_10px_#4ade80]"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>

                {/* Bug Fix Badges */}
                <motion.div 
                    className="absolute -top-6 -left-6 bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                >
                    <CheckCircle2 size={16} /> Passed
                </motion.div>
             </div>
        </div>
    )
}

const LaunchVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                 {/* Globe Wireframe */}
                 <motion.div 
                    className="absolute inset-0 rounded-full border border-slate-200 dark:border-slate-700 opacity-50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 >
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full border-r border-slate-200 dark:border-slate-700 rounded-full" />
                     <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full border-t border-slate-200 dark:border-slate-700 rounded-full" />
                 </motion.div>

                 {/* Server Stack */}
                 <motion.div 
                    className="relative z-10 flex flex-col gap-1.5"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                 >
                     {[1, 2, 3].map((i) => (
                         <div key={i} className="w-32 h-8 bg-slate-800 rounded border border-slate-700 flex items-center px-3 gap-2 shadow-lg">
                             <div className="flex gap-1.5">
                                 <motion.div 
                                    className="w-1.5 h-1.5 rounded-full bg-green-500"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
                                 />
                                 <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                             </div>
                         </div>
                     ))}
                 </motion.div>

                 {/* Rocket Launch */}
                 <motion.div 
                    className="absolute z-20"
                    initial={{ y: 60, scale: 0.5, opacity: 0 }}
                    animate={{ y: -100, scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1, type: "spring" }}
                 >
                     <div className="bg-gradient-to-t from-orange-500 to-red-500 p-4 rounded-2xl shadow-2xl shadow-orange-500/50">
                         <Rocket size={40} className="text-white fill-white transform -rotate-45" />
                     </div>
                 </motion.div>
                 
                 {/* Connection Lines */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none">
                     <motion.path 
                        d="M 160 160 L 60 60" 
                        stroke="rgba(59, 130, 246, 0.5)" 
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                     />
                     <motion.path 
                        d="M 160 160 L 260 80" 
                        stroke="rgba(59, 130, 246, 0.5)" 
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                     />
                 </svg>

                 {/* Locations */}
                 <motion.div 
                    className="absolute top-[12%] left-[10%] bg-blue-500 text-[10px] text-white px-2 py-0.5 rounded font-bold shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 }}
                 >USA</motion.div>
                  <motion.div 
                    className="absolute top-[18%] right-[8%] bg-blue-500 text-[10px] text-white px-2 py-0.5 rounded font-bold shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.7 }}
                 >Asia</motion.div>
            </div>
        </div>
    )
}

// --- PROCESS SLIDER DATA ---
const processSteps = [
  {
    id: 1,
    title: "Discovery",
    tagline: "Research & Idea Generation",
    description: "We start by generating and collecting ideas from multiple directions. This phase is about gathering requirements, understanding your vision, and building a solid strategy before moving forward.",
    details: ["Idea Collection", "Market Analysis", "Strategic Roadmap", "Concept Validation"],
    icon: <Lightbulb className="w-6 h-6" />,
    color: "text-amber-500",
    bg: "bg-amber-500",
    component: DiscoveryVisual
  },
  {
    id: 2,
    title: "Design",
    tagline: "Sketch to Prototype",
    description: "Now the idea turns to reality. We transform concepts into website sketches and high-fidelity designs, focusing on user experience, visual identity, and intuitive interfaces.",
    details: ["Wireframing", "UI/UX Design", "Interactive Prototyping", "Brand Alignment"],
    icon: <PenTool className="w-6 h-6" />,
    color: "text-pink-500",
    bg: "bg-pink-500",
    component: DesignVisual
  },
  {
    id: 3,
    title: "Development",
    tagline: "Coding & Integration",
    description: "The building phase. We write clean, efficient code, implement smooth animations, and integrate complex APIs to bring the design to life with modern frameworks.",
    details: ["Frontend Development", "Backend Logic", "API Integration", "Animation Implementation"],
    icon: <Code2 className="w-6 h-6" />,
    color: "text-blue-500",
    bg: "bg-blue-500",
    component: DevelopmentVisual
  },
  {
    id: 4,
    title: "Testing",
    tagline: "Quality Assurance",
    description: "Quality assurance is key. We rigorously test animations, functionality, and responsiveness across all devices and browsers to ensure a flawless and bug-free user experience.",
    details: ["Cross-Browser Testing", "Performance Optimization", "Mobile Responsiveness", "Bug Fixing"],
    icon: <Bug className="w-6 h-6" />,
    color: "text-violet-500",
    bg: "bg-violet-500",
    component: TestingVisual
  },
  {
    id: 5,
    title: "Launch",
    tagline: "Deployment & Growth",
    description: "Ready for takeoff. We handle the final deployment, server configuration, and optimization to launch your website to the world, ensuring it runs smoothly from day one.",
    details: ["Server Deployment", "SEO Setup", "Analytics Integration", "Post-Launch Support"],
    icon: <Rocket className="w-6 h-6" />,
    color: "text-emerald-500",
    bg: "bg-emerald-500",
    component: LaunchVisual
  }
];

const techStack = [
    { name: "React", icon: <Code2 size={24} />, desc: "Frontend Library" },
    { name: "Node.js", icon: <Cpu size={24} />, desc: "Backend Runtime" },
    { name: "TypeScript", icon: <Code2 size={24} />, desc: "Type Safety" },
    { name: "Next.js", icon: <Layers size={24} />, desc: "React Framework" },
    { name: "Tailwind", icon: <PenTool size={24} />, desc: "CSS Framework" },
    { name: "PostgreSQL", icon: <Layers size={24} />, desc: "Database" },
];

const features = [
    {
        title: "Responsive Design",
        desc: "Your site will look amazing on 4K monitors, laptops, tablets, and smartphones.",
        icon: <Smartphone className="text-blue-500" />
    },
    {
        title: "SEO Optimized",
        desc: "Built with semantic HTML and performance best practices to rank higher on search engines.",
        icon: <Globe className="text-emerald-500" />
    },
    {
        title: "High Performance",
        desc: "Lightning fast load times using optimized assets and modern caching strategies.",
        icon: <Zap className="text-orange-500" />
    }
];

const WebDevelopment: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-play the process slider with longer delay (8s)
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
      <section className="relative min-h-[90vh] lg:min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden">
         {/* Background Decor */}
         <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
             <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="web-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#web-grid)" className="text-slate-900 dark:text-white" />
             </svg>
         </div>

         <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
                        <Code2 size={14} /> Design Process
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
                        How We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600 dark:from-brand-400 dark:to-purple-400">Digital Experiences</span>
                    </h1>
                </motion.div>
            </div>

            {/* Slider Content */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left: Text Content */}
                        <div className="order-2 lg:order-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-6xl font-black text-slate-200 dark:text-slate-800">
                                    0{activeStep + 1}
                                </span>
                                <div className={`px-4 py-1.5 rounded-full ${processSteps[activeStep].bg} bg-opacity-10 text-xs font-bold uppercase tracking-widest ${processSteps[activeStep].color.replace('text', 'text')}`}>
                                    {processSteps[activeStep].tagline}
                                </div>
                            </div>
                            
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                {processSteps[activeStep].title}
                            </h2>
                            
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                                {processSteps[activeStep].description}
                            </p>

                            <ul className="grid grid-cols-2 gap-4 mb-8">
                                {processSteps[activeStep].details.map((detail, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                                        <div className={`w-1.5 h-1.5 rounded-full ${processSteps[activeStep].bg}`} />
                                        {detail}
                                    </li>
                                ))}
                            </ul>

                            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity">
                                Start This Step <ArrowRight size={18} />
                            </button>
                        </div>

                        {/* Right: Visual */}
                        <div className="order-1 lg:order-2 h-[500px] lg:h-[600px] w-full relative flex items-center justify-center">
                             <ActiveComponent />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Slider Controls (Overlay) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-20 hidden lg:flex">
                    <button 
                        onClick={prevStep}
                        className="pointer-events-auto -ml-16 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:scale-110 transition-all"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={nextStep}
                        className="pointer-events-auto -mr-16 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:scale-110 transition-all"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center mt-12 gap-3">
                {processSteps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveStep(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            index === activeStep 
                            ? 'w-10 bg-brand-600 dark:bg-brand-400' 
                            : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-brand-300'
                        }`}
                        aria-label={`Go to step ${index + 1}`}
                    />
                ))}
            </div>
         </div>
      </section>

      {/* --- TECH STACK SECTION --- */}
      <section className="py-24 bg-white dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Technology Stack</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        We leverage cutting-edge tools and frameworks to ensure your application is fast, secure, and future-proof.
                    </p>
                </motion.div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {techStack.map((tech, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex flex-col items-center gap-3 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors transform group-hover:scale-110 duration-300">
                            {tech.icon}
                        </div>
                        <div className="text-center">
                            <span className="block font-bold text-slate-900 dark:text-white mb-1">{tech.name}</span>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{tech.desc}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-700">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {feature.desc}
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
                            <CheckCircle2 size={16} />
                            <span>Guaranteed</span>
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
                className="bg-gradient-to-r from-brand-600 to-purple-700 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-500/30"
            >
                {/* Decor */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 relative z-10 tracking-tight">
                    Ready to build something <br className="hidden md:block"/>extraordinary?
                </h2>
                <p className="text-brand-100 text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light">
                    Whether you need a simple corporate website or a complex web application, our expert team is ready to deliver.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-white text-brand-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-50 transition-colors shadow-lg active:scale-95">
                        Start Your Project
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg border border-white/30 hover:bg-white/10 text-white transition-colors">
                        View Portfolio
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default WebDevelopment;