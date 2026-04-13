import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import Contact from '../components/Contact';

const NewsDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useContent();
  
  // Find news item or redirect if not found
  const article = data.news?.find((n: any) => n.id === Number(id));

  useEffect(() => {
    if (!article) {
      navigate('/');
    }
  }, [article, navigate]);

  if (!article) return null;

  // Formatting specific style parsing based on given mock data format
  const baseColor = article.color?.split(' ')[0]?.replace('text-', '') || 'brand-600';

  return (
    <div className="w-full bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
        
      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button 
                onClick={() => navigate('/')}
                className="mb-8 flex items-center text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors text-sm font-semibold"
            >
                <ArrowLeft size={16} className="mr-2" /> Back to Home
            </button>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="text-center md:text-left"
            >
                <div className={`inline-flex px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide mb-6 ${article.color}`}>
                    {article.category}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                    {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-slate-500 dark:text-slate-400 mb-8 border-y border-slate-100 dark:border-slate-800 py-4">
                    <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span className="font-medium">{article.date}</span>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 -mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden mb-12 border border-slate-100 dark:border-slate-700"
               >
                  <div className="h-64 md:h-[500px] w-full relative">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="p-8 md:p-12">
                      <div className="prose prose-lg dark:prose-invert prose-brand max-w-none">
                          <p className="lead text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-10">
                              {article.excerpt}
                          </p>

                          <p>
                              In today's rapidly evolving educational landscape, staying ahead of technological advancements is no longer optional—it's imperative. {article.title} represents a significant milestone in our ongoing commitment to providing robust, reliable, and innovative solutions to educational institutions globally.
                          </p>

                          <h3>The Future of Operations</h3>
                          <p>
                              By integrating advanced analytics and seamless inter-departmental communication networks, we can dramatically reduce the administrative overhead that plagues modern operations. Our latest updates aim to address these exact pain points, giving administrators unprecedented control and visibility.
                          </p>

                          <blockquote>
                              "Empowering educators with the right tools doesn't just save time; it allows them to focus on what truly matters: student success and holistic development."
                          </blockquote>

                          <p>
                              As we continue to roll out these features, we invite to explore the detailed release notes and attend our upcoming webinars where we will be showcasing live demonstrations of the new system capabilities.
                          </p>
                      </div>
                      
                      {/* Social Sharing */}
                      <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
                          <span className="text-slate-500 font-medium">Share this article:</span>
                          <div className="flex items-center gap-3">
                              <button className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 rounded-full transition-colors">
                                  <Facebook size={18} />
                              </button>
                              <button className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-sky-100 hover:text-sky-500 dark:hover:bg-sky-900/30 rounded-full transition-colors">
                                  <Twitter size={18} />
                              </button>
                              <button className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-800/30 rounded-full transition-colors">
                                  <Linkedin size={18} />
                              </button>
                          </div>
                      </div>
                  </div>
              </motion.div>
          </div>
      </section>

      {/* Recommended/Read More section could go here */}

      {/* Contact Trigger Area */}
      <section className="border-t border-slate-200 dark:border-slate-800">
         <Contact />
      </section>

    </div>
  );
};

export default NewsDetail;
