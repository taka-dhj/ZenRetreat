import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ContactFormModal from './ContactFormModal';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">Z</span>
              </div>
              <span className="font-light text-2xl text-white tracking-wide">
                ZEN RETREAT ASIA
              </span>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed">
              {language === 'ja'
                ? '日本とアジアの美しい自然の中で、心と体の調和を見つける癒しの旅をご提供しています。'
                : 'We provide healing journeys to find harmony of mind and body in the beautiful nature of Japan and Asia.'
              }
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-medium text-white mb-6 text-lg">
              {language === 'ja' ? 'お問い合わせ' : 'Contact'}
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="hover:text-green-400 transition-colors duration-200 text-left"
                >
                  info@zen-retreat-asia.com
                </button>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <Instagram size={18} className="flex-shrink-0" />
                <a
                  href="https://www.instagram.com/zenretreatasia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors duration-200"
                >
                  @zenretreatasia
                </a>
              </div>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-medium text-white mb-6 text-lg">
              {language === 'ja' ? 'サポート' : 'Support'}
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link to={`${baseUrl}/faq`} className="hover:text-green-400 transition-colors duration-200">
                  {language === 'ja' ? 'よくある質問' : 'FAQ'}
                </Link>
              </li>
              <li>
                <Link to={`${baseUrl}/privacy-policy`} className="hover:text-green-400 transition-colors duration-200">
                  {language === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to={`${baseUrl}/terms-of-service`} className="hover:text-green-400 transition-colors duration-200">
                  {language === 'ja' ? '利用規約' : 'Terms of Service'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 ZEN RETREAT ASIA. All rights reserved.</p>
        </div>
      </div>

      <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
};

export default Footer;