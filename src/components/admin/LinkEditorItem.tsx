import React, { useState } from 'react';

interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  featured: boolean;
  accentColor?: string;
  is_active?: boolean;
}

interface LinkEditorItemProps {
  link: LinkItem;
  idx: number;
  onLinkChange: <K extends keyof LinkItem>(index: number, key: K, value: LinkItem[K]) => void;
  onDeleteLink: (index: number) => void;
  isDragActive?: boolean;
}

export default function LinkEditorItem({
  link,
  idx,
  onLinkChange,
  onDeleteLink,
  isDragActive = false
}: LinkEditorItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDeleteLink(idx);
    setShowConfirm(false);
  };

  return (
    <div className={`p-4 border rounded-xl transition-all space-y-4 relative ${
      isDragActive 
        ? 'bg-white/[0.03] border-[#af413c]/30 cursor-grab active:cursor-grabbing hover:border-[#af413c]/50'
        : 'bg-white/[0.01] border-white/[0.03] hover:border-white/[0.06]'
    }`}>
      {/* Fluent Modal Overlay */}
      {showConfirm && (
        <div className="absolute inset-0 bg-[#1e1d23]/98 backdrop-blur-md rounded-xl z-20 flex flex-col items-center justify-center p-4 text-center animate-fadeIn border border-rose-500/20">
          <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.243a3.003 3.003 0 0 0-3-2.731H12h-1.682a3.003 3.003 0 0 0-3 2.731M19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H8.25A2.25 2.25 0 0 1 6 18.75V14m12-6.875h-12" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Delete this item?</h3>
          <p className="text-xs text-white/40 mb-4 max-w-[280px]">This action cannot be undone. Are you sure you want to delete this link?</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-white/60 hover:text-white text-xs font-semibold rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-rose-600/20 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Header bar of link panel */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04] gap-4">
        <div className="flex items-center gap-2 flex-1">
          {/* Drag handle graphic indicator only when reordering is toggled */}
          {isDragActive && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-[#e8736e]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          )}
          <span className="text-[10px] font-bold text-white/20">#{idx + 1}</span>
          <input
            type="text"
            value={link.title}
            onChange={(e) => onLinkChange(idx, 'title', e.target.value)}
            className="bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#af413c]/50 text-sm font-bold text-white outline-none pb-0.5 flex-1 w-full"
            placeholder="Link Title"
            disabled={isDragActive}
          />
        </div>
        
        {/* Active state and Delete buttons */}
        <div className="flex items-center gap-1.5">
          {/* Active toggle */}
          <button
            onClick={() => onLinkChange(idx, 'is_active', !(link.is_active ?? true))}
            className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md border transition-all ${
              (link.is_active ?? true)
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-white/[0.04] border-white/[0.06] text-white/30'
            }`}
            disabled={isDragActive}
          >
            {(link.is_active ?? true) ? 'Active' : 'Hidden'}
          </button>

          {/* Delete link */}
          <button
            onClick={handleDeleteClick}
            className="p-1 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-white/30 hover:text-rose-400 rounded-lg transition-all ml-1"
            title="Delete Link"
            disabled={isDragActive}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.243a3.003 3.003 0 0 0-3-2.731H12h-1.682a3.003 3.003 0 0 0-3 2.731M19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H8.25A2.25 2.25 0 0 1 6 18.75V14m12-6.875h-12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Inputs panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Description</label>
          <input
            type="text"
            value={link.description}
            onChange={(e) => onLinkChange(idx, 'description', e.target.value)}
            className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="Subtitle text"
            disabled={isDragActive}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Destination URL</label>
          <input
            type="text"
            value={link.url}
            onChange={(e) => onLinkChange(idx, 'url', e.target.value)}
            className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="https://..."
            disabled={isDragActive}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Icon Category</label>
          <select
            value={link.icon}
            onChange={(e) => onLinkChange(idx, 'icon', e.target.value)}
            className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            disabled={isDragActive}
          >
            <option value="globe">Globe (Website)</option>
            <option value="youtube">YouTube</option>
            <option value="figma">Figma</option>
            <option value="github">GitHub</option>
            <option value="newsletter">Newsletter/Email</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Accent HEX Color</label>
            <input
              type="text"
              value={link.accentColor || ''}
              onChange={(e) => onLinkChange(idx, 'accentColor', e.target.value)}
              className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
              placeholder="#6366f1"
              disabled={isDragActive}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1 text-center">Featured</label>
            <div className="flex justify-center pt-2">
              <input
                type="checkbox"
                checked={link.featured}
                onChange={(e) => onLinkChange(idx, 'featured', e.target.checked)}
                className="w-4 h-4 rounded bg-white/[0.02] border-white/[0.06] accent-[#af413c] cursor-pointer"
                disabled={isDragActive}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
