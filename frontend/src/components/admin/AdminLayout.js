import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  PenTool, 
  LogOut,
  ExternalLink
} from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/articles', label: 'Articles', icon: FileText },
    { href: '/admin/write', label: 'AI Writer', icon: PenTool },
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-stone-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-stone-200">
          <Link to="/admin" className="font-serif text-xl text-stone-900">
            LiveStoically
          </Link>
          <p className="text-stone-500 text-xs mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`admin-nav-item ${isActive(item.href) ? 'active' : ''}`}
                data-testid={`admin-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                <Icon size={18} className="mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-item text-stone-500"
          >
            <ExternalLink size={18} className="mr-3" />
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="admin-nav-item text-stone-500 hover:text-red-600 w-full"
            data-testid="admin-logout"
          >
            <LogOut size={18} className="mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
