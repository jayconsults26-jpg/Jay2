export interface PortfolioProject {
  id: string;
  title: string;
  badge: 'Demo Project' | 'Concept Design';
  category: 'Business Websites' | 'E-commerce Stores' | 'Corporate Websites' | 'Portfolio Websites' | 'Landing Pages';
  categoryKey: 'business' | 'ecommerce' | 'corporate' | 'portfolio' | 'landing';
  description: string;
  image: string;
  highlights: string[];
  deliverables: string[];
  sampleStartingPrice: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "demo-corporate-strategy",
    title: "Nexus Advisory & Management Consultants",
    badge: "Concept Design",
    category: "Business Websites",
    categoryKey: "business",
    description: "A professional business consultancy website concept showcasing advisory services, leadership profiles, case studies, and an enquiry workflow.",
    image: "/src/assets/images/demo_business_consulting_1792582740884.jpg",
    highlights: [
      "Custom brand color harmonization",
      "Executive team bio layout",
      "Interactive service catalogue",
      "Lead generation contact form"
    ],
    deliverables: ["Responsive UI", "Multi-page navigation", "Mobile layout", "SEO tags"],
    sampleStartingPrice: "GHS 1,500.00",
  },
  {
    id: "demo-retail-store",
    title: "Elevate Home Goods & Lifestyle Store",
    badge: "Concept Design",
    category: "E-commerce Stores",
    categoryKey: "ecommerce",
    description: "A modern e-commerce storefront demonstration featuring product categorization, cart workflow, search filtering, and mobile shopping optimization.",
    image: "/src/assets/images/demo_ecommerce_store_1792582741848.jpg",
    highlights: [
      "Grid product catalogue with quick filters",
      "Interactive cart & order summary",
      "Payment gateway ready structure",
      "Mobile-optimized checkout experience"
    ],
    deliverables: ["Product catalogue", "Shopping cart", "Order notifications", "Search bar"],
    sampleStartingPrice: "Tailored Quote",
  },
  {
    id: "demo-enterprise-ict",
    title: "Global Tech Solutions Enterprise Portal",
    badge: "Concept Design",
    category: "Corporate Websites",
    categoryKey: "corporate",
    description: "An enterprise ICT solutions web portal concept with multi-tier architecture, solution whitepapers, security credentials, and department contact routing.",
    image: "/src/assets/images/demo_corporate_enterprise_1792582743252.jpg",
    highlights: [
      "Enterprise information hierarchy",
      "Technical specifications matrices",
      "Modern dark/light high-contrast aesthetic",
      "Multi-channel support access"
    ],
    deliverables: ["Corporate architecture", "Solution pages", "Service level guidelines", "Contact directory"],
    sampleStartingPrice: "Tailored Quote",
  },
  {
    id: "demo-architecture-studio",
    title: "Studio Nord Architecture & Design",
    badge: "Concept Design",
    category: "Portfolio Websites",
    categoryKey: "portfolio",
    description: "A visual portfolio showcase website concept for architecture and creative studios, emphasizing high-resolution imagery and minimalist layouts.",
    image: "/src/assets/images/demo_creative_portfolio_1792582743272.jpg",
    highlights: [
      "Full-bleed visual gallery display",
      "Project detail deep-dives",
      "Minimalist typographic pacing",
      "Fast image asset loading"
    ],
    deliverables: ["Visual gallery", "Case study layouts", "Client inquiry trigger", "Tablet & mobile tuning"],
    sampleStartingPrice: "GHS 1,500.00",
  },
  {
    id: "demo-saas-launch",
    title: "NexusFlow Cloud Automation Platform",
    badge: "Concept Design",
    category: "Landing Pages",
    categoryKey: "landing",
    description: "A high-converting product launch landing page concept built to communicate value, demonstrate key features, and capture qualified leads.",
    image: "/src/assets/images/demo_landing_page_1792582742674.jpg",
    highlights: [
      "Focused hero call-to-action",
      "Feature comparison breakdown",
      "Visual architecture flow diagram",
      "Frictionless lead capture modal"
    ],
    deliverables: ["Single-page funnel", "Lead magnet form", "Responsive layout", "Fast page performance"],
    sampleStartingPrice: "GHS 1,500.00",
  },
];
