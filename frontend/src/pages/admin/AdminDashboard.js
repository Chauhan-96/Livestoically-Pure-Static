import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { getAdminStats, getFeaturedArticles } from '@/lib/api';
import { FileText, Users, Eye, PenTool, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, articlesRes] = await Promise.all([
          getAdminStats(),
          getFeaturedArticles()
        ]);
        setStats(statsRes.data);
        setRecentArticles(articlesRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: 'Total Articles', value: stats?.total_articles || 0, icon: FileText },
    { label: 'Published', value: stats?.published_articles || 0, icon: Eye },
    { label: 'Drafts', value: stats?.draft_articles || 0, icon: PenTool },
    { label: 'Subscribers', value: stats?.subscribers || 0, icon: Users },
  ];

  return (
    <AdminLayout>
      <div className="max-w-5xl" data-testid="admin-dashboard">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-stone-900">Dashboard</h1>
          <p className="text-stone-500 mt-1">Welcome back to LiveStoically</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className="p-6 bg-white border border-stone-200 rounded-sm"
              >
                <Icon size={20} className="text-stone-400 mb-3" />
                <p className="text-2xl font-serif text-stone-900">
                  {loading ? '-' : stat.value}
                </p>
                <p className="text-sm text-stone-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Link
            to="/admin/write"
            className="p-6 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-colors group"
            data-testid="quick-action-write"
          >
            <PenTool size={24} className="mb-4" />
            <h3 className="font-serif text-xl mb-2">Create with AI</h3>
            <p className="text-stone-300 text-sm mb-4">
              Generate a new article using AI assistance
            </p>
            <span className="inline-flex items-center text-sm group-hover:translate-x-1 transition-transform">
              Start writing
              <ArrowRight size={14} className="ml-1" />
            </span>
          </Link>

          <Link
            to="/admin/articles"
            className="p-6 bg-white border border-stone-200 rounded-sm hover:border-stone-300 transition-colors group"
            data-testid="quick-action-articles"
          >
            <FileText size={24} className="text-stone-500 mb-4" />
            <h3 className="font-serif text-xl text-stone-900 mb-2">Manage Articles</h3>
            <p className="text-stone-500 text-sm mb-4">
              Edit, publish, or delete existing content
            </p>
            <span className="inline-flex items-center text-sm text-stone-600 group-hover:text-stone-900 group-hover:translate-x-1 transition-all">
              View all
              <ArrowRight size={14} className="ml-1" />
            </span>
          </Link>
        </div>

        {/* Recent Articles */}
        <div>
          <h2 className="font-serif text-xl text-stone-900 mb-4">Recent Articles</h2>
          <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
            {recentArticles.length > 0 ? (
              <div className="divide-y divide-stone-100">
                {recentArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/admin/articles/${article.id}`}
                    className="flex items-center justify-between p-4 hover:bg-stone-50 transition-colors"
                  >
                    <div>
                      <h3 className="text-stone-900 font-medium">{article.title}</h3>
                      <p className="text-stone-500 text-sm mt-1">
                        {article.read_time || 5} min read
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      article.is_published 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {article.is_published ? 'Published' : 'Draft'}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="p-6 text-stone-500 text-center">
                No articles yet. Create your first one!
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
