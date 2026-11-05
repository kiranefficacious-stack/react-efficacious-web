import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, LogOut, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const InactivityModal: React.FC = () => {
  const { inactivityWarning, secondsRemaining, resetInactivityTimer, logout } = useAuth();

  if (!inactivityWarning) return null;

  const progressPercent = Math.min(100, Math.max(0, (secondsRemaining / 60) * 100));

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inactivity-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700/60 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-800 dark:text-slate-100"
        >
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 id="inactivity-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                  Session Inactivity Warning
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                <ShieldAlert size={13} className="text-amber-500" />
                Security policy: 15-minute idle limit
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="mt-5 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              No activity has been detected in the admin portal. To protect your account and data, your session will automatically log out in:
            </p>
            
            <div className="mt-3 py-2 flex items-center justify-center gap-2 bg-white/70 dark:bg-slate-900/60 rounded-lg border border-amber-200/50 dark:border-amber-800/30">
              <span className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
                {secondsRemaining}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                seconds remaining
              </span>
            </div>

            {/* Countdown bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => logout('manual')}
              className="flex-1 order-2 sm:order-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium transition flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Log Out Now
            </button>
            <button
              type="button"
              onClick={resetInactivityTimer}
              className="flex-1 order-1 sm:order-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={16} />
              Stay Logged In
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InactivityModal;

