import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  MoreVertical, ChevronDown, List as ListIcon, Plus, 
  Pilcrow, ChevronUp, AlignLeft, AtSign, ListEnd, 
  Droplet, Code, Image as ImageIcon, Keyboard, Languages, 
  FunctionSquare, MousePointer2, Strikethrough, Subscript, Superscript,
  ChevronsLeft, Heading, Quote, Square, Columns, 
  MenuSquare, LayoutTemplate, TextQuote, PenLine
} from 'lucide-react';
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
  usePublisher,
  insertMarkdown$
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

const CustomInsertButtons = () => {
  const insertMarkdown = usePublisher(insertMarkdown$);
  return (
    <>
      <button 
        onClick={() => {
          insertMarkdown('\n<FAQ>\n  <FAQItem q="New Question?">\n    Answer goes here.\n  </FAQItem>\n</FAQ>\n');
        }}
        className="px-2 h-7 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded transition-all cursor-pointer mx-0.5"
        title="Insert FAQ Block"
      >
        FAQ
      </button>
      <button 
        onClick={() => {
          insertMarkdown('\n<CTA text="Ready to get started?" link="/contact" buttonText="Contact Us" variant="light" />\n');
        }}
        className="px-2 h-7 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-all cursor-pointer mx-0.5"
        title="Insert CTA Block"
      >
        CTA
      </button>
    </>
  );
};

interface MDXEditorComponentProps {
  markdown: string;
  onChange: (markdown: string) => void;
  onUploadImage?: (file: File) => Promise<string>;
  onBlockSelect?: (blockType: 'Image' | 'FAQ Section' | null) => void;
}

