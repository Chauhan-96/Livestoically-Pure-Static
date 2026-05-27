import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { BrandedArticleImage } from './BrandedArticleImage';

export const ArticleCard = ({ article, showExcerpt = true }) => {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="block article-card p-6 rounded-sm hover:bg-white transition-colors duration-300"
      data-testid={`article-card-${article.slug}`}
    >
      {article.featured_image ? (
        <div className="aspect-[16/9] mb-5 overflow-hidden rounded-sm bg-stone-100">
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <BrandedArticleImage
          title={article.title}
          pillarSlug={article.pillar_slug}
          pillarName={article.pillar_name}
          className="mb-5"
        />
      )}
      <h3 className="font-serif text-xl md:text-2xl text-stone-900 leading-tight mb-3">
        {article.title}
      </h3>
      {showExcerpt && article.excerpt && (
        <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>
      )}
      <div className="flex items-center text-stone-400 text-sm">
        <Clock size={14} className="mr-1.5" />
        <span>{article.read_time || 5} min read</span>
      </div>
    </Link>
  );
};
