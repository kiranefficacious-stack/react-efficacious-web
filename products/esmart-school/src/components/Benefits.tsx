import { CheckCircle2, ShieldCheck, HeartHandshake, Zap, Wallet, Smartphone, CreditCard, Lock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function Benefits() {
  return (
    <div id="benefits" className="py-8 lg:py-12 min-h-screen flex items-center bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
         <div className="text-center max-w-3xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 text-primary-700 dark:text-primary-400 text-sm font-semibold tracking-wide mb-6"
            >
              <HeartHandshake className="h-4 w-4" />
              <span>Why Choose eSMARTs?</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight transition-colors"
            >
              Ease for Schools. <br/>
              <span className="text-primary-600 dark:text-primary-400">Peace of mind for Parents.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed transition-colors"
            >
              Completely revolutionizing School Management with simple, smart, and fully-secured technologies that connect the entire educational ecosystem.
            </motion.p>
         </div>

         <div className="grid lg:grid-cols-3 gap-4 lg:gap-5">
            {/* Large Feature Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/50 rounded-[1.5rem] p-5 sm:p-6 border border-slate-100 dark:border-slate-800 relative overflow-hidden group hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-700 transform group-hover:scale-110 group-hover:-rotate-3">
                 <ShieldCheck className="w-56 h-56 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="relative z-10 w-full md:w-4/5 lg:w-2/3">
                 <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 mb-6 group-hover:scale-110 transition-transform duration-300">
                   <Lock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                 </div>
                 <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">Automated & Secured Tracking</h3>
                 <p className="text-sm lg:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 transition-colors">
                   We provide immense assistance in real-time connectivity. Our advanced tracking features utilize RFID technology and Real-Time GPS, making child tracking effortless and completely secure from school to home.
                 </p>
                 <ul className="space-y-3">
                   {['Environment-friendly & paperless platform', 'Instant automated alerts via SMS & Email'].map((feature, i) => (
                     <li key={i} className="flex items-center gap-3 text-xs lg:text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors">
                        <div className="p-1 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400">
                           <CheckCircle2 className="w-4 h-4" />
                        </div>
                        {feature}
                     </li>
                   ))}
                 </ul>
              </div>
            </motion.div>

            {/* Square Feature Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-primary-600 rounded-[1.5rem] p-5 sm:p-6 relative overflow-hidden group text-white hover:shadow-xl hover:shadow-primary-900/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md group-hover:bg-white/30 transition-colors">
                     <Smartphone className="w-6 h-6 text-white" />
                   </div>
                   <ArrowUpRight className="w-5 h-5 text-primary-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3">Fabulous Interactivity</h3>
                <p className="text-sm lg:text-base text-primary-50 leading-relaxed mb-auto">
                  Easy-to-use dedicated DASHBOARDs for Admin, Teachers, Parents & Students. Capture key information on a real-time basis at a single click.
                </p>
              </div>
            </motion.div>

            {/* Square Feature Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-50/50 rounded-[1.5rem] p-5 sm:p-6 border border-blue-100 relative overflow-hidden group hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
              <div className="relative z-10 flex flex-col h-full">
                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-blue-100 mb-6 group-hover:scale-110 transition-transform duration-300">
                   <CreditCard className="w-6 h-6 text-blue-600" />
                 </div>
                 <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3">Cashless & Smart</h3>
                 <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                   Smart, scheduled, and simple fee payments. Parents can also deposit budgets in their children's accounts for canteen usage, keeping a strict tab on daily expenditures.
                 </p>
              </div>
            </motion.div>

            {/* Wide Bottom Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 bg-slate-900 rounded-[1.5rem] p-5 sm:p-6 border border-slate-800 relative overflow-hidden group flex flex-col md:flex-row items-center gap-4 lg:gap-6 hover:shadow-2xl transition-all duration-300"
            >
               <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-primary-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="absolute -left-16 -top-16 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
               
               <div className="relative z-10 flex-1 text-center md:text-left">
                 <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">Significantly Increase Productivity</h3>
                 <p className="text-sm lg:text-base text-slate-400 leading-relaxed max-w-xl">
                   By automating routine tasks, attendance tracking, and communications, administrative staff can focus on what truly matters: enhancing the educational experience.
                 </p>
               </div>
               <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
                  <div className="grid grid-cols-2 gap-3 lg:gap-4">
                     <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 text-center min-w-[100px] lg:min-w-[120px] group-hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-2xl lg:text-3xl font-extrabold text-primary-400 mb-1">98%</div>
                        <div className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-widest">Time Saved</div>
                     </div>
                     <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 text-center min-w-[100px] lg:min-w-[120px] group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                        <div className="text-2xl lg:text-3xl font-extrabold text-blue-400 mb-1">100%</div>
                        <div className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-widest">Secure</div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
