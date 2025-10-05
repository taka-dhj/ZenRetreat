import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="font-light text-xl text-gray-800 tracking-wide">
                ZEN RETREAT ASIA
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {language === 'ja'
                ? '日本とアジアの美しい自然の中で、心と体の調和を見つける癒しの旅をご提供しています。'
                : 'We provide healing journeys to find harmony of mind and body in the beautiful nature of Japan and Asia.'
              }
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <span>
                  {language === 'ja'
                    ? '〒108-0074 東京都港区高輪2丁目11番9号'
                    : '2-11-9 Takanawa, Minato-ku, Tokyo 108-0074, Japan'
                  }
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>info@discoveryhiddenjapan.com</span>
              </div>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-medium text-gray-800 mb-4">
              {language === 'ja' ? 'サポート' : 'Support'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to={`${baseUrl}/faq`} className="hover:text-green-600 transition-colors duration-200">
                  {language === 'ja' ? 'よくある質問' : 'FAQ'}
                </Link>
              </li>
              <li>
                <Link to={`${baseUrl}/cancellation-policy`} className="hover:text-green-600 transition-colors duration-200">
                  {language === 'ja' ? 'キャンセルポリシー' : 'Cancellation Policy'}
                </Link>
              </li>
              <li>
                <Link to={`${baseUrl}/privacy-policy`} className="hover:text-green-600 transition-colors duration-200">
                  {language === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to={`${baseUrl}/terms-of-service`} className="hover:text-green-600 transition-colors duration-200">
                  {language === 'ja' ? '利用規約' : 'Terms of Service'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-medium text-gray-800 mb-4">
              {language === 'ja' ? 'フォローしてください' : 'Follow Us'}
            </h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition-colors duration-200"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-400 transition-colors duration-200"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2025 ZEN RETREAT ASIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;