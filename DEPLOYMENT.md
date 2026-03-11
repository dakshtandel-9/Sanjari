# 🚀 Deployment Guide — Sanjari Herbal Hair Oil

> **Live URL:** [https://www.sanjariherbalhairoil.com](https://www.sanjariherbalhairoil.com)
> **Status:** ✅ Production Ready | Build: Passing | Payment: Live (Razorpay)

---

## Prerequisites

| Requirement | Status |
|---|---|
| GitHub repo connected | ✅ Done |
| Vercel account | ✅ Done |
| Razorpay Live API Keys | ✅ Done (KYC completed) |
| Razorpay Webhook configured | ✅ Done |
| Supabase project (DB + Storage) | ✅ Done |
| Custom domain DNS configured | ✅ Done — `www.sanjariherbalhairoil.com` |
| SEO / Sitemap / Robots | ✅ Done |
| Favicon (Sanjari logo) | ✅ Done |

---

## Environment Variables

All environment variables must be set both in your local `.env` file (for development) and in Vercel (for production).

### Complete Variable Reference

| Variable | Description | Required |
|---|---|---|
| `RAZORPAY_KEY_ID` | Razorpay Live Key ID — server-side | ✅ Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay Live Secret — server-side only | ✅ Yes |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Same live Key ID — exposed to browser | ✅ Yes |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook signature secret (`sanjari2025webhook`) | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key | ✅ Yes |
| `ADMIN_PASSWORD` | Password to access `/admin` dashboard | ✅ Yes |

> ⚠️ **Never commit `.env` to GitHub.** It is in `.gitignore`. Always use Vercel's Environment Variables UI for production secrets.

---

## Step 1: Deploy to Vercel

> If already deployed, skip to Step 2.

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select the `Sanjari` GitHub repo (`dakshtandel-9/Sanjari`)
4. Framework: **Next.js** (auto-detected by Vercel)
5. **Do NOT deploy yet** — add env varsFirst (see Step 2)

---

## Step 2: Add Environment Variables on Vercel

Go to: **Vercel → Project → Settings → Environment Variables**

Add all 7 variables from the table above. Make sure to set them for **Production**, **Preview**, and **Development** environments.

> 🔑 `RAZORPAY_KEY_ID` and `NEXT_PUBLIC_RAZORPAY_KEY_ID` must be **identical** live values (both `rzp_live_...`).

---

## Step 3: Redeploy After Env Vars

After setting all env vars:

1. Go to **Vercel → Deployments**
2. Click the **three dots `⋯`** on the latest deployment
3. Click **"Redeploy"**
4. Wait ~2 minutes for build to complete
5. ✅ Your site is live at `https://www.sanjariherbalhairoil.com`

---

## Step 4: Custom Domain (Already Configured)

Domain `www.sanjariherbalhairoil.com` is connected. DNS records required:

| Record | Type | Value |
|---|---|---|
| `www` | CNAME | `cname.vercel-dns.com` |
| `@` | A | `76.76.21.21` |

SSL is automatic via Vercel (Let's Encrypt). ✅

---

## Step 5: Razorpay Webhook (Configured)

Webhook is set up to handle edge cases (browser closed during payment):

- **URL:** `https://www.sanjariherbalhairoil.com/api/verify-payment`
- **Secret:** Stored as `RAZORPAY_WEBHOOK_SECRET` env var
- **Events:**
  - `payment.authorized` ✅
  - `payment.captured` ✅
  - `payment.failed` ✅
  - `order.paid` ✅

The `/api/verify-payment` route automatically detects:
- **Browser calls** (from checkout page) → verifies using `RAZORPAY_KEY_SECRET`
- **Webhook calls** (from Razorpay servers) → verifies using `RAZORPAY_WEBHOOK_SECRET`

---

## Step 6: Supabase Database

Database is hosted on Supabase (PostgreSQL). Required tables:

| Table | Purpose |
|---|---|
| `orders` | All customer orders |
| `settings` | Store config (shipping charge, offer bar messages) |
| `coupons` | Discount codes |
| `slides` | Hero banner images |
| `contacts` | Contact form submissions |

Run the migration if not done already:
```sql
-- In Supabase SQL Editor
ALTER TABLE orders ADD COLUMN IF NOT EXISTS quantity integer DEFAULT 1 NOT NULL;
```

---

## Pre-Launch Checklist

### Payment
- [x] Razorpay KYC completed
- [x] Live API keys generated and set in Vercel
- [x] `NEXT_PUBLIC_RAZORPAY_KEY_ID` updated to live key (not test)
- [x] Webhook configured with secret
- [ ] Do a ₹1 real test transaction to confirm live payments work

### Security
- [x] `.env` in `.gitignore` — secrets never committed
- [x] `RAZORPAY_KEY_SECRET` is server-side only (no `NEXT_PUBLIC_` prefix)
- [x] Security headers active (HSTS, X-Frame-Options, XSS protection)
- [ ] Change `ADMIN_PASSWORD` from `12345` to a strong password!

### SEO & Discoverability
- [x] `sitemap.xml` auto-generated at `/sitemap.xml`  
- [x] `robots.txt` auto-generated at `/robots.txt`
- [x] Open Graph / Twitter Card meta tags configured
- [x] JSON-LD structured data (Product, FAQ, Organization schemas)
- [x] Sanjari logo favicon set
- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Verify rich results at [Google Rich Results Test](https://search.google.com/test/rich-results)

### Admin Panel
- [x] Password-protected login at `/admin`
- [x] Header/Footer excluded from admin pages
- [x] Sidebar fixed (non-scrolling)
- [ ] Upload at least 1 hero slide image in Admin → Slides
- [ ] Set offer bar messages in Admin → Settings
- [ ] Set COD shipping charge in Admin → Settings

### Functionality
- [x] Build passes with 0 errors (28 pages)
- [x] Razorpay order creation working (`/api/create-order`)
- [x] Payment verification working (`/api/verify-payment`)
- [x] Order saving to Supabase working (`/api/orders/save`)
- [x] COD order flow working
- [x] Success page shows order number
- [x] Order tracking works at `/track-order`

---

## After Deployment — Ongoing Operations

### When you push new code to GitHub:
Vercel **auto-deploys** on every push to `main` branch. No manual steps needed.

### When you need to update env vars:
1. Vercel → Settings → Environment Variables → Edit value
2. Then **Redeploy** the latest deployment to apply

### When Razorpay keys rotate (every 6 months recommended):
1. Generate new keys in Razorpay Dashboard
2. Update `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` in Vercel
3. Redeploy

---

## Quick Commands

```bash
# Local development
npm run dev

# Production build test (run locally before pushing)
npm run build

# Start production server locally
npm run build && npm start

# Check TypeScript errors
npx tsc --noEmit

# Lint check
npm run lint
```

---

## Monitoring

After going live, monitor these regularly:

| What to Check | Where |
|---|---|
| Orders | Sanjari Admin → `/admin` → Orders tab |
| Failed payments | Razorpay Dashboard → Transactions |
| Server errors | Vercel → Project → Functions → Logs |
| Database health | Supabase Dashboard → Table Editor |
| Site performance | [PageSpeed Insights](https://pagespeed.web.dev/) |
