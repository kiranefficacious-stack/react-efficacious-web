import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Menu, X, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How it Works', href: '#workflow' },
    { name: 'Services', href: '#services' },
    { name: 'Features', href: '#features' },
    { name: 'Why Us', href: '#why-us' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white border-b border-slate-200 shadow-sm' : 'bg-white border-b border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <img src={logo} alt="Smart Queue" className="h-12 w-auto -translate-y-[10px]" />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors">
                {link.name}
              </a>
            ))}
            <a 
              href="https://esmartqueue.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors"
            >
              Login
            </a>
            <a href="#contact" className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
              Partner with Us
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-slate-900">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-md"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://esmartqueue.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center mt-2 px-4 py-3 text-base font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg"
              >
                Login
              </a>
              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center mt-4 px-4 py-3 text-base font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
              >
                Partner with Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
