import React from 'react';
import { Star, Award, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import CTASection from '../components/CTASection';

const Instructors: React.FC = () => {
  const { language, t } = useLanguage();

  const instructors = [
    {
      id: 'maiko',
      name: 'Princess',
      specialty: language === 'ja' ? 'ヨガ・瞑想・サウンドヒーリング' : 'Yoga, Meditation, Sound Healing',
      qualifications: language === 'ja' ? 'サウンドヒーラー' : 'Sound Healer',
      image: '/instructor/princess.jpeg',
      biography: language === 'ja'
        ? 'フィリピン・セブで最も有名なヨガスタジオ「DAWATA Wellness」で、初心者から上級者まで幅広くヨガを指導しています。サウンドヒーリングにも精通しており、様々なアプローチを通じて心身の改善をサポートします。'
        : 'Teaches yoga to students of all levels, from beginners to advanced practitioners, at "DAWATA Wellness," the most renowned yoga studio in Cebu, Philippines. Also highly skilled in sound healing, supporting physical and mental wellness through diverse therapeutic approaches.',
      experience: 8,
      rating: 4.9
    },
    {
      id: 'hiroshi',
      name: 'Sho',
      specialty: language === 'ja' ? '禅瞑想・マインドフルネス・寺院文化' : 'Zen Meditation, Mindfulness, Temple Culture',
      qualifications: language === 'ja' ? '瞑想インストラクター（マインドフルネス）' : 'Meditation Instructor (Mindfulness)',
      image: '/instructor/Sho.png',
      biography: language === 'ja'
        ? 'マインドフルネス瞑想インストラクターの資格を持ち、禅瞑想とマインドフルネスを融合した指導を行っています。瞑想を通じて日本の精神文化を伝えることを大切にし、初心者にも分かりやすく、現代の生活に取り入れやすい方法で心の平和と気づきを育みます。'
        : 'Certified Mindfulness Meditation Instructor who combines Zen meditation with mindfulness practices. Committed to sharing Japan\'s spiritual traditions through meditation, guiding beginners with accessible methods to cultivate inner peace and awareness in modern life.',
      experience: 10,
      rating: 5.0
    },
    {
      id: 'ayaka',
      name: 'Ayaka（彩香）',
      specialty: language === 'ja' ? 'アシュタンガヨガ・プラナヤマ・アーユルヴェーダ' : 'Ashtanga Yoga, Pranayama, Ayurveda',
      qualifications: language === 'ja' ? 'RYT500、アーユルヴェーダアドバイザー' : 'RYT500, Ayurveda Advisor',
      image: '/instructor/ayaka.jpeg',
      biography: language === 'ja'
        ? 'インドで5年間ヨガとアーユルヴェーダを学び、現在は国内外でワークショップを開催しています。伝統的なアシュタンガヨガの練習を通じて、心身の変化を実感してもらうことを目指しています。個人の体質に合わせたアーユルヴェーダ的アプローチで、持続可能なウェルネスライフスタイルをサポートします。'
        : 'Studied yoga and Ayurveda in India for 5 years, currently holds workshops both domestically and internationally. Aims to help participants experience mind-body changes through traditional Ashtanga yoga practice. Supports sustainable wellness lifestyles with Ayurvedic approaches tailored to individual constitution.',
      experience: 10,
      rating: 4.8
    },
    {
      id: 'kenji',
      name: 'Kenji（健二）',
      specialty: language === 'ja' ? '森林セラピー・自然瞑想・ブリージングワーク' : 'Forest Therapy, Nature Meditation, Breathing Work',
      qualifications: language === 'ja' ? '森林セラピスト、呼吸法指導者' : 'Forest Therapist, Breathing Technique Instructor',
      image: '/instructor/kenji.jpeg',
      biography: language === 'ja'
        ? '自然環境での癒しを専門とし、森林の持つ治癒力を活用したプログラムを開発しています。山梨の富士山麓をベースに、四季を通じて自然との調和を体験できるリトリートを提供。呼吸法と自然音を組み合わせた独自のセラピー手法で、都市生活で疲れた心身を根本から癒します。'
        : 'Specializes in healing in natural environments, developing programs that utilize the healing power of forests. Based at the foot of Mt. Fuji in Yamanashi, provides retreats where you can experience harmony with nature throughout the seasons. Uses unique therapy methods combining breathing techniques and natural sounds to fundamentally heal minds and bodies tired from urban life.',
      experience: 12,
      rating: 4.9
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            {t('nav.instructors')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ja' 
              ? '経験豊富で情熱的なインストラクター陣が、あなたの内なる平和と成長を導きます。それぞれが専門分野を持ち、心身の調和を目指すあなたをサポートします。'
              : 'Our experienced and passionate instructors guide you to inner peace and growth. Each has their own area of expertise and supports you in achieving harmony of mind and body.'
            }
          </p>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3 flex">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-64 md:h-full object-cover self-stretch"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-medium text-gray-800">
                        {instructor.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-600">
                          {instructor.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-green-600 font-medium mb-1">
                        {t('instructor.specialty')}: {instructor.specialty}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {t('instructor.qualifications')}: {instructor.qualifications}
                      </p>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                      {instructor.biography}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Award size={16} className="text-blue-500" />
                          <span className="text-sm text-gray-600">
                            {instructor.experience}{language === 'ja' ? '年の経験' : ' years exp.'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart size={16} className="text-red-500" />
                          <span className="text-sm text-gray-600">
                            {language === 'ja' ? '専門指導' : 'Expert guidance'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            {language === 'ja' ? '私たちの指導理念' : 'Our Teaching Philosophy'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'ja' 
              ? '一人一人の個性と可能性を大切にし、安心できる環境で成長をサポートします'
              : 'We value each individual\'s uniqueness and potential, supporting growth in a safe environment'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="font-medium mb-2">
                {language === 'ja' ? '思いやり' : 'Compassion'}
              </h3>
              <p className="text-sm opacity-90">
                {language === 'ja' 
                  ? '参加者の心に寄り添い、温かくサポートします'
                  : 'We empathize with participants\' hearts and provide warm support'
                }
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="font-medium mb-2">
                {language === 'ja' ? '専門性' : 'Expertise'}
              </h3>
              <p className="text-sm opacity-90">
                {language === 'ja' 
                  ? '長年の経験と専門知識で安全な指導を提供します'
                  : 'We provide safe guidance with years of experience and expertise'
                }
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="font-medium mb-2">
                {language === 'ja' ? '成長' : 'Growth'}
              </h3>
              <p className="text-sm opacity-90">
                {language === 'ja' 
                  ? '内なる可能性を引き出し、継続的な成長を促します'
                  : 'We draw out inner potential and promote continuous growth'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Instructors;