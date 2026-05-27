# DEPLOYMENT CHECKLIST — LIVESTOICALLY PURE STATIC
## Phase 1: Funnel + Google Setup (Days 1-3)

---

## ✅ STEP 1: NETLIFY SETUP (15 minutes)

### 1.1 Create Netlify Account
- [ ] Go to [netlify.com](https://netlify.com)
- [ ] Sign up with GitHub account
- [ ] Authorize Netlify to access GitHub repos

### 1.2 Connect GitHub Repo
- [ ] In Netlify: Click "Add new site" → "Import an existing project"
- [ ] Select GitHub → Select `Chauhan-96/Livestoically-Pure-Static`
- [ ] Build command: `cd frontend && npm install && npm run build`
- [ ] Publish directory: `frontend/dist`
- [ ] Deploy

### 1.3 Wait for Build & Preview
- [ ] Netlify will build and deploy to temporary URL (e.g., `https://xxxx.netlify.app`)
- [ ] Click preview link → verify homepage loads
- [ ] Verify navbar, pillars, membership page load correctly
- [ ] Check mobile responsiveness (hamburger menu works)

**Status:** ✅ Frontend deployed (temporary Netlify URL)

---

## ✅ STEP 2: CUSTOM DOMAIN (10 minutes)

### 2.1 Point Domain to Netlify
- [ ] Go to Netlify site settings → "Domain management"
- [ ] Click "Add custom domain" → Enter `livestoically.com`
- [ ] Netlify shows nameserver update instructions
- [ ] Go to your domain registrar (GoDaddy, Namecheap, etc.)
- [ ] Update nameservers to Netlify's nameservers
- [ ] **Wait 24-48 hours for DNS propagation** (check with `nslookup livestoically.com`)

### 2.2 Enable HTTPS (Automatic)
- [ ] Netlify auto-generates SSL certificate
- [ ] Verify green padlock on livestoically.com

**Status:** ✅ Domain configured (HTTPS enabled)

---

## ✅ STEP 3: ENVIRONMENT VARIABLES (5 minutes)

### 3.1 Add .env to Netlify
- [ ] In Netlify site settings → "Build & deploy" → "Environment"
- [ ] Click "Edit variables"
- [ ] Copy ALL keys from `.env.example` → Netlify environment
- [ ] **DO NOT commit `.env` to GitHub** (it's in .gitignore)
- [ ] Values needed:
  - `VITE_SUPABASE_URL` — from Supabase project settings
  - `VITE_SUPABASE_ANON_KEY` — from Supabase project settings
  - `CONVERTKIT_API_KEY` — from ConvertKit account settings
  - `VITE_CONVERTKIT_FORM_ID` — from ConvertKit form setup
  - `LEMON_SQUEEZY_API_KEY` — from Lemon Squeezy account
  - `LEMON_SQUEEZY_WEBHOOK_SECRET` — from Lemon Squeezy webhook
  - Other keys as available

**Status:** ✅ Environment variables configured

---

## ✅ STEP 4: GOOGLE SETUP (30 minutes)

### 4.1 Add Site to Google Search Console
- [ ] Go to [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Click "Add property"
- [ ] Enter domain: `livestoically.com`
- [ ] Verify ownership via DNS TXT record:
  - Google provides TXT record (e.g., `google-site-verification=xxxxx`)
  - Add to domain registrar's DNS settings
  - Wait 5-60 minutes for verification
- [ ] Click "Verify" in Google Search Console

### 4.2 Submit Sitemap
- [ ] In Google Search Console → "Sitemaps"
- [ ] Click "Add/test sitemap"
- [ ] Enter: `https://livestoically.com/api/sitemap`
- [ ] Click "Submit"
- [ ] Google will crawl sitemap daily

### 4.3 Request Indexing
- [ ] Wait 24 hours for sitemap crawl
- [ ] In Google Search Console → "Coverage"
- [ ] Verify homepage + articles indexed
- [ ] If not indexed: Click "Inspect" → "Request indexing"

**Status:** ✅ Google Search Console configured

---

## ✅ STEP 5: SUPABASE SETUP (20 minutes)

### 5.1 Create Supabase Project
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Create free project (or use existing)
- [ ] Project name: `livestoically` or similar
- [ ] Region: Closest to your users

### 5.2 Run Database Schema
- [ ] In Supabase → SQL Editor
- [ ] Copy full content from `database/schema.sql`
- [ ] Paste into SQL editor → Execute
- [ ] Verify tables created: pillars, articles, members, subscribers, analytics
- [ ] Verify 9 pillars seeded (run `SELECT COUNT(*) FROM pillars;` → should return 9)

### 5.3 Get API Keys
- [ ] Project settings → API
- [ ] Copy:
  - `SUPABASE_URL` (public URL)
  - `anon public key` → `VITE_SUPABASE_ANON_KEY`
  - `service_role key` → `SUPABASE_SERVICE_KEY`
- [ ] Add to Netlify environment variables

### 5.4 Enable Row Level Security (RLS)
- [ ] Supabase → Authentication → Policies
- [ ] Enable RLS on tables: `articles`, `members`, `subscribers`
- [ ] Policies are pre-configured in schema.sql

**Status:** ✅ Supabase database live + RLS enabled

---

## ✅ STEP 6: LEMON SQUEEZY SETUP (25 minutes)

### 6.1 Create Lemon Squeezy Account
- [ ] Go to [lemon.events](https://lemon.events) (Lemon Squeezy's new name)
- [ ] Sign up → Create store
- [ ] Store name: Livestoically

### 6.2 Create Products
- [ ] In dashboard → Products → Create Product
  - **Product 1: Monthly Membership**
    - Name: `Livestoically Membership (Monthly)`
    - Price: $12/month (or your currency)
    - Recurring: Monthly
  - **Product 2: Annual Membership**
    - Name: `Livestoically Membership (Annual)`
    - Price: $99/year
    - Recurring: Yearly

### 6.3 Get Variant IDs
- [ ] After creating products, Lemon Squeezy assigns Variant IDs
- [ ] Copy:
  - Monthly variant ID → `VITE_LEMON_SQUEEZY_VARIANT_MONTHLY`
  - Annual variant ID → `VITE_LEMON_SQUEEZY_VARIANT_ANNUAL`
- [ ] Also get Store ID → `VITE_LEMON_SQUEEZY_STORE_ID`

### 6.4 Create Webhook
- [ ] Settings → Webhooks → Create webhook
- [ ] URL: `https://livestoically.com/api/payment-webhook`
- [ ] Events: `subscription.created`, `subscription.updated`, `subscription.ended`
- [ ] Copy webhook secret → `LEMON_SQUEEZY_WEBHOOK_SECRET`

### 6.5 Get API Key
- [ ] Settings → API tokens → Create token
- [ ] Name: `Netlify Functions`
- [ ] Copy token → `LEMON_SQUEEZY_API_KEY` (for future use)

**Status:** ✅ Lemon Squeezy products + webhook configured

---

## ✅ STEP 7: CONVERTKIT SETUP (15 minutes)

### 7.1 Create ConvertKit Account
- [ ] Go to [convertkit.com](https://convertkit.com)
- [ ] Sign up (free tier available)

### 7.2 Create Email Signup Form
- [ ] Dashboard → Forms → Create form
- [ ] Form name: `Livestoically Newsletter`
- [ ] Form type: Inline or Modal
- [ ] Add fields: Email (required), First Name (optional)
- [ ] Copy Form ID → `VITE_CONVERTKIT_FORM_ID`

### 7.3 Create Welcome Email Sequence
- [ ] Sequences → Create sequence
- [ ] Name: `Livestoically Welcome`
- [ ] Email 1 (sent immediately): "Welcome to Livestoically"
- [ ] Email 2 (1 day later): "5 Ways to Stop Overthinking"
- [ ] Email 3 (3 days later): "The Stoic Practice That Changed Everything"
- [ ] Email 4 (7 days later): "Join Our Community"
- [ ] Email 5 (14 days later): "Limited Time: 50% Off Annual Membership"

### 7.4 Get API Key
- [ ] Settings → API keys → Create API key
- [ ] Name: `Netlify Functions`
- [ ] Copy → `CONVERTKIT_API_KEY`

### 7.5 Create Tag for Members
- [ ] Tags → Create tag: `livestoically_member`
- [ ] (Payment webhook will tag members automatically)

**Status:** ✅ ConvertKit form + welcome sequence configured

---

## ✅ STEP 8: ANALYTICS SETUP (10 minutes)

### 8.1 Google Analytics 4 (GA4)
- [ ] Go to [analytics.google.com](https://analytics.google.com)
- [ ] Create property: `Livestoically`
- [ ] Web stream: `livestoically.com`
- [ ] Copy Measurement ID → `VITE_GA4_MEASUREMENT_ID`
- [ ] Add to Netlify environment

### 8.2 Bing Webmaster Tools (Optional but Recommended)
- [ ] Go to [bing.com/webmasters](https://bing.com/webmasters)
- [ ] Add property: `livestoically.com`
- [ ] Verify via DNS
- [ ] Submit sitemap
- [ ] Copy API key → `BING_WEBMASTER_KEY` (if available)

**Status:** ✅ Analytics configured (GA4 + Bing)

---

## ✅ STEP 9: VERIFY COMPLETE FUNNEL (20 minutes)

### 9.1 Test Email Signup Flow
- [ ] Go to `livestoically.com` (live domain)
- [ ] Enter email in newsletter signup
- [ ] Click Subscribe
- [ ] Verify: Email appears in ConvertKit → Forms → Subscribers
- [ ] Verify: You receive welcome email from ConvertKit

### 9.2 Test Payment Flow
- [ ] Go to `livestoically.com/membership`
- [ ] Click "Choose Plan" (use Lemon Squeezy test card)
- [ ] Test card number: `4111 1111 1111 1111` | Exp: `12/25` | CVC: `123`
- [ ] Complete checkout
- [ ] Verify: Order shows in Lemon Squeezy dashboard
- [ ] Verify: Webhook fires (check Netlify function logs)
- [ ] Verify: Member record created in Supabase `members` table

### 9.3 Test Article Discovery
- [ ] Click "All Articles" → verify pillar filtering works
- [ ] Click "Start Quiz" → verify pillar recommendation works
- [ ] Click "Membership" → verify pricing shows correctly

### 9.4 Check Google Indexing
- [ ] Google Search Console → Coverage
- [ ] Verify homepage indexed
- [ ] Verify articles indexed (will be 0 until articles published)

**Status:** ✅ Complete funnel working end-to-end

---

## ✅ STEP 10: MONITORING SETUP (10 minutes)

### 10.1 Netlify Function Monitoring
- [ ] Netlify site → Functions
- [ ] Monitor function logs:
  - `email-subscribe` (should log successful subscribes)
  - `payment-webhook` (should log successful purchases)
  - `sitemap` (should generate XML on /api/sitemap access)

### 10.2 Supabase Monitoring
- [ ] Go to Supabase project → Logs
- [ ] Monitor SQL query performance
- [ ] Watch for RLS policy violations (should be none)

### 10.3 Google Search Console Monitoring
- [ ] Set up email reports (optional)
- [ ] Check "Coverage" daily for first week
- [ ] Check "Performance" for click-through rate

**Status:** ✅ Monitoring enabled

---

## 🎉 PHASE 1 COMPLETE!

**What's live now:**
- ✅ Website deployed (livestoically.com)
- ✅ Email signup → ConvertKit flow working
- ✅ Payment → Lemon Squeezy flow working
- ✅ Google Search Console indexing articles
- ✅ Complete funnel: Landing → Article → Email → Payment

**Next phase (Days 4-10): Article Generation**
- Write 27 articles (9/day on Mon/Wed/Fri)
- One 1200x630px image per article
- Auto-generate titles, meta descriptions, schema markup
- Auto-submit to Google Search Console

---

## TROUBLESHOOTING

### Website shows 404
- [ ] Check Netlify build logs (should show no errors)
- [ ] Verify frontend/package.json has all dependencies
- [ ] Try: `cd frontend && npm install && npm run build`

### Email signup not working
- [ ] Check ConvertKit API key in Netlify env
- [ ] Check form ID is correct
- [ ] Test via `curl` to Netlify function URL
- [ ] Check ConvertKit spam folder (confirmations sometimes go to spam)

### Payment webhook not firing
- [ ] Verify Lemon Squeezy webhook URL is correct
- [ ] Check webhook secret in Netlify env
- [ ] Verify Netlify function `payment-webhook.js` deployed
- [ ] Check Lemon Squeezy webhook logs for errors

### Google not indexing
- [ ] Verify domain DNS pointing to Netlify
- [ ] Check robots.txt allows `/articles/`
- [ ] Submit sitemap in Google Search Console
- [ ] Wait 24-48 hours for crawl

### Supabase connection failing
- [ ] Verify `VITE_SUPABASE_URL` is correct (no trailing slash)
- [ ] Verify `VITE_SUPABASE_ANON_KEY` is correct
- [ ] Check Supabase project is running (not paused)
- [ ] Check RLS policies aren't blocking reads

---

## DEPLOYMENT CHECKLIST SUMMARY

```
Phase 1 Completion Criteria:
✅ Website live at livestoically.com (HTTPS)
✅ Email signup working (→ ConvertKit)
✅ Payment flow working (→ Lemon Squeezy)
✅ Google Search Console indexing
✅ Sitemap.xml generating
✅ Analytics tracking (GA4)
✅ Database schema + RLS enabled
✅ Netlify functions logging correctly
✅ Complete funnel tested end-to-end

Estimated time: 3-4 hours
Cost: $0 (all free/trial tiers)
Ready for: Article generation (Phase 2)
```

---

**Last updated:** 2026-05-27  
**Author:** Claude Code  
**Status:** Ready for execution
