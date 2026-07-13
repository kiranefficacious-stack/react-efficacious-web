import { motion } from 'framer-motion';
import { Clock, Map, QrCode, Bell, BarChart3 } from 'lucide-react';

export function Features() {
  const features = [
    {
      title: 'Real-Time Slot Visibility',
      description: 'Live syncing across all devices ensures users only see actual available slots, preventing double-bookings.',
      icon: Clock,
      colSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
      bg: 'bg-slate-900 text-white',
      iconColor: 'text-primary-400',
    },
    {
      title: 'GPS Tracking',
      description: 'Discover nearby organizations and calculate travel times instantly based on user geolocation.',
      icon: Map,
      colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
      bg: 'bg-white border border-slate-200 text-slate-900',
      iconColor: 'text-primary-600',
    },
    {
      title: 'Secure QR Scanning',
      description: 'Cryptographically secure check-ins via our proprietary QR barcode system. Instant validation at the door.',
      icon: QrCode,
      colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
      bg: 'bg-white border border-slate-200 text-slate-900',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Automated Reminders',
      description: 'Push notifications and SMS alerts ensure customers never miss their window, dramatically reducing no-shows.',
      icon: Bell,
      colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
      bg: 'bg-slate-100 border border-slate-200 text-slate-900',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Dashboard Analytics',
      description: 'Deep insights for businesses. Track foot traffic trends, peak hours, and staff efficiency metrics in real-time.',
      icon: BarChart3,
      colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
      bg: 'bg-primary-600 text-white',
      iconColor: 'text-primary-200',
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Why Businesses Choose Us
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Advanced Technical Capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative min-h-[220px] ${feature.bg} ${feature.colSpan}`}
            >
              <div className="relative z-10">
                <feature.icon className={`w-8 h-8 mb-4 ${feature.iconColor}`} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className={`text-sm leading-relaxed ${feature.bg.includes('text-white') ? 'text-white/80' : 'text-slate-600'}`}>
                  {feature.description}
                </p>
              </div>
              
              {/* Decorative background element for darker cards */}
              {feature.bg.includes('text-white') && (
                <div className="absolute -bottom-10 -right-10 opacity-10">
                  <feature.icon className="w-48 h-48" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
