import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Filter, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Retreats: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allRetreats = [
    // Domestic Retreats (10 locations)
    {
      id: 'kyoto-chishakuin',
      title: language === 'ja' ? '京都・智積院寺院ヨガリトリート' : 'Kyoto Chishakuin Temple Yoga Retreat',
      location: language === 'ja' ? '京都・智積院' : 'Kyoto, Chishakuin Temple',
      duration: 6,
      price: 298000,
      capacity: 8,
      type: 'domestic',
      image: '/image copy.png',
      description: language === 'ja' 
        ? '古都の静寂な寺院での瞑想とヨガ。千年の歴史を持つ智積院で心の平穏を見つけましょう。'
        : 'Meditation and yoga in the serene temples of ancient capital. Find peace of mind at Chishakuin Temple with a thousand years of history.'
    },
    {
      id: 'yamanashi-forest',
      title: language === 'ja' ? '山梨・森林セラピー＆ヨガリトリート' : 'Yamanashi Forest Therapy & Yoga Retreat',
      location: language === 'ja' ? '山梨・富士五湖' : 'Yamanashi, Fuji Five Lakes',
      duration: 4,
      price: 168000,
      capacity: 12,
      type: 'domestic',
      image: '/image copy copy.png',
      description: language === 'ja' 
        ? '富士山を望む森林でのヨガと温泉。自然のエネルギーで心身をリフレッシュ。' 
        : 'Yoga and hot springs in forests with Mt. Fuji views. Refresh your mind and body with nature energy.'
    },
    {
      id: 'hokkaido-onsen',
      title: language === 'ja' ? '北海道・温泉＆雪見ヨガリトリート' : 'Hokkaido Hot Springs & Snow Yoga Retreat',
      location: language === 'ja' ? '北海道・ニセコ' : 'Hokkaido, Niseko',
      duration: 5,
      price: 248000,
      capacity: 10,
      type: 'domestic',
      image: 'https://images.pexels.com/photos/1271620/pexels-photo-1271620.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? '雪景色の中での特別なヨガ体験と天然温泉。冬の北海道の美しさを堪能。' 
        : 'Special yoga experience in snowy landscapes and natural hot springs. Enjoy the beauty of winter Hokkaido.'
    },
    {
      id: 'okinawa-beach',
      title: language === 'ja' ? '沖縄・ビーチヨガ＆島時間リトリート' : 'Okinawa Beach Yoga & Island Time Retreat',
      location: language === 'ja' ? '沖縄・石垣島' : 'Okinawa, Ishigaki Island',
      duration: 7,
      price: 298000,
      capacity: 15,
      type: 'domestic',
      image: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? 'エメラルドブルーの海でのビーチヨガ。沖縄の「島時間」でゆったりと過ごす。' 
        : 'Beach yoga in emerald blue seas. Relax in Okinawan "island time".'
    },
    {
      id: 'kumano-kodo',
      title: language === 'ja' ? '熊野古道・巡礼ウォーキング＆ヨガリトリート' : 'Kumano Kodo Pilgrimage Walking & Yoga Retreat',
      location: language === 'ja' ? '和歌山・熊野古道' : 'Wakayama, Kumano Kodo',
      duration: 6,
      price: 278000,
      capacity: 8,
      type: 'domestic',
      image: '/image copy copy copy.png',
      description: language === 'ja' 
        ? '世界遺産の熊野古道を歩く巡礼体験。古代からの聖地でのヨガと瞑想。' 
        : 'Pilgrimage experience walking the World Heritage Kumano Kodo. Yoga and meditation at ancient sacred sites.'
    },
    {
      id: 'nikko-temple',
      title: language === 'ja' ? '日光・東照宮神社ヨガリトリート' : 'Nikko Toshogu Shrine Yoga Retreat',
      location: language === 'ja' ? '栃木・日光' : 'Tochigi, Nikko',
      duration: 4,
      price: 188000,
      capacity: 12,
      type: 'domestic',
      image: '/shrine-architecture.jpg',
      description: language === 'ja' 
        ? '歴史ある神社での神聖なヨガ体験。日光の美しい自然に囲まれながら。' 
        : 'Sacred yoga experience at historic shrines. Surrounded by the beautiful nature of Nikko.'
    },
    {
      id: 'hakone-lakeside',
      title: language === 'ja' ? '箱根・湖畔温泉ヨガリトリート' : 'Hakone Lakeside Hot Spring Yoga Retreat',
      location: language === 'ja' ? '神奈川・箱根' : 'Kanagawa, Hakone',
      duration: 3,
      price: 128000,
      capacity: 16,
      type: 'domestic',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? '芦ノ湖畔での朝ヨガと温泉療法。日帰りも可能な癒しのリトリート。' 
        : 'Morning yoga by Lake Ashi and hot spring therapy. A healing retreat with day-trip options.'
    },
    {
      id: 'ise-shrine',
      title: language === 'ja' ? '伊勢神宮・神道瞑想リトリート' : 'Ise Grand Shrine Shinto Meditation Retreat',
      location: language === 'ja' ? '三重・伊勢' : 'Mie, Ise',
      duration: 5,
      price: 228000,
      capacity: 10,
      type: 'domestic',
      image: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? '日本の心のふるさと伊勢神宮での神道瞑想。古代からの祈りの場で心を清める。' 
        : 'Shinto meditation at Ise Grand Shrine, spiritual home of Japan. Purify your heart at ancient prayer sites.'
    },
    {
      id: 'takayama-village',
      title: language === 'ja' ? '飛騨高山・古民家ヨガリトリート' : 'Hida Takayama Traditional House Yoga Retreat',
      location: language === 'ja' ? '岐阜・飛騨高山' : 'Gifu, Hida Takayama',
      duration: 4,
      price: 198000,
      capacity: 8,
      type: 'domestic',
      image: 'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? '築200年の古民家での伝統的なヨガ体験。飛騨の山里の静寂に包まれて。' 
        : 'Traditional yoga experience in a 200-year-old folk house. Embraced by the tranquility of Hida mountain village.'
    },
    {
      id: 'yoshino-sakura',
      title: language === 'ja' ? '吉野・桜の山ヨガリトリート' : 'Yoshino Cherry Blossom Mountain Yoga Retreat',
      location: language === 'ja' ? '奈良・吉野山' : 'Nara, Mount Yoshino',
      duration: 3,
      price: 148000,
      capacity: 12,
      type: 'domestic',
      image: '/image copy copy copy.png',
      description: language === 'ja' 
        ? '日本一の桜の名所でのヨガ体験。春限定の特別なリトリートプログラム。' 
        : 'Yoga experience at Japan\'s top cherry blossom spot. Special spring-limited retreat program.'
    },
    
    // International Retreats (2 locations in Cebu)
    {
      id: 'cebu-beach',
      title: language === 'ja' ? 'セブ島・ビーチヨガ＆瞑想リトリート' : 'Cebu Island Beach Yoga & Meditation Retreat',
      location: language === 'ja' ? 'フィリピン・セブ島' : 'Philippines, Cebu Island',
      duration: 5,
      price: 198000,
      capacity: 10,
      type: 'international',
      image: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? 'トロピカルビーチでのサンライズヨガ。エメラルドグリーンの海でのウォーターヨガも体験。' 
        : 'Sunrise yoga on tropical beaches. Experience water yoga in emerald green seas.'
    },
    {
      id: 'cebu-mountain',
      title: language === 'ja' ? 'セブ島・マウンテンリトリート＆スパ' : 'Cebu Island Mountain Retreat & Spa',
      location: language === 'ja' ? 'フィリピン・セブ島内陸部' : 'Philippines, Cebu Island Highlands',
      duration: 7,
      price: 268000,
      capacity: 14,
      type: 'international',
      image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? 'セブ島の山間部での自然セラピー。フィリピン伝統のヒーリングとヨガの融合。' 
        : 'Nature therapy in Cebu\'s mountainous regions. Fusion of traditional Filipino healing and yoga.'
    }
  ];

  const filteredRetreats = allRetreats.filter(retreat => {
    const matchesType = selectedType === 'all' || retreat.type === selectedType;
    const matchesSearch = retreat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         retreat.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

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
                onClick={() => setSelectedType('domestic')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedType === 'domestic' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('retreats.domestic')}
              </button>
              <button
                onClick={() => setSelectedType('international')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedType === 'international' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('retreats.international')}
              </button>
            </div>

            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'ja' ? 'リトリートを検索...' : 'Search retreats...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Retreats Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRetreats.map((retreat) => (
              <div key={retreat.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={retreat.image}
                    alt={retreat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium text-white ${
                    retreat.type === 'domestic' ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {retreat.type === 'domestic' ? 
                      (language === 'ja' ? '国内' : 'Domestic') : 
                      (language === 'ja' ? '海外' : 'International')
                    }
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-800 mb-2 line-clamp-2">
                    {retreat.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{retreat.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{retreat.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{retreat.duration}{t('common.days')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Users size={14} />
                      <span>{t('common.capacity')} {retreat.capacity}{t('common.people')}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`${baseUrl}/retreat/${retreat.id}`}
                    className="block w-full text-center bg-gray-100 hover:bg-green-100 text-gray-800 hover:text-green-700 py-3 rounded-lg transition-colors duration-200 font-medium"
                  >
                    {t('common.learn-more')}
                  </Link>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default Retreats;