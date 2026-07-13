import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does the RFID attendance system work?",
    answer: "Students are provided with RFID-enabled smart cards. As they pass through the school gates or board the GPS-tracked school bus, the system automatically logs their attendance and triggers an instant SMS/App notification to parents."
  },
  {
    question: "Is the platform suitable for multi-branch schools?",
    answer: "Yes, our platform is designed to scale. It supports complex multi-campus environments, allowing centralized administration, role-based access, and consolidated MIS reporting for school groups."
  },
  {
    question: "Can parents pay school fees through the mobile app?",
    answer: "Absolutely. The parent portal includes a secure payment gateway integration, allowing scheduled, completely cashless, and simple fee payments directly from their smartphones."
  },
  {
    question: "How secure is the data stored in the system?",
    answer: "We employ industry-standard encryption and secure servers to ensure that all student, financial, and operational data remains completely confidential and protected against unauthorized access."
  },
  {
    question: "What is the typical implementation time for a new school?",
    answer: "Depending on the school's size and the specific modules selected, a standard implementation takes between 2 to 4 weeks. This includes system setup, data migration, and comprehensive staff training."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-24 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 transition-colors">
            Everything you need to know about implementing eSMARTs.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-colors ${openIndex === index ? 'border-primary-300 dark:border-primary-500/50 shadow-md shadow-primary-900/5 dark:shadow-primary-900/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className={`font-bold pr-8 transition-colors ${openIndex === index ? 'text-primary-600 dark:text-primary-400' : 'text-slate-800 dark:text-slate-200'}`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 mt-2 pt-4 transition-colors">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center bg-primary-900 rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-400 to-transparent"></div>
          <div className="relative z-10">
             <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
             <p className="text-primary-100 mb-6 max-w-md mx-auto">Our team is ready to provide a customized demo and answer any specific queries about your school's requirements.</p>
             <button className="bg-white text-primary-900 px-6 py-2.5 rounded-full font-bold hover:bg-primary-50 transition-colors shadow-lg">
               Contact Support
             </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
