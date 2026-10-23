export interface CompanyInfo {
  name: string;
  tagline: string;
  mainMarketingMessage: string;
  supportingMessage: string;
  businessType: string;
  startingPrice: string;
  startingPriceFormatted: string;
  primaryEmail: string;
  secondaryEmail: string;
  phones: {
    display: string;
    value: string;
    primary?: boolean;
    hasWhatsApp?: boolean;
  }[];
  address: {
    poBox: string;
    area: string;
    city: string;
    country: string;
    full: string;
  };
  whatsapp: {
    number: string;
    formatted: string;
    prefilledMessage: string;
    link: string;
  };
}

export const COMPANY_INFO: CompanyInfo = {
  name: "Jay Consults",
  tagline: "Driven by Excellence",
  mainMarketingMessage: "YOUR VISION. OUR DIGITAL EXPERTISE.",
  supportingMessage: "Professional Websites That Grow Your Business.",
  businessType: "Information and Communication Technology (ICT) and professional website development",
  startingPrice: "GHS 1,500.00",
  startingPriceFormatted: "GH₵ 1,500.00",
  primaryEmail: "jayconsults26@gmail.com",
  secondaryEmail: "jayconsults24@gmail.com",
  phones: [
    { display: "+233 244 623265", value: "+233244623265", primary: true, hasWhatsApp: true },
    { display: "+233 302 973151", value: "+233302973151" },
    { display: "+233 501 637871", value: "+233501637871" },
  ],
  address: {
    poBox: "P. O. Box CT 3511",
    area: "Cantonments",
    city: "Accra",
    country: "Ghana",
    full: "P. O. Box CT 3511, Cantonments, Accra, Ghana.",
  },
  whatsapp: {
    number: "+233 244 623265",
    formatted: "233244623265",
    prefilledMessage: "Hello Jay Consults, I would like to enquire about your website development services.",
    link: "https://wa.me/233244623265?text=Hello%20Jay%20Consults%2C%20I%20would%20like%20to%20enquire%20about%20your%20website%20development%20services.",
  },
};

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  features: string[];
  iconName: 'Globe' | 'ShoppingCart' | 'RefreshCw' | 'Wrench';
  badge?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "business-website",
    title: "Business Website Design",
    shortDescription: "Professional websites that build your brand, establish credibility, and help customers discover your business online.",
    features: [
      "Professional and modern layouts",
      "Mobile-friendly and responsive design",
      "Business information and service pages",
      "Contact forms and enquiry options",
      "Clear calls to action",
    ],
    iconName: "Globe",
    badge: "Most Popular",
  },
  {
    id: "ecommerce-website",
    title: "E-commerce Website Development",
    shortDescription: "Sell online, reach more customers, and create a convenient digital shopping experience.",
    features: [
      "Online product catalogues",
      "Shopping cart and checkout integration",
      "Product and order management",
      "Payment gateway integration where supported",
      "Mobile-friendly shopping experience",
    ],
    iconName: "ShoppingCart",
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    shortDescription: "Give your existing website a modern look, improve its usability, and create a better experience for visitors.",
    features: [
      "Modern visual design",
      "Improved navigation and page structure",
      "Responsive layouts",
      "Performance and usability improvements",
      "Clearer presentation of products and services",
    ],
    iconName: "RefreshCw",
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    shortDescription: "Keep your website updated, secure, functional, and running smoothly.",
    features: [
      "Website updates",
      "Bug fixes and troubleshooting",
      "Performance checks",
      "Backup configuration where supported",
      "Security maintenance and technical assistance",
    ],
    iconName: "Wrench",
  },
];

export const ADDITIONAL_CAPABILITIES = [
  {
    title: "Domain & Hosting Setup",
    desc: "Assistance configuring reliable DNS, server environments, and professional business emails.",
  },
  {
    title: "High-Converting Landing Pages",
    desc: "Single-page campaign sites focused on focused user action and lead capture.",
  },
  {
    title: "Website Speed Optimization",
    desc: "Streamlined code, asset compression, and performance tuning for fast load times.",
  },
  {
    title: "Search Engine Optimization (SEO)",
    desc: "On-page metadata, semantic markup, and structure to help search engines index your pages.",
  },
  {
    title: "Ongoing Technical Support",
    desc: "Responsive assistance for troubleshooting, content updates, and server maintenance.",
  },
];

export const TRUST_HIGHLIGHTS = [
  { label: "Responsive Design", desc: "Flawless on phone, tablet & desktop" },
  { label: "Modern UI/UX", desc: "Clean typography & polished interfaces" },
  { label: "SEO-Friendly", desc: "Structured semantic HTML & metadata" },
  { label: "Secure & Fast", desc: "Optimized performance & secure protocols" },
];
