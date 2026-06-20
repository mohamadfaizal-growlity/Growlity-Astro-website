import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

export default function ContentEditor() {
  const { collection } = useParams();
  let { slug } = useParams();
  if (slug) slug = decodeURIComponent(slug);
  const navigate = useNavigate();
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
    const targetSlug = isNew ? (data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'new-post') : slug;
    
    await fetch('/api/sitepins/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection, slug: targetSlug, data, content })
    });
    
    navigate(`/collections/${collection}`);
  };

  const updateField = (path: string, value: any) => {
    setData((prev: any) => ({ ...prev, [path]: value }));
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 pb-32">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-800">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">
            {isNew ? 'Create New' : 'Edit'} {collection}
          </h1>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-500/30"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-slate-800 border-b pb-2">Fields</h2>
            {schema?.template?.map((field: any) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">{field.label}</label>
                {field.type === 'string' && (
                  <input
                    type="text"
                    value={data[field.name] || ''}
                    onChange={(e) => updateField(field.name, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                )}
                {field.type === 'object' && (
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                    {field.fields?.map((subField: any) => (
                      <div key={subField.name}>
                        <label className="block text-xs font-medium text-slate-500 mb-1">{subField.label}</label>
                        <input
                          type="text"
                          value={data[field.name]?.[subField.name] || ''}
                          onChange={(e) => {
                            const newObj = { ...(data[field.name] || {}) };
                            newObj[subField.name] = e.target.value;
                            updateField(field.name, newObj);
                          }}
                          className="w-full px-3 py-1.5 rounded border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 border-b pb-2">Publish Settings</h2>
            <div className="text-sm text-slate-600">
              <p>Status: <span className="text-emerald-500 font-medium">Draft</span></p>
            </div>
            <button 
              onClick={() => navigate(`/collections/${collection}/${encodeURIComponent(slug || '')}/builder`)}
              className="w-full mt-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 py-2 rounded-lg font-medium transition-colors"
            >
              Open Bricks Visual Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
