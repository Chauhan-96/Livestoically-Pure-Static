import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ArticleCard } from '@/components/ArticleCard';
import { PillarCard } from '@/components/PillarCard';
import { getArticles, getPillars } from '@/lib/api';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [pillars, setPillars] = useState([]);
  const [selectedPillar, setSelectedPillar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, pillarsRes] = await Promise.all([
          getArticles(true, selectedPillar),
          getPillars()
        ]);
        setArticles(articlesRes.data);
        setPillars(pillarsRes.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedPillar]);

  const handlePillarFilter = (pillarId) => {
    setLoading(true);
    setSelectedPillar(pillarId === selectedPillar ? null : pillarId);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container-calm">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
              Articles
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Essays on living with clarity. Practical philosophy for modern struggles. 
              Read slowly. Return often.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-12 md:pb-16">
        <div className="container-calm">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handlePillarFilter(null)}
              className={`px-4 py-2 text-sm rounded-sm transition-colors ${
                selectedPillar === null
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
              data-testid="filter-all"
            >
              All
            </button>
            {pillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => handlePillarFilter(pillar.id)}
                className={`px-4 py-2 text-sm rounded-sm transition-colors ${
                  selectedPillar === pillar.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
                data-testid={`filter-${pillar.slug}`}
              >
                {pillar.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20 md:pb-28" data-testid="articles-grid">
        <div className="container-calm">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-6">
                  <div className="aspect-[16/9] skeleton mb-5 rounded-sm" />
                  <div className="h-8 skeleton w-3/4 mb-3" />
                  <div className="h-4 skeleton w-full mb-2" />
                  <div className="h-4 skeleton w-2/3" />
                </div>
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-stone-500 text-center py-12">
              No articles found. Check back soon.
            </p>
          )}
        </div>
      </section>

      {/* Browse by Pillar */}
      <section className="py-20 md:py-28 border-t border-stone-200 bg-stone-50">
        <div className="container-calm">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-10 text-center">
            Browse by pillar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pillars.slice(0, 5).map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} compact />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
