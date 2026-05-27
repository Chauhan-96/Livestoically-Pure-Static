import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { getAllArticles, deleteArticle, updateArticle } from '@/lib/api';
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await getAllArticles();
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (article) => {
    try {
      await updateArticle(article.id, { is_published: !article.is_published });
      fetchArticles();
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteArticle(deleteId);
      setDeleteId(null);
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-5xl" data-testid="admin-articles">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-stone-900">Articles</h1>
            <p className="text-stone-500 mt-1">{articles.length} total articles</p>
          </div>
          <Link
            to="/admin/write"
            className="inline-flex items-center px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors"
            data-testid="new-article-btn"
          >
            <Plus size={16} className="mr-2" />
            New Article
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none transition-colors"
            data-testid="search-articles"
          />
        </div>

        {/* Articles Table */}
        <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-stone-500">Loading...</div>
          ) : filteredArticles.length > 0 ? (
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-stone-600">Title</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-stone-600 hidden md:table-cell">Status</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-stone-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <h3 className="text-stone-900 font-medium line-clamp-1">
                          {article.title}
                        </h3>
                        <p className="text-stone-500 text-sm mt-1 line-clamp-1">
                          {article.excerpt || 'No excerpt'}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className={`inline-flex items-center px-2 py-1 text-xs rounded ${
                        article.is_published 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-stone-100 text-stone-600'
                      }`}>
                        {article.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleTogglePublish(article)}
                          className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
                          title={article.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {article.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <Link
                          to={`/admin/articles/${article.id}`}
                          className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(article.id)}
                          className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-stone-500">
              {searchTerm ? 'No articles match your search.' : 'No articles yet. Create your first one!'}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
