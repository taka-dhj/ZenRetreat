import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, MapPin, Clock, Award, Heart, Mountain } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';

  const featuredRetreats = [
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
        ? '古都の静寂な寺院での瞑想とヨガ' 
        : 'Meditation and yoga in the serene temples of ancient capital'
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
        ? '富士山を望む森林でのヨガと温泉' 
        : 'Yoga and hot springs in forests with Mt. Fuji views'
    },
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
        ? 'トロピカルビーチでのサンライズヨガ' 
        : 'Sunrise yoga on tropical beaches'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-white via-green-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
                <Award className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">{t('home.why.expertise')}</h3>
              <p className="text-gray-600">{t('home.why.expertise.desc')}</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                <Mountain className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">{t('home.why.locations')}</h3>
              <p className="text-gray-600">{t('home.why.locations.desc')}</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors duration-300">
                <Heart className="text-pink-600" size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">{t('home.why.holistic')}</h3>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRetreats.map((retreat) => (
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
                    className="block w-full text-center bg-gray-100 hover:bg-green-100 text-gray-800 hover:text-green-700 py-3 rounded-lg transition-colors duration-200 font-medium"
                  >
                    {t('common.learn-more')}
                  </Link>
                </div>
              </div>
            ))}
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