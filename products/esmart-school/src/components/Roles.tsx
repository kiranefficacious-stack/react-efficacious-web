import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, Users, GraduationCap, Building2, Server, Globe2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const roles = [
  {
    id: 'admin',
    title: 'Administrators',
    icon: Building2,
    color: 'from-blue-500 to-indigo-600',
    colorLight: 'text-blue-400',
    features: ['Profile Creation', 'Transport Management', 'Fee Management', 'Library & Assets', 'Examination Scheduling']
  },
  {
    id: 'teacher',
    title: 'Teachers',
    icon: UserCheck,
    color: 'from-primary-500 to-primary-700',
    colorLight: 'text-primary-400',
    features: ['Attendance Monitoring', 'Leave Approvals', 'Event Calendar', 'Assignment Management', 'Parent Interaction']
  },
  {
    id: 'student',
    title: 'Students',
    icon: GraduationCap,
    color: 'from-amber-500 to-orange-600',
    colorLight: 'text-amber-400',
    features: ['Syllabus Information', 'Group Messaging', 'Event Calendar', 'Leave Application', 'Attendance Check']
  },
  {
    id: 'parent',
    title: 'Parents',
    icon: Users,
    color: 'from-rose-500 to-pink-600',
    colorLight: 'text-rose-400',
    features: ['Child Attendance', 'Online Fee Payment', 'Teacher Interaction', 'Exam Schedules', 'Tracking Alerts']
  }
];

export function Roles() {
  const [activeRole, setActiveRole] = useState(roles[0]);

  return (
    <div id="roles" className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 opacity-80"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-100/50 dark:bg-primary-900/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 transition-colors"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold tracking-wide mb-6 shadow-sm"
          >
             <Globe2 className="h-4 w-4 text-primary-600 dark:text-primary-400" />
             <span>Centralized Architecture</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white"
          >
            How It Works: <br className="sm:hidden" />
            <span className="text-primary-600 dark:text-primary-500">Connected Ecosystem</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            A robust local or web server seamlessly connects all stakeholders through dedicated, secure individual logins, enabling real-time interaction across any device.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-3"
          >
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role)}
                className={`w-full text-left p-4 rounded-2xl transition-all flex items-center gap-4 group ${
                  activeRole.id === role.id 
                    ? 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-[0_0_30px_-5px_rgba(45,133,112,0.15)] dark:shadow-[0_0_30px_-5px_rgba(45,133,112,0.3)] shadow-primary-200/50 dark:shadow-primary-900/50 border' 
                    : 'bg-transparent border-transparent border hover:bg-white/50 dark:hover:bg-slate-800/40 hover:border-slate-200 dark:hover:border-slate-800'
                }`}
              >
                <div className={`p-3.5 rounded-xl transition-all duration-300 ${activeRole.id === role.id ? `bg-gradient-to-br ${role.color} shadow-lg scale-110` : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:scale-110'}`}>
                  <role.icon className={`w-6 h-6 ${activeRole.id === role.id ? 'text-white' : ''}`} />
                </div>
                <div>
                   <span className={`font-bold text-lg block transition-colors ${activeRole.id === role.id ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
                     {role.title} Portal
                   </span>
                   {activeRole.id === role.id && (
                     <motion.span 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`text-xs font-semibold ${role.colorLight.replace('400', '600')} dark:${role.colorLight} uppercase tracking-wider block mt-1`}
                     >
                        Active View
                     </motion.span>
                   )}
                </div>
                {activeRole.id === role.id && (
                  <motion.div layoutId="active-indicator" className="ml-auto w-1.5 h-8 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(96,192,166,0.4)] dark:shadow-[0_0_10px_rgba(96,192,166,0.8)]"></motion.div>
                )}
              </button>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 relative"
          >
            {/* System Architecture Visualization connection lines */}
            <div className="absolute top-1/2 left-0 w-16 h-px bg-gradient-to-r from-primary-500/50 to-transparent -translate-x-full hidden lg:block"></div>
            
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden min-h-[480px] flex items-center shadow-2xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
               <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-100 dark:from-primary-900/40 to-transparent rounded-bl-full blur-3xl" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100 dark:from-blue-900/20 to-transparent rounded-tr-full blur-2xl" />
               
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeRole.id}
                   initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                   animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                   exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                   transition={{ duration: 0.4 }}
                   className="w-full relative z-10"
                 >
                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
                      <div className={`p-5 rounded-2xl bg-gradient-to-br ${activeRole.color} shadow-xl shadow-black/10 dark:shadow-black/50 shrink-0 relative`}>
                        <activeRole.icon className="w-10 h-10 text-white" />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 ring-inset"></div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></div>
                           <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Live Connection</span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                          {activeRole.title} Environment
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">Secure access to dedicated tools and resources.</p>
                      </div>
                   </div>

                   <div className="grid sm:grid-cols-2 gap-4">
                     {activeRole.features.map((feature, i) => (
                       <motion.div 
                         key={i} 
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.1 + (i * 0.05), duration: 0.3 }}
                         className="group flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-default shadow-sm hover:shadow-md dark:shadow-none"
                       >
                          <div className={`w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                             <div className={`w-2.5 h-2.5 rounded-full ${activeRole.colorLight.replace('text-', 'bg-').replace('400', '500')} dark:${activeRole.colorLight.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`} />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{feature}</span>
                       </motion.div>
                     ))}
                   </div>

                   <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                     <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                        <Server className="w-5 h-5 text-slate-400" />
                        <span>Connected to <span className="text-slate-800 dark:text-slate-300 font-bold">Centralized Database</span></span>
                     </div>
                     <button className="text-slate-700 dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 px-6 py-2.5 rounded-full font-bold transition-colors flex items-center gap-2 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">
                       Learn More <ArrowRight className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                     </button>
                   </div>
                 </motion.div>
               </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
