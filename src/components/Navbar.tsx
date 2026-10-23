import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  onOpenQuote: (service?: string) => void;
  onOpenCall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenCall }) => {
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
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Our Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#062B63]/95 backdrop-blur-md shadow-lg shadow-[#062B63]/20 py-3 border-b border-[#08DDF2]/15'
          : 'bg-[#062B63] py-4 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08DDF2] rounded-lg"
          >
            <img
              src="/assets/aistudio/Final_Logo_e2a71aa8.png"
              alt="Jay Consults Logo"
              className="w-10 h-10 object-contain rounded-md logo-bright"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap leading-tight group-hover:text-[#08DDF2] transition-colors">
                Jay Consults
              </span>
              <span className="text-[11px] font-medium text-[#08DDF2] tracking-wider uppercase">
                Driven by Excellence
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-[#08DDF2] transition-colors whitespace-nowrap shrink-0 py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#08DDF2] transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenCall}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
              title="Call Jay Consults (+233 244 623265)"
            >
              <Phone className="w-3.5 h-3.5 text-[#08DDF2]" />
              <span className="hidden xl:inline">+233 244 623265</span>
              <span className="xl:hidden">Call Us</span>
            </button>

            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#062B63] bg-[#08DDF2] hover:bg-[#00C9D9] active:scale-95 rounded-lg shadow-sm hover:shadow-cyan-500/25 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenCall}
              className="p-2 text-slate-200 hover:text-[#08DDF2] bg-white/5 rounded-lg border border-white/10 cursor-pointer"
              title="Call Us"
            >
              <Phone className="w-4 h-4 text-[#08DDF2]" />
            </button>
            <button
              onClick={() => onOpenQuote()}
              className="px-3 py-1.5 text-xs font-semibold text-[#062B63] bg-[#08DDF2] rounded-md sm:hidden whitespace-nowrap shrink-0"
            >
              Get Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#08DDF2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08DDF2]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#031738] border-b border-white/10 px-4 pt-3 pb-6 space-y-4 shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block px-3 py-2.5 text-base font-medium text-slate-100 hover:text-[#08DDF2] hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300 px-3">
              <span className="text-slate-400">Professional Web Design</span>
              <span className="font-bold text-[#08DDF2]">Accra, Ghana</span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-[#062B63] bg-[#08DDF2] hover:bg-[#00C9D9] rounded-lg transition-colors"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCall();
                }}
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-[#08DDF2]/30 rounded-lg transition-colors cursor-pointer w-full"
              >
                <Phone className="w-3.5 h-3.5 text-[#08DDF2]" />
                <span>Call Us</span>
              </button>
              <a
                href={COMPANY_INFO.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-white bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 rounded-lg transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
