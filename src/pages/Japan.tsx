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
    // 日本語のlocationから都道府県を抽出
    for (const [prefJa, prefData] of Object.entries(prefectureMap)) {
      if (locationJa.includes(prefJa)) {
        return language === 'ja' ? prefData.ja : prefData.en;
      }
    }
    // 都道府県が見つからない場合は、最初の部分を返す
    const fallback = locationJa.split(/[・・,、]/)[0] || locationJa;
    return fallback;
  };

  // タイトルから都道府県を削除する関数
  const removePrefectureFromTitle = (title: string, locationJa: string): string => {
    // 日本語のタイトルのみ処理
    if (language !== 'ja') return title;
    
    for (const [prefJa] of Object.entries(prefectureMap)) {
      if (locationJa.includes(prefJa)) {
        // 「都道府県・」または「都道府県・」のパターンを削除
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
    // 日本語のlocationのみ処理
    if (language !== 'ja') return location;
    
    for (const [prefJa] of Object.entries(prefectureMap)) {
      if (locationJa.includes(prefJa)) {
        // 「都道府県・」または「都道府県・」のパターンを削除
        const patterns = [
          new RegExp(`^${prefJa}[・・]`, 'g'),
          new RegExp(`^${prefJa}\\s*[・・]`, 'g'),
        ];
        
        let cleanedLocation = location;
        for (const pattern of patterns) {
          cleanedLocation = cleanedLocation.replace(pattern, '');
        }
        
        return cleanedLocation.trim() || location;
      }
    }
    
    return location;
  };

  const japanRetreats = useMemo(() => {
    return retreats
      .filter(r => r.type === 'Japan')
      .map(retreat => {
        const location = language === 'ja' ? retreat.location_ja : retreat.location_en;
        const originalTitle = language === 'ja' ? retreat.title_ja : retreat.title_en;
        const cleanedTitle = removePrefectureFromTitle(originalTitle, retreat.location_ja);
        const cleanedLocation = removePrefectureFromLocation(location, retreat.location_ja);
        const prefecture = extractPrefecture(retreat.location_ja, retreat.location_en);
        
        return {
          id: retreat.id,
          title: cleanedTitle,
          location: cleanedLocation,
          prefecture: prefecture,
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
              // 日数情報（○泊）を削除
              const getSpecialPoint = () => {
                let specialPoint = '';
                
                if (retreat.includes && Array.isArray(retreat.includes) && retreat.includes.length > 0) {
                  // includes配列から日数情報を含まない要素を探す
                  for (const item of retreat.includes) {
                    // 「○泊」や「（○泊）」「（○日）」などのパターンを削除
                    // 例：「宿坊での宿泊（5泊）」→「宿坊での宿泊」
                    let cleaned = item
                      .replace(/[（(]\d+泊[）)]/g, '')  // （5泊）を削除
                      .replace(/[（(]\d+日[）)]/g, '')  // （5日）を削除
                      .replace(/\d+泊/g, '')            // 5泊を削除
                      .replace(/\d+日/g, '')            // 5日を削除
                      .replace(/\s*[（(].*?[）)]\s*/g, '') // 残った括弧内のテキストを削除
                      .trim();
                    
                    // 「宿泊」で終わる場合は、「での宿泊」「での宿泊」などを削除して簡潔に
                    // 例：「宿坊での宿泊」→「宿坊」
                    if (cleaned.endsWith('宿泊')) {
                      cleaned = cleaned.replace(/[での]宿泊$/, '').replace(/宿泊$/, '').trim();
                    }
                    
                    if (cleaned && cleaned.length > 0) {
                      specialPoint = cleaned;
                      break;
                    }
                  }
                  // 日数情報を含まない要素が見つからない場合は、最初の要素から日数を削除
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
                    
                    specialPoint = cleaned;
                  }
                }
                
                // includesが空または日数情報のみの場合は、descriptionから最初の文を抽出
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
                  {/* 画像セクション */}
                  <div className="relative aspect-[5/4] overflow-hidden">
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
                    {/* タグ - 都道府県表示 */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-green-600 shadow-md backdrop-blur-sm">
                      {retreat.prefecture}
                    </div>
                  </div>

                  {/* コンテンツセクション */}
                  <div className="p-8 flex flex-col flex-grow">
                    {/* タイトル - 常に2行分の高さを確保し、1行の場合は中央配置 */}
                    <div className="h-[4.5rem] flex items-center mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
                        {retreat.title}
                      </h3>
                    </div>

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
                      className="mt-auto block w-full text-center bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white py-4 px-6 rounded-lg transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg transform hover:scale-[1.02]"
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
