import React from 'react';
import { X, AlertTriangle, FileText, CheckCircle, Search } from 'lucide-react';

interface SeoIssue {
  file: string;
  collection: string;
  title: string;
  issues: string[];
}

interface SeoReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: {
    scannedFiles: number;
    issuesCount: number;
    issues: SeoIssue[];
  } | null;
  loading: boolean;
}

export default function SeoReportModal({ isOpen, onClose, report, loading }: SeoReportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <Search size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Local Content SEO Scanner</h2>
              <p className="text-indigo-100 text-sm font-medium">Automatic Markdown Analysis</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-indigo-100 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto bg-slate-50/50">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-slate-500 font-medium">Scanning your local content files...</p>
            </div>
          ) : !report ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <AlertTriangle size={48} className="text-amber-400 mb-4" />
              <p>Failed to load the SEO report.</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-xl"><FileText size={24} /></div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Files Scanned</p>
                    <p className="text-2xl font-extrabold text-slate-800">{report.scannedFiles}</p>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl"><AlertTriangle size={24} /></div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total Issues</p>
                    <p className="text-2xl font-extrabold text-slate-800">{report.issuesCount}</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl"><CheckCircle size={24} /></div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Health Score</p>
                    <p className="text-2xl font-extrabold text-slate-800">
                      {Math.max(0, 100 - Math.round((report.issuesCount / (report.scannedFiles || 1)) * 10))}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Issue List */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    Files Requiring Attention <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full">{report.issues.length}</span>
                  </h3>
                </div>
                
                {report.issues.length === 0 ? (
                  <div className="p-8 text-center text-emerald-600 flex flex-col items-center gap-2">
                    <CheckCircle size={48} />
                    <p className="font-bold text-lg">Amazing! No SEO issues found.</p>
                    <p className="text-sm text-emerald-600/70">All your local markdown files are perfectly optimized.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {report.issues.map((item, idx) => (
                      <li key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-wider">{item.collection}</span>
                              <h4 className="font-bold text-slate-800">{item.title}</h4>
                            </div>
                            <p className="text-xs text-slate-400 font-mono">{item.file}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            {item.issues.map((issue, i) => (
                              <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100/50">
                                <AlertTriangle size={12} /> {issue}
                              </span>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
