import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Domestic: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';

  const domesticRetreats = [
    {
      id: 'kyoto-chishakuin',
      title: language === 'ja' ? '京都・智積院寺院ヨガリトリート' : 'Kyoto Chishakuin Temple Yoga Retreat',
      location: language === 'ja' ? '京都・智積院' : 'Kyoto, Chishakuin Temple',
      duration: 6,
      price: 298000,
      capacity: 8,
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
      image: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? '日本の心のふるさと伊勢神宮での神道瞑想。古代からの祈りの場で心を清める。'
        : 'Shinto meditation at Ise Grand Shrine, spiritual home of Japan. Purify your heart at ancient prayer sites.'
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            {t('nav.domestic')}
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domesticRetreats.map((retreat) => (
              <div key={retreat.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={retreat.image}
                    alt={retreat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium text-white bg-green-500">
                    {language === 'ja' ? '国内' : 'Domestic'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    {retreat.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{retreat.description}</p>
                  
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
                    className="block w-full text-center bg-green-100 hover:bg-green-200 text-green-700 py-3 rounded-lg transition-colors duration-200 font-medium"
                  >
                    {t('common.learn-more')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Domestic;