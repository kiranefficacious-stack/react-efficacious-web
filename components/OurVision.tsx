import React from 'react';
import { motion as m } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const motion = m as any;

const OurVision: React.FC = () => {
  const { data } = useContent();
  const { vision } = data.about;

  return (
    <motion.div 
        className="bg-white dark:bg-slate-800 p-10 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow h-full relative overflow-hidden group"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
    >
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
            <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Lightbulb size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{vision.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {vision.content}
            </p>
            {vision.points && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {vision.points.map((point: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold rounded-full">
                            {point}
                        </span>
                    ))}
                </div>
            )}
        </div>
    </motion.div>
  );
};

export default OurVision;