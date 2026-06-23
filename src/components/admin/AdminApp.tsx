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
        className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 capitalize ${isActive && !currentGroup ? 'bg-[#0066FF]/10 text-[#0066FF] font-medium' : 'hover:bg-slate-50 text-slate-600 hover:text-[#0066FF]'}`}
      >
        <div className="flex items-center gap-3">
          <FolderOpen size={20} />
          {schema.label || schema.name}
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
        <div className="ml-6 mt-1 space-y-1 border-l border-slate-200 pl-2">
          {schema.groups.map((group: string) => (
            <Link
              key={group}
              to={`/collections/${schema.name}?group=${group}`}
              className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${currentGroup === group ? 'text-[#0066FF] font-medium bg-[#0066FF]/5' : 'text-slate-500 hover:text-[#0066FF] hover:bg-slate-50'}`}
            >
              {group}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ schemas, siteLogo, onLogout }: { schemas: any[], siteLogo?: string, onLogout?: () => void }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const preferredOrder = ['blogs', 'pages', 'caseStudies', 'events', 'publications', 'services', 'webinars'];
  
  const primarySchemas = schemas.filter(s => preferredOrder.includes(s.name))
    .sort((a, b) => preferredOrder.indexOf(a.name) - preferredOrder.indexOf(b.name));
    
  const otherSchemas = schemas.filter(s => !preferredOrder.includes(s.name))
    .sort((a, b) => a.name.localeCompare(b.name));


  const staticNavItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Media', path: '/media', icon: <ImageIcon size={20} /> },
    { name: 'Emails', path: '/emails', icon: <Mail size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 text-slate-600 h-screen flex flex-col shadow-sm sticky top-0 left-0 z-50">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-white/95 backdrop-blur">
        {siteLogo ? (
          <img src={siteLogo} alt="Site Logo" className="h-8 max-w-full object-contain" />
        ) : (
          <img src="/growlity-logo.png" alt="Growlity Logo" className="h-8 max-w-full object-contain" />
        )}
      </div>
      <div className="flex-1 overflow-y-auto py-6">
        <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Core</div>
        <nav className="space-y-1 px-3 mb-6">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              isActive('/') && location.pathname === '/' ? 'bg-[#0066FF]/10 text-[#0066FF] font-medium' : 'hover:bg-slate-50 text-slate-600 hover:text-[#0066FF]'
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
        </nav>

        <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Content</div>
        <nav className="space-y-1 px-3 mb-6">
          {primarySchemas.map((schema) => (
            <CollectionNavItem key={schema.name} schema={schema} />
          ))}
        </nav>

        {otherSchemas.length > 0 && (
          <>
            <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Other Collections</div>
            <nav className="space-y-1 px-3 mb-6">
              {otherSchemas.map((schema) => (
                <CollectionNavItem key={schema.name} schema={schema} />
              ))}
            </nav>
          </>
        )}

        <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">System</div>
        <nav className="space-y-1 px-3">
          {staticNavItems.slice(1).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-[#0066FF]/10 text-[#0066FF] font-medium'
                  : 'hover:bg-slate-50 text-slate-600 hover:text-[#0066FF]'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-200">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-600 hover:bg-slate-50 hover:text-[#0066FF] transition-colors text-left"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to Growlity Admin</h1>
    <p className="text-slate-500 mb-8">Select a collection from the sidebar to start managing your content.</p>
    
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,102,255,0.08)] border border-slate-100 p-12 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0066FF] to-[#00C853]"></div>
      <div className="w-20 h-20 bg-[#0066FF]/10 text-[#0066FF] rounded-full flex items-center justify-center mx-auto mb-6">
        <LayoutDashboard size={40} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Your Dashboard is Ready</h2>
      <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed">
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
  const [siteLogo, setSiteLogo] = useState<string>("");

  useEffect(() => {
    fetch('/api/sitepins/schema')
      .then(res => res.json())
      .then(data => {
        setSchemas(Array.isArray(data) ? data : []);
        setLoading(false);
      });

    // Fetch initial settings for logo
    fetch('/api/sitepins/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.siteLogo) {
          setSiteLogo(data.siteLogo);
        }
      })
      .catch(console.error);

    // Listen for live updates from SettingsView
    const handleSettingsUpdate = (e: any) => {
      if (e.detail && typeof e.detail.siteLogo !== 'undefined') {
        setSiteLogo(e.detail.siteLogo);
      }
    };
    
    window.addEventListener('settings-updated', handleSettingsUpdate as EventListener);
    return () => window.removeEventListener('settings-updated', handleSettingsUpdate as EventListener);
  }, []);

  if (!isAuthenticated) {
    // ... authentication UI remains same ...
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-md w-full border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0066FF] to-[#00C853]"></div>
            <div className="mb-8">
              {siteLogo ? (
                <img src={siteLogo} alt="Site Logo" className="h-10 mx-auto w-auto object-contain mb-4" />
              ) : (
                <img src="/growlity-logo.png" alt="Growlity Logo" className="h-10 mx-auto w-auto object-contain mb-4" />
              )}
            </div>
            <div className="text-center mb-8">
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
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] outline-none transition-all"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0066FF] to-[#00C853] hover:from-[#0052CC] hover:to-[#00A844] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-500/30"
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
        <Sidebar schemas={schemas} siteLogo={siteLogo} onLogout={() => setIsAuthenticated(false)} />
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
