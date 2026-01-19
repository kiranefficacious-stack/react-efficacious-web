
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ErrorBoundary from './components/ErrorBoundary';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Portfolio from './pages/Portfolio';
import Blogs from './pages/Blogs';
import Partners from './pages/Partners';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import WebDevelopment from './pages/WebDevelopment';
import MobileDevelopment from './pages/MobileDevelopment';
import GraphicDesign from './pages/GraphicDesign';
import ManagementConsultant from './pages/ManagementConsultant';
import ITOutsourcing from './pages/ITOutsourcing';
import KnowledgeProcessOptimization from './pages/KnowledgeProcessOptimization';
import PVCCardPrinting from './pages/PVCCardPrinting';
import ESmartSchool from './pages/ESmartSchool';
import ESmartTrack from './pages/ESmartTrack';
import ESmartRestaurant from './pages/ESmartRestaurant';
import ESmartHealth from './pages/ESmartHealth';
import ESmartTeam from './pages/ESmartTeam';
import ESmartSociety from './pages/ESmartSociety';
import ChannelPartners from './pages/ChannelPartners';
import Admin from './pages/Admin';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate asset loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Main Wrapper with Flex Column for Sticky Footer */}
      <div className={`flex flex-col min-h-screen transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {!isLoading && (
            <>
                <Navbar isDark={isDark} toggleTheme={toggleTheme} />
                
                {/* Main content grows to push footer down */}
                <main className="flex-grow">
                  <ErrorBoundary>
                    <Routes>
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/services/web-development" element={<WebDevelopment />} />
                      <Route path="/services/mobile-development" element={<MobileDevelopment />} />
                      <Route path="/services/graphic-design" element={<GraphicDesign />} />
                      <Route path="/services/management-consultant" element={<ManagementConsultant />} />
                      <Route path="/services/it-outsourcing" element={<ITOutsourcing />} />
                      <Route path="/services/kpo" element={<KnowledgeProcessOptimization />} />
                      <Route path="/services/pvc-card-printing" element={<PVCCardPrinting />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/esmart-school" element={<ESmartSchool />} />
                      <Route path="/products/esmart-track" element={<ESmartTrack />} />
                      <Route path="/products/esmart-restaurant" element={<ESmartRestaurant />} />
                      <Route path="/products/esmart-health" element={<ESmartHealth />} />
                      <Route path="/products/esmart-team" element={<ESmartTeam />} />
                      <Route path="/products/esmart-society" element={<ESmartSociety />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/partners" element={<Partners />} />
                      <Route path="/channel-partners" element={<ChannelPartners />} />
                      <Route path="/careers" element={<Careers />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </ErrorBoundary>
                </main>
                
                <Footer />
                <ChatWidget />
            </>
        )}
      </div>
    </>
  );
}

export default App;
