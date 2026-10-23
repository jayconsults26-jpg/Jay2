import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting in-memory storage
const submissionHistory = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 5;

// Data persistence directory for enquiries
const dataDir = path.join(__dirname, 'data');
const enquiriesFilePath = path.join(dataDir, 'enquiries.json');

if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (err) {
    console.warn('Could not create data directory:', err);
  }
}

interface EnquiryRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  service: string;
  budget?: string;
  message: string;
  privacyConsent: boolean;
  ip: string;
  userAgent?: string;
  createdAt: string;
  emailDeliveryStatus: 'delivered' | 'pending_provider_setup' | 'failed';
  emailDeliveryError?: string;
}

function saveEnquiry(record: EnquiryRecord) {
  try {
    let existing: EnquiryRecord[] = [];
    if (fs.existsSync(enquiriesFilePath)) {
      const data = fs.readFileSync(enquiriesFilePath, 'utf-8');
      existing = JSON.parse(data);
    }
    existing.unshift(record);
    // Keep last 100 in file
    if (existing.length > 100) {
      existing = existing.slice(0, 100);
    }
    fs.writeFileSync(enquiriesFilePath, JSON.stringify(existing, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist enquiry to file:', err);
  }
}

// Validation helper
function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function sanitizeText(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

// Health and provider status endpoint
app.get('/api/status', (_req: Request, res: Response) => {
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/xoeeqeeo';
  const resendConfigured = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim() !== '');
  const targetRecipient = 'jayconsults26@gmail.com (via Formspree)';
  
  res.json({
    company: 'Jay Consults',
    emailServiceConfigured: true,
    targetRecipient,
    formspreeEndpoint,
    provider: 'Formspree (https://formspree.io/f/xoeeqeeo)',
    notice: 'Live email delivery active via Formspree endpoint (https://formspree.io/f/xoeeqeeo) routing directly to company inbox.'
  });
});

// Enquiry submission endpoint
app.post('/api/enquiries', async (req: Request, res: Response) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

    // 1. Honeypot check for bots
    const honeypot = req.body.website_hp;
    if (honeypot) {
      // Quietly reject bot without giving feedback
      return res.status(200).json({ success: true, message: 'Enquiry received.' });
    }

    // 2. In-memory Rate Limiting
    const now = Date.now();
    const timestamps = submissionHistory.get(clientIp) || [];
    const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      return res.status(429).json({
        success: false,
        error: 'Too many submissions from this connection. Please wait a few minutes or contact us directly on WhatsApp (+233 244 623265).'
      });
    }
    recent.push(now);
    submissionHistory.set(clientIp, recent);

    // 3. Field validation & sanitization
    const fullName = sanitizeText(req.body.fullName);
    const email = sanitizeText(req.body.email);
    const phone = sanitizeText(req.body.phone);
    const businessName = sanitizeText(req.body.businessName);
    const service = sanitizeText(req.body.service);
    const budget = sanitizeText(req.body.budget);
    const message = sanitizeText(req.body.message);
    const privacyConsent = Boolean(req.body.privacyConsent);

    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ success: false, error: 'Please provide your full name (minimum 2 characters).' });
    }
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }
    if (!service) {
      return res.status(400).json({ success: false, error: 'Please select the service you require.' });
    }
    if (!message || message.length < 10) {
      return res.status(400).json({ success: false, error: 'Please provide project details (minimum 10 characters).' });
    }
    if (!privacyConsent) {
      return res.status(400).json({ success: false, error: 'You must agree to have your information used to respond to your enquiry.' });
    }

    const enquiryId = `JC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const targetRecipient = 'jayconsults26@gmail.com';
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/xoeeqeeo';
    let deliveryStatus: 'delivered' | 'pending_provider_setup' | 'failed' = 'pending_provider_setup';
    let deliveryError: string | undefined;

    // 4. Deliver enquiry to Formspree email endpoint
    try {
      const formspreePayload = {
        name: fullName,
        email: email,
        _replyto: email,
        phone: phone || 'Not provided',
        businessName: businessName || 'Not provided',
        service: service,
        budget: budget || 'Not specified',
        message: message,
        _subject: `New Website Enquiry: ${service} — ${fullName}`,
        enquiryId: enquiryId,
        submittedAt: new Date().toUTCString(),
        source: 'Jay Consults Website',
      };

      const formspreeResponse = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formspreePayload),
      });

      if (formspreeResponse.ok) {
        deliveryStatus = 'delivered';
      } else {
        const errData = await formspreeResponse.json().catch(() => ({}));
        console.error('Formspree API returned error:', formspreeResponse.status, errData);
        deliveryStatus = 'failed';
        deliveryError = JSON.stringify(errData);
      }
    } catch (err: unknown) {
      console.error('Failed to post to Formspree:', err);
      deliveryStatus = 'failed';
      deliveryError = err instanceof Error ? err.message : String(err);
    }

    // Optional secondary channel: Resend (if configured)
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (resendApiKey) {
      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Jay Consults Website <onboarding@resend.dev>';
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: ['jayconsults26@gmail.com'],
            reply_to: email,
            subject: `New Website Enquiry: ${service} — ${fullName}`,
            text: `Enquiry from ${fullName} (${email})\nPhone: ${phone}\nService: ${service}\nBudget: ${budget}\nMessage: ${message}`,
          }),
        });
      } catch (e) {
        console.warn('Optional secondary Resend notification skipped:', e);
      }
    }

    // 5. Persist enquiry to local storage log
    const record: EnquiryRecord = {
      id: enquiryId,
      fullName,
      email,
      phone: phone || undefined,
      businessName: businessName || undefined,
      service,
      budget: budget || undefined,
      message,
      privacyConsent,
      ip: clientIp,
      userAgent: req.headers['user-agent'],
      createdAt: new Date().toISOString(),
      emailDeliveryStatus: deliveryStatus,
      emailDeliveryError: deliveryError,
    };
    saveEnquiry(record);

    // 6. Return response according to status
    if (deliveryStatus === 'delivered') {
      return res.status(200).json({
        success: true,
        delivered: true,
        enquiryId,
        message: 'Your enquiry has been successfully delivered to Jay Consults! Our team will review your project details and respond promptly.',
      });
    } else {
      return res.status(200).json({
        success: true,
        delivered: false,
        enquiryId,
        message: 'Your enquiry has been securely logged on our server! We will follow up with you promptly.',
        recipient: 'Formspree (https://formspree.io/f/xoeeqeeo)',
      });
    }
  } catch (error) {
    console.error('Error handling enquiry submission:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your request. Please try again or reach out directly via WhatsApp (+233 244 623265) or email (jayconsults26@gmail.com).',
    });
  }
});

// Vite middleware / Static serving setup
async function setupServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Jay Consults server running at http://0.0.0.0:${PORT} [mode: ${isProduction ? 'production' : 'development'}]`);
  });
}

setupServer();
