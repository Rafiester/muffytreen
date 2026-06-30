import React from 'react';

type Theme = 'minimalist' | 'minimalist-dark' | 'retro';

interface Settings {
  active_theme: Theme;
  meta_title?: string;
  meta_description?: string;
}

interface SettingsEditorProps {
  settings: Settings;
  onChange: (key: keyof Settings, value: string) => void;
}

export default function SettingsEditor({ settings, onChange }: SettingsEditorProps) {
  return (
    <div className="bg-slate-950/40 border border-slate-900/60 p-6 rounded-3xl backdrop-blur-sm">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        Experience Settings & SEO
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="experience-theme">Active Experience Theme</label>
          <select
            id="experience-theme"
            value={settings.active_theme}
            onChange={(e) => onChange('active_theme', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all"
          >
            <option value="minimalist">Minimal Light</option>
            <option value="minimalist-dark">Minimal Dark</option>
            <option value="retro">90s Retro</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="meta-title">SEO Meta Title</label>
          <input
            id="meta-title"
            type="text"
            value={settings.meta_title || ''}
            onChange={(e) => onChange('meta_title', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all"
            placeholder="Alex Rivera | Portfolio"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="meta-description">SEO Meta Description</label>
          <textarea
            id="meta-description"
            value={settings.meta_description || ''}
            onChange={(e) => onChange('meta_description', e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all resize-none"
            placeholder="Alex Rivera's links, portfolio, and newsletters..."
          />
        </div>
      </div>
    </div>
  );
}
