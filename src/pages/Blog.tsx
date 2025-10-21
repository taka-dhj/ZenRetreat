import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, User, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { blogArticles } from '../data/blogArticles';

const Blog: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;

  const categories = Array.from(new Set(blogArticles.map(article => article.category)));
  const allTags = Array.from(new Set(blogArticles.flatMap(article => article.tags))).sort();

  const filteredArticles = useMemo(() => {
    let filtered = blogArticles;

    // カテゴリーフィルター
    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // タグフィルター
    if (selectedTag) {
      filtered = filtered.filter(article => article.tags.includes(selectedTag));
    }

    // 検索フィルター
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article => {
        const title = language === 'ja' ? article.title.ja : article.title.en;
        const excerpt = language === 'ja' ? article.excerpt.ja : article.excerpt.en;
        return (
          title.toLowerCase().includes(query) ||
          excerpt.toLowerCase().includes(query) ||
          article.tags.some(tag => tag.toLowerCase().includes(query))
        );
      });
    }

    return filtered;
  }, [selectedCategory, selectedTag, searchQuery, language]);

  // ページネーション
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // ページ変更時はトップにスクロール
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // フィルター変更時はページをリセット
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

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
        {/* 検索バー */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'ja' ? '記事を検索...' : 'Search articles...'}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* カテゴリーフィルター */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
            {language === 'ja' ? 'カテゴリー' : 'Categories'}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => handleCategoryChange(null)}
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
                onClick={() => handleCategoryChange(category)}
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
        </div>

        {/* タグフィルター */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
            {language === 'ja' ? 'タグ' : 'Tags'}
          </h3>
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            <button
              onClick={() => handleTagChange(null)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                !selectedTag
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {language === 'ja' ? 'すべて' : 'All'}
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 検索結果の件数表示 */}
        <div className="text-center mb-6 text-gray-600">
          {language === 'ja' 
            ? `${filteredArticles.length}件の記事が見つかりました` 
            : `${filteredArticles.length} articles found`}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map(article => (
            <Link
              key={article.id}
              to={`${baseUrl}/blog/${article.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={language === 'ja' ? article.title.ja : article.title.en}
                  loading="lazy"
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

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => {
                // 最初のページ、最後のページ、現在のページ周辺のみ表示
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        currentPage === pageNumber
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return <span key={pageNumber} className="px-2">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* ページ情報 */}
        {filteredArticles.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            {language === 'ja'
              ? `${indexOfFirstArticle + 1}-${Math.min(indexOfLastArticle, filteredArticles.length)} / ${filteredArticles.length}件`
              : `${indexOfFirstArticle + 1}-${Math.min(indexOfLastArticle, filteredArticles.length)} of ${filteredArticles.length} articles`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
