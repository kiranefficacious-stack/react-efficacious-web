import React from 'react';
import { motion } from 'framer-motion';

const FirebaseLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full mb-6"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-slate-600 dark:text-slate-400 font-medium tracking-wide animate-pulse"
      >
        Connecting to the cloud...
      </motion.p>
    </div>
  );
};

export default FirebaseLoader;
