import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import CTASection from '../components/CTASection';

interface BlogPost {
  id: string;
  title_ja: string;
  title_en: string;
  excerpt_ja: string;
  excerpt_en: string;
  content_ja: string;
  content_en: string;
  author: string;
  category_ja: string;
  category_en: string;
  image: string;
  published_date: string;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'ja') {
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">{language === 'ja' ? '読み込み中...' : 'Loading...'}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{language === 'ja' ? '記事が見つかりません' : 'Article not found'}</p>
          <Link to="/blog" className="text-green-600 hover:text-green-700">
            {language === 'ja' ? 'ブログに戻る' : 'Back to Blog'}
          </Link>
        </div>
      </div>
    );
  }

  const title = language === 'ja' ? post.title_ja : post.title_en;
  const content = language === 'ja' ? post.content_ja : post.content_en;
  const category = language === 'ja' ? post.category_ja : post.category_en;
  const excerpt = language === 'ja' ? post.excerpt_ja : post.excerpt_en;

  const renderContent = () => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('## ')) {
        const headingText = line.replace('## ', '');
        return (
          <div key={index} className="relative my-12">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t-2 border-gradient-to-r from-green-200 via-green-400 to-green-200"></div>
            </div>
            <div className="relative flex justify-center">
              <h2 className="bg-white px-6 text-2xl md:text-3xl font-semibold text-gray-800 inline-block">
                {headingText}
              </h2>
            </div>
          </div>
        );
      }

      if (line.startsWith('**出典:**') || line.startsWith('**Source:**')) {
        return (
          <div key={index} className="my-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-green-600 rounded-r-lg">
            <p className="text-sm text-gray-700 italic font-medium">
              {line.replace('**出典:**', '').replace('**Source:**', '')}
            </p>
          </div>
        );
      }

      if (line.startsWith('**') && line.includes('Zen Retreat ASIA')) {
        return (
          <div key={index} className="my-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              {line.replace(/\*\*/g, '')}
            </h3>
          </div>
        );
      }

      if (line.includes('お問い合わせ：') || line.includes('Contact:')) {
        const parts = line.split('：');
        if (parts.length > 1) {
          return (
            <p key={index} className="text-gray-800 leading-relaxed mb-3">
              <span className="font-semibold text-green-700">{parts[0]}：</span>
              <a href={`mailto:${parts[1].trim()}`} className="text-blue-600 hover:text-blue-700 underline">
                {parts[1].trim()}
              </a>
            </p>
          );
        }
        const contactParts = line.split(': ');
        if (contactParts.length > 1) {
          return (
            <p key={index} className="text-gray-800 leading-relaxed mb-3">
              <span className="font-semibold text-green-700">{contactParts[0]}: </span>
              <a href={`mailto:${contactParts[1].trim()}`} className="text-blue-600 hover:text-blue-700 underline">
                {contactParts[1].trim()}
              </a>
            </p>
          );
        }
      }

      if (line.includes('ウェブサイト：') || line.includes('Website:')) {
        const parts = line.split('：');
        if (parts.length > 1) {
          return (
            <p key={index} className="text-gray-800 leading-relaxed mb-3">
              <span className="font-semibold text-green-700">{parts[0]}：</span>
              <a href={parts[1].trim()} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                {parts[1].trim()}
              </a>
            </p>
          );
        }
        const websiteParts = line.split(': ');
        if (websiteParts.length > 1) {
          return (
            <p key={index} className="text-gray-800 leading-relaxed mb-3">
              <span className="font-semibold text-green-700">{websiteParts[0]}: </span>
              <a href={websiteParts[1].trim()} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                {websiteParts[1].trim()}
              </a>
            </p>
          );
        }
      }

      if (line.trim() === '') {
        return <div key={index} className="h-2"></div>;
      }

      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4 text-lg">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-8 transition-colors duration-200 font-medium"
        >
          <ArrowLeft size={18} />
          <span>{language === 'ja' ? 'ブログに戻る' : 'Back to Blog'}</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            <img
              src={post.image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="inline-block px-4 py-2 bg-green-600 rounded-full text-sm font-medium mb-4">
                {category}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                {title}
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-8 border-b-2 border-gray-100">
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <User size={18} className="text-green-600" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-green-600" />
                  <span>{formatDate(post.published_date)}</span>
                </div>
              </div>
            </div>

            <div className="mb-10 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-l-4 border-green-600">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                {excerpt}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              {renderContent()}
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-center">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-white hover:text-gray-100 transition-colors duration-200 font-medium text-lg"
          >
            <ArrowLeft size={20} />
            <span>{language === 'ja' ? 'ブログ一覧に戻る' : 'Back to Blog List'}</span>
          </Link>
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t-2 border-gray-200 pt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {language === 'ja' ? 'この記事のキーワード' : 'Keywords'}
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {(language === 'ja'
                ? ['ヨガリトリート', '日本', '温泉', '禅瞑想', '森林浴', 'ウェルネス', 'マインドフルネス', '富士山', '高野山', '屋久島', '聖地巡礼', 'スピリチュアル']
                : ['Yoga Retreat', 'Japan', 'Hot Springs', 'Zen Meditation', 'Forest Bathing', 'Wellness', 'Mindfulness', 'Mount Fuji', 'Koyasan', 'Yakushima', 'Sacred Sites', 'Spiritual']
              ).map((keyword, idx) => (
                <span key={idx} className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default BlogPost;
