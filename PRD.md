# Product Requirements Document (PRD)
## Think Realty × Luxofy Properties Goa — Event Landing Page + Registration Platform
**Version 1.0**

---

## 1. Overview

**Product Name**
Think Realty Investor Event Platform

**Purpose**
Build a premium landing page and intelligent registration platform for the Think Realty × Luxofy Properties Goa Investor Showcase that converts high-net-worth visitors into verified attendees.

The platform should not only collect registrations but also qualify investors, automate communication, score leads, sync with CRM, and help the sales team close site visits after the event.

**Primary KPI**
100+ Qualified Attendees

**Secondary KPI**
500+ Qualified Leads

---

## 2. Objectives

The platform should:
- Generate trust instantly
- Explain why Goa is a good investment
- Showcase Luxofy Projects
- Explain the event
- Register qualified investors
- Filter low-quality leads
- Integrate with CRM
- Trigger WhatsApp
- Trigger Email
- Book Calendar
- Notify Sales Team
- Track Analytics

---

## 3. User Journey

```
Visitor
  ↓
Instagram Ad
  ↓
Landing Page
  ↓
Scroll
  ↓
Watch Video
  ↓
View Projects
  ↓
Read Investment Benefits
  ↓
Meet Speakers
  ↓
View Testimonials
  ↓
Register
  ↓
Qualification Form
  ↓
OTP Verification
  ↓
WhatsApp Confirmation
  ↓
Calendar Invite
  ↓
CRM
  ↓
Sales Assignment
  ↓
Qualification Call
  ↓
Confirmed RSVP
  ↓
Event
  ↓
Site Visit
  ↓
Booking
```

---

## 4. Landing Page Structure

### Hero Section
Large luxury background video:
- Drone footage
- Beach
- Villa
- Lifestyle

**Overlay**
- Goa Luxury Investor Showcase
- Discover Premium Investment Opportunities in Goa
- 9 August 2026
- Delhi NCR
- Exclusive Invite Only

**Buttons**
- Register Now
- Download Brochure
- Watch Project

**Sticky CTA**
- Register

### Trust Bar
**Logos**
- Think Realty
- Luxofy
- Partners
- Media

**Stats**
- Years of Experience
- Projects Delivered
- Properties Sold
- Investor Community

### Why Attend
**Cards**
- ✔ Investment Insights
- ✔ Goa Market Report
- ✔ Premium Projects
- ✔ Rental Yield Strategy
- ✔ Expert Speakers
- ✔ Networking

**CTA:** Reserve Seat

### Why Goa
Animated section with:
- Graphs
- Infrastructure
- Airport
- Tourism
- Rental Demand
- Capital Appreciation
- Investment Comparison
- Interactive Cards

### Featured Projects
**Cards include:**
- Image Gallery
- Video
- Price
- Location
- Configuration
- Rental Income
- ROI
- Possession
- Download Brochure
- Schedule Site Visit

### Investment Calculator
**Inputs**
- Investment Amount
- Expected Appreciation
- Rental Income
- Holding Period

**Outputs**
- Projected Wealth
- Rental Earnings
- Total Returns
- Download PDF

### Event Agenda
Timeline:
- Registration
- Networking
- Investment Session
- Project Showcase
- Q&A
- Lunch
- One-on-One Consultation

### Speakers
**Cards**
- Image
- Bio
- Experience
- Achievements
- LinkedIn

### Testimonials
- Video
- Text
- Ratings
- Before/After

### Gallery
- Luxury Images
- Goa Lifestyle
- Projects
- Previous Events

### FAQ
- Accordion, 20+ Questions

### CTA Banner
- "Ready to Invest?"
- "Reserve Your Seat Today"
- Register Button

### Footer
- Address
- Contact
- Privacy
- Terms
- Social Links
- Google Map

---

## 5. Registration Form

### Step 1 — Basic Information
- Full Name
- Email
- Mobile
- OTP Verification
- City
- State
- Country
- Age
- Gender
- Occupation
- Company
- Designation
- LinkedIn

### Step 2 — Investment Profile
- Annual Income
- Net Worth
- Investment Budget
  - Under 50L
  - 50L–1Cr
  - 1–2Cr
  - 2–5Cr
  - 5Cr+
- Investment Timeline
  - Immediate
  - 3 Months
  - 6 Months
  - 12 Months
  - Just Exploring
- Current Investments
  - Stocks
  - MF
  - Commercial
  - Residential
  - Land
  - Gold
  - Crypto
  - Business

