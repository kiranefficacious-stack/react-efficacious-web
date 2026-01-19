import React from 'react';
import { motion as m } from 'framer-motion';

const motion = m as any;

const ThreeDObject: React.FC = () => {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 perspective-1000">
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ 
          rotateY: [-15, 15],
          y: [-15, 15]
        }}
        transition={{ 
          rotateY: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
          y: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }}
      >
        {/* ROBOT CHARACTER CONTAINER - Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 preserve-3d">
            
            {/* HEAD */}
            <div className="absolute w-32 h-32 left-4 top-4 preserve-3d">
                {/* Front Face (Face) */}
                <div className="absolute inset-0 bg-white dark:bg-slate-800 border-2 border-brand-500 rounded-2xl transform translate-z-[64px] flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                    {/* Screen/Face */}
                    <div className="w-24 h-20 bg-slate-900 rounded-lg relative flex items-center justify-center gap-4 border border-slate-700 overflow-hidden">
                        {/* Digital Scan Line */}
                        <motion.div 
                          className="absolute w-full h-[2px] bg-brand-500/50"
                          animate={{ top: ['0%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Eyes */}
                        <motion.div 
                            className="w-5 h-5 bg-brand-400 rounded-full shadow-[0_0_15px_#38bdf8] relative z-10" 
                            animate={{ scaleY: [1, 0.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                        >
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-70" />
                        </motion.div>
                        <motion.div 
                            className="w-5 h-5 bg-brand-400 rounded-full shadow-[0_0_15px_#38bdf8] relative z-10" 
                            animate={{ scaleY: [1, 0.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                        >
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-70" />
                        </motion.div>
                        
                        {/* Smile */}
                        <div className="absolute bottom-4 w-6 h-3 border-b-2 border-brand-500 rounded-full" />
                    </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-2xl transform -translate-z-[64px] rotate-180 flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-dashed border-slate-300 dark:border-slate-600 rounded-full animate-spin-slow" />
                </div>

                {/* Right Face */}
                <div className="absolute inset-0 bg-slate-50 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-2xl w-[128px] transform rotate-y-90 translate-z-[64px] translate-x-[0px] flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-300 dark:border-slate-600 border-t-brand-500" />
                </div>

                {/* Left Face */}
                <div className="absolute inset-0 bg-slate-50 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-2xl w-[128px] transform -rotate-y-90 translate-z-[64px] translate-x-[0px] flex items-center justify-center">
                     <div className="w-16 h-16 rounded-full border-4 border-slate-300 dark:border-slate-600 border-t-brand-500" />
                </div>

                {/* Top Face */}
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-2xl h-[128px] transform rotate-x-90 translate-z-[64px] flex items-center justify-center">
                    {/* Antenna Base */}
                    <div className="w-12 h-12 bg-slate-300 dark:bg-slate-600 rounded-full border-4 border-slate-200 dark:border-slate-500" />
                </div>

                {/* Bottom Face */}
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-2xl h-[128px] transform -rotate-x-90 translate-z-[64px]" />
            </div>

            {/* ANTENNA */}
            <motion.div 
                className="absolute left-1/2 -top-16 -translate-x-1/2 w-2 h-20 preserve-3d origin-bottom"
                animate={{ rotateZ: [-8, 8] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
                <div className="w-1.5 h-full bg-gradient-to-t from-slate-400 to-slate-300 mx-auto rounded-full" />
                <motion.div 
                  className="w-5 h-5 bg-red-500 rounded-full absolute -top-2 left-1/2 -translate-x-1/2 shadow-[0_0_20px_#ef4444]"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
            </motion.div>

            {/* FLOATING RINGS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-brand-500/30 rounded-full transform rotate-x-70 animate-[spin_8s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-2 border-dashed border-purple-500/30 rounded-full transform rotate-x-70 animate-[spin_12s_linear_infinite_reverse]" />
            
            {/* SHADOW */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/10 dark:bg-black/30 blur-xl rounded-[100%] transform rotate-x-70" />

        </div>
      </motion.div>
    </div>
  );
};

export default ThreeDObject;