import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  imagePlugin,
  jsxPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertThematicBreak,
  ListsToggle,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  InsertTable,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface MDXEditorComponentProps {
  markdown: string;
  onChange: (markdown: string) => void;
  onUploadImage?: (file: File) => Promise<string>;
  onBlockSelect?: (blockType: 'Image' | 'FAQ Section' | null) => void;
}

export default function MDXEditorComponent({ markdown, onChange, onUploadImage, onBlockSelect }: MDXEditorComponentProps) {
  
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const optionsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(e.target as Node)) {
        setIsOptionsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function imageUploadHandler(image: File) {
    if (onUploadImage) {
      return await onUploadImage(image);
    }
    return URL.createObjectURL(image);
  }

  const customJsxDescriptors = [
    {
      name: 'CTA',
      kind: 'flow',
      source: './components/mdx/CTA.astro',
      props: [
        { name: 'text', type: 'string' },
        { name: 'link', type: 'string' },
        { name: 'buttonText', type: 'string' },
        { name: 'variant', type: 'string' }
      ],
      hasChildren: false,
      Editor: ({ properties, setProperties }: any) => {
        return (
          <div className="p-4 border rounded-lg bg-gray-50 my-4 shadow-sm relative group">
            <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold">
              CTA Block
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Text</label>
                <input 
                  type="text" 
                  value={properties.text || ''} 
                  onChange={(e) => setProperties({ ...properties, text: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                  placeholder="Ready to get started?"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Link URL</label>
                <input 
                  type="text" 
                  value={properties.link || ''} 
                  onChange={(e) => setProperties({ ...properties, link: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                  placeholder="/contact"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Button Text</label>
                <input 
                  type="text" 
                  value={properties.buttonText || ''} 
                  onChange={(e) => setProperties({ ...properties, buttonText: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                  placeholder="Contact Us"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Variant (Style)</label>
                <select 
                  value={properties.variant || 'light'} 
                  onChange={(e) => setProperties({ ...properties, variant: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                >
                  <option value="light">Light (Default)</option>
                  <option value="dark">Dark</option>
                  <option value="outline">Outline</option>
                </select>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      name: 'FAQ',
      kind: 'flow',
      source: './components/mdx/FAQ.astro',
      props: [],
      hasChildren: true,
      Editor: ({ children }: any) => {
        return (
          <div className="faq-block my-6 border border-blue-400 rounded-sm bg-white relative p-8 cursor-text">
             <div className="text-center mb-8">
               <h3 className="text-[#0073AA] font-bold text-xl mb-2">FAQs</h3>
               <div className="text-gray-400 text-3xl font-medium">Add Content...</div>
             </div>
             <div className="text-left w-full mx-auto max-w-3xl">
               {children}
             </div>
          </div>
        );
      }
    },
    {
      name: 'FAQItem',
      kind: 'flow',
      source: './components/mdx/FAQItem.astro',
      props: [
        { name: 'q', type: 'string' }
      ],
      hasChildren: true,
      Editor: ({ properties, setProperties, children }: any) => {
        return (
          <div className="border-b border-gray-300 py-3 mb-2 bg-white flex flex-col group faq-item">
             <div className="flex items-center justify-between mb-2">
               <input 
                 type="text" 
                 value={properties.q || ''} 
                 onChange={(e) => setProperties({ ...properties, q: e.target.value })}
                 className="w-full text-gray-800 text-base font-medium border-none outline-none focus:ring-0 px-0 bg-transparent placeholder-gray-400"
                 placeholder="What is the question?"
               />
               <div className="w-8 h-8 rounded-full bg-[#EFEFEF] flex items-center justify-center text-gray-500 font-bold text-lg flex-shrink-0 ml-4 cursor-pointer hover:bg-gray-200">
                 +
               </div>
             </div>
             <div className="text-gray-600 text-[14px] mt-1 pl-2 border-l-2 border-gray-200 ml-1">
               {children}
             </div>
          </div>
        );
      }
    }
  ];

  const handleEditorClick = (e: React.MouseEvent) => {
    if (!onBlockSelect) return;
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'img') {
      onBlockSelect('Image');
    } else if (target.closest('.faq-block')) {
      onBlockSelect('FAQ Section');
    } else {
      // maybe onBlockSelect(null) to deselect? No, let's keep it simple as asked.
    }
  };

  return (
    <div className="mdx-editor-wrapper prose-editor" onClick={handleEditorClick}>
      <MDXEditor
        markdown={markdown}
        onChange={onChange}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          tablePlugin(),
          imagePlugin({ imageUploadHandler }),
          jsxPlugin({ jsxComponentDescriptors: customJsxDescriptors as any }),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex flex-wrap items-center gap-1 p-1">
                <UndoRedo />
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <BoldItalicUnderlineToggles />
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <BlockTypeSelect />
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <ListsToggle />
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
                <div className="w-px h-4 bg-gray-300 mx-1" />
                {/* Custom Insert Buttons for JSX Components */}
                <button 
                  onClick={() => {
                    onChange(markdown + '\n<FAQ>\n  <FAQItem q="New Question?">\n    Answer goes here.\n  </FAQItem>\n</FAQ>\n');
                  }}
                  className="px-2 py-1 text-sm font-semibold text-green-700 hover:bg-green-100 rounded"
                  title="Insert FAQ"
                >
                  FAQ
                </button>
                <button 
                  onClick={() => {
                    onChange(markdown + '\n<CTA text="Ready to get started?" link="/contact" buttonText="Contact Us" variant="light" />\n');
                  }}
                  className="px-2 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-100 rounded cursor-pointer"
                  title="Insert CTA"
                >
                  CTA
                </button>
                <div className="flex-1" />
                {/* 3-dots options menu */}
                <div className="relative" ref={optionsMenuRef}>
                   <button onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)} className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer">
                      <MoreVertical size={16} />
                   </button>
                   {isOptionsMenuOpen && (
                     <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md z-50 py-1 text-sm text-slate-700">
                        <div className="px-4 py-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Options</div>
                        <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center cursor-pointer text-[13px]" onClick={() => setIsOptionsMenuOpen(false)}><span>Settings</span><span className="text-[10px] text-slate-400">Ctrl+Shift+D</span></button>
                        <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center cursor-pointer text-[13px]" onClick={() => setIsOptionsMenuOpen(false)}><span>Duplicate</span><span className="text-[10px] text-slate-400">Ctrl+Shift+D</span></button>
                        <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center cursor-pointer text-[13px]" onClick={() => setIsOptionsMenuOpen(false)}><span>Insert before</span><span className="text-[10px] text-slate-400">Ctrl+Alt+T</span></button>
                        <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center cursor-pointer text-[13px]" onClick={() => setIsOptionsMenuOpen(false)}><span>Insert after</span><span className="text-[10px] text-slate-400">Ctrl+Alt+Y</span></button>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-[13px]" onClick={() => setIsOptionsMenuOpen(false)}>Edit as HTML</button>
                        <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-[13px]" onClick={() => setIsOptionsMenuOpen(false)}>Lock</button>
                        <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-[13px]" onClick={() => setIsOptionsMenuOpen(false)}>Add to Reusable blocks</button>
                        <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-[13px]" onClick={() => setIsOptionsMenuOpen(false)}>Group</button>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button className="w-full text-left px-4 py-1.5 hover:bg-red-50 text-red-600 flex justify-between items-center cursor-pointer text-[13px]" onClick={() => setIsOptionsMenuOpen(false)}><span>Remove block</span><span className="text-[10px] text-red-400">Del</span></button>
                     </div>
                   )}
                </div>
              </div>
            )
          })
        ]}
        contentEditableClassName="prose max-w-none min-h-[400px] p-4 bg-white"
      />
    </div>
  );
}