### Step 3 — Buying Intent
- Purpose
  - Investment
  - Holiday Home
  - Rental
  - Retirement
  - Self Use
- Interested Property
  - Apartment
  - Villa
  - Land
  - Commercial
- Preferred Goa Location
  - North
  - South
  - Both
  - Not Sure

### Step 4 — Qualification
- How did you hear about us?
  - Instagram
  - Facebook
  - LinkedIn
  - Google
  - Friend
  - Referral
  - Broker
  - YouTube
- Expected Purchase Value
- Preferred Payment
  - Loan
  - Self Funded
  - Mix
- Would like
  - Site Visit
  - Video Call
  - Consultation
  - Portfolio Review

### Step 5 — Confirmation
- Review
- OTP
- Terms
- Privacy
- Submit

---

## 6. Lead Scoring

| Factor | Value | Score |
|---|---|---|
| **Budget** | 5Cr+ | 100 |
| | 2Cr+ | 80 |
| | 1Cr+ | 60 |
| **Timeline** | Immediate | 100 |
| | 3 Months | 80 |
| | 6 Months | 60 |
| **Occupation** | Founder | 100 |
| | CXO | 90 |
| | Doctor | 90 |
| | NRI | 90 |
| | Business Owner | 90 |
| | Employee | 60 |
| **Intent** | Investment | 100 |
| | Holiday Home | 80 |
| | Exploring | 40 |

**Overall Score Bands**
- 80+ → Hot
- 60–80 → Warm
- 40–60 → Cold

---

## 7. CRM Workflow

```
Registration
  ↓
Lead Created
  ↓
Score Generated
  ↓
Assign Salesperson
  ↓
WhatsApp
  ↓
Email
  ↓
Calendar Invite
  ↓
Reminder
  ↓
Qualification Call
  ↓
RSVP Confirmed
  ↓
Event
  ↓
Site Visit
  ↓
Deal
```

---

## 8. Automations

**After Submit (Instant)**
- Thank You Page
- WhatsApp
- Email
- Calendar
- CRM Entry
- Sales Notification
- Slack Notification
- Admin Dashboard Update
- Meta Conversion API
- Google Conversion

---

## 9. Dashboard

**Admin**
- Today's Registrations
- Total Registrations
- Qualified
- Hot Leads
- Warm Leads
- Cold Leads
- Conversion Rate
- Ad Source
- Cost Per Lead
- Top Campaign
- Team Performance
- Attendance Prediction
- Live Registrations
- CSV Export

---

## 10. Integrations

- Meta Pixel
- Meta Conversion API
- Google Analytics 4
- Google Tag Manager
- Google Ads Conversion Tracking
- LinkedIn Insight Tag
- WhatsApp Business API
- Twilio OTP
- Resend/SendGrid (Email)
- Calendly or Google Calendar
- HubSpot/Salesforce/Custom CRM
- Razorpay (future paid-ticket support)
- Google Maps
- YouTube/Vimeo
- Cloudflare Turnstile (bot protection)

---

## 11. Technical Stack

**Frontend**
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- shadcn/ui

**Backend**
- NestJS or Next.js API Routes
- PostgreSQL
- Prisma ORM
- Redis (queues/caching)

**Storage**
- Cloudinary
- AWS S3

**Authentication**
- OTP (SMS)
- JWT Sessions

---

## 12. SEO Requirements

- Programmatic SEO-ready architecture
- Schema.org:
  - Event
  - Organization
  - LocalBusiness
  - FAQ
- Open Graph & Twitter Cards
- Dynamic sitemap
- robots.txt
- Fast Core Web Vitals (LCP < 2.5s)
- Optimized metadata and image alt text

---

## 13. Performance Requirements

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s
- Mobile-first responsive design
- WCAG 2.2 AA accessibility compliance

---

## 14. Security

- HTTPS
- CSRF protection
- Rate limiting
- OTP verification
- reCAPTCHA/Cloudflare Turnstile
- Input validation
- SQL injection prevention
- XSS prevention
- Encrypted PII at rest
- Audit logs for registrations

---

## 15. Future Enhancements

- AI chatbot for investor queries
- AI-powered lead qualification
- Personalized project recommendations
- Voice agent for follow-up calls
- Referral and ambassador portal
- Digital event badge with QR code
- Self-service attendee dashboard
- Multi-language support
- NRI-specific registration flow
- Real-time seat availability
- Live countdown synchronized with registrations
- Heatmaps and session recordings for CRO
- Progressive profiling to enrich lead data over time