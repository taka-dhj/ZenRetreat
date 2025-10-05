import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { getImageUrl, handleImageError } from '../lib/imageUtils';
import CTASection from '../components/CTASection';

const Blog: React.FC = () => {
  const { language } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const { posts, loading } = useBlogPosts();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'ja') {
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const blogPosts = posts.map(post => ({
    id: post.id,
    title: language === 'ja' ? post.title_ja : post.title_en,
    excerpt: language === 'ja' ? post.excerpt_ja : post.excerpt_en,
    author: post.author,
    date: formatDate(post.published_date),
    image: post.image,
    category: language === 'ja' ? post.category_ja : post.category_en
  }));

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            {language === 'ja' ? 'ブログ' : 'Blog'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ja' 
              ? 'ヨガ、瞑想、ウェルネスに関する最新の情報やインサイト、体験談をお届けします。'
              : 'Delivering the latest information, insights, and experiences about yoga, meditation, and wellness.'
            }
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{language === 'ja' ? '読み込み中...' : 'Loading...'}</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{language === 'ja' ? 'まだ記事がありません' : 'No articles yet'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User size={12} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`${baseUrl}/blog/${post.id}`}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200 text-sm font-medium"
                  >
                    <span>{language === 'ja' ? '続きを読む' : 'Read More'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Blog;