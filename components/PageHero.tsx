import React from 'react';
import { motion as m } from 'framer-motion';

const motion = m as any;

interface PageHeroProps {
  title: string;
  subtitle: string;
  bgGradient?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ 
  title, 
  subtitle, 
  bgGradient = "from-brand-600 to-purple-700" 
}) => {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden bg-slate-50 dark:bg-dark-bg">
      <div className="absolute inset-0 z-0">
         <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-5 dark:opacity-10`} />
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            {title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PageHero;