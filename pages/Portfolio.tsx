import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';
import { ArrowRight, Quote, Star, Building2 } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { initialData } from '../data';
import { useNavigate } from 'react-router-dom';

const Portfolio: React.FC = () => {
  const { data, contentLoading } = useContent();
  const navigate = useNavigate();
  const projects = data?.portfolio || [];

  React.useEffect(() => {
    if (!contentLoading && projects.length === 0) {
      navigate('/', { replace: true });
    }
  }, [contentLoading, projects, navigate]);

  if (!contentLoading && projects.length === 0) {
    return null;
  }

  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...new Set(projects.map((p: any) => p.category))];
  const stats = [
    { label: "Projects Delivered", value: "500+" },
    { label: "Client Retention", value: "95%" },
    { label: "User Base", value: "2M+" },
    { label: "Support", value: "24/7" },
  ];

  const testimonials = (data?.testimonials && Array.isArray(data.testimonials) && data.testimonials.length > 0)
    ? data.testimonials
    : (initialData.testimonials || []);

  const clients = (data?.clients && Array.isArray(data.clients) && data.clients.length > 0)
    ? data.clients
    : (initialData.clients || []);

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter((p: any) => p.category === activeFilter);

  return (
    <div className="w-full bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      
      <PageHero 
        title="Our Work" 
        subtitle="Showcasing our journey of digital transformation across industries."
        bgGradient="from-blue-600 to-cyan-600"
      />

      {/* --- STATS STRIP --- */}
      <div className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                  <div key={i} className="text-center border-r last:border-r-0 border-slate-100 dark:border-slate-700">
                      <div className="text-3xl lg:text-4xl font-black text-brand-600 dark:text-brand-400 mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{stat.label}</div>
                  </div>
              ))}
          </div>
      </div>

      {/* --- GALLERY SECTION --- */}
      <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                  {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                            activeFilter === cat
                            ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                          {cat}
                      </button>
                  ))}
              </div>

              {/* Grid */}
              <motion.div 
                layout 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                  <AnimatePresence>
                      {filteredProjects.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="col-span-full text-center py-24"
                        >
                          <p className="text-5xl mb-4">🔍</p>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No projects found</h3>
                          <p className="text-slate-500 dark:text-slate-400 mb-6">No projects match the selected category.</p>
                          <button
                            onClick={() => setActiveFilter('All')}
                            className="px-6 py-2.5 rounded-full bg-brand-600 text-white text-sm font-bold hover:bg-brand-500 transition-colors"
                          >
                            Show All Projects
                          </button>
                        </motion.div>
                      )}
                      {filteredProjects.map((project) => (
                          <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={project.id}
                            className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                          >
                              {/* Image Area */}
                              <div className="relative h-64 overflow-hidden">
                                  <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                  
                                  <div className="absolute top-4 left-4">
                                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/20">
                                          {project.category}
                                      </span>
                                  </div>

                                  <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                          {project.tags.map((tag, i) => (
                                              <span key={i} className="text-[10px] bg-brand-500/80 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                                                  {tag}
                                              </span>
                                          ))}
                                      </div>
                                  </div>
                              </div>

                              {/* Content Area */}
                              <div className="p-6">
                                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                                      {project.description}
                                  </p>
                                  
                                  <div className="grid grid-cols-3 gap-2 mb-6 py-4 border-y border-slate-100 dark:border-slate-700">
                                      {project.stats.map((stat, i) => (
                                          <div key={i} className="text-center">
                                              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                                                  {stat.split(' ').slice(1).join(' ')}
                                              </div>
                                              <div className="font-bold text-slate-800 dark:text-white text-xs">
                                                  {stat.split(' ')[0]}
                                              </div>
                                          </div>
                                      ))}
                                  </div>

                                  <button 
                                      onClick={() => navigate(`/portfolio/${project.id}`)}
                                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 text-brand-600 dark:text-brand-400 font-bold text-sm hover:bg-brand-50 dark:hover:bg-slate-600 transition-colors group/btn"
                                  >
                                      View Case Study <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                  </button>
                              </div>
                          </motion.div>
                      ))}
                  </AnimatePresence>
              </motion.div>
          </div>
      </section>

      {/* --- CLIENTS / TESTIMONIALS --- */}
      <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-200/50 dark:border-brand-800/50">
                    Client Success Stories
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                    Trusted by Industry Leaders
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Discover how our ERP and automation solutions empower schools, healthcare networks, and enterprises across India.
                  </p>
              </div>

              {/* Dynamic Testimonial Cards */}
              <div className="grid md:grid-cols-2 gap-8 mb-20">
                  {testimonials.map((t: any, i: number) => (
                      <motion.div 
                        key={t.id || i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="bg-slate-50 dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 p-8 rounded-3xl relative shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                      >
                          <Quote className="absolute top-8 right-8 text-brand-500/10 dark:text-brand-400/10 w-16 h-16 pointer-events-none" />
                          <div className="relative z-10 mb-6">
                              {/* Star Rating */}
                              <div className="flex items-center gap-1 mb-4">
                                {[...Array(t.rating || 5)].map((_, starIdx) => (
                                  <Star key={starIdx} size={16} className="fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 italic leading-relaxed">
                                  "{t.text}"
                              </p>
                          </div>

                          <div className="flex items-center gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 relative z-10">
                              <img 
                                src={t.image} 
                                alt={t.name} 
                                className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-md shrink-0" 
                                onError={(e: any) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0D8ABC&color=fff`;
                                }}
                              />
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{t.name}</h4>
                                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">{t.role}</p>
                                  {t.company && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.company}</p>
                                  )}
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>

              {/* Dynamic Client Images / Logos Grid */}
              <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-center mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Partnered with leading institutions & enterprises
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                      {clients.map((c: any, i: number) => (
                          <motion.div
                            key={c.id || i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            className="group relative bg-slate-50/80 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                          >
                              <div className="w-14 h-14 rounded-xl overflow-hidden mb-2.5 bg-white dark:bg-slate-700/80 p-1 border border-slate-100 dark:border-slate-600 shadow-inner flex items-center justify-center">
                                  <img 
                                    src={c.logo} 
                                    alt={c.name} 
                                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                    onError={(e: any) => {
                                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=random&color=fff`;
                                    }}
                                  />
                              </div>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                {c.name}
                              </span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                                {c.category}
                              </span>
                          </motion.div>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 bg-brand-600 dark:bg-brand-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
              <h2 className="text-4xl font-extrabold mb-6">Have a project in mind?</h2>
              <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
                  Let's collaborate to build something amazing. Our team is ready to bring your vision to life.
              </p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-brand-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-50 transition-colors shadow-lg active:scale-95"
              >
                  Start Your Project
              </button>
          </div>
      </section>

      <Contact />
    </div>
  );
};

export default Portfolio;
