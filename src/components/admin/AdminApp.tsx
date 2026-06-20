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
import SettingsView from './SettingsView';
import { ChevronDown, ChevronRight } from 'lucide-react';

const CollectionNavItem = ({ schema }: { schema: any }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = location.pathname.startsWith(`/collections/${schema.name}`);
  const searchParams = new URLSearchParams(location.search);
  const currentGroup = searchParams.get('group');

  useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);

  return (
    <div className="space-y-1">
      <Link
        to={`/collections/${schema.name}`}
        className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 capitalize ${isActive && !currentGroup ? 'bg-emerald-500/10 text-emerald-400 font-medium' : 'hover:bg-slate-800 hover:text-white'}`}
      >
        <div className="flex items-center gap-3">
          <FolderOpen size={20} />
          {schema.name}
        </div>
        {schema.groups && schema.groups.length > 0 && (
          <button 
            onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
            className="p-1 hover:bg-slate-700 rounded"
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
      </Link>
      
      {schema.groups && schema.groups.length > 0 && isOpen && (
        <div className="ml-6 mt-1 space-y-1 border-l border-slate-700 pl-2">
          {schema.groups.map((group: string) => (
            <Link
              key={group}
              to={`/collections/${schema.name}?group=${group}`}
              className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${currentGroup === group ? 'text-emerald-400 font-medium bg-emerald-500/5' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              {group}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ schemas }: { schemas: any[] }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  const [siteLogo, setSiteLogo] = React.useState<string>("");

  React.useEffect(() => {
    fetch('/api/sitepins/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.siteLogo) {
          setSiteLogo(data.siteLogo);
        }
      })
      .catch(console.error);
  }, []);

  const staticNavItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Media', path: '/media', icon: <ImageIcon size={20} /> },
    { name: 'Emails', path: '/emails', icon: <Mail size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col shadow-2xl sticky top-0 left-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        {siteLogo ? (
          <img src={siteLogo} alt="Site Logo" className="h-8 max-w-full object-contain" />
        ) : (
          <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
            <span className="text-emerald-400">Site</span>Pins
          </h1>
        )}
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
            <CollectionNavItem key={schema.name} schema={schema} />
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
    <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to SitePins</h1>
    <p className="text-slate-500 mb-8">Select a collection from the sidebar to start managing your content.</p>
    
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <LayoutDashboard size={32} />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">Your Dashboard is Ready</h2>
      <p className="text-slate-500 max-w-md mx-auto">
        You can now easily create pages, write blog posts, and use the Bricks-style visual editor to design your site.
      </p>
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
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
