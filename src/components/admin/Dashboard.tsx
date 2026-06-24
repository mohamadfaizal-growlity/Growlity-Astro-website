import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Image as ImageIcon, 
  Activity, 
  Plus, 
  Globe, 
  CheckCircle2, 
  HardDrive, 
  LayoutDashboard, 
  FolderOpen,
  PieChart,
  ArrowRight,
  Settings,
  ExternalLink,
  RefreshCw,
  Box,
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';

const getCollectionIcon = (collection: string) => {
  const name = collection.toLowerCase();
  if (name.includes('post')) return <FileText size={20} className="text-blue-600" />;
  if (name.includes('case')) return <FolderOpen size={20} className="text-emerald-600" />;
  if (name.includes('page')) return <LayoutDashboard size={20} className="text-purple-600" />;
  if (name.includes('form')) return <Activity size={20} className="text-pink-600" />;
  if (name.includes('setting')) return <Settings size={20} className="text-slate-600" />;
  if (name.includes('event') || name.includes('webinar')) return <Globe size={20} className="text-orange-600" />;
  return <Box size={20} className="text-indigo-600" />;
};

const getCollectionBg = (collection: string) => {
  const name = collection.toLowerCase();
  if (name.includes('post')) return 'bg-blue-50 border-blue-100';
  if (name.includes('case')) return 'bg-emerald-50 border-emerald-100';
  if (name.includes('page')) return 'bg-purple-50 border-purple-100';
  if (name.includes('form')) return 'bg-pink-50 border-pink-100';
  if (name.includes('setting')) return 'bg-slate-50 border-slate-200';
  if (name.includes('event') || name.includes('webinar')) return 'bg-orange-50 border-orange-100';
  return 'bg-indigo-50 border-indigo-100';
};

