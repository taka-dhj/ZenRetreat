import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRetreats } from '../hooks/useRetreats';
import { getImageUrl, handleImageError } from '../lib/imageUtils';
import CTASection from '../components/CTASection';

const Cebu: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const { retreats } = useRetreats();

  // セブの場所タグを正規化する関数
  const normalizeCebuLocation = (location: string): string => {
    // 「フィリピン・セブ島」「セブ島、フィリピン」→「フィリピン・セブ」
    let normalized = location;
    
    // 「セブ島」を「セブ」に変更
    normalized = normalized.replace(/セブ島/g, 'セブ');
    
    // 「、」を「・」に統一
    normalized = normalized.replace(/、/g, '・');
    
    // 「フィリピン」と「セブ」の順序を統一（「フィリピン・セブ」の形式に）
    if (normalized.includes('フィリピン') && normalized.includes('セブ')) {
      // 「セブ・フィリピン」や「セブ、フィリピン」のパターンを「フィリピン・セブ」に
      if (normalized.match(/セブ[・,]\s*フィリピン/)) {
        normalized = normalized.replace(/セブ[・,]\s*フィリピン/, 'フィリピン・セブ');
      }
      // 「フィリピン・セブ」の形式に統一（既に正しい形式の場合はそのまま）
      else if (!normalized.includes('フィリピン・セブ')) {
        // 「フィリピン」と「セブ」が別々にある場合、順序を統一
        normalized = normalized.replace(/フィリピン[^セ]*セブ/, 'フィリピン・セブ');
        normalized = normalized.replace(/セブ[^フ]*フィリピン/, 'フィリピン・セブ');
      }
    }
    
    return normalized.trim() || location;
  };

  const cebuRetreats = useMemo(() => {
    return retreats
      .filter(r => r.type === 'Cebu')
      .map(retreat => {
        const location = language === 'ja' ? retreat.location_ja : retreat.location_en;
        const normalizedLocation = language === 'ja' ? normalizeCebuLocation(location) : location;
        
        return {
          id: retreat.id,
          title: language === 'ja' ? retreat.title_ja : retreat.title_en,
          location: normalizedLocation,
          price: retreat.price,
          image: retreat.image,
          description: language === 'ja' ? retreat.description_ja : retreat.description_en,
          includes: language === 'ja' ? retreat.includes_ja : retreat.includes_en
        };
      });
  }, [retreats, language]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            {t('nav.cebu')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ja' 
              ? 'アジアの楽園セブ島で、トロピカルな自然の中でのリトリート体験。美しいビーチと豊かな自然が、都市生活で疲れた心身を優しく癒します。'
              : 'Retreat experience in tropical nature on Cebu Island, the Asian paradise. Beautiful beaches and rich nature gently heal minds and bodies tired from urban life.'
            }
          </p>
        </div>
      </section>

      {/* Retreats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cebuRetreats.map((retreat) => {
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
              // 日数情報（○泊）を削除、一般的な内容を除外
              const getSpecialPoint = () => {
                let specialPoint = '';
                
                // 除外する一般的な内容
                const excludePatterns = [
                  /空港送迎/i,
                  /送迎/i,
                  /移動/i,
                  /交通/i,
                  /食事/i,
                  /朝食/i,
                  /夕食/i,
                  /ランチ/i,
                ];
                
                if (retreat.includes && Array.isArray(retreat.includes) && retreat.includes.length > 0) {
                  for (const item of retreat.includes) {
                    // 一般的な内容をスキップ
                    if (excludePatterns.some(pattern => pattern.test(item))) {
                      continue;
                    }
                    
                    let cleaned = item
                      .replace(/[（(]\d+泊[）)]/g, '')
                      .replace(/[（(]\d+日[）)]/g, '')
                      .replace(/\d+泊/g, '')
                      .replace(/\d+日/g, '')
                      .replace(/\s*[（(].*?[）)]\s*/g, '')
                      .trim();
                    
                    if (cleaned.endsWith('宿泊')) {
                      cleaned = cleaned.replace(/[での]宿泊$/, '').replace(/宿泊$/, '').trim();
                    }
                    
                    if (cleaned.endsWith('で')) {
                      cleaned = cleaned.replace(/で$/, '').trim();
                    }
                    
                    if (cleaned && cleaned.length > 0) {
                      specialPoint = cleaned;
                      break;
                    }
                  }
                  if (!specialPoint && retreat.includes[0]) {
                    let cleaned = retreat.includes[0]
                      .replace(/[（(]\d+泊[）)]/g, '')
                      .replace(/[（(]\d+日[）)]/g, '')
                      .replace(/\d+泊/g, '')
                      .replace(/\d+日/g, '')
                      .replace(/\s*[（(].*?[）)]\s*/g, '')
                      .trim();
                    
                    if (cleaned.endsWith('宿泊')) {
                      cleaned = cleaned.replace(/[での]宿泊$/, '').replace(/宿泊$/, '').trim();
                    }
                    
                    if (cleaned.endsWith('で')) {
                      cleaned = cleaned.replace(/で$/, '').trim();
                    }
                    
                    specialPoint = cleaned;
                  }
                }
                
                if (!specialPoint && retreat.description) {
                  const firstSentence = retreat.description.split(/[。\.]/)[0];
                  specialPoint = firstSentence || (language === 'ja' ? '特別な体験' : 'Special Experience');
                }
                
                return specialPoint || (language === 'ja' ? '特別な体験' : 'Special Experience');
              };

              return (
                <div key={retreat.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group flex flex-col h-full">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <img
                      src={getImageUrl(retreat.image)}
                      alt={retreat.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={handleImageError}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-blue-600 shadow-md backdrop-blur-sm">
                      {language === 'ja' ? 'セブ' : 'Cebu'}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="h-[4.5rem] flex items-center mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                        {retreat.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 text-sm">
                      {retreat.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 whitespace-nowrap">
                        <MapPin size={14} className="text-blue-600 flex-shrink-0" />
                        <span>{retreat.location}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg text-xs font-semibold text-blue-700 border border-blue-200 whitespace-nowrap">
                        <Sparkles size={14} className="text-blue-600 flex-shrink-0" />
                        <span>{getSpecialPoint()}</span>
                      </div>
                    </div>
                    {retreat.price != null && !isNaN(retreat.price) && (
                      <div className="mb-6 pt-4 border-t border-gray-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-blue-700">
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
                    <Link
                      to={`${baseUrl}/retreat/${retreat.id}`}
                      className="mt-auto block w-full text-center bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white py-4 px-6 rounded-lg transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg transform hover:scale-[1.02]"
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

      {/* Why Choose Cebu */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-800 mb-12 text-center">
            {language === 'ja' ? 'セブリトリートの魅力' : 'Why Choose Cebu Retreats'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏝️</span>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">
                {language === 'ja' ? 'トロピカル環境' : 'Tropical Environment'}
              </h3>
              <p className="text-gray-600">
                {language === 'ja' 
                  ? '美しいビーチと透明な海での特別なヨガ体験'
                  : 'Special yoga experience on beautiful beaches and crystal-clear seas'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌺</span>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">
                {language === 'ja' ? '文化交流' : 'Cultural Exchange'}
              </h3>
              <p className="text-gray-600">
                {language === 'ja' 
                  ? 'フィリピンの伝統的なヒーリング文化との融合'
                  : 'Fusion with traditional Filipino healing culture'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☀️</span>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">
                {language === 'ja' ? '年中温暖' : 'Year-round Warmth'}
              </h3>
              <p className="text-gray-600">
                {language === 'ja' 
                  ? '季節を問わず理想的な気候でのリトリート体験'
                  : 'Retreat experience in ideal climate regardless of season'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Cebu;
