'use client';

import React, { useState, useEffect } from 'react';
import profileData from '../data/mockData.json';
import ThemeToggle from '../components/ThemeToggle';
import LinkCard, { LinkItem } from '../components/LinkCard';

type Theme = 'minimalist' | 'minimalist-dark' | 'retro';

export default function Home() {
  const [theme, setTheme] = useState<Theme>('minimalist');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on client mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('user-theme') as Theme;
    if (savedTheme && ['minimalist', 'minimalist-dark', 'retro'].includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'minimalist');
    }
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('user-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { profile, links } = profileData;
  const isRetro = theme === 'retro';
  const isDark = theme === 'minimalist-dark';

  return (
    <div className={`min-h-screen w-full relative flex flex-col items-center justify-between pb-12 pt-6 transition-all duration-300 ${isRetro ? 'retro-grid' : ''}`}>
      {/* Top Floating Theme Switcher */}
      <header className="w-full max-w-xl px-4 flex justify-end mb-8 relative z-50">
        <ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} />
      </header>

      {/* Main Link-in-Bio Container */}
      <main className="w-full max-w-xl px-4 flex-1 flex flex-col items-center">
        {/* Profile Card Header */}
        <section 
          className={`
            w-full flex flex-col items-center text-center p-6 md:p-8 mb-8 theme-card
            ${isRetro 
              ? 'bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none' 
              : 'bg-[var(--bg-card)] border border-[var(--border-card)] shadow-md rounded-[24px]'
            }
          `}
        >
          {/* Avatar Container */}
          <div className="relative group mb-5">
            {/* Avatar Glow Ring for Minimalist */}
            {!isRetro && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
            )}
            {/* Avatar Image */}
            <img
              src={profile.avatar}
              alt={`${profile.name}'s Avatar`}
              className={`
                w-28 h-28 object-cover relative z-10 transition-transform duration-300 group-hover:scale-105
                ${isRetro 
                  ? 'border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-none bg-cyan-200' 
                  : 'border-2 border-white dark:border-slate-800 rounded-full shadow-inner'
                }
              `}
            />
          </div>

          {/* Profile Name & Title */}
          <h1 
            className={`
              text-2xl md:text-3xl leading-tight mb-2
              ${isRetro ? 'font-mono font-black uppercase text-black' : 'font-sans text-[var(--text-title)] tracking-tight'}
            `}
          >
            {profile.name}
          </h1>
          <p 
            className={`
              text-xs font-bold uppercase tracking-wider mb-4 px-3 py-1 inline-block
              ${isRetro 
                ? 'bg-black text-yellow-300 border-2 border-black rounded-none font-mono font-black' 
                : 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 dark:bg-indigo-500/15 rounded-full font-sans'
              }
            `}
          >
            {profile.title}
          </p>

          {/* Bio */}
          <p 
            className={`
              text-sm leading-relaxed max-w-sm mb-6
              ${isRetro ? 'font-mono text-black font-semibold' : 'font-sans text-[var(--text-body)]'}
            `}
          >
            {profile.bio}
          </p>

          {/* Social Icons Row */}
          <div className="flex gap-4 items-center justify-center">
            {Object.entries(profile.socials).map(([platform, url]) => {
              const props = { className: "w-5 h-5", strokeWidth: 2, fill: "none", stroke: "currentColor" };
              let icon: React.ReactNode;
              if (platform === 'github') {
                icon = (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  </svg>
                );
              } else if (platform === 'twitter') {
                icon = (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                );
              } else if (platform === 'linkedin') {
                icon = (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                );
              } else {
                icon = (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                );
              }

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${profile.name}'s ${platform}`}
                  className={`
                    p-2.5 transition-all duration-300
                    ${isRetro 
                      ? 'bg-yellow-300 text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ec4899] hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white rounded-full hover:scale-110'
                    }
                  `}
                >
                  {icon}
                </a>
              );
            })}
          </div>
        </section>

        {/* Dynamic Link List */}
        <section className="w-full flex flex-col gap-4 mb-12">
          {/* Note: This section maps CMS data items dynamically */}
          {links.map((link) => (
            <LinkCard key={link.id} link={link} theme={theme} />
          ))}
        </section>
      </main>

      {/* Footer Details */}
      <footer className="text-center mt-auto px-4 z-10 relative">
        <p 
          className={`
            text-[11px] uppercase tracking-widest opacity-60
            ${isRetro ? 'font-mono text-black font-bold' : 'font-sans text-[var(--text-body)]'}
          `}
        >
          {/* Comments: Wired to easily swap for real CMS content in page.tsx */}
          &copy; {new Date().getFullYear()} {profile.name} &bull; Simulated Headless CMS Integration
        </p>
      </footer>
    </div>
  );
}
