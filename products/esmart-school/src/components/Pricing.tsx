import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Premium',
    description: 'Comprehensive solution for growing institutions with advanced needs.',
    price: '₹25,000',
    period: '/ year',
    features: [
      'Student Information System',
      'Attendance Module & Reports',
      'Timetable Management',
      'Smart Card & Biometric Integration',
      'Fee & Financial Management',
      'Examination & Gradebooks',
      'Parent Mobile App',
      'Library Management',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Full ERP suite for large institutions and multiple branches.',
    price: 'Custom',
    period: '',
    features: [
      'Everything in Premium',
      'Multi-branch Management',
      'Advanced Analytics & Dashboards',
      'Inventory & Asset Tracking',
      'Custom Module Development',
      'Dedicated Account Manager',
    ],
    popular: false,
  },
];

export function Pricing() {
  return (
    <div id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Flexible Tiered Pricing</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 transition-colors">
            Our pricing is customized based on student count and required modules. Choose the tier that best fits your institution's profile.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 bg-white dark:bg-slate-950 border ${
                plan.popular
                  ? 'border-primary-500 shadow-xl shadow-primary-500/10'
                  : 'border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none'
              } transition-colors duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-primary-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{plan.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 transition-colors min-h-[48px]">{plan.description}</p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white transition-colors">{plan.price}</span>
                {plan.period && <span className="text-slate-500 dark:text-slate-400 font-medium transition-colors">{plan.period}</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-6 rounded-xl font-bold transition-all ${
                plan.popular
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-500/20'
                  : 'bg-primary-50 dark:bg-slate-800 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-slate-700'
              }`}>
                Request Quote
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
