import { Users, BookOpen, Shield, Bell, Key, Smartphone, ClipboardCheck, GraduationCap, MessagesSquare, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: ClipboardCheck, title: 'Attendance Module', desc: 'Completely secured & automated attendance capturing with RFID enabled Smart Cards.', tier: 'premium', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  { icon: Shield, title: 'Security & Alerts', desc: 'Secure environment with instant arrival and departure SMS alerts for parents.', tier: 'premium', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' },
  { icon: BarChart, title: 'Dashboards & MIS', desc: 'Integrated dashboards mapping key info. Increase productivity with automated reporting.', tier: 'premium', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' },
  { icon: BookOpen, title: 'Syllabus & Library', desc: 'Manage curriculum execution and book inventory smoothly at scale.', tier: 'premium', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  { icon: GraduationCap, title: 'Examination & Performance', desc: 'Schedule exams, manage gradebooks, and execute deep performance analytics.', tier: 'enterprise', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
  { icon: MessagesSquare, title: 'Messaging & Comms', desc: 'Paperless environment to send instant e-mail/SMS notifications on real-time basis.', tier: 'premium', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' },
];

export function Features() {
  return (
    <div id="features" className="py-24 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Comprehensive Core Modules</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 transition-colors">
            eSMARTs provides end-to-end coverage of functional requirements, available in basic (Premium) and advanced (Enterprise) tiers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-100/50 dark:hover:shadow-primary-900/20 transition-all group bg-slate-50/50 dark:bg-slate-900/50"
            >
              <div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all hover:scale-110 hover:-rotate-3 shadow-md border ${item.color}`}
              >
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors">{item.desc}</p>
              
              <div className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                 Included in <span className={`px-2 py-1 rounded border transition-colors ${item.tier === 'enterprise' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>{item.tier}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 dark:text-slate-400 mb-4 transition-colors">Plus extended modules for Inventory, Fixed Asset, Reception/Enquiry, and Hostel/Mess Management.</p>
          <a href="#" className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 inline-flex items-center gap-1 transition-colors">
            View full features list &rarr;
          </a>
        </motion.div>
      </div>
    </div>
  );
}
