import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, Sidebar as SidebarIcon, FileText, Activity, ChevronDown, Trash2, Image as ImageIcon, Settings } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'post' | 'block'>('post');
  
  // WordPress UI states
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isTagsOpen, setIsTagsOpen] = useState(true);
  const [isUnlistOpen, setIsUnlistOpen] = useState(true);
  const [isLinkSuggestionsOpen, setIsLinkSuggestionsOpen] = useState(true);

  // Tags auto-complete state
  const [tags, setTags] = useState<string[]>(['Blog']);
  const [tagInput, setTagInput] = useState('');
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const allAvailableTags = ['Blog', 'Ecovadis', 'Sustainability', 'Uncategorized', 'ESG', 'Reporting', 'Compliance', 'Events'];
  
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTagInput(val);
    if (val.trim()) {
       setTagSuggestions(allAvailableTags.filter(t => t.toLowerCase().includes(val.toLowerCase()) && !tags.includes(t)));
    } else {
       setTagSuggestions([]);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
       setTags([...tags, tag]);
    }
    setTagInput('');
    setTagSuggestions([]);
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

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

  // Mock word count
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Toolbar */}
      <header className="h-[60px] bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded transition-colors"
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
            className="text-[15px] font-medium bg-transparent outline-none placeholder:text-slate-400 w-full max-w-lg"
          />
        </div>

        <div className="flex items-center gap-2 text-sm">
          {isUploading && (
            <span className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mr-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Uploading
            </span>
          )}
          
          <button className="text-slate-600 font-medium px-3 py-1.5 hover:bg-slate-100 rounded transition-colors">
            Save draft
          </button>
          
          <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors" title="Preview">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </button>

          <div className="flex items-center border border-slate-200 rounded-md mx-1 overflow-hidden h-8">
             <button className="px-3 bg-white text-emerald-600 font-bold text-xs h-full flex items-center border-r border-slate-200 hover:bg-slate-50">90 / 100</button>
             <button className="px-3 bg-white text-pink-500 font-bold text-xs h-full flex items-center hover:bg-slate-50">0 / 100</button>
          </div>

          <button 
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className={`p-1.5 rounded transition-colors ${isPanelOpen ? 'bg-slate-800 text-white hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}
            title="Settings"
          >
            <Settings size={20} />
          </button>
          
          <button 
            onClick={handleSave}
            className="ml-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
          >
            {isNew ? 'Publish' : 'Update'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden bg-slate-50">
        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar border-r border-slate-200">
          <div className="max-w-[840px] mx-auto px-12 py-12">
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
          <aside className="w-[340px] shrink-0 bg-white flex flex-col h-full z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] border-l border-slate-200 text-sm">
            <div className="flex border-b border-slate-200 px-2 pt-2 gap-2">
              <button 
                onClick={() => setActiveTab('post')}
                className={`px-3 py-2 text-[13px] font-medium border-b-2 transition-colors ${activeTab === 'post' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Post
              </button>
              <button 
                onClick={() => setActiveTab('block')}
                className={`px-3 py-2 text-[13px] font-medium border-b-2 transition-colors ${activeTab === 'block' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Block
              </button>
              <div className="flex-1"></div>
              <button onClick={() => setIsPanelOpen(false)} className="p-2 text-slate-400 hover:text-slate-800">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-100">
              {activeTab === 'post' && (
                <>
                  {/* Summary Section */}
                  <div className="p-4 space-y-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                         <div className="mt-0.5 w-4 h-4 bg-slate-200 rounded-full flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                         </div>
                         <div className="text-[13px] font-medium text-slate-700 leading-tight pr-4">
                           {data.title || 'Add title...'}
                         </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-700">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                      </button>
                    </div>

                    <button className="w-full py-6 border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded text-[13px] font-medium text-slate-700 transition-colors">
                      Set featured image
                    </button>

                    <div className="text-[13px] text-slate-500 mt-2">
                       <a href="#" className="text-blue-600 hover:underline">Add an excerpt...</a>
                    </div>
                    
                    <div className="text-[13px] text-slate-500">
                       {wordCount} words, {readTime} minutes read time.<br/>
                       Last edited a day ago.
                    </div>
                     
                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-[13px]">
                           <span className="text-slate-600">Status</span>
                           <span className="text-slate-900 font-medium flex items-center gap-1 cursor-pointer hover:text-blue-600"><Activity size={14}/> Draft</span>
                        </div>
                        <div className="flex justify-between items-center text-[13px]">
                           <span className="text-slate-600">Publish</span>
                           <span className="text-blue-600 font-medium cursor-pointer hover:underline">Immediately</span>
                        </div>
                        <div className="flex justify-between items-start text-[13px]">
                           <span className="text-slate-600">Slug</span>
                           <span className="text-blue-600 font-medium cursor-pointer hover:underline text-right break-all ml-4">
                             {slug || 'rjc-code-of-practices'}
                           </span>
                        </div>
                        <div className="flex justify-between items-center text-[13px]">
                           <span className="text-slate-600">Author</span>
                           <span className="text-blue-600 font-medium cursor-pointer hover:underline">growlity admin</span>
                        </div>
                        <div className="flex justify-between items-center text-[13px]">
                           <span className="text-slate-600">Discussion</span>
                           <span className="text-blue-600 font-medium cursor-pointer hover:underline">Open</span>
                        </div>
                        <div className="flex justify-between items-center text-[13px]">
                           <span className="text-slate-600">Revisions</span>
                           <span className="text-slate-900 font-medium">11</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] pt-1">
                          <input type="checkbox" className="rounded-sm border-slate-300 bg-slate-800 text-slate-800 focus:ring-0 checked:bg-slate-800" defaultChecked />
                          <span className="text-slate-600">Lock Modified Date</span>
                        </div>
                    </div>
                     
                    <button className="w-full mt-4 py-1.5 border border-red-200 text-red-600 rounded text-[13px] hover:bg-red-50 transition-colors">
                      Move to trash
                    </button>
                  </div>

                  {/* Categories Accordion */}
                  <div>
                     <button 
                       className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors"
                       onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                     >
                        <h3 className="text-[13px] font-medium text-slate-800">Categories</h3>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                     </button>
                     {isCategoriesOpen && (
                       <div className="px-4 pb-4">
                          <div className="space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar pr-2 mb-4">
                             {['Blog', 'Ecovadis', 'Sustainability', 'Uncategorized'].map(cat => (
                                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                   <input type="checkbox" defaultChecked={cat === 'Blog'} className="w-4 h-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 checked:bg-blue-600" />
                                   <span className="text-[13px] text-slate-700 group-hover:text-slate-900">{cat}</span>
                                </label>
                             ))}
                          </div>
                          <button className="text-blue-600 text-[13px] hover:underline font-medium">Add Category</button>
                       </div>
                     )}
                  </div>

                  {/* Tags Accordion */}
                  <div>
                     <button 
                       className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors"
                       onClick={() => setIsTagsOpen(!isTagsOpen)}
                     >
                        <h3 className="text-[13px] font-medium text-slate-800">Tags</h3>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isTagsOpen ? 'rotate-180' : ''}`} />
                     </button>
                     {isTagsOpen && (
                       <div className="px-4 pb-4">
                          <label className="text-[11px] font-medium text-slate-500 mb-1.5 block uppercase tracking-wide">ADD TAG</label>
                          <div className="relative">
                            <div className="flex flex-wrap gap-1.5 mb-2 border border-slate-300 p-1.5 rounded focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                               {tags.map(tag => (
                                 <span key={tag} className="bg-slate-100 text-slate-700 text-[13px] px-2 py-0.5 rounded-sm flex items-center gap-1.5">
                                   {tag} <button onClick={() => removeTag(tag)} className="text-slate-400 hover:text-slate-600 leading-none mb-0.5">×</button>
                                 </span>
                               ))}
                               <input 
                                 type="text" 
                                 value={tagInput}
                                 onChange={handleTagInputChange}
                                 onKeyDown={(e) => {
                                   if (e.key === 'Enter' || e.key === ',') {
                                     e.preventDefault();
                                     if (tagInput.trim()) addTag(tagInput.trim());
                                   }
                                 }}
                                 className="flex-1 min-w-[100px] outline-none bg-transparent text-[13px]" 
                               />
                            </div>
                            {tagSuggestions.length > 0 && (
                               <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md z-50 py-1 overflow-hidden">
                                 {tagSuggestions.map(suggestion => (
                                   <button 
                                     key={suggestion}
                                     onClick={() => addTag(suggestion)}
                                     className="w-full text-left px-3 py-2 text-[13px] text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
                                   >
                                     {suggestion}
                                   </button>
                                 ))}
                               </div>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 italic mt-2">Separate with commas or the Enter key.</p>
                       </div>
                     )}
                  </div>

                  {/* Unlist Post Accordion */}
                  <div>
                     <button 
                       className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors"
                       onClick={() => setIsUnlistOpen(!isUnlistOpen)}
                     >
                        <h3 className="text-[13px] font-medium text-slate-800">Unlist Post</h3>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isUnlistOpen ? 'rotate-180' : ''}`} />
                     </button>
                     {isUnlistOpen && (
                       <div className="px-4 pb-4">
                          <label className="flex items-start gap-2 cursor-pointer group mb-2">
                             <input type="checkbox" className="w-4 h-4 mt-0.5 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500" />
                             <span className="text-[13px] font-medium text-slate-700">Unlist this post?</span>
                          </label>
                          <p className="text-[12px] text-slate-500 pl-6">
                            This will hide the post from your site. The post can only be accessed from direct URL.
                          </p>
                       </div>
                     )}
                  </div>

                  {/* Link Suggestions Accordion */}
                  <div>
                     <button 
                       className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors"
                       onClick={() => setIsLinkSuggestionsOpen(!isLinkSuggestionsOpen)}
                     >
                        <h3 className="text-[13px] font-medium text-slate-800">Link Suggestions</h3>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isLinkSuggestionsOpen ? 'rotate-180' : ''}`} />
                     </button>
                     {isLinkSuggestionsOpen && (
                       <div className="px-4 pb-4">
                          <p className="text-[12px] text-slate-500 italic">
                            We can't show any link suggestions for this post. Try selecting categories and tags for this post, and mark other posts as Pillar Content to make them show up here.
                          </p>
                       </div>
                     )}
                  </div>
                </>
              )}

              {activeTab === 'block' && (
                <div className="p-5">
                   <p className="text-[13px] text-slate-500">Block settings will appear here when a block is selected.</p>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
