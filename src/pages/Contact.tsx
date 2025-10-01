import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    retreat: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert(language === 'ja' ? 'お問い合わせを送信しました。' : 'Your inquiry has been sent.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const retreatOptions = language === 'ja' ? [
    { value: '', label: '選択してください' },
    { value: 'kyoto', label: '京都・智積院寺院ヨガリトリート' },
    { value: 'yamanashi', label: '山梨・森林セラピー＆ヨガリトリート' },
    { value: 'hokkaido', label: '北海道・温泉＆雪見ヨガリトリート' },
    { value: 'okinawa', label: '沖縄・ビーチヨガ＆島時間リトリート' },
    { value: 'cebu-beach', label: 'セブ島・ビーチヨガ＆瞑想リトリート' },
    { value: 'cebu-mountain', label: 'セブ島・マウンテンリトリート＆スパ' },
    { value: 'other', label: 'その他・相談したい' }
  ] : [
    { value: '', label: 'Please select' },
    { value: 'kyoto', label: 'Kyoto Chishakuin Temple Yoga Retreat' },
    { value: 'yamanashi', label: 'Yamanashi Forest Therapy & Yoga Retreat' },
    { value: 'hokkaido', label: 'Hokkaido Hot Springs & Snow Yoga Retreat' },
    { value: 'okinawa', label: 'Okinawa Beach Yoga & Island Time Retreat' },
    { value: 'cebu-beach', label: 'Cebu Island Beach Yoga & Meditation Retreat' },
    { value: 'cebu-mountain', label: 'Cebu Island Mountain Retreat & Spa' },
    { value: 'other', label: 'Other / Consultation' }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            {t('nav.contact')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ja' 
              ? 'リトリートに関するご質問やお申し込みは、お気軽にお問い合わせください。専門スタッフが丁寧にご対応いたします。'
              : 'Feel free to contact us with any questions about retreats or to make a booking. Our professional staff will respond to you carefully.'
            }
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-medium text-gray-800 mb-6">
                {language === 'ja' ? 'お問い合わせフォーム' : 'Contact Form'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                    placeholder={language === 'ja' ? '田中太郎' : 'John Smith'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="retreat" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.retreat')}
                  </label>
                  <select
                    id="retreat"
                    name="retreat"
                    value={formData.retreat}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  >
                    {retreatOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                    placeholder={language === 'ja' 
                      ? 'ご質問やご要望をお聞かせください...'
                      : 'Please let us know your questions or requests...'
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>{t('contact.form.submit')}</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-medium text-gray-800 mb-6">
                  {language === 'ja' ? 'お問い合わせ先' : 'Contact Information'}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">
                        {language === 'ja' ? '所在地' : 'Address'}
                      </h3>
                      <p className="text-gray-600">
                        {language === 'ja' 
                          ? '〒108-0074 東京都港区高輪2丁目11番9号'
                          : '2-11-9 Takanawa, Minato-ku, Tokyo 108-0074, Japan'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">
                        {language === 'ja' ? 'メールアドレス' : 'Email'}
                      </h3>
                      <p className="text-gray-600">info@discoveryhiddenjapan.com</p>
                      <p className="text-sm text-gray-500">
                        {language === 'ja' 
                          ? '24時間受付（返信は営業時間内）'
                          : '24/7 reception (replies during business hours)'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
                <h3 className="text-xl font-medium mb-4">
                  {language === 'ja' ? 'よくあるご質問' : 'Frequently Asked Questions'}
                </h3>
                <p className="mb-4 opacity-90">
                  {language === 'ja' 
                    ? 'リトリートに関するよくあるご質問をまとめています。'
                    : 'We have compiled frequently asked questions about retreats.'
                  }
                </p>
                <Link
                  to={`${baseUrl}/faq`}
                  className="inline-flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="font-medium">
                    {language === 'ja' ? 'FAQを見る' : 'View FAQ'}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;