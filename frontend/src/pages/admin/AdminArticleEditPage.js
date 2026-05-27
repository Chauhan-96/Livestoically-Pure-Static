import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { updateArticle, getPillars, generateSEO } from '@/lib/api';
import { Save, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminArticleEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generatingSEO, setGeneratingSEO] = useState(false);
  const [pillars, setPillars] = useState([]);
  const [article, setArticle] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    pillar_id: '',
    seo_title: '',
    seo_description: '',
    featured_image: '',
    is_published: false,
    is_featured: false,
    read_time: 5
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pillarsRes] = await Promise.all([getPillars()]);
        setPillars(pillarsRes.data);

        if (id) {
          // Find article by ID from all articles
          const articlesRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/articles?published_only=false`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
          });
          const articles = await articlesRes.json();
          const foundArticle = articles.find(a => a.id === id);
          if (foundArticle) {
            setArticle(foundArticle);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (field, value) => {
    setArticle(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateSEO = async () => {
    if (!article.title || !article.content) {
      toast.error('Please add a title and content first');
      return;
    }

    setGeneratingSEO(true);
    try {
      const response = await generateSEO(article.title, article.content);
      setArticle(prev => ({
        ...prev,
        seo_title: response.data.seo_title || prev.seo_title,
        seo_description: response.data.seo_description || prev.seo_description,
        slug: response.data.slug || prev.slug,
        excerpt: response.data.excerpt || prev.excerpt
      }));
      toast.success('SEO content generated');
    } catch {
      toast.error('Failed to generate SEO content');
    } finally {
      setGeneratingSEO(false);
    }
  };

  const handleSave = async (publish = false) => {
    if (!article.title || !article.content || !article.pillar_id) {
      toast.error('Please fill in title, content, and select a pillar');
      return;
    }

    setSaving(true);
    try {
      const updatedArticle = { 
        ...article, 
        is_published: publish ? true : article.is_published 
      };
      await updateArticle(id, updatedArticle);
      toast.success(publish ? 'Article published!' : 'Article saved');
      if (publish) navigate('/admin/articles');
    } catch {
      toast.error('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-stone-400" size={32} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl" data-testid="article-editor">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/articles')}
              className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-serif text-2xl text-stone-900">Edit Article</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-4 py-2 border border-stone-200 text-stone-700 text-sm font-medium rounded-sm hover:bg-stone-50 transition-colors disabled:opacity-50"
              data-testid="save-draft-btn"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors disabled:opacity-50"
              data-testid="publish-btn"
            >
              <Save size={16} className="mr-2" />
              {saving ? 'Saving...' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Title</label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors font-serif text-xl"
              placeholder="Article title"
              data-testid="article-title"
            />
          </div>

          {/* Pillar */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Pillar</label>
            <select
              value={article.pillar_id}
              onChange={(e) => handleChange('pillar_id', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors"
              data-testid="article-pillar"
            >
              <option value="">Select a pillar</option>
              {pillars.map(pillar => (
                <option key={pillar.id} value={pillar.id}>{pillar.name}</option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Excerpt</label>
            <textarea
              value={article.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors resize-none"
              placeholder="Brief summary for article cards..."
              data-testid="article-excerpt"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Content</label>
            <textarea
              value={article.content}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={20}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors resize-none editor-textarea"
              placeholder="Write your article content here. Use **bold** for emphasis..."
              data-testid="article-content"
            />
          </div>

          {/* SEO Section */}
          <div className="border-t border-stone-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg text-stone-900">SEO & Metadata</h2>
              <button
                onClick={handleGenerateSEO}
                disabled={generatingSEO}
                className="inline-flex items-center px-3 py-1.5 bg-stone-100 text-stone-700 text-sm rounded-sm hover:bg-stone-200 transition-colors disabled:opacity-50"
                data-testid="generate-seo-btn"
              >
                {generatingSEO ? (
                  <Loader2 size={14} className="mr-2 animate-spin" />
                ) : (
                  <Sparkles size={14} className="mr-2" />
                )}
                Generate with AI
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">SEO Title</label>
                <input
                  type="text"
                  value={article.seo_title}
                  onChange={(e) => handleChange('seo_title', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors text-sm"
                  placeholder="SEO title (max 60 chars)"
                  maxLength={60}
                  data-testid="article-seo-title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">URL Slug</label>
                <input
                  type="text"
                  value={article.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors text-sm"
                  placeholder="url-friendly-slug"
                  data-testid="article-slug"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-stone-700 mb-2">Meta Description</label>
              <textarea
                value={article.seo_description}
                onChange={(e) => handleChange('seo_description', e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors resize-none text-sm"
                placeholder="Meta description for search results (max 155 chars)"
                maxLength={155}
                data-testid="article-seo-desc"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-stone-700 mb-2">Featured Image URL</label>
              <input
                type="text"
                value={article.featured_image}
                onChange={(e) => handleChange('featured_image', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors text-sm"
                placeholder="https://images.unsplash.com/..."
                data-testid="article-image"
              />
            </div>
          </div>

          {/* Options */}
          <div className="border-t border-stone-200 pt-6">
            <h2 className="font-serif text-lg text-stone-900 mb-4">Options</h2>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={article.is_featured}
                  onChange={(e) => handleChange('is_featured', e.target.checked)}
                  className="rounded border-stone-300"
                />
                <span className="text-sm text-stone-700">Featured article</span>
              </label>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-stone-700">Read time:</label>
                <input
                  type="number"
                  value={article.read_time}
                  onChange={(e) => handleChange('read_time', parseInt(e.target.value) || 5)}
                  className="w-16 px-2 py-1 bg-white border border-stone-200 rounded-sm text-stone-900 text-sm"
                  min={1}
                  max={60}
                />
                <span className="text-sm text-stone-500">min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
