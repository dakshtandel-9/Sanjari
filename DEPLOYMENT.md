# 🚀 Deployment Guide — Sanjari Herbal Hair Oil

## Prerequisites
- GitHub repo connected ✅
- [Vercel account](https://vercel.com) (free tier is fine)
- Razorpay **Live** API keys (from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys))
- Supabase project URL + Anon Key (from [Supabase Dashboard](https://supabase.com/dashboard))

---

## Step 1: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `Sanjari` GitHub repo
4. Framework: **Next.js** (auto-detected)
5. Click **"Deploy"** — Vercel will run the first build

> The first build will **fail** — this is expected because environment variables are not set yet.

---

## Step 2: Add Environment Variables on Vercel

Go to your project → **Settings → Environment Variables** and add these:

| Variable | Value |
|---|---|
| `RAZORPAY_KEY_ID` | `rzp_live_XXXXXXXX` (your **live** key) |
| `RAZORPAY_KEY_SECRET` | `XXXXXXXXXXXXXXXX` (your **live** secret) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_live_XXXXXXXX` (same live key) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://YOUR-PROJECT.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `ADMIN_PASSWORD` | A **strong, secret** password (not 12345!) |

> ⚠️ Use **Live** Razorpay keys for production, not test keys.

---

## Step 3: Redeploy

After adding all env vars, go to **Deployments** → click the three dots on the latest deployment → **Redeploy**.

The build will complete and your site will go live at `https://your-project.vercel.app`.

---

## Step 4: Connect a Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your domain (e.g., `sanajri.in`)
3. Update your domain's DNS:
   - **CNAME:** `www` → `cname.vercel-dns.com`
   - **A record:** `@` → `76.76.21.21`
4. SSL is automatic ✅

---

## Step 5: Razorpay Webhook (Important!)

To ensure payment verification works even if a customer closes the browser mid-payment:

1. Go to [Razorpay Dashboard → Webhooks](https://dashboard.razorpay.com/app/webhooks)
2. Add webhook URL: `https://your-domain.com/api/verify-payment`
3. Select event: `payment.captured`
4. Copy the webhook secret and add it as env var: `RAZORPAY_WEBHOOK_SECRET`

---

## Checklist Before Going Live

- [ ] Razorpay keys switched to **LIVE** (not test)
- [ ] Admin password is **strong** (not `12345`)
- [ ] Custom domain connected
- [ ] Test a full checkout flow with a real card
- [ ] Confirm Supabase orders table is receiving orders
- [ ] Set up Supabase Row Level Security (RLS) policies

---

## Quick Commands

```bash
# Local dev
npm run dev

# Check for TypeScript errors
npx tsc --noEmit

# Production build (test locally)
npm run build && npm start
```
