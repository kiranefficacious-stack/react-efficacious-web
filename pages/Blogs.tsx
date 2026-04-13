import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Contact from '../components/Contact';
import { Calendar, User, ArrowRight, Clock, Search, Sparkles } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const Blogs: React.FC = () => {
  const { data } = useContent();
  const navigate = useNavigate();
  const blogs: any[] = data.blogs || [];
  const featuredPost = blogs[0] || {
    id: 1,
    title: "The Future of AI in Education",
    excerpt: "Discover how AI-driven analytics...",
    category: "EdTech",
    author: "Kamal Agrawal",
    date: "Mar 20, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200",
  };

  const [searchQuery, setSearchQuery]   = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  /* Derive unique categories from data */
  const categories = ['All', ...Array.from(new Set(blogs.map((b: any) => b.category)))];

  /* Filter logic */
  const filtered = blogs.filter((post: any) => {
    const matchCat   = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch = searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="w-full bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* CUSTOM HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-slate-900 dark:bg-black text-white">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000" />
              
              {/* Grid Pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                      <pattern id="grid-blogs" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
                      </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-blogs)" />
              </svg>
          </div>

          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
              >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-violet-300 text-xs font-bold uppercase tracking-wider mb-6">
                      <Sparkles size={14} /> Knowledge Hub
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                      Insights for the <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Digital Age</span>
                  </h1>
                  <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                      Discover the latest trends in EdTech, ERP strategies, and business optimization. Expert perspectives delivered to you.
                  </p>

                  {/* Search Bar */}
                  <div className="relative max-w-xl mx-auto group">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300" />
                      <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 transition-all group-focus-within:bg-white/20 group-focus-within:border-white/40 shadow-xl">
                          <Search className="ml-3 text-slate-400" size={20} />
                          <input 
                              type="text" 
                              placeholder="Search articles, topics, or trends..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-transparent border-none text-white placeholder:text-slate-400 focus:outline-none focus:ring-0 px-4 py-2"
                          />
                          <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors shadow-sm">
                              Search
                          </button>
                      </div>
                  </div>
              </motion.div>
          </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-24 relative z-20">
          
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => navigate(`/blogs/${featuredPost.id}`)}
            className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-700 mb-16 grid md:grid-cols-2 group cursor-pointer hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-300"
          >
              <div className="relative h-72 md:h-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* overlay on hover */}
                  <div className="absolute inset-0 bg-brand-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-bold text-violet-600 uppercase tracking-wider">
                          ★ Featured Story
                      </span>
                  </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {featuredPost.date}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {featuredPost.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg">
                      {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center text-white font-bold text-base">
                              {featuredPost.author?.charAt(0) || 'A'}
                          </div>
                          <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">{featuredPost.author}</p>
                              <p className="text-xs text-slate-500">{featuredPost.authorRole || 'Efficacious'}</p>
                          </div>
                      </div>
                      <span className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                          <ArrowRight size={20} />
                      </span>
                  </div>
              </div>
          </motion.div>

          {/* Filters / Categories */}
          <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                        activeCategory === cat
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-lg shadow-slate-900/20'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400'
                    }`}
                  >
                      {cat}
                  </button>
              ))}
          </div>

          {/* Blog Grid */}
          {filtered.length === 0 ? (
              <div className="text-center py-24">
                  <p className="text-5xl mb-4">🔍</p>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No articles found</h3>
                  <p className="text-slate-500 dark:text-slate-400">Try a different category or search term.</p>
                  <button
                    onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-brand-600 text-white text-sm font-bold hover:bg-brand-500 transition-colors"
                  >
                      Clear Filters
                  </button>
              </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post: any, index: number) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                    onClick={() => navigate(`/blogs/${post.id}`)}
                    className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1.5 cursor-pointer"
                  >
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-4 left-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm uppercase tracking-wide text-${post.color || 'brand'}-600 dark:text-${post.color || 'brand'}-400`}>
                                  {post.category}
                              </span>
                          </div>
                          {/* Read More pill that appears on hover */}
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                              <span className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-900 rounded-full text-xs font-bold text-brand-600 dark:text-brand-400 shadow-lg">
                                  Read More <ArrowRight size={13} />
                              </span>
                          </div>
                      </div>

                      {/* Body */}
                      <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                              <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                              <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                              {post.title}
                          </h3>

                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                              {post.excerpt}
                          </p>

                          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">By {post.author}</span>
                              <span className="text-sm font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 group-hover:gap-2.5 transition-all duration-200">
                                  Read More <ArrowRight size={15} />
                              </span>
                          </div>
                      </div>
                  </motion.div>
              ))}
          </div>
          )}

          {/* Newsletter Section */}
          <div className="mt-20 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-center shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                  <h3 className="text-3xl font-bold text-white mb-4">Subscribe to our Newsletter</h3>
                  <p className="text-slate-300 mb-8">Get the latest insights on technology, education, and business efficiency delivered straight to your inbox.</p>
                  
                  <form className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 backdrop-blur-sm"
                      />
                      <button className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-brand-600/30">
                          Subscribe
                      </button>
                  </form>
                  <p className="text-xs text-slate-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
              </div>
          </div>

      </div>

      <Contact />
    </div>
  );
};

export default Blogs;
