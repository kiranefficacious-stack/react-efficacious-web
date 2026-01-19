import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, BarChart3, PieChart, Target, 
  Lightbulb, Search, Settings, ArrowRight, CheckCircle2,
  Users, Briefcase, FileText, ChevronLeft, ChevronRight,
  Zap, Clock, Shield, Globe, Award, Layers
} from 'lucide-react';
import Contact from '../components/Contact';

// --- CUSTOM ANIMATION COMPONENTS ---

const HeroVisual = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-dark-bg to-transparent" />
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
             <defs>
                 <pattern id="grid-hero" width="40" height="40" patternUnits="userSpaceOnUse">
                     <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                 </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid-hero)" className="text-amber-500/30" />
          </svg>
      </div>

      {/* Main Strategic Hub */}
      <div className="relative w-[320px] h-[320px] lg:w-[400px] lg:h-[400px]">
          {/* Central Core */}
          <motion.div
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-slate-900 rounded-full border-4 border-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.4)] flex items-center justify-center z-20"
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
             <TrendingUp size={48} className="text-white" />
          </motion.div>

          {/* Orbiting Satellites */}
          {[
              { icon: PieChart, color: "bg-blue-500", delay: 0 },
              { icon: Users, color: "bg-green-500", delay: 2 },
              { icon: Target, color: "bg-red-500", delay: 4 },
              { icon: Briefcase, color: "bg-purple-500", delay: 6 },
          ].map((item, i) => (
             <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: -item.delay * 2.5 }}
             >
                 <motion.div 
                    className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 ${item.color} rounded-2xl shadow-xl flex items-center justify-center text-white z-10`}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: -item.delay * 2.5 }}
                 >
                     <item.icon size={24} />
                 </motion.div>
             </motion.div>
          ))}

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite_reverse]">
              <circle cx="50%" cy="50%" r="50%" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="10 10" className="opacity-30" />
              <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#f59e0b" strokeWidth="1" className="opacity-20" />
          </svg>
          
          {/* Floating Data Cards */}
          <motion.div
            className="absolute -right-20 top-20 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-30 hidden lg:block"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
              <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-bold text-slate-500">Efficiency</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">+145%</div>
          </motion.div>

           <motion.div
            className="absolute -left-20 bottom-20 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-30 hidden lg:block"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
              <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-bold text-slate-500">Growth</span>
              </div>
              <div className="h-2 w-32 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                  />
              </div>
          </motion.div>
      </div>
    </div>
  );
};

const AuditVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative perspective-1000">
             <motion.div 
                className="relative w-80 h-96 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 overflow-hidden"
                initial={{ rotateY: -10 }}
                animate={{ rotateY: 10 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
             >
                 {/* Header */}
                 <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                     <div className="flex items-center gap-2">
                         <FileText className="text-amber-500" size={24} />
                         <span className="font-bold text-slate-900 dark:text-white">System Audit</span>
                     </div>
                     <span className="text-xs font-mono text-slate-400">#AUD-2024</span>
                 </div>

                 {/* Content Lines */}
                 <div className="space-y-4">
                     {[1, 2, 3, 4, 5].map((i) => (
                         <div key={i} className="flex items-center gap-3">
                             <motion.div 
                                className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center"
                                animate={{ borderColor: ["#cbd5e1", "#f59e0b", "#22c55e"] }}
                                transition={{ delay: i * 0.5, duration: 2, times: [0, 0.5, 1] }}
                             >
                                <motion.div 
                                    className="w-2.5 h-2.5 bg-green-500 rounded-full opacity-0" 
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.5 + 1 }}
                                />
                             </motion.div>
                             <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded w-full relative overflow-hidden">
                                 <motion.div 
                                    className="absolute inset-y-0 left-0 bg-slate-200 dark:bg-slate-600 w-1/2"
                                    animate={{ left: "100%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                 />
                             </div>
                         </div>
                     ))}
                 </div>

                 {/* Scanning Effect */}
                 <motion.div 
                    className="absolute top-0 left-0 right-0 h-1 bg-amber-500 shadow-[0_0_20px_#f59e0b]"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 />
             </motion.div>

             {/* Magnifying Glass */}
             <motion.div 
                className="absolute -right-4 top-1/2 -translate-y-1/2 text-slate-800 dark:text-white z-20 drop-shadow-2xl"
                animate={{ y: [-20, 20] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
             >
                 <Search size={80} strokeWidth={1} />
             </motion.div>
        </div>
    )
}

const StrategyVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
             <div className="w-80 h-80 relative">
                 {/* Chess Board Base */}
                 <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 transform rotate-x-60 rounded-xl shadow-2xl border-4 border-slate-300 dark:border-slate-600 grid grid-cols-4 grid-rows-4 overflow-hidden">
                     {[...Array(16)].map((_, i) => (
                         <div key={i} className={`${(Math.floor(i / 4) + i) % 2 === 0 ? 'bg-slate-200 dark:bg-slate-700' : 'bg-slate-300 dark:bg-slate-600'}`} />
                     ))}
                 </div>

                 {/* Pieces */}
                 <motion.div 
                    className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-10"
                    initial={{ x: 0, y: 0 }}
                    animate={{ x: 100, y: 50 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                 >
                     {/* King/Piece representation */}
                     <div className="w-12 h-20 bg-amber-500 rounded-t-full shadow-lg relative flex justify-center">
                         <div className="w-16 h-4 bg-amber-600 absolute -bottom-2 rounded-full" />
                         <div className="w-4 h-4 bg-amber-300 rounded-full absolute top-2 animate-pulse" />
                     </div>
                 </motion.div>

                 <motion.div 
                    className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 z-0 opacity-50"
                 >
                     <div className="w-10 h-16 bg-slate-400 rounded-t-full shadow-lg relative flex justify-center">
                         <div className="w-14 h-4 bg-slate-500 absolute -bottom-2 rounded-full" />
                     </div>
                 </motion.div>

                 {/* Strategy Path */}
                 <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20">
                     <motion.path 
                        d="M 60 100 Q 150 50 220 150" 
                        fill="none" 
                        stroke="#f59e0b" 
                        strokeWidth="4" 
                        strokeDasharray="8 8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                     />
                 </svg>
             </div>
        </div>
    )
}

const ImplementationVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="relative w-80 h-80">
                {/* Gears System */}
                <motion.div 
                    className="absolute top-0 left-0 text-slate-300 dark:text-slate-600"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    <Settings size={140} />
                </motion.div>
                
                <motion.div 
                    className="absolute bottom-0 right-0 text-amber-500"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    <Settings size={180} />
                </motion.div>

                 <motion.div 
                    className="absolute top-10 right-10 text-slate-400 dark:text-slate-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                    <Settings size={80} />
                </motion.div>

                {/* Integration Lines */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                         <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mb-2">
                             <CheckCircle2 size={24} />
                         </div>
                         <span className="font-bold text-slate-900 dark:text-white">Active</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OptimizationVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative perspective-1000">
             <div className="relative w-80 h-60 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 flex items-end justify-between gap-4 transform rotate-y-12">
                 {[30, 50, 45, 70, 60, 90].map((h, i) => (
                     <motion.div 
                        key={i}
                        className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg relative group"
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.2, duration: 1, type: "spring" }}
                     >
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded">
                             {h}%
                         </div>
                     </motion.div>
                 ))}
                 
                 {/* Trend Line */}
                 <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10">
                     <motion.path 
                        d="M 20 180 L 60 120 L 100 130 L 140 80 L 180 100 L 220 40" 
                        fill="none" 
                        stroke="#22c55e" 
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                     />
                 </svg>
             </div>
             
             <motion.div 
                className="absolute top-10 right-0 bg-green-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg z-20 flex items-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, type: "spring" }}
             >
                 <TrendingUp size={20} /> ROI +200%
             </motion.div>
        </div>
    )
}


// --- DATA ---

const processSteps = [
  {
    id: 1,
    title: "Audit & Analysis",
    tagline: "Deep Dive",
    description: "We start by analyzing your current business processes, identifying bottlenecks, and understanding your organizational structure. Data-driven insights form the foundation of our strategy.",
    details: ["Workflow Audit", "Data Analysis", "Risk Assessment", "Stakeholder Interviews"],
    icon: <Search className="w-6 h-6" />,
    color: "text-blue-500",
    bg: "bg-blue-500",
    component: AuditVisual
  },
  {
    id: 2,
    title: "Strategic Planning",
    tagline: "Roadmap Creation",
    description: "Based on our findings, we formulate a comprehensive strategy tailored to your goals. We define clear milestones, resource allocation, and expected outcomes.",
    details: ["Solution Architecture", "Resource Planning", "Timeline Development", "Goal Setting"],
    icon: <Target className="w-6 h-6" />,
    color: "text-amber-500",
    bg: "bg-amber-500",
    component: StrategyVisual
  },
  {
    id: 3,
    title: "Implementation",
    tagline: "Execution",
    description: "We don't just advise; we help execute. Our team works alongside yours to implement changes, integrate new technologies, and ensure smooth adoption across the organization.",
    details: ["Process Integration", "Change Management", "Technology Deployment", "Team Training"],
    icon: <Settings className="w-6 h-6" />,
    color: "text-purple-500",
    bg: "bg-purple-500",
    component: ImplementationVisual
  },
  {
    id: 4,
    title: "Optimization",
    tagline: "Continuous Improvement",
    description: "The work doesn't stop at implementation. We monitor performance, gather feedback, and continuously refine processes to maximize efficiency and ROI.",
    details: ["Performance Monitoring", "Feedback Loops", "KPI Tracking", "Iterative Refinement"],
    icon: <TrendingUp className="w-6 h-6" />,
    color: "text-green-500",
    bg: "bg-green-500",
    component: OptimizationVisual
  }
];

const consultingAreas = [
    { 
        title: "IT Infrastructure", 
        desc: "Modernize your tech stack for scalability and security.", 
        icon: <Layers size={32} className="text-blue-500" /> 
    },
    { 
        title: "Process Optimization", 
        desc: "Streamline workflows to reduce waste and boost productivity.", 
        icon: <Zap size={32} className="text-amber-500" /> 
    },
    { 
        title: "HR Strategy", 
        desc: "Talent acquisition, retention, and organizational culture.", 
        icon: <Users size={32} className="text-purple-500" /> 
    },
    { 
        title: "Financial Planning", 
        desc: "Cost reduction strategies and revenue growth modeling.", 
        icon: <PieChart size={32} className="text-emerald-500" /> 
    },
    { 
        title: "Risk Management", 
        desc: "Identify and mitigate potential operational and compliance risks.", 
        icon: <Shield size={32} className="text-red-500" /> 
    },
    { 
        title: "Digital Transformation", 
        desc: "Transition from legacy systems to modern digital ecosystems.", 
        icon: <Globe size={32} className="text-indigo-500" /> 
    },
];

const stats = [
    { label: "Projects Completed", value: "500+" },
    { label: "Client Satisfaction", value: "98%" },
    { label: "Efficiency Increase", value: "40%" },
    { label: "Years Experience", value: "12+" },
];

const ManagementConsultant: React.FC = () => {
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
         {/* Background Decor */}
         <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
         </div>

         <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <Award size={14} /> Expert Consultation
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                        Strategic Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">Complex Challenges</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-xl">
                        We optimize operations, mitigate risks, and drive sustainable growth through data-driven strategies and expert implementation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2">
                            Book Consultation <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Explore Services
                        </button>
                    </div>
                    
                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">{stat.label}</p>
                            </div>
                        ))}
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

      {/* --- CONSULTING AREAS --- */}
      <section className="py-24 bg-white dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Areas of Expertise</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        Holistic management solutions covering every aspect of your business.
                    </p>
                </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {consultingAreas.map((area, i) => (
                    <motion.div
                        key={i}
                        className="group bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            {area.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{area.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {area.desc}
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
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Methodology</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        A proven 4-step framework to unlock efficiency and drive value.
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

      {/* --- CTA --- */}
      <section className="py-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-white dark:bg-dark-bg transition-colors duration-300" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-amber-500/30"
            >
                {/* Decor */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-orange-800/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 relative z-10 tracking-tight">
                    Transform your business today
                </h2>
                <p className="text-amber-100 text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light">
                    Partner with Efficacious to unlock hidden potential and achieve operational excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                     <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-white text-amber-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg active:scale-95">
                        Schedule an Audit
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                        View Case Studies
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default ManagementConsultant;