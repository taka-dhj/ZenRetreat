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
  const [errorModal, setErrorModal] = useState<{ show: boolean; message: string; details?: string }>({
    show: false,
    message: '',
    details: undefined
  });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーションエラーをクリア
    setValidationErrors({});
    
    const errors: { [key: string]: string } = {};
    
    // バリデーション: 必須フィールドのチェック
    if (!formData.name.trim()) {
      errors.name = language === 'ja' ? '名前は必須項目です。' : 'Name is required.';
    }
    
    if (!formData.email.trim()) {
      errors.email = language === 'ja' ? 'メールアドレスは必須項目です。' : 'Email is required.';
    }

    // バリデーション: メールアドレスの形式チェック
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = language === 'ja' 
        ? '正しいメールアドレスを入力してください。' 
        : 'Please enter a valid email address.';
    }

    // バリデーション: メッセージが空でないかチェック（迷惑メール対策）
    if (!formData.message.trim()) {
      errors.message = language === 'ja' 
        ? 'メッセージを入力してください。' 
        : 'Please enter a message.';
    }

    // バリデーション: メッセージの最小文字数チェック
    if (formData.message.trim() && formData.message.trim().length < 10) {
      errors.message = language === 'ja' 
        ? 'メッセージは10文字以上で入力してください。' 
        : 'Please enter at least 10 characters in your message.';
    }

    // エラーがある場合は表示して処理を停止
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = '/api/contact';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const errorText = await response.text();
      let result;
      try {
        result = errorText ? JSON.parse(errorText) : {};
      } catch (parseError) {
        console.error('Failed to parse response:', errorText);
        setErrorModal({
          show: true,
          message: language === 'ja' ? 'サーバーエラー' : 'Server Error',
          details: `Invalid JSON response: ${errorText.substring(0, 200)}`
        });
        return;
      }

      if (!response.ok) {
        let errorDetails = `HTTP ${response.status}: ${response.statusText}`;
        if (result.error) {
          errorDetails = result.error;
          if (result.details) {
            errorDetails += `\n\n詳細:\n${result.details}`;
          }
        }

        console.error('API Error:', result);
        setErrorModal({
          show: true,
          message: language === 'ja' ? 'メール送信に失敗しました' : 'Failed to send email',
          details: errorDetails
        });
        return;
      }

      if (result.success) {
        // Google Analytics 4: お問い合わせフォーム送信イベント（コンバージョン）
        console.log('Form submission successful, sending GA4 event...');
        console.log('window.gtag exists:', typeof window.gtag === 'function');
        
        if (typeof window.gtag === 'function') {
          console.log('Sending form_submission event to GA4');
          window.gtag('event', 'form_submission', {
            event_category: 'Contact',
            event_label: 'Contact Form Modal',
            form_type: 'contact',
            form_location: 'modal',
            retreat_interest: formData.retreat || 'none',
            value: 1,
          });
          console.log('GA4 event sent successfully');
        } else {
          console.error('window.gtag is not a function. GA4 tracking code may not be loaded.');
        }
        
        setFormData({
          name: '',
          email: '',
          retreat: '',
          message: ''
        });
        alert(language === 'ja' ? 'お問い合わせを送信しました。' : 'Your inquiry has been sent.');
        onClose();
      } else {
        setErrorModal({
          show: true,
          message: language === 'ja' ? 'メール送信に失敗しました' : 'Failed to send email',
          details: result.error || (language === 'ja' ? '不明なエラーが発生しました' : 'Unknown error occurred')
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setErrorModal({
        show: true,
        message: language === 'ja' ? 'メール送信に失敗しました' : 'Failed to send email',
        details: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // フィールドが変更されたらエラーをクリア
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: ''
      });
    }
  };

  const retreatOptions = language === 'ja' ? [
    { value: '', label: '選択してください' },
    { value: 'general', label: '一般的なお問い合わせ' },
    { value: 'Japan', label: '日本ツアー' },
    { value: 'Cebu', label: 'セブツアー' },
    { value: 'other', label: 'その他' }
  ] : [
    { value: '', label: 'Please select' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'Japan', label: 'Japan Tours' },
    { value: 'Cebu', label: 'Cebu Tours' },
    { value: 'other', label: 'Other' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Error Modal */}
      {errorModal.show && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
              onClick={() => setErrorModal({ show: false, message: '', details: undefined })}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="bg-red-600 px-6 py-4">
                <h3 className="text-xl font-medium text-white">
                  {language === 'ja' ? 'エラー' : 'Error'}
                </h3>
              </div>

              <div className="px-6 py-6">
                <p className="text-gray-800 mb-4 font-medium">
                  {errorModal.message}
                </p>
                {errorModal.details && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2 font-medium">
                      {language === 'ja' ? 'エラー詳細:' : 'Error details:'}
                    </p>
                    <p className="text-sm text-gray-700 font-mono break-all">
                      {errorModal.details}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4">
                <button
                  onClick={() => setErrorModal({ show: false, message: '', details: undefined })}
                  className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  {language === 'ja' ? '閉じる' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 ${
                  validationErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder={language === 'ja' ? '田中太郎' : 'John Smith'}
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {validationErrors.name}
                </p>
              )}
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 ${
                  validationErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="example@email.com"
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {validationErrors.email}
                </p>
              )}
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 ${
                  validationErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder={language === 'ja'
                  ? 'ご質問やご要望をお聞かせください...'
                  : 'Please let us know your questions or requests...'
                }
              />
              {validationErrors.message && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {validationErrors.message}
                </p>
              )}
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
    </>
  );
};

export default ContactFormModal;
