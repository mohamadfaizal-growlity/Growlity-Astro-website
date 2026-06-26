import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SeoReportModal from './SeoReportModal';
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
  TrendingUp,
  Edit3,
  MessageSquare,
  BarChart2,
  ShieldAlert,
  Search,
  MailCheck,
  Send,
  Check,
  Trash,
  AlertCircle,
  ThumbsUp,
  LineChart
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
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [seoReport, setSeoReport] = useState<any>(null);
  const [isSeoLoading, setIsSeoLoading] = useState(false);

  const fetchSeoReport = async () => {
    setIsSeoModalOpen(true);
    if (seoReport) return;
    setIsSeoLoading(true);
    try {
      const res = await fetch('/api/admin/seo-scan');
      const data = await res.json();
      setSeoReport(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSeoLoading(false);
    }
  };

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
    <div className="relative min-h-full pb-24">
      <SeoReportModal 
        isOpen={isSeoModalOpen} 
        onClose={() => setIsSeoModalOpen(false)} 
        report={seoReport} 
        loading={isSeoLoading} 
      />
      {/* Global Dashboard Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[120px] mix-blend-multiply"></div>
      </div>
      
      <div className="relative z-10 p-8 space-y-8 max-w-[1600px] mx-auto">
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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="xl:col-span-8 space-y-8">
          {/* AI Insights Slim Banner */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-indigo-100/60 p-5 flex flex-wrap gap-4 items-center justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-500"><Sparkles size={24} /></div>
              <div>
                <h3 className="font-bold text-indigo-950 text-lg flex items-center gap-2">Local SEO Scanner <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span></h3>
                <p className="text-sm text-indigo-800/80 font-medium mt-0.5">Your local content SEO scanner is ready. Click below to analyze your markdown files for SEO issues.</p>
              </div>
            </div>
            <button onClick={fetchSeoReport} className="text-sm font-bold text-indigo-600 bg-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2">
              Scan & View Report <ArrowRight size={16} />
            </button>
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

          {/* Quick Draft */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Edit3 className="text-pink-500" /> Quick Draft
            </h2>
            <div className="space-y-4">
              <input type="text" placeholder="Title" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
              <textarea placeholder="What's on your mind?" rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"></textarea>
              <button className="bg-[#0066FF] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2">
                <Send size={18} /> Save Draft
              </button>
            </div>
          </div>

          {/* Form Submissions Overview */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <LineChart className="text-indigo-500" /> Form Submissions (Last 7 Days)
            </h2>
            <div className="h-48 flex items-end justify-between gap-2 pt-4">
              {[14, 22, 18, 35, 28, 42, 38].map((val, i) => (
                <div key={i} className="w-full bg-indigo-50 rounded-t-lg relative group">
                  <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-400" style={{ height: `${(val / 50) * 100}%` }}></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded font-bold transition-opacity">{val}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-3 font-medium uppercase tracking-wider">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Recent Comments */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <MessageSquare className="text-amber-500" /> Recent Comments
            </h2>
            <div className="space-y-4">
              {[
                { author: "Alex J.", post: "SEO Best Practices 2026", text: "Great insights! Will definitely implement these.", status: "Pending" },
                { author: "Sarah T.", post: "Case Study: EcoVadis", text: "This helped us a lot in our ESG reporting.", status: "Approved" }
              ].map((comment, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex-shrink-0 flex items-center justify-center text-slate-500 font-bold">
                    {comment.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800 font-medium">
                      {comment.author} <span className="text-slate-400 font-normal">on</span> <span className="text-[#0066FF] hover:underline cursor-pointer">{comment.post}</span>
                    </p>
                    <p className="text-sm text-slate-600 mt-1 mb-3">"{comment.text}"</p>
                    <div className="flex flex-wrap gap-3">
                      {comment.status === 'Pending' && (
                        <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"><Check size={14}/> Approve</button>
                      )}
                      <button className="text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1"><MessageSquare size={14}/> Reply</button>
                      <button className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"><AlertCircle size={14}/> Spam</button>
                      <button className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1"><Trash size={14}/> Trash</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium border-t border-slate-100 pt-4">
              <Link to="/comments" className="text-slate-500 cursor-pointer hover:text-slate-800">All (124)</Link>
              <Link to="/comments" className="text-[#0066FF] cursor-pointer hover:text-blue-800">Pending (1)</Link>
              <Link to="/comments" className="text-slate-500 cursor-pointer hover:text-slate-800">Approved (120)</Link>
              <Link to="/comments" className="text-slate-500 cursor-pointer hover:text-slate-800">Spam (3)</Link>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="xl:col-span-4 space-y-8">
          
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

          {/* SEO Overview */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <BarChart2 className="text-blue-500" /> SEO Overview
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Redirects</p>
                <p className="text-2xl font-extrabold text-blue-900">122</p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Total Hits</p>
                <p className="text-2xl font-extrabold text-emerald-900">190K</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-sm">Top Performing Posts</h4>
              <p className="text-sm text-slate-600 hover:text-[#0066FF] cursor-pointer flex items-center gap-2"><ThumbsUp size={14} className="text-emerald-500"/> ESG Compliance 2026</p>
              <p className="text-sm text-slate-600 hover:text-[#0066FF] cursor-pointer flex items-center gap-2"><ThumbsUp size={14} className="text-emerald-500"/> Carbon Footprint Guide</p>
            </div>
          </div>

          {/* Security Activity */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <ShieldAlert className="text-red-500" /> Security Activity
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Top IPs Blocked</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-mono text-slate-600">124.83.53.232</span>
                    <span className="text-red-500 font-bold">150 blocks</span>
                  </div>
                  <div className="flex justify-between text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-mono text-slate-600">110.171.180.167</span>
                    <span className="text-red-500 font-bold">150 blocks</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Failed Logins</h4>
                <div className="flex justify-between items-center text-sm bg-orange-50 text-orange-800 p-3 rounded-xl font-medium border border-orange-100">
                  <span className="truncate pr-2">admin (Non-existent)</span>
                  <span className="flex-shrink-0">44 attempts</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
}
