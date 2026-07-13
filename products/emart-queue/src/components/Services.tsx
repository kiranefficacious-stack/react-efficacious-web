import { motion } from 'framer-motion';
import { Building, Truck, MonitorSmartphone, Stethoscope, Landmark } from 'lucide-react';

const industries = [
  {
    title: 'Banking & Finance',
    description: 'Prioritize VIP clients, manage teller queues dynamically, and allow customers to book mortgage or loan consultations without sitting in the lobby.',
    icon: Building,
  },
  {
    title: 'Logistics & Warehousing',
    description: 'Schedule dock doors for incoming freight. Truck drivers arrive at exact windows, preventing yard congestion and accelerating turnaround times.',
    icon: Truck,
  },
  {
    title: 'IT & Software Support',
    description: 'Streamline genius-bar style tech support. Assign users to specific technicians based on the complex nature of their hardware or software issue.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Clinics & Healthcare',
    description: 'Separate walk-ins from scheduled appointments. Keep waiting rooms uncrowded to reduce the spread of illness and improve patient privacy.',
    icon: Stethoscope,
  },
  {
    title: 'Government Offices',
    description: 'Digitize DMV, passport, and licensing queues. Let citizens wait at home or work instead of standing in block-long physical lines.',
    icon: Landmark,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Industries Served
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Every Industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100/50 transition-all group"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors mb-6">
                <industry.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{industry.title}</h3>
              <p className="text-slate-600 leading-relaxed">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
