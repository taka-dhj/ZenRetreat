import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Users, Calendar, Check, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRetreat } from '../hooks/useRetreats';
import { getImageUrl, handleImageError } from '../lib/imageUtils';
import CTASection from '../components/CTASection';
import ContactFormModal from '../components/ContactFormModal';

const RetreatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { retreat, loading, error } = useRetreat(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{language === 'ja' ? '読み込み中...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            to={`${baseUrl}/retreats`}
            className="text-green-600 hover:text-green-700"
          >
            {language === 'ja' ? 'リトリート一覧に戻る' : 'Back to retreats'}
          </Link>
        </div>
      </div>
    );
  }

  if (!retreat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-800 mb-4">
            {language === 'ja' ? 'リトリートが見つかりません' : 'Retreat not found'}
          </h1>
          <Link
            to={`${baseUrl}/retreats`}
            className="text-green-600 hover:text-green-700"
          >
            {language === 'ja' ? 'リトリート一覧に戻る' : 'Back to retreats'}
          </Link>
        </div>
      </div>
    );
  }

  const title = language === 'ja' ? retreat.title_ja : retreat.title_en;
  const location = language === 'ja' ? retreat.location_ja : retreat.location_en;
  const description = language === 'ja' ? retreat.description_ja : retreat.description_en;
  const longDescription = language === 'ja' ? retreat.long_description_ja : retreat.long_description_en;
  const includes = language === 'ja' ? retreat.includes_ja : retreat.includes_en;
  const schedule = language === 'ja' ? retreat.schedule_ja : retreat.schedule_en;

  const imageUrl = getImageUrl(retreat.image);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden mt-16">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
              retreat.type === 'domestic' ? 'bg-green-500' : 'bg-blue-500'
            }`}>
              {retreat.type === 'domestic' ?
                (language === 'ja' ? '国内リトリート' : 'Domestic Retreat') :
                (language === 'ja' ? '海外リトリート' : 'International Retreat')
              }
            </div>
            <h1 className="text-3xl md:text-5xl font-light mb-4">{title}</h1>
            <p className="text-xl opacity-90">{description}</p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to={`${baseUrl}/retreats`}
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>{language === 'ja' ? 'リトリート一覧に戻る' : 'Back to retreats'}</span>
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-medium text-gray-800 mb-6">
                  {t('retreat.overview')}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {longDescription}
                </p>
              </div>

              {/* Daily Schedule */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-medium text-gray-800 mb-6">
                  {t('retreat.schedule')}
                </h2>
                <div className="space-y-4">
                  {schedule.map((item: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4 border-l-2 border-green-500 pl-4 py-2">
                      <Clock className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{item.time}</div>
                        <div className="text-gray-600">{item.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-24 space-y-8">
                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{retreat.duration}{language === 'ja' ? '日間' : ' days'}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Users className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{language === 'ja' ? `最大 ${retreat.capacity}名` : `Max ${retreat.capacity} people`}</span>
                  </div>
                </div>

                {/* What's Included */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    {t('retreat.includes')}
                  </h3>
                  <div className="space-y-3">
                    {includes.map((item: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="block w-full bg-green-600 text-white text-center py-4 rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <ContactFormModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default RetreatDetail;
