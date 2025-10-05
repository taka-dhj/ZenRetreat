import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CTASection from '../components/CTASection';

const CancellationPolicy: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            {language === 'ja' ? 'キャンセルポリシー' : 'Cancellation Policy'}
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
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">キャンセル料について</h2>
                  <p className="text-gray-600 mb-4">リトリート開始日を基準として、以下のキャンセル料を申し受けます：</p>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>30日前まで</strong>: キャンセル料なし（事務手数料3,000円のみ）</li>
                    <li><strong>29日前〜15日前</strong>: 参加費の20%</li>
                    <li><strong>14日前〜8日前</strong>: 参加費の30%</li>
                    <li><strong>7日前〜3日前</strong>: 参加費の50%</li>
                    <li><strong>2日前〜前日</strong>: 参加費の70%</li>
                    <li><strong>当日・無連絡不参加</strong>: 参加費の100%</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">キャンセル手続き</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>お電話またはメールにてご連絡ください</li>
                    <li>キャンセル理由をお聞かせください</li>
                    <li>返金手続きについてご案内いたします</li>
                    <li>返金は7-14営業日以内に指定口座へお振込みいたします</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">返金不可の場合</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>参加者の都合による当日キャンセル</li>
                    <li>無連絡でのご参加取り消し</li>
                    <li>リトリート開始後の途中キャンセル</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">主催者都合によるキャンセル</h2>
                  <p className="text-gray-600 mb-4">天災、交通機関の運休、講師の急病など、主催者都合でリトリートを中止する場合：</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>参加費を全額返金いたします</li>
                    <li>交通費・宿泊費などの関連費用は補償対象外です</li>
                    <li>代替日程での開催をご提案する場合があります</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">振替について</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>他の開催日程への振替は、空きがある場合に限り1回まで可能です</li>
                    <li>振替手数料として5,000円を申し受けます</li>
                    <li>振替先の参加費が高い場合は差額をお支払いいただきます</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">お問い合わせ</h2>
                  <p className="text-gray-600 mb-2">キャンセル・変更に関するお問い合わせ</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>メール：info@discoveryhiddenjapan.com</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Cancellation Fees</h2>
                  <p className="text-gray-600 mb-4">Based on the retreat start date, the following cancellation fees apply:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Up to 30 days before</strong>: No cancellation fee (administration fee ¥3,000 only)</li>
                    <li><strong>29-15 days before</strong>: 20% of participation fee</li>
                    <li><strong>14-8 days before</strong>: 30% of participation fee</li>
                    <li><strong>7-3 days before</strong>: 50% of participation fee</li>
                    <li><strong>2 days before to day before</strong>: 70% of participation fee</li>
                    <li><strong>Same day/no-show</strong>: 100% of participation fee</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Cancellation Procedure</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Contact us by phone or email</li>
                    <li>Please provide the reason for cancellation</li>
                    <li>We will guide you through the refund process</li>
                    <li>Refunds will be transferred to your designated account within 7-14 business days</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Non-refundable Cases</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Same-day cancellation due to participant's personal reasons</li>
                    <li>No-show without notice</li>
                    <li>Mid-retreat cancellation after program has started</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Organizer-Initiated Cancellation</h2>
                  <p className="text-gray-600 mb-4">In case of retreat cancellation due to natural disasters, transportation strikes, instructor illness, or other organizer circumstances:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Full participation fee will be refunded</li>
                    <li>Related expenses such as transportation and accommodation costs are not covered</li>
                    <li>Alternative dates may be proposed</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Transfer to Other Dates</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Transfer to other available dates is possible once only</li>
                    <li>Transfer fee of ¥5,000 applies</li>
                    <li>If the new date has a higher fee, the difference must be paid</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Contact Information</h2>
                  <p className="text-gray-600 mb-2">For cancellation and change inquiries:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>Email: info@discoveryhiddenjapan.com</li>
                  </ul>
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

export default CancellationPolicy;