import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Users, Calendar, Check, ArrowLeft, Sunrise, Coffee, Moon, Utensils, Waves, Mountain, Heart, Sparkles, Sun, CircleDot } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRetreat } from '../hooks/useRetreats';
import { getImageUrl, handleImageError } from '../lib/imageUtils';
import CTASection from '../components/CTASection';
import ContactFormModal from '../components/ContactFormModal';

const RetreatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const baseUrl = language === 'ja' ? '/ja' : '';
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  const { retreat, loading, error } = useRetreat(id);

  // スティッキーCTAの表示制御
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // スクロールしたら表示（300px以上スクロールしたら）
      setShowStickyCTA(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 時間帯に応じたアイコンを取得
  const getTimeIcon = (time: string, activity: string, index: number, scheduleLength: number) => {
    const hour = parseInt(time.split(':')[0]);
    const activityLower = activity.toLowerCase();
    const isFirstActivity = index === 0;

    // 1. 一番最初のアクティビティ = 日の出アイコン
    if (isFirstActivity) {
      return <Sunrise className="w-6 h-6 text-orange-400" />;
    }

    // 2. 食事に関する記述がある場合 = 食事アイコン
    if (
      activityLower.includes('朝食') || activityLower.includes('breakfast') ||
      activityLower.includes('昼食') || activityLower.includes('lunch') ||
      activityLower.includes('夕食') || activityLower.includes('dinner') ||
      activityLower.includes('食事') || activityLower.includes('meal') ||
      activityLower.includes('食事') || activityLower.includes('food')
    ) {
      return <Utensils className="w-6 h-6 text-rose-500" />;
    }

    // 3. ヨガ、禅、坐禅の表示がある場合 = 座禅のアイコン
    if (
      activityLower.includes('ヨガ') || activityLower.includes('yoga') ||
      activityLower.includes('禅') || activityLower.includes('zen') ||
      activityLower.includes('坐禅') || activityLower.includes('zazen') ||
      activityLower.includes('瞑想') || activityLower.includes('meditation')
    ) {
      return <CircleDot className="w-6 h-6 text-emerald-600" />;
    }

    // 4. それ以外の午前中（6時〜12時） = 太陽アイコン
    if (hour >= 6 && hour < 12) {
      return <Sun className="w-6 h-6 text-amber-500" />;
    }

    // 5. それ以外の午後（12時〜18時） = ハートアイコン
    if (hour >= 12 && hour < 18) {
      return <Heart className="w-6 h-6 text-pink-400" />;
    }

    // 6. それ以外の夕方以降（18時以降） = 月アイコン
    if (hour >= 18) {
      return <Moon className="w-6 h-6 text-indigo-400" />;
    }

    // 早朝（6時未満）は太陽アイコン
    return <Sun className="w-6 h-6 text-amber-500" />;
  };

  // 活動内容を情緒的に変換
  const getEmotionalDescription = (time: string, activity: string, language: string): string => {
    const hour = parseInt(time.split(':')[0]);
    
    if (language === 'ja') {
      if (activity.includes('朝ヨガ') || activity.includes('朝 ヨガ') || activity.toLowerCase().includes('yoga')) {
        return `${time} Sunrise Yoga: 波音をBGMに、太陽のエネルギーを全身で浴びる`;
      }
      if (activity.includes('朝食') || activity.includes('breakfast')) {
        return `${time} 朝食: 自然の恵みを感じながら、丁寧にいただくひととき`;
      }
      if (activity.includes('瞑想') || activity.toLowerCase().includes('meditation')) {
        return `${time} 瞑想: 静寂の中、内側へと意識を向ける時間`;
      }
      if (activity.includes('夕食') || activity.includes('dinner')) {
        return `${time} 夕食: 季節の食材が織りなす、心温まる料理の時間`;
      }
      if (hour >= 20 || activity.includes('夜') || activity.includes('night')) {
        return `${time} 夜の静けさ: 星空の下、一日の経験を心に刻む`;
      }
      // デフォルト: 元の活動内容を使用
      return `${time} ${activity}`;
    } else {
      if (activity.toLowerCase().includes('yoga') || activity.toLowerCase().includes('morning')) {
        return `${time} Sunrise Yoga: Breathe in the ocean breeze as you welcome the morning sun`;
      }
      if (activity.toLowerCase().includes('breakfast') || activity.toLowerCase().includes('coffee')) {
        return `${time} Breakfast: Savor each moment as you connect with nature's gifts`;
      }
      if (activity.toLowerCase().includes('meditation')) {
        return `${time} Meditation: Journey inward in the embrace of silence`;
      }
      if (activity.toLowerCase().includes('dinner')) {
        return `${time} Dinner: A heartwarming culinary experience with seasonal ingredients`;
      }
      if (hour >= 20 || activity.toLowerCase().includes('night')) {
        return `${time} Evening Serenity: Under the starlit sky, reflect on the day's journey`;
      }
      // デフォルト
      return `${time} ${activity}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{language === 'ja' ? '読み込み中...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            to={`${baseUrl}/retreats`}
            className="text-green-600 hover:text-green-700"
          >
            {language === 'ja' ? 'リトリート一覧に戻る' : 'Back to retreats'}
          </Link>
        </div>
      </div>
    );
  }

  if (!retreat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-800 mb-4">
            {language === 'ja' ? 'リトリートが見つかりません' : 'Retreat not found'}
          </h1>
          <Link
            to={`${baseUrl}/retreats`}
            className="text-green-600 hover:text-green-700"
          >
            {language === 'ja' ? 'リトリート一覧に戻る' : 'Back to retreats'}
          </Link>
        </div>
      </div>
    );
  }

  const title = language === 'ja' ? retreat.title_ja : retreat.title_en;
  const location = language === 'ja' ? retreat.location_ja : retreat.location_en;
  const description = language === 'ja' ? retreat.description_ja : retreat.description_en;
  const longDescription = language === 'ja' ? retreat.long_description_ja : retreat.long_description_en;
  const includes = language === 'ja' ? retreat.includes_ja : retreat.includes_en;
  const schedule = language === 'ja' ? retreat.schedule_ja : retreat.schedule_en;

  const imageUrl = getImageUrl(retreat.image);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden mt-16">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
              retreat.type === 'Japan' ? 'bg-green-500' : 'bg-blue-500'
            }`}>
              {retreat.type === 'Japan' ?
                (language === 'ja' ? '日本リトリート' : 'Japan Retreat') :
                (language === 'ja' ? 'セブリトリート' : 'Cebu Retreat')
              }
            </div>
            <h1 className="text-3xl md:text-5xl font-light mb-4">{title}</h1>
            <p className="text-xl opacity-90">{description}</p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to={`${baseUrl}/retreats`}
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>{language === 'ja' ? 'リトリート一覧に戻る' : 'Back to retreats'}</span>
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12 overflow-visible">
              {/* Overview */}
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 overflow-visible">
                <h2 className="text-2xl font-medium text-gray-800 mb-6">
                  {t('retreat.overview')}
                </h2>
                <div className="text-gray-600 leading-relaxed text-base md:text-lg overflow-visible">
                  {longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0 break-words overflow-visible">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>

              {/* Daily Schedule - Visual Timeline */}
              <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-10">
                  {t('retreat.schedule')}
                </h2>
                <div className="space-y-8">
                  {schedule.map((item: any, index: number) => {
                    const emotionalDescription = getEmotionalDescription(item.time, item.activity, language);
                    const timeIcon = getTimeIcon(item.time, item.activity, index, schedule.length);
                    
                    return (
                      <div key={index} className="relative pl-14 pb-8 last:pb-0">
                        {/* Timeline line */}
                        {index < schedule.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-green-200"></div>
                        )}
                        
                        {/* Icon circle */}
                        <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-white border-2 border-green-500 flex items-center justify-center shadow-md z-10">
                          {timeIcon}
                        </div>
                        
                        {/* Content */}
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Text content */}
                          <div className="flex-1">
                            <p className={`text-gray-800 leading-relaxed ${
                              language === 'ja' ? 'text-lg md:text-xl font-serif-ja' : 'text-lg md:text-xl font-serif-en'
                            }`}>
                              {emotionalDescription}
                            </p>
                          </div>
                          
                          {/* Thumbnail image (if available) */}
                          {item.image && (
                            <div className="w-full md:w-48 flex-shrink-0">
                              <img
                                src={getImageUrl(item.image)}
                                alt={item.activity}
                                className="w-full h-32 md:h-40 rounded-lg shadow-md object-cover"
                                loading="lazy"
                                onError={handleImageError}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer Testimonials / Social Proof */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm p-8 md:p-10 border border-gray-100">
                <div className="flex items-center space-x-3 mb-8">
                  <Sparkles className="w-6 h-6 text-green-600" />
                  <h2 className={`text-2xl md:text-3xl font-medium text-gray-800 ${
                    language === 'ja' ? 'font-serif-ja' : 'font-serif-en'
                  }`}>
                    {language === 'ja' ? 'お客様の声' : 'Guest Testimonials'}
                  </h2>
                </div>
                <div className="space-y-6">
                  {language === 'ja' ? (
                    <>
                      <blockquote className="relative pl-8 border-l-4 border-green-500">
                        <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 break-words overflow-visible ${
                          language === 'ja' ? 'font-serif-ja' : 'font-serif-en'
                        }`}>
                          「今までで一番よく眠れた。日常の雑音から解放されて、本当の自分を取り戻せた気がします。」
                        </p>
                        <footer className="text-gray-600 text-sm font-medium">
                          — 30代女性・会社員
                        </footer>
                      </blockquote>
                      <blockquote className="relative pl-8 border-l-4 border-green-500">
                        <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 break-words overflow-visible ${
                          language === 'ja' ? 'font-serif-ja' : 'font-serif-en'
                        }`}>
                          「自然の中で過ごす時間が、こんなにも心を満たしてくれるとは思わなかった。人生を変える体験でした。」
                        </p>
                        <footer className="text-gray-600 text-sm font-medium">
                          — 40代男性・自営業
                        </footer>
                      </blockquote>
                    </>
                  ) : (
                    <>
                      <blockquote className="relative pl-8 border-l-4 border-green-500">
                        <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 break-words overflow-visible ${
                          language === 'ja' ? 'font-serif-ja' : 'font-serif-en'
                        }`}>
                          "A life-changing experience for both of us. We found peace we didn't know we were searching for."
                        </p>
                        <footer className="text-gray-600 text-sm font-medium">
                          — Couple from New York
                        </footer>
                      </blockquote>
                      <blockquote className="relative pl-8 border-l-4 border-green-500">
                        <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 break-words overflow-visible ${
                          language === 'ja' ? 'font-serif-ja' : 'font-serif-en'
                        }`}>
                          "The silence, the nature, the meditation—everything came together perfectly. I've never felt so connected to myself."
                        </p>
                        <footer className="text-gray-600 text-sm font-medium">
                          — Solo traveler from London
                        </footer>
                      </blockquote>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-24 space-y-8">
                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{location}</span>
                  </div>
                </div>

                {/* What's Included */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    {t('retreat.includes')}
                  </h3>
                  <div className="space-y-3">
                    {includes.map((item: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="block w-full bg-green-600 text-white text-center py-4 rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <ContactFormModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* Sticky CTA Bar */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 px-4 py-4 md:py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left side - Micro copy */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">
                  {language === 'ja' ? '残り枠わずか' : 'Limited Availability'}
                </span>
              </div>
              <span className="hidden md:inline text-gray-400">|</span>
              <span className="hidden md:inline">
                {language === 'ja' ? 'ベストレート保証' : 'Best Rate Guaranteed'}
              </span>
            </div>

            {/* Right side - CTA Button */}
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full md:w-auto bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {language === 'ja' ? '空き状況確認 / お問い合わせ' : 'Check Availability / Contact'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetreatDetail;
