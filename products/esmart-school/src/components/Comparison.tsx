import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const compareData = [
  { feature: 'End-to-End Online Admissions & Counseling', esmarts: true, others: 'partial' },
  { feature: 'Choice Based Credit System (CBCS) Support', esmarts: true, others: false },
  { feature: 'Dynamic Timetable & Faculty Workload', esmarts: true, others: 'partial' },
  { feature: 'NAAC/NBA Accreditation Report Generation', esmarts: true, others: false },
  { feature: 'Secure Online Fee Collection & Auto-Reconciliation', esmarts: true, others: true },
  { feature: 'Placement Cell & Alumni Portal Integration', esmarts: true, others: false },
  { feature: 'Digital Library & e-Resource Management', esmarts: true, others: 'partial' },
  { feature: 'Advanced Student Lifecycle Analytics', esmarts: true, others: false },
];

export function Comparison() {
  return (
    <div className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Why We Stand Out</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 transition-colors">
            See how eSMARTs compares to traditional school management systems and generic alternatives.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/50">
                  <th className="py-5 px-6 font-semibold text-slate-600 dark:text-slate-400 w-1/2">Features</th>
                  <th className="py-5 px-6 font-bold text-primary-600 dark:text-primary-400 text-center w-1/4">eSMARTs</th>
                  <th className="py-5 px-6 font-semibold text-slate-500 dark:text-slate-500 text-center w-1/4">Traditional Systems</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {compareData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white dark:hover:bg-slate-900/80 transition-colors">
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300 font-medium">{item.feature}</td>
                    <td className="py-4 px-6 text-center bg-primary-50/30 dark:bg-primary-900/10">
                      {item.esmarts === true && <Check className="w-6 h-6 text-emerald-500 mx-auto" />}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.others === true ? (
                        <Check className="w-5 h-5 text-slate-400 mx-auto" />
                      ) : item.others === 'partial' ? (
                        <div className="w-4 h-1 bg-amber-400 mx-auto rounded-full" title="Partial support"></div>
                      ) : (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
