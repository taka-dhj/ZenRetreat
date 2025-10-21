import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import CTASection from '../components/CTASection';

const Contact: React.FC = () => {
  const { language, t } = useLanguage();
  const baseUrl = language === 'en' ? '/en' : '';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    retreat: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const result = text ? JSON.parse(text) : { success: true };

      if (result.success) {
        setSubmitStatus('success');
        setShowSuccessMessage(true);
        setFormData({
          name: '',
          email: '',
          retreat: '',
          message: ''
        });
        setTimeout(() => setShowSuccessMessage(false), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
              
              {showSuccessMessage && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-green-800">
                      {language === 'ja' ? '送信完了' : 'Sent Successfully'}
                    </h3>
                    <p className="mt-1 text-sm text-green-700">
                      {language === 'ja'
                        ? 'お問い合わせありがとうございます。確認メールをお送りしましたので、ご確認ください。2営業日以内にご返信いたします。'
                        : 'Thank you for your inquiry. We have sent you a confirmation email. We will respond within 2 business days.'
                      }
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-800">
                      {language === 'ja' ? '送信エラー' : 'Sending Error'}
                    </h3>
                    <p className="mt-1 text-sm text-red-700">
                      {language === 'ja'
                        ? '送信に失敗しました。もう一度お試しいただくか、メールで直接お問い合わせください。'
                        : 'Failed to send. Please try again or contact us directly via email.'
                      }
                    </p>
                  </div>
                </div>
              )}

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
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                  <span>
                    {isSubmitting
                      ? (language === 'ja' ? '送信中...' : 'Sending...')
                      : t('contact.form.submit')
                    }
                  </span>
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
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">
                        {language === 'ja' ? 'メールアドレス' : 'Email'}
                      </h3>
                      <p className="text-gray-600">info@zen-retreat-asia.com</p>
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

      <CTASection />
    </div>
  );
};

export default Contact;