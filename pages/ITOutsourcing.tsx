import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Users, Briefcase, Code, Server, 
  ShieldCheck, ArrowRight, CheckCircle2,
  Clock, Coffee, Zap, ChevronLeft, ChevronRight,
  UserPlus, FileCheck, Rocket, Layout, Database, MessageSquare, Search
} from 'lucide-react';
import Contact from '../components/Contact';

// --- CUSTOM ANIMATION COMPONENTS ---

const HeroVisual = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000">
      {/* Globe Representation */}
      <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]">
          <motion.div 
            className="absolute inset-0 rounded-full border border-slate-200 dark:border-slate-700 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-4 rounded-full border border-dashed border-cyan-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(6,182,212,0.3)] z-20 border border-slate-700">
              <Globe size={48} className="text-cyan-400" />
          </div>

          {/* Floating Nodes (Remote Teams) */}
          {[
              { x: -140, y: -60, icon: <Code size={20} />, label: "Dev Team", color: "bg-blue-500" },
              { x: 140, y: -80, icon: <Server size={20} />, label: "DevOps", color: "bg-purple-500" },
              { x: -80, y: 140, icon: <ShieldCheck size={20} />, label: "QA", color: "bg-emerald-500" },
              { x: 100, y: 120, icon: <Layout size={20} />, label: "Design", color: "bg-pink-500" },
          ].map((node, i) => (
              <motion.div
                  key={i}
                  className="absolute"
                  style={{ top: '50%', left: '50%', x: node.x, y: node.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.2, type: "spring" }}
              >
                  {/* Connection Line */}
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none -z-10" width="300" height="300">
                      <motion.line 
                        x1="0" y1="0" x2={-node.x} y2={-node.y} 
                        stroke="currentColor" 
                        strokeWidth="1"
                        className="text-slate-300 dark:text-slate-700"
                        strokeDasharray="4 4"
                      />
                  </svg>

                  <div className={`p-3 rounded-xl ${node.color} text-white shadow-lg relative group cursor-pointer hover:scale-110 transition-transform`}>
                      {node.icon}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          {node.label}
                      </div>
                  </div>
              </motion.div>
          ))}

          {/* Orbiting Particles */}
          {[...Array(3)].map((_, i) => (
             <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
             >
                 <div className="w-3 h-3 bg-cyan-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 blur-[2px]" />
             </motion.div>
          ))}
      </div>
    </div>
  );
};

const AnalysisVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative perspective-1000">
            <motion.div 
                className="w-64 h-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-4 relative"
                initial={{ rotateY: -15 }}
                animate={{ rotateY: 15 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                        <FileCheck size={20} />
                    </div>
                    <div>
                        <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-1" />
                        <div className="h-2 w-12 bg-slate-100 dark:bg-slate-800 rounded" />
                    </div>
                </div>
                <div className="space-y-3">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-center gap-3">
                             <div className={`w-4 h-4 rounded border flex items-center justify-center ${i < 3 ? 'bg-blue-500 border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}>
                                 {i < 3 && <CheckCircle2 size={12} className="text-white" />}
                             </div>
                             <div className="h-2 w-full bg-slate-100 dark:bg-slate-700/50 rounded" />
                        </div>
                    ))}
                </div>
                
                <motion.div 
                    className="absolute -right-8 top-12 bg-white dark:bg-slate-700 p-3 rounded-lg shadow-xl"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Search size={24} className="text-blue-500" />
                </motion.div>
            </motion.div>
        </div>
    )
}

const SelectionVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
             <div className="relative w-full max-w-sm h-64">
                 {/* Cards Stack */}
                 {[0, 1, 2].map((i) => (
                     <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2 w-48 h-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col items-center"
                        style={{ marginLeft: -96, marginTop: -128 }}
                        initial={{ x: i * 20, y: i * 10, scale: 1 - (i * 0.1), zIndex: 3 - i }}
                        animate={i === 0 ? {
                            x: [0, 200, 0],
                            opacity: [1, 0, 0, 1],
                            rotate: [0, 20, 0]
                        } : {}}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                     >
                         <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 mb-4" />
                         <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                         <div className="h-2 w-16 bg-slate-100 dark:bg-slate-800 rounded mb-4" />
                         <div className="mt-auto flex gap-2">
                             <div className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-[8px] text-blue-600">React</div>
                             <div className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-[8px] text-purple-600">Node</div>
                         </div>
                     </motion.div>
                 ))}
                 
                 <div className="absolute bottom-0 w-full flex justify-center gap-8">
                     <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                         <ChevronLeft />
                     </div>
                     <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                         <CheckCircle2 />
                     </div>
                 </div>
             </div>
        </div>
    )
}

const OnboardVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="relative w-80 h-48 bg-slate-900 rounded-t-xl border-t-4 border-x-4 border-slate-700 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-800" />
                {/* Screen Content */}
                <div className="absolute inset-2 bg-slate-950 rounded flex flex-col items-center justify-center">
                     <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white mb-2"
                     >
                         <CheckCircle2 size={24} />
                     </motion.div>
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-white font-bold text-sm"
                     >
                         Access Granted
                     </motion.div>
                     <motion.div
                         className="mt-4 w-3/4 h-1 bg-slate-800 rounded overflow-hidden"
                     >
                         <motion.div 
                            className="h-full bg-green-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1, duration: 1.5 }}
                         />
                     </motion.div>
                </div>
            </div>
            {/* Keyboard Base */}
            <div className="absolute bottom-[calc(50%-6rem)] w-[22rem] h-4 bg-slate-600 rounded-b-xl shadow-xl" />
            
            {/* ID Card Entry */}
            <motion.div 
                className="absolute top-1/2 left-1/2 bg-white p-2 rounded shadow-lg flex items-center gap-2 border border-slate-200"
                initial={{ x: -200, y: 50, rotate: -45 }}
                animate={{ x: 80, y: 50, rotate: 10 }}
                transition={{ delay: 1.5, type: "spring" }}
            >
                <div className="w-8 h-8 bg-slate-200 rounded-full" />
                <div className="space-y-1">
                    <div className="w-12 h-1.5 bg-slate-300 rounded" />
                    <div className="w-8 h-1.5 bg-slate-200 rounded" />
                </div>
            </motion.div>
        </div>
    )
}

const ExecutionVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="grid grid-cols-2 gap-4 w-80">
                <motion.div 
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border-l-4 border-blue-500"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="text-xs text-slate-400 mb-2 uppercase font-bold">To Do</div>
                    <div className="space-y-2">
                        <div className="h-8 bg-slate-100 dark:bg-slate-700/50 rounded" />
                        <div className="h-8 bg-slate-100 dark:bg-slate-700/50 rounded" />
                    </div>
                </motion.div>
                
                <motion.div 
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border-l-4 border-green-500"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                     <div className="text-xs text-slate-400 mb-2 uppercase font-bold">Done</div>
                    <div className="space-y-2">
                        <div className="h-8 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-900/30 flex items-center px-2">
                            <CheckCircle2 size={12} className="text-green-500" />
                        </div>
                        <div className="h-8 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-900/30 flex items-center px-2">
                            <CheckCircle2 size={12} className="text-green-500" />
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white p-3 rounded-full shadow-xl z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
                <Zap size={24} className="text-yellow-400" />
            </motion.div>
        </div>
    )
}


// --- DATA ---

const processSteps = [
  {
    id: 1,
    title: "Requirements Analysis",
    tagline: "Understanding Needs",
    description: "We work closely with you to understand your technical requirements, project scope, and team culture to identify the perfect skill set match.",
    details: ["Skill Gap Analysis", "Project Scoping", "Tech Stack Definition", "Timeline Estimation"],
    icon: <FileCheck className="w-6 h-6" />,
    color: "text-blue-500",
    bg: "bg-blue-500",
    component: AnalysisVisual
  },
  {
    id: 2,
    title: "Candidate Selection",
    tagline: "Screening Talent",
    description: "We screen thousands of profiles to shortlist the top 1% of talent. You get to interview and select the developers that best fit your team.",
    details: ["Technical Screening", "Soft Skills Check", "Client Interviews", "Code Tests"],
    icon: <UserPlus className="w-6 h-6" />,
    color: "text-purple-500",
    bg: "bg-purple-500",
    component: SelectionVisual
  },
  {
    id: 3,
    title: "Onboarding",
    tagline: "Seamless Integration",
    description: "Once selected, we handle all the logistics. From NDA signing to system setup, we ensure your new team members are ready to code from day one.",
    details: ["NDA & Contracts", "System Access", "Knowledge Transfer", "Environment Setup"],
    icon: <Briefcase className="w-6 h-6" />,
    color: "text-emerald-500",
    bg: "bg-emerald-500",
    component: OnboardVisual
  },
  {
    id: 4,
    title: "Execution & Scale",
    tagline: "Agile Delivery",
    description: "Your extended team works as part of your internal unit. We provide continuous support, performance monitoring, and the flexibility to scale up or down.",
    details: ["Agile Sprints", "Performance Reviews", "Scalability On-Demand", "Dedicated Support"],
    icon: <Rocket className="w-6 h-6" />,
    color: "text-cyan-500",
    bg: "bg-cyan-500",
    component: ExecutionVisual
  }
];

const engagementModels = [
    {
        title: "Staff Augmentation",
        desc: "Extend your existing in-house team with our specialized developers. You manage them directly while we handle HR and payroll.",
        icon: <Users size={32} className="text-blue-500" />,
        features: ["Direct Control", "Quick Scaling", "No Overhead"]
    },
    {
        title: "Dedicated Team",
        desc: "A full cross-functional team (Devs, QA, PM) dedicated solely to your project. Managed by us to deliver on your roadmap.",
        icon: <Briefcase size={32} className="text-purple-500" />,
        features: ["Project Management", "End-to-End Ownership", "Long-term Focus"]
    },
    {
        title: "Project Outsourcing",
        desc: "Hand over your requirements and let us build the solution from scratch. Fixed cost or time-and-material models available.",
        icon: <Code size={32} className="text-orange-500" />,
        features: ["Defined Deliverables", "Cost Certainty", "Outcome Focused"]
    }
];

const technologies = [
    { category: "Frontend", stack: ["React", "Angular", "Vue.js", "Next.js"] },
    { category: "Backend", stack: ["Node.js", "Python", "Java", ".NET"] },
    { category: "Mobile", stack: ["Flutter", "React Native", "iOS", "Android"] },
    { category: "Database", stack: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
    { category: "Cloud & DevOps", stack: ["AWS", "Azure", "Docker", "Kubernetes"] },
    { category: "Design", stack: ["Figma", "Adobe XD", "Sketch"] },
];

const ITOutsourcing: React.FC = () => {
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
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
             {/* Map Grid */}
             <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-map" width="50" height="50" patternUnits="userSpaceOnUse">
                         <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-map)" />
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
                        <Globe size={14} /> Global Talent Pool
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                        Scale Your Team, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400">Not Your Overhead</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-xl">
                        Access top-tier IT professionals on-demand. Flexible engagement models to suit your project needs and budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2">
                            Hire Developers <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            View Models
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-8 mt-12 text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                             <CheckCircle2 size={16} className="text-cyan-500" /> 
                             <span className="text-sm font-semibold">Cost Efficient</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <CheckCircle2 size={16} className="text-cyan-500" /> 
                             <span className="text-sm font-semibold">Fast Onboarding</span>
                        </div>
                         <div className="flex items-center gap-2">
                             <CheckCircle2 size={16} className="text-cyan-500" /> 
                             <span className="text-sm font-semibold">Timezone Aligned</span>
                        </div>
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

      {/* --- ENGAGEMENT MODELS --- */}
      <section className="py-24 bg-white dark:bg-slate-900 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Flexible Engagement Models</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        Choose the model that best fits your business goals and project requirements.
                    </p>
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {engagementModels.map((model, i) => (
                    <motion.div 
                        key={i}
                        className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 hover:shadow-xl transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-6">
                            {model.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{model.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            {model.desc}
                        </p>
                        <ul className="space-y-3">
                            {model.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 size={16} className="text-cyan-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
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
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        Our streamlined process ensures you get the right talent, fast.
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

      {/* --- TECH STACK --- */}
      <section className="py-24 bg-white dark:bg-slate-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Technologies We Master</h2>
                 <p className="text-slate-600 dark:text-slate-400">Our pool of developers are experts in the latest frameworks and tools.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {technologies.map((tech, i) => (
                    <motion.div 
                        key={i}
                        className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-600 pb-2">
                            {tech.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {tech.stack.map(item => (
                                <span key={item} className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-slate-50 dark:bg-dark-bg transition-colors duration-300" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-cyan-500/30"
            >
                {/* Decor */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-800/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 relative z-10 tracking-tight">
                    Ready to build your dream team?
                </h2>
                <p className="text-cyan-100 text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light">
                    Connect with Efficacious today and access world-class talent to accelerate your digital journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                     <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-white text-cyan-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-50 transition-colors shadow-lg active:scale-95">
                        Get a Quote
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                        Success Stories
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default ITOutsourcing;