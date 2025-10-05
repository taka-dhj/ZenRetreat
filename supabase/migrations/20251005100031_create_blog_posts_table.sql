/*
  # ブログ投稿テーブルの作成

  1. 新しいテーブル
    - `blog_posts`
      - `id` (text, primary key) - ブログ投稿の一意識別子
      - `title_ja` (text) - 日本語タイトル
      - `title_en` (text) - 英語タイトル
      - `excerpt_ja` (text) - 日本語抜粋
      - `excerpt_en` (text) - 英語抜粋
      - `content_ja` (text) - 日本語本文
      - `content_en` (text) - 英語本文
      - `author` (text) - 著者名
      - `category_ja` (text) - 日本語カテゴリー
      - `category_en` (text) - 英語カテゴリー
      - `image` (text) - 画像URL
      - `published_date` (timestamptz) - 公開日
      - `created_at` (timestamptz) - 作成日時
      - `updated_at` (timestamptz) - 更新日時

  2. セキュリティ
    - `blog_posts`テーブルでRLSを有効化
    - すべてのユーザーが記事を閲覧できるポリシーを追加
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id text PRIMARY KEY,
  title_ja text NOT NULL,
  title_en text NOT NULL,
  excerpt_ja text NOT NULL DEFAULT '',
  excerpt_en text NOT NULL DEFAULT '',
  content_ja text NOT NULL DEFAULT '',
  content_en text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  category_ja text NOT NULL DEFAULT '',
  category_en text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  published_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  TO public
  USING (true);