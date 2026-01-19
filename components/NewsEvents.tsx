import React from 'react';
import { motion as m } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const motion = m as any;

import { useContent } from '../hooks/useContent';

const NewsEvents: React.FC = () => {
  const { data } = useContent();
  const newsItems = data.news;

  return (
    <section id="news" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 text-brand-600 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                    </span>
                    <span>What's New</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">News & Events</h2>
            </motion.div>
            
            <motion.button 
                className="hidden md:flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                View All Updates <ArrowRight size={20} />
            </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.color} backdrop-blur-md shadow-sm`}>
                                {item.category}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium mb-3">
                            <Calendar size={14} />
                            <span>{item.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                            {item.excerpt}
                        </p>
                        <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2 transition-all">
                            Read Full Story <ArrowRight size={16} />
                        </a>
                    </div>
                </motion.div>
            ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
             <button className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
                View All Updates <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;