import React from 'react';
import LinkEditorItem from './LinkEditorItem';

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

interface LinksManagerProps {
  links: LinkItem[];
  onAddLink: () => void;
  onLinkChange: <K extends keyof LinkItem>(index: number, key: K, value: LinkItem[K]) => void;
  onMoveLink: (index: number, direction: 'up' | 'down') => void;
  onDeleteLink: (index: number) => void;
}

export default function LinksManager({
  links,
  onAddLink,
  onLinkChange,
  onMoveLink,
  onDeleteLink
}: LinksManagerProps) {
  return (
    <div className="bg-slate-950/40 border border-slate-900/60 p-6 rounded-3xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Manage Links ({links.length})
        </h2>
        <button
          onClick={onAddLink}
          className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 hover:border-indigo-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add Link</span>
        </button>
      </div>

      {links.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm">
          No links created yet. Click &quot;Add Link&quot; to get started!
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link, idx) => (
            <LinkEditorItem
              key={link.id}
              link={link}
              idx={idx}
              totalLinks={links.length}
              onLinkChange={onLinkChange}
              onMoveLink={onMoveLink}
              onDeleteLink={onDeleteLink}
            />
          ))}
        </div>
      )}
    </div>
  );
}
