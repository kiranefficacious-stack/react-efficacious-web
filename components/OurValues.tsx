import React from 'react';
import { motion as m } from 'framer-motion';
import { Heart, Shield, Zap, Users } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const motion = m as any;

const LucideIcons: any = { Heart, Shield, Zap, Users, ShieldCheck: Shield, Lightbulb: Zap };

const OurValues: React.FC = () => {
  const { data } = useContent();
  const values = data.about.values;

  return (
    <section className="py-24 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Core Values</h2>
          <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val: any, index: number) => {
            const IconComponent = LucideIcons[val.iconName || 'Shield'] || Shield;
            return (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4">
                  <IconComponent className="w-8 h-8 text-brand-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{val.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurValues;