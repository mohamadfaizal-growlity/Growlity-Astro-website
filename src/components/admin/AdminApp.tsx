import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Files, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  Mail,
  FolderOpen
} from 'lucide-react';
import CollectionList from './CollectionList';
import ContentEditor from './ContentEditor';
import VisualEditor from './VisualEditor';

const Sidebar = ({ schemas }: { schemas: any[] }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const staticNavItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Media', path: '/media', icon: <ImageIcon size={20} /> },
    { name: 'Emails', path: '/emails', icon: <Mail size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col shadow-2xl sticky top-0 left-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
          <span className="text-emerald-400">Site</span>Pins
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto py-6">
        <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Core</div>
        <nav className="space-y-1 px-3 mb-6">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              isActive('/') && location.pathname === '/' ? 'bg-emerald-500/10 text-emerald-400 font-medium' : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
        </nav>

        <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Collections</div>
        <nav className="space-y-1 px-3 mb-6">
          {schemas.map((schema) => (
            <Link
              key={schema.name}
              to={`/collections/${schema.name}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 capitalize ${
                isActive(`/collections/${schema.name}`) ? 'bg-emerald-500/10 text-emerald-400 font-medium' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FolderOpen size={20} />
              {schema.name}
            </Link>
          ))}
        </nav>

        <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">System</div>
        <nav className="space-y-1 px-3">
          {staticNavItems.slice(1).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-emerald-500/10 text-emerald-400 font-medium'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-left">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: 'Total Pages', value: '12', color: 'from-emerald-500 to-teal-400' },
        { title: 'Blog Posts', value: '34', color: 'from-blue-500 to-indigo-400' },
        { title: 'Media Files', value: '128', color: 'from-purple-500 to-pink-400' },
      ].map((stat) => (
        <div key={stat.title} className={`rounded-xl p-6 shadow-lg bg-gradient-to-br ${stat.color} text-white`}>
          <h3 className="text-white/80 font-medium">{stat.title}</h3>
          <p className="text-4xl font-bold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  </div>
);

const PlaceholderView = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-slate-800 mb-6">{title}</h1>
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
      {title} feature is currently under construction.
    </div>
  </div>
);

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [schemas, setSchemas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sitepins/schema')
      .then(res => res.json())
      .then(data => {
        setSchemas(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (!isAuthenticated) {
    // ... authentication UI remains same ...
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-sm w-full border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              <span className="text-emerald-500">Site</span>Pins
            </h1>
            <p className="text-slate-500">Please authenticate to continue</p>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (password === 'admin') setIsAuthenticated(true);
              else alert('Incorrect password (hint: admin)');
            }}
          >
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-emerald-500/30"
            >
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-8">Loading schemas...</div>;

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar schemas={schemas} />
        <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/collections/:collection" element={<CollectionList />} />
            <Route path="/collections/:collection/:slug" element={<ContentEditor />} />
            <Route path="/collections/:collection/:slug/builder" element={<VisualEditor />} />
            <Route path="/media" element={<PlaceholderView title="Media Library" />} />
            <Route path="/emails" element={<PlaceholderView title="Email Campaigns" />} />
            <Route path="/settings" element={<PlaceholderView title="Site Settings" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
