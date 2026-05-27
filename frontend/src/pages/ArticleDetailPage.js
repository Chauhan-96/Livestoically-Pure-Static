import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { getArticle, getPillarById, getArticles } from '@/lib/api';
import { ArticleCard } from '@/components/ArticleCard';
import { ArrowLeft, Clock } from 'lucide-react';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [pillar, setPillar] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleRes = await getArticle(slug);
        setArticle(articleRes.data);
        
        if (articleRes.data.pillar_id) {
          const pillarRes = await getPillarById(articleRes.data.pillar_id);
          if (pillarRes.data) {
            setPillar(pillarRes.data);
          }
          
          const relatedRes = await getArticles(true, articleRes.data.pillar_id);
          setRelatedArticles(relatedRes.data.filter(a => a.slug !== slug).slice(0, 2));
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [slug]);

  // Convert markdown-like content to HTML
  const formatContent = (content) => {
    if (!content) return '';
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        // Handle headings
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          return `<h3 key="${index}">${paragraph.replace(/\*\*/g, '')}</h3>`;
        }
        // Handle bold text within paragraphs
        const formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return `<p>${formatted}</p>`;
      })
      .join('');
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-20 container-calm">
          <div className="prose-container">
            <div className="h-6 w-32 skeleton mb-8" />
            <div className="h-12 w-full skeleton mb-4" />
            <div className="h-6 w-2/3 skeleton mb-8" />
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-5 skeleton w-full" />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="py-20 container-calm text-center">
          <h1 className="font-serif text-3xl text-stone-900 mb-4">Article not found</h1>
          <Link to="/articles" className="text-stone-600 hover:text-stone-900">
            Back to Articles
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Link */}
      <div className="py-6 border-b border-stone-200">
        <div className="container-calm">
          <Link 
            to="/articles" 
            className="inline-flex items-center text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={14} className="mr-1" />
            All Articles
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-16 md:py-24" data-testid="article-content">
        <div className="container-calm">
          <div className="prose-container">
            {/* Meta */}
            <div className="flex items-center space-x-4 text-sm text-stone-500 mb-6">
              {pillar && (
                <Link 
                  to={`/pillars/${pillar.slug}`}
                  className="hover:text-stone-900 transition-colors"
                >
                  {pillar.name}
                </Link>
              )}
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {article.read_time || 5} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-xl text-stone-600 leading-relaxed mb-10 italic">
                {article.excerpt}
              </p>
            )}

            {/* Featured Image */}
            {article.featured_image && (
              <div className="aspect-[16/9] mb-12 overflow-hidden rounded-sm bg-stone-100">
                <img 
                  src={article.featured_image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
            />
          </div>
        </div>
      </article>

      {/* Pillar Link */}
      {pillar && (
        <section className="py-12 md:py-16 border-y border-stone-200 bg-stone-50">
          <div className="container-calm">
            <div className="prose-container text-center">
              <p className="text-stone-500 text-sm mb-2">This article is part of</p>
              <Link 
                to={`/pillars/${pillar.slug}`}
                className="font-serif text-xl text-stone-900 hover:text-stone-700 transition-colors"
              >
                {pillar.name}
              </Link>
              <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">
                {pillar.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 md:py-28" data-testid="related-articles">
          <div className="container-calm">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-10 text-center">
              Continue reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-3xl mx-auto">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
