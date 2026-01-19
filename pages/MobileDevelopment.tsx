import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, PenTool, Code2, Bug, Rocket, 
  Smartphone, Globe, Wifi, Zap, CheckCircle2, ArrowRight,
  Search, Tablet, Download, Layers, ShieldCheck, Play, Box,
  Cpu, Cloud, Monitor, Layout, ChevronLeft, ChevronRight
} from 'lucide-react';
import Contact from '../components/Contact';

// --- CUSTOM ANIMATION COMPONENTS (Mobile Focused) ---

const HeroVisual = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000">
      {/* Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[100px]"
      />

      {/* Main Phone Mockup */}
      <motion.div
        initial={{ rotateY: -20, rotateX: 10, opacity: 0, y: 50 }}
        animate={{ rotateY: -10, rotateX: 5, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/20"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-30" />
        
        {/* Screen */}
        <div className="w-full h-full bg-slate-950 relative overflow-hidden">
            {/* Header */}
            <div className="h-24 bg-gradient-to-br from-brand-600 to-purple-600 p-6 pt-10 flex justify-between items-start">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md" />
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md" />
            </div>
            
            {/* Content Cards */}
            <div className="p-4 space-y-4">
                <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="h-32 rounded-2xl bg-slate-800/50 border border-slate-700/50 p-4"
                >
                    <div className="w-12 h-12 rounded-full bg-brand-500/20 mb-3" />
                    <div className="h-2 w-2/3 bg-slate-700 rounded mb-2" />
                    <div className="h-2 w-1/2 bg-slate-700 rounded" />
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                        <motion.div 
                            key={i}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 + (i * 0.1) }}
                            className="h-32 rounded-2xl bg-slate-800/50 border border-slate-700/50"
                        />
                    ))}
                </div>
            </div>
            
             {/* Floating UI Elements inside phone */}
             <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-4 right-4 h-16 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-around px-4"
             >
                 {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-white/20" />)}
             </motion.div>
        </div>
      </motion.div>

      {/* Floating Cards Outside */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 80, y: -100, opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute z-30 p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3 hidden md:flex"
      >
         <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
             <ShieldCheck size={24} />
         </div>
         <div>
             <p className="text-xs font-bold text-slate-500 uppercase">Security</p>
             <p className="text-sm font-bold text-slate-900 dark:text-white">Enterprise Grade</p>
         </div>
      </motion.div>

      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: -80, y: 120, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute z-30 p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3 hidden md:flex"
      >
         <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
             <Zap size={24} />
         </div>
         <div>
             <p className="text-xs font-bold text-slate-500 uppercase">Performance</p>
             <p className="text-sm font-bold text-slate-900 dark:text-white">Lightning Fast</p>
         </div>
      </motion.div>
    </div>
  );
};

const StrategyVisual = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative perspective-1000">
      {/* Central Hub - Compact */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1.5 }}
        className="relative z-10 w-40 h-80 bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-700 shadow-2xl flex items-center justify-center"
      >
        <div className="absolute top-0 w-20 h-6 bg-black rounded-b-xl z-20"></div>
        <Lightbulb size={60} className="text-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.6)]" />
        
        {/* Screen Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent rounded-[2.5rem]" />
      </motion.div>

      {/* Floating Nodes - Tighter Orbit */}
      {[
        { x: -140, y: -70, icon: Search, color: "text-blue-500", label: "Research" },
        { x: 140, y: -70, icon: Layers, color: "text-purple-500", label: "Architecture" },
        { x: 0, y: 160, icon: Globe, color: "text-emerald-500", label: "Market" },
      ].map((item, i) => (
         <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + (i * 0.15) }}
            className="absolute flex flex-col items-center gap-2"
            style={{ transform: `translate(${item.x}px, ${item.y}px)` }}
         >
             <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-10">
                <item.icon size={24} className={item.color} />
             </div>
             <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm">
                {item.label}
             </span>
             
             {/* Connector Line */}
             <motion.div 
                className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-600 -z-10 origin-top"
                style={{ 
                    height: Math.sqrt(item.x**2 + item.y**2) - 40,
                    transform: `translate(-50%, -50%) rotate(${Math.atan2(-item.y, -item.x) * (180/Math.PI) - 90}deg) translate(0, 20px)` 
                }}
             />
         </motion.div>
      ))}

       {/* Orbit Rings - Smaller */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[420px] h-[420px] border border-slate-200 dark:border-slate-800 rounded-full opacity-50" />
           <div className="w-[300px] h-[300px] border border-dashed border-slate-300 dark:border-slate-700 rounded-full opacity-50 absolute" />
       </div>
    </div>
  );
};

const UIUXVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative perspective-1000">
            <motion.div
                className="w-72 h-[480px] bg-white dark:bg-slate-900 border-[8px] border-slate-200 dark:border-slate-700 rounded-[3rem] shadow-2xl relative overflow-hidden z-10"
                initial={{ opacity: 0, rotateY: 15 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Header Animation */}
                <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 100 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="bg-pink-100 dark:bg-pink-900/20 w-full mb-6 rounded-b-[2.5rem] relative overflow-hidden"
                >
                     <div className="absolute bottom-4 left-6 w-16 h-16 bg-white/50 rounded-full blur-xl" />
                </motion.div>

                {/* List Items Animation */}
                <div className="px-6 space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <motion.div 
                            key={i}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.8 + (i * 0.15) }}
                            className="h-16 w-full bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center px-4 gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
                            <div className="flex flex-col gap-2 w-full">
                                <div className="h-2.5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                                <div className="h-2 w-1/2 bg-slate-100 dark:bg-slate-700/50 rounded" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Action Button */}
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.6, type: "spring" }}
                    className="absolute bottom-8 right-6 w-16 h-16 bg-pink-500 rounded-full shadow-lg shadow-pink-500/40 flex items-center justify-center text-white"
                >
                    <PenTool size={28} />
                </motion.div>
            </motion.div>
            
            {/* Design Tools Palette - Floating */}
            <motion.div
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 40, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute right-[5%] top-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-3 z-20"
            >
                {["bg-pink-500", "bg-purple-500", "bg-blue-500", "bg-orange-500"].map((color, i) => (
                    <motion.div 
                        key={i} 
                        className={`w-8 h-8 ${color} rounded-full cursor-pointer hover:scale-110 transition-transform shadow-sm`} 
                        whileHover={{ scale: 1.2 }}
                    />
                ))}
            </motion.div>
        </div>
    )
}

const MobileDevVisual = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative p-4">
        <div className="relative w-full max-w-[340px] aspect-[4/5] flex items-center justify-center">
            {/* Code Editor - Background */}
            <motion.div 
                className="absolute left-4 top-4 bottom-12 w-3/4 bg-slate-900 rounded-xl shadow-xl overflow-hidden font-mono text-[8px] sm:text-[10px] border border-slate-700 z-10 origin-bottom-left"
                initial={{ x: -20, opacity: 0, rotate: -3 }}
                animate={{ x: 0, opacity: 1, rotate: -3 }}
                transition={{ duration: 0.6 }}
            >
                 <div className="bg-slate-800 px-3 py-2 flex items-center gap-1.5 border-b border-slate-700">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="ml-2 text-slate-500">App.tsx</span>
                </div>
                <div className="p-4 space-y-2 text-blue-300 leading-relaxed opacity-80">
                    <div><span className="text-pink-400">const</span> App = () ={'>'} {'{'}</div>
                    <div className="pl-3"><span className="text-purple-400">return</span> (</div>
                    <div className="pl-6 text-green-400">{'<View style={s.box}>'}</div>
                    <div className="pl-9 text-white">{'<Header />'}</div>
                    <div className="pl-9 text-yellow-300">{'<Hero />'}</div>
                    <div className="pl-6 text-green-400">{'</View>'}</div>
                    <div className="pl-3">);</div>
                    <div>{'}'}</div>
                </div>
            </motion.div>

            {/* Live Preview Device - Foreground */}
            <motion.div
                 className="absolute right-0 bottom-0 top-12 w-2/3 bg-white dark:bg-black border-[6px] border-slate-300 dark:border-slate-700 rounded-[2rem] shadow-2xl overflow-hidden z-20"
                 initial={{ x: 20, opacity: 0, y: 20 }}
                 animate={{ x: 0, opacity: 1, y: 0 }}
                 transition={{ delay: 0.3, duration: 0.6 }}
            >
                {/* Screen Content */}
                <div className="w-full h-full bg-slate-50 dark:bg-slate-900 flex flex-col relative">
                     <div className="h-12 bg-blue-500 rounded-b-2xl shrink-0" />
                     <div className="p-3 space-y-2">
                         <div className="h-20 bg-blue-100 dark:bg-blue-900/30 rounded-xl w-full" />
                         <div className="space-y-1.5">
                             {[1,2,3].map(i => (
                                 <div key={i} className="h-8 bg-white dark:bg-slate-800 rounded-lg w-full shadow-sm" />
                             ))}
                         </div>
                     </div>
                     
                     {/* Floating Badge */}
                     <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="absolute bottom-4 right-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg"
                     >
                        <Zap size={16} />
                     </motion.div>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

const QATestingVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative p-4">
             {/* Main Container constrained width */}
            <div className="relative w-full max-w-[320px] aspect-[4/5] flex items-center justify-center">
                 {/* Tablet Device - Back Left */}
                 <motion.div
                     className="absolute left-4 top-1/2 -translate-y-1/2 w-48 h-64 sm:w-56 sm:h-80 bg-white dark:bg-slate-800 border-[6px] border-slate-300 dark:border-slate-600 rounded-[1.5rem] shadow-xl z-0 flex items-center justify-center origin-center"
                     initial={{ scale: 0.8, x: -20, opacity: 0 }}
                     animate={{ scale: 1, x: 0, opacity: 1 }}
                     transition={{ duration: 0.6 }}
                 >
                     <div className="text-center opacity-20">
                        <Tablet size={48} className="mx-auto mb-3" />
                     </div>
                     
                     {/* Scanning Line */}
                     <motion.div 
                        className="absolute inset-x-0 h-0.5 bg-green-500/50 shadow-[0_0_15px_#22c55e]"
                        animate={{ top: ['10%', '90%', '10%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                     />
                 </motion.div>

                 {/* Phone Device - Front Right */}
                 <motion.div
                     className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-56 sm:w-36 sm:h-64 bg-slate-900 border-[4px] border-slate-700 rounded-[1.5rem] shadow-2xl z-10 flex items-center justify-center overflow-hidden"
                     initial={{ scale: 0.8, x: 20, opacity: 0 }}
                     animate={{ scale: 1, x: 0, opacity: 1 }}
                     transition={{ delay: 0.2, duration: 0.6 }}
                 >
                     {/* Bug Hunter Animation */}
                     <div className="relative w-full h-full bg-slate-800 flex flex-col items-center justify-center">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMzMzQxNTUiLz48L3N2Zz4=')] opacity-20"
                        />
                        
                        <div className="relative z-10 text-center">
                            <Bug size={32} className="text-red-500 mb-2 mx-auto" />
                            <motion.div 
                                className="text-[9px] font-mono text-green-400 bg-green-900/30 px-2 py-0.5 rounded"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                0 Bugs
                            </motion.div>
                        </div>
                     </div>
                 </motion.div>
                 
                 {/* Success Badge Floating */}
                 <motion.div 
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 bg-green-500 text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg whitespace-nowrap"
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 1.2, type: "spring" }}
                 >
                     <CheckCircle2 size={14} /> 
                     <span className="text-xs font-bold">QA Passed</span>
                 </motion.div>
            </div>
        </div>
    )
}

const AppLaunchVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
            {/* Rocket Container */}
            <motion.div
                className="w-72 h-72 bg-gradient-to-tr from-brand-600 to-blue-500 rounded-[3rem] shadow-2xl flex items-center justify-center z-20 relative shadow-brand-500/30"
                animate={{ y: [-15, 15] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
                <Rocket size={100} className="text-white drop-shadow-lg" />
                
                {/* Notification Badge */}
                <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold border-[6px] border-white dark:border-slate-900 shadow-xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                >
                    1
                </motion.div>
            </motion.div>

            {/* Platform Icons Orbiting */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                 <div className="absolute top-4 left-1/2 -translate-x-1/2 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700">
                     <Download size={40} className="text-slate-400" />
                 </div>
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700">
                     <Play size={40} className="text-slate-400" />
                 </div>
            </motion.div>

            {/* Celebration Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full z-0"
                    style={{ 
                        background: ['#f43f5e', '#3b82f6', '#eab308', '#a855f7'][i % 4],
                        left: '50%',
                        top: '50%'
                    }}
                    animate={{ 
                        x: (Math.random() - 0.5) * 600,
                        y: (Math.random() - 0.5) * 600,
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }}
                />
            ))}
        </div>
    )
}

// --- DATA ---
const processSteps = [
  {
    id: 1,
    title: "Strategy & Discovery",
    tagline: "Market Research",
    description: "We dive deep into your app idea, analyzing market trends and user behavior to create a roadmap that ensures your mobile application solves real problems and stands out.",
    details: ["Competitor Analysis", "User Personas", "Feature Roadmap", "Tech Stack Selection"],
    icon: <Search className="w-6 h-6" />,
    color: "text-orange-500",
    bg: "bg-orange-500",
    component: StrategyVisual
  },
  {
    id: 2,
    title: "UI/UX Design",
    tagline: "Mobile-First Design",
    description: "Designing for small screens requires precision. We create intuitive, touch-friendly interfaces that provide seamless navigation and delightful user experiences on both iOS and Android.",
    details: ["Wireframing", "Interactive Prototypes", "Gesture Design", "Design Systems"],
    icon: <PenTool className="w-6 h-6" />,
    color: "text-pink-500",
    bg: "bg-pink-500",
    component: UIUXVisual
  },
  {
    id: 3,
    title: "App Development",
    tagline: "Build & Integreate",
    description: "Our developers build robust, scalable architectures that power your mobile business, ensuring high performance and smooth functionality.",
    details: ["Frontend Development", "Backend API", "3rd Party Integration", "Offline Storage"],
    icon: <Code2 className="w-6 h-6" />,
    color: "text-blue-500",
    bg: "bg-blue-500",
    component: MobileDevVisual
  },
  {
    id: 4,
    title: "Quality Assurance",
    tagline: "Device Testing",
    description: "We test on real devices, not just simulators. From varying screen sizes to different OS versions, we ensure your app remains crash-free and performant under all conditions.",
    details: ["Real Device Testing", "Performance Profiling", "Security Audits", "Usability Testing"],
    icon: <Bug className="w-6 h-6" />,
    color: "text-violet-500",
    bg: "bg-violet-500",
    component: QATestingVisual
  },
  {
    id: 5,
    title: "Launch & Growth",
    tagline: "Store Deployment",
    description: "Navigating the App Store and Play Store submission process can be tricky. We handle the deployment, metadata optimization, and setup analytics for post-launch growth.",
    details: ["Store Submission", "ASO Basics", "Analytics Setup", "Maintenance"],
    icon: <Rocket className="w-6 h-6" />,
    color: "text-emerald-500",
    bg: "bg-emerald-500",
    component: AppLaunchVisual
  }
];

// Tech Stack updated to remove React Native, Swift, Kotlin
const techStack = [
    { name: "Flutter", icon: <Layers size={24} />, desc: "Hybrid Development" },
    { name: "Firebase", icon: <Zap size={24} />, desc: "Backend as Service" },
    { name: "GraphQL", icon: <Globe size={24} />, desc: "Data Query" },
    { name: "Node.js", icon: <Cpu size={24} />, desc: "Backend API" },
    { name: "AWS", icon: <Cloud size={24} />, desc: "Cloud Infrastructure" },
    { name: "Figma", icon: <PenTool size={24} />, desc: "UI/UX Design" },
];

const features = [
    {
        title: "Offline Mode",
        desc: "Apps that work seamlessly even when the internet connection drops, syncing data when back online.",
        icon: <Wifi className="text-blue-500" />
    },
    {
        title: "Push Notifications",
        desc: "Engage users with timely, personalized alerts directly to their home screen.",
        icon: <CheckCircle2 className="text-emerald-500" />
    },
    {
        title: "Native Performance",
        desc: "Silky smooth 60fps animations and rapid load times for a premium feel.",
        icon: <Zap className="text-orange-500" />
    }
];

const MobileDevelopment: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-play the process slider
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
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
             <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="mobile-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mobile-grid)" className="text-slate-900 dark:text-white" />
             </svg>
         </div>

         <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Hero Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <Smartphone size={14} /> Mobile Excellence
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                        Transform Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Digital Reality</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-xl">
                        We craft high-performance mobile applications that drive growth and deliver exceptional user experiences across all devices.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2">
                            Start Your Project <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            View Portfolio
                        </button>
                    </div>
                </motion.div>

                {/* Hero Visual */}
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
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden">
         {/* Flow Background */}
         <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M-100 400 C 200 400, 400 100, 720 400 C 1040 700, 1240 400, 1540 400" stroke="url(#gradient-path)" strokeWidth="4" strokeDasharray="10 10"/>
                <defs>
                    <linearGradient id="gradient-path" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
            </svg>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Development Process</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        A structured approach to ensure your app is built on time, within budget, and to the highest standards.
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
                            {/* Big Watermark Number */}
                            <div 
                                className="absolute -top-24 -left-10 text-[180px] lg:text-[240px] font-black text-slate-200/50 dark:text-slate-800/50 select-none z-0 leading-none"
                                style={{ WebkitTextStroke: '2px rgba(148, 163, 184, 0.2)' }}
                            >
                                0{activeStep + 1}
                            </div>

                            <div className="relative z-10">
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${processSteps[activeStep].bg} bg-opacity-10 border border-${processSteps[activeStep].color.split('-')[1]}-200 dark:border-${processSteps[activeStep].color.split('-')[1]}-800 text-xs font-bold uppercase tracking-widest ${processSteps[activeStep].color.replace('text', 'text')} mb-6`}
                                >
                                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                    {processSteps[activeStep].tagline}
                                </motion.div>
                                
                                <motion.h3 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight"
                                >
                                    {processSteps[activeStep].title}
                                </motion.h3>
                                
                                <motion.p 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg"
                                >
                                    {processSteps[activeStep].description}
                                </motion.p>

                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
                                >
                                    {processSteps[activeStep].details.map((detail, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 shadow-sm">
                                            <div className={`w-8 h-8 rounded-lg ${processSteps[activeStep].bg} bg-opacity-10 flex items-center justify-center ${processSteps[activeStep].color.replace('text', 'text')}`}>
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{detail}</span>
                                        </div>
                                    ))}
                                </motion.div>

                                <motion.button 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                                    className={`group inline-flex items-center gap-3 px-8 py-4 ${processSteps[activeStep].bg} text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1`}
                                >
                                    Start This Step <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Visual Side */}
                        <div className="order-1 lg:order-2 h-[500px] lg:h-[600px] w-full relative flex items-center justify-center">
                                {/* Ambient Glow */}
                                <motion.div 
                                    className={`absolute inset-0 m-auto w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 ${processSteps[activeStep].bg}`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 0.2 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                />
                                <ActiveComponent />
                        </div>
                    </motion.div>
                </AnimatePresence>

                 {/* Navigation Controls */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end pointer-events-none lg:px-0 z-20 h-full">
                     <button 
                        onClick={prevStep}
                        className="pointer-events-auto p-4 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:scale-110 absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-16"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={nextStep}
                        className="pointer-events-auto p-4 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:scale-110 absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-16"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
                
                 {/* Pagination Dots */}
                <div className="flex justify-center mt-12 gap-3 relative z-30">
                    {processSteps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveStep(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === activeStep 
                                ? `${processSteps[activeStep].bg} w-10`
                                : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                            }`}
                            aria-label={`Go to step ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
         </div>
      </section>

      {/* --- TECH STACK SECTION --- */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Mobile Tech Stack</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        We leverage powerful technologies to build secure and scalable mobile solutions.
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
                        className="group flex flex-col items-center gap-3 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg transition-all duration-300"
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
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-600">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {feature.desc}
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
                            <CheckCircle2 size={16} />
                            <span>Native Quality</span>
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
                className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/30"
            >
                {/* Decor */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 relative z-10 tracking-tight">
                    Have an app idea? <br className="hidden md:block"/>Let's build it together.
                </h2>
                <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light">
                    From concept to the App Store, we provide end-to-end mobile development services.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg active:scale-95">
                        Get a Free Quote
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg border border-white/30 hover:bg-white/10 text-white transition-colors">
                        Our Portfolio
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default MobileDevelopment;