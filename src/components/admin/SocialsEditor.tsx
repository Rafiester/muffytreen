import React from 'react';

interface Socials {
  github: string;
  twitter: string;
  linkedin: string;
  email: string;
}

interface SocialsEditorProps {
  socials: Socials;
  onChange: (key: keyof Socials, value: string) => void;
}

export default function SocialsEditor({ socials, onChange }: SocialsEditorProps) {
  return (
    <div className="bg-slate-950/40 border border-slate-900/60 p-6 rounded-3xl backdrop-blur-sm mt-6">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        Social Accounts
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="social-github">GitHub URL</label>
          <input
            id="social-github"
            type="text"
            value={socials.github}
            onChange={(e) => onChange('github', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-xs transition-all"
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="social-twitter">Twitter URL</label>
          <input
            id="social-twitter"
            type="text"
            value={socials.twitter}
            onChange={(e) => onChange('twitter', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-xs transition-all"
            placeholder="https://twitter.com/username"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="social-linkedin">LinkedIn URL</label>
          <input
            id="social-linkedin"
            type="text"
            value={socials.linkedin}
            onChange={(e) => onChange('linkedin', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-xs transition-all"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2" htmlFor="social-email">Email Address</label>
          <input
            id="social-email"
            type="email"
            value={socials.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-xs transition-all"
            placeholder="hello@example.com"
          />
        </div>
      </div>
    </div>
  );
}
