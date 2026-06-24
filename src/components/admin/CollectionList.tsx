import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, FileText } from 'lucide-react';

export default function CollectionList() {
  const { collection } = useParams();
  const location = useLocation();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const group = searchParams.get('group');

  useEffect(() => {
    fetch(`/api/sitepins/content?collection=${collection}`)
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, [collection]);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    await fetch(`/api/sitepins/content?collection=${collection}&slug=${encodeURIComponent(slug)}`, { method: 'DELETE' });
    setItems(items.filter(i => i.slug !== slug));
  };

  if (loading) return <div className="p-8">Loading...</div>;

  const filteredItems = items.filter(item => {
    if (group && !item.slug.startsWith(`${group}/`)) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const titleMatch = item.data?.title?.toLowerCase().includes(term);
      const slugMatch = item.slug.toLowerCase().includes(term);
      if (!titleMatch && !slugMatch) return false;
    }
    return true;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 capitalize">
          {collection} {group && <span className="text-[#0066FF] font-medium">/ {group}</span>}
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0066FF] outline-none text-sm w-64 shadow-sm"
            />
          </div>
          <Link 
            to={`/collections/${collection}/new${group ? `?group=${group}` : ''}`}
            className="flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00C853] hover:from-[#0052CC] hover:to-[#00A844] text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
          >
            <Plus size={20} />
            Create New
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-12 text-center text-slate-500">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-slate-400" />
            </div>
            <p className="text-lg font-medium text-slate-800 mb-2">No items found</p>
            <p>Create your first one to get started!</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div 
              key={item.slug} 
              className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,102,255,0.08)] hover:border-[#0066FF]/30 transition-all duration-300 group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0066FF]/10 to-[#00C853]/10 text-[#0066FF] flex flex-shrink-0 items-center justify-center font-bold text-lg border border-[#0066FF]/10 group-hover:scale-105 transition-transform">
                  {(item.data?.title || item.slug).charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-[#0066FF] transition-colors truncate">
                    {item.data?.title || item.slug}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                    <FileText size={14} className="flex-shrink-0" />
                    <span className="truncate">{item.file}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity justify-end">
                <Link 
                  to={`/collections/${collection}/${encodeURIComponent(item.slug)}`}
                  className="p-2.5 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-xl transition-colors shadow-sm"
                  title="Edit"
                >
                  <Edit size={18} />
                </Link>
                <button 
                  onClick={() => handleDelete(item.slug)}
                  className="p-2.5 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-xl transition-colors shadow-sm"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
