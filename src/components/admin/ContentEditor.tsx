import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Save, ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import MDEditor, { commands, ICommand } from '@uiw/react-md-editor';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

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

  const uploadImageCommand: ICommand = {
    name: 'image-upload',
    keyCommand: 'image-upload',
    buttonProps: { 'aria-label': 'Upload Image', title: 'Upload Image' },
    icon: (
      <svg width="14" height="14" viewBox="0 0 20 20">
        <path d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1C.5 2 0 2.5 0 3v14c0 .5.5 1 1 1h18c.5 0 1-.5 1-1V3c0-.5-.5-1-1-1zM2 16V4h16v12H2zm5.7-4.3l2.6 3.1 3.3-4.1 4.2 5.3H2.2l3.5-4.3z" fill="currentColor" />
      </svg>
    ),
    execute: (state, api) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
          const res = await fetch('/api/sitepins/upload', {
            method: 'POST',
            body: formData
          });
          const resultData = await res.json();
          
          if (resultData.success && resultData.result?.secure_url) {
            const modifyText = `\n![${file.name}](${resultData.result.secure_url})\n`;
            api.replaceSelection(modifyText);
          } else {
            alert('Image upload failed');
          }
        } catch (err) {
          console.error('Upload error', err);
          alert('Upload failed');
        } finally {
          setIsUploading(false);
        }
      };
      input.click();
    }
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
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
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
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-slate-800">Main Content</h2>
            {isUploading && (
              <span className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                <Loader2 className="animate-spin w-4 h-4" /> Uploading image...
              </span>
            )}
          </div>
          <div data-color-mode="light" className="prose-editor mt-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || '')}
              height={700}
              commands={[
                commands.bold,
                commands.italic,
                commands.strikethrough,
                commands.hr,
                commands.title,
                commands.divider,
                commands.link,
                commands.quote,
                commands.code,
                commands.codeBlock,
                commands.divider,
                uploadImageCommand,
                commands.unorderedListCommand,
                commands.orderedListCommand,
                commands.checkedListCommand,
                commands.divider,
                commands.help
              ]}
              previewOptions={{
                rehypePlugins: [
                  [
                    rehypeSanitize,
                    {
                      ...defaultSchema,
                      attributes: {
                        ...defaultSchema.attributes,
                        img: ['src', 'alt', 'title', 'width', 'height', 'style', 'className']
                      },
                      tagNames: [...(defaultSchema.tagNames || []), 'img']
                    }
                  ]
                ]
              }}
              className="w-full !border-none shadow-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