export default function MDXEditorComponent({ markdown, onChange, onUploadImage, onBlockSelect }: MDXEditorComponentProps) {
  
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const optionsMenuRef = useRef<HTMLDivElement>(null);
  const [isRichTextMenuOpen, setIsRichTextMenuOpen] = useState(false);
  const richTextMenuRef = useRef<HTMLDivElement>(null);
  const [isBlockTransformMenuOpen, setIsBlockTransformMenuOpen] = useState(false);
  const blockTransformMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target as Node)) {
        setIsOptionsMenuOpen(false);
      }
      if (richTextMenuRef.current && !richTextMenuRef.current.contains(event.target as Node)) {
        setIsRichTextMenuOpen(false);
      }
      if (blockTransformMenuRef.current && !blockTransformMenuRef.current.contains(event.target as Node)) {
        setIsBlockTransformMenuOpen(false);
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

  // A helper component to render dropdowns using fixed positioning to escape overflow hidden containers
  const PortalDropdown = ({ isOpen, onClose, triggerRef, children, align = 'left' }: any) => {
    const [style, setStyle] = useState({});
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setStyle({
          position: 'fixed',
          top: rect.bottom + 4 + 'px',
          left: align === 'left' ? rect.left + 'px' : 'auto',
          right: align === 'right' ? (window.innerWidth - rect.right) + 'px' : 'auto',
          zIndex: 99999,
        });
      }
    }, [isOpen, triggerRef, align]);

    if (!isOpen || !mounted) return null;
    return createPortal(
      <div style={style} className="bg-white border border-slate-200 shadow-xl rounded-md py-1 text-slate-700 min-w-[160px] max-w-[220px]">
        {children}
      </div>,
      document.body
    );
  };

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
          <div className="faq-block my-6 bg-white relative py-12 px-8 cursor-text border border-gray-200 focus-within:border-[#0073AA] rounded-sm transition-colors shadow-sm">
             <div className="text-center mb-6">
               <h3 className="text-[#0073AA] font-bold text-lg mb-2">FAQs</h3>
             </div>
             
             {/* The texable area for children */}
             <div className="text-left w-full mx-auto max-w-4xl min-h-[100px] border border-dashed border-gray-300 rounded p-6 bg-gray-50 focus-within:bg-white focus-within:border-[#0073AA] focus-within:border-solid transition-colors relative">
               <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center z-0 opacity-50 text-4xl font-bold text-gray-500">
                 Add Content...
               </div>
               <div className="relative z-10 min-h-[60px]">
                 {children}
               </div>
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
        // Use a ref to store a unique ID for this instance
        const idRef = useRef(Math.random().toString(36).substr(2, 9));
        const [isOpen, setIsOpen] = useState(false);

        useEffect(() => {
          const handleOpen = (e: any) => {
            if (e.detail.id !== idRef.current) {
              setIsOpen(false);
            }
          };
          window.addEventListener('faq-item-opened', handleOpen);
          return () => window.removeEventListener('faq-item-opened', handleOpen);
        }, []);

        const toggleOpen = () => {
          const newState = !isOpen;
          setIsOpen(newState);
          if (newState) {
            window.dispatchEvent(new CustomEvent('faq-item-opened', { detail: { id: idRef.current } }));
          }
        };

        return (
          <div className={`border-b ${isOpen ? 'border-[#0073AA]' : 'border-gray-400'} py-4 mb-2 bg-white flex flex-col group faq-item transition-colors`}>
             <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={toggleOpen}>
               <input 
                 type="text" 
                 value={properties.q || ''} 
                 onChange={(e) => setProperties({ ...properties, q: e.target.value })}
                 onClick={(e) => { e.stopPropagation(); if (!isOpen) toggleOpen(); }}
                 className={`w-full ${isOpen ? 'text-[#0073AA]' : 'text-gray-700'} focus:text-[#0073AA] text-lg font-medium border-none outline-none focus:ring-0 px-0 bg-transparent placeholder-gray-400 transition-colors`}
                 placeholder="What is the question?"
               />
               <div className={`w-8 h-8 rounded-full ${isOpen ? 'bg-[#0073AA] text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center font-medium flex-shrink-0 ml-4 cursor-pointer transition-colors shadow-sm`}>
                 <Plus size={16} />
               </div>
             </div>
             {isOpen && (
               <div className="text-gray-600 text-[13px] mt-2 leading-relaxed opacity-100 transition-opacity">
                 {children}
               </div>
             )}
             {!isOpen && (
               <div className="hidden">
                 {children}
               </div>
             )}
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
              <div className="flex flex-wrap items-center gap-1 p-1 w-full">
                {/* WordPress-like Left Icons */}
                <button className="w-7 h-7 rounded flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer shadow-sm mx-0.5">
                   <Plus size={12} />
                </button>
                <UndoRedo />
                <button 
                  className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer mx-0.5" 
                  title="Document Overview"
                  onClick={() => alert('Document Overview feature coming soon.')}
                >
                   <ListIcon size={12} />
                </button>
                <button 
                  className="px-2.5 h-7 mx-0.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-[10px] uppercase tracking-wide rounded transition-all flex items-center cursor-pointer shadow-sm"
                  onClick={() => alert('Edit with Bricks feature coming soon.')}
                >
                   Edit with Bricks
                </button>
                
                <div className="w-px h-4 bg-slate-300 mx-0.5" />
                
                 {/* Block Transform Menu */}
                <div className="relative mx-0.5" ref={blockTransformMenuRef}>
                   <button 
                     onClick={() => setIsBlockTransformMenuOpen(!isBlockTransformMenuOpen)} 
                     className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
                     title="Transform To"
                   >
                      <Pilcrow size={12} />
                   </button>
                   <PortalDropdown isOpen={isBlockTransformMenuOpen} onClose={() => setIsBlockTransformMenuOpen(false)} triggerRef={blockTransformMenuRef} align="left">
                        <div className="px-3 py-1 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Transform to</div>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => setIsBlockTransformMenuOpen(false)}><Heading size={14} className="text-slate-400"/> Heading</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => setIsBlockTransformMenuOpen(false)}><ListIcon size={14} className="text-slate-400"/> List</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => setIsBlockTransformMenuOpen(false)}><Quote size={14} className="text-slate-400"/> Quote</button>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => setIsBlockTransformMenuOpen(false)}><Square size={14} className="text-slate-400"/> Preformatted</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => setIsBlockTransformMenuOpen(false)}><Code size={14} className="text-slate-400"/> Code</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => setIsBlockTransformMenuOpen(false)}><Columns size={14} className="text-slate-400"/> Columns</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => setIsBlockTransformMenuOpen(false)}><MenuSquare size={14} className="text-slate-400"/> Details</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => setIsBlockTransformMenuOpen(false)}><LayoutTemplate size={14} className="text-slate-400"/> Group</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => setIsBlockTransformMenuOpen(false)}><TextQuote size={14} className="text-slate-400"/> Pullquote</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => setIsBlockTransformMenuOpen(false)}><PenLine size={14} className="text-slate-400"/> Poetry</button>
                   </PortalDropdown>
                </div>

                {/* Move Block Up/Down */}
                <div className="flex h-7 bg-white border border-slate-200 rounded overflow-hidden mx-0.5 shadow-sm">
                   <button 
                     className="px-1.5 flex items-center justify-center hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                     title="Move Up"
                     onClick={() => alert('Move block up coming soon.')}
                   >
                     <ChevronUp size={10} />
                   </button>
                   <button 
                     className="px-1.5 flex items-center justify-center border-l border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                     title="Move Down"
                     onClick={() => alert('Move block down coming soon.')}
                   >
                     <ChevronDown size={10} />
                   </button>
                </div>
                
                <div className="w-px h-4 bg-slate-300 mx-0.5" />
                
                {/* Align and AtSign */}
                <button 
                  className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer mx-0.5"
                  onClick={() => alert('Alignment options coming soon.')}
                >
                   <AlignLeft size={12} />
                </button>
                <button 
                  className="w-7 h-7 flex items-center justify-center rounded text-[#a533a1] hover:bg-purple-50 transition-all cursor-pointer mx-0.5"
                  onClick={() => alert('Mention/AtSign feature coming soon.')}
                >
                   <AtSign size={12} />
                </button>
                
                <div className="w-px h-4 bg-slate-300 mx-0.5" />
                
                <BoldItalicUnderlineToggles />
                <CreateLink />

                {/* Rich text options dropdown */}
                <div className="relative mx-0.5" ref={richTextMenuRef}>
                   <button onClick={() => setIsRichTextMenuOpen(!isRichTextMenuOpen)} className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer">
                      <ChevronDown size={12} />
                   </button>
                   <PortalDropdown isOpen={isRichTextMenuOpen} onClose={() => setIsRichTextMenuOpen(false)} triggerRef={richTextMenuRef} align="left">
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => { onChange(markdown + '\n[^1]: Footnote\n'); setIsRichTextMenuOpen(false); }}><ListEnd size={14} className="text-slate-400"/> Footnote</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => { onChange(markdown + ' <mark>highlight</mark> '); setIsRichTextMenuOpen(false); }}><Droplet size={14} className="text-slate-400"/> Highlight</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => { onChange(markdown + ' `code` '); setIsRichTextMenuOpen(false); }}><Code size={14} className="text-slate-400"/> Inline code</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => { setIsRichTextMenuOpen(false); alert('Inline image feature coming soon.'); }}><ImageIcon size={14} className="text-slate-400"/> Inline image</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => { onChange(markdown + ' <kbd>Ctrl</kbd> '); setIsRichTextMenuOpen(false); }}><Keyboard size={14} className="text-slate-400"/> Keyboard input</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => { setIsRichTextMenuOpen(false); alert('Language feature coming soon.'); }}><Languages size={14} className="text-slate-400"/> Language</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => { setIsRichTextMenuOpen(false); alert('Math feature coming soon.'); }}><FunctionSquare size={14} className="text-slate-400"/> Math</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px] text-emerald-600" onClick={() => { setIsRichTextMenuOpen(false); alert('Popup Trigger feature coming soon.'); }}><MousePointer2 size={14} className="text-emerald-500"/> Popup Trigger</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => { onChange(markdown + ' ~~strikethrough~~ '); setIsRichTextMenuOpen(false); }}><Strikethrough size={14} className="text-slate-400"/> Strikethrough</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => { onChange(markdown + ' <sub>sub</sub> '); setIsRichTextMenuOpen(false); }}><Subscript size={14} className="text-slate-400"/> Subscript</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[12px]" onClick={() => { onChange(markdown + ' <sup>sup</sup> '); setIsRichTextMenuOpen(false); }}><Superscript size={14} className="text-slate-400"/> Superscript</button>
                   </PortalDropdown>
                </div>

                <div className="w-px h-4 bg-slate-300 mx-0.5" />
                <BlockTypeSelect />
                <ListsToggle />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
                <div className="w-px h-4 bg-slate-300 mx-0.5" />
                {/* Custom Insert Buttons for JSX Components */}
                <CustomInsertButtons />

                {/* 3-dots options menu */}
                <div className="relative flex items-center gap-0.5 mx-0.5" ref={optionsMenuRef}>
                   <button onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all cursor-pointer">
                      <MoreVertical size={12} />
                   </button>
                   <PortalDropdown isOpen={isOptionsMenuOpen} onClose={() => setIsOptionsMenuOpen(false)} triggerRef={optionsMenuRef} align="right">
                        <div className="px-3 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Options</div>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center cursor-pointer text-[12px]" onClick={() => setIsOptionsMenuOpen(false)}><span>Settings</span><span className="text-[10px] text-slate-400">Ctrl+Shift+D</span></button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center cursor-pointer text-[12px]" onClick={() => setIsOptionsMenuOpen(false)}><span>Duplicate</span><span className="text-[10px] text-slate-400">Ctrl+Shift+D</span></button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center cursor-pointer text-[12px]" onClick={() => setIsOptionsMenuOpen(false)}><span>Insert before</span><span className="text-[10px] text-slate-400">Ctrl+Alt+T</span></button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center cursor-pointer text-[12px]" onClick={() => setIsOptionsMenuOpen(false)}><span>Insert after</span><span className="text-[10px] text-slate-400">Ctrl+Alt+Y</span></button>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-[12px]" onClick={() => setIsOptionsMenuOpen(false)}>Edit as HTML</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-[12px]" onClick={() => setIsOptionsMenuOpen(false)}>Lock</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-[12px]" onClick={() => setIsOptionsMenuOpen(false)}>Add to Reusable blocks</button>
                        <button className="w-full text-left px-3 py-1 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-[12px]" onClick={() => setIsOptionsMenuOpen(false)}>Group</button>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button className="w-full text-left px-3 py-1 hover:bg-red-50 text-red-600 flex justify-between items-center cursor-pointer text-[12px]" onClick={() => setIsOptionsMenuOpen(false)}><span>Remove block</span><span className="text-[10px] text-red-400">Del</span></button>
                   </PortalDropdown>
                   <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all cursor-pointer">
                      <ChevronsLeft size={12} />
                   </button>
                </div>
              </div>
            )
          })
        ]}
        contentEditableClassName="prose max-w-none min-h-[400px] p-4 bg-white"
      />
      <style>{`
        .mdxeditor-root,
        .mdxeditor-root * {
          /* Force everything in the toolbar header to be visible so dropdowns aren't clipped */
        }
        .mdx-editor-wrapper .mdxeditor-root {
          overflow: visible !important;
        }
        .mdx-editor-wrapper .mdxeditor-root > div:first-child,
        .mdx-editor-wrapper .mdxeditor-root > div:first-child * {
          overflow: visible !important;
        }
        .mdx-editor-wrapper [role="toolbar"],
        .mdx-editor-wrapper [data-mdxeditor-toolbar],
        .mdx-editor-wrapper .mdxeditor-toolbar {
          height: auto !important;
          min-height: 40px !important;
          background-color: #f8fafc !important;
          border-bottom: 1px solid #e2e8f0 !important;
          overflow: visible !important;
          flex-wrap: wrap !important;
          padding: 6px 10px !important;
          z-index: 40 !important;
        }
        .mdx-editor-wrapper [role="toolbar"] > div,
        .mdx-editor-wrapper [data-mdxeditor-toolbar] > div {
          flex-wrap: wrap !important;
          overflow: visible !important;
          gap: 10px !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .mdx-editor-wrapper button[class*="mdxeditor-toolbar-button"]:not([role="combobox"]),
        .mdx-editor-wrapper button[aria-label]:not([role="combobox"]) {
          width: 28px !important;
          height: 28px !important;
          border-radius: 4px !important;
          color: #475569 !important;
          transition: all 0.2s !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
        }
        .mdx-editor-wrapper button[class*="mdxeditor-toolbar-button"]:hover:not([role="combobox"]),
        .mdx-editor-wrapper button[aria-label]:hover:not([role="combobox"]) {
          background-color: #f1f5f9 !important;
          color: #0f172a !important;
        }
        .mdx-editor-wrapper button[class*="mdxeditor-toolbar-button"] svg,
        .mdx-editor-wrapper button[aria-label] svg {
          width: 14px !important;
          height: 14px !important;
        }
        .mdx-editor-wrapper button[role="combobox"] {
          height: 28px !important;
          border-radius: 4px !important;
          border: 1px solid #cbd5e1 !important;
          color: #334155 !important;
          font-size: 11px !important;
          padding: 0 6px !important;
          background-color: white !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
          min-width: 90px !important;
        }
        .mdx-editor-wrapper select {
          height: 28px !important;
          border-radius: 4px !important;
          border: 1px solid #cbd5e1 !important;
          color: #334155 !important;
          font-size: 11px !important;
          padding: 0 20px 0 6px !important;
          line-height: 28px !important;
          background-color: white !important;
          cursor: pointer !important;
        }
        /* Fix for Radix ScrollArea clipping absolute positioned dropdowns */
        .mdx-editor-wrapper [data-radix-scroll-area-viewport] {
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
}
