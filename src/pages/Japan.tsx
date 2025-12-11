import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRetreats } from '../hooks/useRetreats';
import { getImageUrl, handleImageError } from '../lib/imageUtils';
import CTASection from '../components/CTASection';

const Japan: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const { retreats } = useRetreats();

  const japanRetreats = useMemo(() => {
    return retreats
      .filter(r => r.type === 'Japan')
      .map(retreat => ({
        id: retreat.id,
        title: language === 'ja' ? retreat.title_ja : retreat.title_en,
        location: language === 'ja' ? retreat.location_ja : retreat.location_en,
        price: retreat.price,
        image: retreat.image,
        description: language === 'ja' ? retreat.description_ja : retreat.description_en,
        includes: language === 'ja' ? retreat.includes_ja : retreat.includes_en
      }));
  }, [retreats, language]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            {t('nav.japan')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ja'
              ? '日本各地の美しい自然と伝統文化の中で、心身の調和を見つける特別な旅。古来からの知恵と現代のウェルネス技術が融合した、本格的なリトリート体験をお楽しみください。'
              : 'A special journey to find harmony of mind and body in Japan\'s beautiful nature and traditional culture. Enjoy authentic retreat experiences where ancient wisdom and modern wellness techniques merge.'
            }
          </p>
        </div>
      </section>

      {/* Retreats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {japanRetreats.map((retreat) => {
              // 価格フォーマット関数
              const formatPrice = (price: number | undefined | null) => {
                if (price == null || isNaN(price)) {
                  return language === 'ja' ? 'お問い合わせ' : 'Contact us';
                }
                if (language === 'ja') {
                  return `¥${price.toLocaleString('ja-JP')}`;
                }
                return `¥${price.toLocaleString('en-US')}`;
              };

              // 特別なポイントを取得（includesの最初の要素、またはdescriptionから抽出）
              const getSpecialPoint = () => {
                if (retreat.includes && Array.isArray(retreat.includes) && retreat.includes.length > 0) {
                  // includes配列の最初の要素を使用
                  return retreat.includes[0];
                }
                // includesが空の場合は、descriptionから最初の文を抽出
                if (retreat.description) {
                  const firstSentence = retreat.description.split(/[。\.]/)[0];
                  return firstSentence || (language === 'ja' ? '特別な体験' : 'Special Experience');
                }
                return language === 'ja' ? '特別な体験' : 'Special Experience';
              };

              return (
                <div
                  key={retreat.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group flex flex-col"
                >
                  {/* 画像セクション */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={getImageUrl(retreat.image)}
                      alt={retreat.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={handleImageError}
                      loading="lazy"
                      decoding="async"
                    />
                    {/* オーバーレイグラデーション */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* タグ */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-green-600 shadow-md backdrop-blur-sm">
                      {language === 'ja' ? '日本' : 'Japan'}
                    </div>
                  </div>

                  {/* コンテンツセクション */}
                  <div className="p-8 flex flex-col flex-grow">
                    {/* タイトル */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
                      {retreat.title}
                    </h3>

                    {/* 説明文 */}
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 text-sm">
                      {retreat.description}
                    </p>

                    {/* メタ情報 - アイコン付きタグ形式 */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {/* 場所 */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-700">
                        <MapPin size={14} className="text-green-600" />
                        <span className="truncate max-w-[120px]">{retreat.location}</span>
                      </div>

                      {/* 特別なポイント */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-lg text-xs font-semibold text-green-700 border border-green-200">
                        <Sparkles size={14} className="text-green-600" />
                        <span className="truncate max-w-[150px]">{getSpecialPoint()}</span>
                      </div>
                    </div>

                    {/* 価格表示 */}
                    {retreat.price != null && !isNaN(retreat.price) && (
                      <div className="mb-6 pt-4 border-t border-gray-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-green-700">
                            {formatPrice(retreat.price)}
                          </span>
                          {language === 'ja' && (
                            <span className="text-sm text-gray-500">から</span>
                          )}
                          {language === 'en' && (
                            <span className="text-sm text-gray-500">from</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* CTAボタン */}
                    <Link
                      to={`${baseUrl}/retreat/${retreat.id}`}
                      className="mt-auto block w-full text-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-lg transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                    >
                      {t('common.learn-more')}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Japan;
