import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, User, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { blogArticles } from '../data/blogArticles';
import BlogCTA from '../components/BlogCTA';

const BlogArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();

  const article = blogArticles.find(a => a.slug === slug);
  
  // Google Analytics 4: ブログ記事閲覧イベント（カスタムレポート用）
  useEffect(() => {
    if (article && typeof window.gtag === 'function') {
      const title = language === 'ja' ? article.title.ja : article.title.en;
      window.gtag('event', 'blog_article_view', {
        event_category: 'Blog',
        event_label: title,
        article_slug: slug,
        article_id: article.id,
        article_title: title,
        article_category: article.category,
        article_tags: article.tags.join(','),
        article_published_date: article.publishedAt,
        article_author: article.author,
        language: language,
        value: 1,
      });
    }
  }, [article, slug, language]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-light text-gray-800 mb-4">
            {language === 'ja' ? '記事が見つかりません' : 'Article Not Found'}
          </h1>
          <Link
            to={language === 'ja' ? '/ja/blog' : '/blog'}
            className="text-green-600 hover:text-green-700 underline"
          >
            {language === 'ja' ? 'ブログ一覧に戻る' : 'Back to Blog'}
          </Link>
        </div>
      </div>
    );
  }

  const baseUrl = language === 'ja' ? '/ja' : '';
  const title = language === 'ja' ? article.title.ja : article.title.en;
  const content = language === 'ja' ? article.content.ja : article.content.en;

  // Helper function to process bold text
  const processBold = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('# ')) {
        const processedText = processBold(line.substring(2));
        elements.push(
          <h1 key={key++} className="text-4xl md:text-5xl font-light text-gray-900 mb-6 mt-10 leading-tight" dangerouslySetInnerHTML={{ __html: processedText }} />
        );
      } else if (line.startsWith('## ')) {
        const processedText = processBold(line.substring(3));
        elements.push(
          <h2 key={key++} className="relative text-3xl md:text-4xl font-light text-gray-900 mb-8 mt-14 pb-5 pl-6 leading-tight border-b border-gray-200 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-green-700 before:via-green-600 before:to-green-700 before:rounded-full after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-24 after:h-[2px] after:bg-green-700" dangerouslySetInnerHTML={{ __html: processedText }} />
        );
      } else if (line.startsWith('### ')) {
        const processedText = processBold(line.substring(4));
        elements.push(
          <h3 key={key++} className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 mt-8 leading-snug" dangerouslySetInnerHTML={{ __html: processedText }} />
        );
      } else if (/^!\[.*?\]\(.*?\)$/.test(line.trim())) {
        // Markdown image: ![alt text](url)
        const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imageMatch) {
          const altText = imageMatch[1];
          const imageUrl = imageMatch[2];
          elements.push(
            <div key={key++} className="my-8">
              <img 
                src={imageUrl} 
                alt={altText} 
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {altText && (
                <p className="text-sm text-gray-500 italic mt-2 text-center">{altText}</p>
              )}
            </div>
          );
        }
      } else if (line.startsWith('> ')) {
        const quoteLines = [line.substring(2)];
        while (i + 1 < lines.length && lines[i + 1].startsWith('> ')) {
          i++;
          quoteLines.push(lines[i].substring(2));
        }
        elements.push(
          <blockquote key={key++} className="border-l-4 border-green-500 bg-green-50 pl-6 pr-4 py-4 my-6 italic text-gray-700 rounded-r-lg">
            {quoteLines.map((quote, idx) => (
              <p key={idx} className="leading-relaxed">{quote}</p>
            ))}
          </blockquote>
        );
      } else if (line.startsWith('[Source:') || line.startsWith('[source:') || line.toLowerCase().includes('source:') || line.startsWith('出典:') || line.startsWith('参考文献:') || line.startsWith('References:') || line.startsWith('*参考文献:') || line.startsWith('*References:') || line.startsWith('*出典:')) {
        elements.push(
          <p key={key++} className="text-xs text-gray-500 italic mb-4 mt-2">
            {line}
          </p>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItems = [line];
        while (i + 1 < lines.length && (lines[i + 1].startsWith('- ') || lines[i + 1].startsWith('* '))) {
          i++;
          listItems.push(lines[i]);
        }
        elements.push(
          <ul key={key++} className="list-disc list-inside space-y-3 mb-6 text-gray-700 ml-4 marker:text-green-600">
            {listItems.map((item, idx) => {
              const processedText = processBold(item.substring(2));
              return <li key={idx} className="leading-relaxed pl-2 break-words overflow-visible" dangerouslySetInnerHTML={{ __html: processedText }} />;
            })}
          </ul>
        );
      } else if (/^\d+\.\s/.test(line)) {
        const listItems = [line];
        while (i + 1 < lines.length && /^\d+\.\s/.test(lines[i + 1])) {
          i++;
          listItems.push(lines[i]);
        }
        elements.push(
          <ol key={key++} className="list-decimal list-inside space-y-3 mb-6 text-gray-700 ml-4 marker:text-green-600">
            {listItems.map((item, idx) => {
              const processedText = processBold(item.replace(/^\d+\.\s/, ''));
              return <li key={idx} className="leading-relaxed pl-2 break-words overflow-visible" dangerouslySetInnerHTML={{ __html: processedText }} />;
            })}
          </ol>
        );
      } else if (line.includes('|') && (line.trim().startsWith('|') || line.split('|').length >= 3)) {
        // Table detection
        const tableRows = [line];
        while (i + 1 < lines.length && lines[i + 1].includes('|')) {
          i++;
          tableRows.push(lines[i]);
        }
        
        // Parse table
        const parsedRows = tableRows.map(row => 
          row.split('|').map(cell => cell.trim()).filter(cell => cell !== '')
        );
        
        // Skip separator row (contains only -, :, and spaces)
        const dataRows = parsedRows.filter(row => 
          !row.every(cell => /^[\s\-:]+$/.test(cell))
        );
        
        if (dataRows.length > 0) {
          const headers = dataRows[0];
          const bodyRows = dataRows.slice(1);
          
          elements.push(
            <div key={key++} className="overflow-x-auto mb-8 my-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                  <tr>
                    {headers.map((header, idx) => (
                      <th key={idx} className="px-4 py-3 text-left font-semibold text-sm" dangerouslySetInnerHTML={{ __html: processBold(header) }} />
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bodyRows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-green-50 transition-colors duration-200">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-4 py-3 text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: processBold(cell) }} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      } else if (line.trim() === '') {
        elements.push(<div key={key++} className="h-4" />);
      } else {
        // Process bold text (**text**)
        const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        elements.push(
          <p key={key++} className="text-gray-700 leading-relaxed text-base md:text-lg mb-6 break-words overflow-visible" dangerouslySetInnerHTML={{ __html: processedLine }} />
        );
      }
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-green-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <img
          src={article.featuredImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Link
              to={`${baseUrl}/blog`}
              className="inline-flex items-center gap-2 text-white hover:text-gray-200 mb-6 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span>{language === 'ja' ? 'ブログ一覧に戻る' : 'Back to Blog'}</span>
            </Link>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
              {title}
            </h1>

            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{article.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white">
          <div>
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-sm bg-green-50 text-green-700 px-4 py-2 rounded-full"
                  >
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              {renderMarkdown(content)}
            </div>

            <BlogCTA />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogArticle;
