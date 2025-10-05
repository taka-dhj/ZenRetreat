import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CTASection from '../components/CTASection';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            {language === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {language === 'ja' ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">個人情報の取得について</h2>
                  <p className="text-gray-600 mb-4">ZEN RETREAT ASIA（以下「当社」）は、以下の個人情報を取得いたします：</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>氏名、住所、電話番号、メールアドレス</li>
                    <li>年齢、性別、職業</li>
                    <li>健康状態に関する情報</li>
                    <li>食事制限・アレルギー情報</li>
                    <li>参加動機・期待する効果</li>
                    <li>緊急連絡先情報</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">個人情報の利用目的</h2>
                  <p className="text-gray-600 mb-4">取得した個人情報は以下の目的で利用いたします：</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>リトリートの運営・管理</li>
                    <li>参加者の安全確保</li>
                    <li>食事・宿泊の適切な手配</li>
                    <li>緊急時の連絡</li>
                    <li>サービス改善のためのアンケート実施</li>
                    <li>今後のリトリート情報のご案内</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">個人情報の第三者提供</h2>
                  <p className="text-gray-600 mb-4">以下の場合を除き、個人情報を第三者に提供することはありません：</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>参加者の同意がある場合</li>
                    <li>法令に基づく場合</li>
                    <li>人の生命・身体の安全のため緊急に必要な場合</li>
                    <li>業務委託先への提供（秘密保持契約締結済み）</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">個人情報の管理</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>適切なセキュリティ対策を講じて個人情報を保護します</li>
                    <li>個人情報への不正アクセス、紛失、改ざんを防止します</li>
                    <li>個人情報の取り扱いについて従業員教育を実施します</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">個人情報の開示・訂正・削除</h2>
                  <p className="text-gray-600 mb-4">参加者は自身の個人情報について以下の権利を有します：</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>開示請求</li>
                    <li>訂正・追加・削除請求</li>
                    <li>利用停止請求</li>
                    <li>第三者提供停止請求</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">クッキー（Cookie）について</h2>
                  <p className="text-gray-600">当サイトではサービス向上のためクッキーを使用しています。ブラウザ設定でクッキーを無効にすることも可能です。</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">プライバシーポリシーの変更</h2>
                  <p className="text-gray-600">本ポリシーは予告なく変更することがあります。重要な変更がある場合は、ウェブサイトにて通知いたします。</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">お問い合わせ窓口</h2>
                  <p className="text-gray-600 mb-2">個人情報に関するお問い合わせ：</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>住所：〒108-0074 東京都港区高輪2丁目11番9号</li>
                    <li>メール：info@discoveryhiddenjapan.com</li>
                  </ul>
                  <p className="text-gray-600 mt-4">最終更新日：2025年10月1日</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Collection of Personal Information</h2>
                  <p className="text-gray-600 mb-4">ZEN RETREAT ASIA ("we" or "our company") collects the following personal information:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Name, address, phone number, email address</li>
                    <li>Age, gender, occupation</li>
                    <li>Health condition information</li>
                    <li>Dietary restrictions and allergy information</li>
                    <li>Participation motivation and expected benefits</li>
                    <li>Emergency contact information</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Purpose of Use</h2>
                  <p className="text-gray-600 mb-4">We use collected personal information for the following purposes:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Retreat operation and management</li>
                    <li>Ensuring participant safety</li>
                    <li>Appropriate arrangement of meals and accommodation</li>
                    <li>Emergency contact</li>
                    <li>Conducting surveys for service improvement</li>
                    <li>Providing information about future retreats</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Third-Party Disclosure</h2>
                  <p className="text-gray-600 mb-4">We do not disclose personal information to third parties except in the following cases:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>With participant's consent</li>
                    <li>When required by law</li>
                    <li>When urgently necessary for personal safety</li>
                    <li>To business partners under confidentiality agreements</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Personal Information Management</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>We implement appropriate security measures to protect personal information</li>
                    <li>We prevent unauthorized access, loss, and alteration of personal information</li>
                    <li>We provide employee training on personal information handling</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Disclosure, Correction, and Deletion</h2>
                  <p className="text-gray-600 mb-4">Participants have the following rights regarding their personal information:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Right to request disclosure</li>
                    <li>Right to request correction, addition, or deletion</li>
                    <li>Right to request suspension of use</li>
                    <li>Right to request suspension of third-party disclosure</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Cookies</h2>
                  <p className="text-gray-600">Our website uses cookies to improve services. You can disable cookies through your browser settings.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Privacy Policy Changes</h2>
                  <p className="text-gray-600">This policy may be changed without notice. We will notify important changes on our website.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Contact Information</h2>
                  <p className="text-gray-600 mb-2">For personal information inquiries:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>Address: 2-11-9 Takanawa, Minato-ku, Tokyo 108-0074, Japan</li>
                    <li>Email: info@discoveryhiddenjapan.com</li>
                  </ul>
                  <p className="text-gray-600 mt-4">Last updated: October 1, 2025</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default PrivacyPolicy;