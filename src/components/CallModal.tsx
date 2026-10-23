import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (display: string, value: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(value);
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopiedNumber(display);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const getPhoneLabel = (idx: number, isPrimary?: boolean) => {
    if (isPrimary) return 'Primary Mobile & WhatsApp Line';
    if (idx === 1) return 'Office Landline';
    return 'Direct Mobile Line';
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#062B63] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#08DDF2] shrink-0 border border-white/10">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Call Jay Consults
              </h3>
              <p className="text-xs text-[#08DDF2]">
                Cantonments, Accra, Ghana · Mon – Fri: 8:00 AM – 6:00 PM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close call modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2 text-slate-800 font-semibold mb-1">
              <ShieldCheck className="w-4 h-4 text-[#0869E8]" />
              <span>Direct Phone &amp; Instant Communication</span>
            </div>
            Tap <strong>Call Now</strong> to launch your phone dialer, or tap <strong>Copy</strong> to paste the number into your dialer or contacts.
          </div>

          {/* List of Numbers */}
          <div className="space-y-3">
            {COMPANY_INFO.phones.map((p, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  p.primary
                    ? 'bg-cyan-50/40 border-[#08DDF2]/50 shadow-sm'
                    : 'bg-white border-slate-200'
                } flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-[#062B63] tracking-tight">
                      {p.display}
                    </span>
                    {p.primary && (
                      <span className="text-[10px] font-bold text-[#0869E8] bg-[#0869E8]/10 px-2 py-0.5 rounded-full uppercase">
                        Primary
                      </span>
                    )}
                    {p.hasWhatsApp && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        WhatsApp
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {getPhoneLabel(idx, p.primary)}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(p.display, p.value)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#062B63] bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                    title={`Copy ${p.display}`}
                  >
                    {copiedNumber === p.display ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* Direct Call Link */}
                  <a
                    href={`tel:${p.value}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#062B63] hover:bg-[#0869E8] active:scale-95 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#08DDF2]" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick WhatsApp Banner */}
          <div className="pt-2">
            <a
              href={COMPANY_INFO.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-98 rounded-2xl shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (+233 244 623265)</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Official lines for Jay Consults Ghana</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
