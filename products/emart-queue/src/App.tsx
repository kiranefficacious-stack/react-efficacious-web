import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppPreview } from './components/AppPreview';
import { Workflow } from './components/Workflow';
import { Services } from './components/Services';
import { Features } from './components/Features';
import { WhyUs } from './components/WhyUs';
import { Testimonials } from './components/Testimonials';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { PrivacyPolicyContent } from './components/PrivacyPolicyContent';
import { TermsContent } from './components/TermsContent';
import { DeveloperModalContent, type DevModalType } from './components/DeveloperModalContent';

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [devModal, setDevModal] = useState<{ open: boolean; title: string; type: DevModalType | null }>({
    open: false,
    title: '',
    type: null,
  });

  const handleOpenDevModal = (type: DevModalType, title: string) => {
    setDevModal({ open: true, title, type });
  };

  const handleCloseDevModal = () => {
    setDevModal({ open: false, title: '', type: null });
  };

  return (
    <>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <AppPreview />
        <Workflow />
        <Services />
        <Features />
        <WhyUs />
        <Testimonials />
        <About />
        <Contact />
        <Footer
          onPrivacyClick={() => setPrivacyOpen(true)}
          onTermsClick={() => setTermsOpen(true)}
          onDeveloperResourceClick={handleOpenDevModal}
        />
      </main>

      <Modal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </Modal>

      <Modal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="Terms & Conditions"
      >
        <TermsContent />
      </Modal>

      <Modal
        isOpen={devModal.open}
        onClose={handleCloseDevModal}
        title={devModal.title}
      >
        {devModal.type && (
          <DeveloperModalContent
            type={devModal.type}
            onNavigateContact={handleCloseDevModal}
          />
        )}
      </Modal>
    </>
  );
}
