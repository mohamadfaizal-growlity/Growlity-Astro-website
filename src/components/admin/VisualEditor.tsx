import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ComponentRegistry } from './ComponentRegistry';
import { Save, ArrowLeft, LayoutTemplate, Grid, Type, HelpCircle, GripVertical, Trash2, Settings2 } from 'lucide-react';

const iconMap: any = {
  LayoutTemplate: <LayoutTemplate size={18} />,
  Grid: <Grid size={18} />,
  Type: <Type size={18} />,
  HelpCircle: <HelpCircle size={18} />
};

interface BlockData {
  id: string; // unique instance id
  componentId: string; // matches ComponentRegistry id
  variant: string;
  data: any;
}

const SortableBlock = ({ block, isActive, onSelect, onDelete }: { block: BlockData, isActive: boolean, onSelect: () => void, onDelete: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });
  const componentDef = ComponentRegistry.find(c => c.id === block.componentId);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`group relative flex items-center p-4 mb-3 bg-white border-2 rounded-xl transition-all cursor-pointer shadow-sm
        ${isActive ? 'border-emerald-500 shadow-emerald-500/10' : 'border-slate-200 hover:border-slate-300'}
      `}
      onClick={onSelect}
    >
      <div 
        {...attributes} 
        {...listeners} 
        className="mr-4 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing p-1"
      >
        <GripVertical size={20} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          {componentDef?.icon && <span className="text-emerald-500">{iconMap[componentDef.icon]}</span>}
          {componentDef?.name || 'Unknown Block'}
        </div>
        <div className="text-xs text-slate-500 mt-1">Variant: {block.variant || 'Default'}</div>
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default function VisualEditor() {
  const { collection, slug } = useParams();
  const navigate = useNavigate();
  
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState<any>({});

  React.useEffect(() => {
    fetch(`/api/sitepins/content?collection=${collection}`)
      .then(res => res.json())
      .then(items => {
        const item = items.find((i: any) => i.slug === slug);
        if (item) {
          setItemData(item.data || {});
          if (item.data.blocks && Array.isArray(item.data.blocks)) {
            setBlocks(item.data.blocks);
          }
        }
        setLoading(false);
      });
  }, [collection, slug]);

  const handleSave = async () => {
    const updatedData = { ...itemData, blocks };
    await fetch('/api/sitepins/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection, slug, data: updatedData })
    });
    alert('Layout Saved!');
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addBlock = (componentId: string) => {
    const comp = ComponentRegistry.find(c => c.id === componentId);
    if (!comp) return;
    
    const newBlock: BlockData = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      componentId,
      variant: comp.variants[0]?.id || 'default',
      data: {}
    };
    
    setBlocks([...blocks, newBlock]);
    setActiveBlockId(newBlock.id);
  };

  const updateActiveBlockData = (field: string, value: any) => {
    setBlocks(blocks.map(b => {
      if (b.id === activeBlockId) {
        return { ...b, data: { ...b.data, [field]: value } };
      }
      return b;
    }));
  };

  const updateActiveBlockVariant = (variantId: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === activeBlockId) {
        return { ...b, variant: variantId };
      }
      return b;
    }));
  };

  const activeBlock = blocks.find(b => b.id === activeBlockId);
  const activeComponentDef = activeBlock ? ComponentRegistry.find(c => c.id === activeBlock.componentId) : null;

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* LEFT SIDEBAR: COMPONENTS LIBRARY */}
      <div className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-800 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-bold text-slate-800">Add Block</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {ComponentRegistry.map(comp => (
            <div 
              key={comp.id}
              onClick={() => addBlock(comp.id)}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-500/10 cursor-pointer transition-all bg-slate-50 hover:bg-white group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                {iconMap[comp.icon] || <LayoutTemplate size={20} />}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-slate-800 text-sm">{comp.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MIDDLE: CANVAS / BUILDER */}
      <div className="flex-1 flex flex-col relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="h-16 px-6 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between z-10 relative">
          <h1 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            Visual Builder <span className="text-xs font-normal px-2 py-1 bg-slate-100 rounded-md text-slate-500">{slug}</span>
          </h1>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Save size={18} />
            Save Layout
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 relative z-0">
          <div className="max-w-3xl mx-auto min-h-full">
            {blocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-300 rounded-2xl bg-white/50 text-slate-500">
                <LayoutTemplate size={48} className="mb-4 text-slate-300" />
                <p>Click a component on the left to add it to the canvas.</p>
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  {blocks.map(block => (
                    <SortableBlock 
                      key={block.id} 
                      block={block} 
                      isActive={activeBlockId === block.id}
                      onSelect={() => setActiveBlockId(block.id)}
                      onDelete={() => {
                        setBlocks(blocks.filter(b => b.id !== block.id));
                        if (activeBlockId === block.id) setActiveBlockId(null);
                      }}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: PROPERTIES / VARIANTS */}
      <div className="w-80 bg-white border-l border-slate-200 flex flex-col shadow-sm z-10">
        <div className="h-16 px-6 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
          <Settings2 size={18} className="text-slate-400" />
          <h2 className="font-bold text-slate-800">Properties</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {!activeBlock || !activeComponentDef ? (
            <div className="text-center text-slate-400 mt-10">
              <p>Select a block to edit its properties.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Variants Section */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Component Variant</label>
                <div className="grid grid-cols-1 gap-2">
                  {activeComponentDef.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => updateActiveBlockVariant(v.id)}
                      className={`text-left px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        activeBlock.variant === v.id 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' 
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Fields Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Content Data</label>
                {activeComponentDef.fields.map(field => (
                  <div key={field.name} className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        rows={4}
                        value={activeBlock.data[field.name] || ''}
                        onChange={(e) => updateActiveBlockData(field.name, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={activeBlock.data[field.name] || ''}
                        onChange={(e) => updateActiveBlockData(field.name, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
