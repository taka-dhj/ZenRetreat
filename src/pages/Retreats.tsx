import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { MapPin, Filter, Search, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRetreats } from '../hooks/useRetreats';
import { getImageUrl, handleImageError } from '../lib/imageUtils';
import CTASection from '../components/CTASection';

const Retreats: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // URLクエリパラメータから検索語を取得
  useEffect(() => {
    const querySearch = searchParams.get('search') || '';
    if (querySearch) {
      setSearchTerm(querySearch);
    }
  }, [searchParams]);

  useEffect(() => {
    setSelectedType('all');
    // pathnameが変わったときは検索語をクリアしない（クエリパラメータから取得するため）
  }, [location.pathname]);

  const { retreats, loading, error } = useRetreats();

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

  const filteredRetreats = useMemo(() => {
    return retreats
      .filter(retreat => {
        const matchesType = selectedType === 'all' || retreat.type === selectedType;
        const title = language === 'ja' ? retreat.title_ja : retreat.title_en;
        const location = language === 'ja' ? retreat.location_ja : retreat.location_en;
        const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
      })
      .map(retreat => {
        const location = language === 'ja' ? retreat.location_ja : retreat.location_en;
        const originalTitle = language === 'ja' ? retreat.title_ja : retreat.title_en;
        const cleanedTitle = removePrefectureFromTitle(originalTitle, retreat.location_ja);
        const cleanedLocation = removePrefectureFromLocation(location, retreat.location_ja);
        const prefecture = retreat.type === 'Japan'
          ? extractPrefecture(retreat.location_ja, retreat.location_en)
          : (language === 'ja' ? 'セブ' : 'Cebu');
        
        return {
          ...retreat,
          title: cleanedTitle,
          location: cleanedLocation,
          prefecture: prefecture,
          description: language === 'ja' ? retreat.description_ja : retreat.description_en,
          includes: language === 'ja' ? retreat.includes_ja : retreat.includes_en
        };
      });
  }, [retreats, selectedType, searchTerm, language]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{language === 'ja' ? '読み込み中...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
              {t('nav.retreats')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'ja'
                ? 'あなたにぴったりのリトリート体験を見つけてください'
                : 'Find the perfect retreat experience for you'
              }
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-500" />
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedType === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'ja' ? 'すべて' : 'All'}
              </button>
              <button
                onClick={() => setSelectedType('Japan')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedType === 'Japan'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('retreats.japan')}
              </button>
              <button
                onClick={() => setSelectedType('Cebu')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedType === 'Cebu'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('retreats.cebu')}
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchTerm.trim()) {
                  setSearchParams({ search: searchTerm.trim() });
                } else {
                  setSearchParams({});
                }
              }}
              className="relative"
            >
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'ja' ? 'リトリートを検索...' : 'Search retreats...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Retreats Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filteredRetreats.map((retreat) => {
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
                <div
                  key={retreat.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group flex flex-col h-full"
                >
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <img
                      src={getImageUrl(retreat.image)}
                      alt={retreat.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={handleImageError}
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

          {filteredRetreats.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {language === 'ja'
                  ? '条件に合うリトリートが見つかりませんでした。'
                  : 'No retreats found matching your criteria.'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Retreats;
