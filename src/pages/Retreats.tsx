import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Filter, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRetreats } from '../hooks/useRetreats';
import { getImageUrl, handleImageError } from '../lib/imageUtils';
import CTASection from '../components/CTASection';

const Retreats: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const location = useLocation();
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSelectedType('all');
    setSearchTerm('');
  }, [location.pathname]);

  const { retreats, loading, error } = useRetreats();

  const filteredRetreats = useMemo(() => {
    return retreats.filter(retreat => {
      const matchesType = selectedType === 'all' || retreat.type === selectedType;
      const title = language === 'ja' ? retreat.title_ja : retreat.title_en;
      const location = language === 'ja' ? retreat.location_ja : retreat.location_en;
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
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
            {filteredRetreats.map((retreat) => {
              const title = language === 'ja' ? retreat.title_ja : retreat.title_en;
              const location = language === 'ja' ? retreat.location_ja : retreat.location_en;
              const description = language === 'ja' ? retreat.description_ja : retreat.description_en;

              return (
                <div key={retreat.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getImageUrl(retreat.image)}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={handleImageError}
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium text-white ${
                      retreat.type === 'Japan' ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {retreat.type === 'Japan' ?
                        (language === 'ja' ? '日本' : 'Japan') :
                        (language === 'ja' ? 'セブ' : 'Cebu')
                      }
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-gray-800 mb-2 line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin size={14} />
                      <span className="ml-1">{location}</span>
                    </div>

                    <Link
                      to={`${baseUrl}/retreat/${retreat.id}`}
                      className="block w-full text-center bg-gray-100 hover:bg-green-100 text-gray-800 hover:text-green-700 py-3 rounded-lg transition-colors duration-200 font-medium"
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
