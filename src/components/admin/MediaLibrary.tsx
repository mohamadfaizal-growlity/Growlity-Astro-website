import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Copy, Check, Trash2, Image as ImageIcon } from 'lucide-react';

export default function MediaLibrary() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/sitepins/upload');
      const data = await res.json();
      if (data.resources) {
        setImages(data.resources);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/sitepins/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        // Refresh library
        fetchImages();
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (e) {
      alert('Upload error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(`![](${url})`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-8 pb-32">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ImageIcon className="text-[#0066FF]" /> Media Library
          </h1>
          <p className="text-slate-500 mt-2">Manage your Cloudinary uploads</p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          accept="image/*" 
          className="hidden" 
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#00C853] hover:from-[#0052CC] hover:to-[#00A844] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50"
        >
          <UploadCloud size={20} />
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading images...</div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-20 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
            <ImageIcon size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No media found</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            You haven't uploaded any images yet. Click the upload button above to add images to your Cloudinary storage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {images.map((img) => (
            <div key={img.public_id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all">
              <div className="aspect-video w-full bg-slate-100 overflow-hidden relative">
                <img 
                  src={img.secure_url} 
                  alt={img.public_id} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="text-xs text-slate-500 truncate pr-4" title={img.public_id}>
                  {img.public_id.split('/').pop()}
                </div>
                <button 
                  onClick={() => copyToClipboard(img.secure_url, img.public_id)}
                  className={`p-1.5 rounded-md transition-colors ${copiedId === img.public_id ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600 hover:bg-[#0066FF] hover:text-white'}`}
                  title="Copy Markdown format"
                >
                  {copiedId === img.public_id ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
