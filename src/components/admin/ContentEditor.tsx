import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import SeoAnalyzer from './SeoAnalyzer';export default function ContentEditor() {
  const { collection } = useParams();
  let { slug } = useParams();
  if (slug) slug = decodeURIComponent(slug);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const group = searchParams.get('group');
  
  const [schema, setSchema] = useState<any>(null);
  const [data, setData] = useState<any>({});
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const isNew = slug === 'new';

  useEffect(() => {
    // Fetch schema and content in parallel
    Promise.all([
      fetch('/api/sitepins/schema').then(res => res.json()),
      !isNew 
        ? fetch(`/api/sitepins/content?collection=${collection}`).then(res => res.json()) 
        : Promise.resolve([])
    ]).then(([schemas, items]) => {
      const currentSchema = schemas.find((s: any) => s.name === collection);
      setSchema(currentSchema);
      
      if (!isNew && items.length > 0) {
        const item = items.find((i: any) => i.slug === slug);
        if (item) {
          setData(item.data || {});
          setContent(item.content || ''); // Content is not currently returned by API, but placeholder
        }
      } else {
        // Init default data based on schema
        const initData: any = {};
        currentSchema?.template?.forEach((field: any) => {
          if (field.defaultValue) initData[field.name] = field.defaultValue;
        });
        setData(initData);
      }
      setLoading(false);
    });
  }, [collection, slug]);

  const handleSave = async () => {
    let targetSlug = slug;
    if (isNew) {
      targetSlug = data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'new-post';
      if (group) {
        targetSlug = `${group}/${targetSlug}`;
      }
    }
    
    await fetch('/api/sitepins/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection, slug: targetSlug, data, content })
    });
    
    navigate(`/collections/${collection}${group ? `?group=${group}` : ''}`);
  };

  const updateField = (path: string, value: any) => {
    setData((prev: any) => ({ ...prev, [path]: value }));
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 pb-32">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-800 transition-colors p-2 hover:bg-slate-50 rounded-xl">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">
            {isNew ? 'Create New' : 'Edit'} {collection}
          </h1>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00C853] hover:from-[#0052CC] hover:to-[#00A844] text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="space-y-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">Metadata & Fields</h2>
              {schema?.template?.map((field: any) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">{field.label}</label>
                  {field.type === 'string' && (
                    <input
                      type="text"
                      value={data[field.name] || ''}
                      onChange={(e) => updateField(field.name, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0066FF] outline-none transition-all shadow-sm"
                    />
                  )}
                  {field.type === 'object' && (
                    <div className="p-5 bg-slate-50/50 rounded-xl border border-slate-200 space-y-4">
                      {field.fields?.map((subField: any) => (
                        <div key={subField.name}>
                          <label className="block text-xs font-bold tracking-wide text-slate-500 mb-1 uppercase">{subField.label}</label>
                          <input
                            type="text"
                            value={data[field.name]?.[subField.name] || ''}
                            onChange={(e) => {
                              const newObj = { ...(data[field.name] || {}) };
                              newObj[subField.name] = e.target.value;
                              updateField(field.name, newObj);
                            }}
                            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0066FF] outline-none transition-all shadow-sm"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">Publish Settings</h2>
              <div className="text-sm text-slate-600 flex items-center justify-between bg-slate-50 p-4 rounded-xl">
                <span className="font-medium">Status</span>
                <span className="text-[#00C853] font-bold bg-[#00C853]/10 px-3 py-1 rounded-full">Draft</span>
              </div>
              <button 
                onClick={() => navigate(`/collections/${collection}/${encodeURIComponent(slug || '')}/builder`)}
                className="w-full mt-4 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 text-indigo-700 border border-indigo-200 py-3 rounded-xl font-bold transition-colors mb-6 shadow-sm flex items-center justify-center gap-2"
              >
                <span>✨</span> Open Bricks Visual Editor
              </button>
            </div>
            
            <SeoAnalyzer 
              title={data.title || ''}
              description={data.description || ''}
              slug={slug || ''}
              content={content || ''}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">Main Content</h2>
          <div data-color-mode="light" className="prose-editor mt-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || '')}
              height={700}
              className="w-full !border-none shadow-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
