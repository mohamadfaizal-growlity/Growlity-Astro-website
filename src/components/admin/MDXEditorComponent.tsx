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
      <div style={style} className="bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md py-1 text-sm text-slate-700 min-w-[200px]">
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
                {/* WordPress-like Left Icons */}
                <button className="w-6 h-6 rounded flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer mx-1">
                   <Plus size={14} />
                </button>
                <UndoRedo />
                <button 
                  className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer mx-0.5" 
                  title="Document Overview"
                  onClick={() => alert('Document Overview feature coming soon.')}
                >
                   <ListIcon size={16} />
                </button>
                <button 
                  className="px-2 h-7 mx-1 bg-[#ffb800] hover:bg-[#e6a600] text-black font-bold text-[10px] uppercase rounded transition-colors cursor-pointer flex items-center"
                  onClick={() => alert('Edit with Bricks feature coming soon.')}
                >
                   Edit with Bricks
                </button>
                
                <div className="w-px h-4 bg-gray-300 mx-1" />
                
                 {/* Block Transform Menu */}
                <div className="relative mx-0.5" ref={blockTransformMenuRef}>
                   <button 
                     onClick={() => setIsBlockTransformMenuOpen(!isBlockTransformMenuOpen)} 
                     className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                     title="Transform To"
                   >
                      <Pilcrow size={16} />
                   </button>
                   <PortalDropdown isOpen={isBlockTransformMenuOpen} onClose={() => setIsBlockTransformMenuOpen(false)} triggerRef={blockTransformMenuRef} align="left">
                        <div className="px-3 py-1.5 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Transform to</div>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => setIsBlockTransformMenuOpen(false)}><Heading size={14} className="text-slate-400"/> Heading</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => setIsBlockTransformMenuOpen(false)}><ListIcon size={14} className="text-slate-400"/> List</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => setIsBlockTransformMenuOpen(false)}><Quote size={14} className="text-slate-400"/> Quote</button>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => setIsBlockTransformMenuOpen(false)}><Square size={14} className="text-slate-400"/> Preformatted</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => setIsBlockTransformMenuOpen(false)}><Code size={14} className="text-slate-400"/> Code</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => setIsBlockTransformMenuOpen(false)}><Columns size={14} className="text-slate-400"/> Columns</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => setIsBlockTransformMenuOpen(false)}><MenuSquare size={14} className="text-slate-400"/> Details</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => setIsBlockTransformMenuOpen(false)}><LayoutTemplate size={14} className="text-slate-400"/> Group</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => setIsBlockTransformMenuOpen(false)}><TextQuote size={14} className="text-slate-400"/> Pullquote</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => setIsBlockTransformMenuOpen(false)}><PenLine size={14} className="text-slate-400"/> Poetry</button>
                   </PortalDropdown>
                </div>

                {/* Move Block Up/Down */}
                <div className="flex flex-col justify-center items-center h-7 mx-0.5 border border-slate-200 rounded text-slate-600 bg-white">
                   <button 
                     className="flex-1 px-1 hover:bg-slate-200 transition-colors cursor-pointer rounded-t"
                     title="Move Up"
                     onClick={() => alert('Move block up coming soon.')}
                   >
                     <ChevronUp size={10} className="text-slate-500" />
                   </button>
                   <button 
                     className="flex-1 px-1 hover:bg-slate-200 transition-colors cursor-pointer rounded-b"
                     title="Move Down"
                     onClick={() => alert('Move block down coming soon.')}
                   >
                     <ChevronDown size={10} className="text-slate-500" />
                   </button>
                </div>
                
                <div className="w-px h-4 bg-gray-300 mx-1" />
                
                {/* Align and AtSign */}
                <button 
                  className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer mx-0.5"
                  onClick={() => alert('Alignment options coming soon.')}
                >
                   <AlignLeft size={16} />
                </button>
                <button 
                  className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200 transition-colors cursor-pointer text-[#a533a1] mx-0.5"
                  onClick={() => alert('Mention/AtSign feature coming soon.')}
                >
                   <AtSign size={16} />
                </button>
                
                <div className="w-px h-4 bg-gray-300 mx-1" />
                
                <BoldItalicUnderlineToggles />
                <CreateLink />

                {/* Rich text options dropdown */}
                <div className="relative mx-0.5" ref={richTextMenuRef}>
                   <button onClick={() => setIsRichTextMenuOpen(!isRichTextMenuOpen)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer">
                      <ChevronDown size={14} />
                   </button>
                   <PortalDropdown isOpen={isRichTextMenuOpen} onClose={() => setIsRichTextMenuOpen(false)} triggerRef={richTextMenuRef} align="left">
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => { onChange(markdown + '\n[^1]: Footnote\n'); setIsRichTextMenuOpen(false); }}><ListEnd size={14} className="text-slate-400"/> Footnote</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => { onChange(markdown + ' <mark>highlight</mark> '); setIsRichTextMenuOpen(false); }}><Droplet size={14} className="text-slate-400"/> Highlight</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => { onChange(markdown + ' `code` '); setIsRichTextMenuOpen(false); }}><Code size={14} className="text-slate-400"/> Inline code</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => { setIsRichTextMenuOpen(false); alert('Inline image feature coming soon.'); }}><ImageIcon size={14} className="text-slate-400"/> Inline image</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => { onChange(markdown + ' <kbd>Ctrl</kbd> '); setIsRichTextMenuOpen(false); }}><Keyboard size={14} className="text-slate-400"/> Keyboard input</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => { setIsRichTextMenuOpen(false); alert('Language feature coming soon.'); }}><Languages size={14} className="text-slate-400"/> Language</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => { setIsRichTextMenuOpen(false); alert('Math feature coming soon.'); }}><FunctionSquare size={14} className="text-slate-400"/> Math</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px] text-emerald-600" onClick={() => { setIsRichTextMenuOpen(false); alert('Popup Trigger feature coming soon.'); }}><MousePointer2 size={14} className="text-emerald-500"/> Popup Trigger</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => { onChange(markdown + ' ~~strikethrough~~ '); setIsRichTextMenuOpen(false); }}><Strikethrough size={14} className="text-slate-400"/> Strikethrough</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => { onChange(markdown + ' <sub>sub</sub> '); setIsRichTextMenuOpen(false); }}><Subscript size={14} className="text-slate-400"/> Subscript</button>
                        <button className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-[13px]" onClick={() => { onChange(markdown + ' <sup>sup</sup> '); setIsRichTextMenuOpen(false); }}><Superscript size={14} className="text-slate-400"/> Superscript</button>
                   </PortalDropdown>
                </div>

                <div className="w-px h-4 bg-gray-300 mx-1" />
                <BlockTypeSelect />
                <ListsToggle />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
                <div className="w-px h-4 bg-gray-300 mx-1" />
                {/* Custom Insert Buttons for JSX Components */}
                <button 
                  onClick={() => {
                    onChange(markdown + '\n<FAQ>\n  <FAQItem q="New Question?">\n    Answer goes here.\n  </FAQItem>\n</FAQ>\n');
                  }}
                  className="px-2 py-1 text-sm font-semibold text-green-700 hover:bg-green-100 rounded cursor-pointer mx-0.5"
                  title="Insert FAQ"
                >
                  FAQ
                </button>
                <button 
                  onClick={() => {
                    onChange(markdown + '\n<CTA text="Ready to get started?" link="/contact" buttonText="Contact Us" variant="light" />\n');
                  }}
                  className="px-2 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-100 rounded cursor-pointer mx-0.5"
                  title="Insert CTA"
                >
                  CTA
                </button>

                {/* 3-dots options menu - Removed flex-1 to keep it aligned with rest of icons */}
                <div className="relative flex items-center gap-1 mx-1" ref={optionsMenuRef}>
                   <button onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)} className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer">
                      <MoreVertical size={16} />
                   </button>
                   <PortalDropdown isOpen={isOptionsMenuOpen} onClose={() => setIsOptionsMenuOpen(false)} triggerRef={optionsMenuRef} align="right">
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
                   </PortalDropdown>
                   <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer ml-1">
                      <ChevronsLeft size={16} />
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
          min-height: 48px !important;
          overflow: visible !important;
          flex-wrap: wrap !important;
          padding: 4px 8px !important;
          z-index: 40 !important;
        }
        .mdx-editor-wrapper [role="toolbar"] > div,
        .mdx-editor-wrapper [data-mdxeditor-toolbar] > div {
          flex-wrap: wrap !important;
          overflow: visible !important;
        }
        /* Fix for Radix ScrollArea clipping absolute positioned dropdowns */
        .mdx-editor-wrapper [data-radix-scroll-area-viewport] {
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
}
