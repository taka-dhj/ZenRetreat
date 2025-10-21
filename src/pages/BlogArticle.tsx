import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, User, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { blogArticles } from '../data/blogArticles';
import BlogCTA from '../components/BlogCTA';

const BlogArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();

  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-light text-gray-800 mb-4">
            {language === 'ja' ? '記事が見つかりません' : 'Article Not Found'}
          </h1>
          <Link
            to={language === 'en' ? '/en/blog' : '/blog'}
            className="text-green-600 hover:text-green-700 underline"
          >
            {language === 'ja' ? 'ブログ一覧に戻る' : 'Back to Blog'}
          </Link>
        </div>
      </div>
    );
  }

  const baseUrl = language === 'en' ? '/en' : '';
  const title = language === 'ja' ? article.title.ja : article.title.en;
  const content = language === 'ja' ? article.content.ja : article.content.en;

  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={key++} className="text-4xl md:text-5xl font-light text-gray-900 mb-6 mt-10 leading-tight">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="relative text-3xl md:text-4xl font-light text-gray-900 mb-8 mt-14 pb-5 pl-6 leading-tight border-b border-gray-200 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-green-700 before:via-green-600 before:to-green-700 before:rounded-full after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-24 after:h-[2px] after:bg-green-700">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 mt-8 leading-snug">
            {line.substring(4)}
          </h3>
        );
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
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed pl-2">{item.substring(2)}</li>
            ))}
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
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed pl-2">{item.replace(/^\d+\.\s/, '')}</li>
            ))}
          </ol>
        );
      } else if (line.trim() === '') {
        elements.push(<div key={key++} className="h-4" />);
      } else {
        // Process bold text (**text**)
        const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        elements.push(
          <p key={key++} className="text-gray-700 leading-relaxed text-lg mb-6" dangerouslySetInnerHTML={{ __html: processedLine }} />
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
