import React from 'react';
import { motion as m } from 'framer-motion';
import { 
  Truck, MapPin, Navigation, BarChart3, Bell, 
  ArrowRight, ShieldCheck, Fuel, Settings, Users,
  Clock, AlertTriangle, Route, Activity, Smartphone, ArrowDown
} from 'lucide-react';
import PhoneMockup from '../components/PhoneMockup';
import Contact from '../components/Contact';
import { useContent } from '../hooks/useContent';

const motion = m as any;

const LucideIcons: any = { 
  Truck, MapPin, Navigation, BarChart3, Bell, 
  ArrowRight, ShieldCheck, Fuel, Settings, Users,
  Clock, AlertTriangle, Route, Activity, Smartphone, ArrowDown
};

const ESmartTrack: React.FC = () => {
  const { data } = useContent();
  const product = data.products.find((p: any) => p.id === 2);

  if (!product) return null;

  const features = product.features || [];
  const modules = product.modules || [];
  const stats = product.stats || [];

  return (
    <div className="w-full bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0f172a]">
         {/* Background Map Pattern */}
         <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid-map-hero" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-500" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-map-hero)" />
            </svg>
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
         
         <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-xs font-bold uppercase tracking-wider mb-6 text-blue-300">
                    <Truck size={16} /> Intelligent Logistics
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                    {product.heroTitle || product.title}
                </h1>
                <p className="text-lg lg:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                    {product.heroSubtitle || product.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-2">
                        Get Started <ArrowRight size={20} />
                    </button>
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                        Live Demo
                    </button>
                </div>
            </motion.div>
         </div>

         {/* Scroll Indicator */}
         <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
         >
            <ArrowDown size={32} />
         </motion.div>
      </section>

      {/* --- FEATURES ZIG-ZAG SECTION --- */}
      <div id="features" className="flex flex-col">
          {features.map((feature: any, index: number) => {
              const FeatureIcon = LucideIcons[feature.iconName] || MapPin;
              return (
                <section key={feature.id} className="py-24 lg:py-32 relative overflow-hidden">
                    {/* Alternating Backgrounds */}
                    {index % 2 === 1 && (
                        <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/30 -z-10" />
                    )}
                    
                    {/* Decorative Blobs */}
                    <div className={`absolute top-1/2 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} -translate-y-1/2 w-96 h-96 ${feature.color.replace('bg-', 'bg-').replace('600', '500')} opacity-10 blur-[100px] rounded-full -z-10`} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            
                            {/* Text Content */}
                            <motion.div 
                                className="flex-1 space-y-8"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            >
                                {/* Icon & Number */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${feature.color}`}>
                                        <FeatureIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-6xl font-black text-slate-200 dark:text-slate-700/50 select-none">
                                        0{index + 1}
                                    </span>
                                </div>

                                <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                                    {feature.title}
                                </h3>
                                
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {feature.description}
                                </p>

                                <div className="space-y-4">
                                    {feature.details.map((detail: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm">
                                            <ShieldCheck size={20} className={feature.textAccent} />
                                            <span className="font-semibold text-slate-700 dark:text-slate-200">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Phone Visual */}
                            <motion.div 
                                className="flex-1 flex justify-center items-center w-full"
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                            >
                                <div className="relative">
                                    {/* Glow behind phone */}
                                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${feature.color.replace('bg-', 'bg-')} opacity-20 blur-[60px] rounded-full`} />
                                    
                                    {/* Phone Mockup with specific ID (Using 1 for Truck view) */}
                                    <div className="transform scale-[0.85] lg:scale-100 origin-center transition-transform duration-500">
                                        <PhoneMockup activeSlide={feature.id} />
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>
              );
          })}
      </div>

      {/* --- MODULES GRID --- */}
      <section className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Complete Fleet Ecosystem</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      More than just tracking. A comprehensive suite of tools to manage your logistics business.
                  </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {modules.map((mod: any, i: number) => {
                      const ModIcon = LucideIcons[mod.iconName] || Navigation;
                      return (
                        <motion.div 
                            key={i}
                            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl flex flex-col items-center gap-3 text-center border border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group cursor-default"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                <ModIcon size={24} />
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{mod.title}</span>
                        </motion.div>
                      );
                  })}
              </div>
          </div>
      </section>

      {/* --- STATS STRIP --- */}
      <section className="py-20 bg-blue-600 dark:bg-blue-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-500/50 dark:divide-blue-800">
                  {stats.map((stat: any, i: number) => (
                    <div key={i} className="p-6">
                        <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                        <div className="text-blue-100 font-medium">{stat.label}</div>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      <Contact />
    </div>
  );
};

export default ESmartTrack;