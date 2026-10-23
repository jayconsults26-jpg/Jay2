import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LegalModals } from './components/LegalModals';
import { CallModal } from './components/CallModal';

export default function App() {
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('Business Website Design');
  const [customQuoteMessage, setCustomQuoteMessage] = useState<string>('');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  // Scroll directly to the "Request a Quotation or Consultation" form
  const scrollToContact = (service?: string, customMessage?: string) => {
    if (service) {
      setSelectedServiceForQuote(service);
    }
    if (customMessage) {
      setCustomQuoteMessage(customMessage);
    }
    const targetElement = document.getElementById('quotation-form') || document.getElementById('contact');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Add a brief subtle glow pulse to confirm direct arrival at the quotation form
      targetElement.classList.add('ring-4', 'ring-[#08DDF2]/50', 'shadow-2xl');
      setTimeout(() => {
        targetElement.classList.remove('ring-4', 'ring-[#08DDF2]/50', 'shadow-2xl');
      }, 1600);

      // Focus on the first form input field (Full Name)
      setTimeout(() => {
        const input = document.getElementById('quote-fullname');
        if (input) {
          input.focus({ preventScroll: true });
        }
      }, 500);
    }
  };

  const scrollToServices = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0A192F]">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenQuote={() => scrollToContact()}
        onOpenCall={() => setIsCallModalOpen(true)}
      />

      {/* 2. Main Body Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenQuote={() => scrollToContact()}
          onExploreServices={scrollToServices}
        />

        {/* About Section */}
        <About
          onWorkWithUs={() => scrollToContact()}
        />

        {/* Services Section */}
        <Services
          onRequestService={(serviceTitle) => scrollToContact(serviceTitle)}
        />

        {/* Portfolio Demonstration Section */}
        <Portfolio
          onEnquireSimilar={(projectName, category) => {
            scrollToContact(category, `Enquiring regarding demonstration design: ${projectName}`);
          }}
        />

        {/* Pricing Section */}
        <Pricing
          onRequestQuote={(customScopeText, serviceChoice) => {
            scrollToContact(serviceChoice || 'Business Website Design', customScopeText);
          }}
        />

        {/* Contact Us & Enquiry Form Section */}
        <Contact
          initialService={selectedServiceForQuote}
          initialMessage={customQuoteMessage}
          onClearInitial={() => {
            setCustomQuoteMessage('');
          }}
          onOpenCall={() => setIsCallModalOpen(true)}
        />
      </main>

      {/* 3. Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onSelectService={(serviceTitle) => scrollToContact(serviceTitle)}
        onOpenCall={() => setIsCallModalOpen(true)}
      />

      {/* 4. Floating WhatsApp Contact Button */}
      <WhatsAppButton />

      {/* 5. Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />
    </div>
  );
}
