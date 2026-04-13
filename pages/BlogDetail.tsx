import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, Clock, User, Tag, Facebook,
  Twitter, Linkedin, ArrowRight, BookOpen, Share2,
} from 'lucide-react';
import { useContent } from '../hooks/useContent';
import Contact from '../components/Contact';

/* ── colour helper ───────────────────────────────────── */
const colourMap: Record<string, string> = {
  blue:   'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  emerald:'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  amber:  'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  rose:   'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  brand:  'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
};
const heroGradientMap: Record<string, string> = {
  blue:   'from-blue-900/80 to-slate-900/80',
  violet: 'from-violet-900/80 to-slate-900/80',
  emerald:'from-emerald-900/80 to-slate-900/80',
  amber:  'from-amber-900/80 to-slate-900/80',
  rose:   'from-rose-900/80 to-slate-900/80',
  brand:  'from-brand-900/80 to-slate-900/80',
};

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useContent();
  const blogs: any[] = data.blogs || [];

  const post = blogs.find((b: any) => b.id === Number(id));
  const otherPosts = blogs.filter((b: any) => b.id !== Number(id)).slice(0, 3);

  /* reading progress state */
  const [readPct, setReadPct] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setReadPct(total > 0 ? Math.round((scrolled / total) * 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!post) navigate('/blogs');
  }, [post, navigate]);

  if (!post) return null;

  const colour      = post.color || 'brand';
  const categoryCSS = colourMap[colour] ?? colourMap.brand;
  const heroGrad    = heroGradientMap[colour] ?? heroGradientMap.brand;
  const tags: string[] = post.tags || [];
  const content: { heading: string; body: string }[] = post.content || [];

  /* share helpers */
  const pageUrl   = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(post.title);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* ── Reading Progress Bar ── */}
      <div className="fixed top-0 inset-x-0 z-[100] h-1 bg-slate-200 dark:bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 to-violet-500"
          style={{ width: `${readPct}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${heroGrad}`} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-40">
          {/* Back link */}
          <button
            onClick={() => navigate('/blogs')}
            className="mb-8 inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={16} /> Back to Blogs
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category badge */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5 ${categoryCSS}`}>
              <Tag size={11} /> {post.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-3xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <User size={14} /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_260px] gap-12 items-start">

            {/* Article body */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              {/* Lead excerpt */}
              <div className="px-8 md:px-12 pt-10 pb-6 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                  {post.excerpt}
                </p>
              </div>

              {/* Sections */}
              <div className="px-8 md:px-12 py-10 space-y-10">
                {content.length > 0 ? (
                  content.map((section, i) => (
                    <div key={i}>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">
                        {section.heading}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-[17px]">
                        {section.body}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    Full article content coming soon.
                  </p>
                )}
              </div>

              {/* Tags row */}
              {tags.length > 0 && (
                <div className="px-8 md:px-12 pb-8 flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      # {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Social sharing */}
              <div className="px-8 md:px-12 pb-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <Share2 size={16} /> Share this article
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                    target="_blank" rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/40 transition-colors"
                  ><Facebook size={17} /></a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`}
                    target="_blank" rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-sky-100 hover:text-sky-500 dark:hover:bg-sky-900/40 transition-colors"
                  ><Twitter size={17} /></a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?url=${pageUrl}&title=${pageTitle}`}
                    target="_blank" rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-800/40 transition-colors"
                  ><Linkedin size={17} /></a>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="space-y-6 sticky top-24">

              {/* Author card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-md"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">About the Author</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {post.author?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{post.author}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{post.authorRole || 'Efficacious'}</p>
                  </div>
                </div>
              </motion.div>

              {/* Reading info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-md"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Article Info</h3>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2"><Calendar size={14} /> {post.date}</div>
                  <div className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</div>
                  <div className="flex items-center gap-2"><BookOpen size={14} /> {content.length} sections</div>
                </div>
                {/* Progress ring / bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Reading progress</span>
                    <span>{readPct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-200"
                      style={{ width: `${readPct}%` }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Tags */}
              {tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-md"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryCSS}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </aside>
          </div>

          {/* ── More Articles ── */}
          {otherPosts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-8">
                More Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherPosts.map((p: any, i: number) => {
                  const c = p.color || 'brand';
                  const css = colourMap[c] ?? colourMap.brand;
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(`/blogs/${p.id}`)}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${css}`}>
                          {p.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
                          <Clock size={11} /> {p.readTime}
                        </p>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                          {p.title}
                        </h3>
                        <span className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <ArrowRight size={13} />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-10 text-center">
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  View All Articles <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-slate-200 dark:border-slate-800">
        <Contact />
      </section>
    </div>
  );
};

export default BlogDetail;
