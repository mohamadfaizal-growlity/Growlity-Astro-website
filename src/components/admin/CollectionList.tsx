import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, FileText, CheckCircle2, Circle, ExternalLink, ArrowRight } from 'lucide-react';

export default function CollectionList() {
  const { collection } = useParams();
  const location = useLocation();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(i => i.slug));
    }
  };

  const toggleSelect = (slug: string) => {
    if (selectedItems.includes(slug)) {
      setSelectedItems(selectedItems.filter(s => s !== slug));
    } else {
      setSelectedItems([...selectedItems, slug]);
    }
  };

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066FF]"></div>
    </div>
  );

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
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 capitalize tracking-tight flex items-center gap-3">
            {collection} {group && <span className="text-[#0066FF] font-medium opacity-80">/ {group}</span>}
            <span className="text-sm font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{filteredItems.length}</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage and organize your {collection} content</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0066FF] outline-none text-sm w-full md:w-64 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-shadow"
            />
          </div>
          <Link 
            to={`/collections/${collection}/new${group ? `?group=${group}` : ''}`}
            className="flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0040A8] text-white px-5 py-2.5 rounded-xl font-medium transition-all hover:-translate-y-0.5 shadow-md shadow-blue-500/20"
          >
            <Plus size={20} />
            Create New
          </Link>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 overflow-hidden">
        
        {/* Table Toolbar (Bulk Actions) */}
        <div className="flex items-center p-4 border-b border-slate-200 bg-slate-50/50">
          <select className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm mr-3 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Bulk Actions</option>
            <option>Publish</option>
            <option>Draft</option>
            <option>Delete</option>
          </select>
          <button className="border border-slate-300 px-4 py-1.5 text-sm rounded-lg bg-white hover:bg-slate-50 cursor-pointer font-medium text-slate-700 shadow-sm transition-colors">
            Apply
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-sm font-semibold uppercase tracking-wider">
                <th className="p-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-4 w-1/2">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm">
                      <FileText size={24} className="text-slate-400" />
                    </div>
                    <p className="text-lg font-bold text-slate-700 mb-1">No content found</p>
                    <p className="text-sm">Create your first post or adjust your search.</p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isDraft = item.data?.draft === true;
                  const date = item.data?.publishedDate || item.data?.pubDate || item.data?.date || 'N/A';
                  const isSelected = selectedItems.includes(item.slug);

                  return (
                    <tr 
                      key={item.slug} 
                      className={`border-b border-slate-100 hover:bg-blue-50/30 transition-colors group ${isSelected ? 'bg-blue-50/50' : 'bg-white'}`}
                    >
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                          checked={isSelected}
                          onChange={() => toggleSelect(item.slug)}
                        />
                      </td>
                      <td className="p-4">
                        <Link to={`/collections/${collection}/${encodeURIComponent(item.slug)}`} className="block">
                          <h3 className="font-bold text-slate-800 text-[15px] group-hover:text-[#0066FF] transition-colors mb-1 truncate max-w-xl">
                            {item.data?.title || item.slug}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                            <span className="truncate max-w-md">/{collection}/{item.slug}</span>
                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                          </div>
                        </Link>
                      </td>
                      <td className="p-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${isDraft ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}`}>
                          {isDraft ? <Circle size={10} className="fill-current" /> : <CheckCircle2 size={12} />}
                          {isDraft ? 'Draft' : 'Published'}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600 font-medium">
                        {date !== 'N/A' ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            to={`/collections/${collection}/${encodeURIComponent(item.slug)}`}
                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(item.slug)}
                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination / Footer */}
        {filteredItems.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-600">
            <div>Showing {filteredItems.length} items</div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
