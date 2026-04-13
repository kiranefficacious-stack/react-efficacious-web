import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, BarChart3, Clock, Users, Quote } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import Contact from '../components/Contact';

const PortfolioDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useContent();
  
  // Find project or redirect if not found
  const project = data.portfolio?.find((p: any) => p.id === Number(id));

  useEffect(() => {
    if (!project) {
      navigate('/portfolio');
    }
  }, [project, navigate]);

  if (!project) return null;

  // We are creating fallback specific case study details mapping since the mock data only has basic fields
  const challengeText = "The client struggled with fragmented operations, manual documentation processes, and a lack of real-time visibility across branches. They needed a unified, robust system capable of scaling alongside their rapidly growing user base while maintaining strict security standards.";
  const solutionText = "We implemented a full-scale digital transformation using our custom ERP. This included digitizing all operational touchpoints, building separate portals for administrators and users, and integrating analytics to provide actionable insights for decision-making.";

  return (
    <div className="w-full bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
        
      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-slate-900 relative overflow-hidden">
        {/* Background Image layer with overlay */}
        <div className="absolute inset-0 z-0">
           <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-20" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <button 
                onClick={() => navigate('/portfolio')}
                className="mb-8 flex items-center text-slate-300 hover:text-white transition-colors text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm self-start md:self-center"
            >
                <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
            </button>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
                <div className="inline-flex px-3 py-1 bg-brand-500 text-white font-bold text-xs rounded-full uppercase tracking-wide mb-6 shadow-xl shadow-brand-500/30">
                    {project.category}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
                    {project.title}
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    {project.description}
                </p>
            </motion.div>
        </div>
      </section>

      {/* Stats Summary Strip */}
      <section className="relative -mt-10 z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 p-8 grid grid-cols-2 md:grid-cols-3 gap-8"
           >
              {project.stats.map((stat: string, i: number) => {
                  const [val, ...words] = stat.split(' ');
                  const label = words.join(' ');
                  return (
                      <div key={i} className="text-center md:border-r last:border-r-0 border-slate-100 dark:border-slate-700">
                          <div className="text-3xl font-black text-brand-600 dark:text-brand-400 mb-2">{val}</div>
                          <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</div>
                      </div>
                  );
              })}
          </motion.div>
      </section>

      {/* Case Study Details */}
      <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-[1fr_350px] gap-12 lg:gap-20">
                  
                  {/* Left Column: Story */}
                  <div>
                      <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="prose prose-lg dark:prose-invert prose-brand max-w-none"
                      >
                          <h2 className="text-3xl border-b border-brand-100 dark:border-slate-800 pb-4">The Challenge</h2>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                              {challengeText}
                          </p>

                          <div className="my-12 relative rounded-3xl overflow-hidden shadow-2xl">
                              <img src={project.image} alt={project.title} className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
                          </div>

                          <h2 className="text-3xl border-b border-brand-100 dark:border-slate-800 pb-4">Our Solution</h2>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                              {solutionText}
                          </p>

                          <ul className="space-y-4 not-prose mb-12">
                              {[
                                "Comprehensive audit of existing infrastructure",
                                "Deployment of scalable microservices architecture",
                                "Intuitive dashboard design for non-technical users",
                                "Automated backup and recovery implementation"
                              ].map((item, i) => (
                                  <li key={i} className="flex items-start">
                                      <CheckCircle2 className="text-brand-500 flex-shrink-0 mt-1 mr-3" size={20} />
                                      <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                                  </li>
                              ))}
                          </ul>

                          <div className="p-8 bg-brand-50 dark:bg-brand-900/20 rounded-2xl border-l-4 border-brand-500 italic text-xl text-slate-700 dark:text-slate-300 font-medium my-10 relative">
                              <Quote className="absolute top-4 right-4 text-brand-500/20 w-16 h-16" />
                              "Working with Efficacious completely transformed our operational workflow. We doubled our capacity within the first year without increasing administrative headcount."
                              <div className="mt-4 text-sm font-bold text-brand-700 dark:text-brand-400 not-italic flex items-center">
                                 - Director of Operations
                              </div>
                          </div>
                      </motion.div>
                  </div>

                  {/* Right Column: Sidebar Info */}
                  <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                  >
                      <div className="sticky top-32 space-y-8">
                          
                          {/* Project Tech Stack */}
                          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-lg">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center border-b border-slate-100 dark:border-slate-700 pb-4">
                                  Technologies Used
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                  {project.tags.map((tag: string, i: number) => (
                                      <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-lg shadow-sm">
                                          {tag}
                                      </span>
                                  ))}
                                  {["React", "Node.js", "MongoDB", "AWS"].map((tag, i) => (
                                      <span key={`fallback-${i}`} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-lg shadow-sm">
                                          {tag}
                                      </span>
                                  ))}
                              </div>
                          </div>

                          {/* Quick Facts */}
                          <div className="bg-gradient-to-br from-brand-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl shadow-brand-500/20">
                              <h3 className="text-xl font-bold mb-6">Key Outcomes</h3>
                              <ul className="space-y-6">
                                  <li className="flex items-center">
                                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                                          <BarChart3 size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-brand-200">Efficiency Increase</p>
                                          <p className="font-black text-xl">45%</p>
                                      </div>
                                  </li>
                                  <li className="flex items-center">
                                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                                          <Clock size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-brand-200">Processing Time</p>
                                          <p className="font-black text-xl">-60%</p>
                                      </div>
                                  </li>
                                  <li className="flex items-center">
                                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                                          <Users size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-brand-200">User Adoption</p>
                                          <p className="font-black text-xl">100%</p>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </motion.div>

              </div>
          </div>
      </section>

      {/* Contact Trigger Area */}
      <section className="border-t border-slate-200 dark:border-slate-800">
         <Contact />
      </section>

    </div>
  );
};

export default PortfolioDetail;
