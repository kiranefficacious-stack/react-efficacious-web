import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Database, LineChart, FileSpreadsheet, 
  Search, BarChart3, PieChart, ArrowRight, CheckCircle2,
  Lightbulb, Network, TrendingUp, ChevronLeft, ChevronRight,
  Filter, FileText, Layers, Microscope, Globe
} from 'lucide-react';
import Contact from '../components/Contact';

// --- CUSTOM ANIMATION COMPONENTS ---

const HeroVisual = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000">
      <div className="relative w-[300px] h-[300px] lg:w-[450px] lg:h-[450px]">
          {/* Neural Network Nodes */}
          {[...Array(6)].map((_, i) => (
             <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 30 + i * 5, repeat: Infinity, ease: "linear", delay: i * 2 }}
             >
                 <motion.div 
                    className="w-4 h-4 rounded-full bg-violet-500 absolute"
                    style={{ top: -100 - (i * 20), left: 0 }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                 />
                 {/* Connection Lines */}
                 <div className="absolute top-0 left-0 w-0.5 h-[100px] bg-gradient-to-b from-transparent to-violet-500/50 origin-bottom" 
                      style={{ transform: `translateY(-${100 + i * 20}px)` }} 
                 />
             </motion.div>
          ))}

          {/* Central Brain Core */}
          <div className="absolute inset-0 m-auto w-40 h-40 bg-slate-900 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(139,92,246,0.4)] z-20 border border-violet-500/30">
              <Brain size={64} className="text-violet-400" />
          </div>

          {/* Rotating Data Rings */}
          <motion.div 
             className="absolute inset-0 rounded-full border border-dashed border-violet-500/30"
             animate={{ rotate: -360 }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
             className="absolute inset-10 rounded-full border border-slate-700 opacity-50"
             animate={{ rotate: 360, scale: [1, 1.05, 1] }}
             transition={{ rotate: { duration: 50, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
          />

          {/* Floating Insight Cards */}
          <motion.div
             className="absolute top-0 right-0 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white z-30"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0, y: [-10, 10, -10] }}
             transition={{ opacity: { delay: 1 }, y: { duration: 4, repeat: Infinity } }}
          >
              <div className="flex items-center gap-2 mb-1">
                  <BarChart3 size={14} className="text-violet-300" />
                  <span className="text-xs font-bold">Analytics</span>
              </div>
              <div className="text-lg font-bold">+240%</div>
          </motion.div>

          <motion.div
             className="absolute bottom-10 left-0 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white z-30"
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0, y: [10, -10, 10] }}
             transition={{ opacity: { delay: 1.5 }, y: { duration: 5, repeat: Infinity } }}
          >
              <div className="flex items-center gap-2 mb-1">
                  <Search size={14} className="text-pink-300" />
                  <span className="text-xs font-bold">Insights</span>
              </div>
              <div className="h-1.5 w-24 bg-white/20 rounded-full mt-1">
                  <motion.div 
                    className="h-full bg-pink-400 rounded-full"
                    animate={{ width: ["0%", "80%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
              </div>
          </motion.div>
      </div>
    </div>
  );
};

const CollectionVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="relative w-80 h-80 flex flex-col items-center justify-center">
                {/* Data Sources */}
                <div className="absolute top-0 flex gap-8">
                    {[Database, Globe, FileText].map((Icon, i) => (
                        <motion.div 
                            key={i}
                            className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center text-violet-500 border border-slate-100 dark:border-slate-700"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <Icon size={24} />
                        </motion.div>
                    ))}
                </div>

                {/* Funnel Effect */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0">
                    <defs>
                        <linearGradient id="flow-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <motion.path 
                        d="M 60 60 Q 160 200 160 220" 
                        stroke="url(#flow-grad)" strokeWidth="2" fill="none"
                        strokeDasharray="4 4"
                        animate={{ strokeDashoffset: [20, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path 
                        d="M 160 60 L 160 220" 
                        stroke="url(#flow-grad)" strokeWidth="2" fill="none"
                        strokeDasharray="4 4"
                        animate={{ strokeDashoffset: [20, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.1 }}
                    />
                    <motion.path 
                        d="M 260 60 Q 160 200 160 220" 
                        stroke="url(#flow-grad)" strokeWidth="2" fill="none"
                        strokeDasharray="4 4"
                        animate={{ strokeDashoffset: [20, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.2 }}
                    />
                </svg>

                {/* Central Repository */}
                <motion.div 
                    className="mt-40 w-32 h-32 bg-slate-900 rounded-2xl flex items-center justify-center border-4 border-violet-500 shadow-2xl relative z-10"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Database size={48} className="text-white" />
                    <div className="absolute -bottom-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Raw Data</div>
                </motion.div>
            </div>
        </div>
    )
}

const ProcessingVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative perspective-1000">
             <motion.div 
                className="w-72 h-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center relative overflow-hidden"
                initial={{ rotateX: 20 }}
             >
                 {/* Scanning Bar */}
                 <motion.div 
                    className="absolute inset-y-0 w-2 bg-pink-500/50 shadow-[0_0_20px_#ec4899] z-10"
                    animate={{ left: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 />
                 
                 <div className="grid grid-cols-6 gap-2 opacity-30">
                     {[...Array(24)].map((_,i) => (
                         <div key={i} className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-600" />
                     ))}
                 </div>
                 
                 <div className="absolute inset-0 flex items-center justify-center z-20">
                     <div className="bg-slate-900/80 backdrop-blur text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                         <Filter size={14} className="text-pink-400" /> Cleaning...
                     </div>
                 </div>
             </motion.div>

             {/* Output Cards */}
             <div className="absolute bottom-10 flex gap-4">
                 {[1, 2, 3].map((i) => (
                     <motion.div
                        key={i}
                        className="w-16 h-20 bg-white dark:bg-slate-800 rounded-lg border border-green-200 dark:border-green-900 shadow-lg flex items-center justify-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 + (i * 0.2) }}
                     >
                         <CheckCircle2 size={24} className="text-green-500" />
                     </motion.div>
                 ))}
             </div>
        </div>
    )
}

const AnalysisStepVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="relative w-80 h-64">
                {/* 3D Bar Chart */}
                <div className="flex items-end justify-between h-full px-4 gap-4">
                    {[40, 70, 50, 90, 65].map((h, i) => (
                        <motion.div
                            key={i}
                            className="w-full bg-gradient-to-t from-violet-600 to-violet-400 rounded-t-lg relative group"
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.1, duration: 1, type: "spring" }}
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-1 rounded">
                                {h * 124}
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {/* Floating Magnifying Glass */}
                <motion.div 
                    className="absolute -right-4 top-0 text-slate-800 dark:text-white filter drop-shadow-xl"
                    animate={{ 
                        x: [-20, 20, -20],
                        y: [20, 60, 20],
                        rotate: [-10, 10, -10]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Microscope size={80} strokeWidth={1.5} />
                </motion.div>
            </div>
        </div>
    )
}

const InsightsVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <motion.div 
                className="w-72 h-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                        <Lightbulb size={20} />
                    </div>
                    <div>
                        <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-1" />
                        <div className="text-xs font-bold text-slate-400 uppercase">Strategy Report</div>
                    </div>
                </div>

                <div className="space-y-4 flex-1">
                    <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30 flex gap-3 items-start">
                        <TrendingUp size={16} className="text-green-500 mt-1 shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Market Opportunity</div>
                            <div className="text-[10px] text-slate-500 mt-1">High potential in sector A identified.</div>
                        </div>
                    </div>
                     <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 flex gap-3 items-start">
                        <PieChart size={16} className="text-blue-500 mt-1 shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Audience Segmentation</div>
                            <div className="text-[10px] text-slate-500 mt-1">Target demographic shifted to Gen Z.</div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Status</span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 text-[10px] font-bold rounded uppercase">Actionable</span>
                </div>
            </motion.div>
        </div>
    )
}

// --- DATA ---

const processSteps = [
  {
    id: 1,
    title: "Data Collection",
    tagline: "Gathering Intel",
    description: "We aggregate data from diverse sources—internal databases, web scraping, surveys, and third-party APIs—to build a comprehensive raw dataset tailored to your objectives.",
    details: ["Multi-source Mining", "Web Scraping", "Survey Deployment", "Database Extraction"],
    icon: <Database className="w-6 h-6" />,
    color: "text-violet-500",
    bg: "bg-violet-500",
    component: CollectionVisual
  },
  {
    id: 2,
    title: "Processing & Cleansing",
    tagline: "Refining Data",
    description: "Raw data is often noisy. We rigorously clean, normalize, and structure the data to ensure accuracy and consistency before any analysis begins.",
    details: ["Noise Reduction", "Normalization", "Validation Checks", "Structuring"],
    icon: <Filter className="w-6 h-6" />,
    color: "text-pink-500",
    bg: "bg-pink-500",
    component: ProcessingVisual
  },
  {
    id: 3,
    title: "Analysis & Modeling",
    tagline: "Deep Dive",
    description: "Our analysts and data scientists apply advanced statistical models and machine learning algorithms to uncover patterns, trends, and correlations.",
    details: ["Statistical Modeling", "Trend Analysis", "Predictive Analytics", "Machine Learning"],
    icon: <Microscope className="w-6 h-6" />,
    color: "text-blue-500",
    bg: "bg-blue-500",
    component: AnalysisStepVisual
  },
  {
    id: 4,
    title: "Reporting & Strategy",
    tagline: "Actionable Insights",
    description: "We translate complex data into clear, visual reports and actionable strategies. You receive the 'so what'—not just the numbers, but the direction.",
    details: ["Dashboard Creation", "Executive Summaries", "Strategic Recommendations", "ROI Forecasting"],
    icon: <Lightbulb className="w-6 h-6" />,
    color: "text-amber-500",
    bg: "bg-amber-500",
    component: InsightsVisual
  }
];

const services = [
    { 
        title: "Data Analytics", 
        desc: "Transform raw data into meaningful metrics for performance tracking.", 
        icon: <BarChart3 size={32} className="text-violet-500" /> 
    },
    { 
        title: "Market Research", 
        desc: "Deep dive into consumer behavior, market trends, and competitive landscape.", 
        icon: <Search size={32} className="text-pink-500" /> 
    },
    { 
        title: "Financial Research", 
        desc: "Investment analysis, equity research, and financial modeling for firms.", 
        icon: <LineChart size={32} className="text-emerald-500" /> 
    },
    { 
        title: "Business Intelligence", 
        desc: "Interactive dashboards (PowerBI, Tableau) for real-time decision making.", 
        icon: <PieChart size={32} className="text-blue-500" /> 
    },
    { 
        title: "Legal Process (LPO)", 
        desc: "Legal research, contract drafting, and document review support.", 
        icon: <FileSpreadsheet size={32} className="text-amber-500" /> 
    },
    { 
        title: "Network Analytics", 
        desc: "Analyzing supply chains and operational networks for efficiency.", 
        icon: <Network size={32} className="text-cyan-500" /> 
    },
];

const KnowledgeProcessOptimization: React.FC = () => {
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
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
             {/* Data Grid */}
             <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-data" width="30" height="30" patternUnits="userSpaceOnUse">
                         <circle cx="1" cy="1" r="1" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-data)" />
             </svg>
         </div>

         <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <Brain size={14} /> Knowledge Services
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                        Turn Information into <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">Strategic Power</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-xl">
                        High-value Knowledge Process Optimization (KPO) services that help you make data-driven decisions, reduce costs, and focus on core innovation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2">
                            Request Analysis <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            How It Works
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

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-white dark:bg-slate-900 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Core Capabilities</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        We go beyond simple data entry. We provide high-end research and analytical services.
                    </p>
                </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, i) => (
                    <motion.div 
                        key={i}
                        className="group bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {service.desc}
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
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">The Information Lifecycle</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        From raw chaos to refined wisdom, we manage the entire data journey.
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
                                    Phase 0{activeStep + 1}
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

      {/* --- BENEFITS/CTA --- */}
      <section className="py-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-white dark:bg-dark-bg transition-colors duration-300" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-violet-500/30"
            >
                {/* Decor */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 relative z-10 tracking-tight">
                    Unlock Business Intelligence
                </h2>
                <p className="text-violet-100 text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light">
                    Gain a competitive edge with high-quality research and analytics tailored to your industry.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                     <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-white text-violet-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-violet-50 transition-colors shadow-lg active:scale-95">
                        Start Your Project
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                        Case Studies
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default KnowledgeProcessOptimization;