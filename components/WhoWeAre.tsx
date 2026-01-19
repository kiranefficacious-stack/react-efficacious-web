import React from 'react';
import { motion as m } from 'framer-motion';
import { useContent } from '../hooks/useContent';

const motion = m as any;

const WhoWeAre: React.FC = () => {
  const { data } = useContent();
  const { whoWeAre } = data.about;

  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-700 relative z-10">
                         <img 
                            src={whoWeAre.image} 
                            alt={whoWeAre.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl -z-0" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-0" />
                    
                    <motion.div 
                        className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-xs hidden md:block z-20"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-1">{whoWeAre.yearsExperience}</p>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Years of delivering excellence in ERP solutions.</p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 text-brand-600 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6">
                        <span>Since 2012</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                        {whoWeAre.title}
                    </h2>
                    <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                        {whoWeAre.content.map((p: string, i: number) => (
                            <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/Mr\. Kamal Agrawal|ERP solutions for schools and education institutes/g, match => `<span class="${match === 'Mr. Kamal Agrawal' ? 'font-semibold text-slate-900 dark:text-white' : 'text-brand-600 dark:text-brand-400 font-semibold'}">${match}</span>`) }} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
  );
};

export default WhoWeAre;