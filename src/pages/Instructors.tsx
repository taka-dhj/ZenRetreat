import React from 'react';
import { Star, Award, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Instructors: React.FC = () => {
  const { language, t } = useLanguage();

  const instructors = [
    {
      id: 'maiko',
      name: 'Maiko（舞子）',
      specialty: language === 'ja' ? 'ヨガ・瞑想・身体表現' : 'Yoga, Meditation, Physical Expression',
      qualifications: language === 'ja' ? 'RYT200、現代舞踊、演劇' : 'RYT200, Modern Dance, Theater',
      image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=600',
      biography: language === 'ja' 
        ? '幼少期より現代舞踊に携わり、2013年にノダマップ舞台で演劇活動を開始。現在は俳優、モデル、ヨガインストラクターとして身体表現活動を行っています。東京2020オリンピック閉会式にも参加し、ヨガシークエンスの監修を担当しました。身体と心の調和を重視し、参加者一人一人の内なる美しさを引き出すことを大切にしています。'
        : 'Involved in modern dance since childhood, began acting career in 2013 with Noda Map Theater. Currently engaged in physical expression activities as an actor, model, and yoga instructor. Participated in the closing ceremony of Tokyo 2020 Olympics and supervised yoga sequences. Values harmony of body and mind, and cherishes bringing out the inner beauty of each participant.',
      experience: 8,
      rating: 4.9
    },
    {
      id: 'hiroshi',
      name: 'Hiroshi（寛）',
      specialty: language === 'ja' ? '禅瞑想・マインドフルネス・寺院文化' : 'Zen Meditation, Mindfulness, Temple Culture',
      qualifications: language === 'ja' ? '臨済宗僧侶、瞑想指導者' : 'Rinzai Zen Monk, Meditation Teacher',
      image: 'https://images.pexels.com/photos/3775603/pexels-photo-3775603.jpeg?auto=compress&cs=tinysrgb&w=600',
      biography: language === 'ja' 
        ? '京都の名刹で20年間修行を積み、現在は寺院での瞑想指導を専門としています。禅の教えを現代人にも親しみやすい形で伝えることを使命とし、初心者でも深い瞑想体験ができるよう丁寧に指導します。茶道や書道にも精通し、日本の精神文化を総合的に学べるプログラムを提供しています。'
        : 'Practiced for 20 years at famous temples in Kyoto, now specializes in meditation instruction at temples. Has a mission to convey Zen teachings in a form accessible to modern people, providing careful guidance so even beginners can have deep meditation experiences. Also versed in tea ceremony and calligraphy, offering comprehensive programs to learn Japanese spiritual culture.',
      experience: 20,
      rating: 5.0
    },
    {
      id: 'ayaka',
      name: 'Ayaka（彩香）',
      specialty: language === 'ja' ? 'アシュタンガヨガ・プラナヤマ・アーユルヴェーダ' : 'Ashtanga Yoga, Pranayama, Ayurveda',
      qualifications: language === 'ja' ? 'RYT500、アーユルヴェーダアドバイザー' : 'RYT500, Ayurveda Advisor',
      image: 'https://images.pexels.com/photos/3823185/pexels-photo-3823185.jpeg?auto=compress&cs=tinysrgb&w=600',
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
      image: 'https://images.pexels.com/photos/3775593/pexels-photo-3775593.jpeg?auto=compress&cs=tinysrgb&w=600',
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
                  <div className="md:w-1/3">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-64 md:h-full object-cover"
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
    </div>
  );
};

export default Instructors;