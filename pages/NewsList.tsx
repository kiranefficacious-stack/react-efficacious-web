import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';
import { ArrowRight, Calendar } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useNavigate } from 'react-router-dom';

const NewsList: React.FC = () => {
  const { data } = useContent();
  const navigate = useNavigate();
  const newsItems = data.news || [];
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...new Set(newsItems.map((n: any) => n.category))];
  
  const filteredNews = activeFilter === "All" 
    ? newsItems 
    : newsItems.filter((n: any) => n.category === activeFilter);

  return (
    <div className="w-full bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      
      <PageHero 
        title="News & Events" 
        subtitle="Stay up to date with our newest product launches, events, and company announcements."
        bgGradient="from-brand-600 to-purple-600"
      />

      {/* --- GALLERY SECTION --- */}
      <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                  {categories.map((cat) => (
                      <button
                        key={cat as string}
                        onClick={() => setActiveFilter(cat as string)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                            activeFilter === cat
                            ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                          {cat as string}
                      </button>
                  ))}
              </div>

              {/* Grid */}
              <motion.div 
                layout 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                  <AnimatePresence>
                      {filteredNews.map((item: any) => (
                          <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={item.id}
                            className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                          >
                              {/* Image Container */}
                              <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
                                  <img 
                                      src={item.image} 
                                      alt={item.title} 
                                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  <div className="absolute top-4 left-4">
                                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.color} backdrop-blur-md shadow-sm`}>
                                          {item.category}
                                      </span>
                                  </div>
                              </div>

                              {/* Content */}
                              <div className="p-6 flex flex-col flex-1">
                                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium mb-3">
                                      <Calendar size={14} />
                                      <span>{item.date}</span>
                                  </div>
                                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                      {item.title}
                                  </h3>
                                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                      {item.excerpt}
                                  </p>
                                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                                      <button 
                                          onClick={() => navigate(`/news/${item.id}`)}
                                          className="inline-flex w-full justify-center items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-3 transition-all"
                                      >
                                          Read Full Story <ArrowRight size={16} />
                                      </button>
                                  </div>
                              </div>
                          </motion.div>
                      ))}
                  </AnimatePresence>
              </motion.div>
              {filteredNews.length === 0 && (
                  <div className="text-center py-20 text-slate-500">
                      No news available in this category.
                  </div>
              )}
          </div>
      </section>

      <Contact />
    </div>
  );
};

export default NewsList;
