import { motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import React, { useState, useEffect } from "react";
import { BookDemoModal } from "./BookDemoModal";

export function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [isDark, setIsDark]     = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b border-primary-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <img
                src={isDark ? "/esmart-school/logo-dark.svg" : "/esmart-school/logo.svg"}
                alt="eSMARTs"
                className="h-10 md:h-12 w-auto transition-opacity duration-300"
              />
            </div>

            <div className="hidden xl:flex items-center space-x-6">
              <a href="#home"         onClick={(e) => scrollTo(e, 'home')}         className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm">Home</a>
              <a href="#about"        onClick={(e) => scrollTo(e, 'about')}        className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm">About</a>
              <a href="#services"     onClick={(e) => scrollTo(e, 'services')}     className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm">Services</a>
              <a href="#benefits"     onClick={(e) => scrollTo(e, 'benefits')}     className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm">Why Us</a>
              <a href="#preview"      onClick={(e) => scrollTo(e, 'preview')}      className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm">Preview</a>
              <a href="#features"     onClick={(e) => scrollTo(e, 'features')}     className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm">Modules</a>
              <a href="#testimonials" onClick={(e) => scrollTo(e, 'testimonials')} className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm">Testimonials</a>

              <a href="#contact"      onClick={(e) => scrollTo(e, 'contact')}      className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm">Contact</a>
            </div>

            <div className="hidden xl:flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a
                href="https://e-smarts.com/Account/Login"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-bold text-sm px-4 py-2.5 transition-colors"
              >
                Login
              </a>
              <button
                id="nav-book-demo"
                onClick={() => setDemoOpen(true)}
                className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-700 active:scale-95 transition-all shadow-md shadow-primary-200 dark:shadow-none whitespace-nowrap"
              >
                Book a Demo
              </button>
            </div>

            <div className="xl:hidden flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:hidden bg-white dark:bg-slate-950 border-b border-primary-100 dark:border-slate-800"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <a href="#home"         className="block px-3 py-2 text-slate-600 dark:text-slate-300 font-medium" onClick={(e) => scrollTo(e, 'home')}>Home</a>
              <a href="#about"        className="block px-3 py-2 text-slate-600 dark:text-slate-300 font-medium" onClick={(e) => scrollTo(e, 'about')}>About Us</a>
              <a href="#services"     className="block px-3 py-2 text-slate-600 dark:text-slate-300 font-medium" onClick={(e) => scrollTo(e, 'services')}>Services</a>
              <a href="#benefits"     className="block px-3 py-2 text-slate-600 dark:text-slate-300 font-medium" onClick={(e) => scrollTo(e, 'benefits')}>Why Us</a>
              <a href="#preview"      className="block px-3 py-2 text-slate-600 dark:text-slate-300 font-medium" onClick={(e) => scrollTo(e, 'preview')}>Portal Preview</a>
              <a href="#features"     className="block px-3 py-2 text-slate-600 dark:text-slate-300 font-medium" onClick={(e) => scrollTo(e, 'features')}>Modules</a>
              <a href="#testimonials" className="block px-3 py-2 text-slate-600 dark:text-slate-300 font-medium" onClick={(e) => scrollTo(e, 'testimonials')}>Testimonials</a>

              <a href="#contact"      className="block px-3 py-2 text-slate-600 dark:text-slate-300 font-medium" onClick={(e) => scrollTo(e, 'contact')}>Contact</a>
              <button
                id="nav-book-demo-mobile"
                className="w-full mt-2 bg-primary-600 text-white font-bold px-4 py-3 rounded-xl hover:bg-primary-700 transition-colors"
                onClick={() => { setIsOpen(false); setDemoOpen(true); }}
              >
                Book a Demo
              </button>
              <a
                href="https://e-smarts.com/Account/Login"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full mt-2 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Demo Modal — rendered at Navbar level so it's above everything */}
      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
