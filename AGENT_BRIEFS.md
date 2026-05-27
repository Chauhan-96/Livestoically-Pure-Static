# LIVESTOICALLY PURE STATIC: Agent Execution Briefs

## WEEK 1 KICKOFF (May 27 - June 2)

---

## 🎨 AGENT 1: FRONTEND ENGINEER

**Role:** Build React static website  
**Deadline:** June 2, 2026

### Your Mission
Create production-ready React 19 frontend that exports as pure static HTML. Use Emotions-Livestoically as design template.

### Deliverables
1. **Homepage** (`/`)
   - Hero section with CTA
   - 9 pillar cards (emotional areas)
   - Newsletter signup
   - Feature highlights
   
2. **Article Listing** (`/articles`)
   - Grid/list of all articles
   - Filter by pillar
   - Search integration
   - Pagination (12 per page)

3. **Pillar Pages** (`/pillars/:slug`)
   - Pillar description
   - Related articles (3-5)
   - Call to action (signup/subscribe)

4. **Article Detail** (`/articles/:slug`)
   - Full article content
   - Author info
   - Related articles (2 links)
   - Social share buttons

5. **Membership Page** (`/membership`)
   - Pricing table ($12/mo, $99/yr)
   - Features list
   - FAQ
   - CTA button (redirect to Lemon Squeezy)

6. **Responsive Design**
   - Mobile first (375px+)
   - Tablet (768px+)
   - Desktop (1440px+)
   - All pages tested on iPhone/Android

### Technical Requirements
- React 19 + Vite
- Tailwind CSS + shadcn/ui
- React Router v7
- Static export (no server needed)
- Build command: `npm run build`
- Output: `/dist` folder with pure HTML

