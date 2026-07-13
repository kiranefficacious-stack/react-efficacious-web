import { motion } from 'framer-motion';
import { User, Building2, CheckCircle2 } from 'lucide-react';

export function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            The Value of Time
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            E-Smart Queue creates a win-win ecosystem where customers save hours and businesses optimize their operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* For Users */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-200">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                <User size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">For Users</h3>
            </div>
            
            <ul className="space-y-6">
              {[
                ['No More Standing in Line', 'Skip the physical queue entirely. Wait from the comfort of your home or car.'],
                ['Predictable Schedules', 'Know exactly when you will be served. Plan your day around your appointment, not the other way around.'],
                ['Easy-to-Use Interface', 'A clean, intuitive mobile experience that lets you discover, book, and validate in under 60 seconds.'],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-4">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs font-bold shrink-0 mt-1">✓</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-slate-900">{title}</h4>
                    <p className="text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* For Organizations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-200">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                <Building2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">For Organizations</h3>
            </div>
            
            <ul className="space-y-6">
              {[
                ['Streamlined Foot Traffic', 'Prevent crowded lobbies and waiting rooms, creating a calmer, more professional environment.'],
                ['Better Resource Allocation', 'Predict demand accurately. Schedule staff based on actual booked slots rather than guessing walk-in volumes.'],
                ['Enhanced Customer Satisfaction', 'Happy customers don\'t wait. Improve your reviews and retention by respecting their time.'],
                ['Data Insights on Peak Times', 'Understand your business better with comprehensive analytics on wait times and service durations.'],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-4">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs font-bold shrink-0 mt-1">✓</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-slate-900">{title}</h4>
                    <p className="text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
