'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import profileData from '../../data/mockData.json';
import { supabase, hasSupabaseConfig } from '../../lib/supabase';
import DashboardHeader from '../../components/admin/DashboardHeader';
import ProfileEditor from '../../components/admin/ProfileEditor';
import SocialsEditor from '../../components/admin/SocialsEditor';
import LinksManager from '../../components/admin/LinksManager';

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

interface DbLinkItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon_name?: string;
  featured?: boolean;
  accent_color?: string;
  is_active?: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Profile State
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: '',
    bio: '',
    avatar: '',
    active_theme: 'minimalist',
    socials: { github: '', twitter: '', linkedin: '', email: '' }
  });

  // Links State
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);

  // Utility to show toasts
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Authentication & Initial Load
  useEffect(() => {
    const isAuthed = localStorage.getItem('admin-session') === 'true';
    if (!isAuthed) {
      router.push('/th3w3b4dm1n/login');
      return;
    }

    async function loadCMSData() {
      if (!hasSupabaseConfig || !supabase) {
        console.log("Supabase credentials not configured. Loading editable local state.");
        const localProfile = localStorage.getItem('cms-profile');
        const localLinks = localStorage.getItem('cms-links');

        if (localProfile) {
          const parsed = JSON.parse(localProfile);
          setProfile({
            name: parsed.name || '',
            title: parsed.title || '',
            bio: parsed.bio || '',
            avatar: parsed.avatar || '',
            active_theme: parsed.active_theme || parsed.activeTheme || 'minimalist',
            socials: parsed.socials || { github: '', twitter: '', linkedin: '', email: '' }
          });
        } else {
          setProfile({
            ...profileData.profile,
            active_theme: 'minimalist',
            socials: profileData.profile.socials || { github: '', twitter: '', linkedin: '', email: '' }
          });
        }

        if (localLinks) {
          setLinks(JSON.parse(localLinks));
        } else {
          setLinks(profileData.links.map(l => ({ ...l, is_active: true })));
        }

        setLoading(false);
        setMounted(true);
        return;
      }

      try {
        setLoading(true);
        // Load active profile
        const { data: dbProfile, error: profileErr } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();

        if (profileErr) throw profileErr;

        if (dbProfile) {
          setProfileId(dbProfile.id);
          setProfile({
            name: dbProfile.display_name || '',
            title: dbProfile.title || 'Creative Technologist',
            bio: dbProfile.bio || '',
            avatar: dbProfile.avatar_url || '',
            active_theme: (dbProfile.active_theme as Theme) || 'minimalist',
            socials: dbProfile.socials || { github: '', twitter: '', linkedin: '', email: '' }
          });

          // Load links
          const { data: dbLinks, error: linksErr } = await supabase
            .from('links')
            .select('*')
            .eq('profile_id', dbProfile.id)
            .order('sort_order', { ascending: true });

          if (linksErr) throw linksErr;

          if (dbLinks) {
            setLinks((dbLinks as DbLinkItem[]).map(link => ({
              id: link.id,
              title: link.title || '',
              description: link.description || '',
              url: link.url || '',
              icon: link.icon_name || 'globe',
              featured: link.featured || false,
              accentColor: link.accent_color || undefined,
              is_active: link.is_active !== false // default true
            })));
          }
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        showToast(`Failed loading Supabase data: ${errMsg}`, 'error');
        // Fallback to offline local state
        setProfile({
          ...profileData.profile,
          active_theme: 'minimalist',
          socials: profileData.profile.socials || { github: '', twitter: '', linkedin: '', email: '' }
        });
        setLinks(profileData.links.map(l => ({ ...l, is_active: true })));
      } finally {
        setLoading(false);
        setMounted(true);
      }
    }

    loadCMSData();
  }, [router]);

  // Handle updates to profile fields
  const handleProfileChange = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle updates to socials
  const handleSocialChange = (key: keyof Profile['socials'], value: string) => {
    setProfile(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [key]: value
      }
    }));
  };

  // Handle changes to a specific link
  const handleLinkChange = <K extends keyof LinkItem>(index: number, key: K, value: LinkItem[K]) => {
    setLinks(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: value
      };
      return updated;
    });
  };

  // Add a new link
  const addLink = () => {
    const newLink: LinkItem = {
      id: `new-${Date.now()}`,
      title: 'New Link Title',
      description: '',
      url: 'https://',
      icon: 'globe',
      featured: false,
      is_active: true
    };
    setLinks(prev => [...prev, newLink]);
  };

  // Reorder/move link in array
  const moveLink = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === links.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    setLinks(prev => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIdx];
      updated[targetIdx] = temp;
      return updated;
    });
  };

  // Delete a link from array
  const deleteLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  // Save changes to database or local state
  const saveAllChanges = async () => {
    setSaving(true);
    if (!hasSupabaseConfig || !supabase) {
      console.log("Supabase credentials not configured. Saving to localStorage.");
      localStorage.setItem('cms-profile', JSON.stringify(profile));
      localStorage.setItem('cms-links', JSON.stringify(links));
      showToast('Offline Changes Saved Successfully!', 'success');
      setSaving(false);
      return;
    }

    try {
      if (!profileId) throw new Error("No active profile ID loaded.");

      // 1. Update the profile row in Supabase
      const { error: profileUpdateErr } = await supabase
        .from('profiles')
        .update({
          display_name: profile.name,
          title: profile.title,
          bio: profile.bio,
          avatar_url: profile.avatar,
          active_theme: profile.active_theme,
          socials: profile.socials
        })
        .eq('id', profileId);

      if (profileUpdateErr) throw profileUpdateErr;

      // 2. Refresh/Upsert the links
      // First, fetch current db link ids to find deletions
      const { data: dbLinks, error: fetchErr } = await supabase
        .from('links')
        .select('id')
        .eq('profile_id', profileId);

      if (fetchErr) throw fetchErr;

      const currentDbIds = (dbLinks || []).map(l => l.id);
      const remainingIds = links.map(l => l.id).filter(id => !id.startsWith('new-'));
      const deletedIds = currentDbIds.filter(id => !remainingIds.includes(id));

      // Execute Deletions
      if (deletedIds.length > 0) {
        const { error: deleteErr } = await supabase
          .from('links')
          .delete()
          .in('id', deletedIds);
        if (deleteErr) throw deleteErr;
      }

      // Execute Upserts (Insert new, Update existing)
      const upsertRows = links.map((link, index) => {
        const row: Record<string, unknown> = {
          profile_id: profileId,
          title: link.title,
          description: link.description || null,
          url: link.url,
          icon_name: link.icon,
          featured: link.featured,
          accent_color: link.accentColor || null,
          is_active: link.is_active !== false,
          sort_order: index
        };
        // If not a new link, keep its ID
        if (!link.id.startsWith('new-')) {
          row.id = link.id;
        }
        return row;
      });

      if (upsertRows.length > 0) {
        const { error: upsertErr } = await supabase
          .from('links')
          .upsert(upsertRows);
        if (upsertErr) throw upsertErr;
      }

      showToast('All CMS Changes Published Live!', 'success');

      // Reload fresh data to replace temporary 'new-*' client IDs
      const { data: refreshedLinks, error: refreshErr } = await supabase
        .from('links')
        .select('*')
        .eq('profile_id', profileId)
        .order('sort_order', { ascending: true });

      if (!refreshErr && refreshedLinks) {
        setLinks((refreshedLinks as DbLinkItem[]).map(link => ({
          id: link.id,
          title: link.title || '',
          description: link.description || '',
          url: link.url || '',
          icon: link.icon_name || 'globe',
          featured: link.featured || false,
          accentColor: link.accent_color || undefined,
          is_active: link.is_active !== false
        })));
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      showToast(`Failed to publish changes: ${errMsg}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-session');
    router.push('/th3w3b4dm1n/login');
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 animate-pulse">Loading CMS Panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className={`px-5 py-3 rounded-xl border text-xs font-bold shadow-2xl flex items-center gap-2 ${
            toast.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Dynamic Header */}
      <DashboardHeader saving={saving} onSave={saveAllChanges} onLogout={handleLogout} />

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Profile Information */}
        <section className="space-y-6 lg:col-span-1">
          {/* Dynamic Profile Editor Form */}
          <ProfileEditor profile={profile} onChange={handleProfileChange} />

          {/* Dynamic Socials Editor Form */}
          <SocialsEditor socials={profile.socials} onChange={handleSocialChange} />
        </section>

        {/* Right Side: Links Manager */}
        <section className="lg:col-span-2">
          {/* Dynamic Links List & Sort Manager */}
          <LinksManager
            links={links}
            onAddLink={addLink}
            onLinkChange={handleLinkChange}
            onMoveLink={moveLink}
            onDeleteLink={deleteLink}
          />
        </section>

      </main>
    </div>
  );
}
