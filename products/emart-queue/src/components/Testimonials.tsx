import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Implementing E-Smart Queue completely transformed our branch. Lobby congestion is down by 80%, and our tellers can actually prepare for specialized consultations before the client even walks through the doors.",
    author: "Sarah Jenkins",
    role: "Branch Manager, Metro Financial",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    quote: "Managing dock doors used to be a nightmare of idle trucks and angry drivers. Now, carriers book their slots in real-time, scan their QR code at the gate, and keep the supply chain moving smoothly.",
    author: "Marcus Chen",
    role: "Hub Coordinator, Apex Logistics",
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    quote: "I used to take half a day off work just to renew my license or visit the clinic. With this app, I book my slot, show up exactly at my time, scan my code, and I'm instantly next in line. It's a lifesaver.",
    author: "Elena Rodriguez",
    role: "Everyday User",
    avatar: "https://i.pravatar.cc/150?u=elena",
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Testimonials
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Businesses and Users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col relative"
            >
              <Quote className="absolute top-6 right-6 text-slate-200 w-12 h-12" />
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-slate-600 italic text-sm leading-relaxed mb-8 relative z-10 grow">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-10 h-10 rounded-full bg-slate-200 object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{testimonial.author}</h4>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
