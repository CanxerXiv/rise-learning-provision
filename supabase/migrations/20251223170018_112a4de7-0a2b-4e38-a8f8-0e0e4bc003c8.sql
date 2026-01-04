-- Create storage bucket for news images
INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true);

-- Create storage bucket for testimonial avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonial-avatars', 'testimonial-avatars', true);

-- RLS policies for news-images bucket
CREATE POLICY "Anyone can view news images"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update news images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete news images"
ON storage.objects FOR DELETE
USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));

-- RLS policies for testimonial-avatars bucket
CREATE POLICY "Anyone can view testimonial avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'testimonial-avatars');

CREATE POLICY "Admins can upload testimonial avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'testimonial-avatars' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonial avatars"
ON storage.objects FOR UPDATE
USING (bucket_id = 'testimonial-avatars' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonial avatars"
ON storage.objects FOR DELETE
USING (bucket_id = 'testimonial-avatars' AND public.has_role(auth.uid(), 'admin'));