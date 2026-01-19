
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Rocket, ArrowRight, Database, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const SoftwareHero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white pt-20 transition-colors duration-300">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid - Adaptive Color */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        {/* Glowing Orbs */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-400/20 dark:bg-brand-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              #1 Software Development Company
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              India's Leading <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-blue-600 to-purple-600 dark:from-brand-400 dark:via-blue-400 dark:to-purple-400">
                Software Developer.
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-xl">
              We engineer scalable, secure, and innovative digital solutions. From custom enterprise software to cutting-edge mobile apps, we build the technology that powers your future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="px-8 py-4 bg-brand-600 hover:bg-brand-700 dark:hover:bg-brand-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 flex items-center justify-center gap-2 group">
                Start Your Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="px-8 py-4 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold transition-all flex items-center justify-center">
                Explore Services
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-slate-200 dark:border-slate-800 pt-8">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">10+</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">500+</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">100%</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>

          {/* Abstract Tech Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:flex items-center justify-center h-[600px]"
          >
            {/* Central Core */}
            <motion.div 
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-64 h-64 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col items-center justify-center p-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Code2 size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Custom Dev</h3>
              <p className="text-slate-500 dark:text-slate-400 text-center text-sm mt-2">Tailored solutions for complex needs.</p>
              
              {/* Spinning Ring */}
              <div className="absolute inset-0 -z-10 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl animate-[spin_10s_linear_infinite]" />
            </motion.div>

            {/* Floating Nodes */}
            <FloatingNode icon={<Globe />} label="Web Apps" x={-160} y={-100} delay={0} color="bg-blue-500" />
            <FloatingNode icon={<Cpu />} label="AI Systems" x={160} y={-120} delay={1} color="bg-purple-500" />
            <FloatingNode icon={<Database />} label="Big Data" x={-140} y={140} delay={2} color="bg-emerald-500" />
            <FloatingNode icon={<Layers />} label="Full Stack" x={180} y={100} delay={3} color="bg-orange-500" />

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30">
               <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="1" strokeDasharray="5,5" />
               <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="1" strokeDasharray="5,5" />
               <line x1="50%" y1="50%" x2="28%" y2="70%" stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="1" strokeDasharray="5,5" />
               <line x1="50%" y1="50%" x2="72%" y2="65%" stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="1" strokeDasharray="5,5" />
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const FloatingNode = ({ icon, label, x, y, delay, color }: any) => (
  <motion.div
    className="absolute z-20"
    style={{ x, y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1, y: y + 15 }}
    transition={{ 
      opacity: { delay: 0.5 + delay * 0.2, duration: 0.5 },
      scale: { delay: 0.5 + delay * 0.2, type: "spring" },
      y: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: delay * 0.5 }
    }}
  >
    <div className={`flex items-center gap-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 pr-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl`}>
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white shadow-lg`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <span className="font-bold text-slate-800 dark:text-white text-sm">{label}</span>
    </div>
  </motion.div>
);

export default SoftwareHero;
