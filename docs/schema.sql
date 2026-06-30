-- Supabase SQL schema for the Linktree-Alternative application.
-- Copy and run this script in your Supabase SQL Editor.

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    active_theme TEXT DEFAULT 'clean-light'
);

-- Create links table
CREATE TABLE IF NOT EXISTS public.links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    icon_name TEXT DEFAULT 'globe',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0
);

-- Enable Row Level Security (RLS) for Production safety
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Allow public read-only access to all profiles and links
CREATE POLICY "Allow public read access to profiles" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to links" 
ON public.links FOR SELECT 
USING (true);

-- Allow full modifications (development mode bypass or update controls)
CREATE POLICY "Allow all modifications on profiles" 
ON public.profiles FOR ALL 
USING (true);

CREATE POLICY "Allow all modifications on links" 
ON public.links FOR ALL 
USING (true);

-- Storage bucket configurations:
-- Make sure to create a public storage bucket named 'avatars' in your Supabase Dashboard.
