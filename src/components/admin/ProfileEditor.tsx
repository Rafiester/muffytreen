import React from 'react';

type Theme = 'minimalist' | 'minimalist-dark' | 'retro';

interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  active_theme: Theme;
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
}

interface ProfileEditorProps {
  profile: Profile;
  onChange: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
}

export default function ProfileEditor({ profile, onChange }: ProfileEditorProps) {
  return (
    <div className="bg-slate-950/40 border border-slate-900/60 p-6 rounded-3xl backdrop-blur-sm">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        Profile Details
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="display-name">Display Name</label>
          <input
            id="display-name"
            type="text"
            value={profile.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all"
            placeholder="Alex Rivera"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="profession-title">Title / Profession</label>
          <input
            id="profession-title"
            type="text"
            value={profile.title}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all"
            placeholder="Creative Technologist"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="bio-description">Bio / Description</label>
          <textarea
            id="bio-description"
            value={profile.bio}
            onChange={(e) => onChange('bio', e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all resize-none"
            placeholder="Brief description about yourself..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="avatar-url">Avatar Image URL</label>
          <input
            id="avatar-url"
            type="text"
            value={profile.avatar}
            onChange={(e) => onChange('avatar', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all text-xs"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="experience-theme">Active Experience Theme</label>
          <select
            id="experience-theme"
            value={profile.active_theme}
            onChange={(e) => onChange('active_theme', e.target.value as Theme)}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all"
          >
            <option value="minimalist">Minimal Light</option>
            <option value="minimalist-dark">Minimal Dark</option>
            <option value="retro">90s Retro</option>
          </select>
        </div>
      </div>
    </div>
  );
}
