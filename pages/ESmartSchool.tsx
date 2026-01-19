import React from 'react';
import { motion as m } from 'framer-motion';
import { 
  GraduationCap, Users, Bus, FileText, Calendar, 
  BarChart3, Bell, ArrowRight, BookOpen, Library, 
  CheckCircle2, Monitor, CreditCard, ArrowDown
} from 'lucide-react';
import PhoneMockup from '../components/PhoneMockup';
import Contact from '../components/Contact';
import { useContent } from '../hooks/useContent';

const motion = m as any;

const LucideIcons: any = { 
  GraduationCap, Users, Bus, FileText, Calendar, 
  BarChart3, Bell, ArrowRight, BookOpen, Library, 
  CheckCircle2, Monitor, CreditCard, ArrowDown
};

const ESmartSchool: React.FC = () => {
  const { data } = useContent();
  const product = data.products.find((p: any) => p.id === 1);

  if (!product) return null;

  const features = product.features || [];
  const modules = product.modules || [];
  const stats = product.stats || [];

  return (
    <div className="w-full bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-600">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-700/90"></div>
         
         <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider mb-6">
                    <GraduationCap size={16} /> Education ERP
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                    {product.heroTitle || product.title}
                </h1>
                <p className="text-lg lg:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                    {product.heroSubtitle || product.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-brand-700 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2">
                        Explore Features <ArrowRight size={20} />
                    </button>
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                        Download Brochure
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
              const FeatureIcon = LucideIcons[feature.iconName] || Monitor;
              return (
                <section key={feature.id} className="py-24 lg:py-32 relative overflow-hidden">
                    {/* Alternating Backgrounds */}
                    {index % 2 === 1 && (
                        <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-800/30 -z-10" />
                    )}
                    
                    {/* Decorative Blobs */}
                    <div className={`absolute top-1/2 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} -translate-y-1/2 w-96 h-96 ${feature.color.replace('bg-', 'bg-').replace('500', '200')} dark:opacity-10 opacity-20 blur-[100px] rounded-full -z-10`} />

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
                                    <span className="text-6xl font-black text-slate-200 dark:text-slate-800/50 select-none">
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
                                        <div key={i} className="flex items-center gap-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                            <CheckCircle2 size={20} className={feature.textAccent} />
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
                                    
                                    {/* Phone Mockup with specific ID */}
                                    <div className="transform scale-[0.85] lg:scale-100 origin-center transition-transform duration-500 flex-shrink-0 w-[280px] h-[560px] lg:w-[320px] lg:h-[640px]">
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
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Comprehensive Modules</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      Everything you need to run an educational institution efficiently.
                  </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {modules.map((mod: any, i: number) => {
                      const ModIcon = LucideIcons[mod.iconName] || Users;
                      return (
                        <motion.div 
                            key={i}
                            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl flex flex-col items-center gap-3 text-center border border-slate-100 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="text-brand-500 dark:text-brand-400">
                                <ModIcon size={24} />
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{mod.title}</span>
                        </motion.div>
                      );
                  })}
              </div>
          </div>
      </section>

      {/* --- STATS / TRUST --- */}
      <section className="py-20 bg-brand-50 dark:bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                  {stats.map((stat: any, i: number) => (
                    <div key={i} className={`p-6 ${i === 1 ? 'border-y md:border-y-0 md:border-x border-slate-200 dark:border-slate-700' : ''}`}>
                        <div className="text-4xl font-black text-brand-600 dark:text-brand-400 mb-2">{stat.value}</div>
                        <div className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      <Contact />
    </div>
  );
};

export default ESmartSchool;