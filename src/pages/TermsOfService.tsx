import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CTASection from '../components/CTASection';

const TermsOfService: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            {language === 'ja' ? '利用規約' : 'Terms of Service'}
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
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第1条（適用範囲）</h2>
                  <p className="text-gray-600">本規約は、ZEN RETREAT ASIA（以下「当社」）が提供するリトリートサービス（以下「本サービス」）の利用に関して適用されます。</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第2条（サービス内容）</h2>
                  <p className="text-gray-600 mb-4">当社は以下のサービスを提供します：</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>ヨガ・瞑想リトリートプログラムの企画・運営</li>
                    <li>宿泊・食事の手配</li>
                    <li>専門インストラクターによる指導</li>
                    <li>文化体験プログラムの提供</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第3条（利用申込み）</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>利用者は所定の申込書に必要事項を記入し、当社に提出するものとします</li>
                    <li>当社が申込みを承諾した時点で契約が成立します</li>
                    <li>虚偽の申告が判明した場合、契約を解除することがあります</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第4条（料金・支払い）</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>利用料金は各リトリートページに記載された金額とします</li>
                    <li>支払いは銀行振込またはクレジットカードで行います</li>
                    <li>支払期限は申込み後7日以内です</li>
                    <li>手数料は利用者負担とします</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第5条（参加条件）</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>18歳以上であること</li>
                    <li>基本的な健康状態を保持していること</li>
                    <li>プログラムの指示に従えること</li>
                    <li>他の参加者に迷惑をかけないこと</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第6条（禁止行為）</h2>
                  <p className="text-gray-600 mb-4">以下の行為を禁止します：</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>他の参加者への迷惑行為</li>
                    <li>宿泊施設での飲酒・喫煙</li>
                    <li>無許可での写真撮影・録音</li>
                    <li>宗教的・政治的活動</li>
                    <li>その他当社が不適切と判断する行為</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第7条（キャンセル・変更）</h2>
                  <p className="text-gray-600">キャンセル・変更については別途定めるキャンセルポリシーに従います。</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第8条（免責事項）</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>天災・交通機関の運休等による影響について当社は責任を負いません</li>
                    <li>参加者の故意・過失による損害について当社は責任を負いません</li>
                    <li>参加者同士のトラブルについて当社は仲裁の義務を負いません</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第9条（個人情報保護）</h2>
                  <p className="text-gray-600">個人情報の取り扱いについては別途定めるプライバシーポリシーに従います。</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第10条（契約解除）</h2>
                  <p className="text-gray-600 mb-4">以下の場合、当社は契約を解除できます：</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>参加条件を満たさない場合</li>
                    <li>禁止行為を行った場合</li>
                    <li>料金の支払いが遅延した場合</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第11条（損害賠償）</h2>
                  <p className="text-gray-600">参加者が当社または第三者に損害を与えた場合、賠償の責任を負います。</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第12条（準拠法・管轄裁判所）</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>本規約は日本法を準拠法とします</li>
                    <li>紛争が生じた場合は東京地方裁判所を専属管轄裁判所とします</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">第13条（規約の変更）</h2>
                  <p className="text-gray-600">当社は利用者への通知により本規約を変更できます。</p>
                </div>

                <div>
                  <p className="text-gray-600 font-medium">制定日：2025年10月1日</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 1 (Scope of Application)</h2>
                  <p className="text-gray-600">These terms apply to the use of retreat services ("Services") provided by ZEN RETREAT ASIA ("Company").</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 2 (Service Content)</h2>
                  <p className="text-gray-600 mb-4">The Company provides the following services:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Planning and operation of yoga and meditation retreat programs</li>
                    <li>Arrangement of accommodation and meals</li>
                    <li>Instruction by professional instructors</li>
                    <li>Provision of cultural experience programs</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 3 (Application for Use)</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Users must complete the designated application form and submit it to the Company</li>
                    <li>The contract is established when the Company accepts the application</li>
                    <li>The contract may be cancelled if false information is discovered</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 4 (Fees and Payment)</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Usage fees are as stated on each retreat page</li>
                    <li>Payment is made by bank transfer or credit card</li>
                    <li>Payment deadline is within 7 days of application</li>
                    <li>Handling fees are borne by the user</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 5 (Participation Conditions)</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Must be 18 years or older</li>
                    <li>Must maintain basic health condition</li>
                    <li>Must be able to follow program instructions</li>
                    <li>Must not disturb other participants</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 6 (Prohibited Acts)</h2>
                  <p className="text-gray-600 mb-4">The following acts are prohibited:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Disturbing other participants</li>
                    <li>Drinking or smoking at accommodation facilities</li>
                    <li>Unauthorized photography or recording</li>
                    <li>Religious or political activities</li>
                    <li>Other acts deemed inappropriate by the Company</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 7 (Cancellation and Changes)</h2>
                  <p className="text-gray-600">Cancellations and changes are subject to the separately established Cancellation Policy.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 8 (Disclaimer)</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>The Company is not responsible for effects due to natural disasters, transportation strikes, etc.</li>
                    <li>The Company is not responsible for damages due to participants' intentional or negligent acts</li>
                    <li>The Company has no obligation to mediate disputes between participants</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 9 (Personal Information Protection)</h2>
                  <p className="text-gray-600">Personal information handling follows the separately established Privacy Policy.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 10 (Contract Termination)</h2>
                  <p className="text-gray-600 mb-4">The Company may terminate contracts in the following cases:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>When participation conditions are not met</li>
                    <li>When prohibited acts are performed</li>
                    <li>When payment is delayed</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 11 (Damage Compensation)</h2>
                  <p className="text-gray-600">Participants are liable for compensation if they cause damage to the Company or third parties.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 12 (Governing Law and Jurisdiction)</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>These terms are governed by Japanese law</li>
                    <li>Tokyo District Court has exclusive jurisdiction for disputes</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">Article 13 (Terms Modification)</h2>
                  <p className="text-gray-600">The Company may modify these terms by notifying users.</p>
                </div>

                <div>
                  <p className="text-gray-600 font-medium">Established: October 1, 2025</p>
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

export default TermsOfService;