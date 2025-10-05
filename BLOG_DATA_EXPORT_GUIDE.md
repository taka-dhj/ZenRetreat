# ブログ記事データベース エクスポート・インポートガイド

## 概要
このガイドでは、Supabaseデータベースからブログ記事データを完全にエクスポートし、他の環境にインポートする方法を説明します。

## ファイル一覧

1. **blog_posts_metadata.csv** - メタデータのみ（ID、タイトル、抜粋、カテゴリ等）
2. **blog_posts_full_export.json** - メタデータのJSON形式
3. **blog_posts_import.sql** - データベース再構築用SQLスケルトン
4. **このガイド** - エクスポート/インポート手順

## 現在のデータベース構造

```sql
CREATE TABLE blog_posts (
  id TEXT PRIMARY KEY,
  title_ja TEXT NOT NULL,
  title_en TEXT NOT NULL,
  excerpt_ja TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  content_ja TEXT NOT NULL,
  content_en TEXT NOT NULL,
  category_ja TEXT NOT NULL,
  category_en TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 記事一覧（2025年10月5日現在）

1. **discover-magic-yoga-retreats-japan**
   - 日本語: 日本のヨガリトリートの魅力：古代の叡智と現代ウェルネスが出会う場所
   - English: The Magic of Yoga Retreats in Japan: Where Ancient Wisdom Meets Modern Wellness
   - カテゴリ: ヨガ / Yoga

2. **zen-yoga-art-traditional-meditation**
   - 日本語: 禅とヨガの芸術：現代の魂のための日本伝統瞑想法
   - English: The Art of Zen and Yoga: Traditional Japanese Meditation Practices for Modern Souls
   - カテゴリ: ウェルネス / Wellness

3. **sacred-mountains-spiritual-destinations**
   - 日本語: 聖なる山々と静寂の寺院：日本最もスピリチュアルな場所でのヨガリトリート
   - English: Sacred Mountains and Silent Temples: Yoga Retreats in Japan's Most Spiritual Destinations
   - カテゴリ: スピリチュアル / Spiritual

## 完全エクスポート方法

### 方法1: Supabase SQL Editorを使用

1. Supabaseダッシュボードにログイン
2. SQL Editorを開く
3. 以下のクエリを実行してJSONでエクスポート:

```sql
SELECT json_agg(row_to_json(blog_posts))
FROM blog_posts
ORDER BY created_at;
```

4. 結果をコピーして `blog_posts_complete_backup.json` として保存

### 方法2: CSVエクスポート（Supabase Table Editor）

1. Supabaseダッシュボード → Table Editor → blog_posts
2. 右上の "..." メニュー → Export to CSV
3. ファイルをダウンロード

### 方法3: MCP Supabaseツール（このプロジェクト環境）

```javascript
// 以下のSQLを mcp__supabase__execute_sql で実行
SELECT * FROM blog_posts ORDER BY created_at;
```

## 完全インポート方法

### 新しいSupabaseプロジェクトへのインポート

1. **テーブル作成**

```sql
-- まず既存のテーブルを削除（注意: データが失われます）
DROP TABLE IF EXISTS blog_posts;

-- テーブルを再作成
CREATE TABLE blog_posts (
  id TEXT PRIMARY KEY,
  title_ja TEXT NOT NULL,
  title_en TEXT NOT NULL,
  excerpt_ja TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  content_ja TEXT NOT NULL,
  content_en TEXT NOT NULL,
  category_ja TEXT NOT NULL,
  category_en TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) を有効化
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 誰でも読めるポリシーを作成
CREATE POLICY "Anyone can read blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);
```

2. **データインポート**

エクスポートしたJSONデータを使用して、各レコードをINSERT:

```sql
-- 記事1
INSERT INTO blog_posts (id, title_ja, title_en, excerpt_ja, excerpt_en, content_ja, content_en, category_ja, category_en, author, created_at, updated_at)
VALUES (
  'discover-magic-yoga-retreats-japan',
  '日本のヨガリトリートの魅力：古代の叡智と現代ウェルネスが出会う場所',
  'The Magic of Yoga Retreats in Japan: Where Ancient Wisdom Meets Modern Wellness',
  '現代社会のストレスから解放され、心身の調和を取り戻したいと願う人々にとって、日本は世界でも類を見ない特別なヨガリトリートの体験を提供します。',
  'For those seeking to escape the stress of modern life and restore harmony of body and mind, Japan offers an unparalleled and extraordinary yoga retreat experience.',
  /* content_ja - 元のデータベースから取得 */,
  /* content_en - 元のデータベースから取得 */,
  'ヨガ',
  'Yoga',
  'Zen Retreat ASIA',
  '2025-10-05 14:34:41.465098+00',
  '2025-10-05 14:34:41.465098+00'
);

-- 他の記事も同様に...
```

## 現在のデータベースから完全バックアップを取得するSQLクエリ

```sql
-- すべてのデータを取得（コピー可能な形式）
SELECT
  id,
  title_ja,
  title_en,
  excerpt_ja,
  excerpt_en,
  LEFT(content_ja, 100) || '...' as content_ja_preview,
  LEFT(content_en, 100) || '...' as content_en_preview,
  category_ja,
  category_en,
  author,
  created_at,
  updated_at
FROM blog_posts
ORDER BY created_at;

-- 完全なコンテンツを含むバックアップ（個別に実行）
SELECT id, content_ja FROM blog_posts WHERE id = 'discover-magic-yoga-retreats-japan';
SELECT id, content_en FROM blog_posts WHERE id = 'discover-magic-yoga-retreats-japan';

SELECT id, content_ja FROM blog_posts WHERE id = 'zen-yoga-art-traditional-meditation';
SELECT id, content_en FROM blog_posts WHERE id = 'zen-yoga-art-traditional-meditation';

SELECT id, content_ja FROM blog_posts WHERE id = 'sacred-mountains-spiritual-destinations';
SELECT id, content_en FROM blog_posts WHERE id = 'sacred-mountains-spiritual-destinations';
```

## 重要な注意事項

1. **コンテンツフィールドのサイズ**: content_ja と content_en は非常に長いテキストフィールドです。CSVやSQLで直接扱う場合、適切なエスケープ処理が必要です。

2. **文字エンコーディング**: すべてのファイルはUTF-8エンコーディングで保存してください。

3. **CTA情報**: 全記事の日本語版・英語版の最後に、Zen Retreat ASIAの連絡先情報が含まれています。

4. **バックアップの重要性**: データベース更新前に必ずバックアップを取得してください。

## トラブルシューティング

### 問題: CSVインポート時に改行が問題になる
**解決策**: JSON形式を使用するか、SQL INSERTステートメントを使用

### 問題: 文字化けが発生する
**解決策**: UTF-8エンコーディングを確認、PostgreSQLのクライアントエンコーディングを設定

### 問題: コンテンツが長すぎてエラーになる
**解決策**: テーブル定義でTEXT型を使用（無制限の長さ）

## サポート

データベース復元に問題がある場合は、Supabaseサポートまたはプロジェクト管理者に連絡してください。