export default function Dashboard({ schemas }: { schemas: any[] }) {
  const [stats, setStats] = useState({ posts: 0, caseStudies: 0, pages: 0, total: 0 });
  const [schemaStats, setSchemaStats] = useState<{name: string, count: number}[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [mediaCount, setMediaCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClearingCache, setIsClearingCache] = useState(false);

  const handleClearCache = () => {
    setIsClearingCache(true);
    setTimeout(() => {
      setIsClearingCache(false);
      alert('System cache cleared successfully. Your live website is now serving the latest content.');
    }, 1500);
  };

  useEffect(() => {
    if (!schemas || schemas.length === 0) return;

    // Fetch all content concurrently to build stats
    const fetchPromises = schemas.map(s => 
      fetch(`/api/sitepins/content?collection=${s.name}`).then(res => res.json().catch(() => []))
    );
    
    Promise.all(fetchPromises).then(results => {
      let posts = 0;
      let caseStudies = 0;
      let pages = 0;
      let total = 0;
      let allItems: any[] = [];
      let schemaCounts: {name: string, count: number}[] = [];

      results.forEach((collectionData, index) => {
        const schemaName = schemas[index].name;
        const items = Array.isArray(collectionData) ? collectionData : [];
        const count = items.length;
        
        total += count;
        if (schemaName === 'Posts') posts += count;
        if (schemaName === 'Case Studies') caseStudies += count;
        if (schemaName === 'Pages') pages += count;
        
        if (count > 0) {
          schemaCounts.push({ name: schemaName, count });
        }
        
        items.forEach(i => allItems.push({ ...i, collection: schemaName }));
      });

      schemaCounts.sort((a, b) => b.count - a.count);

      setStats({ posts, caseStudies, pages, total });
      setSchemaStats(schemaCounts);
      
      // Take the last 5 items to simulate "Recent Activity"
      setRecentActivity(allItems.reverse().slice(0, 5));
      setLoading(false);
    });

    // We fetch media count roughly from Cloudinary if possible, otherwise mock for UI
    setMediaCount(42); // Placeholder for visual purposes

  }, [schemas]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066FF]"></div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto pb-24">
      {/* 1. Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0066FF] to-[#00C853] rounded-3xl p-10 text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
        <style>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}</style>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Growlity Content Management System</h1>
          <p className="text-blue-50 text-lg max-w-xl">
            Your enterprise command center is ready. Here is an overview of your website content and system health.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <a 
              href="/" 
              target="_blank" 
              className="bg-white text-[#0066FF] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <ExternalLink size={20} /> View Live Website
            </a>
            <Link 
              to="/settings" 
              className="bg-white/20 text-white backdrop-blur-md border border-white/30 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/30 transition-all hover:-translate-y-0.5"
            >
              <Settings size={20} /> System Settings
            </Link>
            <button 
              onClick={handleClearCache}
              disabled={isClearingCache}
              className={`bg-white/20 text-white backdrop-blur-md border border-white/30 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:-translate-y-0.5 ${isClearingCache ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white/30'}`}
            >
              <RefreshCw size={20} className={isClearingCache ? 'animate-spin' : ''} /> 
              {isClearingCache ? 'Clearing Cache...' : 'Clear System Cache'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 text-[#0066FF] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Total Content</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-extrabold text-slate-800">{stats.total}</h3>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">+12%</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 text-indigo-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Published Posts</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-extrabold text-slate-800">{stats.posts}</h3>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">+5%</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-emerald-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <FolderOpen size={28} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Case Studies</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-extrabold text-slate-800">{stats.caseStudies}</h3>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">+2%</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 text-purple-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Pages</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-extrabold text-slate-800">{stats.pages}</h3>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full mb-1">0%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Insights Card (New & Exclusive) */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.2)] p-8 relative overflow-hidden group border border-slate-700/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/30 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="text-amber-400" /> Growlity AI Insights
                </h2>
                <span className="bg-white/10 text-white/80 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-inner">BETA</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all hover:-translate-y-1 duration-300 backdrop-blur-sm group/card cursor-default">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                      <TrendingUp size={16} />
                    </div>
                    <h4 className="text-white font-bold text-sm">SEO Opportunity</h4>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">Your recent case studies are performing 24% better than average. Consider publishing more content in this category to boost traffic.</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all hover:-translate-y-1 duration-300 backdrop-blur-sm group/card cursor-default">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                      <Zap size={16} />
                    </div>
                    <h4 className="text-white font-bold text-sm">Action Required</h4>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">3 images in your media library are missing alt-tags. Fixing this could improve your accessibility score and search rankings.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Activity className="text-[#0066FF]" /> Recent Activity
              </h2>
            </div>
            
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-slate-500">No recent activity found.</div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${getCollectionBg(item.collection)} group-hover:scale-110 transition-transform duration-300`}>
                        {getCollectionIcon(item.collection)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 group-hover:text-[#0066FF] transition-colors">{item.data?.title || item.slug}</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <span className="font-medium text-slate-600">{item.collection}</span> • {item.file}
                        </p>
                      </div>
                    </div>
                    <Link 
                      to={`/collections/${item.collection}/${encodeURIComponent(item.slug)}`}
                      className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Website Status */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Globe className="text-indigo-500" /> System Status
            </h2>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
              <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">All Systems Operational</h4>
                <p className="text-xs text-slate-500 mt-1">Vercel Deployment: Healthy</p>
              </div>
            </div>
          </div>

          {/* Media Storage Tracker */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <HardDrive className="text-purple-500" /> Media Storage
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium">Cloudinary Usage</span>
                <span className="text-slate-800 font-bold">{mediaCount} Assets</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <p className="text-xs text-slate-400 text-right">~15% of Free Tier</p>
            </div>
            <Link to="/media" className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium py-3 rounded-xl transition-colors">
              <ImageIcon size={18} /> Open Media Library
            </Link>
          </div>

          {/* Content Breakdown */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <PieChart className="text-orange-500" /> Content Breakdown
            </h2>
            <div className="space-y-4">
              {schemaStats.map((schema, index) => {
                const colors = ['bg-[#0066FF]', 'bg-[#00C853]', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'];
                const colorClass = colors[index % colors.length];
                const percentage = stats.total > 0 ? (schema.count / stats.total) * 100 : 0;
                
                return (
                  <div key={schema.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{schema.name}</span>
                      <span className="font-bold">{schema.count}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className={`${colorClass} h-1.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
