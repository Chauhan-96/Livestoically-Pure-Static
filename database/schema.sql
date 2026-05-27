-- LIVESTOICALLY PURE STATIC: DATABASE SCHEMA
-- Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLE: PILLARS (9 emotional areas)
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

-- TABLE: ARTICLES (27 starter articles)
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  excerpt TEXT,
  content JSONB,
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
  related_articles JSONB,
  pillar_links JSONB,

  -- Affiliate
  affiliate_link VARCHAR(500),

  -- Status
  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- TABLE: SUBSCRIBERS
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'subscribed',
  source VARCHAR(50),
  tags JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- TABLE: MEMBERS
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  lemon_squeezy_customer_id VARCHAR(100),
  subscription_status VARCHAR(20),
  tier VARCHAR(20),
  joined_at TIMESTAMP DEFAULT NOW(),
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- TABLE: ANALYTICS
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(50),
  article_id UUID REFERENCES articles(id),
  user_id VARCHAR(100),
  session_id VARCHAR(100),
  timestamp TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

-- INDEXES (performance)
CREATE INDEX idx_articles_pillar_id ON articles(pillar_id);
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_analytics_article_id ON analytics(article_id);
CREATE INDEX idx_analytics_timestamp ON analytics(timestamp);

-- SEED DATA: 9 PILLARS
INSERT INTO pillars (slug, name, description, color, icon, order_index) VALUES
('how-you-think', 'How You Think', 'Your thoughts shape reality', '#4A7C59', '🧠', 1),
('control-letting-go', 'Control & Letting Go', 'What you can and cannot control', '#2E5090', '⚖️', 2),
('self-discipline', 'Self-Discipline', 'Building habits that matter', '#6B4423', '💪', 3),
('work-purpose', 'Work & Purpose', 'Mastery and meaningful work', '#8B5A3C', '🎯', 4),
('your-emotions', 'Your Emotions', 'Understanding your inner world', '#A64253', '❤️', 5),
('people-connection', 'People & Connection', 'Relationships and understanding others', '#4A7C7E', '🤝', 6),
('resilience-adversity', 'Resilience & Adversity', 'Strength through hardship', '#6B4C3A', '🪨', 7),
('happiness-meaning', 'Happiness & Meaning', 'What actually matters', '#8B7355', '✨', 8),
('death-impermanence', 'Death & Impermanence', 'Living with mortality in mind', '#5A4A4A', '🌙', 9);

-- Row Level Security (RLS) - Allow public read for articles
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_articles" ON articles
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "public_read_pillars" ON pillars
  FOR SELECT
  USING (true);

-- Success message
-- Schema created successfully!
