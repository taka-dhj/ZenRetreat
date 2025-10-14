import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ContactFormModal from './ContactFormModal';

const BlogCTA: React.FC = () => {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="my-16 overflow-hidden rounded-2xl shadow-xl">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 py-8 px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl text-white font-semibold">
              {language === 'ja'
                ? 'Zen Retreat ASIA - カスタムヨガリトリートツアーのお問い合わせ'
                : 'Zen Retreat ASIA - Custom Yoga Retreat Tour Inquiry'}
            </h2>
          </div>
        </div>

        <div className="bg-white px-6 sm:px-8 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <h3 className="text-3xl md:text-4xl font-light text-gray-900 text-center leading-tight">
              {language === 'ja'
                ? 'あなただけの特別な日本ヨガリトリート体験を創造しませんか'
                : 'Create Your Own Special Japan Yoga Retreat Experience'}
            </h3>

            <p className="text-gray-700 leading-relaxed text-base md:text-lg text-center">
              {language === 'ja'
                ? '経験豊富な専門スタッフが、あなたの希望と体調に合わせた完全オーダーメイドのヨガリトリートプログラムを設計いたします。温泉、禅瞑想、森林浴、宿坊体験を最適に組み合わせた、あなただけの特別な変容の旅をご提案します。初心者から上級者まで、すべてのレベルに対応したプログラムをご用意しています。'
                : 'Our experienced staff will design a fully customized yoga retreat program tailored to your preferences and physical condition. We will propose your own special transformative journey, optimally combining hot springs, Zen meditation, forest bathing, and temple lodging experiences. We offer programs suitable for all levels, from beginners to advanced practitioners.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-sm font-medium text-green-800 mb-2">
                  {language === 'ja' ? 'お問い合わせ' : 'Contact'}
                </div>
                <a
                  href="mailto:info@zentreat.com"
                  className="text-green-700 hover:text-green-800 font-medium transition-colors duration-200 break-all"
                >
                  info@zentreat.com
                </a>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-sm font-medium text-blue-800 mb-2">
                  {language === 'ja' ? 'ウェブサイト' : 'Website'}
                </div>
                <a
                  href="https://zenretreatasia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800 font-medium transition-colors duration-200 break-all"
                >
                  zenretreatasia.com
                </a>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-6">
                {language === 'ja'
                  ? '日本語・英語対応可能。無料相談受付中。'
                  : 'Available in Japanese and English. Free consultation available.'}
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-10 py-4 rounded-full hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium text-lg"
              >
                <span>
                  {language === 'ja' ? '今すぐお問い合わせ' : 'Contact Us Now'}
                </span>
                <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default BlogCTA;
