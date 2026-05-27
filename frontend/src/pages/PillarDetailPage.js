import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ArticleCard } from '@/components/ArticleCard';
import { getPillar, getArticles } from '@/lib/api';
import { getPillarIcon } from '@/lib/icons';
import { ArrowLeft } from 'lucide-react';

export default function PillarDetailPage() {
  const { slug } = useParams();
  const [pillar, setPillar] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pillarRes = await getPillar(slug);
        setPillar(pillarRes.data);
        
        const articlesRes = await getArticles(true, pillarRes.data.id);
        setArticles(articlesRes.data);
      } catch (error) {
        console.error('Error fetching pillar:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="py-20 container-calm">
          <div className="h-8 w-32 skeleton mb-8" />
          <div className="h-12 w-2/3 skeleton mb-4" />
          <div className="h-6 w-full skeleton mb-2" />
          <div className="h-6 w-3/4 skeleton" />
        </div>
      </Layout>
    );
  }

  if (!pillar) {
    return (
      <Layout>
        <div className="py-20 container-calm text-center">
          <h1 className="font-serif text-3xl text-stone-900 mb-4">Pillar not found</h1>
          <Link to="/pillars" className="text-stone-600 hover:text-stone-900">
            Back to Pillars
          </Link>
        </div>
      </Layout>
    );
  }

  const Icon = getPillarIcon(pillar.icon);

  return (
    <Layout>
      {/* Back Link */}
      <div className="py-6 border-b border-stone-200">
        <div className="container-calm">
          <Link 
            to="/pillars" 
            className="inline-flex items-center text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={14} className="mr-1" />
            All Pillars
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24" data-testid="pillar-hero">
        <div className="container-calm">
          <div className="max-w-2xl">
            <div className="mb-6">
              <Icon size={40} className="text-stone-500" strokeWidth={1.5} />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
              {pillar.name}
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed italic">
              "{pillar.intro}"
            </p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 md:py-16 border-y border-stone-200 bg-stone-50">
        <div className="container-calm">
          <div className="prose-container">
            <p className="text-lg text-stone-700 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        </div>
      </section>

      {/* Articles in this Pillar */}
      <section className="py-20 md:py-28" data-testid="pillar-articles">
        <div className="container-calm">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-10">
            Articles on {pillar.name}
          </h2>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-stone-500">
              No articles yet in this pillar. Check back soon.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
