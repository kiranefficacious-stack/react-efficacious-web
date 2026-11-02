import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useProductTestimonials } from '../../../../hooks/useProductTestimonials';

const initialTestimonials = [
  {
    id: 1,
    quote: "Implementing E-Smart Queue completely transformed our branch. Lobby congestion is down by 80%, and our tellers can actually prepare for specialized consultations before the client even walks through the doors.",
    author: "Sarah Jenkins",
    name: "Sarah Jenkins",
    role: "Branch Manager, Metro Financial",
    organization: "Metro Financial",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    stars: 5
  },
  {
    id: 2,
    quote: "Managing dock doors used to be a nightmare of idle trucks and angry drivers. Now, carriers book their slots in real-time, scan their QR code at the gate, and keep the supply chain moving smoothly.",
    author: "Marcus Chen",
    name: "Marcus Chen",
    role: "Hub Coordinator, Apex Logistics",
    organization: "Apex Logistics",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    stars: 5
  },
  {
    id: 3,
    quote: "I used to take half a day off work just to renew my license or visit the clinic. With this app, I book my slot, show up exactly at my time, scan my code, and I'm instantly next in line. It's a lifesaver.",
    author: "Elena Rodriguez",
    name: "Elena Rodriguez",
    role: "Everyday User",
    organization: "Everyday Citizen User",
    avatar: "https://i.pravatar.cc/150?u=elena",
    stars: 5
  }
];

export function Testimonials() {
  const testimonials = useProductTestimonials('eSmart Queue', initialTestimonials);

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
          {testimonials.map((testimonial, index) => {
            const authorName = testimonial.author || testimonial.name || 'Anonymous';
            const starsCount = typeof testimonial.stars === 'number' ? testimonial.stars : 5;

            return (
              <motion.div
                key={testimonial.id || testimonial.author || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col relative justify-between"
              >
                <div>
                  <Quote className="absolute top-6 right-6 text-slate-200 w-12 h-12" />
                  
                  <div className="flex gap-1 mb-6 relative z-10">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < starsCount ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-slate-600 italic text-sm leading-relaxed mb-8 relative z-10 grow">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-slate-200/50">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={authorName} 
                      className="w-10 h-10 rounded-full bg-slate-200 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center">
                      {authorName.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{authorName}</h4>
                    <p className="text-xs text-slate-400">
                      {testimonial.role}
                      {testimonial.organization ? ` • ${testimonial.organization}` : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
