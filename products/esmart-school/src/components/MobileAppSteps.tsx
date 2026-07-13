import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Download, UserCheck, BellRing } from 'lucide-react';
import { useState, useEffect } from 'react';

const steps = [
  {
    icon: Download,
    title: 'Download the App',
    description: 'Available on both iOS App Store and Google Play Store for Students, Faculties, and Staff.',
  },
  {
    icon: UserCheck,
    title: 'Secure OTP Login',
    description: 'Login seamlessly using your registered mobile number and a secure one-time password.',
  },
  {
    icon: BellRing,
    title: 'Enable Notifications',
    description: 'Stay updated with real-time push notifications for classes, exams, and important announcements.',
  },
  {
    icon: Smartphone,
    title: 'Daily Dashboard',
    description: 'Access everything securely—from your daily timetable to semester results—on your mobile.',
  },
];

const screenshots = [
  { src: '/esmart-school/screenshots/app-home.jpeg',       label: 'Home Dashboard' },
  { src: '/esmart-school/screenshots/app-schedule.jpeg',   label: 'My Schedule' },
  { src: '/esmart-school/screenshots/app-attendance.jpeg', label: 'Attendance & Leave' },
  { src: '/esmart-school/screenshots/app-profile.jpeg',    label: 'Teacher Profile' },
  { src: '/esmart-school/screenshots/app-content.jpeg',    label: 'Daily Content' },
];

export function MobileAppSteps() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % screenshots.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="py-20 lg:py-28 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Steps column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight transition-colors duration-300">
              Stay Connected Anywhere, <br className="hidden lg:block" />
              <span className="text-primary-600 dark:text-primary-500">Anytime.</span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed transition-colors duration-300 max-w-lg">
              The eSMARTs mobile application ensures that parents, teachers, and admins have real-time access to critical school data in the palm of their hands.
            </p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-5 relative group">
                  {index !== steps.length - 1 && (
                    <div className="absolute left-[26px] top-12 bottom-[-16px] w-[2px] bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors"></div>
                  )}
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 text-primary-600 dark:text-primary-400 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center relative z-10 transition-all group-hover:scale-110 group-hover:shadow-md group-hover:border-primary-200 dark:group-hover:border-primary-800">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="pt-2 pb-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 transition-colors duration-300">{step.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300 leading-relaxed max-w-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phone Mockup with real screenshots */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-[280px] lg:w-[300px] lg:ml-auto mt-10 lg:mt-0 flex flex-col items-center gap-4"
          >
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[85%] bg-gradient-to-tr from-primary-600/30 to-blue-500/30 rounded-[3rem] blur-3xl opacity-40 dark:opacity-20 -z-10"></div>

            {/* Phone Frame */}
            <div
              className="w-full border-[10px] border-slate-900 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl relative bg-white"
              style={{ aspectRatio: '9/19.5' }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[18px] bg-slate-900 dark:bg-slate-800 rounded-b-2xl z-20"></div>
              {/* Side buttons */}
              <div className="h-[32px] w-[3px] bg-slate-900 dark:bg-slate-800 absolute -left-[3px] top-[80px] rounded-l-lg z-20"></div>
              <div className="h-[32px] w-[3px] bg-slate-900 dark:bg-slate-800 absolute -left-[3px] top-[120px] rounded-l-lg z-20"></div>
              <div className="h-[46px] w-[3px] bg-slate-900 dark:bg-slate-800 absolute -right-[3px] top-[100px] rounded-r-lg z-20"></div>

              {/* Screenshot carousel */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={screenshots[activeIndex].src}
                  alt={`eSMARTs App – ${screenshots[activeIndex].label}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>
            </div>

            {/* Screen label */}
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 text-center tracking-wide">
              {screenshots[activeIndex].label}
            </p>

            {/* Dot indicators */}
            <div className="flex gap-2 items-center">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View ${screenshots[i].label}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-6 h-2.5 bg-primary-600'
                      : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-primary-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}