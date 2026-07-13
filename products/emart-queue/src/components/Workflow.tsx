import { motion } from 'framer-motion';
import { MapPin, CalendarCheck, Navigation, QrCode } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Discover',
    description: 'Instantly view the number of partnered organizations near your current geolocation.',
    icon: MapPin,
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    id: '02',
    title: 'Book',
    description: 'Pick a location, choose your service, and select a real-time slot that works for you.',
    icon: CalendarCheck,
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    id: '03',
    title: 'Execute',
    description: 'Travel to the location right on time. No more sitting in crowded waiting rooms.',
    icon: Navigation,
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    id: '04',
    title: 'Validate',
    description: 'Scan your unique QR code upon arrival to instantly check-in and update the queue.',
    icon: QrCode,
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Our Core Workflow
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            A frictionless journey from finding a service to walking out the door.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-[1px] bg-slate-200" />
              )}
              
              <div className={`w-12 h-12 rounded-lg ${step.bgColor} ${step.color} flex items-center justify-center font-bold text-lg mb-6 relative z-10 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300`}>
                {step.id}
              </div>
              
              <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
