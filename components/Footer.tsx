import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

const Footer: React.FC = () => {
  const { data } = useContent();
  const { contact } = data;
  
  // Hook to get the current URL path
  const location = useLocation();
  
  // Check if the current path starts with /admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  // If we are on an admin page, do not render the footer
  if (isAdminRoute) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">E</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase">Efficacious</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Empowering organizations with smart ERP solutions. We believe in efficiency, security, and seamless innovation.
            </p>
            <div className="flex gap-4">
              <a href={contact.socials.linkedin || "#"} className="hover:text-brand-500 transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={contact.socials.twitter || "#"} className="hover:text-brand-500 transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={contact.socials.facebook || "#"} className="hover:text-brand-500 transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="/partners" className="hover:text-white">Partners</Link></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Solutions</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/products/esmart-school" className="hover:text-white">eSmart School</Link></li>
              <li><Link to="/products/esmart-track" className="hover:text-white">eSmart Track</Link></li>
              <li><Link to="/products/esmart-restaurant" className="hover:text-white">eSmart Restaurant</Link></li>
              <li><Link to="/services" className="hover:text-white">All Services</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-sm">{contact.office}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white text-sm">{contact.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <span className="text-sm">{contact.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-8">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Efficacious India Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;