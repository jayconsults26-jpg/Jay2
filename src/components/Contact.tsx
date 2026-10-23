import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, Shield, Clock, Copy, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface ContactProps {
  initialService?: string;
  initialMessage?: string;
  onClearInitial?: () => void;
  onOpenCall?: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  service: string;
  budget: string;
  message: string;
  privacyConsent: boolean;
  website_hp: string; // Honeypot
}

export const Contact: React.FC<ContactProps> = ({
  initialService,
  initialMessage,
  onClearInitial,
  onOpenCall,
}) => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    service: 'Business Website Design',
    budget: 'Starting Package (GHS 1,500 - GHS 3,000)',
    message: '',
    privacyConsent: false,
    website_hp: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    delivered?: boolean;
    pendingConfig?: boolean;
    enquiryId?: string;
    message: string;
  } | null>(null);

  // Sync external preselected values (e.g. from service cards or pricing calculator)
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
    if (initialMessage) {
      setFormData(prev => ({
        ...prev,
        message: prev.message ? `${prev.message}\n\n${initialMessage}` : initialMessage,
      }));
    }
  }, [initialService, initialMessage]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name is required (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide project details (minimum 10 characters).';
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must accept the privacy consent to submit.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitResult({
          success: true,
          delivered: data.delivered,
          pendingConfig: data.pendingConfig,
          enquiryId: data.enquiryId,
          message: data.message,
        });

        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          businessName: '',
          service: 'Business Website Design',
          budget: 'Starting Package (GHS 1,500 - GHS 3,000)',
          message: '',
          privacyConsent: false,
          website_hp: '',
        });

        if (onClearInitial) {
          onClearInitial();
        }
      } else {
        setSubmitResult({
          success: false,
          message: data.error || 'Failed to submit enquiry. Please try again.',
        });
      }
    } catch (err) {
      console.warn('Backend unavailable, sending directly to Formspree endpoint...', err);
      try {
        const formspreeRes = await fetch('https://formspree.io/f/xoeeqeeo', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            _replyto: formData.email,
            phone: formData.phone || 'Not provided',
            businessName: formData.businessName || 'Not provided',
            service: formData.service,
            budget: formData.budget || 'Not specified',
            message: formData.message,
            _subject: `New Website Enquiry: ${formData.service} — ${formData.fullName}`,
            submittedAt: new Date().toUTCString(),
          }),
        });

        if (formspreeRes.ok) {
          setSubmitResult({
            success: true,
            delivered: true,
            message: 'Your enquiry has been successfully delivered to Jay Consults! Our team will review your project details and respond promptly.',
          });
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            businessName: '',
            service: 'Business Website Design',
            budget: 'Starting Package (GHS 1,500 - GHS 3,000)',
            message: '',
            privacyConsent: false,
            website_hp: '',
          });
          if (onClearInitial) {
            onClearInitial();
          }
          return;
        }
      } catch (clientErr) {
        console.error('Direct Formspree submission error:', clientErr);
      }

      setSubmitResult({
        success: false,
        message: 'Could not connect to the enquiry service. You can send your message directly via email to jayconsults26@gmail.com or chat on WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    'Business Website Design',
    'E-commerce Website',
    'Website Redesign',
    'Website Maintenance',
    'Landing Page Design',
    'Domain and Hosting Assistance',
    'Other',
  ];

  const budgetOptions = [
    'Starting Package (GHS 1,500 - GHS 3,000)',
    'Standard / Growth (GHS 3,000 - GHS 6,000)',
    'Enterprise / Custom (GHS 6,000+)',
    'Not Sure Yet',
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08DDF2]/15 text-xs font-bold text-[#062B63] uppercase tracking-wider">
            <span>Contact Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062B63] tracking-tight">
            Let&rsquo;s Build Your Website
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Tell us about your project requirements and receive a prompt, professional consultation and quotation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Company Contact Information (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#062B63] via-[#041E47] to-[#0A192F] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#08DDF2]/10 rounded-full blur-2xl" />

              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/assets/aistudio/Final_Logo_e2a71aa8.png"
                  alt="Jay Consults Logo"
                  className="w-12 h-12 object-contain rounded-lg p-1 bg-white/10 logo-bright"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white">{COMPANY_INFO.name}</h3>
                  <p className="text-xs font-semibold text-[#08DDF2] uppercase tracking-wider">
                    {COMPANY_INFO.tagline}
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-sm">
                {/* Email for Enquiries */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#08DDF2]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                      Enquiries Email
                    </span>
                    <a
                      href={`mailto:${COMPANY_INFO.primaryEmail}`}
                      className="text-white hover:text-[#08DDF2] font-medium transition-colors break-all"
                    >
                      {COMPANY_INFO.primaryEmail}
                    </a>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Alt: <a href={`mailto:${COMPANY_INFO.secondaryEmail}`} className="hover:text-[#08DDF2] underline">{COMPANY_INFO.secondaryEmail}</a>
                    </div>
                  </div>
                </div>

                {/* Telephone Numbers */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#08DDF2]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                        Telephone Lines
                      </span>
                      {onOpenCall && (
                        <button
                          type="button"
                          onClick={onOpenCall}
                          className="text-[11px] text-[#08DDF2] hover:underline font-medium cursor-pointer"
                        >
                          View All Lines
                        </button>
                      )}
                    </div>
                    <div className="space-y-2 mt-2">
                      {COMPANY_INFO.phones.map((phone, idx) => (
                        <div
                          key={idx}
                          className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${phone.value}`}
                              className="text-white hover:text-[#08DDF2] font-semibold text-xs sm:text-sm transition-colors"
                            >
                              {phone.display}
                            </a>
                            {phone.hasWhatsApp && (
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                                WhatsApp
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(phone.value);
                                setCopiedPhone(phone.display);
                                setTimeout(() => setCopiedPhone(null), 2000);
                              }}
                              className="px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                              title="Copy number to clipboard"
                            >
                              {copiedPhone === phone.display ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400 font-bold">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-slate-400" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                            <a
                              href={`tel:${phone.value}`}
                              className="px-2.5 py-1 text-[11px] font-bold text-[#062B63] bg-[#08DDF2] hover:bg-[#00C9D9] active:scale-95 rounded-md transition-all flex items-center gap-1 cursor-pointer"
                              title={`Call ${phone.display}`}
                            >
                              <Phone className="w-3 h-3" />
                              <span>Call</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Postal Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#FF9D00]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                      Postal Address
                    </span>
                    <p className="text-slate-200 font-medium">
                      {COMPANY_INFO.address.full}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href={COMPANY_INFO.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-98 rounded-xl shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp (+233 244 623265)</span>
                </a>
              </div>
            </div>

            {/* Quick Guarantees / Process Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#0869E8]" />
                <span>Response Time Commitment</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We review every submitted enquiry and typically respond within 24 hours on business days with preliminary consultation and quotation guidelines.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Your information is held in strict privacy.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form (7 Cols) */}
          <div
            id="quotation-form"
            className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-lg scroll-mt-28"
          >
            
            {submitResult && submitResult.success ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  {submitResult.message}
                </p>

                {submitResult.enquiryId && (
                  <div className="p-3 bg-white rounded-lg border border-emerald-200 inline-block text-xs font-mono text-emerald-950 font-bold">
                    Reference ID: {submitResult.enquiryId}
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={COMPANY_INFO.whatsapp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors"
                  >
                    Continue on WhatsApp
                  </a>
                  <button
                    onClick={() => setSubmitResult(null)}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot field (hidden from humans, trap for bots) */}
                <input
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-[#062B63]">
                    Request a Quotation or Consultation
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below. All messages route directly to our website enquiry team ({COMPANY_INFO.primaryEmail}).
                  </p>
                </div>

                {submitResult && !submitResult.success && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{submitResult.message}</span>
                  </div>
                )}

                {/* 1. Full Name & 2. Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="quote-fullname"
                      type="text"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full text-sm px-4 py-2.5 rounded-xl border ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'
                      } text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#08DDF2]`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. kwame@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full text-sm px-4 py-2.5 rounded-xl border ${
                        errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'
                      } text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#08DDF2]`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* 3. Phone Number & 4. Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +233 24 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#08DDF2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Company or Business Name <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mensah Enterprises"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#08DDF2]"
                    />
                  </div>
                </div>

                {/* 5. Service Required & 6. Estimated Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Service Required <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#08DDF2]"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Estimated Budget <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#08DDF2]"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 7. Project Details / Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Project Details / Message <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {formData.message.length} chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project, website goals, required pages, design preferences, and timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full text-sm p-4 rounded-xl border ${
                      errors.message ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'
                    } text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#08DDF2]`}
                  />
                  {errors.message && <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>}
                </div>

                {/* 8. Privacy Consent Checkbox */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.privacyConsent}
                      onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                      className="mt-1 rounded text-[#0869E8] focus:ring-[#08DDF2] cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 leading-normal">
                      I agree to have my information used by Jay Consults to respond to this enquiry in accordance with the company privacy policy. <span className="text-rose-500">*</span>
                    </span>
                  </label>
                  {errors.privacyConsent && (
                    <p className="text-[11px] text-rose-600 mt-1 pl-6">{errors.privacyConsent}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-[#062B63] bg-[#08DDF2] hover:bg-[#00C9D9] active:scale-98 rounded-xl shadow-md hover:shadow-cyan-500/25 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send My Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Enquiries delivered directly to our team via Formspree ({COMPANY_INFO.primaryEmail}). Secure validation.
                  </p>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
