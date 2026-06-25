import React from 'react';
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
}

export default function MDXEditorComponent({ markdown, onChange, onUploadImage }: MDXEditorComponentProps) {
  
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
          <div className="p-4 border border-green-200 rounded-lg bg-green-50 my-4 relative">
            <div className="absolute -top-3 left-4 bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">
              FAQ Section
            </div>
            <div className="mt-4">
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
          <div className="p-3 border rounded bg-white my-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Question:</label>
            <input 
              type="text" 
              value={properties.q || ''} 
              onChange={(e) => setProperties({ ...properties, q: e.target.value })}
              className="w-full px-3 py-2 border rounded-md text-sm mb-3 bg-gray-50"
              placeholder="Enter question here..."
            />
            <label className="block text-xs font-semibold text-gray-700 mb-1">Answer:</label>
            <div className="border border-dashed border-gray-300 p-2 rounded">
              {children}
            </div>
          </div>
        );
      }
    }
  ];

  return (
    <div className="mdx-editor-wrapper prose-editor">
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
                  className="px-2 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-100 rounded"
                  title="Insert CTA"
                >
                  CTA
                </button>
              </div>
            )
          })
        ]}
        contentEditableClassName="prose max-w-none min-h-[400px] p-4 bg-white"
      />
    </div>
  );
}
