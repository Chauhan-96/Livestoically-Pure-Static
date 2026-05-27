import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ArticleCard } from '@/components/ArticleCard';
import { PillarCard } from '@/components/PillarCard';
import { NewsletterForm } from '@/components/NewsletterForm';
import { DailyQuote } from '@/components/DailyQuote';
import { getPillars, getFeaturedArticles } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [pillars, setPillars] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pillarsRes, articlesRes] = await Promise.all([
          getPillars(),
          getFeaturedArticles()
        ]);
        setPillars(Array.isArray(pillarsRes) ? pillarsRes : pillarsRes.data);
        setArticles(Array.isArray(articlesRes) ? articlesRes : articlesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32" data-testid="hero-section">
        <div className="container-calm">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-[1.1] tracking-tight mb-6 fade-in">
              Find clarity in the noise of modern life
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-10 max-w-2xl fade-in" style={{ animationDelay: '0.1s' }}>
              LiveStoically helps thoughtful people build inner stability through 
              practical Stoic principles. No hype. No hustle. Just quiet, grounded wisdom 
              for when life feels uncertain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 fade-in" style={{ animationDelay: '0.2s' }}>
              <Link 
                to="/start-here"
                className="inline-flex items-center justify-center px-8 py-4 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors"
                data-testid="cta-start-here"
              >
                Start Here
                <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link 
                to="/pillars"
                className="inline-flex items-center justify-center px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium rounded-sm hover:bg-stone-100 hover:border-stone-400 transition-colors"
                data-testid="cta-explore-pillars"
              >
                Explore the 9 Pillars
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Stoic Quote - Rotates Each Day */}
      <DailyQuote />

      {/* Featured Articles */}
      {articles.length > 0 && (
        <section className="py-20 md:py-28" data-testid="featured-articles">
          <div className="container-calm">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-sm text-stone-500 uppercase tracking-wide mb-2 block">
                  Featured
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
                  Start reading
                </h2>
              </div>
              <Link 
                to="/articles" 
                className="hidden sm:flex items-center text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                All articles
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {articles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            <Link 
              to="/articles" 
              className="sm:hidden flex items-center justify-center mt-10 text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              All articles
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
        </section>
      )}

      {/* Pillars Preview */}
      <section className="py-20 md:py-28 bg-stone-50" data-testid="pillars-preview">
        <div className="container-calm">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-sm text-stone-500 uppercase tracking-wide mb-2 block">
              The Foundation
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              The 9 Pillars of Stoic Living
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto">
              A complete system for building inner stability. Each pillar addresses 
              a different aspect of the human experience.
            </p>
          </div>
          {!loading && pillars.length > 0 && (
            <>
              <div className="pillar-grid">
                {pillars.map((pillar) => (
                  <PillarCard key={pillar.id} pillar={pillar} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link 
                  to="/pillars"
                  className="inline-flex items-center text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Explore all pillars
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-28" data-testid="newsletter-section">
        <div className="container-calm">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              When life feels unstable
            </h2>
            <p className="text-stone-600 mb-8">
              Get grounded perspective delivered quietly to your inbox. 
              Short essays on living with clarity.
            </p>
            <div className="flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
