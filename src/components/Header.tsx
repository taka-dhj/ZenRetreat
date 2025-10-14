import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseUrl = language === 'en' ? '/en' : '';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLanguageSwitch = (lang: 'ja' | 'en') => {
    setLanguage(lang);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md fixed w-full top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={baseUrl || '/'} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="font-light text-xl text-gray-800 tracking-wide">
              ZEN RETREAT ASIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to={`${baseUrl}/retreats`} className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              {t('nav.retreats')}
            </Link>
            <Link to={`${baseUrl}/domestic`} className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              {t('nav.domestic')}
            </Link>
            <Link to={`${baseUrl}/international`} className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              {t('nav.international')}
            </Link>
            <Link to={`${baseUrl}/blog`} className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              {t('nav.blog')}
            </Link>
            <Link to={`${baseUrl}/contact`} className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <button
                onClick={() => handleLanguageSwitch('en')}
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  language === 'en' 
                    ? 'text-green-600 bg-green-50 font-medium' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                English
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => handleLanguageSwitch('ja')}
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  language === 'ja' 
                    ? 'text-green-600 bg-green-50 font-medium' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                日本語
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col space-y-3">
              <Link
                to={`${baseUrl}/retreats`}
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.retreats')}
              </Link>
              <Link
                to={`${baseUrl}/domestic`}
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.domestic')}
              </Link>
              <Link
                to={`${baseUrl}/international`}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.international')}
              </Link>
              <Link
                to={`${baseUrl}/blog`}
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.blog')}
              </Link>
              <Link
                to={`${baseUrl}/contact`}
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-4 px-2 py-2 border-t border-gray-100 mt-2 pt-4">
                <Globe size={16} className="text-gray-500" />
                <button
                  onClick={() => handleLanguageSwitch('en')}
                  className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                    language === 'en' 
                      ? 'text-green-600 bg-green-50 font-medium' 
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageSwitch('ja')}
                  className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                    language === 'ja' 
                      ? 'text-green-600 bg-green-50 font-medium' 
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  日本語
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;