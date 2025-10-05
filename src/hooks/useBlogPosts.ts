import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface BlogPost {
  id: string;
  title_ja: string;
  title_en: string;
  excerpt_ja: string;
  excerpt_en: string;
  content_ja: string;
  content_en: string;
  author: string;
  category_ja: string;
  category_en: string;
  image: string;
  published_date: string;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const timestamp = new Date().getTime();
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_date', { ascending: false });

        if (error) {
          throw error;
        }

        setPosts(data || []);
        console.log(`Blog posts fetched at ${timestamp}:`, data?.length || 0, 'posts');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
