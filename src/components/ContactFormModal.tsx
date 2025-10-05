import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    retreat: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setFormData({
          name: '',
          email: '',
          retreat: '',
          message: ''
        });
        alert(language === 'ja' ? 'お問い合わせを送信しました。' : 'Your inquiry has been sent.');
        onClose();
      } else {
        alert(language === 'ja' ? '送信に失敗しました。もう一度お試しください。' : 'Failed to send. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(language === 'ja' ? '送信に失敗しました。もう一度お試しください。' : 'Failed to send. Please try again.');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-medium text-white">
              {language === 'ja' ? 'お問い合わせフォーム' : 'Contact Form'}
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <div>
              <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.name')} *
              </label>
              <input
                type="text"
                id="modal-name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                placeholder={language === 'ja' ? '田中太郎' : 'John Smith'}
              />
            </div>

            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.email')} *
              </label>
              <input
                type="email"
                id="modal-email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="modal-retreat" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.retreat')}
              </label>
              <select
                id="modal-retreat"
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
              <label htmlFor="modal-message" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                id="modal-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                placeholder={language === 'ja'
                  ? 'ご質問やご要望をお聞かせください...'
                  : 'Please let us know your questions or requests...'
                }
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
              >
                {language === 'ja' ? 'キャンセル' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                <span>
                  {isSubmitting
                    ? (language === 'ja' ? '送信中...' : 'Sending...')
                    : t('contact.form.submit')
                  }
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;
