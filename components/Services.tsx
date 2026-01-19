import React from 'react';
import { motion as m } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

const motion = m as any;

const getColorClasses = (color: string) => {
    const map: Record<string, { bg: string, text: string, border: string, dot: string, lightBg: string }> = {
        blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800", dot: "text-blue-500", lightBg: "hover:bg-blue-50 dark:hover:bg-blue-900/10" },
        indigo: { bg: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-200 dark:border-indigo-800", dot: "text-indigo-500", lightBg: "hover:bg-indigo-50 dark:hover:bg-indigo-900/10" },
        pink: { bg: "bg-pink-50 dark:bg-pink-900/20", text: "text-pink-600 dark:text-pink-400", border: "border-pink-200 dark:border-pink-800", dot: "text-pink-500", lightBg: "hover:bg-pink-50 dark:hover:bg-pink-900/10" },
        emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800", dot: "text-emerald-500", lightBg: "hover:bg-emerald-50 dark:hover:bg-emerald-900/10" },
        orange: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800", dot: "text-orange-500", lightBg: "hover:bg-orange-50 dark:hover:bg-orange-900/10" },
        violet: { bg: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-600 dark:text-violet-400", border: "border-violet-200 dark:border-violet-800", dot: "text-violet-500", lightBg: "hover:bg-violet-50 dark:hover:bg-violet-900/10" },
        cyan: { bg: "bg-cyan-50 dark:bg-cyan-900/20", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-200 dark:border-cyan-800", dot: "text-cyan-500", lightBg: "hover:bg-cyan-50 dark:hover:bg-cyan-900/10" },
    }
    return map[color] || map['blue'];
}

const Services: React.FC = () => {
  const { data } = useContent();
  const services = data.services;

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-dark-bg relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles size={14} className="fill-brand-500 text-brand-500" />
              <span>Our Expertise</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600 dark:from-brand-400 dark:to-purple-400">Services</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              We leverage cutting-edge technology and creative strategies to deliver comprehensive solutions that drive growth and efficiency.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8">
          {services.map((service, index) => {
             const style = getColorClasses(service.color || 'blue');
             
             return (
            <motion.div
              key={index}
              className={`group relative bg-white dark:bg-slate-800 rounded-[2rem] p-8 lg:p-10 shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-700/50 transition-all duration-300 flex flex-col md:flex-row gap-8 lg:gap-12 overflow-hidden ${style.lightBg}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Left Column: Icon & Title */}
              <div className="md:w-1/3 flex flex-col items-start">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${style.bg} ${style.text} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm mb-6`}>
                    {(() => {
                      const IconComp = (LucideIcons as any)[service.iconName];
                      return IconComp ? <IconComp className="w-10 h-10" /> : null;
                    })()}
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {service.title}
                  </h3>

                  <Link to={service.href} className="mt-auto inline-flex items-center gap-2 font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
              </div>
              
              {/* Right Column: Description & Deliverables */}
              <div className="md:w-2/3">
                  <div className="prose dark:prose-invert max-w-none mb-8">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                        {service.description}
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Key Deliverables</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {service.deliverables?.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                                <CheckCircle2 size={20} className={`${style.dot} shrink-0 mt-0.5`} />
                                <span className="font-medium">{feature}</span>
                            </div>
                        ))}
                      </div>
                  </div>
              </div>
              
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
};

export default Services;
