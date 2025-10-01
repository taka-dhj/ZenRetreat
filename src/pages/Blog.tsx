import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Blog: React.FC = () => {
  const { language } = useLanguage();

  const blogPosts = [
    {
      id: 1,
      title: language === 'ja' ? '春のヨガリトリート：桜の季節に心を整える' : 'Spring Yoga Retreat: Aligning the Mind During Cherry Blossom Season',
      excerpt: language === 'ja' 
        ? '桜の咲く季節は、新しい始まりの時期です。この美しい季節に、心と体を整えるヨガリトリートの魅力についてご紹介します...'
        : 'Cherry blossom season is a time of new beginnings. Discover the charm of yoga retreats that align mind and body during this beautiful season...',
      author: language === 'ja' ? 'Maiko' : 'Maiko',
      date: language === 'ja' ? '2025年1月15日' : 'January 15, 2025',
      image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: language === 'ja' ? 'ヨガ' : 'Yoga'
    },
    {
      id: 2,
      title: language === 'ja' ? '瞑想の始め方：初心者のための基本ガイド' : 'How to Start Meditation: A Basic Guide for Beginners',
      excerpt: language === 'ja' 
        ? '瞑想を始めたいけれど、どうすればいいかわからない方へ。基本的な瞑想の方法と、日常生活への取り入れ方をご紹介します...'
        : 'For those who want to start meditating but don\'t know how. We introduce basic meditation methods and how to incorporate them into daily life...',
      author: language === 'ja' ? 'Hiroshi' : 'Hiroshi',
      date: language === 'ja' ? '2025年1月10日' : 'January 10, 2025',
      image: 'https://images.pexels.com/photos/3775603/pexels-photo-3775603.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: language === 'ja' ? '瞑想' : 'Meditation'
    },
    {
      id: 3,
      title: language === 'ja' ? 'セブ島リトリート体験記：参加者の声' : 'Cebu Island Retreat Experience: Participant Stories',
      excerpt: language === 'ja' 
        ? 'セブ島でのリトリートに参加された方々の体験談をお聞きしました。トロピカルな環境での癒しの体験をご紹介します...'
        : 'We interviewed participants of our Cebu Island retreats. Discover healing experiences in tropical environments...',
      author: language === 'ja' ? 'Ayaka' : 'Ayaka',
      date: language === 'ja' ? '2025年1月5日' : 'January 5, 2025',
      image: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: language === 'ja' ? '体験記' : 'Experience'
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                  
                  <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200 text-sm font-medium">
                    <span>{language === 'ja' ? '続きを読む' : 'Read More'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            {language === 'ja' ? 'ニュースレター購読' : 'Subscribe to Newsletter'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'ja' 
              ? '最新のリトリート情報やヨガのヒントを定期的にお届けします'
              : 'Get regular updates on the latest retreat information and yoga tips'
            }
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="email"
              placeholder={language === 'ja' ? 'メールアドレス' : 'Email address'}
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-white/20 focus:outline-none"
            />
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium">
              {language === 'ja' ? '購読' : 'Subscribe'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;