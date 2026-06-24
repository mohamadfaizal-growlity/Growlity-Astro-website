import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

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

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
              <th className="px-6 py-4 font-medium">Title/Slug</th>
              <th className="px-6 py-4 font-medium">File</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                  No items found. Create your first one!
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.slug} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {item.data?.title || item.slug}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {item.file}
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <Link 
                      to={`/collections/${collection}/${encodeURIComponent(item.slug)}`}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.slug)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
