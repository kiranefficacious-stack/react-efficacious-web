
import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Cloud, Brain, Shield, Code } from 'lucide-react';

const TechExcellence: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Engineering <span className="text-[#E48100] dark:text-[#E48100">Digital Excellence</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We leverage the latest technologies to build robust, scalable, and future-proof software solutions for businesses worldwide.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Custom Software (Large) */}
          <motion.div 
            className="md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Code size={180} />
            </div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                    <Monitor size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Custom Software Development</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed max-w-lg">
                    We build tailored enterprise-grade software that streamlines your operations and solves complex business challenges. From CRM to ERP, we architect solutions that fit your unique needs perfectly.
                </p>
                <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', '.NET', 'Python'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
          </motion.div>

          {/* Card 2: Mobile Apps */}
<motion.div 
  className="bg-gradient-to-br from-[#E48100] to-[#B91C1C] rounded-3xl p-8 text-white shadow-xl shadow-[#E48100]/20 relative overflow-hidden group"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 }}
>
   {/* Animated decorative glow - turns a light orange on hover */}
   <div className="absolute -bottom-4 -right-4 bg-white/20 rounded-full w-32 h-32 blur-3xl group-hover:bg-[#E48100]/40 group-hover:scale-150 transition-all duration-700" />
   
   {/* Icon Container: Glass effect that lets the orange/red shine through */}
   <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
      <Smartphone size={24} className="text-white" />
   </div>
   
   <h3 className="text-xl font-bold mb-3">Mobile App Development</h3>
   
   {/* Clean white text with slight transparency for a modern look */}
   <p className="text-white/90 text-sm mb-6 leading-relaxed">
       Native and cross-platform mobile experiences that engage users and drive growth. iOS, Android, and Flutter experts.
   </p>

   {/* Optional: Subtle accent line at the bottom that appears on hover */}
   <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-0 group-hover:w-full transition-all duration-500" />
</motion.div>

          {/* Card 3: Cloud */}
          <motion.div 
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
             <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Cloud size={24} />
             </div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Cloud Solutions</h3>
             <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                 Secure, scalable cloud infrastructure setup and migration services on AWS, Azure, and Google Cloud.
             </p>
          </motion.div>

          {/* Card 4: AI & Innovation */}
          <motion.div 
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
             <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Brain size={24} />
             </div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI & ML Integration</h3>
             <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                 Leverage the power of Artificial Intelligence to automate processes and gain predictive insights.
             </p>
          </motion.div>

          {/* Card 5: Security */}
          <motion.div 
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
             <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 group-hover:scale-110 transition-transform">
                <Shield size={24} />
             </div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Cybersecurity</h3>
             <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                 Robust security protocols and audits to protect your data and ensure compliance with global standards.
             </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TechExcellence;
