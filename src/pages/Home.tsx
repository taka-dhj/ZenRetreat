import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRetreats } from '../hooks/useRetreats';
import { getImageUrl, handleImageError } from '../lib/imageUtils';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'ja' ? '/ja' : '';
  const { retreats } = useRetreats();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${baseUrl}/retreats?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`${baseUrl}/retreats`);
    }
  };

  // 都道府県リスト（日本語と英語のマッピング）
  const prefectureMap: { [key: string]: { ja: string; en: string } } = {
    '北海道': { ja: '北海道', en: 'Hokkaido' },
    '青森': { ja: '青森', en: 'Aomori' },
    '岩手': { ja: '岩手', en: 'Iwate' },
    '宮城': { ja: '宮城', en: 'Miyagi' },
    '秋田': { ja: '秋田', en: 'Akita' },
    '山形': { ja: '山形', en: 'Yamagata' },
    '福島': { ja: '福島', en: 'Fukushima' },
    '茨城': { ja: '茨城', en: 'Ibaraki' },
    '栃木': { ja: '栃木', en: 'Tochigi' },
    '群馬': { ja: '群馬', en: 'Gunma' },
    '埼玉': { ja: '埼玉', en: 'Saitama' },
    '千葉': { ja: '千葉', en: 'Chiba' },
    '東京': { ja: '東京', en: 'Tokyo' },
    '神奈川': { ja: '神奈川', en: 'Kanagawa' },
    '新潟': { ja: '新潟', en: 'Niigata' },
    '富山': { ja: '富山', en: 'Toyama' },
    '石川': { ja: '石川', en: 'Ishikawa' },
    '福井': { ja: '福井', en: 'Fukui' },
    '山梨': { ja: '山梨', en: 'Yamanashi' },
    '長野': { ja: '長野', en: 'Nagano' },
    '岐阜': { ja: '岐阜', en: 'Gifu' },
    '静岡': { ja: '静岡', en: 'Shizuoka' },
    '愛知': { ja: '愛知', en: 'Aichi' },
    '三重': { ja: '三重', en: 'Mie' },
    '滋賀': { ja: '滋賀', en: 'Shiga' },
    '京都': { ja: '京都', en: 'Kyoto' },
    '大阪': { ja: '大阪', en: 'Osaka' },
    '兵庫': { ja: '兵庫', en: 'Hyogo' },
    '奈良': { ja: '奈良', en: 'Nara' },
    '和歌山': { ja: '和歌山', en: 'Wakayama' },
    '鳥取': { ja: '鳥取', en: 'Tottori' },
    '島根': { ja: '島根', en: 'Shimane' },
    '岡山': { ja: '岡山', en: 'Okayama' },
    '広島': { ja: '広島', en: 'Hiroshima' },
    '山口': { ja: '山口', en: 'Yamaguchi' },
    '徳島': { ja: '徳島', en: 'Tokushima' },
    '香川': { ja: '香川', en: 'Kagawa' },
    '愛媛': { ja: '愛媛', en: 'Ehime' },
    '高知': { ja: '高知', en: 'Kochi' },
    '福岡': { ja: '福岡', en: 'Fukuoka' },
    '佐賀': { ja: '佐賀', en: 'Saga' },
    '長崎': { ja: '長崎', en: 'Nagasaki' },
    '熊本': { ja: '熊本', en: 'Kumamoto' },
    '大分': { ja: '大分', en: 'Oita' },
    '宮崎': { ja: '宮崎', en: 'Miyazaki' },
    '鹿児島': { ja: '鹿児島', en: 'Kagoshima' },
    '沖縄': { ja: '沖縄', en: 'Okinawa' },
  };

  // 都道府県を抽出する関数
  const extractPrefecture = (locationJa: string, locationEn: string): string => {
    for (const [prefJa, prefData] of Object.entries(prefectureMap)) {
      if (locationJa.includes(prefJa)) {
        return language === 'ja' ? prefData.ja : prefData.en;
      }
    }
    const fallback = locationJa.split(/[・・,、]/)[0] || locationJa;
    return fallback;
  };

  // タイトルから都道府県を削除する関数
  const removePrefectureFromTitle = (title: string, locationJa: string): string => {
    if (language !== 'ja') return title;
    for (const [prefJa] of Object.entries(prefectureMap)) {
      if (locationJa.includes(prefJa)) {
        const patterns = [
          new RegExp(`^${prefJa}[・・]`, 'g'),
          new RegExp(`^${prefJa}\\s*[・・]`, 'g'),
        ];
        let cleanedTitle = title;
        for (const pattern of patterns) {
          cleanedTitle = cleanedTitle.replace(pattern, '');
        }
        return cleanedTitle.trim() || title;
      }
    }
    return title;
  };

  // 場所から都道府県を削除する関数
  const removePrefectureFromLocation = (location: string, locationJa: string): string => {
    if (language !== 'ja') return location;
    
    let cleanedLocation = location;
    
    // 都道府県を前後から削除
    for (const [prefJa] of Object.entries(prefectureMap)) {
      if (locationJa.includes(prefJa)) {
        // 前から削除：「都道府県・」「都道府県・」
        const frontPatterns = [
          new RegExp(`^${prefJa}[・・]`, 'g'),
          new RegExp(`^${prefJa}\\s*[・・]`, 'g'),
        ];
        for (const pattern of frontPatterns) {
          cleanedLocation = cleanedLocation.replace(pattern, '');
        }
        
        // 後ろから削除：「、都道府県」「・都道府県」
        const backPatterns = [
          new RegExp(`[、,]${prefJa}$`, 'g'),
          new RegExp(`[・・]${prefJa}$`, 'g'),
          new RegExp(`\\s+${prefJa}$`, 'g'),
        ];
        for (const pattern of backPatterns) {
          cleanedLocation = cleanedLocation.replace(pattern, '');
        }
      }
    }
    
    return cleanedLocation.trim() || location;
  };

  const featuredRetreats = useMemo(() => {
    const featured = retreats.filter(r =>
      ['kyoto-chishakuin', 'yamanashi-forest', 'cebu-beach'].includes(r.id)
    );
    return featured.map(retreat => {
      const location = language === 'ja' ? retreat.location_ja : retreat.location_en;
      const originalTitle = language === 'ja' ? retreat.title_ja : retreat.title_en;
      const cleanedTitle = removePrefectureFromTitle(originalTitle, retreat.location_ja);
      const cleanedLocation = removePrefectureFromLocation(location, retreat.location_ja);
      const prefecture = retreat.type === 'Japan' 
        ? extractPrefecture(retreat.location_ja, retreat.location_en)
        : (language === 'ja' ? 'セブ' : 'Cebu');
      
      return {
        id: retreat.id,
        title: cleanedTitle,
        location: cleanedLocation,
        prefecture: prefecture,
        price: retreat.price,
        type: retreat.type,
        image: retreat.image,
        description: language === 'ja' ? retreat.description_ja : retreat.description_en,
        includes: language === 'ja' ? retreat.includes_ja : retreat.includes_en
      };
    });
  }, [retreats, language]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-white via-green-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400&dpr=2')] bg-cover bg-center opacity-50">
          <img
            src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Hero background"
            className="w-full h-full object-cover opacity-0"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center bg-white rounded-full shadow-xl border border-gray-200 overflow-hidden">
              <div className="flex-1 flex items-center px-6 py-4">
                <Search className="text-gray-400 mr-3 flex-shrink-0" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ja' ? 'ツアーを検索...' : 'Search tours...'}
                  className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-base md:text-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 md:px-8 py-4 hover:bg-green-700 transition-colors duration-200 font-medium text-base md:text-lg"
              >
                {language === 'ja' ? '検索' : 'Search'}
              </button>
            </div>
          </form>

          <Link
            to={`${baseUrl}/retreats`}
            className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="font-medium">{t('hero.cta')}</span>
            <ArrowRight size={20} />
          </Link>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-green-200 rounded-full animate-pulse opacity-30"></div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center group">
              <div className="w-48 h-48 rounded-2xl overflow-hidden mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Expert instructor"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-4">{t('home.why.expertise')}</h3>
              <p className="text-gray-600">{t('home.why.expertise.desc')}</p>
            </div>
            <div className="text-center group">
              <div className="w-48 h-48 rounded-2xl overflow-hidden mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Beautiful location"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-4">{t('home.why.locations')}</h3>
              <p className="text-gray-600">{t('home.why.locations.desc')}</p>
            </div>
            <div className="text-center group">
              <div className="w-48 h-48 rounded-2xl overflow-hidden mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Holistic approach"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-4">{t('home.why.holistic')}</h3>
              <p className="text-gray-600">{t('home.why.holistic.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Retreats */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6">
              {t('retreats.featured')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredRetreats.map((retreat) => {
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
                    <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-md backdrop-blur-sm ${
                      retreat.type === 'Japan' ? 'bg-green-600' : 'bg-blue-600'
                    }`}>
                      {retreat.prefecture}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="h-[4.5rem] flex items-center mb-3">
                      <h3 className={`text-2xl font-bold text-gray-900 leading-tight line-clamp-2 transition-colors duration-300 ${
                        retreat.type === 'Japan' ? 'group-hover:text-green-700' : 'group-hover:text-blue-700'
                      }`}>
                        {retreat.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 text-sm">
                      {retreat.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 whitespace-nowrap">
                        <MapPin size={14} className={`flex-shrink-0 ${retreat.type === 'Japan' ? 'text-green-600' : 'text-blue-600'}`} />
                        <span>{retreat.location}</span>
                      </div>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border whitespace-nowrap ${
                        retreat.type === 'Japan'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        <Sparkles size={14} className={`flex-shrink-0 ${retreat.type === 'Japan' ? 'text-green-600' : 'text-blue-600'}`} />
                        <span>{getSpecialPoint()}</span>
                      </div>
                    </div>
                    {retreat.price != null && !isNaN(retreat.price) && (
                      <div className="mb-6 pt-4 border-t border-gray-100">
                        <div className="flex items-baseline gap-2">
                          <span className={`text-2xl font-bold ${retreat.type === 'Japan' ? 'text-green-700' : 'text-blue-700'}`}>
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
                      className={`mt-auto block w-full text-center text-white py-4 px-6 rounded-lg transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg transform hover:scale-[1.02] ${
                        retreat.type === 'Japan'
                          ? 'bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900'
                          : 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900'
                      }`}
                    >
                      {t('common.learn-more')}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to={`${baseUrl}/retreats`}
              className="inline-flex items-center space-x-2 border-2 border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300"
            >
              <span className="font-medium">
                {language === 'ja' ? 'すべてのリトリートを見る' : 'View All Retreats'}
              </span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            {language === 'ja' 
              ? 'あなたの人生を変える旅を始めませんか？' 
              : 'Ready to Begin Your Life-Changing Journey?'
            }
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'ja' 
              ? '心と体の調和を求める特別な体験が、あなたを待っています。' 
              : 'A special experience seeking harmony of mind and body awaits you.'
            }
          </p>
          <Link
            to={`${baseUrl}/contact`}
            className="inline-flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="font-medium">
              {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
            </span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;