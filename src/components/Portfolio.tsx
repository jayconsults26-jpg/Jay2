import React, { useState } from 'react';
import { ExternalLink, Layers, Monitor, Tablet, Smartphone, Check, ArrowRight, X } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/portfolioData';

interface PortfolioProps {
  onEnquireSimilar: (projectName: string, serviceCategory: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onEnquireSimilar }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'business', label: 'Business Websites' },
    { id: 'ecommerce', label: 'E-commerce Stores' },
    { id: 'corporate', label: 'Corporate Websites' },
    { id: 'portfolio', label: 'Portfolio Websites' },
    { id: 'landing', label: 'Landing Pages' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.categoryKey === activeCategory);

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08DDF2]/15 text-xs font-bold text-[#062B63] uppercase tracking-wider">
              <span>Our Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#062B63] tracking-tight">
              Demonstration Projects &amp; Concept Designs
            </h2>
            <p className="text-sm text-slate-600">
              Explore interactive website concept designs demonstrating the design quality, responsive engineering, and digital solutions Jay Consults delivers.
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg shrink-0 self-start md:self-auto">
            <span className="font-semibold text-slate-700">Notice: </span>
            All showcase projects are labeled as concept demonstrations.
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#062B63] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#08DDF2]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Container */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.category}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#062B63]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {project.badge}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#062B63] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    {project.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062B63]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-[#08DDF2]" /> View Interactive Preview
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#062B63] group-hover:text-[#0869E8] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.deliverables.map((d, i) => (
                      <span key={i} className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-bold text-[#0869E8] hover:text-[#062B63] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Inspect Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onEnquireSimilar(project.title, project.category)}
                  className="text-xs font-semibold text-[#062B63] bg-[#EAF9FF] hover:bg-[#08DDF2] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#062B63] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xs font-bold bg-[#08DDF2] text-[#062B63] px-2.5 py-0.5 rounded uppercase">
                  {selectedProject.badge}
                </div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight truncate max-w-md">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Responsive Viewport Switcher Simulation */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700">Preview Device Viewport:</span>
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded ${
                      viewportMode === 'desktop' ? 'bg-[#062B63] text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setViewportMode('tablet')}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded ${
                      viewportMode === 'tablet' ? 'bg-[#062B63] text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    <span>Tablet</span>
                  </button>
                  <button
                    onClick={() => setViewportMode('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded ${
                      viewportMode === 'mobile' ? 'bg-[#062B63] text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="flex justify-center bg-slate-100 p-4 rounded-xl border border-slate-200">
                <div
                  className={`transition-all duration-300 overflow-hidden rounded-xl border-4 border-slate-800 shadow-xl bg-white ${
                    viewportMode === 'desktop'
                      ? 'w-full max-w-2xl aspect-[16/10]'
                      : viewportMode === 'tablet'
                      ? 'w-[480px] aspect-[4/3]'
                      : 'w-[280px] aspect-[9/16]'
                  }`}
                >
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Project Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-[#062B63] mb-2">Project Overview</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  <div className="mt-4">
                    <span className="text-xs font-semibold text-slate-500 block mb-2">Specifications &amp; Inclusions:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.deliverables.map((item, idx) => (
                        <span key={idx} className="text-xs bg-blue-50 text-[#0869E8] px-2.5 py-1 rounded font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#062B63] mb-2">Key Engineering Features</h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#00C9D9] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    <span className="font-bold">Indicative Starting Price: </span>
                    <span>{selectedProject.sampleStartingPrice}</span> (final quotation determined by specific customer feature requirements).
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Interested in a website like this for your business?
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedProject.title;
                    const cat = selectedProject.category;
                    setSelectedProject(null);
                    onEnquireSimilar(title, cat);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-[#062B63] bg-[#08DDF2] hover:bg-[#00C9D9] rounded-lg shadow-sm"
                >
                  Enquire About Similar Project
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
