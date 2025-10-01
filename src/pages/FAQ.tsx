import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const FAQ: React.FC = () => {
  const { language } = useLanguage();

  const faqData = {
    ja: {
      title: 'よくある質問',
      sections: [
        {
          title: '予約・参加について',
          questions: [
            {
              q: '初心者でも参加できますか？',
              a: 'はい、ヨガや瞑想が初めての方でも安心してご参加いただけます。経験豊富なインストラクターが個人のレベルに合わせて丁寧に指導いたします。'
            },
            {
              q: '英語しか話せませんが参加できますか？',
              a: 'はい、英語での指導・通訳サービスを提供しております。事前にお申し込み時にその旨をお知らせください。'
            },
            {
              q: '特定の宗教を信仰していませんが大丈夫ですか？',
              a: 'はい、特定の宗教的信仰は必要ありません。智積院での体験は文化的・精神的な学びとして、どなたでもご参加いただけます。'
            },
            {
              q: '一人での参加は可能ですか？',
              a: 'はい、お一人でのご参加も大歓迎です。多くの方がお一人で参加され、新しい出会いと深い内省の時間を楽しまれています。'
            },
            {
              q: '年齢制限はありますか？',
              a: '18歳以上の方にご参加いただいております。基本的なヨガポーズができる健康状態であれば、年齢上限はございません。'
            }
          ]
        },
        {
          title: '宿泊・食事について',
          questions: [
            {
              q: '部屋は個室ですか？',
              a: '智積院会館では個室（洋室・和洋室）をご用意しております。相部屋をご希望の場合は事前にご相談ください。'
            },
            {
              q: '食事制限に対応していますか？',
              a: '精進料理は基本的にベジタリアン対応です。アレルギーなど特別な食事制限がある場合は、お申し込み時にお知らせください。'
            },
            {
              q: 'お酒は飲めますか？',
              a: '宿坊内での飲酒はご遠慮いただいております。リトリート期間中は心身の浄化に集中していただくため、ご理解ください。'
            }
          ]
        },
        {
          title: 'プログラム内容について',
          questions: [
            {
              q: '朝のお勤めは必須ですか？',
              a: '朝のお勤めはリトリートの重要な要素ですが、体調不良などの場合は無理をせずお休みいただけます。'
            },
            {
              q: '雨天時のプログラムはどうなりますか？',
              a: '屋外での活動は屋内に変更いたします。智積院会館内でのヨガや瞑想など、天候に関係なく充実したプログラムを提供いたします。'
            },
            {
              q: '写真撮影は可能ですか？',
              a: '境内の一部エリアでは撮影可能ですが、制限区域もございます。詳細は現地でご案内いたします。'
            }
          ]
        },
        {
          title: 'その他',
          questions: [
            {
              q: '持参すべきものはありますか？',
              a: '動きやすい服装、防寒具、筆記用具、個人用品をお持ちください。ヨガマットはレンタル可能です。'
            },
            {
              q: 'Wi-Fiは利用できますか？',
              a: '智積院会館では無料Wi-Fiをご利用いただけます。ただし、デジタルデトックスの観点から、必要最小限のご利用をお勧めしています。'
            },
            {
              q: '最寄り駅からのアクセスは？',
              a: '京阪電車「七条駅」から徒歩約10分、JR「京都駅」からタクシーで約10分です。詳細なアクセス情報は予約確定後にお送りいたします。'
            }
          ]
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions',
      sections: [
        {
          title: 'Booking & Participation',
          questions: [
            {
              q: 'Can beginners participate?',
              a: 'Yes, we welcome participants who are new to yoga and meditation. Our experienced instructors will provide gentle guidance tailored to each individual\'s level.'
            },
            {
              q: 'Can I participate if I only speak English?',
              a: 'Yes, we provide instruction and interpretation services in English. Please let us know at the time of booking.'
            },
            {
              q: 'Is it okay if I don\'t follow a specific religion?',
              a: 'Yes, no specific religious faith is required. The experience at Chishakuin is offered as cultural and spiritual learning that anyone can participate in.'
            },
            {
              q: 'Can I participate alone?',
              a: 'Yes, solo participants are very welcome. Many people join alone and enjoy new connections and deep introspective time.'
            },
            {
              q: 'Is there an age limit?',
              a: 'Participants must be 18 years or older. There is no upper age limit as long as you are in good health and can perform basic yoga poses.'
            }
          ]
        },
        {
          title: 'Accommodation & Meals',
          questions: [
            {
              q: 'Are the rooms private?',
              a: 'Chishakuin Kaikan provides private rooms (Western-style and Japanese-Western style rooms). If you prefer to share a room, please let us know in advance.'
            },
            {
              q: 'Do you accommodate dietary restrictions?',
              a: 'Shojin cuisine is naturally vegetarian. If you have allergies or special dietary requirements, please inform us at the time of booking.'
            },
            {
              q: 'Can I drink alcohol?',
              a: 'Alcohol consumption is not permitted within the temple lodging. We ask for your understanding as we focus on purification of mind and body during the retreat.'
            }
          ]
        },
        {
          title: 'Program Content',
          questions: [
            {
              q: 'Is morning service mandatory?',
              a: 'Morning service is an important element of the retreat, but if you\'re feeling unwell, you may rest without pressure to participate.'
            },
            {
              q: 'What happens to outdoor programs in case of rain?',
              a: 'Outdoor activities will be moved indoors. We provide fulfilling programs including yoga and meditation within Chishakuin Kaikan regardless of weather.'
            },
            {
              q: 'Is photography allowed?',
              a: 'Photography is permitted in some areas of the temple grounds, but there are restricted areas. Details will be provided on-site.'
            }
          ]
        },
        {
          title: 'Others',
          questions: [
            {
              q: 'What should I bring?',
              a: 'Please bring comfortable clothing, warm clothes, writing materials, and personal items. Yoga mats are available for rental.'
            },
            {
              q: 'Is Wi-Fi available?',
              a: 'Free Wi-Fi is available at Chishakuin Kaikan. However, we recommend minimal use for digital detox purposes.'
            },
            {
              q: 'How do I get there from the nearest station?',
              a: 'About 10 minutes walk from Keihan "Shichijo Station" or about 10 minutes by taxi from JR "Kyoto Station." Detailed access information will be sent after booking confirmation.'
            }
          ]
        }
      ]
    }
  };

  const currentData = faqData[language];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            {currentData.title}
          </h1>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h2 className="text-2xl font-medium text-gray-800 mb-8 border-b border-gray-200 pb-4">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.questions.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Q{sectionIndex * 10 + index + 1}. {item.q}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      A. {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;