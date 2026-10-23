import React, { useState } from 'react';
import { ArrowRight, Smartphone, Monitor, ShieldCheck, Zap, Search, Eye } from 'lucide-react';
import { COMPANY_INFO, TRUST_HIGHLIGHTS } from '../data/companyData';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onExploreServices }) => {
  const [showFlyerModal, setShowFlyerModal] = useState(false);

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#062B63] via-[#041E47] to-[#0A192F] text-white">
      {/* Opened Laptop Background Image with high-legibility scrim */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/demo_business_consulting_1792582740884.jpg"
          alt="Jay Consults Concept Design Showcase"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transform transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark scrim gradients for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#062B63]/95 via-[#062B63]/85 to-[#0A192F]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#062B63]/70 via-transparent to-[#0A192F]" />
      </div>

      {/* Background glow and subtle tech grid */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0869E8]/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-[#08DDF2]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#FF9D00]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
                YOUR VISION.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#08DDF2] via-[#00C9D9] to-cyan-200">
                  OUR DIGITAL EXPERTISE.
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-200 tracking-tight">
                {COMPANY_INFO.supportingMessage}
              </p>
            </div>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Jay Consults helps businesses, entrepreneurs, and organizations establish a strong online presence through professional, modern, responsive, and user-friendly websites.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-[#062B63] bg-[#08DDF2] hover:bg-[#00C9D9] active:scale-98 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>Explore Our Services</span>
              </button>

              <button
                onClick={() => setShowFlyerModal(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-medium text-slate-300 hover:text-[#08DDF2] transition-colors whitespace-nowrap"
                title="View Official Jay Consults Promo Flyer"
              >
                <Eye className="w-4 h-4 text-[#08DDF2]" />
                <span>View Official Flyer</span>
              </button>
            </div>

            {/* Quick Price Banner Highlight */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#0869E8]/30 via-white/5 to-transparent border border-white/10 flex items-center justify-between gap-4 max-w-xl">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                  FOR YOUR PROFESSIONAL BUSINESS WEBSITES
                </span>
                <span className="text-lg font-bold text-white">
                  Send a WhatsApp Message
                </span>
              </div>
              <a
                href={COMPANY_INFO.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/40 transition-colors whitespace-nowrap"
              >
                <span>WhatsApp: +233 244 623265</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Device Showcase & Flyer Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative glow ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#08DDF2] via-[#0869E8] to-[#FF9D00] rounded-2xl blur-md opacity-30 animate-pulse" />
              
              <div className="relative rounded-2xl bg-[#031738]/90 border border-white/15 p-4 shadow-2xl backdrop-blur-md overflow-hidden">
                {/* Visual Header bar simulating a browser / device mock */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <div className="px-3 py-1 rounded bg-white/5 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                    <span className="text-[#08DDF2]">jayconsults.com</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Monitor className="w-3.5 h-3.5 text-[#08DDF2]" />
                    <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                {/* Display official flyer / responsive visual asset */}
                <div className="relative rounded-xl overflow-hidden group">
                  <img
                    src="/assets/aistudio/jay_consults_flyer_2_1edcc109.jpg"
                    alt="Jay Consults - Professional Websites That Grow Your Business Flyer"
                    className="w-full h-auto max-h-[380px] object-cover object-top transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    onClick={() => setShowFlyerModal(true)}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay badge on hover */}
                  <div
                    onClick={() => setShowFlyerModal(true)}
                    className="absolute inset-0 bg-gradient-to-t from-[#062B63]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-[#08DDF2]" /> Click to view full flyer
                    </span>
                  </div>
                </div>

                {/* Mini trust highlights below preview */}
                <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Zap className="w-3.5 h-3.5 text-[#08DDF2] shrink-0" />
                    <span>Fast Performance</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Secure Architecture</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Smartphone className="w-3.5 h-3.5 text-[#FF9D00] shrink-0" />
                    <span>Mobile Responsive</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Search className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                    <span>SEO-Friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Trust-Highlight Strip across bottom */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_HIGHLIGHTS.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#08DDF2]/30 transition-all text-left"
              >
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#08DDF2]" />
                  {item.label}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Flyer Modal */}
      {showFlyerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-2xl w-full bg-[#062B63] border border-[#08DDF2]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#031738]">
              <div>
                <h3 className="text-lg font-bold text-white">Jay Consults Official Promotional Flyer</h3>
                <p className="text-xs text-[#08DDF2]">We Build Websites That Grow Your Business</p>
              </div>
              <button
                onClick={() => setShowFlyerModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 flex justify-center bg-black/30">
              <img
                src="/assets/aistudio/jay_consults_flyer_2_1edcc109.jpg"
                alt="Jay Consults Promotional Flyer"
                className="max-h-[70vh] w-auto rounded-lg object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="px-6 py-3 border-t border-white/10 bg-[#031738] flex items-center justify-between">
              <span className="text-xs text-slate-300">
                Professional Web Development · Accra, Ghana
              </span>
              <button
                onClick={() => {
                  setShowFlyerModal(false);
                  onOpenQuote();
                }}
                className="px-4 py-2 text-xs font-bold text-[#062B63] bg-[#08DDF2] rounded-lg hover:bg-[#00C9D9]"
              >
                Request Quotation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
