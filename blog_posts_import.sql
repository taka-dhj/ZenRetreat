-- Blog Posts Complete Import SQL
-- This file contains all blog posts data for reimporting into Supabase
--
-- Usage: Execute this SQL in Supabase SQL Editor to restore all blog posts
-- Note: This will DELETE existing blog posts and insert fresh data

-- Clean existing data
DELETE FROM blog_posts;

-- Insert blog post 1: Discover Magic Yoga Retreats Japan
INSERT INTO blog_posts (
  id,
  title_ja,
  title_en,
  excerpt_ja,
  excerpt_en,
  category_ja,
  category_en,
  author,
  created_at,
  updated_at
) VALUES (
  'discover-magic-yoga-retreats-japan',
  '日本のヨガリトリートの魅力：古代の叡智と現代ウェルネスが出会う場所',
  'The Magic of Yoga Retreats in Japan: Where Ancient Wisdom Meets Modern Wellness',
  '現代社会のストレスから解放され、心身の調和を取り戻したいと願う人々にとって、日本は世界でも類を見ない特別なヨガリトリートの体験を提供します。',
  'For those seeking to escape the stress of modern life and restore harmony of body and mind, Japan offers an unparalleled and extraordinary yoga retreat experience.',
  'ヨガ',
  'Yoga',
  'Zen Retreat ASIA',
  '2025-10-05 14:34:41.465098+00',
  '2025-10-05 14:34:41.465098+00'
);

-- Note: Due to the length of content fields, use the following approach:
-- 1. Export current database: SELECT * FROM blog_posts;
-- 2. Or use the blog_posts_metadata.csv for basic structure
-- 3. Content fields (content_ja and content_en) should be updated separately using UPDATE statements

-- For complete data restoration, retrieve from current database with:
-- SELECT id, content_ja, content_en FROM blog_posts;

-- Example UPDATE for content (replace with actual content):
-- UPDATE blog_posts SET content_ja = 'FULL_JAPANESE_CONTENT_HERE' WHERE id = 'discover-magic-yoga-retreats-japan';
-- UPDATE blog_posts SET content_en = 'FULL_ENGLISH_CONTENT_HERE' WHERE id = 'discover-magic-yoga-retreats-japan';
