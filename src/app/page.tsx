'use client';

import React, { useState, useEffect } from 'react';
import profileData from '../data/mockData.json';
import ThemeToggle from '../components/ui/ThemeToggle';
import LinkCard, { LinkItem } from '../components/profile/LinkCard';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileFooter from '../components/profile/ProfileFooter';
import { supabase, hasSupabaseConfig } from '../lib/supabase';

type Theme = 'minimalist' | 'minimalist-dark' | 'retro';

interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  socials: Record<string, string>;
}

interface DbLink {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon_name: string;
  is_active: boolean;
  sort_order: number;
  featured?: boolean;
  accent_color?: string;
  accentColor?: string;
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>('minimalist');
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize data and theme on mount
  useEffect(() => {
    const allowedThemes: Theme[] = ['minimalist', 'minimalist-dark', 'retro'];

    async function loadData() {
      if (!hasSupabaseConfig || !supabase) {
        console.log("Supabase credentials not configured. Using local/localStorage mock data.");
        const localProfile = localStorage.getItem('cms-profile');
        const localLinks = localStorage.getItem('cms-links');
        
        const loadedProfile = localProfile ? JSON.parse(localProfile) : profileData.profile;
        setProfile(loadedProfile);
        setLinks(localLinks ? JSON.parse(localLinks) : profileData.links);
        
        const activeTheme = loadedProfile.active_theme || loadedProfile.activeTheme;
        const savedTheme = localStorage.getItem('user-theme') as Theme;
        const initialTheme = (savedTheme && allowedThemes.includes(savedTheme))
          ? savedTheme
          : (activeTheme && allowedThemes.includes(activeTheme))
            ? activeTheme
            : 'minimalist';
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
        
        setLoading(false);
        setMounted(true);
        return;
      }

      try {
        setLoading(true);
        // 1. Fetch the active profile (first row in profiles table)
        const { data: profileDataDb, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();

        if (profileError) throw profileError;

        if (profileDataDb) {
          // Map database columns: id, display_name, bio, avatar_url, active_theme, title, socials
          const mappedProfile: Profile = {
            name: profileDataDb.display_name,
            title: profileDataDb.title || 'Creative Technologist',
            bio: profileDataDb.bio,
            avatar: profileDataDb.avatar_url,
            socials: profileDataDb.socials || profileData.profile.socials,
          };
          setProfile(mappedProfile);

          // Apply active theme
          const activeTheme = profileDataDb.active_theme as Theme;
          let targetTheme: Theme = 'minimalist';
          const savedTheme = localStorage.getItem('user-theme') as Theme;
          
          if (savedTheme && allowedThemes.includes(savedTheme)) {
            targetTheme = savedTheme;
          } else if (activeTheme && allowedThemes.includes(activeTheme)) {
            targetTheme = activeTheme;
          }
          
          setTheme(targetTheme);
          document.documentElement.setAttribute('data-theme', targetTheme);

          // 2. Fetch active links for the profile
          const { data: linksDataDb, error: linksError } = await supabase
            .from('links')
            .select('*')
            .eq('profile_id', profileDataDb.id)
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

          if (linksError) throw linksError;

          if (linksDataDb) {
            const mappedLinks = (linksDataDb as DbLink[]).map((link: DbLink) => ({
              id: link.id,
              title: link.title,
              description: link.description || '',
              url: link.url,
              icon: link.icon_name,
              featured: link.featured || false,
              accentColor: link.accent_color || link.accentColor || undefined
            }));
            setLinks(mappedLinks);
          }
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error("Error loading data from Supabase:", errMsg);
        setError(errMsg);
        // Fallback on database failure
        setProfile(profileData.profile);
        setLinks(profileData.links);
        
        const savedTheme = localStorage.getItem('user-theme') as Theme;
        const initialTheme = (savedTheme && allowedThemes.includes(savedTheme)) ? savedTheme : 'minimalist';
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
      } finally {
        setLoading(false);
        setMounted(true);
      }
    }

    loadData();
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('user-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">Loading Experience...</p>
      </div>
    );
  }

  const isRetro = theme === 'retro';

  return (
    <div className={`min-h-screen w-full relative flex flex-col items-center justify-between pb-12 pt-6 transition-all duration-300 ${isRetro ? 'retro-grid' : ''}`}>
      {/* Top Floating Theme Switcher & Status Indicator */}
      <header className="w-full max-w-xl px-4 flex justify-between items-center mb-8 relative z-50">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${hasSupabaseConfig && !error ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className={`text-[9px] uppercase font-bold tracking-wider select-none ${isRetro ? 'font-mono text-black font-black bg-white px-2 py-0.5 border-[2px] border-black' : 'text-[var(--text-body)] opacity-70'}`}>
            {hasSupabaseConfig && !error ? 'Supabase Live' : 'Mock CMS Mode'}
          </span>
        </div>
        <ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} />
      </header>

      {/* Main Link-in-Bio Container */}
      <main className="w-full max-w-xl px-4 flex-1 flex flex-col items-center">
        {/* Dynamic Profile Header */}
        {profile && <ProfileHeader profile={profile} isRetro={isRetro} />}

        {/* Dynamic Link List */}
        <section className="w-full flex flex-col gap-4 mb-12">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} theme={theme} />
          ))}
        </section>
      </main>

      {/* Dynamic Profile Footer */}
      {profile && <ProfileFooter name={profile.name} isRetro={isRetro} />}
    </div>
  );
}
