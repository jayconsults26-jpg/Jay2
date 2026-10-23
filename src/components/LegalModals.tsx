import React from 'react';
import { X, Shield, FileCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#062B63] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <Shield className="w-5 h-5 text-[#08DDF2]" />
            ) : (
              <FileCheck className="w-5 h-5 text-[#FF9D00]" />
            )}
            <h3 className="text-lg font-bold">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-slate-900">
                Last updated: October 2026 · Jay Consults, Cantonments, Accra, Ghana
              </p>
              <h4 className="font-bold text-[#062B63] text-sm pt-2">1. Information We Collect</h4>
              <p>
                When you submit an enquiry through our website, we collect your name, email address, phone number (if provided), business name, service request, budget expectations, and project details.
              </p>
              <h4 className="font-bold text-[#062B63] text-sm pt-2">2. How We Use Your Information</h4>
              <p>
                We use your submitted information exclusively to evaluate your website development requirements, respond with customized quotations, schedule discovery consultations, and provide customer support.
              </p>
              <h4 className="font-bold text-[#062B63] text-sm pt-2">3. Data Protection &amp; Confidentiality</h4>
              <p>
                Jay Consults respects client confidentiality. We do not sell, rent, or trade your contact information or project specifications with third parties.
              </p>
              <h4 className="font-bold text-[#062B63] text-sm pt-2">4. Contact Inquiries</h4>
              <p>
                For questions concerning privacy or data handling, please reach out to our primary enquiry inbox at <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="text-[#0869E8] underline">{COMPANY_INFO.primaryEmail}</a> or P. O. Box CT 3511, Cantonments, Accra, Ghana.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-900">
                Last updated: October 2026 · Jay Consults
              </p>
              <h4 className="font-bold text-[#062B63] text-sm pt-2">1. Quotations &amp; Starting Pricing</h4>
              <p>
                All indicative prices (including our starting rate of {COMPANY_INFO.startingPrice}) apply to baseline professional websites. Formal project pricing is confirmed through a written quotation based on verified scope, number of pages, custom functionality, content preparation, and third-party integrations.
              </p>
              <h4 className="font-bold text-[#062B63] text-sm pt-2">2. Project Execution &amp; Approvals</h4>
              <p>
                Website design and development projects proceed in structured stages: discovery, structural wireframing/design, development, client review, and final deployment.
              </p>
              <h4 className="font-bold text-[#062B63] text-sm pt-2">3. Third-Party Services</h4>
              <p>
                Domain registration, external web hosting, third-party payment gateways, and specialized software licenses are third-party services whose recurring fees are determined by their respective providers.
              </p>
              <h4 className="font-bold text-[#062B63] text-sm pt-2">4. Maintenance &amp; Support</h4>
              <p>
                Ongoing updates, technical troubleshooting, and maintenance services are provided under dedicated service agreements tailored to client requirements.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#062B63] hover:bg-[#0869E8] rounded-lg transition-colors"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