### Design Reference
- Copy design language from Emotions-Livestoically
- Colors: Warm off-white (#F7F5F0), forest green (#4A7C59)
- Typography: Playfair Display (headlines), Lora (body)
- Max width: 680px article body

### Data Structure
```javascript
// Articles
{
  id: "uuid",
  slug: "article-slug",
  title: "Article Title",
  excerpt: "Short description",
  content: "Full HTML content",
  pillar: "how-you-think",
  author: "Claude AI",
  publishedAt: "2026-06-01",
  wordCount: 1500,
  readTime: 8,
  imageUrl: "header-image.jpg",
  seoTitle: "Article Title | Livestoically",
  seoDescription: "Meta description",
  tags: ["stoicism", "mindfulness"]
}

// Pillars
{
  id: "uuid",
  slug: "how-you-think",
  name: "How You Think",
  description: "Your thoughts shape reality...",
  color: "#4A7C59",
  articleCount: 3
}
```

### Success Criteria
- [ ] All pages created
- [ ] Mobile responsive tested
- [ ] Static build succeeds
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Load time < 2 seconds

---

## 📝 AGENT 2: CONTENT MANAGER

**Role:** Create 27 Stoic articles + SEO optimization  
**Deadline:** June 9, 2026

### Your Mission
Generate 27 high-quality Stoic philosophy articles using Claude API. Each article must be SEO-optimized, humanized, and ready for publication.

### Article Structure (REQUIRED - Every Article)
```
LENGTH: 1,200-2,000 words

SECTIONS:
1. Concept intro (200 words)
   - Hook: Why should reader care?
   - Define the core concept
   - Personal relevance
   
2. Why it matters (300 words)
   - Real-world problem
   - Stakes (emotional/practical)
   - How Stoicism helps
   
3. Supporting ideas (3 sections, 300 words each)
   - Idea 1 with example
   - Idea 2 with example
   - Idea 3 with example
   
4. ACTION (EXACTLY 4 sentences, <10 minutes)
   - Step 1
   - Step 2
   - Step 3
   - How to know it worked
   
5. Closing line (REQUIRED)
   - "That's enough for today."

LINKS (REQUIRED):
- 2 pillar links (internal)
- Emotionally sequenced (flow naturally)

IMAGES (3 per article):
- Header image (1200x630px)
- Pull quote graphic (800x400px)
- OG image (same as header)

SEO (REQUIRED):
- Title (60 chars, keyword-rich)
- Meta description (160 chars)
- H-structure (H1, H2, H3)
- Alt tags for all images
- Schema markup (Article)
```

### 27 Articles to Create

**How You Think (3)**
1. "Attention is a choice"
   - Focus on what you control
   - Your mind as currency
   
2. "Stories you tell yourself"
   - Narrative shapes reality
   - Reframe limiting beliefs
   
3. "Assumptions cost you"
   - Question your beliefs
   - Separate fact from interpretation

**Control & Letting Go (3)**
4. "What you can't control"
   - Stop wasting energy
   - Accept what's outside you
   
5. "The only choice you have"
   - Your response is power
   - Freedom within constraints
   
6. "Acceptance is strength"
   - Let go of outcomes
   - Peace comes from surrender

**Self-Discipline (3)**
7. "Comfort is a trap"
   - Small habits compound
   - Growth through resistance
   
8. "Delay is a choice"
   - Action beats perfection
   - Start imperfect
   
9. "Systems beat willpower"
   - Design your environment
   - Make good choices automatic

**Work & Purpose (3)**
10. "Work without expecting reward"
    - Do good work anyway
    - Service over compensation
    
11. "Your job is practice"
    - See work as training
    - Master your craft
    
12. "Mastery requires patience"
    - Excellence takes time
    - Enjoy the process

**Your Emotions (3)**
13. "Emotions are data"
    - They tell you something
    - Listen, don't suppress
    
14. "Anger has a message"
    - Don't ignore it
    - What is it protecting?
    
15. "Anxiety is overthinking"
    - Slow down, breathe
    - Return to present

**People & Connection (3)**
16. "You can't change others"
    - But you can influence
    - Focus on yourself
    
17. "Listen more, talk less"
    - Hear what they're saying
    - Understand before judging
    
18. "Judgment creates distance"
    - Suspend it, connect
    - Empathy over criticism

**Resilience & Adversity (3)**
19. "Setbacks are opportunities"
    - What can you learn?
    - Adversity reveals character
    
20. "Failure is feedback"
    - Not rejection
    - Information for improvement
    
21. "Hardship makes you stronger"
    - Iron sharpens iron
    - Growth through struggle

**Happiness & Meaning (3)**
22. "Happiness isn't the goal"
    - Meaning is
    - Purpose over pleasure
    
23. "Comparison is suffering"
    - Run your own race
    - Their path isn't yours
    
24. "Gratitude rewires your brain"
    - Notice what's good
    - Shift perspective

**Death & Impermanence (3)**
25. "You will die"
    - Memento mori
    - What matters now?
    
26. "Everything ends"
    - Impermanence is freeing
    - Cherish what you have
    
27. "Legacy is what you build"
    - Your impact matters
    - What will you leave?

### SEO Optimization Checklist
For each article:
- [ ] Title (50-60 chars, includes primary keyword)
- [ ] Meta description (150-160 chars, CTA included)
- [ ] H1 (article title, exactly once)
- [ ] H2 (section headers, 3-5 per article)
- [ ] H3 (sub-points, as needed)
- [ ] Alt text (descriptive, includes keyword)
- [ ] Internal links (2 pillar links, contextual)
- [ ] Schema markup (Article, Author, DatePublished)
- [ ] Keyword placement (title, first 100 words, headings)
- [ ] Readability (short sentences, active voice)

### Content Quality Checklist
- [ ] No banned words (transform, journey, level up, hustle, grind, etc.)
- [ ] No historic Stoics mentioned (Marcus Aurelius, Seneca, Epictetus)
- [ ] Plain English (no jargon)
- [ ] Authentic (not self-help clichés)
- [ ] Brand score > 75/80
- [ ] SEO score > 80/100
- [ ] Humanized (no AI patterns)
- [ ] One concept only
- [ ] One action only (4 sentences max)

### Image Generation
- Use Satori API (Claude can call)
- Header: 1200x630px, branded typography
- Pull quote: 800x400px, highlight one sentence
- OG: Same as header
- No stock photos, faces, or landscapes

### Success Criteria
- [ ] 27 articles written
- [ ] All SEO-optimized
- [ ] 81 images generated (3 per article)
- [ ] Internal links connected
- [ ] Affiliate links placed (1 per pillar)
- [ ] All formatted for frontend
- [ ] Brand + SEO scores verified

---

## 💾 AGENT 3: DATA ENGINEER

**Role:** Supabase setup + data management  
**Deadline:** June 2, 2026

### Your Mission
Design and implement Supabase PostgreSQL database. Create tables, set up authentication, configure webhooks.

### Database Schema

**Table: pillars**
```sql
CREATE TABLE pillars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(7),
  icon VARCHAR(50),
  order_index INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Table: articles**
```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  excerpt TEXT,
  content JSONB, -- HTML content
  pillar_id UUID REFERENCES pillars(id),
  author VARCHAR(100) DEFAULT 'Claude',
  published_at TIMESTAMP,
  
  -- SEO
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  seo_keywords VARCHAR(200),
  seo_score INT DEFAULT 0,
  brand_score INT DEFAULT 0,
  
  -- Content metadata
  word_count INT,
  read_time INT,
  image_header_url VARCHAR(500),
  image_og_url VARCHAR(500),
  image_quote_url VARCHAR(500),
  
  -- Internal links
  related_articles JSONB, -- Array of {id, title, slug}
  pillar_links JSONB, -- Array of {pillar_id, title}
  
  -- Affiliate
  affiliate_link VARCHAR(500),
  
  -- Status
  status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
  featured BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Table: subscribers**
```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'subscribed', -- subscribed, unsubscribed, bounced
  source VARCHAR(50), -- homepage, article, popup
  tags JSONB, -- Interest tags
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Table: members**
```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(100),
  lemon_squeezy_customer_id VARCHAR(100),
  subscription_status VARCHAR(20), -- active, cancelled, past_due
  tier VARCHAR(20), -- monthly, annual
  joined_at TIMESTAMP DEFAULT NOW(),
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Table: analytics**
```sql
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(50), -- page_view, click, signup, purchase
  article_id UUID REFERENCES articles(id),
  user_id VARCHAR(100),
  session_id VARCHAR(100),
  timestamp TIMESTAMP DEFAULT NOW(),
  metadata JSONB -- Additional context
);
```

### Setup Tasks
- [ ] Create all tables
- [ ] Set up Row Level Security (RLS)
- [ ] Configure indexes for performance
- [ ] Create views (e.g., published_articles)
- [ ] Set up automated backups
- [ ] Test data insertion/retrieval
- [ ] Create seed data (9 pillars)
- [ ] Setup Supabase Auth (optional)
- [ ] Configure webhooks for analytics

### Success Criteria
- [ ] All tables created
- [ ] Data integrity constraints working
- [ ] Performance tested (queries < 100ms)
- [ ] RLS policies configured
- [ ] Backups automated
- [ ] No sensitive data exposed

---

## 🚀 AGENT 4: DEVOPS ENGINEER

**Role:** Netlify setup + deployment  
**Deadline:** June 2, 2026

### Your Mission
Configure Netlify for static site deployment. Set up domain, SSL, environment variables, and CI/CD.

### Netlify Configuration

**netlify.toml**
```toml
[build]
  command = "npm run build"
  publish = "dist"
  
[build.environment]
  NODE_VERSION = "18"
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Setup Tasks
- [ ] Create Netlify account
- [ ] Connect GitHub repo (Livestoically-Pure-Static)
- [ ] Configure build settings
- [ ] Set environment variables
- [ ] Enable auto-deploy on push
- [ ] Configure custom domain
- [ ] Enable HTTPS (automatic via Let's Encrypt)
- [ ] Set up error page (404, 500)
- [ ] Configure redirects
- [ ] Set security headers
- [ ] Enable analytics
- [ ] Setup monitoring alerts

### Domain Configuration
- Primary: emotions-livestoically.com
- WWW redirect: www.emotions-livestoically.com → primary
- DNS: Point to Netlify nameservers

### Monitoring
- Uptime monitoring (99.9% target)
- Performance monitoring (Lighthouse)
- Error tracking (Sentry optional)
- Analytics integration (GA4)

### Success Criteria
- [ ] Site deploys automatically
- [ ] Domain resolves correctly
- [ ] HTTPS working
- [ ] Load time < 2 seconds
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Mobile fully responsive

---

## 📊 AGENT 5: GROWTH MANAGER

**Role:** Email sequences + analytics  
**Deadline:** June 16, 2026

### Your Mission
Set up ConvertKit email sequences, Lemon Squeezy payments, and GA4 analytics tracking.

### Email Sequences (ConvertKit)

**Welcome Sequence (5 emails, 1 per day)**

Email 1: "Welcome to Livestoically"
- Welcome message
- What is Stoicism?
- What to expect
- Link to first article

Email 2: "The power of your attention"
- Feature story about control
- Link to "Attention is a choice" article
- CTA: Read more

Email 3: "Stop wasting energy on what you can't control"
- Feature story
- Link to "What you can't control"
- Member exclusive offer

Email 4: "The one choice you always have"
- Feature story
- Link to "The only choice you have"
- Introduce membership

Email 5: "Your transformation starts with one decision"
- Summary of first 4 emails
- Call to action: Join membership
- Special offer (e.g., $9/mo first month)

### Payment Integration (Lemon Squeezy)

**Products:**
- Monthly membership: $12/month
- Annual membership: $99/year
- Affiliate commission structure

**Setup:**
- [ ] Create Lemon Squeezy account
- [ ] Set up products
- [ ] Configure webhooks
- [ ] Test payment flow
- [ ] Verify tax handling
- [ ] Set up customer portal

### Analytics (GA4)

**Events to track:**
- page_view: All page loads
- scroll: 25%, 50%, 75%, 100%
- click_article: Article link clicked
- click_signup: Newsletter signup clicked
- click_subscribe: Subscribe button clicked
- signup_complete: Form submitted
- purchase_complete: Payment successful

**Dashboards:**
- Daily active users
- Traffic by pillar
- Conversion rate (visitor → subscriber)
- Email engagement (open, click)
- Revenue tracking
- Member retention

### Success Criteria
- [ ] Email sequences live
- [ ] All 5 emails sending
- [ ] Payment system working
- [ ] Test transactions successful
- [ ] GA4 tracking all events
- [ ] Dashboards created
- [ ] Email open rate > 30%
- [ ] Conversion rate baseline measured

---

## 📋 EXECUTION TIMELINE

**Week 1 (May 27 - June 2)**
- Agent 1 & 3 & 4: Frontend + Database + DevOps complete
- Goal: Infrastructure ready

**Week 2 (June 3 - June 9)**
- Agent 2: 27 articles complete
- Goal: All content ready

**Week 3 (June 10 - June 16)**
- Agent 5: Email + Payment setup
- All agents: Integration testing
- Goal: Monetization working

**Week 4 (June 17 - June 23)**
- All agents: Final QA + optimization
- Deploy to production
- Public launch
- Goal: Live on emotions-livestoically.com

---

## 🎯 DAILY STANDUP QUESTIONS

1. What did you ship yesterday?
2. What's blocking you?
3. What's your goal for today?
4. Do you need help?

**Daily sync:** 10am UTC (optional but recommended)

---

## 📞 COMMUNICATION

- **GitHub:** Push code daily
- **Commit messages:** Clear and descriptive
- **Issues:** Track bugs/blockers
- **PRs:** Code review before merge
- **Questions:** Async via GitHub discussions

---

## SUCCESS = LAUNCH ON JUNE 23

GO TEAM! 🚀

