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
  ArrowRight
} from 'lucide-react';

export default function Dashboard({ schemas }: { schemas: any[] }) {
  const [stats, setStats] = useState({ posts: 0, caseStudies: 0, pages: 0, total: 0 });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [mediaCount, setMediaCount] = useState(0);
  const [loading, setLoading] = useState(true);

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

      results.forEach((collectionData, index) => {
        const schemaName = schemas[index].name;
        const items = Array.isArray(collectionData) ? collectionData : [];
        total += items.length;
        if (schemaName === 'Posts') posts += items.length;
        if (schemaName === 'Case Studies') caseStudies += items.length;
        if (schemaName === 'Pages') pages += items.length;
        
        items.forEach(i => allItems.push({ ...i, collection: schemaName }));
      });

      setStats({ posts, caseStudies, pages, total });
      
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white p-2 rounded-xl">
              <img src="/growlity-logo.png" alt="Growlity" className="h-6 w-auto" />
            </div>
            <span className="font-semibold text-blue-50 tracking-wide uppercase text-sm">Command Center</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Welcome to Growlity CMS! 🚀</h1>
          <p className="text-blue-50 text-lg max-w-2xl">
            Empowering your ESG, Sustainability, and Business narratives. Manage your Case Studies, Publications, and EcoVadis updates right from this dashboard.
          </p>
          
          <div className="mt-8 flex gap-4">
            <Link to="/collections/Posts/new" className="bg-white text-[#0066FF] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all hover:-translate-y-0.5">
              <Plus size={20} /> Write New Post
            </Link>
            <Link to="/collections/Case Studies/new" className="bg-white/20 text-white backdrop-blur-md border border-white/30 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/30 transition-all hover:-translate-y-0.5">
              <FileText size={20} /> Publish Case Study
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Content</p>
            <h3 className="text-3xl font-bold text-slate-800">{stats.total}</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Published Posts</p>
            <h3 className="text-3xl font-bold text-slate-800">{stats.posts}</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <FolderOpen size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Case Studies</p>
            <h3 className="text-3xl font-bold text-slate-800">{stats.caseStudies}</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Pages</p>
            <h3 className="text-3xl font-bold text-slate-800">{stats.pages}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
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
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">
                        {item.collection.charAt(0)}
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
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Posts</span>
                  <span className="font-bold">{stats.posts}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${stats.total > 0 ? (stats.posts / stats.total) * 100 : 0}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Case Studies</span>
                  <span className="font-bold">{stats.caseStudies}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${stats.total > 0 ? (stats.caseStudies / stats.total) * 100 : 0}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Pages</span>
                  <span className="font-bold">{stats.pages}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${stats.total > 0 ? (stats.pages / stats.total) * 100 : 0}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* SEO & Growth Tips */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-indigo-100 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-500">
              <PieChart size={64} />
            </div>
            <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2 mb-3 relative z-10">
              💡 Growlity Growth Tip
            </h2>
            <p className="text-indigo-700 text-sm leading-relaxed relative z-10">
              <strong>Optimize your EcoVadis content:</strong> Make sure to use the RankMath SEO Analyzer when creating new Case Studies. Aim for a score of 80+ to rank higher on Google for ESG consulting keywords.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
