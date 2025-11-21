import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// blogArticles.tsからデータを読み込む（簡易的な方法）
// 実際には、TypeScriptファイルを直接読み込むのは難しいので、
// ビルド時に実行される前提で、コンパイル済みのJSファイルから読み込むか、
// またはJSONファイルとしてエクスポートする必要があります

// ここでは、blogArticles.tsの内容を直接解析する代わりに、
// より実用的な方法として、publicディレクトリに直接sitemap.xmlを生成します

const baseUrl = 'https://zen-retreat-asia.com';

// 静的ページ
const staticPages = [
  { url: `${baseUrl}/`, changefreq: 'weekly', priority: '1.0' },
  { url: `${baseUrl}/en`, changefreq: 'weekly', priority: '1.0' },
  { url: `${baseUrl}/retreats`, changefreq: 'monthly', priority: '0.8' },
  { url: `${baseUrl}/en/retreats`, changefreq: 'monthly', priority: '0.8' },
  { url: `${baseUrl}/domestic`, changefreq: 'monthly', priority: '0.8' },
  { url: `${baseUrl}/en/domestic`, changefreq: 'monthly', priority: '0.8' },
  { url: `${baseUrl}/international`, changefreq: 'monthly', priority: '0.8' },
  { url: `${baseUrl}/en/international`, changefreq: 'monthly', priority: '0.8' },
  { url: `${baseUrl}/blog`, changefreq: 'daily', priority: '0.9' },
  { url: `${baseUrl}/en/blog`, changefreq: 'daily', priority: '0.9' },
  { url: `${baseUrl}/contact`, changefreq: 'monthly', priority: '0.7' },
  { url: `${baseUrl}/en/contact`, changefreq: 'monthly', priority: '0.7' },
  { url: `${baseUrl}/faq`, changefreq: 'monthly', priority: '0.6' },
  { url: `${baseUrl}/en/faq`, changefreq: 'monthly', priority: '0.6' },
];

// blogArticles.tsファイルを読み込んで、slugを抽出
const blogArticlesPath = join(__dirname, '../src/data/blogArticles.ts');
const blogArticlesContent = readFileSync(blogArticlesPath, 'utf-8');

// slugを抽出（簡易的な正規表現マッチング）
const slugMatches = blogArticlesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
const slugs = Array.from(slugMatches, match => match[1]);

// publishedAtを抽出
const publishedAtMatches = blogArticlesContent.matchAll(/publishedAt:\s*['"]([^'"]+)['"]/g);
const publishedAts = Array.from(publishedAtMatches, match => match[1]);

// ブログ記事のURLを生成
const blogPages = slugs.map((slug, index) => ({
  url: `${baseUrl}/blog/${slug}`,
  lastmod: publishedAts[index] || new Date().toISOString().split('T')[0],
  changefreq: 'weekly',
  priority: '0.8',
}));

const blogPagesEn = slugs.map((slug, index) => ({
  url: `${baseUrl}/en/blog/${slug}`,
  lastmod: publishedAts[index] || new Date().toISOString().split('T')[0],
  changefreq: 'weekly',
  priority: '0.8',
}));

// XML生成
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${blogPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${blogPagesEn.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// publicディレクトリにsitemap.xmlを書き込み
const sitemapPath = join(__dirname, '../public/sitemap.xml');
writeFileSync(sitemapPath, xml, 'utf-8');

console.log('✅ sitemap.xml generated successfully');
console.log(`   Total URLs: ${staticPages.length + blogPages.length + blogPagesEn.length}`);
console.log(`   Blog articles: ${blogPages.length}`);

