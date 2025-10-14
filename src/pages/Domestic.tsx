import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRetreats } from '../hooks/useRetreats';
import { getImageUrl, handleImageError } from '../lib/imageUtils';
import CTASection from '../components/CTASection';

const Domestic: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const { retreats } = useRetreats();

  const domesticRetreats = useMemo(() => {
    return retreats
      .filter(r => r.type === 'domestic')
      .map(retreat => ({
        id: retreat.id,
        title: language === 'ja' ? retreat.title_ja : retreat.title_en,
        location: language === 'ja' ? retreat.location_ja : retreat.location_en,
        duration: retreat.duration,
        price: retreat.price,
        capacity: retreat.capacity,
        image: retreat.image,
        description: language === 'ja' ? retreat.description_ja : retreat.description_en
      }));
  }, [retreats, language]);

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
                    src={getImageUrl(retreat.image)}
                    alt={retreat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
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

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin size={14} />
                    <span className="ml-1">{retreat.location}</span>
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

      <CTASection />
    </div>
  );
};

export default Domestic;
