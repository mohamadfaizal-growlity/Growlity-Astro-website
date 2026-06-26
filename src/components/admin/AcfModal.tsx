import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

export type AcfModalType = 'partnerDataCard' | 'consultingServices' | 'faq' | null;

interface AcfModalProps {
  type: AcfModalType;
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  onDataChange: (newData: any[]) => void;
}

export default function AcfModal({ type, isOpen, onClose, data, onDataChange }: AcfModalProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  if (!isOpen || !type) return null;

  const titles = {
    partnerDataCard: 'Patner Data Card',
    consultingServices: 'consulting_services',
    faq: 'Faq'
  };

  const emptyRows = {
    partnerDataCard: { logo: '', url: '', name: '', description: '', number: '' },
    consultingServices: { heading: '', textArea: '', number: '', image: '' },
    faq: { question: '', answer: '' }
  };

  const columns = {
    partnerDataCard: ['Patner Card logo', 'Patner Card url', 'Patner Card Name', 'Patner Card Discription', 'Patner Card Number'],
    consultingServices: ['Heading', 'Text area', 'Number', 'Image'],
    faq: ['Question', 'Answer']
  };

  const handleAddRow = (index?: number) => {
    const newRow = { ...emptyRows[type] };
    if (index !== undefined) {
       const newData = [...data];
       newData.splice(index + 1, 0, newRow);
       onDataChange(newData);
    } else {
       onDataChange([...data, newRow]);
    }
  };

  const handleDeleteRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    onDataChange(newData);
  };

  const updateCell = (index: number, field: string, value: string) => {
    const newData = [...data];
    newData[index][field] = value;
    onDataChange(newData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[999999] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-7xl h-[85vh] rounded shadow-2xl flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 shrink-0">
          <h2 className="text-lg font-bold text-slate-800">{titles[type]}</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 relative custom-scrollbar">
           <div className="bg-white border border-slate-200 rounded max-w-[95%] mx-auto">
             {/* Table Header */}
             <div className="flex items-center border-b border-slate-200 bg-white font-bold text-[13px] text-slate-800">
                {type === 'faq' && (
                   <div className="w-16 shrink-0 py-3 px-4 border-r border-slate-200 text-center"></div>
                )}
                {columns[type].map((col, i) => (
                   <div key={col} className={`flex-1 py-3 px-4 ${i !== columns[type].length - 1 ? 'border-r border-slate-200' : ''}`}>
                     {col}
                   </div>
                ))}
             </div>

             {/* Table Rows */}
             {data.map((row, index) => (
                <div 
                  key={index} 
                  className="flex items-stretch border-b border-slate-200 bg-white relative group"
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                   {type === 'faq' && (
                     <div className="w-16 shrink-0 p-3 border-r border-slate-200 flex items-center justify-center text-sm font-medium text-slate-700">
                        {index + 1}
                     </div>
                   )}
                   
                   {Object.keys(emptyRows[type]).map((field, i, arr) => (
                      <div key={field} className={`flex-1 p-2 ${i !== arr.length - 1 ? 'border-r border-slate-200' : ''}`}>
                         <input 
                           type="text" 
                           value={row[field] || ''}
                           onChange={(e) => updateCell(index, field, e.target.value)}
                           className="w-full h-full min-h-[40px] px-3 py-2 border border-slate-300 rounded text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                           placeholder={``}
                         />
                      </div>
                   ))}

                   {/* Hover Actions */}
                   {hoveredRow === index && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full ml-2 flex flex-col gap-1 z-10 p-1.5 border border-red-200 bg-white shadow-sm rounded-sm">
                         <button onClick={() => handleAddRow(index)} className="p-1 hover:bg-slate-100 rounded-full border border-slate-300 text-slate-500 bg-white flex items-center justify-center cursor-pointer" title="Add Row Below">
                           <Plus size={12} />
                         </button>
                         <button onClick={() => handleDeleteRow(index)} className="p-1 hover:bg-slate-100 rounded-full border border-slate-300 text-slate-500 bg-white flex items-center justify-center cursor-pointer" title="Delete Row">
                           <Minus size={12} />
                         </button>
                      </div>
                   )}
                </div>
             ))}
             
             {data.length === 0 && (
                <div className="p-8 text-center text-slate-500 text-sm italic bg-white">
                  No data added yet. Click "Add Row" to start.
                </div>
             )}
           </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200 shrink-0 bg-white">
           <button onClick={onClose} className="px-5 py-2 border border-blue-500 text-blue-500 hover:bg-blue-50 text-[13px] rounded font-medium transition-colors cursor-pointer bg-white">
             Close
           </button>
           <button onClick={() => handleAddRow()} className="px-6 py-2 bg-[#3b82f6] hover:bg-blue-600 text-white text-[13px] rounded font-medium transition-colors cursor-pointer">
             Add Row
           </button>
        </div>
        
      </div>
    </div>
  );
}
