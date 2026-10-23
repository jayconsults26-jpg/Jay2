import React from 'react';
import { ArrowRight, Target, Compass, Award, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface AboutProps {
  onWorkWithUs: () => void;
}

export const About: React.FC<AboutProps> = ({ onWorkWithUs }) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold tracking-widest text-[#0869E8] uppercase mb-2">
            About Jay Consults
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062B63] tracking-tight" style={{ textWrap: 'balance' }}>
            Information &amp; Communication Technology Company Focused on Your Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Emblem & Key Pillars */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#062B63] via-[#041E47] to-[#0A192F] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#08DDF2]/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/assets/aistudio/Final_Logo_e2a71aa8.png"
                  alt="Jay Consults Logo"
                  className="w-16 h-16 object-contain rounded-xl p-1 bg-white/10 logo-bright"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white">Jay Consults</h3>
                  <p className="text-xs font-semibold text-[#08DDF2] tracking-wider uppercase">
                    {COMPANY_INFO.tagline}
                  </p>
                </div>
              </div>

              <blockquote className="border-l-2 border-[#08DDF2] pl-4 text-sm text-slate-200 italic my-4">
                "Our guiding principle is &lsquo;Driven by Excellence.&rsquo; We aim to deliver digital solutions that reflect our clients&rsquo; vision and support their business goals."
              </blockquote>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF9D00]" />
                  <span>Accra, Ghana</span>
                </span>
                <span className="text-[#08DDF2] font-semibold">ICT &amp; Web Development</span>
              </div>
            </div>

            {/* Three Foundation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Target className="w-5 h-5 text-[#0869E8] mb-2" />
                <h4 className="text-sm font-bold text-[#062B63]">Client-Centered</h4>
                <p className="text-xs text-slate-600 mt-1">Reflecting your unique vision and goals</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Compass className="w-5 h-5 text-[#00C9D9] mb-2" />
                <h4 className="text-sm font-bold text-[#062B63]">Modern UI/UX</h4>
                <p className="text-xs text-slate-600 mt-1">Clean layouts engineered for real engagement</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Award className="w-5 h-5 text-[#FF9D00] mb-2" />
                <h4 className="text-sm font-bold text-[#062B63]">Excellence</h4>
                <p className="text-xs text-slate-600 mt-1">Reliable code, security, and responsive layouts</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Body */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-slate max-w-none text-base text-slate-700 leading-relaxed space-y-4">
              <p className="text-lg font-medium text-slate-900 leading-relaxed">
                Jay Consults is an Information and Communication Technology company focused on helping businesses establish and strengthen their digital presence. We create professional websites that communicate your brand, showcase your products and services, and make it easier for customers to connect with your business.
              </p>

              <p>
                Our approach combines modern design, user-friendly experiences, responsive layouts, and practical digital solutions to help businesses present themselves professionally online.
              </p>

              <p>
                At Jay Consults, our guiding principle is &lsquo;Driven by Excellence.&rsquo; We aim to deliver digital solutions that reflect our clients&rsquo; vision and support their business goals.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onWorkWithUs}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#062B63] hover:bg-[#0869E8] rounded-xl shadow-sm transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>Work With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-slate-500">
                <span>Direct inquiries: </span>
                <a
                  href={`mailto:${COMPANY_INFO.primaryEmail}`}
                  className="text-[#0869E8] font-semibold hover:underline"
                >
                  {COMPANY_INFO.primaryEmail}
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
