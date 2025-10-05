import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CTASection: React.FC = () => {
  const { language } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';

  return (
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
  );
};

export default CTASection;
