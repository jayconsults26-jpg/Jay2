import React from 'react';
import { Globe, ShoppingCart, RefreshCw, Wrench, CheckCircle2, ArrowRight, Layers, ShieldCheck, Server, Sparkles } from 'lucide-react';
import { SERVICES, ADDITIONAL_CAPABILITIES } from '../data/companyData';

interface ServicesProps {
  onRequestService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onRequestService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-7 h-7 text-[#08DDF2]" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-7 h-7 text-[#00C9D9]" />;
      case 'RefreshCw':
        return <RefreshCw className="w-7 h-7 text-[#0869E8]" />;
      case 'Wrench':
        return <Wrench className="w-7 h-7 text-[#FF9D00]" />;
      default:
        return <Layers className="w-7 h-7 text-[#08DDF2]" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#062B63]/10 text-xs font-bold text-[#062B63] uppercase tracking-wider">
            <span>Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062B63] tracking-tight">
            Tailored ICT &amp; Web Development Solutions
          </h2>
          <p className="text-base text-slate-600">
            From modern corporate sites to e-commerce storefronts and maintenance, we engineer digital platforms that advance your business objectives.
          </p>
        </div>

        {/* 4 Primary Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="rounded-2xl bg-white border border-slate-200/80 p-8 shadow-sm hover:shadow-md hover:border-[#08DDF2]/60 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {service.badge && (
                <span className="absolute top-6 right-6 text-[11px] font-bold text-[#0869E8] bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
                  {service.badge}
                </span>
              )}

              <div>
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[#062B63] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">
                      0{idx + 1}. Capability
                    </span>
                    <h3 className="text-xl font-bold text-[#062B63] group-hover:text-[#0869E8] transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Key Features Included:
                  </span>
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#00C9D9] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => onRequestService(service.title)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-[#062B63] bg-[#EAF9FF] hover:bg-[#08DDF2] hover:text-[#062B63] rounded-xl transition-all duration-200 cursor-pointer"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Capabilities Section */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">
          <div className="max-w-2xl mb-6">
            <h3 className="text-xl font-bold text-[#062B63] mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF9D00]" />
              <span>Additional Digital Capabilities</span>
            </h3>
            <p className="text-xs text-slate-500">
              Beyond core website design, Jay Consults provides supporting technical capabilities to ensure comprehensive digital success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADDITIONAL_CAPABILITIES.map((cap, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
                <h4 className="text-sm font-bold text-[#062B63] mb-1">{cap.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>* Third-party domain registration, hosting, and external SaaS services are tailored to client project requirements.</span>
            <button
              onClick={() => onRequestService("Domain and Hosting Assistance")}
              className="text-[#0869E8] font-bold hover:underline self-start sm:self-auto cursor-pointer"
            >
              Consult with our team &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
