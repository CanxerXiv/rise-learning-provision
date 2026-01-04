# Complete Database Setup Guide

Your Supabase database needs to be set up with all the migrations. Here's the complete SQL to run in your Supabase SQL Editor.

## Instructions

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Create a new query
4. Copy and paste **ALL** of the SQL below
5. Click **Run** to execute

---

## Complete Migration SQL

```sql
-- ============================================
-- MIGRATION 1: Create Base Tables
-- ============================================

-- Create news/events table
CREATE TABLE IF NOT EXISTS public.news_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL DEFAULT 'news',
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create academic programs table
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'BookOpen',
  features TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  rating INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  student_name TEXT,
  grade_level TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campus facilities table
CREATE TABLE IF NOT EXISTS public.facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  image_url TEXT,
  category TEXT DEFAULT 'general',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.news_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;

-- Public read policies for published content
CREATE POLICY "Anyone can view published news" 
ON public.news_events FOR SELECT 
USING (is_published = true);

CREATE POLICY "Anyone can view active programs" 
ON public.programs FOR SELECT 
USING (is_active = true);

CREATE POLICY "Anyone can view approved testimonials" 
ON public.testimonials FOR SELECT 
USING (is_approved = true);

CREATE POLICY "Anyone can view active facilities" 
ON public.facilities FOR SELECT 
USING (is_active = true);

-- Anyone can submit contact forms
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions FOR INSERT 
WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_news_events_updated_at
BEFORE UPDATE ON public.news_events
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_programs_updated_at
BEFORE UPDATE ON public.programs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_facilities_updated_at
BEFORE UPDATE ON public.facilities
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- MIGRATION 2: Add Admin Roles & Permissions
-- ============================================

-- Create enum for user roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- User roles policies
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for news_events
DROP POLICY IF EXISTS "Admins can insert news" ON public.news_events;
CREATE POLICY "Admins can insert news"
ON public.news_events FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update news" ON public.news_events;
CREATE POLICY "Admins can update news"
ON public.news_events FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete news" ON public.news_events;
CREATE POLICY "Admins can delete news"
ON public.news_events FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all news" ON public.news_events;
CREATE POLICY "Admins can view all news"
ON public.news_events FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for testimonials
DROP POLICY IF EXISTS "Admins can insert testimonials" ON public.testimonials;
CREATE POLICY "Admins can insert testimonials"
ON public.testimonials FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update testimonials" ON public.testimonials;
CREATE POLICY "Admins can update testimonials"
ON public.testimonials FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete testimonials" ON public.testimonials;
CREATE POLICY "Admins can delete testimonials"
ON public.testimonials FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all testimonials" ON public.testimonials;
CREATE POLICY "Admins can view all testimonials"
ON public.testimonials FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for contact_submissions
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for facilities
DROP POLICY IF EXISTS "Admins can insert facilities" ON public.facilities;
CREATE POLICY "Admins can insert facilities"
ON public.facilities FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update facilities" ON public.facilities;
CREATE POLICY "Admins can update facilities"
ON public.facilities FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete facilities" ON public.facilities;
CREATE POLICY "Admins can delete facilities"
ON public.facilities FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all facilities" ON public.facilities;
CREATE POLICY "Admins can view all facilities"
ON public.facilities FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for programs
DROP POLICY IF EXISTS "Admins can insert programs" ON public.programs;
CREATE POLICY "Admins can insert programs"
ON public.programs FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update programs" ON public.programs;
CREATE POLICY "Admins can update programs"
ON public.programs FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete programs" ON public.programs;
CREATE POLICY "Admins can delete programs"
ON public.programs FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all programs" ON public.programs;
CREATE POLICY "Admins can view all programs"
ON public.programs FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- MIGRATION 3: Create Storage Buckets
-- ============================================

-- Create storage bucket for news images (if not exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for testimonial avatars (if not exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('testimonial-avatars', 'testimonial-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for news-images bucket
DROP POLICY IF EXISTS "Anyone can view news images" ON storage.objects;
CREATE POLICY "Anyone can view news images"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

DROP POLICY IF EXISTS "Admins can upload news images" ON storage.objects;
CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update news images" ON storage.objects;
CREATE POLICY "Admins can update news images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete news images" ON storage.objects;
CREATE POLICY "Admins can delete news images"
ON storage.objects FOR DELETE
USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));

-- RLS policies for testimonial-avatars bucket
DROP POLICY IF EXISTS "Anyone can view testimonial avatars" ON storage.objects;
CREATE POLICY "Anyone can view testimonial avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'testimonial-avatars');

DROP POLICY IF EXISTS "Admins can upload testimonial avatars" ON storage.objects;
CREATE POLICY "Admins can upload testimonial avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'testimonial-avatars' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update testimonial avatars" ON storage.objects;
CREATE POLICY "Admins can update testimonial avatars"
ON storage.objects FOR UPDATE
USING (bucket_id = 'testimonial-avatars' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete testimonial avatars" ON storage.objects;
CREATE POLICY "Admins can delete testimonial avatars"
ON storage.objects FOR DELETE
USING (bucket_id = 'testimonial-avatars' AND public.has_role(auth.uid(), 'admin'));

-- ============================================
-- MIGRATION 4: Add Event Fields
-- ============================================

-- Add event-specific fields to news_events table
ALTER TABLE public.news_events
ADD COLUMN IF NOT EXISTS event_date DATE,
ADD COLUMN IF NOT EXISTS event_time TEXT,
ADD COLUMN IF NOT EXISTS event_location TEXT;

-- Add comments to columns
COMMENT ON COLUMN public.news_events.event_date IS 'Date of the event (only for items with category=event)';
COMMENT ON COLUMN public.news_events.event_time IS 'Time of the event (only for items with category=event)';
COMMENT ON COLUMN public.news_events.event_location IS 'Location of the event (only for items with category=event)';
```

---

## After Running the Migration

Once you've successfully run the SQL above:

1. **Refresh your browser** to clear any cached schema
2. **Make yourself an admin** by running this SQL (replace `YOUR_EMAIL` with your actual email):

```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'YOUR_EMAIL@example.com'
ON CONFLICT DO NOTHING;
```

3. Your event management features will now work correctly!

## What This Sets Up

- ✅ All database tables (news_events, programs, testimonials, contacts, facilities)
- ✅ Admin role system
- ✅ Row Level Security policies
- ✅ Storage buckets for images
- ✅ Event-specific fields (event_date, event_time, event_location)
