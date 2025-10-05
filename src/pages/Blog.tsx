import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { blogArticles } from '../data/blogArticles';

const Blog: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(blogArticles.map(article => article.category)));

  const filteredArticles = selectedCategory
    ? blogArticles.filter(article => article.category === selectedCategory)
    : blogArticles;

  const baseUrl = language === 'en' ? '/en' : '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <div className="relative h-96 bg-gradient-to-r from-green-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <img
          src="https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Blog"
          className="w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-wide">
              {language === 'ja' ? 'ブログ' : 'Blog'}
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
              {language === 'ja'
                ? 'ヨガと日本の文化、ウェルネスに関する記事'
                : 'Articles about Yoga, Japanese Culture, and Wellness'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
            }`}
          >
            {language === 'ja' ? 'すべて' : 'All'}
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <Link
              key={article.id}
              to={`${baseUrl}/blog/${article.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={language === 'ja' ? article.title.ja : article.title.en}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                  {article.category}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                  {language === 'ja' ? article.title.ja : article.title.en}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {language === 'ja' ? article.excerpt.ja : article.excerpt.en}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{article.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                </div>

                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {language === 'ja'
                ? '記事が見つかりませんでした'
                : 'No articles found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
