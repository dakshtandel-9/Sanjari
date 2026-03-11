# 🌿 Sanjari Herbal Hair Oil — E-Commerce Web App

> **Production URL:** [https://www.sanjariherbalhairoil.com](https://www.sanjariherbalhairoil.com)
>
> A full-stack, production-ready e-commerce platform for **Sanjari Herbal Hair Oil** — a 100% Ayurvedic, chemical-free hair care product. Built with Next.js 16, Supabase, and Razorpay, featuring a bespoke admin dashboard, dynamic offer bar, complete SEO/GEO/AEO/SXO optimisation, and a beautiful, conversion-focused UI.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Features](#features)
5. [Environment Variables (.env)](#environment-variables)
6. [Getting Started (Local Development)](#getting-started)
7. [Database Setup (Supabase)](#database-setup)
8. [Admin Panel](#admin-panel)
9. [Payment Integration (Razorpay)](#payment-integration)
10. [SEO / GEO / AEO / SXO](#seo--geo--aeo--sxo)
11. [Deployment (Vercel)](#deployment)
12. [Security](#security)
13. [Pages Reference](#pages-reference)
14. [Component Reference](#component-reference)

---

## Project Overview

Sanjari Herbal Hair Oil is a single-product D2C (Direct-to-Consumer) Ayurvedic brand website. The app enables customers to:
- Learn about the product's ingredients, benefits, and usage
- Read real customer reviews
- Place orders via **Razorpay (online payment)** or **Cash on Delivery (COD)**
- Track their order status

The store owner manages everything through a password-protected **Admin Dashboard**: orders, inventory indicators, coupons, hero image slides, contact form submissions, store settings, and the header offer bar text — all without touching a single line of code.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | Vanilla CSS (inline `<style>` blocks per-page) + TailwindCSS (utility classes in Preloader) |
| **Database & Storage** | [Supabase](https://supabase.com/) (PostgreSQL + Supabase Storage for slide images) |
| **Payments** | [Razorpay](https://razorpay.com/) — UPI, Cards, Net Banking, Wallets; plus COD |
| **Fonts** | Google Fonts — Inter + Poppins (via `next/font`) |
| **Image Optimisation** | Next.js `<Image />` component |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Icons** | Inline SVG |
| **Animations** | Framer Motion (used in select pages), CSS transitions |

---

## Folder Structure

```
sanajri/
├── app/
│   ├── admin/
│   │   ├── layout.tsx        # Admin-only layout (no Header/Footer)
│   │   └── page.tsx          # Full admin dashboard (login + all tabs)
│   ├── api/
│   │   ├── admin/
│   │   │   ├── config/       # GET/POST coupons & settings (offer bar, shipping)
│   │   │   ├── contacts/     # GET/POST contact form submissions
│   │   │   ├── login/        # POST admin login (password check)
│   │   │   └── slides/       # GET/POST/DELETE hero image slides
│   │   ├── create-order/     # POST — creates Razorpay order
│   │   ├── orders/
│   │   │   ├── save/         # POST — saves order to Supabase (3-tier fallback)
│   │   │   ├── track/        # GET  — fetches order by ID or phone
│   │   │   └── update-status/ # POST — admin updates order status
│   │   └── verify-payment/   # POST — verifies Razorpay payment signature
│   ├── cancellation-policy/page.tsx
│   ├── checkout/page.tsx
│   ├── faqs/page.tsx
│   ├── privacy/page.tsx
│   ├── product/page.tsx      # Full product detail page
│   ├── refund-policy/page.tsx
│   ├── return-policy/page.tsx
│   ├── shipping-policy/page.tsx
│   ├── success/page.tsx      # Order confirmation + ID display
│   ├── terms/page.tsx
│   ├── track-order/page.tsx
│   ├── favicon.ico
│   ├── icon.png              # App icon / favicon (Sanjari logo)
│   ├── globals.css
│   ├── layout.tsx            # Root layout — global meta, JSON-LD, Header, Footer, Preloader
│   ├── page.tsx              # Homepage
│   ├── robots.ts             # Dynamic robots.txt generator
│   └── sitemap.ts            # Dynamic sitemap.xml generator
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx            # Offer bar (dynamic from DB) + nav + mobile drawer
│   ├── Preloader.tsx         # Full-screen brand preloader with logo animation
│   └── buttons/
│       └── PrimaryButton.tsx
├── lib/
│   └── supabase.ts           # Supabase client initialisation
├── public/
│   ├── SANJARI.png            # Brand logo
│   ├── natural-badge.png
│   ├── product-hero.png
│   ├── BeforeAfterImage/
│   ├── Benefits/
│   ├── homePageIcon/
│   ├── HowToUse/
│   ├── KeyIngredients/
│   └── productImages/
├── .env                      # ⚠️ NEVER COMMIT THIS FILE
├── .env.example              # Safe template — commit this
├── .gitignore
├── next.config.ts            # Security headers, image domains, build-time env check
├── package.json
├── supabase_migration.sql    # Run once in Supabase SQL Editor to add quantity column
└── tsconfig.json
```

---

## Features

### 🛍️ Customer-Facing
- **Animated Hero Slider** — Admin-managed full-screen image slides with separate desktop/mobile images
- **Product Page** — Image gallery, quantity selector, coupon code, COD info, real reviews, before/after photos
- **Smart Checkout** — Online payment via Razorpay or COD; shipping charge auto-applied for COD
- **Order Success Page** — Prominent 6-digit order number display with confetti/animation
- **Order Tracking** — Customers can track by order ID or mobile number
- **FAQ Page** — Comprehensive Q&A with accordion interactions
- **Policy Pages** — Shipping, Return, Refund, Cancellation, Privacy, Terms
- **Preloader** — Branded full-screen loading animation on first visit
- **Header Offer Bar** — Cycling promotional messages (admin-editable in real time)
- **Responsive Design** — Mobile-first, pixel-perfect on all screen sizes

### 🔧 Admin Dashboard (`/admin`)
- **Password-protected login** with session persistence
- **Orders Tab** — Full order list with status management, date filters, revenue metrics, AOV
- **Slides Tab** — Upload, reorder, and delete hero banner images
- **Contacts Tab** — View and manage contact form submissions
- **Coupons Tab** — Create/delete flat or percentage discount coupons
- **Settings Tab** — Adjust COD shipping charge; manage header offer bar messages

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your real values. **Never commit `.env` to version control.**

```bash
cp .env.example .env
```

Here is a complete reference for every variable:

### `RAZORPAY_KEY_ID`
- **What it is:** Your Razorpay API Key ID (server-side)
- **Where to get it:** [Razorpay Dashboard → Settings → API Keys](https://dashboard.razorpay.com/app/keys)
- **Test vs Live:** Use `rzp_test_...` for development, `rzp_live_...` for production
- **Used in:** `/api/create-order` and `/api/verify-payment`
- **Example format:** `rzp_live_XXXXXXXXXXXXXXXX`

---

### `RAZORPAY_KEY_SECRET`
- **What it is:** Your Razorpay API Secret Key (server-side only — never exposed to the browser)
- **Where to get it:** Same as above — generated alongside `RAZORPAY_KEY_ID`
- **⚠️ Critical:** This is used to cryptographically sign and verify payment webhooks. Keep it secret.
- **Used in:** `/api/create-order` (to initialise the SDK) and `/api/verify-payment` (HMAC signature check)
- **Example format:** `XXXXXXXXXXXXXXXXXXXXXXXX` (24-character alphanumeric string)

---

### `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- **What it is:** The **same** Razorpay Key ID, but prefixed with `NEXT_PUBLIC_` so it's available in the browser
- **Where to get it:** Same place as `RAZORPAY_KEY_ID` — they are identical values
- **Why it's needed separately:** Next.js only exposes environment variables to the client if they start with `NEXT_PUBLIC_`. The client-side checkout JavaScript needs this to initialise the Razorpay payment modal.
- **Used in:** `app/checkout/page.tsx` — the browser-side Razorpay SDK call
- **Example format:** `rzp_live_XXXXXXXXXXXXXXXX`

---

### `ADMIN_PASSWORD`
- **What it is:** A plain-text password to protect the `/admin` dashboard
- **Where to set it:** You choose — set any strong password here
- **⚠️ Security:** Change this from the default `12345` before deploying! Use a strong, unique password of at least 16 characters.
- **Used in:** `/api/admin/login` — compared against the password entered on the admin login screen
- **Example format:** `MyStr0ng!Passw0rd#2025`

---

### `NEXT_PUBLIC_SUPABASE_URL`
- **What it is:** The unique URL of your Supabase project
- **Where to get it:** [Supabase Dashboard → Your Project → Settings → API → Project URL](https://supabase.com/dashboard)
- **Used in:** `lib/supabase.ts` — used by both client-side and server-side code to connect to your database and storage
- **Example format:** `https://YOUR-PROJECT-ID.supabase.co`

---

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **What it is:** The public "anon" key for your Supabase project. It is safe to expose on the client but Row Level Security (RLS) policies should still protect sensitive data.
- **Where to get it:** [Supabase Dashboard → Your Project → Settings → API → Project API Keys → `anon public`](https://supabase.com/dashboard)
- **Used in:** `lib/supabase.ts` — initialises both the browser and server Supabase clients
- **Example format:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long JWT string)

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- A [Supabase](https://supabase.com/) account (free tier works)
- A [Razorpay](https://razorpay.com/) account (test mode works for development)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/sanajri.git
cd sanajri

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your actual keys

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Build optimised production bundle |
| `npm run start` | Start production server locally |
| `npm run lint` | Run ESLint checks |

---

## Database Setup

This project uses **Supabase** (PostgreSQL) with the following tables:

### Tables

#### `orders`
Stores all customer orders placed through the website.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key, auto-generated |
| `order_id` | `text` | 6-digit custom order number (e.g. `ORD-839201`) |
| `name` | `text` | Customer full name |
| `phone` | `text` | Customer phone number |
| `address` | `text` | Delivery address |
| `city` | `text` | City |
| `state` | `text` | State |
| `pincode` | `text` | PIN code |
| `quantity` | `integer` | Quantity ordered (default: 1) |
| `amount` | `numeric` | Final paid amount in INR |
| `payment_method` | `text` | `"razorpay"` or `"cod"` |
| `payment_status` | `text` | `"paid"`, `"pending"`, `"cod"` |
| `status` | `text` | `"pending"`, `"confirmed"`, `"shipped"`, `"delivered"`, `"cancelled"` |
| `razorpay_order_id` | `text` | Razorpay order ID (online payments) |
| `razorpay_payment_id` | `text` | Razorpay payment ID (after success) |
| `coupon_code` | `text` | Applied coupon code (if any) |
| `created_at` | `timestamptz` | Auto-set on insert |

#### `settings`
Key-value store for admin-configurable settings.

| Key | Description |
|---|---|
| `shipping_charge` | COD shipping fee in ₹ (default: 60) |
| `header_offers` | JSON array of offer bar messages |

#### `coupons`
Discount codes managed from the admin panel.

| Column | Type | Notes |
|---|---|---|
| `id` | `serial` | Primary key |
| `code` | `text` | Coupon code string (e.g. `SANJARI10`) |
| `type` | `text` | `"flat"` or `"percentage"` |
| `discount_value` | `numeric` | Amount or percentage off |
| `is_active` | `boolean` | Whether coupon is currently valid |

#### `slides`
Hero banner images for the homepage slider.

| Column | Type | Notes |
|---|---|---|
| `id` | `serial` | Primary key |
| `image_url` | `text` | Desktop image URL (from Supabase Storage) |
| `mobile_image_url` | `text` | Mobile image URL (optional fallback) |
| `title` | `text` | Slide title text |
| `subtitle` | `text` | Slide subtitle text |
| `order` | `integer` | Display order |

#### `contacts`
Submissions from the site's contact form.

| Column | Type | Notes |
|---|---|---|
| `id` | `serial` | Primary key |
| `name` | `text` | Sender's name |
| `email` | `text` | Sender's email |
| `phone` | `text` | Sender's phone (optional) |
| `message` | `text` | Message body |
| `created_at` | `timestamptz` | Auto-set on insert |

### Running Migrations

After creating your tables, run the SQL migration file in your [Supabase SQL Editor](https://supabase.com/dashboard) to add the `quantity` column if upgrading an existing DB:

```sql
-- Contents of supabase_migration.sql
ALTER TABLE orders ADD COLUMN IF NOT EXISTS quantity integer DEFAULT 1 NOT NULL;
```

---

## Admin Panel

**URL:** `/admin`

**Login:** Use the password set in `ADMIN_PASSWORD` environment variable.

### Tabs

| Tab | What You Can Do |
|---|---|
| **Orders** | View all orders, filter by date, update order status (Pending → Confirmed → Shipped → Delivered / Cancelled) |
| **Slides** | Upload new hero images (desktop + mobile), delete old ones |
| **Contacts** | Read messages from the contact form; reply via email or delete |
| **Coupons** | Create flat (₹) or percentage (%) discount coupons; delete expired ones |
| **Settings** | Set COD shipping charge; add/remove header offer bar messages |

### Admin Security Notes
- The admin password is compared server-side in `/api/admin/login`
- Admin session is stored in `localStorage` (client-side) — logging out clears it
- The `/admin` route is excluded from `robots.txt` and never indexed by search engines
- Admin pages have no Header or Footer (clean isolated layout)

---

## Payment Integration

### Razorpay (Online Payment)
1. Customer fills out checkout form and selects "Pay Online"
2. Frontend calls `/api/create-order` → creates a Razorpay Order ID on the server
3. Client-side Razorpay SDK opens the payment modal
4. On success, Razorpay returns `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`
5. Frontend calls `/api/verify-payment` → server verifies HMAC signature
6. On verification success, order is saved to Supabase via `/api/orders/save`

### COD (Cash on Delivery)
1. Customer fills out checkout form and selects "Cash on Delivery"
2. A ₹60 shipping charge is added (configurable in admin Settings)
3. Order is directly saved to Supabase with `payment_method: "cod"` and `payment_status: "pending"`
4. Admin follows up by phone to confirm delivery

---

## SEO / GEO / AEO / SXO

This project is fully optimised for modern search including AI-powered search engines.

### SEO (Search Engine Optimisation)
- **Dynamic Metadata** in `app/layout.tsx` — title template, description, keywords, Open Graph, Twitter Cards
- **`metadataBase`** set to production domain for correct canonical URLs
- **`app/robots.ts`** — auto-generates `robots.txt`; blocks `/admin`, `/api`, `/checkout` from indexing
- **`app/sitemap.ts`** — auto-generates `sitemap.xml` with page priorities and change frequencies
- **`app/icon.png`** — Sanjari logo displayed as browser tab favicon

### GEO (Generative Engine Optimisation)
- **Organization Schema** (JSON-LD) in root layout — establishes brand identity for AI engines (ChatGPT, Perplexity, Google AI Overviews)
- Business type, address, phone, social links, and hours all declared in structured data

### AEO (Answer Engine Optimisation)
- **Product Schema** on Homepage and Product page — price, availability, rating, SKU, brand all machine-readable
- **FAQPage Schema** on Homepage and Product page — your FAQ answers can be surfaced directly by voice assistants and AI-generated answers

### SXO (Search Experience Optimisation)
- All images use Next.js `<Image />` for lazy loading and layout stability (good Core Web Vitals)
- Static pre-rendering for all public pages
- Security headers (HSTS, X-Frame-Options, CSP-like restrictions) via `next.config.ts`

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push your code** to a GitHub repository

2. **Import the project** at [https://vercel.com/new](https://vercel.com/new)

3. **Set Environment Variables** in Vercel Dashboard → Project → Settings → Environment Variables:

   | Variable | Value |
   |---|---|
   | `RAZORPAY_KEY_ID` | Your Razorpay Live Key ID |
   | `RAZORPAY_KEY_SECRET` | Your Razorpay Live Secret |
   | `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Your Razorpay Live Key ID |
   | `ADMIN_PASSWORD` | A strong, unique admin password |
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

4. **Set your custom domain** in Vercel → Project → Domains → Add `www.sanjariherbalhairoil.com`

5. **Deploy** — Vercel will auto-detect Next.js and run `next build`

> ⚠️ The build will **fail intentionally** if any required environment variable is missing. This is enforced in `next.config.ts`.

### Post-Deployment Checklist
- [ ] Switch Razorpay from **test** keys to **live** keys
- [ ] Set a **strong `ADMIN_PASSWORD`** (not `12345`)
- [ ] Upload at least one hero image slide in Admin → Slides
- [ ] Test a real COD order end-to-end
- [ ] Submit `sitemap.xml` to [Google Search Console](https://search.google.com/search-console)
- [ ] Verify structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Security

The following security measures are implemented:

| Measure | Implementation |
|---|---|
| **HTTPS Enforcement** | HSTS header (`max-age=31536000; includeSubDomains; preload`) |
| **Clickjacking Protection** | `X-Frame-Options: DENY` header |
| **MIME Sniffing Prevention** | `X-Content-Type-Options: nosniff` header |
| **XSS Protection** | `X-XSS-Protection: 1; mode=block` header |
| **Payment Verification** | HMAC-SHA256 signature verification for all Razorpay payments |
| **Admin Route Protection** | Password-checked server-side; excluded from all crawlers |
| **Secret Key Safety** | `RAZORPAY_KEY_SECRET` is server-only (no `NEXT_PUBLIC_` prefix) |
| **Env Variable Guard** | Build fails if required env vars are missing in production |

---

## Pages Reference

| Route | Description |
|---|---|
| `/` | Homepage — hero slider, about, ingredients, how-to-use, benefits, reviews, FAQ, contact |
| `/product` | Full product detail page with purchase flow |
| `/checkout` | Two-step checkout: form + payment |
| `/success` | Order confirmation with order ID |
| `/track-order` | Customer order tracker |
| `/faqs` | Complete FAQ page |
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |
| `/shipping-policy` | Shipping Policy |
| `/return-policy` | Return Policy |
| `/refund-policy` | Refund Policy |
| `/cancellation-policy` | Cancellation Policy |
| `/admin` | Admin Dashboard (password-protected) |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Auto-generated robots file |

---

## Component Reference

| Component | File | Description |
|---|---|---|
| `Header` | `components/Header.tsx` | Sticky header with animated offer bar (DB-driven), desktop nav, mobile drawer |
| `Footer` | `components/Footer.tsx` | Site footer with links, policies, contact info, social icons |
| `Preloader` | `components/Preloader.tsx` | Full-screen branded loading screen shown on initial page load |
| `PrimaryButton` | `components/buttons/PrimaryButton.tsx` | Reusable styled CTA button |

---

## Contributing

This is a private commercial project. For any changes or additions, please coordinate directly with the development team.

---

## License

**Private & Proprietary.** All rights reserved. © 2025 Sanjari Herbals.
