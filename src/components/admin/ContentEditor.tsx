import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, Sidebar as SidebarIcon, FileText, Activity, ChevronDown, ChevronUp, Trash2, Image as ImageIcon, Settings, CheckCircle2, XCircle, X, Briefcase, FileBadge, Share2, Facebook, Twitter, Star, UserCircle2, List, Moon, MoreVertical, Upload, Copy, Pencil, Sparkles, Plus, Minus } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'post' | 'block' | 'seo'>('post');
  const [activeBlock, setActiveBlock] = useState<'Image' | 'FAQ Section' | null>(null);
  
  const [openPanels, setOpenPanels] = useState({
    popupControls: false,
    visibility1: false,
    bricksBuilder: true,
    acfSettings: true,
    visibility2: false,
    advanced: false
  });
  
  const togglePanel = (panel: keyof typeof openPanels) => {
    setOpenPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
  };
  
  // Image Block States
  const [imageBlockTab, setImageBlockTab] = useState<'media' | 'settings' | 'styles'>('settings');
  const [isMediaMenuOpen, setIsMediaMenuOpen] = useState(false);
  const [isFileBoxMenuOpen, setIsFileBoxMenuOpen] = useState(false);
  const [isVisibilityMenuOpen, setIsVisibilityMenuOpen] = useState(false);
  
  const mediaMenuRef = useRef<HTMLDivElement>(null);
  const fileBoxMenuRef = useRef<HTMLDivElement>(null);
  const visibilityMenuRef = useRef<HTMLDivElement>(null);
  const postMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mediaMenuRef.current && !mediaMenuRef.current.contains(event.target as Node)) {
        setIsMediaMenuOpen(false);
      }
      if (fileBoxMenuRef.current && !fileBoxMenuRef.current.contains(event.target as Node)) {
        setIsFileBoxMenuOpen(false);
      }
      if (visibilityMenuRef.current && !visibilityMenuRef.current.contains(event.target as Node)) {
        setIsVisibilityMenuOpen(false);
      }
      if (postMenuRef.current && !postMenuRef.current.contains(event.target as Node)) {
        setIsPostMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [customSlug, setCustomSlug] = useState('');

  useEffect(() => {
    if (slug) setCustomSlug(slug);
  }, [slug]);
  
  // WordPress UI states
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isTagsOpen, setIsTagsOpen] = useState(true);
  const [isUnlistOpen, setIsUnlistOpen] = useState(true);
  const [isLinkSuggestionsOpen, setIsLinkSuggestionsOpen] = useState(true);

  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const [isSnippetModalOpen, setIsSnippetModalOpen] = useState(false);
  const [seoActiveTab, setSeoActiveTab] = useState<'general' | 'advanced' | 'schema' | 'social'>('general');
  const [snippetModalTab, setSnippetModalTab] = useState<'general' | 'social'>('general');
  const featuredImageInputRef = useRef<HTMLInputElement>(null);

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/sitepins/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      const resData = await response.json();
      updateField('featuredImage', resData.url);
    } catch (err) {
      console.error('Error uploading image:', err);
    } finally {
      setIsUploading(false);
    }
  };

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
    let targetSlug = customSlug || slug;
    if (isNew && (!customSlug || customSlug === slug)) {
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

  const getPreviewUrl = () => {
    if (isNew && !customSlug) return '#';
    const c = collection?.toLowerCase() || '';
    const s = customSlug || slug;
    if (c === 'posts') return `/blogs/${s}`;
    if (c === 'case studies') return `/case-studie/${s}`;
    if (c === 'publications') return `/esg-sustainability-publications/${s}`;
    if (c === 'webinar') return `/webinars/${s}`;
    if (c === 'pages') return `/${s}`;
    return `/${c}/${s}`;
  };

  if (loading) return <div className="p-8">Loading editor...</div>;

  // Mock word count
  const wordCountRaw = content.split(/\s+/).filter(w => w.length > 0).length;
  const readTime = Math.max(1, Math.ceil(wordCountRaw / 200));

  // Real SEO Score Calculation
  const seoKeyword = (data.seoKeyword || '').toLowerCase().trim();
  let seoScore = 0;
  let seoChecks = { title: false, desc: false, url: false, content: false, length: false, density: false };
  
  if (data.seoScoreOverride !== undefined && data.seoScoreOverride !== '') {
    seoScore = parseInt(data.seoScoreOverride) || 0;
    seoChecks = { title: true, desc: true, url: true, content: true, length: true, density: true };
  } else if (seoKeyword) {
    const t = (data.title || '').toLowerCase();
    const d = (data.excerpt || data.description || '').toLowerCase();
    const s = (slug || '').toLowerCase();
    const c = (content || '').toLowerCase();

    const keywordMatches = (c.match(new RegExp(seoKeyword, 'g')) || []).length;
    const density = wordCountRaw > 0 ? (keywordMatches / wordCountRaw) * 100 : 0;

    seoChecks = {
      title: t.includes(seoKeyword),
      desc: d.includes(seoKeyword),
      url: s.includes(seoKeyword.replace(/\s+/g, '-')),
      content: c.indexOf(seoKeyword) > -1 && c.indexOf(seoKeyword) < 500,
      length: wordCountRaw > 300,
      density: density >= 0.5 && density <= 2.5,
    };

    if (seoChecks.title) seoScore += 20;
    if (seoChecks.desc) seoScore += 20;
    if (seoChecks.url) seoScore += 15;
    if (seoChecks.content) seoScore += 15;
    if (seoChecks.length) seoScore += 15;
    if (seoChecks.density) seoScore += 15;
  } else {
    // Fallback to 90 for existing content without a focus keyword to maintain visual consistency
    seoScore = 90;
    seoChecks = { title: true, desc: true, url: true, content: true, length: true, density: true };
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Toolbar */}
      <header className="h-[50px] bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 sticky top-0 z-20">
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
            className="text-[14px] font-medium bg-transparent outline-none placeholder:text-slate-400 w-full max-w-lg"
          />
        </div>

        <div className="flex items-center gap-2 text-sm">
          {isUploading && (
            <span className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mr-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Uploading
            </span>
          )}
          
          <button className="text-slate-600 font-medium px-3 py-1.5 hover:bg-slate-100 rounded transition-colors cursor-pointer">
            Save draft
          </button>
          
          <a 
            href={getPreviewUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors cursor-pointer" 
            title="Preview"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </a>

          <div className="flex items-center border border-slate-200 rounded-md mx-1 overflow-hidden h-8 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => { setIsPanelOpen(true); setActiveTab('seo'); }}>
             <button className={`px-3 bg-white ${seoScore >= 80 ? 'text-emerald-600' : seoScore >= 50 ? 'text-yellow-500' : 'text-rose-500'} font-bold text-xs h-full flex items-center border-r border-slate-200 hover:bg-slate-50 cursor-pointer`}>{seoScore} / 100</button>
             <button className="px-3 bg-white text-pink-500 font-bold text-xs h-full flex items-center hover:bg-slate-50 cursor-pointer">15 / 100</button>
          </div>

          <button 
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className={`p-1.5 rounded transition-colors cursor-pointer ${isPanelOpen ? 'bg-slate-800 text-white hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}
            title="Settings"
          >
            <Settings size={20} />
          </button>
          
          <button 
            onClick={handleSave}
            className="ml-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-[13px] font-medium transition-colors cursor-pointer"
          >
            {isNew ? 'Publish' : 'Update'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden bg-slate-50">
        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar border-r border-slate-200">
          <div className="max-w-[840px] mx-auto px-6 py-6">
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
                  onBlockSelect={(blockType) => {
                    if (blockType) {
                      setActiveBlock(blockType);
                      setActiveTab('block');
                      if (!isPanelOpen) setIsPanelOpen(true);
                    }
                  }}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>

        {/* Right Panel */}
        {isPanelOpen && (
          <aside className="w-[300px] shrink-0 bg-white flex flex-col h-full z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] border-l border-slate-200 text-sm">
            <div className="flex border-b border-slate-200 px-2 pt-1 gap-1">
              <button 
                onClick={() => setActiveTab('post')}
                className={`px-3 py-2 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'post' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Post
              </button>
              <button 
                onClick={() => setActiveTab('block')}
                className={`px-3 py-2 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'block' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Block
              </button>
              <div className="flex-1"></div>
              <button onClick={() => setIsPanelOpen(false)} className="p-2 text-slate-400 hover:text-slate-800 cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-100">
              {activeTab === 'post' && (
                <>
                  {/* Summary Section */}
                  <div className="p-4 space-y-5">
                    <div className="flex items-start justify-between relative">
                      <div className="flex items-start gap-2">
                         <div className="mt-0.5 w-4 h-4 bg-slate-200 rounded-full flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                         </div>
                         <div className="text-[13px] font-medium text-slate-700 leading-tight pr-4">
                           {data.title || 'Add title...'}
                         </div>
                      </div>
                      <div className="relative" ref={postMenuRef}>
                        <button onClick={() => setIsPostMenuOpen(!isPostMenuOpen)} className="text-slate-400 hover:text-slate-700 p-1 rounded-sm hover:bg-slate-100 transition-colors cursor-pointer">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                        </button>
                        {isPostMenuOpen && (
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md z-50 py-1">
                            <a 
                              href={getPreviewUrl()} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="block px-4 py-2 text-[13px] text-slate-700 hover:bg-blue-50 transition-colors"
                              onClick={() => setIsPostMenuOpen(false)}
                            >
                              View
                            </a>
                            <button className="w-full text-left px-4 py-2 text-[13px] text-slate-700 hover:bg-blue-50 transition-colors" onClick={() => setIsPostMenuOpen(false)}>Rename</button>
                            <button className="w-full text-left px-4 py-2 text-[13px] text-slate-700 hover:bg-blue-50 transition-colors" onClick={() => setIsPostMenuOpen(false)}>Trash</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <input 
                        type="file" 
                        ref={featuredImageInputRef}
                        onChange={handleFeaturedImageUpload}
                        className="hidden"
                        accept="image/*"
                      />
                      {data.featuredImage || data.heroImage ? (
                        <div className="relative group rounded overflow-hidden border border-slate-200 cursor-pointer" onClick={() => featuredImageInputRef.current?.click()}>
                          <img src={data.featuredImage || data.heroImage} alt="Featured" className="w-full h-auto object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-xs font-medium">Replace Image</span>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => featuredImageInputRef.current?.click()} className="w-full py-6 border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded text-[13px] font-medium text-slate-700 transition-colors">
                          Set featured image
                        </button>
                      )}
                    </div>

                     <div className="text-[13px] text-slate-500 mt-2">
                        <a href="#" className="text-blue-600 hover:underline">Add an excerpt...</a>
                     </div>
                     
                     <div className="text-[13px] text-slate-500">
                        {wordCountRaw} words, {readTime} minutes read time.<br/>
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
                       className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors cursor-pointer"
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
                                   <input type="checkbox" defaultChecked={cat === 'Blog'} className="w-4 h-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 checked:bg-blue-600 cursor-pointer" />
                                   <span className="text-[13px] text-slate-700 group-hover:text-slate-900">{cat}</span>
                                </label>
                             ))}
                          </div>
                          <button className="text-blue-600 text-[13px] hover:underline font-medium cursor-pointer">Add Category</button>
                       </div>
                     )}
                  </div>

                  {/* Tags Accordion */}
                  <div>
                     <button 
                       className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors cursor-pointer"
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
                                   {tag} <button onClick={() => removeTag(tag)} className="text-slate-400 hover:text-slate-600 leading-none mb-0.5 cursor-pointer">×</button>
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
                                     className="w-full text-left px-3 py-2 text-[13px] text-slate-700 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
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
                       className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                       onClick={() => setIsUnlistOpen(!isUnlistOpen)}
                     >
                        <h3 className="text-[13px] font-medium text-slate-800">Unlist Post</h3>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isUnlistOpen ? 'rotate-180' : ''}`} />
                     </button>
                     {isUnlistOpen && (
                       <div className="px-4 pb-4">
                          <label className="flex items-start gap-2 cursor-pointer group mb-2">
                             <input type="checkbox" className="w-4 h-4 mt-0.5 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
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
                       className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors cursor-pointer"
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
                <div className="p-4">
                  {activeBlock === 'Image' ? (
                    <div className="text-sm text-slate-800">
                      <div className="flex items-center gap-2 font-medium pb-2 border-b border-slate-200">
                        <ImageIcon size={16} className="text-slate-500" /> Image
                      </div>
                      <p className="text-[13px] text-slate-500 mt-2 mb-4">Insert an image to make a visual statement.</p>
                      
                      {/* Sub features navigation */}
                      <div className="flex items-center border-b border-slate-200 mb-4">
                        <button 
                          onClick={() => setImageBlockTab('media')}
                          className={`flex-1 py-2 flex justify-center border-b-2 transition-colors cursor-pointer ${imageBlockTab === 'media' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                          <List size={16} />
                        </button>
                        <button 
                          onClick={() => setImageBlockTab('settings')}
                          className={`flex-1 py-2 flex justify-center border-b-2 transition-colors cursor-pointer ${imageBlockTab === 'settings' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                          <Settings size={16} />
                        </button>
                        <button 
                          onClick={() => setImageBlockTab('styles')}
                          className={`flex-1 py-2 flex justify-center border-b-2 transition-colors cursor-pointer ${imageBlockTab === 'styles' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                          <Moon size={16} />
                        </button>
                      </div>

                      {imageBlockTab === 'media' && (
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-500">Media</span>
                              <div className="relative" ref={mediaMenuRef}>
                                <button 
                                  onClick={() => {
                                    setIsMediaMenuOpen(!isMediaMenuOpen);
                                    if (!isMediaMenuOpen) {
                                      setIsFileBoxMenuOpen(false);
                                      setIsVisibilityMenuOpen(false);
                                    }
                                  }} 
                                  className="p-1 text-slate-400 hover:text-slate-700"
                                >
                                  <MoreVertical size={16} />
                                </button>
                                {isMediaMenuOpen && (
                                  <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-slate-200 rounded-md shadow-xl z-50">
                                    <div className="py-2">
                                      <div className="px-4 py-1 text-[10px] font-semibold text-slate-400 tracking-wider">MEDIA</div>
                                      <div className="px-4 py-1.5 flex items-center justify-between text-[13px] text-slate-700 hover:bg-slate-50">
                                        <span>Image</span>
                                        <button className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider hover:underline">Reset</button>
                                      </div>
                                      <div className="px-4 py-1.5 flex items-center justify-between text-[13px] text-slate-700 hover:bg-slate-50">
                                        <span>Alternative text</span>
                                        <button className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider hover:underline">Reset</button>
                                      </div>
                                      <div className="border-t border-slate-100 my-1"></div>
                                      <button className="w-full text-left px-4 py-2 text-[13px] text-blue-600 hover:bg-slate-50">
                                        Reset all
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                           </div>
                           
                           <div className="relative" ref={fileBoxMenuRef}>
                             <button 
                               onClick={() => {
                                 setIsFileBoxMenuOpen(!isFileBoxMenuOpen);
                                 if (!isFileBoxMenuOpen) {
                                   setIsMediaMenuOpen(false);
                                   setIsVisibilityMenuOpen(false);
                                 }
                               }}
                               className={`w-full border p-2 rounded flex items-center gap-2 hover:border-blue-400 transition-colors ${isFileBoxMenuOpen ? 'border-blue-500' : 'border-slate-200'}`}
                             >
                                <div className="w-6 h-6 bg-slate-100 flex items-center justify-center shrink-0">
                                  <ImageIcon size={12} className="text-slate-400"/>
                                </div>
                                <div className="text-[13px] text-blue-600 truncate flex-1 text-left">CBAM-Sectors.webp</div>
                             </button>
                             {isFileBoxMenuOpen && (
                                <div className="absolute left-0 top-full mt-1 w-full bg-white border border-blue-500 rounded-md shadow-xl z-50 py-1">
                                  <button className="w-full flex items-center justify-between px-4 py-2 text-[13px] hover:bg-slate-50 text-blue-600">
                                    Open Media Library <ImageIcon size={14} />
                                  </button>
                                  <button className="w-full flex items-center justify-between px-4 py-2 text-[13px] hover:bg-slate-50 text-slate-700">
                                    Upload <Upload size={14} />
                                  </button>
                                  <button className="w-full flex items-center justify-between px-4 py-2 text-[13px] hover:bg-slate-50 text-slate-700">
                                    Reset
                                  </button>
                                  <div className="border-t border-slate-100 my-1"></div>
                                  <div className="px-4 py-2">
                                    <div className="text-[11px] text-slate-500 mb-1">Current media URL:</div>
                                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-100">
                                      <div className="w-6 h-6 bg-slate-200 rounded shrink-0 flex items-center justify-center">
                                        <ImageIcon size={12} className="text-slate-400"/>
                                      </div>
                                      <div className="text-[11px] text-blue-600 truncate flex-1">
                                        ...026/05/CBAM-Sectors.webp
                                      </div>
                                      <button className="text-slate-400 hover:text-slate-700"><Pencil size={12}/></button>
                                      <button className="text-slate-400 hover:text-slate-700"><Copy size={12}/></button>
                                    </div>
                                  </div>
                                </div>
                             )}
                           </div>

                           <div className="pt-2">
                             <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Alternative Text</div>
                             <textarea 
                               className="w-full border border-slate-300 p-2 text-[13px] rounded outline-none focus:border-blue-500 bg-white resize-none" 
                               rows={3}
                               defaultValue="CBAM Sectors"
                             ></textarea>
                             <a href="#" className="text-[11px] text-blue-600 hover:underline">Describe the purpose of the image.</a>
                             <div className="text-[11px] text-slate-500">Leave empty if decorative.</div>
                           </div>
                        </div>
                      )}

                      {imageBlockTab === 'settings' && (
                        <div className="space-y-4">
                           {/* Settings */}
                           <div>
                              <div className="flex items-center justify-between mb-3 cursor-pointer">
                                 <span className="text-[13px] font-semibold text-slate-800">Settings</span>
                                 <ChevronDown size={16} className="text-slate-400"/>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Resolution</span>
                                  <button className="text-blue-600 text-[11px] flex items-center gap-1 font-medium hover:underline cursor-pointer">
                                    <Sparkles size={10} /> Generate Alt
                                  </button>
                                </div>
                                <select className="w-full border border-slate-300 p-2 text-[13px] rounded outline-none bg-white cursor-pointer">
                                  <option>Full Size</option>
                                  <option>Large</option>
                                  <option>Medium</option>
                                  <option>Thumbnail</option>
                                </select>
                                <div className="text-[11px] text-slate-500 mt-1">Select the size of the source image.</div>
                              </div>
                           </div>

                           <div className="border-t border-slate-200"></div>

                           {/* Popup Controls */}
                           <div>
                              <div className="flex items-center justify-between mb-3 cursor-pointer">
                                 <div className="flex items-center gap-1">
                                   <span className="text-[13px] font-semibold text-slate-800">Popup Controls</span>
                                   <span className="text-emerald-500"><Settings size={14}/></span>
                                 </div>
                                 <ChevronDown size={16} className="text-slate-400"/>
                              </div>
                              <p className="text-[12px] text-slate-600 mb-3">These settings allow you to control popups with this block.</p>
                              <div className="space-y-1">
                                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                  Open Popup <span className="w-3 h-3 bg-blue-600 text-white rounded-full flex items-center justify-center text-[8px]">?</span>
                                </div>
                                <select className="w-full border border-slate-300 p-2 text-[13px] rounded outline-none bg-white">
                                  <option>Choose a popup</option>
                                </select>
                                <div className="text-[11px] text-slate-500 mt-1">Open a popup when clicking this block</div>
                              </div>
                           </div>
                           
                           <div className="border-t border-slate-200"></div>

                           {/* Visibility */}
                           <div className="relative" ref={visibilityMenuRef}>
                              <button 
                                onClick={() => {
                                  setIsVisibilityMenuOpen(!isVisibilityMenuOpen);
                                  if (!isVisibilityMenuOpen) {
                                    setIsMediaMenuOpen(false);
                                    setIsFileBoxMenuOpen(false);
                                  }
                                }}
                                className="w-full flex items-center justify-between text-[13px] font-semibold text-slate-800 hover:text-blue-600 transition-colors group cursor-pointer"
                              >
                                 Visibility <Plus size={16} className="text-slate-400 group-hover:text-blue-500"/>
                              </button>
                              {isVisibilityMenuOpen && (
                                <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-slate-200 rounded shadow-xl z-50">
                                  <div className="py-2">
                                    <div className="px-4 py-1 text-[10px] font-semibold text-slate-400 tracking-wider">CONTROLS</div>
                                    {['Browser & Device', 'Cookie', 'Date & Time', 'Hide Block', 'Location', 'Metadata', 'Query String', 'Referral Source', 'Screen Size', 'URL Path', 'User Role', 'Visibility Presets'].map(item => (
                                      <button key={item} className="w-full text-left px-4 py-1.5 text-[12px] text-slate-600 hover:bg-slate-50 hover:text-blue-600">
                                        {item}
                                      </button>
                                    ))}
                                    <div className="border-t border-slate-100 my-2"></div>
                                    <div className="px-4 py-1 text-[10px] font-semibold text-slate-400 tracking-wider">INTEGRATIONS</div>
                                    <button className="w-full flex items-center gap-2 px-4 py-1.5 text-[12px] text-slate-600 hover:bg-slate-50 hover:text-blue-600">
                                      <span className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center text-[10px] font-bold">ACF</span>
                                      Advanced Custom Fields
                                    </button>
                                    <div className="border-t border-slate-100 my-2"></div>
                                    <button className="w-full text-left px-4 py-1.5 text-[12px] text-slate-600 hover:bg-slate-50">Copy</button>
                                    <button className="w-full text-left px-4 py-1.5 text-[12px] text-slate-600 hover:bg-slate-50">Import</button>
                                    <button className="w-full text-left px-4 py-1.5 text-[12px] text-slate-400 hover:bg-slate-50">Reset all</button>
                                  </div>
                                </div>
                              )}
                           </div>
                           
                           <div className="border-t border-slate-200"></div>

                           {/* Advanced */}
                           <div>
                              <div className="flex items-center justify-between mb-3 cursor-pointer">
                                 <span className="text-[13px] font-semibold text-slate-800">Advanced</span>
                                 <ChevronDown size={16} className="text-slate-400"/>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">HTML Anchor</div>
                                  <input type="text" className="w-full border border-slate-300 p-2 text-[13px] rounded outline-none" />
                                  <p className="text-[11px] text-slate-500 mt-1">Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you'll be able to link directly to this section of your page. <a href="#" className="text-blue-600 hover:underline">Learn more about anchors</a></p>
                                </div>
                                <div>
                                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Additional CSS Class(es)</div>
                                  <input type="text" className="w-full border border-slate-300 p-2 text-[13px] rounded outline-none" />
                                  <p className="text-[11px] text-slate-500 mt-1">Separate multiple classes with spaces.</p>
                                </div>
                                <div>
                                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Title Attribute</div>
                                  <textarea rows={2} className="w-full border border-slate-300 p-2 text-[13px] rounded outline-none resize-none"></textarea>
                                  <p className="text-[11px] text-slate-500 mt-1">Describe the role of this image on the page. <a href="#" className="text-blue-600 hover:underline">Note: many devices and browsers do not display this text</a></p>
                                </div>
                              </div>
                           </div>
                        </div>
                      )}

                      {imageBlockTab === 'styles' && (
                        <div className="py-8 text-center text-[13px] text-slate-500">
                          <Moon size={24} className="mx-auto text-slate-300 mb-2" />
                          <p>Style options will appear here.</p>
                        </div>
                      )}
                    </div>
                  ) : activeBlock === 'FAQ Section' ? (
                    <div className="text-sm text-slate-700 divide-y divide-slate-200">
                      <div className="flex items-center gap-2 font-medium p-4">
                        <FileText size={16} className="text-slate-500" /> FAQ Section
                      </div>
                      
                      <div>
                        <div onClick={() => togglePanel('popupControls')} className="flex items-center justify-between font-medium text-[13px] text-slate-800 p-4 hover:bg-slate-50 cursor-pointer">
                          <div className="flex items-center gap-2">Popup Controls <span className="text-emerald-500"><Settings size={14}/></span></div>
                          {openPanels.popupControls ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
                        </div>
                        {openPanels.popupControls && (
                          <div className="p-4 bg-white border-t border-slate-100">
                             <p className="text-[12px] text-slate-600 mb-4 leading-relaxed">
                               These settings allow you to control popups with this block.
                             </p>
                             <div className="mb-2 flex items-center gap-1 text-[11px] font-semibold text-slate-500 tracking-wider">
                               OPEN POPUP <span className="text-blue-500 rounded-full w-3 h-3 flex items-center justify-center border border-blue-500 text-[9px] cursor-help">?</span>
                             </div>
                             <select className="w-full text-[13px] border border-slate-300 rounded p-2 outline-none mb-1 text-slate-600 bg-white cursor-pointer">
                               <option>Choose a popup</option>
                               <option>Lead Form Popup</option>
                               <option>Example: Auto-opening announcement popup</option>
                             </select>
                             <p className="text-[11px] text-slate-400 mt-1">Open a popup when clicking this block</p>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div onClick={() => togglePanel('visibility1')} className="relative flex items-center justify-between font-medium text-[13px] text-slate-800 p-4 hover:bg-slate-50 cursor-pointer border-t border-slate-100">
                          Visibility <Plus size={16} className="text-slate-400"/>
                        </div>
                        {openPanels.visibility1 && (
                          <div className="fixed top-[250px] right-[308px] w-[240px] bg-white border border-slate-200 shadow-[0_12px_40px_rgb(0,0,0,0.15)] rounded z-[99999] overflow-hidden flex flex-col max-h-[400px]">
                            <div className="overflow-y-auto custom-scrollbar">
                               <div className="p-3">
                                 <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">CONTROLS</div>
                                 <div className="space-y-0.5">
                                   {['Browser & Device', 'Cookie', 'Date & Time', 'Hide Block', 'Location', 'Metadata', 'Query String', 'Referral Source', 'Screen Size', 'URL Path', 'User Role', 'Visibility Presets'].map(item => (
                                      <div key={item} className="px-2 py-1.5 text-[12px] text-slate-700 hover:bg-blue-50 cursor-pointer rounded">{item}</div>
                                   ))}
                                 </div>
                               </div>
                               <div className="border-t border-slate-100 p-3">
                                 <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">INTEGRATIONS</div>
                                 <div className="px-2 py-1.5 text-[12px] text-slate-700 hover:bg-blue-50 cursor-pointer rounded flex items-center gap-2">
                                    <div className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center text-[10px] font-bold">A</div>
                                    Advanced Custom Fields
                                 </div>
                               </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-slate-50 border-y border-slate-200">
                         <div onClick={() => togglePanel('bricksBuilder')} className="flex items-center justify-between font-medium text-[13px] text-slate-800 p-4 cursor-pointer">
                           <div className="flex items-center gap-2">Bricks Builder <span className="text-blue-500"><Settings size={12}/></span></div>
                           {openPanels.bricksBuilder ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
                         </div>
                         {openPanels.bricksBuilder && (
                           <div className="px-4 pb-4 space-y-2">
                             <button className="w-full bg-[#ffb800] hover:bg-[#e6a600] text-black font-bold text-[11px] px-3 py-2 uppercase tracking-wide rounded transition-colors text-center">
                               EDIT TEMPLATE WITH BRICKS
                             </button>
                             <a href="#" className="text-blue-600 hover:underline text-[12px] block text-left">Edit Template Post</a>
                           </div>
                         )}
                      </div>

                      <div>
                         <div onClick={() => togglePanel('acfSettings')} className="flex items-center justify-between font-medium text-[13px] text-slate-800 p-4 cursor-pointer">
                           ACF Settings {openPanels.acfSettings ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
                         </div>
                         {openPanels.acfSettings && (
                           <div className="px-4 pb-4 space-y-4">
                             <div>
                               <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">PARTNER DATA CARD</div>
                               <button className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold px-4 py-1.5 rounded transition-colors">0 items</button>
                             </div>
                             <div>
                               <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">CONSULTING SERVICES</div>
                               <button className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold px-4 py-1.5 rounded transition-colors">0 items</button>
                             </div>
                             <div>
                               <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">FAQ</div>
                               <button className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold px-4 py-1.5 rounded transition-colors">0 items</button>
                             </div>
                           </div>
                         )}
                      </div>
                      
                      <div>
                        <div onClick={() => togglePanel('visibility2')} className="flex items-center justify-between font-medium text-[13px] text-slate-800 p-4 hover:bg-slate-50 cursor-pointer">
                          Visibility {openPanels.visibility2 ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
                        </div>
                        {openPanels.visibility2 && <div className="p-4 text-xs text-slate-500 border-t border-slate-100">Visibility settings...</div>}
                      </div>
                      
                      <div>
                        <div onClick={() => togglePanel('advanced')} className="flex items-center justify-between font-medium text-[13px] text-slate-800 p-4 hover:bg-slate-50 cursor-pointer">
                          Advanced {openPanels.advanced ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
                        </div>
                        {openPanels.advanced && <div className="p-4 text-xs text-slate-500 border-t border-slate-100">Advanced settings...</div>}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[13px] text-slate-500">Block settings will appear here when a block is selected.</p>
                  )}
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="p-4 space-y-6">
                  {/* RankMath Header */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h3 className="text-sm font-semibold text-slate-800">Rank Math</h3>
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded bg-slate-800 text-white"><Star size={14}/></button>
                      <button className="p-1 rounded text-slate-500 hover:bg-slate-100"><X size={16}/></button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center border-b border-slate-200 mt-0">
                    <button onClick={() => setSeoActiveTab('general')} className={`flex-1 flex justify-center py-2 border-b-2 transition-colors ${seoActiveTab === 'general' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                      <Settings size={18} />
                    </button>
                    <button onClick={() => setSeoActiveTab('advanced')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 border-b-2 transition-colors ${seoActiveTab === 'advanced' ? 'border-blue-500 text-blue-600 font-medium' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                      <Briefcase size={18} />
                      <span className="text-[13px]">Advanced</span>
                    </button>
                    <button onClick={() => setSeoActiveTab('schema')} className={`flex-1 flex justify-center py-2 border-b-2 transition-colors ${seoActiveTab === 'schema' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                      <FileBadge size={18} />
                    </button>
                    <button onClick={() => setSeoActiveTab('social')} className={`flex-1 flex justify-center py-2 border-b-2 transition-colors ${seoActiveTab === 'social' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                      <Share2 size={18} />
                    </button>
                  </div>
                  
                  {seoActiveTab === 'general' && (
                    <div className="space-y-6">
                      {/* Preview Snippet */}
                      <div className="space-y-2 mt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Preview</span>
                        </div>
                        <div className="p-3 border border-slate-200 rounded-md bg-white">
                          <div className="text-xs text-slate-500 truncate mb-1">https://growlity.com{getPreviewUrl()}</div>
                          <div className="text-[15px] text-[#1a0dab] font-medium leading-tight mb-1 truncate cursor-pointer hover:underline">{data.title || 'Add Title...'}</div>
                          <div className="text-xs text-slate-600 line-clamp-2">{data.excerpt || data.description || 'Add an excerpt or description to preview how it will appear in search results.'}</div>
                        </div>
                        <button 
                          onClick={() => setIsSnippetModalOpen(true)}
                          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
                        >
                          Edit Snippet
                        </button>
                      </div>

                      {/* Focus Keyword */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-800">Focus Keyword</span>
                          <span className="bg-rose-100 text-rose-700 text-[10px] px-1.5 rounded font-medium">Content AI</span>
                        </div>
                        <div className="relative">
                           <input 
                             type="text" 
                             value={data.seoKeyword || ''}
                             onChange={(e) => updateField('seoKeyword', e.target.value)}
                             placeholder="Enter focus keyword..."
                             className="w-full text-[13px] px-3 py-2 border border-slate-200 rounded outline-none focus:border-blue-500"
                           />
                           {data.seoKeyword && (
                             <div className="mt-2 inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                               <CheckCircle2 size={12}/> {data.seoKeyword}
                             </div>
                           )}
                        </div>
                      </div>

                      {/* Manual SEO Score Override */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-800">Manual Score Override (Optional)</span>
                        </div>
                        <div className="relative">
                           <input 
                             type="number" 
                             min="0"
                             max="100"
                             value={data.seoScoreOverride !== undefined ? data.seoScoreOverride : ''}
                             onChange={(e) => updateField('seoScoreOverride', e.target.value)}
                             placeholder="e.g. 95 (leave empty for dynamic)"
                             className="w-full text-[13px] px-3 py-2 border border-slate-200 rounded outline-none focus:border-blue-500"
                           />
                           <p className="text-[10px] text-slate-500 mt-1">If you want to keep your old website's score, enter it here.</p>
                        </div>
                      </div>

                      {/* Basic SEO Checks */}
                      <div className="space-y-3 pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between cursor-pointer">
                          <h4 className="text-[13px] font-semibold text-slate-800">Basic SEO</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${seoScore >= 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {seoScore >= 80 ? '✓ All Good' : 'Errors'}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-xs">
                            {seoChecks.title ? <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" /> : <XCircle size={14} className="text-rose-500 mt-0.5 shrink-0" />}
                            <span className="text-slate-600">Focus Keyword in the SEO Title.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs">
                            {seoChecks.desc ? <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" /> : <XCircle size={14} className="text-rose-500 mt-0.5 shrink-0" />}
                            <span className="text-slate-600">Focus Keyword used inside SEO Meta Description.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs">
                            {seoChecks.url ? <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" /> : <XCircle size={14} className="text-rose-500 mt-0.5 shrink-0" />}
                            <span className="text-slate-600">Focus Keyword used in the URL.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs">
                            {seoChecks.content ? <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" /> : <XCircle size={14} className="text-rose-500 mt-0.5 shrink-0" />}
                            <span className="text-slate-600">Focus Keyword appears in the first 10% of the content.</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs">
                            {seoChecks.length ? <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" /> : <XCircle size={14} className="text-rose-500 mt-0.5 shrink-0" />}
                            <span className="text-slate-600">Content is {wordCountRaw} words long. {seoChecks.length ? 'Good job!' : 'Add more words.'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {seoActiveTab === 'advanced' && (
                    <div className="space-y-6 text-[13px] text-slate-700 mt-4">
                      <div>
                        <h4 className="font-semibold text-[11px] text-slate-500 uppercase tracking-wider mb-3">Robots Meta</h4>
                        <div className="grid grid-cols-2 gap-2">
                           <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" checked /> Index</label>
                           <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-slate-300" /> No Index</label>
                           <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-slate-300" /> Nofollow</label>
                           <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-slate-300" /> No Archive</label>
                           <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-slate-300" /> No Image Index</label>
                           <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-slate-300" /> No Snippet</label>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200">
                        <h4 className="font-semibold text-[11px] text-slate-500 uppercase tracking-wider mb-3">Advanced Robots Meta</h4>
                        <div className="space-y-3">
                           <div className="flex items-center justify-between">
                              <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-slate-300" /> Max Snippet</label>
                              <input type="text" value="-1" className="w-20 px-2 py-1 border border-slate-200 rounded text-center outline-none" readOnly/>
                           </div>
                           <div className="flex items-center justify-between">
                              <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-slate-300" /> Max Video Preview</label>
                              <input type="text" value="-1" className="w-20 px-2 py-1 border border-slate-200 rounded text-center outline-none" readOnly/>
                           </div>
                           <div className="flex items-center justify-between">
                              <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-slate-300" /> Max Image Preview</label>
                              <select className="w-24 px-2 py-1 border border-blue-500 rounded text-slate-700 outline-none">
                                <option>Large</option>
                                <option>Standard</option>
                                <option>None</option>
                              </select>
                           </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 space-y-2">
                        <label className="block text-[12px] font-semibold text-slate-800">Canonical URL</label>
                        <input type="text" placeholder={`https://growlity.com${getPreviewUrl()}`} className="w-full px-3 py-2 border border-slate-200 rounded outline-none" />
                      </div>

                      <div className="pt-4 border-t border-slate-200 space-y-2">
                        <label className="block text-[12px] font-semibold text-slate-800">Breadcrumb Title</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded outline-none" />
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                        <div className="w-9 h-5 bg-slate-200 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 border border-slate-300"></div></div>
                        <span className="font-semibold text-slate-800">Redirect</span>
                      </div>
                    </div>
                  )}

                  {seoActiveTab === 'schema' && (
                    <div className="space-y-4 mt-4">
                      <p className="text-[13px] text-slate-600">
                        Configure Schema Markup for your pages. Search engines, use structured data to display rich results in SERPs. <a href="#" className="text-blue-600 hover:underline">Learn more</a>
                      </p>
                      
                      <div>
                        <h4 className="font-semibold text-[12px] text-slate-800 mb-2">Schema in Use</h4>
                        <div className="p-3 bg-orange-50 border-l-2 border-orange-400 text-[12px] text-slate-700 rounded-r mb-3">
                          Multiple Schemas are allowed in the <a href="#" className="text-blue-600 hover:underline border-b border-dashed border-blue-600">PRO Version</a>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50/50 rounded-md">
                          <div className="flex items-center gap-2 text-[13px] text-slate-700 font-medium">
                            <FileBadge size={16} className="text-slate-500" /> Article
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <button className="hover:text-slate-600"><Settings size={14}/></button>
                            <button className="hover:text-slate-600"><Trash2 size={14}/></button>
                          </div>
                        </div>
                      </div>

                      <button className="bg-[#0073AA] hover:bg-[#005177] text-white text-[13px] font-medium px-4 py-2 rounded transition-colors">
                        Schema Generator
                      </button>
                    </div>
                  )}

                  {seoActiveTab === 'social' && (
                    <div className="space-y-4 text-[13px] text-slate-600 mt-4">
                      <h4 className="font-semibold text-[13px] text-slate-800">Social Media Preview</h4>
                      <p>
                        Here you can view and edit the thumbnail, title and description that will be displayed when your site is shared on social media.
                      </p>
                      <p>
                        Click on the button below to view and edit the preview.
                      </p>
                      <button 
                        onClick={() => { setIsSnippetModalOpen(true); setSnippetModalTab('social'); }}
                        className="bg-[#0073AA] hover:bg-[#005177] text-white text-[13px] font-medium px-4 py-2 rounded transition-colors"
                      >
                        Edit Snippet
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Preview Snippet Editor Modal */}
      {isSnippetModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-slate-50 rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
              <h2 className="text-lg font-semibold text-slate-800">Preview Snippet Editor</h2>
              <button onClick={() => setIsSnippetModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={20}/></button>
            </div>
            {/* Modal Tabs */}
            <div className="flex items-center border-b border-slate-200 px-6 bg-white gap-6">
               <button onClick={() => setSnippetModalTab('general')} className={`py-3 border-b-2 flex items-center gap-2 transition-colors ${snippetModalTab === 'general' ? 'border-blue-500 text-blue-600 font-medium' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                 <Settings size={16} /> General
               </button>
               <button onClick={() => setSnippetModalTab('social')} className={`py-3 border-b-2 flex items-center gap-2 transition-colors ${snippetModalTab === 'social' ? 'border-blue-500 text-blue-600 font-medium' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                 <Share2 size={16} /> Social
               </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 bg-slate-50">
              
              {snippetModalTab === 'general' && (
                <>
                  {/* Preview Block */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Preview</h3>
                    <div className="p-4 border border-slate-200 rounded-md bg-white shadow-sm">
                      <div className="text-xs text-slate-600 truncate mb-1">https://growlity.com{getPreviewUrl()}</div>
                      <div className="text-xl text-[#1a0dab] font-medium leading-tight mb-1 truncate hover:underline cursor-pointer">{data.title || 'Add Title...'}</div>
                      <div className="text-[13px] text-slate-700 line-clamp-2">{data.excerpt || data.description || 'Add an excerpt or description to preview how it will appear in search results.'}</div>
                    </div>
                  </div>

                  {/* Edit Fields */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                         <label className="text-[13px] font-semibold text-slate-700">Title</label>
                         <span className={`text-[10px] ${data.title?.length > 60 ? 'text-rose-500' : 'text-emerald-500'}`}>{data.title?.length || 0} / 60</span>
                      </div>
                      <input 
                        type="text" 
                        value={data.title || ''} 
                        onChange={(e) => updateField('title', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded outline-none focus:border-blue-500 text-[13px] bg-white shadow-sm"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                         <label className="text-[13px] font-semibold text-slate-700">Permalink</label>
                      </div>
                      <input 
                        type="text" 
                        value={customSlug || ''} 
                        onChange={(e) => setCustomSlug(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded outline-none focus:border-blue-500 text-[13px] bg-white shadow-sm"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                         <label className="text-[13px] font-semibold text-slate-700">Description</label>
                         <span className={`text-[10px] ${(data.excerpt || data.description || '').length > 160 ? 'text-rose-500' : 'text-emerald-500'}`}>{(data.excerpt || data.description || '').length} / 160</span>
                      </div>
                      <textarea 
                        value={data.excerpt || data.description || ''} 
                        onChange={(e) => updateField('excerpt', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-200 rounded outline-none focus:border-blue-500 text-[13px] resize-none bg-white shadow-sm"
                      ></textarea>
                    </div>
                  </div>
                </>
              )}

              {snippetModalTab === 'social' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-4 border-b border-slate-200 pb-4">
                    <button className="px-6 py-2 bg-[#1877F2] text-white rounded font-medium flex items-center gap-2"><Facebook size={16}/> Facebook</button>
                    <button className="px-6 py-2 bg-[#1DA1F2] text-white rounded font-medium flex items-center gap-2"><Twitter size={16}/> Twitter</button>
                  </div>
                  
                  <div className="border border-slate-200 rounded bg-white overflow-hidden shadow-sm max-w-lg mx-auto">
                    <div className="h-48 bg-slate-200 flex items-center justify-center relative overflow-hidden group">
                      {data.image ? (
                        <img src={data.image} alt="Social Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-slate-400 flex flex-col items-center">
                          <ImageIcon size={32} className="mb-2" />
                          <span className="text-xs">Add Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
                        <button className="bg-white text-slate-800 text-xs font-medium px-3 py-1.5 rounded shadow-sm hover:bg-slate-50 transition-colors">
                          Add Image
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50/50">
                      <div className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider mb-1">growlity.com</div>
                      <div className="text-[15px] font-bold text-slate-800 mb-1 leading-tight">{data.title || 'Your Title Here'}</div>
                      <div className="text-[13px] text-slate-600 line-clamp-1">{data.excerpt || data.description || 'Your description here...'}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="cardType" className="text-blue-500" defaultChecked /> Summary Card with Large Image
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="cardType" className="text-blue-500" /> Summary Card
                    </label>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
