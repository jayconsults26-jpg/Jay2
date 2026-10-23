import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      {/* Optional Hover / Mobile Tooltip */}
      {showTooltip && (
        <div className="mr-3 bg-[#062B63] text-white text-xs px-3 py-2 rounded-xl shadow-xl border border-[#08DDF2]/30 flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200 whitespace-nowrap">
          <span>Chat directly with Jay Consults</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={COMPANY_INFO.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white rounded-full shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Chat on WhatsApp with Jay Consults (+233 244 623265)"
      >
        <span className="sr-only">Chat with Jay Consults on WhatsApp</span>
        
        {/* Animated pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-current transition-transform group-hover:scale-110" />

        {/* Tiny online indicator */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-white border-2 border-emerald-500 rounded-full" />
      </a>
    </div>
  );
};
