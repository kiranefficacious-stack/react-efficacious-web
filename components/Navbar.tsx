import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Sun, Moon, ShieldCheck, ChevronDown, 
  Layout, Smartphone, Palette, Globe, TrendingUp, Brain, CreditCard,
  GraduationCap, Truck, Utensils, Activity, Users, Building2, Briefcase,
  FolderOpen, Star, Award
} from 'lucide-react';

const motion = m as any;

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const serviceItems = [
  { name: 'Web Design & Development', href: '/services/web-development', icon: <Layout size={18} /> },
  { name: 'Mobile App Development', href: '/services/mobile-development', icon: <Smartphone size={18} /> },
  { name: 'Graphic Design', href: '/services/graphic-design', icon: <Palette size={18} /> },
  { name: 'Management Consultant', href: '/services/management-consultant', icon: <TrendingUp size={18} /> },
  { name: 'IT Outsourcing Work', href: '/services/it-outsourcing', icon: <Globe size={18} /> },
  { name: 'Knowledge Process Optimization', href: '/services/kpo', icon: <Brain size={18} /> },
  { name: 'PVC Card Printing', href: '/services/pvc-card-printing', icon: <CreditCard size={18} /> },
];

const productItems = [
  { name: 'E-Smart School', href: '/products/esmart-school', icon: <GraduationCap size={18} /> },
  { name: 'E-Smart Track', href: '/products/esmart-track', icon: <Truck size={18} /> },
  { name: 'E-Smart Restaurant', href: '/products/esmart-restaurant', icon: <Utensils size={18} /> },
  { name: 'E-Smart Health', href: '/products/esmart-health', icon: <Activity size={18} /> },
  { name: 'E-Smart Team', href: '/products/esmart-team', icon: <Users size={18} /> },
  { name: 'E-Smart Society', href: '/products/esmart-society', icon: <Building2 size={18} /> },
];

const partnerItems = [
  { name: 'Channel Partners', href: '/channel-partners', icon: <Users size={18} /> },
  { name: 'Become Partners', href: '/partners', icon: <Briefcase size={18} /> },
];

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
  const location = useLocation();

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Pages that have a dark hero section regardless of theme mode
  const darkHeroRoutes = [
    '/products/esmart-school', 
    '/products/esmart-track', 
    '/products/esmart-restaurant',
    '/products/esmart-health',
    '/products/esmart-team',
    '/products/esmart-society',
    '/channel-partners',
    '/partners',
    '/careers',
    '/contact',
    '/about'
  ];
  const isDarkHero = darkHeroRoutes.includes(location.pathname);
  
  // Use dark theme nav styles (light text) if we are on a dark hero page and not scrolled
  const useDarkThemeNav = !isScrolled && isDarkHero;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services', dropdownItems: serviceItems },
    { name: 'Products', href: '/products', dropdownItems: productItems },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Partners', href: '/partners', dropdownItems: partnerItems },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
      setIsMobileMenuOpen(false);
      setMobileExpanded(null);
  };

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  // Early return: If we are on an admin route, do not render the Navbar
  if (isAdminRoute) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg shadow-sm py-3 border-b border-slate-200/50 dark:border-slate-800/50'
          : 'bg-transparent py-5'
      }`}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group relative z-50">
            <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-2 rounded-xl text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform duration-300">
                <ShieldCheck size={24} />
            </div>
            <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                useDarkThemeNav ? 'text-white' : 'text-slate-900 dark:text-white'
            }`}>
            Efficacious<span className="text-brand-500">.</span>
            </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-1">
          {/* Glass pill container for nav items */}
          <div className={`flex items-center p-1 backdrop-blur-md rounded-full border mr-4 shadow-sm relative transition-colors duration-300 ${
              useDarkThemeNav 
              ? 'bg-black/20 border-white/10' 
              : 'bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50'
          }`}>
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const isDropdownOpen = activeDropdown === link.name;
                
                // Determine text color based on state and context
                let textColorClass = '';
                if (active || isDropdownOpen) {
                    textColorClass = 'text-brand-600 dark:text-white';
                    if (useDarkThemeNav) textColorClass = 'text-white font-bold';
                } else {
                    textColorClass = useDarkThemeNav 
                        ? 'text-slate-200 hover:text-white' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-slate-200';
                }

                return (
                    <div 
                      key={link.name} 
                      className="relative"
                      onMouseEnter={() => link.dropdownItems && setActiveDropdown(link.name)}
                    >
                        <Link
                        to={link.href}
                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 flex items-center gap-1 ${textColorClass}`}
                        onClick={() => setActiveDropdown(null)}
                        >
                        {active && (
                            <motion.div
                            layoutId="activeTab"
                            className={`absolute inset-0 shadow-sm rounded-full border ${
                                useDarkThemeNav 
                                ? 'bg-white/20 border-white/20' 
                                : 'bg-white dark:bg-brand-600 border-slate-100 dark:border-brand-500'
                            }`}
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            style={{ zIndex: -1 }}
                            />
                        )}
                        {link.name}
                        {link.dropdownItems && (
                          <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        )}
                        </Link>

                        {/* Desktop Dropdown Menu */}
                        <AnimatePresence>
                          {link.dropdownItems && isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 15, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 15, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-4 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                            >
                                <div className="p-2 space-y-1">
                                    {link.dropdownItems.map((item, idx) => (
                                      <Link
                                        key={idx}
                                        to={item.href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors group"
                                      >
                                          <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-brand-500 group-hover:scale-110 transition-transform shadow-sm">
                                            {item.icon}
                                          </div>
                                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                                            {item.name}
                                          </span>
                                      </Link>
                                    ))}
                                </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                    </div>
                );
              })}
          </div>
          
          <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all hover:scale-110 active:scale-95 shadow-sm border ${
                  useDarkThemeNav 
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-brand-400 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
              }`}
              aria-label="Toggle Dark Mode"
          >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4 z-50">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
                useDarkThemeNav 
                ? 'bg-slate-800/50 text-white' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-brand-400'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-1 transition-colors ${
                useDarkThemeNav && !isMobileMenuOpen
                ? 'text-white hover:text-brand-400' 
                : 'text-slate-700 dark:text-white hover:text-brand-600'
            }`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-0 top-0 pt-24 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl z-40 overflow-y-auto"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <div key={link.name} className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <Link
                        to={link.href}
                        onClick={handleLinkClick}
                        className={`text-xl font-medium ${
                            isActive(link.href)
                            ? 'text-brand-600 dark:text-brand-400'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                        >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                        {link.name}
                        </motion.span>
                        </Link>
                        {link.dropdownItems && (
                             <button 
                                onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                                className="p-2 text-slate-500 dark:text-slate-400"
                             >
                                 <ChevronDown size={20} className={`transition-transform duration-300 ${mobileExpanded === link.name ? 'rotate-180' : ''}`} />
                             </button>
                        )}
                    </div>

                    {/* Mobile Submenu */}
                    <AnimatePresence>
                        {link.dropdownItems && mobileExpanded === link.name && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-4 mt-2 space-y-3 border-l-2 border-slate-100 dark:border-slate-800 ml-1"
                            >
                                {link.dropdownItems.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        to={item.href}
                                        onClick={handleLinkClick}
                                        className="flex items-center gap-3 py-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
                                    >
                                        <div className="text-brand-500">{item.icon}</div>
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
              ))}
              <div className="h-px w-20 bg-slate-200 dark:bg-slate-700 my-6 mx-auto"></div>
              <p className="text-sm text-slate-400 text-center pb-8">
                Making life Safe, Secure & Easy
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;