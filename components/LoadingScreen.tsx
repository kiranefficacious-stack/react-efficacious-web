import React from 'react';
import { motion as m } from 'framer-motion';

const motion = m as any;

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-dark-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <motion.div
          className="w-24 h-24 border-4 border-brand-200 dark:border-slate-700 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner spinning arc */}
        <motion.div
          className="absolute w-24 h-24 border-t-4 border-brand-600 dark:border-brand-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Logo E */}
        <motion.div
          className="absolute text-4xl font-bold text-brand-700 dark:text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          E
        </motion.div>
      </div>

      <motion.h2
        className="mt-6 text-xl font-semibold text-slate-700 dark:text-slate-200 tracking-widest"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        EFFICACIOUS
      </motion.h2>
      <motion.p
        className="text-sm text-slate-500 dark:text-slate-400 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Safe • Secure • Easy
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;