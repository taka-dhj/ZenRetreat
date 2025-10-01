import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const International: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';

  const internationalRetreats = [
    {
      id: 'cebu-beach',
      title: language === 'ja' ? 'セブ島・ビーチヨガ＆瞑想リトリート' : 'Cebu Island Beach Yoga & Meditation Retreat',
      location: language === 'ja' ? 'フィリピン・セブ島' : 'Philippines, Cebu Island',
      duration: 5,
      price: 198000,
      capacity: 10,
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
      image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? 'セブ島の山間部での自然セラピー。フィリピン伝統のヒーリングとヨガの融合。' 
        : 'Nature therapy in Cebu\'s mountainous regions. Fusion of traditional Filipino healing and yoga.'
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            {t('nav.international')}
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {internationalRetreats.map((retreat) => (
              <div key={retreat.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={retreat.image}
                    alt={retreat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium text-white bg-blue-500">
                    {language === 'ja' ? '海外' : 'International'}
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
                    className="block w-full text-center bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-lg transition-colors duration-200 font-medium"
                  >
                    {t('common.learn-more')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose International */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-800 mb-12 text-center">
            {language === 'ja' ? '海外リトリートの魅力' : 'Why Choose International Retreats'}
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
    </div>
  );
};

export default International;