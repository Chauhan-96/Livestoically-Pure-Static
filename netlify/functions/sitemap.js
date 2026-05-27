/**
 * NETLIFY FUNCTION — Sitemap Generator
 * Generates dynamic sitemap.xml for SEO
 * Called by: GET /api/sitemap.xml OR scheduled daily
 * Returns: XML sitemap with all articles + pillar pages
 */

const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
    const siteUrl = process.env.VITE_SITE_URL || 'https://livestoically.com';

    if (!supabaseUrl || !anonKey) {
      console.error('Supabase not configured');
      return {
        statusCode: 500,
        body: 'Supabase not configured'
      };
    }

    // Fetch all published articles
    const articlesResponse = await fetch(
      `${supabaseUrl}/rest/v1/articles?status=eq.published&select=id,slug,updated_at&order=updated_at.desc`,
      {
        headers: {
          'Authorization': `Bearer ${anonKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!articlesResponse.ok) {
      throw new Error(`Articles fetch failed: ${articlesResponse.status}`);
    }

    const articles = await articlesResponse.json() || [];

    // Fetch all pillars for pillar pages
    const pillarsResponse = await fetch(
      `${supabaseUrl}/rest/v1/pillars?select=slug,updated_at&order=updated_at.desc`,
      {
        headers: {
          'Authorization': `Bearer ${anonKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!pillarsResponse.ok) {
      throw new Error(`Pillars fetch failed: ${pillarsResponse.status}`);
    }

    const pillars = await pillarsResponse.json() || [];

    // Build sitemap XML
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add homepage
    sitemap += `  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>\n`;

    // Add pillar index page
    sitemap += `  <url>
    <loc>${siteUrl}/pillars</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;

    // Add membership page
    sitemap += `  <url>
    <loc>${siteUrl}/membership</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;

    // Add start (quiz) page
    sitemap += `  <url>
    <loc>${siteUrl}/start</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;

    // Add pillar pages
    pillars.forEach(pillar => {
      const lastmod = pillar.updated_at ? pillar.updated_at.split('T')[0] : new Date().toISOString().split('T')[0];
      sitemap += `  <url>
    <loc>${siteUrl}/pillars/${pillar.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    });

    // Add article pages
    articles.forEach(article => {
      const lastmod = article.updated_at ? article.updated_at.split('T')[0] : new Date().toISOString().split('T')[0];
      sitemap += `  <url>
    <loc>${siteUrl}/articles/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    });

    sitemap += '</urlset>';

    console.log(`✅ Sitemap generated: ${articles.length} articles + ${pillars.length} pillars`);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600'
      },
      body: sitemap
    };

  } catch (error) {
    console.error('❌ Sitemap generation error:', error);
    return {
      statusCode: 500,
      body: `Error generating sitemap: ${error.message}`
    };
  }
};
