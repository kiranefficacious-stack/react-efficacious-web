import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  restaurant: string;
  city: string;
  category: 'finedine' | 'cafe' | 'qsr' | 'chain';
  quote: string;
  stars: number;
  metric: string;
  initials: string;
  gradient: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rohit Sharma',
    role: 'Owner',
    restaurant: 'The Spice Route',
    city: 'Pune',
    category: 'finedine',
    quote: 'We used to struggle during weekend rushes — wrong orders, lost KOTs, billing errors. Since switching to e-Smart Restaurant our table turnover time has dropped by 20 minutes and billing mistakes are almost zero.',
    stars: 5,
    metric: '20 Min Faster Tables',
    initials: 'RS',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    id: '2',
    name: 'Meera Nair',
    role: 'Founder',
    restaurant: 'The Daily Bean Cafe',
    city: 'Bengaluru',
    category: 'cafe',
    quote: 'Our staff loves how intuitive the POS is. Training a new steward takes less than 10 minutes. The split billing and UPI integration have made our checkout process incredibly smooth and error-free.',
    stars: 5,
    metric: '10-Min Staff Training',
    initials: 'MN',
    gradient: 'from-teal-400 to-secondary'
  },
  {
    id: '3',
    name: 'Vikram Rathore',
    role: 'Managing Director',
    restaurant: 'Royal Biryani House',
    city: 'Hyderabad',
    category: 'chain',
    quote: "Managing inventory across 14 outlets was a nightmare. With e-Smart's central dashboard, I can track real-time stock levels, check consolidated sales reports, and update menus across all outlets with one click.",
    stars: 5,
    metric: '14 Outlets Synced',
    initials: 'VR',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: '4',
    name: 'Ananya Sen',
    role: 'Owner',
    restaurant: 'Sweet Treats Bakery',
    city: 'Kolkata',
    category: 'qsr',
    quote: 'The advanced menu management and pre-order tracking features have changed how we operate. We can track custom cake orders, advance payments, and deliveries without any manual errors or paperwork.',
    stars: 5,
    metric: 'Zero Missed Orders',
    initials: 'AS',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    id: '5',
    name: 'Rajesh Patel',
    role: 'Founder',
    restaurant: 'Spice Kitchen Express',
    city: 'Ahmedabad',
    category: 'chain',
    quote: 'Our online orders from Zomato, Swiggy, and our own website now land directly on the POS screen. No more manual entry from three separate tablets. Kitchen efficiency is up by 40% and dispatch is super fast.',
    stars: 5,
    metric: '+40% Kitchen Speed',
    initials: 'RP',
    gradient: 'from-amber-400 to-orange-500'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Outlets' },
  { id: 'finedine', label: 'Fine Dine' },
  { id: 'cafe', label: 'Cafés' },
  { id: 'qsr', label: 'QSR & Bakeries' },
  { id: 'chain', label: 'Chains & Kitchens' }
];

export default function TestimonialsCarousel() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'finedine' | 'cafe' | 'qsr' | 'chain'>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredTestimonials = activeFilter === 'all' 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(t => t.category === activeFilter);

  // Sync scroll indicator dots on manual scroll / swipe
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    if (children.length === 0) return;

    let closestIndex = 0;
    let minDistance = Infinity;
    const containerLeft = scrollRef.current.getBoundingClientRect().left;

    children.forEach((child, i) => {
      const childLeft = child.getBoundingClientRect().left;
      const distance = Math.abs(childLeft - containerLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const isMounted = useRef(false);

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    const targetChild = children[index];
    if (targetChild) {
      const scroller = scrollRef.current;
      const targetLeft = targetChild.offsetLeft - scroller.offsetLeft;
      scroller.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % filteredTestimonials.length;
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + filteredTestimonials.length) % filteredTestimonials.length;
    scrollToCard(prevIdx);
  };

  // Reset index to 0 when category changes (skipping the initial render)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    scrollToCard(0);
  }, [activeFilter]);

  return (
    <section className="bg-gradient-to-b from-orange-50/50 to-orange-100/30 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-y border-orange-100/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase bg-orange-100/70 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4">
            <Quote className="w-3.5 h-3.5 rotate-180 fill-primary" />
            Verified Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 font-sora">
            Loved by 10,000+ restaurant owners
          </h2>
          <p className="text-gray-500 text-lg">
            See how e-Smart drives daily speed, accuracy, and operational clarity across India.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-primary text-white shadow-md shadow-orange-500/20 scale-[1.03]'
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-primary/30 hover:text-primary hover:bg-orange-50/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Carousel & Controls */}
        <div className="relative max-w-10xl mx-auto px-4 sm:px-12">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-orange-100 flex items-center justify-center text-charcoal hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-md hover:scale-105 active:scale-95 max-sm:hidden"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scroller Track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredTestimonials.map((t) => (
              <div
                key={t.id}
                className="w-full md:w-[48%] lg:w-[46%] shrink-0 snap-start py-4"
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-orange-100 shadow-lg shadow-orange-100/40 relative hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-100/60 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    {/* Top row: Rating & Metric */}
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <div className="flex">
                        {[...Array(t.stars)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full tracking-wide">
                        {t.metric}
                      </span>
                    </div>

                    {/* Quotation Icon Decor */}
                    <div className="absolute top-6 right-6 text-orange-100 pointer-events-none opacity-40">
                      <Quote className="w-10 h-10 rotate-180 fill-orange-50 stroke-none" />
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-charcoal text-[15px] sm:text-base leading-relaxed mb-4 font-medium font-inter">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-orange-50">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm font-sora shadow-inner shrink-0`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-charcoal font-sora text-sm leading-tight">
                        {t.name}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {t.role}, <span className="text-gray-500 font-semibold">{t.restaurant}</span> — {t.city}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-orange-100 flex items-center justify-center text-charcoal hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-md hover:scale-105 active:scale-95 max-sm:hidden"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Indicators / Dots & Mobile navigation bar */}
        <div className="flex justify-center items-center gap-2.5 mt-4">
          <button
            onClick={handlePrev}
            className="sm:hidden w-9 h-9 rounded-full bg-white border border-orange-100 flex items-center justify-center text-charcoal"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'w-6 bg-primary'
                    : 'w-2 bg-orange-200/70 hover:bg-orange-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="sm:hidden w-9 h-9 rounded-full bg-white border border-orange-100 flex items-center justify-center text-charcoal"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
