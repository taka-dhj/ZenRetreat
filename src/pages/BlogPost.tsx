import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Mail, Globe, MessageCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import CTASection from '../components/CTASection';
import ContactFormModal from '../components/ContactFormModal';

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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
    let ctaMode = false;
    let ctaTitle = '';
    let ctaSubtitle = '';
    let ctaDescription = '';
    let ctaContact = '';
    let ctaWebsite = '';
    let ctaNote = '';
    const elements: JSX.Element[] = [];

    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      const trimmedLine = line.trim();

      // CTAセクションの検出（日本語・英語対応）
      if ((trimmedLine.includes('あなただけの') && trimmedLine.includes('創造しませんか')) ||
          (trimmedLine.includes('Create Your') && trimmedLine.includes('Retreat'))) {
        ctaMode = true;
        ctaTitle = trimmedLine;
        continue;
      }

      if (ctaMode) {
        if (trimmedLine.startsWith('Zen Retreat ASIA')) {
          ctaSubtitle = trimmedLine;
          continue;
        }
        if (trimmedLine.includes('お問い合わせ：') || trimmedLine.includes('Contact:')) {
          const separator = trimmedLine.includes('：') ? '：' : ':';
          ctaContact = trimmedLine.split(separator)[1]?.trim() || '';
          continue;
        }
        if (trimmedLine.includes('ウェブサイト：') || trimmedLine.includes('Website:')) {
          const separator = trimmedLine.includes('：') ? '：' : ':';
          ctaWebsite = trimmedLine.split(separator)[1]?.trim() || '';
          continue;
        }
        if (trimmedLine.includes('日本語・英語対応') || trimmedLine.includes('Japanese and English')) {
          ctaNote = trimmedLine;
          // CTAカードを作成
          elements.push(
            <div key={`cta-${index}`} className="my-12 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* タイトルボックス（色付き） */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-5">
                <div className="flex items-center space-x-3">
                  <Sparkles className="text-yellow-300 flex-shrink-0" size={24} />
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {ctaSubtitle}
                  </h3>
                </div>
              </div>

              {/* 本文エリア */}
              <div className="p-8 md:p-10">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {ctaDescription}
                </p>

                {/* 連絡先情報カード */}
                <div className="space-y-4 mb-8">
                  {ctaContact && (
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
                      <Mail className="text-green-600 mt-1 flex-shrink-0" size={24} />
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">
                          {language === 'ja' ? 'お問い合わせ' : 'Contact'}
                        </p>
                        <a href={`mailto:${ctaContact}`} className="text-blue-600 hover:text-blue-700 font-medium text-lg underline break-all">
                          {ctaContact}
                        </a>
                      </div>
                    </div>
                  )}

                  {ctaWebsite && (
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
                      <Globe className="text-green-600 mt-1 flex-shrink-0" size={24} />
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">
                          {language === 'ja' ? 'ウェブサイト' : 'Website'}
                        </p>
                        <a href={ctaWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium text-lg underline break-all">
                          {ctaWebsite}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* 備考欄 */}
                {ctaNote && (
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border-l-4 border-green-600 mb-6">
                    <MessageCircle className="text-green-600 flex-shrink-0" size={20} />
                    <p className="text-gray-800 font-medium">{ctaNote}</p>
                  </div>
                )}

                {/* お問い合わせボタン */}
                <div className="text-center">
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="inline-flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
                  >
                    <Mail size={24} />
                    <span>{language === 'ja' ? '今すぐお問い合わせ' : 'Contact Us Now'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
          ctaMode = false;
          ctaTitle = '';
          ctaSubtitle = '';
          ctaDescription = '';
          ctaContact = '';
          ctaWebsite = '';
          ctaNote = '';
          continue;
        }
        if (trimmedLine.length > 0 && !trimmedLine.includes('Zen Retreat ASIA')) {
          ctaDescription += (ctaDescription ? ' ' : '') + trimmedLine;
          continue;
        }
      }

      // 見出し候補の検出（h2用）
      const isH2Heading = trimmedLine.length > 0 &&
                       trimmedLine.length <= 80 &&
                       !trimmedLine.endsWith('。') &&
                       !trimmedLine.endsWith('.') &&
                       !trimmedLine.includes('：') &&
                       !trimmedLine.includes(':') &&
                       !trimmedLine.startsWith('出典') &&
                       !trimmedLine.startsWith('Source') &&
                       (trimmedLine.includes('市場') ||
                        trimmedLine.includes('価値') ||
                        trimmedLine.includes('影響') ||
                        trimmedLine.includes('現状') ||
                        trimmedLine.includes('歴史') ||
                        trimmedLine.includes('Market') ||
                        trimmedLine.includes('Value') ||
                        trimmedLine.includes('Impact') ||
                        trimmedLine.includes('Status') ||
                        trimmedLine.includes('History'));

      // h3見出しの検出（より具体的なトピック - コロン含む見出しを優先）
      const isH3Heading = trimmedLine.length > 0 &&
                       trimmedLine.length <= 120 &&
                       !trimmedLine.endsWith('。') &&
                       !trimmedLine.endsWith('.') &&
                       !trimmedLine.startsWith('出典') &&
                       !trimmedLine.startsWith('Source') &&
                       !trimmedLine.startsWith('お問い合わせ') &&
                       !trimmedLine.startsWith('ウェブサイト') &&
                       !trimmedLine.startsWith('日本語・英語') &&
                       (trimmedLine.includes('禅瞑想と寺院宿坊：') ||
                        trimmedLine.includes('禅瞑想とヨガの相乗効果：') ||
                        trimmedLine.includes('座禅体験とアーサナの融合：') ||
                        trimmedLine.includes('現代科学が解明する') ||
                        trimmedLine.includes('マインドフルネスと和の心：') ||
                        trimmedLine.includes('富士山：') ||
                        trimmedLine.includes('高野山：') ||
                        trimmedLine.includes('屋久島：') ||
                        trimmedLine.includes('伊勢神宮：') ||
                        trimmedLine.includes('科学的に実証された') ||
                        trimmedLine.includes('温泉とヨガ') ||
                        trimmedLine.includes('森林浴（森林セラピー）') ||
                        trimmedLine.includes('Hot Springs and Yoga') ||
                        trimmedLine.includes('Zen Meditation and Temple') ||
                        trimmedLine.includes('Forest Bathing') ||
                        trimmedLine.includes('Mindfulness and Wa'));

      if (isH3Heading && index > 0) {
        elements.push(
          <h3 key={index} className="text-xl md:text-2xl font-bold text-green-700 mt-10 mb-5 pb-2 border-b border-green-300 flex items-center space-x-2">
            <span className="w-1 h-6 bg-green-600 rounded"></span>
            <span>{trimmedLine}</span>
          </h3>
        );
        continue;
      }

      if (isH2Heading && index > 0) {
        elements.push(
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b-2 border-green-500">
            {trimmedLine}
          </h2>
        );
        continue;
      }

      if (line.includes('出典:') || line.includes('Source:') || line.includes('出 典')) {
        elements.push(
          <div key={index} className="my-6 pl-4 border-l-2 border-gray-300">
            <p className="text-xs text-gray-500 italic">
              {line}
            </p>
          </div>
        );
        continue;
      }

      if (line.trim() === '') {
        elements.push(<div key={index} className="h-2"></div>);
        continue;
      }

      elements.push(
        <p key={index} className="text-gray-700 leading-relaxed mb-4 text-lg">
          {line}
        </p>
      );
    }

    return elements;
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
      <ContactFormModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default BlogPost;
