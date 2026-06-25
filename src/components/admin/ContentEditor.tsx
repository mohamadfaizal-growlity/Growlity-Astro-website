import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, Sidebar as SidebarIcon, FileText, Activity } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';
import SeoAnalyzer from './SeoAnalyzer';

const MDXEditorComponent = lazy(() => import('./MDXEditorComponent'));

export default function ContentEditor() {
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
  const [isUploading, setIsUploading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'post' | 'seo'>('post');

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
          setContent(item.content || ''); 
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

  if (loading) return <div className="p-8">Loading editor...</div>;

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Top Toolbar */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors"
            title="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          
          <input 
            type="text" 
            value={data.title || ''} 
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Add title"
            className="text-lg sm:text-xl font-bold bg-transparent outline-none placeholder:text-slate-300 w-full max-w-lg"
          />
        </div>

        <div className="flex items-center gap-2">
          {isUploading && (
            <span className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mr-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Uploading
            </span>
          )}
          <button 
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className={`p-2 rounded-lg transition-colors ${isPanelOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
            title="Toggle Settings Panel"
          >
            <SidebarIcon size={20} />
          </button>
          <button 
            onClick={handleSave}
            className="ml-2 flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Save size={16} />
            {isNew ? 'Publish' : 'Update'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <ErrorBoundary>
              <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading block editor...</div>}>
                <MDXEditorComponent
                  markdown={content}
                  onChange={(val) => setContent(val || '')}
                  onUploadImage={async (file) => {
                    setIsUploading(true);
                    try {
                      const formData = new FormData();
                      formData.append('file', file);
                      const response = await fetch('/api/sitepins/upload', {
                        method: 'POST',
                        body: formData,
                      });
                      if (!response.ok) throw new Error('Upload failed');
                      const data = await response.json();
                      return data.url;
                    } catch (err) {
                      console.error('Error uploading image:', err);
                      return '';
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>

        {/* Right Panel */}
        {isPanelOpen && (
          <aside className="w-[350px] shrink-0 border-l border-slate-200 bg-white flex flex-col h-full z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
            <div className="flex border-b border-slate-200 p-1">
              <button 
                onClick={() => setActiveTab('post')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${activeTab === 'post' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <FileText size={14} /> Post
              </button>
              <button 
                onClick={() => setActiveTab('seo')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${activeTab === 'seo' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Activity size={14} /> SEO
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {activeTab === 'post' && (
                <div className="space-y-6">
                  {schema?.template?.map((field: any) => (
                    <div key={field.name} className="space-y-2 pb-4 border-b border-slate-100 last:border-0">
                      <label className="block text-sm font-semibold text-slate-800">{field.label}</label>
                      {field.type === 'string' && (
                        <input
                          type="text"
                          value={data[field.name] || ''}
                          onChange={(e) => updateField(field.name, e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0066FF] outline-none transition-all"
                        />
                      )}
                      {field.type === 'object' && (
                        <div className="space-y-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
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
                                className="w-full px-2 py-1.5 text-sm rounded border border-slate-300 focus:ring-1 focus:ring-[#0066FF] outline-none transition-all bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="-mx-5 -mt-5">
                  <SeoAnalyzer 
                    title={data.title || ''}
                    description={data.excerpt || data.description || ''}
                    slug={slug || ''}
                    content={content}
                  />
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
