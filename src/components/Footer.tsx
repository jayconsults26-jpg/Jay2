import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, MessageSquare } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onSelectService: (serviceTitle: string) => void;
  onOpenCall?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onSelectService,
  onOpenCall,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Our Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#031738] text-slate-300 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Tagline (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Final_Logo_e2a71aa8.png"
                alt="Jay Consults Logo"
                className="w-12 h-12 object-contain rounded-xl p-1 bg-white/10 logo-bright"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-xs font-semibold text-[#08DDF2] tracking-wider uppercase">
                  {COMPANY_INFO.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Information and Communication Technology (ICT) company focused on helping businesses establish and strengthen their digital presence through modern, responsive, and high-performance websites.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_INFO.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/40 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: +233 244 623265</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="hover:text-[#08DDF2] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Main Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService(s.title)}
                    className="hover:text-[#08DDF2] transition-colors text-left cursor-pointer"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onSelectService("Domain and Hosting Assistance")}
                  className="hover:text-[#08DDF2] transition-colors text-left text-slate-400 cursor-pointer"
                >
                  Domain &amp; Hosting Setup
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Postal Address (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact &amp; Location
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#08DDF2] shrink-0 mt-0.5" />
                <div>
                  <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="text-white hover:text-[#08DDF2] transition-colors break-all">
                    {COMPANY_INFO.primaryEmail}
                  </a>
                  <div className="text-[11px] text-slate-400">
                    Alt: {COMPANY_INFO.secondaryEmail}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#08DDF2] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  {COMPANY_INFO.phones.map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <a href={`tel:${p.value}`} className="hover:text-[#08DDF2] transition-colors">
                        {p.display}
                      </a>
                    </div>
                  ))}
                  {onOpenCall && (
                    <button
                      type="button"
                      onClick={onOpenCall}
                      className="text-[11px] text-[#08DDF2] hover:underline pt-1 block cursor-pointer"
                    >
                      Open Call Dialer
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF9D00] shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  {COMPANY_INFO.address.full}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</span>
            <span className="text-slate-600">·</span>
            <span className="text-[#08DDF2]">{COMPANY_INFO.tagline}</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#08DDF2] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-[#08DDF2] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors"
              title="Back to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
