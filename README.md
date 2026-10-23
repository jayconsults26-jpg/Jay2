# Jay Consults — Professional Website Design & ICT Solutions

Official corporate website for **Jay Consults**, an Information and Communication Technology (ICT) and professional website development company based in Cantonments, Accra, Ghana.

**Tagline:** Driven by Excellence  
**Main Marketing Message:** YOUR VISION. OUR DIGITAL EXPERTISE.  
**Supporting Message:** We Build Websites That Grow Your Business.  
**Starting Price:** GHS 1,500.00  

---

## 1. Company Information & Contact Channels

| Field | Detail |
| :--- | :--- |
| **Company Name** | Jay Consults |
| **Business Type** | Information and Communication Technology (ICT) & Professional Web Development |
| **Primary Enquiry Email** | [jayconsults26@gmail.com](mailto:jayconsults26@gmail.com) |
| **Secondary Email** | [jayconsults24@gmail.com](mailto:jayconsults24@gmail.com) |
| **Telephone 1 (Call/WhatsApp)** | [+233 244 623265](tel:+233244623265) |
| **Telephone 2** | [+233 302 973151](tel:+233302973151) |
| **Telephone 3** | [+233 501 637871](tel:+233501637871) |
| **Postal Address** | P. O. Box CT 3511, Cantonments, Accra, Ghana |
| **WhatsApp Direct Link** | [Chat on WhatsApp](https://wa.me/233244623265?text=Hello%20Jay%20Consults%2C%20I%20would%20like%20to%20enquire%20about%20your%20website%20development%20services.) |

---

## 2. Services & Pricing Structure

### Core Services
1. **Business Website Design** — Professional websites that build brand credibility, feature company profiles, and provide intuitive contact workflows.
2. **E-commerce Website Development** — Online product catalogues, shopping carts, checkout workflows, and payment gateway readiness.
3. **Website Redesign** — Modern UI overhaul, improved navigation, mobile responsiveness, and performance improvements.
4. **Website Maintenance** — Security updates, technical bug fixes, performance monitoring, and server troubleshooting.

### Additional Capabilities
- Domain & Hosting Setup assistance
- High-converting Landing Pages
- Website Speed Optimization
- On-page Search Engine Optimization (SEO) & Schema.org Structured Data
- Ongoing Technical Support

### Pricing Guideline
- **Professional Websites:** Starting from **GHS 1,500.00**.
- *Note:* Final pricing depends on project requirements, number of pages, custom features, content preparation, and third-party integrations. Customized quotations are provided for e-commerce, redesign, and maintenance.

---

## 3. Technology Stack & Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React icons.
- **Backend:** Node.js Express full-stack architecture (`server.ts`).
- **Email Pipeline:** Live integration with Formspree (`https://formspree.io/f/xoeeqeeo`) routing submissions directly to your email inbox, with automatic local JSON backup logging (`data/enquiries.json`).
- **Security:** Honeypot bot protection (`website_hp`), in-memory IP rate limiting, input sanitization, and strict field validation.
- **SEO & Social:** Open Graph, Twitter card tags, and Schema.org `ProfessionalService` JSON-LD structured data.

---

## 4. Environment Variables (`.env`)

Refer to `.env.example`:

```env
# Optional Resend API key for live outbound email delivery to jayconsults26@gmail.com
RESEND_API_KEY="re_123456789_abcdef"

# Verified sender email configured in your Resend account
RESEND_FROM_EMAIL="Jay Consults <onboarding@resend.dev>"

# Server listening port (default 3000)
PORT="3000"
```

---

## 5. Configuring Live Email Delivery via Resend

The website is wired to deliver incoming client enquiries to **jayconsults26@gmail.com**. When a visitor submits the enquiry form:
- The visitor's email is set as `reply_to`.
- All client details (Name, Phone, Business, Selected Service, Budget, and Project Message) are formatted into a clean HTML notification.

### Setup Steps:
1. Create a free account at [Resend.com](https://resend.com).
2. Add your custom domain (e.g. `jayconsults.com`) under **Domains**.
3. Add the 3 provided DNS records (SPF and DKIM TXT/MX records) in your domain registrar's DNS management console.
4. Once verified, generate an API key under **API Keys**.
5. Set `RESEND_API_KEY="re_..."` and `RESEND_FROM_EMAIL="Jay Consults <enquiries@jayconsults.com>"` in your server environment variables.
6. If the key is not set, enquiries are safely persisted to `data/enquiries.json` with a reference ID, so no lead is ever lost.

---

## 6. Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start full-stack development server
npm run dev
# The website will be available at http://localhost:3000
```

---

## 7. Production Build & Deployment

```bash
# 1. Compile production frontend bundle
npm run build

# 2. Start production server
npm start
```

The production server serves the optimized static assets from `dist` and handles `/api/enquiries` and `/api/status` seamlessly.

---

## 8. Production Readiness Checklist

- [x] Responsive layout tested for mobile, tablet, and desktop viewports.
- [x] Official company logo (`/assets/aistudio/Final_Logo_e2a71aa8.png`) and flyer (`/assets/aistudio/jay_consults_flyer_2_1edcc109.jpg`) displayed.
- [x] Exact contact details match company specifications: Accra, Ghana, +233 244 623265, jayconsults26@gmail.com.
- [x] WhatsApp floating button active with prefilled message.
- [x] Enquiry form validates fields, catches bots with honeypot, and logs submissions.
- [x] Schema.org JSON-LD structured data and OpenGraph tags configured.
- [x] Privacy Policy and Terms of Service modals available.
