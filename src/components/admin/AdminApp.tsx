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
  FolderOpen,
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  Check,
  Briefcase,
  MessageSquare,
  Calendar,
  File,
  PenTool,
  Book,
  Lightbulb,
  Video,
  Database,
  ClipboardList,
  Globe
} from 'lucide-react';
import CollectionList from './CollectionList';
import ContentEditor from './ContentEditor';
import VisualEditor from './VisualEditor';
import SettingsView from './SettingsView';
import MediaLibrary from './MediaLibrary';
import Dashboard from './Dashboard';
import { ChevronDown, ChevronRight } from 'lucide-react';

const getIconForSchema = (name: string) => {
  switch (name.toLowerCase()) {
    case 'case studies': return <Briefcase size={20} className="min-w-[20px]" />;
    case 'comments': return <MessageSquare size={20} className="min-w-[20px]" />;
    case 'events': return <Calendar size={20} className="min-w-[20px]" />;
    case 'pages': return <Files size={20} className="min-w-[20px]" />;
    case 'posts': return <PenTool size={20} className="min-w-[20px]" />;
    case 'publications': return <Book size={20} className="min-w-[20px]" />;
    case 'solutions': return <Lightbulb size={20} className="min-w-[20px]" />;
    case 'webinar': return <Video size={20} className="min-w-[20px]" />;
    case 'entries': return <Database size={20} className="min-w-[20px]" />;
    case 'forms': return <ClipboardList size={20} className="min-w-[20px]" />;
    case 'global settings': return <Globe size={20} className="min-w-[20px]" />;
    default: return <FolderOpen size={20} className="min-w-[20px]" />;
  }
};

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
        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 capitalize ${isActive && !currentGroup ? 'bg-[#0066FF]/10 text-[#0066FF] font-medium' : 'hover:bg-slate-50 text-slate-600 hover:text-[#0066FF]'}`}
        title={schema.label || schema.name}
      >
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex-shrink-0 flex items-center justify-center w-6">
            {getIconForSchema(schema.label || schema.name)}
          </div>
          <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300">
            {schema.label || schema.name}
          </span>
        </div>
        {schema.groups && schema.groups.length > 0 && (
          <button 
            onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
            className="p-1 hover:bg-slate-200 rounded opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
      </Link>
      
      {schema.groups && schema.groups.length > 0 && isOpen && (
        <div className="ml-8 mt-1 space-y-1 border-l border-slate-200 pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {schema.groups.map((group: string) => (
            <Link
              key={group}
              to={`/collections/${schema.name}?group=${group}`}
              className={`block px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${currentGroup === group ? 'text-[#0066FF] font-medium bg-[#0066FF]/5' : 'text-slate-500 hover:text-[#0066FF] hover:bg-slate-50'}`}
            >
              {group}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ schemas, siteLogo, onLogout, onHoverChange }: { schemas: any[], siteLogo?: string, onLogout?: () => void, onHoverChange?: (hovered: boolean) => void }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const preferredOrder = ['Case Studies', 'Comments', 'Events', 'Pages', 'Posts', 'Publications', 'Solutions', 'Webinar'];
  
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
    <div 
      className="w-24 hover:w-56 group bg-white/80 backdrop-blur-md border-r border-slate-200/50 text-slate-600 h-screen flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] fixed top-0 left-0 z-50 transition-all duration-300 overflow-hidden hover:shadow-2xl"
      onMouseEnter={() => onHoverChange && onHoverChange(true)}
      onMouseLeave={() => onHoverChange && onHoverChange(false)}
    >
      <div className="h-16 flex items-center px-4 border-b border-slate-200/50 flex-shrink-0 overflow-hidden">
        <Link to="/" className="flex items-center w-full h-full" title="Dashboard">
          {siteLogo ? (
            <img src={siteLogo} alt="Site Logo" className="h-8 w-auto max-w-[200px] object-contain flex-shrink-0" />
          ) : (
            <img src="/growlity-logo.png" alt="Growlity" className="h-8 w-auto max-w-[200px] object-contain flex-shrink-0" />
          )}
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 custom-scrollbar">
        <nav className="space-y-1 px-3 mb-6">
          <Link
            to="/"
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive('/') && location.pathname === '/' ? 'bg-gradient-to-r from-[#0066FF]/10 to-transparent text-[#0066FF] font-medium border-l-2 border-[#0066FF]' : 'hover:bg-slate-50/80 text-slate-600 hover:text-[#0066FF] border-l-2 border-transparent'
            }`}
            title="Dashboard"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-6"><LayoutDashboard size={20} /></div>
            <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">Dashboard</span>
          </Link>
        </nav>

        <nav className="space-y-1 px-3 mb-6">
          {primarySchemas.map((schema) => (
            <CollectionNavItem key={schema.name} schema={schema} />
          ))}
        </nav>

        {otherSchemas.length > 0 && (
          <nav className="space-y-1 px-3 mb-6">
            {otherSchemas.map((schema) => (
              <CollectionNavItem key={schema.name} schema={schema} />
            ))}
          </nav>
        )}

        <nav className="space-y-1 px-3">
          {staticNavItems.slice(1).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              title={item.name}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-[#0066FF]/10 to-transparent text-[#0066FF] font-medium border-l-2 border-[#0066FF]'
                  : 'hover:bg-slate-50/80 text-slate-600 hover:text-[#0066FF] border-l-2 border-transparent'
              }`}
            >
              <div className="flex-shrink-0 flex items-center justify-center w-6">{item.icon}</div>
              <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-200/50">
        <button 
          onClick={onLogout}
          className="flex items-center gap-4 px-4 py-3 w-full rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Logout"
        >
          <div className="flex-shrink-0 flex items-center justify-center w-6"><LogOut size={20} /></div>
          <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};


const PlaceholderView = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-slate-800 mb-6">{title}</h1>
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
      {title} feature is currently under construction.
    </div>
  </div>
);

const AdminLayout = ({ schemas, siteLogo, setIsAuthenticated }: any) => {
  const location = useLocation();
  const isEditorRoute = location.pathname.match(/^\/collections\/[^\/]+\/[^\/]+/) && !location.pathname.endsWith('/builder');
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {!isEditorRoute && (
        <Sidebar schemas={schemas} siteLogo={siteLogo} onLogout={() => setIsAuthenticated(false)} onHoverChange={setIsSidebarHovered} />
      )}
      <main className={`flex-1 overflow-x-hidden transition-all duration-300 ${!isEditorRoute ? (isSidebarHovered ? 'ml-56' : 'ml-24') : ''}`}>
        <Routes>
          <Route path="/" element={<Dashboard schemas={schemas} />} />
          <Route path="/collections/:collection" element={<CollectionList />} />
          <Route path="/collections/:collection/:slug" element={<ContentEditor />} />
          <Route path="/collections/:collection/:slug/builder" element={<VisualEditor />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="/emails" element={<PlaceholderView title="Email Campaigns" />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </main>
    </div>
  );
};

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

    fetch('/api/sitepins/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.siteLogo) {
          setSiteLogo(data.siteLogo);
        }
      })
      .catch(console.error);

    const handleSettingsUpdate = (e: any) => {
      if (e.detail && typeof e.detail.siteLogo !== 'undefined') {
        setSiteLogo(e.detail.siteLogo);
      }
    };
    
    window.addEventListener('settings-updated', handleSettingsUpdate as EventListener);
    return () => window.removeEventListener('settings-updated', handleSettingsUpdate as EventListener);
  }, []);

  const blobStyles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  `;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
        <style>{blobStyles}</style>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0066FF] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-[#00C853] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>

        <div className="bg-white/80 backdrop-blur-2xl p-10 sm:p-12 rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] max-w-md w-full border border-white relative z-10 mx-4 overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0066FF] to-[#00C853]"></div>
          
          <div className="mb-8 text-center">
            {siteLogo ? (
              <img src={siteLogo} alt="Site Logo" className="h-12 mx-auto w-auto object-contain mb-6 drop-shadow-sm" />
            ) : (
              <img src="/growlity-logo.png" alt="Growlity Logo" className="h-12 mx-auto w-auto object-contain mb-6 drop-shadow-sm" />
            )}
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">Welcome to Growlity</h1>
            <p className="text-slate-500 text-sm">Sign in to your enterprise command center</p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (password === 'Growlity@Admin2026') setIsAuthenticated(true);
              else alert('Incorrect password (hint: Growlity@Admin2026)');
            }}
          >
            <div className="space-y-5 mb-6">
              <div className="relative">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address or Username</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] outline-none transition-all text-slate-800 font-medium group-hover:border-blue-200/50"
                    placeholder="admin@growlity.com"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Admin Password</label>
                  <a href="#" className="text-xs font-medium text-[#0066FF] hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] outline-none transition-all text-slate-800 font-medium group-hover:border-blue-200/50"
                    placeholder="Enter your password..."
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center gap-2 cursor-pointer group/cb" onClick={() => setRememberMe(!rememberMe)}>
                <div className={`relative flex items-center justify-center w-5 h-5 rounded border transition-colors ${rememberMe ? 'bg-[#0066FF] border-[#0066FF]' : 'bg-white border-slate-300 group-hover/cb:border-[#0066FF]'}`}>
                  {rememberMe && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-sm font-medium text-slate-600 select-none">Remember me for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              className="relative overflow-hidden w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-4 rounded-xl transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)] hover:-translate-y-1 flex justify-center items-center gap-2 group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative z-10 flex items-center gap-2">Secure Login <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" /></span>
              <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1.5 rounded-full">
              <ShieldCheck size={14} /> Secured by 256-bit SSL Encryption
            </div>
            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              Protected by reCAPTCHA and subject to the Google Privacy Policy and Terms of Service.<br/>
              Your IP address is being logged for security purposes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-8">Loading schemas...</div>;

  return (
    <Router>
      <AdminLayout schemas={schemas} siteLogo={siteLogo} setIsAuthenticated={setIsAuthenticated} />
    </Router>
  );
}
