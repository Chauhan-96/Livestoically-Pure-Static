import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { generateArticle, generateSEO, createArticle, getPillars } from '@/lib/api';
import { Sparkles, Save, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminAIWriterPage() {
  const navigate = useNavigate();
  const [pillars, setPillars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatingSEO, setGeneratingSEO] = useState(false);

  // Generation settings
  const [topic, setTopic] = useState('');
  const [pillarId, setPillarId] = useState('');
  const [tone, setTone] = useState('calm, grounded, minimal');
  const [length, setLength] = useState('medium');

  // Generated content
  const [generated, setGenerated] = useState({
    title: '',
    content: '',
    slug: '',
    excerpt: '',
    seo_title: '',
    seo_description: '',
    featured_image: '',
    is_published: false,
    is_featured: false,
    read_time: 5
  });

  useEffect(() => {
    const fetchPillars = async () => {
      try {
        const response = await getPillars();
        setPillars(response.data);
        if (response.data.length > 0) {
          setPillarId(response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching pillars:', error);
      }
    };
    fetchPillars();
  }, []);

  const handleGenerate = async () => {
    if (!topic || !pillarId) {
      toast.error('Please enter a topic and select a pillar');
      return;
    }

    setLoading(true);
    try {
      const response = await generateArticle(topic, pillarId, tone, length);
      setGenerated(prev => ({
        ...prev,
        title: response.data.title,
        content: response.data.content,
        pillar_id: pillarId
      }));
      toast.success('Article generated! Review and edit as needed.');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSEO = async () => {
    if (!generated.title || !generated.content) {
      toast.error('Generate an article first');
      return;
    }

    setGeneratingSEO(true);
    try {
      const response = await generateSEO(generated.title, generated.content);
      setGenerated(prev => ({
        ...prev,
        seo_title: response.data.seo_title || prev.seo_title,
        seo_description: response.data.seo_description || prev.seo_description,
        slug: response.data.slug || prev.slug,
        excerpt: response.data.excerpt || prev.excerpt
      }));
      toast.success('SEO content generated');
    } catch (error) {
      toast.error('Failed to generate SEO content');
    } finally {
      setGeneratingSEO(false);
    }
  };

  const handleSave = async (publish = false) => {
    if (!generated.title || !generated.content || !pillarId) {
      toast.error('Please generate content first');
      return;
    }

    if (!generated.slug) {
      toast.error('Please add a URL slug');
      return;
    }

    setSaving(true);
    try {
      const articleData = {
        ...generated,
        pillar_id: pillarId,
        is_published: publish
      };
      await createArticle(articleData);
      toast.success(publish ? 'Article published!' : 'Draft saved!');
      navigate('/admin/articles');
    } catch (error) {
      toast.error('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setGenerated(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl" data-testid="ai-writer">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-stone-900">AI Article Writer</h1>
          <p className="text-stone-500 mt-1">Generate thoughtful Stoic content with AI assistance</p>
        </div>

        {/* Generation Controls */}
        <div className="bg-white border border-stone-200 rounded-sm p-6 mb-8">
          <h2 className="font-serif text-lg text-stone-900 mb-4">Generate New Article</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Topic or Title</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors"
                placeholder="e.g., 'How to stay calm during uncertainty' or 'Finding peace in daily routine'"
                data-testid="ai-topic"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Pillar</label>
                <select
                  value={pillarId}
                  onChange={(e) => setPillarId(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors"
                  data-testid="ai-pillar"
                >
                  {pillars.map(pillar => (
                    <option key={pillar.id} value={pillar.id}>{pillar.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors"
                  data-testid="ai-tone"
                >
                  <option value="calm, grounded, minimal">Calm & Grounded</option>
                  <option value="practical, actionable, clear">Practical & Actionable</option>
                  <option value="reflective, contemplative, deep">Reflective & Deep</option>
                  <option value="warm, encouraging, gentle">Warm & Encouraging</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Length</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors"
                  data-testid="ai-length"
                >
                  <option value="short">Short (600-800 words)</option>
                  <option value="medium">Medium (1000-1200 words)</option>
                  <option value="long">Long (1500-2000 words)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !topic || !pillarId}
              className="inline-flex items-center px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors disabled:opacity-50"
              data-testid="generate-btn"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} className="mr-2" />
                  Generate Article
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Content */}
        {generated.content && (
          <div className="space-y-6">
            {/* Actions Bar */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 text-stone-600 text-sm hover:text-stone-900 transition-colors"
              >
                <RefreshCw size={14} className="mr-2" />
                Regenerate
              </button>
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

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Title</label>
              <input
                type="text"
                value={generated.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors font-serif text-xl"
                data-testid="gen-title"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Excerpt</label>
              <textarea
                value={generated.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors resize-none"
                placeholder="Brief summary for article cards..."
                data-testid="gen-excerpt"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Content</label>
              <textarea
                value={generated.content}
                onChange={(e) => handleChange('content', e.target.value)}
                rows={20}
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors resize-none editor-textarea"
                data-testid="gen-content"
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
                  data-testid="gen-seo-btn"
                >
                  {generatingSEO ? (
                    <Loader2 size={14} className="mr-2 animate-spin" />
                  ) : (
                    <Sparkles size={14} className="mr-2" />
                  )}
                  Generate SEO
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">SEO Title</label>
                  <input
                    type="text"
                    value={generated.seo_title}
                    onChange={(e) => handleChange('seo_title', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors text-sm"
                    placeholder="SEO title (max 60 chars)"
                    maxLength={60}
                    data-testid="gen-seo-title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">URL Slug *</label>
                  <input
                    type="text"
                    value={generated.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors text-sm"
                    placeholder="url-friendly-slug"
                    data-testid="gen-slug"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-stone-700 mb-2">Meta Description</label>
                <textarea
                  value={generated.seo_description}
                  onChange={(e) => handleChange('seo_description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors resize-none text-sm"
                  placeholder="Meta description (max 155 chars)"
                  maxLength={155}
                  data-testid="gen-seo-desc"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-stone-700 mb-2">Featured Image URL</label>
                <input
                  type="text"
                  value={generated.featured_image}
                  onChange={(e) => handleChange('featured_image', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors text-sm"
                  placeholder="https://images.unsplash.com/..."
                  data-testid="gen-image"
                />
              </div>
            </div>

            {/* Options */}
            <div className="border-t border-stone-200 pt-6">
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generated.is_featured}
                    onChange={(e) => handleChange('is_featured', e.target.checked)}
                    className="rounded border-stone-300"
                  />
                  <span className="text-sm text-stone-700">Featured article</span>
                </label>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-stone-700">Read time:</label>
                  <input
                    type="number"
                    value={generated.read_time}
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
        )}
      </div>
    </AdminLayout>
  );
}
