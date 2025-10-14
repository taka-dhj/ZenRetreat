import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRetreats } from '../hooks/useRetreats';
import { getImageUrl, handleImageError } from '../lib/imageUtils';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const { retreats } = useRetreats();

  const featuredRetreats = useMemo(() => {
    const featured = retreats.filter(r =>
      ['kyoto-chishakuin', 'yamanashi-forest', 'cebu-beach'].includes(r.id)
    );
    return featured.map(retreat => ({
      id: retreat.id,
      title: language === 'ja' ? retreat.title_ja : retreat.title_en,
      location: language === 'ja' ? retreat.location_ja : retreat.location_en,
      duration: retreat.duration,
      price: retreat.price,
      capacity: retreat.capacity,
      type: retreat.type,
      image: retreat.image,
      description: language === 'ja' ? retreat.description_ja : retreat.description_en
    }));
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRetreats.map((retreat) => (
              <div key={retreat.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={getImageUrl(retreat.image)}
                    alt={retreat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
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
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin size={14} />
                    <span className="ml-1">{retreat.location}</span>
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