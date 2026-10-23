import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, HelpCircle, FileText, Sparkles, Calculator } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface PricingProps {
  onRequestQuote: (customScopeText?: string, serviceChoice?: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onRequestQuote }) => {
  // Interactive Project Scope Configurator
  const [selectedType, setSelectedType] = useState('Business Website Design');
  const [pageScope, setPageScope] = useState('1 to 5 Pages');
  const [includeEcommerce, setIncludeEcommerce] = useState(false);
  const [includeHostingHelp, setIncludeHostingHelp] = useState(true);
  const [includeMaintenance, setIncludeMaintenance] = useState(false);

  const handleBuildQuote = () => {
    const scopeSummary = `Selected Project Scope:
- Project Category: ${selectedType}
- Estimated Page Range: ${pageScope}
- E-commerce / Online Store: ${includeEcommerce ? 'Yes' : 'No'}
- Domain & Hosting Assistance: ${includeHostingHelp ? 'Requested' : 'Not Needed'}
- Ongoing Maintenance: ${includeMaintenance ? 'Interested in post-launch support' : 'Not Needed'}`;

    onRequestQuote(scopeSummary, selectedType);
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0869E8]/10 text-xs font-bold text-[#0869E8] uppercase tracking-wider">
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062B63] tracking-tight">
            High-Value Professional Website Packages
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Transparent starting prices with custom tailoring for e-commerce, custom redesigns, and enterprise systems.
          </p>
        </div>

        {/* Pricing Layout: Main Starting Card & Customized Quotation Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Main Starting Price Card (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border-2 border-[#08DDF2] p-8 md:p-10 shadow-xl relative overflow-hidden">
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#0869E8] to-[#00C9D9] text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-bl-2xl shadow-sm">
              Custom Web Solutions
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0869E8]">
                  Web Development Package
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#062B63] tracking-tight mt-1">
                  PROFESSIONAL WEBSITES
                </h3>
              </div>

              {/* Price Callout */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#EAF9FF] via-white to-blue-50 border border-[#08DDF2]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-2xl sm:text-3xl font-black text-[#062B63] tracking-tight">
                  Custom Quotation
                </span>
                <span className="text-[14px] text-slate-500 sm:ml-auto">Ghanaian Cedis</span>
              </div>

              {/* Supporting Description */}
              <p className="text-base text-slate-700 leading-relaxed font-medium">
                Get started with a professional website designed to showcase your business and connect you with customers.
              </p>

              {/* Inclusions list */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  What You Get in Our Foundation Package:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C9D9] shrink-0" />
                    <span>Responsive mobile &amp; desktop design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C9D9] shrink-0" />
                    <span>Core business profile pages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C9D9] shrink-0" />
                    <span>Working contact &amp; enquiry forms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C9D9] shrink-0" />
                    <span>Social &amp; WhatsApp click-to-chat links</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C9D9] shrink-0" />
                    <span>On-page SEO tags &amp; meta structure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C9D9] shrink-0" />
                    <span>Fast load speed &amp; secure delivery</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={() => onRequestQuote()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-[#062B63] bg-[#08DDF2] hover:bg-[#00C9D9] rounded-xl shadow-md hover:shadow-cyan-500/25 transition-all duration-200 cursor-pointer"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Required Pricing Note */}
              <div className="pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
                <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Note:</strong> Final pricing depends on your website requirements, number of pages, features, content, integrations, and other project specifications.
                </p>
              </div>
            </div>
          </div>

          {/* Customized Quotation Invitation Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#062B63] text-white p-8 md:p-10 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#08DDF2]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF9D00]" />
                <span>Custom Requirements</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white">
                Need E-commerce, Redesign, or Maintenance?
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                For online stores with shopping carts, existing website revamps, ongoing technical maintenance, or custom database workflows, we invite you to request a tailored project quotation.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm font-bold text-white flex items-center justify-between">
                    <span>E-commerce Web Stores</span>
                    <span className="text-xs text-[#08DDF2] font-mono">Custom Quote</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Catalogues, cart checkout, and payment gateways.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm font-bold text-white flex items-center justify-between">
                    <span>Website Redesign Projects</span>
                    <span className="text-xs text-[#08DDF2] font-mono">Custom Quote</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Modern visual refresh and mobile experience overhaul.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm font-bold text-white flex items-center justify-between">
                    <span>Ongoing Maintenance Plans</span>
                    <span className="text-xs text-[#08DDF2] font-mono">Custom Quote</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Updates, technical assistance, security, and bug fixes.</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => onRequestQuote('Custom Solution Request (E-commerce / Redesign / Maintenance)')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#062B63] bg-white hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              >
                <span>Request a Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Interactive Scope & Estimate Assistant */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-[#062B63] flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#0869E8]" />
                <span>Interactive Project Scope Assistant</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Configure your project details below to quickly attach your preliminary specifications to the enquiry form.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#062B63] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
              Tailored Quotations
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Website Type */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                1. Project Category
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#08DDF2]"
              >
                <option value="Business Website Design">Business Website Design</option>
                <option value="E-commerce Website">E-commerce Website</option>
                <option value="Website Redesign">Website Redesign</option>
                <option value="Website Maintenance">Website Maintenance</option>
                <option value="Landing Page Design">Landing Page Design</option>
              </select>
            </div>

            {/* Page Count */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                2. Page Count Scope
              </label>
              <select
                value={pageScope}
                onChange={(e) => setPageScope(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#08DDF2]"
              >
                <option value="1 to 5 Pages">1 to 5 Pages (Standard)</option>
                <option value="6 to 10 Pages">6 to 10 Pages (Comprehensive)</option>
                <option value="10+ Pages">10+ Pages (Large Enterprise)</option>
              </select>
            </div>

            {/* Optional Add-ons */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                3. Additional Assistance
              </label>
              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeHostingHelp}
                    onChange={(e) => setIncludeHostingHelp(e.target.checked)}
                    className="rounded text-[#0869E8] focus:ring-[#08DDF2]"
                  />
                  <span>Domain &amp; Hosting setup</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeMaintenance}
                    onChange={(e) => setIncludeMaintenance(e.target.checked)}
                    className="rounded text-[#0869E8] focus:ring-[#08DDF2]"
                  />
                  <span>Post-launch maintenance interest</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Transfer this scope selection directly into the enquiry form for a faster quotation.
            </span>
            <button
              onClick={handleBuildQuote}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#062B63] bg-[#08DDF2] hover:bg-[#00C9D9] rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Attach Scope to Enquiry Form</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
