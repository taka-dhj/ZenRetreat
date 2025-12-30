import React, { useState } from 'react';
import { Star, Award, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import CTASection from '../components/CTASection';

// 新しい画像スライダーコンポーネント - absoluteを一切使わない実装
const ImageSlider: React.FC<{ images: string[]; name: string }> = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 画像が1枚の場合
  if (images.length <= 1) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  // 複数画像の場合 - absoluteを使わない実装
  return (
    <div className="w-full h-full flex flex-col relative group">
      {/* 画像コンテナ - 各画像を独立した要素として配置 */}
      <div className="w-full flex-1 relative overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-full h-full ${index === currentIndex ? 'block' : 'hidden'}`}
          >
            <img
              src={image}
              alt={`${name} ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* ナビゲーション矢印 - 画像の上に配置 */}
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
        <button
          onClick={goToPrevious}
          className="ml-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 md:opacity-100 pointer-events-auto z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goToNext}
          className="mr-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 md:opacity-100 pointer-events-auto z-10"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ドットインジケーター - 画像の下に配置 */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Instructors: React.FC = () => {
  const { language, t } = useLanguage();

  const instructors = [
    {
      id: 'maiko',
      name: 'Princess',
      specialty: language === 'ja' ? 'ヨガ・瞑想・サウンドヒーリング' : 'Yoga, Meditation, Sound Healing',
      qualifications: language === 'ja' ? 'サウンドヒーラー' : 'Sound Healer',
      images: [
        '/instructor/princess.jpeg',
        '/instructor/princess2.jpeg'
      ],
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
      images: [
        '/instructor/Sho.png',
        '/instructor/Sho2.png'
      ],
      biography: language === 'ja'
        ? 'マインドフルネス瞑想インストラクターの資格を持ち、禅瞑想とマインドフルネスを融合した指導を行っています。瞑想を通じて日本の精神文化を伝えることを大切にし、初心者にも分かりやすく、現代の生活に取り入れやすい方法で心の平和と気づきを育みます。'
        : 'Certified Mindfulness Meditation Instructor who combines Zen meditation with mindfulness practices. Committed to sharing Japan\'s spiritual traditions through meditation, guiding beginners with accessible methods to cultivate inner peace and awareness in modern life.',
      experience: 10,
      rating: 5.0
    },
    {
      id: 'dawata',
      name: 'DAWATA Wellness',
      specialty: language === 'ja' ? 'ヨガ・瞑想・サウンドヒーリング・ウェルネス' : 'Yoga, Meditation, Sound Healing, Wellness',
      qualifications: language === 'ja' ? 'Best of Cebu Yoga Studio 2022 & 2023 / Global Innovative Yoga Studio 2024' : 'Best of Cebu Yoga Studio 2022 & 2023 / Global Innovative Yoga Studio 2024',
      images: ['/instructor/dawata.jpeg', '/instructor/dawata2.jpeg'],
      biography: language === 'ja'
        ? 'セブ島で最も革新的なヨガ&ウェルネススタジオで多数のインストラクターが在籍。朝6時から夜10時まで、初心者から上級者まで幅広くサポート。ヨガ、瞑想、サウンドヒーリング、フローティングサウンドバスなど、多彩なプログラムを提供。TOPSでのサンライズヨガやフルムーンヨガリトリートなど、セブの自然を活かした特別な体験も。'
        : 'Cebu\'s most innovative yoga & wellness studio with numerous instructors. Open from 6 AM to 10 PM, supporting everyone from beginners to advanced practitioners. Offers diverse programs including yoga, meditation, sound healing, and floating sound baths. Special experiences like sunrise yoga at TOPS and full moon yoga retreats that utilize Cebu\'s natural beauty.',
      experience: 4,
      rating: 4.9
    },
    {
      id: 'kenji',
      name: 'Kenji（健二）',
      specialty: language === 'ja' ? '森林セラピー・自然瞑想・ブリージングワーク' : 'Forest Therapy, Nature Meditation, Breathing Work',
      qualifications: language === 'ja' ? '森林セラピスト、呼吸法指導者' : 'Forest Therapist, Breathing Technique Instructor',
      images: ['/instructor/kenji.jpeg'],
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {instructors.filter(instructor => instructor.id !== 'kenji').map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* 縦並びレイアウト - 画像を上に固定サイズで配置 */}
                <div className="flex flex-col">
                  {/* 画像コンテナ - 固定高さ */}
                  <div className="w-full h-80 flex-shrink-0">
                    <ImageSlider images={instructor.images} name={instructor.name} />
                  </div>
                  
                  {/* テキストコンテンツ */}
                  <div className="w-full p-8 flex flex-col">
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

                    <p className="text-gray-600 leading-relaxed mb-6 text-sm break-words flex-grow">
                      {instructor.biography}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
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
