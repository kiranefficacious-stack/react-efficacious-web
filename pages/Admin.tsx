import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Newspaper, Phone, Layout, Image, Briefcase, 
  Users, Info, Box
} from 'lucide-react';

// Import all managers
import NewsManager from '../components/admin/NewsManager';
import GalleryManager from '../components/admin/GalleryManager';
import ServicesManager from '../components/admin/ServicesManager';
import CareersManager from '../components/admin/CareersManager';
import PortfolioManager from '../components/admin/PortfolioManager';
import BlogsManager from '../components/admin/BlogsManager';
import PartnersManager from '../components/admin/PartnersManager';
import ContactManager from '../components/admin/ContactManager';
import ProductManager from '../components/admin/ProductManager';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('news');

  const tabs = [
    { id: 'news', label: 'News & Events', icon: <Newspaper size={18} /> },
    { id: 'gallery', label: 'Gallery', icon: <Image size={18} /> },
    { id: 'services', label: 'Services', icon: <Layout size={18} /> },
    { id: 'careers', label: 'Careers', icon: <Briefcase size={18} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Briefcase size={18} /> },
    { id: 'blogs', label: 'Blogs', icon: <Box size={18} /> },
    { id: 'partners', label: 'Partners', icon: <Users size={18} /> },
    { id: 'products', label: 'Products', icon: <Box size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Phone size={18} /> },
    { id: 'about', label: 'About', icon: <Info size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-brand-600">Admin Panel</h2>
          <p className="text-xs text-slate-500 mt-1">Manage Site Content</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
          <h1 className="text-lg font-bold text-slate-800 dark:text-white">
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <a href="/" className="text-sm font-medium text-brand-600 hover:underline">← Back to Site</a>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'news' && <NewsManager />}
              {activeTab === 'gallery' && <GalleryManager />}
              {activeTab === 'services' && <ServicesManager />}
              {activeTab === 'careers' && <CareersManager />}
              {activeTab === 'portfolio' && <PortfolioManager />}
              {activeTab === 'blogs' && <BlogsManager />}
              {activeTab === 'partners' && <PartnersManager />}
              {activeTab === 'products' && <ProductManager />}
              {activeTab === 'contact' && <ContactManager />}
              
              {/* Placeholder for About manager */}
              {activeTab === 'about' && (
                <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mx-auto mb-4">
                      <Info className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      About Manager
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">
                      The About section content can be edited directly in the data.ts file.
                    </p>
                    <p className="text-xs text-slate-400">
                      A dedicated multi-section editor for About content is planned for a future update.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Admin;
