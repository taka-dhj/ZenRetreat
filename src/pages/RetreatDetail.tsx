import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, Calendar, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const RetreatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();

  // Fix scroll position for fixed header
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const baseUrl = language === 'en' ? '/en' : '';

  const allRetreatData = {
    'kyoto-chishakuin': {
      title: language === 'ja' ? '京都・智積院寺院ヨガリトリート' : 'Kyoto Chishakuin Temple Yoga Retreat',
      location: language === 'ja' ? '京都・智積院' : 'Kyoto, Chishakuin Temple',
      duration: 6,
      capacity: 8,
      type: 'domestic',
      heroImage: '/image copy.png',
      description: language === 'ja' 
        ? '古都の静寂な寺院での瞑想とヨガ。千年の歴史を持つ智積院で心の平穏を見つけましょう。日本の伝統的な精神文化に触れながら、現代のストレスから解放される特別な体験です。'
        : 'Meditation and yoga in the serene temples of ancient capital. Find peace of mind at Chishakuin Temple with a thousand years of history. A special experience to be freed from modern stress while experiencing traditional Japanese spiritual culture.',
      includes: language === 'ja' ? [
        '5泊6日の宿泊（寺院宿坊）',
        '全食事（精進料理）',
        '毎日のヨガクラス',
        '瞑想指導',
        '寺院見学・参拝',
        '茶道体験',
        '書道体験',
        '専門インストラクター',
        'ヨガマットレンタル'
      ] : [
        '5 nights accommodation (temple lodging)',
        'All meals (Buddhist vegetarian cuisine)',
        'Daily yoga classes',
        'Meditation instruction',
        'Temple tours & worship',
        'Tea ceremony experience',
        'Calligraphy experience',
        'Professional instructor',
        'Yoga mat rental'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '14:00 京都駅到着・智積院へ移動',
            '15:00 宿坊チェックイン・オリエンテーション',
            '16:00 寺院見学・境内散策',
            '18:00 精進料理の夕食',
            '20:00 初回ヨガセッション・瞑想入門',
            '21:30 就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '05:30 起床・朝の勤行参加',
            '06:30 朝ヨガ（本堂）',
            '08:00 朝食',
            '10:00 瞑想指導・坐禅体験',
            '12:00 昼食',
            '14:00 茶道体験',
            '16:00 庭園散策・自然瞑想',
            '18:00 夕食',
            '20:00 夜ヨガ・キャンドル瞑想',
            '21:30 就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '05:30 起床・朝の勤行',
            '06:30 朝ヨガ（庭園）',
            '08:00 朝食',
            '10:00 書道体験',
            '12:00 昼食',
            '14:00 京都市内寺院巡り（清水寺・金閣寺）',
            '18:00 夕食',
            '20:00 ヨガ・呼吸法',
            '21:30 就寝'
          ]
        },
        {
          day: '4日目',
          activities: [
            '05:30 起床・朝の勤行',
            '06:30 朝ヨガ',
            '08:00 朝食',
            '10:00 ヨガ哲学講座',
            '12:00 昼食',
            '14:00 自由時間・個人瞑想',
            '16:00 住職による法話',
            '18:00 夕食',
            '20:00 リストラティブヨガ',
            '21:30 就寝'
          ]
        },
        {
          day: '5日目',
          activities: [
            '05:30 起床・朝の勤行',
            '06:30 朝ヨガ',
            '08:00 朝食',
            '10:00 統合ヨガセッション',
            '12:00 昼食',
            '14:00 体験シェアリング',
            '16:00 自由時間',
            '18:00 お別れ夕食',
            '20:00 感謝の瞑想・クロージング',
            '21:30 就寝'
          ]
        },
        {
          day: '6日目',
          activities: [
            '05:30 起床・最終朝の勤行',
            '06:30 最終ヨガセッション',
            '08:00 朝食',
            '10:00 チェックアウト・お見送り'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '2:00 PM Arrival at Kyoto Station & Transfer to Chishakuin',
            '3:00 PM Temple lodging check-in & Orientation',
            '4:00 PM Temple tour & Grounds exploration',
            '6:00 PM Buddhist vegetarian dinner',
            '8:00 PM First yoga session & Meditation introduction',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '5:30 AM Wake up & Morning service participation',
            '6:30 AM Morning yoga (main hall)',
            '8:00 AM Breakfast',
            '10:00 AM Meditation instruction & Zazen experience',
            '12:00 PM Lunch',
            '2:00 PM Tea ceremony experience',
            '4:00 PM Garden walk & Nature meditation',
            '6:00 PM Dinner',
            '8:00 PM Evening yoga & Candle meditation',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '5:30 AM Wake up & Morning service',
            '6:30 AM Morning yoga (garden)',
            '8:00 AM Breakfast',
            '10:00 AM Calligraphy experience',
            '12:00 PM Lunch',
            '2:00 PM Kyoto temple tour (Kiyomizu-dera & Kinkaku-ji)',
            '6:00 PM Dinner',
            '8:00 PM Yoga & Breathing techniques',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 4',
          activities: [
            '5:30 AM Wake up & Morning service',
            '6:30 AM Morning yoga',
            '8:00 AM Breakfast',
            '10:00 AM Yoga philosophy lecture',
            '12:00 PM Lunch',
            '2:00 PM Free time & Personal meditation',
            '4:00 PM Dharma talk by head priest',
            '6:00 PM Dinner',
            '8:00 PM Restorative yoga',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 5',
          activities: [
            '5:30 AM Wake up & Morning service',
            '6:30 AM Morning yoga',
            '8:00 AM Breakfast',
            '10:00 AM Integrated yoga session',
            '12:00 PM Lunch',
            '2:00 PM Experience sharing',
            '4:00 PM Free time',
            '6:00 PM Farewell dinner',
            '8:00 PM Gratitude meditation & Closing',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 6',
          activities: [
            '5:30 AM Wake up & Final morning service',
            '6:30 AM Final yoga session',
            '8:00 AM Breakfast',
            '10:00 AM Check-out & Farewell'
          ]
        }
      ]
    },
    'yamanashi-forest': {
      title: language === 'ja' ? '山梨・森林セラピー＆ヨガリトリート' : 'Yamanashi Forest Therapy & Yoga Retreat',
      location: language === 'ja' ? '山梨・富士五湖' : 'Yamanashi, Fuji Five Lakes',
      duration: 4,
      capacity: 12,
      type: 'domestic',
      heroImage: '/image copy copy.png',
      description: language === 'ja' 
        ? '富士山を望む森林でのヨガと温泉。自然のエネルギーで心身をリフレッシュする4日間のプログラムです。'
        : 'Yoga and hot springs in forests with Mt. Fuji views. A 4-day program to refresh mind and body with nature energy.',
      includes: language === 'ja' ? [
        '3泊4日の宿泊（森林リゾートホテル）',
        '全食事（地元食材料理）',
        '毎日のヨガクラス',
        '森林セラピー体験',
        '富士山展望ハイキング',
        '温泉入浴',
        'アーユルヴェーダマッサージ',
        '専門インストラクター',
        'ヨガマットレンタル'
      ] : [
        '3 nights accommodation (forest resort hotel)',
        'All meals (local ingredient cuisine)',
        'Daily yoga classes',
        'Forest therapy experience',
        'Mt. Fuji viewing hiking',
        'Hot spring bathing',
        'Ayurvedic massage',
        'Professional instructor',
        'Yoga mat rental'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '14:00 ホテル到着・チェックイン',
            '15:00 オリエンテーション',
            '16:00 森林散策・自然観察',
            '18:00 夕食（地元食材料理）',
            '20:00 初回ヨガセッション',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '06:00 起床',
            '06:30 朝ヨガ（屋外）',
            '08:00 朝食',
            '10:00 森林セラピー体験',
            '12:00 昼食（ピクニック）',
            '14:00 富士山展望ハイキング',
            '18:00 夕食',
            '20:00 瞑想・呼吸法',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '06:00 起床',
            '06:30 朝ヨガ（湖畔）',
            '08:00 朝食',
            '10:00 ヨガ哲学講座',
            '12:00 昼食',
            '14:00 自由時間・個人瞑想',
            '16:00 アーユルヴェーダマッサージ',
            '18:00 夕食',
            '20:00 キャンドルヨガ',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '4日目',
          activities: [
            '06:00 起床',
            '06:30 最終ヨガセッション',
            '08:00 朝食',
            '10:00 シェアリング・クロージング',
            '11:30 チェックアウト・お見送り'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '2:00 PM Hotel arrival & Check-in',
            '3:00 PM Orientation',
            '4:00 PM Forest walk & Nature observation',
            '6:00 PM Dinner (local ingredient cuisine)',
            '8:00 PM First yoga session',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Morning yoga (outdoor)',
            '8:00 AM Breakfast',
            '10:00 AM Forest therapy experience',
            '12:00 PM Lunch (picnic)',
            '2:00 PM Mt. Fuji viewing hiking',
            '6:00 PM Dinner',
            '8:00 PM Meditation & breathing',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Morning yoga (lakeside)',
            '8:00 AM Breakfast',
            '10:00 AM Yoga philosophy lecture',
            '12:00 PM Lunch',
            '2:00 PM Free time & Personal meditation',
            '4:00 PM Ayurvedic massage',
            '6:00 PM Dinner',
            '8:00 PM Candle yoga',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 4',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Final yoga session',
            '8:00 AM Breakfast',
            '10:00 AM Sharing & Closing',
            '11:30 AM Check-out & Farewell'
          ]
        }
      ]
    },
    'cebu-beach': {
      title: language === 'ja' ? 'セブ島・ビーチヨガ＆瞑想リトリート' : 'Cebu Island Beach Yoga & Meditation Retreat',
      location: language === 'ja' ? 'フィリピン・セブ島' : 'Philippines, Cebu Island',
      duration: 5,
      capacity: 10,
      type: 'international',
      heroImage: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? 'トロピカルビーチでのサンライズヨガ。エメラルドグリーンの海でのウォーターヨガも体験できる5日間のリトリートです。'
        : 'Sunrise yoga on tropical beaches. A 5-day retreat where you can also experience water yoga in emerald green seas.',
      includes: language === 'ja' ? [
        '4泊5日の宿泊（ビーチリゾートホテル）',
        '全食事（トロピカル料理）',
        '毎日のヨガクラス',
        'ビーチヨガ体験',
        'ウォーターヨガ',
        'シュノーケリング',
        'マッサージ',
        '専門インストラクター',
        'ヨガマットレンタル'
      ] : [
        '4 nights accommodation (beach resort hotel)',
        'All meals (tropical cuisine)',
        'Daily yoga classes',
        'Beach yoga experience',
        'Water yoga',
        'Snorkeling',
        'Massage',
        'Professional instructor',
        'Yoga mat rental'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '15:00 ホテル到着・チェックイン',
            '16:00 オリエンテーション',
            '17:00 ビーチ散策・夕日鑑賞',
            '19:00 夕食（トロピカル料理）',
            '20:30 初回ヨガセッション',
            '22:00 就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '05:30 起床',
            '06:00 サンライズビーチヨガ',
            '08:00 朝食',
            '10:00 ウォーターヨガ体験',
            '12:00 昼食',
            '14:00 シュノーケリング',
            '16:00 自由時間・ビーチタイム',
            '19:00 夕食',
            '20:30 夜ヨガ・瞑想',
            '22:00 就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '05:30 起床',
            '06:00 ビーチヨガ',
            '08:00 朝食',
            '10:00 マッサージ・スパタイム',
            '12:00 昼食',
            '14:00 島内観光',
            '17:00 ホテル帰着',
            '19:00 夕食',
            '20:30 キャンドルヨガ',
            '22:00 就寝'
          ]
        },
        {
          day: '4日目',
          activities: [
            '05:30 起床',
            '06:00 サンライズヨガ',
            '08:00 朝食',
            '10:00 ヨガ哲学講座',
            '12:00 昼食',
            '14:00 自由時間・個人瞑想',
            '16:00 ビーチアクティビティ',
            '19:00 夕食',
            '20:30 リストラティブヨガ',
            '22:00 就寝'
          ]
        },
        {
          day: '5日目',
          activities: [
            '05:30 起床',
            '06:00 最終サンライズヨガ',
            '08:00 朝食',
            '10:00 シェアリング・クロージング',
            '12:00 チェックアウト・お見送り'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '3:00 PM Hotel arrival & Check-in',
            '4:00 PM Orientation',
            '5:00 PM Beach walk & Sunset viewing',
            '7:00 PM Dinner (tropical cuisine)',
            '8:30 PM First yoga session',
            '10:00 PM Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Sunrise beach yoga',
            '8:00 AM Breakfast',
            '10:00 AM Water yoga experience',
            '12:00 PM Lunch',
            '2:00 PM Snorkeling',
            '4:00 PM Free time & Beach time',
            '7:00 PM Dinner',
            '8:30 PM Evening yoga & Meditation',
            '10:00 PM Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Beach yoga',
            '8:00 AM Breakfast',
            '10:00 AM Massage & Spa time',
            '12:00 PM Lunch',
            '2:00 PM Island sightseeing',
            '5:00 PM Return to hotel',
            '7:00 PM Dinner',
            '8:30 PM Candle yoga',
            '10:00 PM Rest'
          ]
        },
        {
          day: 'Day 4',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Sunrise yoga',
            '8:00 AM Breakfast',
            '10:00 AM Yoga philosophy lecture',
            '12:00 PM Lunch',
            '2:00 PM Free time & Personal meditation',
            '4:00 PM Beach activities',
            '7:00 PM Dinner',
            '8:30 PM Restorative yoga',
            '10:00 PM Rest'
          ]
        },
        {
          day: 'Day 5',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Final sunrise yoga',
            '8:00 AM Breakfast',
            '10:00 AM Sharing & Closing',
            '12:00 PM Check-out & Farewell'
          ]
        }
      ]
    },
    'kumano-kodo': {
      title: language === 'ja' ? '熊野古道・巡礼ウォーキング＆ヨガリトリート' : 'Kumano Kodo Pilgrimage Walking & Yoga Retreat',
      location: language === 'ja' ? '和歌山・熊野古道' : 'Wakayama, Kumano Kodo',
      duration: 6,
      capacity: 8,
      type: 'domestic',
      heroImage: '/image copy copy copy.png',
      description: language === 'ja' 
        ? '世界遺産の熊野古道を歩く巡礼体験。古代からの聖地でのヨガと瞑想で心身を浄化する6日間の特別なリトリートです。'
        : 'Pilgrimage experience walking the World Heritage Kumano Kodo. A special 6-day retreat to purify mind and body with yoga and meditation at ancient sacred sites.',
      includes: language === 'ja' ? [
        '5泊6日の宿泊（宿坊・温泉宿）',
        '全食事（精進料理・地元料理）',
        '毎日のヨガクラス',
        '熊野古道ウォーキング',
        '熊野三山参拝',
        '滝行体験',
        '温泉入浴',
        '専門ガイド・インストラクター',
        'ヨガマットレンタル'
      ] : [
        '5 nights accommodation (temple lodging & hot spring inn)',
        'All meals (Buddhist vegetarian & local cuisine)',
        'Daily yoga classes',
        'Kumano Kodo walking',
        'Kumano Sanzan worship',
        'Waterfall meditation experience',
        'Hot spring bathing',
        'Professional guide & instructor',
        'Yoga mat rental'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '14:00 熊野本宮大社到着・参拝',
            '15:00 宿坊チェックイン・オリエンテーション',
            '16:00 熊野古道概要説明・装備確認',
            '18:00 精進料理の夕食',
            '20:00 初回ヨガセッション・瞑想',
            '21:30 就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '06:00 起床・朝の勤行参加',
            '07:00 朝ヨガ（境内）',
            '08:00 朝食',
            '09:00 熊野古道ウォーキング開始（本宮～湯の峰温泉）',
            '12:00 昼食（弁当）',
            '14:00 湯の峰温泉到着・温泉入浴',
            '16:00 宿泊施設チェックイン',
            '18:00 夕食（地元料理）',
            '20:00 夜ヨガ・歩行瞑想の振り返り',
            '21:30 就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '06:00 起床',
            '06:30 朝ヨガ（屋外）',
            '08:00 朝食',
            '09:00 熊野古道ウォーキング（湯の峰～熊野速玉大社）',
            '12:00 昼食',
            '15:00 熊野速玉大社到着・参拝',
            '16:00 新宮市内宿泊施設チェックイン',
            '18:00 夕食',
            '20:00 ヨガ・瞑想セッション',
            '21:30 就寝'
          ]
        },
        {
          day: '4日目',
          activities: [
            '06:00 起床',
            '06:30 朝ヨガ',
            '08:00 朝食',
            '09:00 熊野那智大社・那智の滝参拝',
            '12:00 昼食',
            '14:00 大門坂ウォーキング',
            '16:00 那智山宿坊チェックイン',
            '18:00 精進料理の夕食',
            '20:00 滝行体験・瞑想',
            '21:30 就寝'
          ]
        },
        {
          day: '5日目',
          activities: [
            '05:30 起床',
            '06:00 朝の勤行参加',
            '07:00 朝ヨガ（那智の滝前）',
            '08:00 朝食',
            '10:00 熊野古道最終ウォーキング',
            '12:00 昼食',
            '14:00 シェアリングサークル・体験共有',
            '16:00 自由時間',
            '18:00 お別れディナー',
            '20:00 感謝の瞑想・クロージング',
            '21:30 就寝'
          ]
        },
        {
          day: '6日目',
          activities: [
            '06:00 起床',
            '06:30 最終朝ヨガ',
            '08:00 朝食',
            '09:30 チェックアウト・お見送り'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '2:00 PM Arrival at Kumano Hongu Taisha & Worship',
            '3:00 PM Temple lodging check-in & Orientation',
            '4:00 PM Kumano Kodo overview & Equipment check',
            '6:00 PM Buddhist vegetarian dinner',
            '8:00 PM First yoga session & Meditation',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '6:00 AM Wake up & Morning service participation',
            '7:00 AM Morning yoga (temple grounds)',
            '8:00 AM Breakfast',
            '9:00 AM Kumano Kodo walking begins (Hongu to Yunomine Onsen)',
            '12:00 PM Lunch (bento)',
            '2:00 PM Arrival at Yunomine Onsen & Hot spring bath',
            '4:00 PM Accommodation check-in',
            '6:00 PM Dinner (local cuisine)',
            '8:00 PM Evening yoga & Walking meditation reflection',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Morning yoga (outdoor)',
            '8:00 AM Breakfast',
            '9:00 AM Kumano Kodo walking (Yunomine to Kumano Hayatama Taisha)',
            '12:00 PM Lunch',
            '3:00 PM Arrival at Kumano Hayatama Taisha & Worship',
            '4:00 PM Shingu city accommodation check-in',
            '6:00 PM Dinner',
            '8:00 PM Yoga & meditation session',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 4',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Morning yoga',
            '8:00 AM Breakfast',
            '9:00 AM Kumano Nachi Taisha & Nachi Falls worship',
            '12:00 PM Lunch',
            '2:00 PM Daimon-zaka walking',
            '4:00 PM Nachisan temple lodging check-in',
            '6:00 PM Buddhist vegetarian dinner',
            '8:00 PM Waterfall meditation experience',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 5',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Morning service participation',
            '7:00 AM Morning yoga (in front of Nachi Falls)',
            '8:00 AM Breakfast',
            '10:00 AM Final Kumano Kodo walking',
            '12:00 PM Lunch',
            '2:00 PM Sharing circle & Experience sharing',
            '4:00 PM Free time',
            '6:00 PM Farewell dinner',
            '8:00 PM Gratitude meditation & Closing',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 6',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Final morning yoga',
            '8:00 AM Breakfast',
            '9:30 AM Check-out & Farewell'
          ]
        }
      ]
    },
    'nikko-temple': {
      title: language === 'ja' ? '日光・東照宮神社ヨガリトリート' : 'Nikko Toshogu Shrine Yoga Retreat',
      location: language === 'ja' ? '栃木・日光' : 'Tochigi, Nikko',
      duration: 4,
      capacity: 12,
      type: 'domestic',
      heroImage: '/shrine-architecture.jpg',
      description: language === 'ja' 
        ? '世界遺産・日光東照宮の神聖な空間でのヨガリトリート。歴史ある神社仏閣と美しい自然に囲まれた4日間の心身浄化プログラムです。'
        : 'A yoga retreat in the sacred space of World Heritage Nikko Toshogu Shrine. A 4-day mind and body purification program surrounded by historic shrines and temples and beautiful nature.',
      includes: language === 'ja' ? [
        '3泊4日の宿泊（温泉ホテル）',
        '全食事（精進料理・地元料理）',
        '毎日のヨガクラス',
        '東照宮・二荒山神社参拝',
        '中禅寺湖・華厳の滝見学',
        '温泉入浴',
        '瞑想・呼吸法指導',
        '専門インストラクター',
        'ヨガマットレンタル'
      ] : [
        '3 nights accommodation (hot spring hotel)',
        'All meals (Buddhist vegetarian & local cuisine)',
        'Daily yoga classes',
        'Toshogu & Futarasan Shrine worship',
        'Lake Chuzenji & Kegon Falls visit',
        'Hot spring bathing',
        'Meditation & breathing instruction',
        'Professional instructor',
        'Yoga mat rental'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '14:00 日光駅到着・ホテルチェックイン',
            '15:00 オリエンテーション・日光の歴史説明',
            '16:00 東照宮参拝・境内散策',
            '18:00 精進料理の夕食',
            '20:00 初回ヨガセッション',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '06:00 起床',
            '06:30 朝ヨガ（ホテル屋上）',
            '08:00 朝食',
            '09:00 二荒山神社参拝',
            '10:30 中禅寺湖へ移動・湖畔散策',
            '12:00 昼食（湖畔レストラン）',
            '14:00 華厳の滝見学・自然瞑想',
            '16:00 ホテル帰着・自由時間',
            '18:00 夕食',
            '20:00 夜ヨガ・キャンドル瞑想',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '06:00 起床',
            '06:30 朝ヨガ（神社境内）',
            '08:00 朝食',
            '10:00 ヨガ哲学講座',
            '12:00 昼食',
            '14:00 いろは坂ハイキング・歩行瞑想',
            '16:00 温泉街散策',
            '18:00 夕食',
            '20:00 リストラティブヨガ',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '4日目',
          activities: [
            '06:00 起床',
            '06:30 最終朝ヨガ',
            '08:00 朝食',
            '10:00 シェアリング・クロージング',
            '11:30 チェックアウト・お見送り'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '2:00 PM Arrival at Nikko Station & Hotel check-in',
            '3:00 PM Orientation & Nikko history explanation',
            '4:00 PM Toshogu Shrine worship & Grounds exploration',
            '6:00 PM Buddhist vegetarian dinner',
            '8:00 PM First yoga session',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Morning yoga (hotel rooftop)',
            '8:00 AM Breakfast',
            '9:00 AM Futarasan Shrine worship',
            '10:30 AM Move to Lake Chuzenji & Lakeside walk',
            '12:00 PM Lunch (lakeside restaurant)',
            '2:00 PM Kegon Falls viewing & Nature meditation',
            '4:00 PM Return to hotel & Free time',
            '6:00 PM Dinner',
            '8:00 PM Evening yoga & Candle meditation',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Morning yoga (shrine grounds)',
            '8:00 AM Breakfast',
            '10:00 AM Yoga philosophy lecture',
            '12:00 PM Lunch',
            '2:00 PM Irohazaka hiking & Walking meditation',
            '4:00 PM Hot spring town exploration',
            '6:00 PM Dinner',
            '8:00 PM Restorative yoga',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 4',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Final morning yoga',
            '8:00 AM Breakfast',
            '10:00 AM Sharing & Closing',
            '11:30 AM Check-out & Farewell'
          ]
        }
      ]
    },
    'hakone-lakeside': {
      title: language === 'ja' ? '箱根・湖畔温泉ヨガリトリート' : 'Hakone Lakeside Hot Spring Yoga Retreat',
      location: language === 'ja' ? '神奈川・箱根' : 'Kanagawa, Hakone',
      duration: 3,
      capacity: 16,
      type: 'domestic',
      heroImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? '芦ノ湖畔の美しい景色を眺めながらのヨガと温泉療法。箱根の自然に包まれた3日間の癒しのリトリートです。'
        : 'Yoga and hot spring therapy while enjoying beautiful views of Lake Ashi. A 3-day healing retreat surrounded by Hakone\'s nature.',
      includes: language === 'ja' ? [
        '2泊3日の宿泊（湖畔温泉ホテル）',
        '全食事（懐石料理）',
        '毎日のヨガクラス',
        '芦ノ湖畔ヨガ',
        '箱根神社参拝',
        '海賊船クルーズ',
        '温泉療法・リラクゼーション',
        '専門インストラクター',
        'ヨガマットレンタル'
      ] : [
        '2 nights accommodation (lakeside hot spring hotel)',
        'All meals (kaiseki cuisine)',
        'Daily yoga classes',
        'Lake Ashi yoga',
        'Hakone Shrine visit',
        'Pirate ship cruise',
        'Hot spring therapy & relaxation',
        'Professional instructor',
        'Yoga mat rental'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '15:00 箱根湯本駅到着・ホテルチェックイン',
            '16:00 オリエンテーション・施設案内',
            '17:00 芦ノ湖畔散策',
            '18:30 懐石料理の夕食',
            '20:00 初回ヨガセッション',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '06:00 起床',
            '06:30 朝ヨガ（芦ノ湖畔）',
            '08:00 朝食',
            '09:30 箱根神社参拝',
            '11:00 海賊船クルーズ',
            '12:30 昼食（湖畔レストラン）',
            '14:00 温泉療法・リラクゼーション',
            '16:00 自由時間',
            '18:30 夕食',
            '20:00 夜ヨガ・瞑想',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '06:00 起床',
            '06:30 最終朝ヨガ（湖畔）',
            '08:00 朝食',
            '10:00 シェアリング・クロージング',
            '11:30 チェックアウト・お見送り'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '3:00 PM Arrival at Hakone-Yumoto Station & Hotel check-in',
            '4:00 PM Orientation & Facility tour',
            '5:00 PM Lake Ashi walk',
            '6:30 PM Kaiseki dinner',
            '8:00 PM First yoga session',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Morning yoga (Lake Ashi)',
            '8:00 AM Breakfast',
            '9:30 AM Hakone Shrine visit',
            '11:00 AM Pirate ship cruise',
            '12:30 PM Lunch (lakeside restaurant)',
            '2:00 PM Hot spring therapy & Relaxation',
            '4:00 PM Free time',
            '6:30 PM Dinner',
            '8:00 PM Evening yoga & Meditation',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Final morning yoga (lakeside)',
            '8:00 AM Breakfast',
            '10:00 AM Sharing & Closing',
            '11:30 AM Check-out & Farewell'
          ]
        }
      ]
    },
    'hokkaido-onsen': {
      title: language === 'ja' ? '北海道・温泉＆雪見ヨガリトリート' : 'Hokkaido Hot Springs & Snow Yoga Retreat',
      location: language === 'ja' ? '北海道・ニセコ' : 'Hokkaido, Niseko',
      duration: 5,
      capacity: 10,
      type: 'domestic',
      heroImage: 'https://images.pexels.com/photos/1271620/pexels-photo-1271620.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? '雪景色の中での特別なヨガ体験と天然温泉。冬の北海道の美しさを堪能しながら、心身を深く癒すリトリートです。'
        : 'Special yoga experience in snowy landscapes and natural hot springs. A retreat that deeply heals mind and body while enjoying the beauty of winter Hokkaido.',
      includes: language === 'ja' ? [
        '4泊5日の宿泊（温泉リゾートホテル）',
        '全食事（北海道の新鮮な食材を使った料理）',
        '毎日のヨガクラス',
        '雪見ヨガ体験',
        '天然温泉入浴',
        'スノーシューハイキング',
        '瞑想・呼吸法指導',
        '専門インストラクター',
        'ヨガマットレンタル'
      ] : [
        '4 nights accommodation (hot spring resort hotel)',
        'All meals (cuisine using fresh Hokkaido ingredients)',
        'Daily yoga classes',
        'Snow viewing yoga experience',
        'Natural hot spring bathing',
        'Snowshoe hiking',
        'Meditation & breathing instruction',
        'Professional instructor',
        'Yoga mat rental'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '14:00 ホテル到着・チェックイン',
            '15:00 オリエンテーション',
            '16:00 雪景色散策',
            '18:00 夕食（北海道料理）',
            '20:00 初回ヨガセッション',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '06:00 起床',
            '06:30 雪見ヨガ（屋外）',
            '08:00 朝食',
            '10:00 スノーシューハイキング',
            '12:00 昼食（山小屋）',
            '14:00 温泉入浴・リラクゼーション',
            '16:00 自由時間',
            '18:00 夕食',
            '20:00 夜ヨガ・瞑想',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '06:00 起床',
            '06:30 朝ヨガ（雪景色）',
            '08:00 朝食',
            '10:00 ヨガ哲学講座',
            '12:00 昼食',
            '14:00 雪中散策・自然瞑想',
            '16:00 温泉入浴',
            '18:00 夕食',
            '20:00 キャンドルヨガ',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '4日目',
          activities: [
            '06:00 起床',
            '06:30 朝ヨガ',
            '08:00 朝食',
            '10:00 統合ヨガセッション',
            '12:00 昼食',
            '14:00 自由時間・個人瞑想',
            '16:00 温泉入浴',
            '18:00 夕食',
            '20:00 リストラティブヨガ',
            '21:30 温泉入浴・就寝'
          ]
        },
        {
          day: '5日目',
          activities: [
            '06:00 起床',
            '06:30 最終雪見ヨガ',
            '08:00 朝食',
            '10:00 シェアリング・クロージング',
            '11:30 チェックアウト・お見送り'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '2:00 PM Hotel arrival & Check-in',
            '3:00 PM Orientation',
            '4:00 PM Snow landscape walk',
            '6:00 PM Dinner (Hokkaido cuisine)',
            '8:00 PM First yoga session',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Snow viewing yoga (outdoor)',
            '8:00 AM Breakfast',
            '10:00 AM Snowshoe hiking',
            '12:00 PM Lunch (mountain hut)',
            '2:00 PM Hot spring bath & Relaxation',
            '4:00 PM Free time',
            '6:00 PM Dinner',
            '8:00 PM Evening yoga & Meditation',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Morning yoga (snow landscape)',
            '8:00 AM Breakfast',
            '10:00 AM Yoga philosophy lecture',
            '12:00 PM Lunch',
            '2:00 PM Snow walk & Nature meditation',
            '4:00 PM Hot spring bath',
            '6:00 PM Dinner',
            '8:00 PM Candle yoga',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 4',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Morning yoga',
            '8:00 AM Breakfast',
            '10:00 AM Integrated yoga session',
            '12:00 PM Lunch',
            '2:00 PM Free time & Personal meditation',
            '4:00 PM Hot spring bath',
            '6:00 PM Dinner',
            '8:00 PM Restorative yoga',
            '9:30 PM Hot spring bath & Rest'
          ]
        },
        {
          day: 'Day 5',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Final snow viewing yoga',
            '8:00 AM Breakfast',
            '10:00 AM Sharing & Closing',
            '11:30 AM Check-out & Farewell'
          ]
        }
      ]
    },
    'ise-shrine': {
      title: language === 'ja' ? '伊勢神宮・神道瞑想リトリート' : 'Ise Grand Shrine Shinto Meditation Retreat',
      location: language === 'ja' ? '三重・伊勢' : 'Mie, Ise',
      duration: 5,
      capacity: 8,
      type: 'domestic',
      heroImage: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? '日本の心のふるさと・伊勢神宮での神道瞑想とヨガ。神聖な空間で日本古来の精神性に触れる5日間の特別なリトリートです。'
        : 'Shinto meditation and yoga at Ise Grand Shrine, the spiritual home of Japan. A special 5-day retreat to experience ancient Japanese spirituality in sacred space.',
      includes: language === 'ja' ? [
        '4泊5日の宿泊（伊勢市内宿泊施設）',
        '全食事（精進料理・伊勢の郷土料理）',
        '毎日のヨガクラス',
        '内宮・外宮参拝',
        '五十鈴川での禊体験',
        '神道瞑想指導',
        '神職による講話',
        '別宮参拝',
        '専門インストラクター',
        'ヨガマットレンタル'
      ] : [
        '4 nights accommodation (Ise city lodging)',
        'All meals (Buddhist vegetarian & Ise local cuisine)',
        'Daily yoga classes',
        'Inner & Outer Shrine worship',
        'Purification ritual at Isuzu River',
        'Shinto meditation instruction',
        'Lecture by Shinto priest',
        'Auxiliary shrine visits',
        'Professional instructor',
        'Yoga mat rental'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '14:00 伊勢市駅到着・宿泊施設チェックイン',
            '15:00 オリエンテーション・伊勢神宮について',
            '16:00 外宮（豊受大神宮）参拝',
            '18:00 精進料理の夕食',
            '20:00 初回ヨガセッション・神道瞑想入門',
            '21:30 就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '05:30 起床',
            '06:00 朝ヨガ（宿泊施設庭園）',
            '07:30 朝食',
            '08:30 内宮（皇大神宮）早朝参拝',
            '10:00 おかげ横丁散策',
            '12:00 昼食（伊勢うどん）',
            '14:00 五十鈴川での禊体験',
            '16:00 神道瞑想・自然との調和',
            '18:00 夕食',
            '20:00 夜ヨガ・感謝の瞑想',
            '21:30 就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '05:30 起床',
            '06:00 朝ヨガ（五十鈴川畔）',
            '07:30 朝食',
            '09:00 神職による神道講話',
            '11:00 別宮参拝（月夜見宮・月読宮）',
            '12:30 昼食',
            '14:00 伊勢湾散策・海辺瞑想',
            '16:00 自由時間・個人瞑想',
            '18:00 夕食',
            '20:00 ヨガ・呼吸法',
            '21:30 就寝'
          ]
        },
        {
          day: '4日目',
          activities: [
            '05:30 起床',
            '06:00 朝ヨガ',
            '07:30 朝食',
            '09:00 猿田彦神社参拝',
            '10:30 二見興玉神社・夫婦岩参拝',
            '12:00 昼食（海鮮料理）',
            '14:00 海辺でのヨガ・瞑想',
            '16:00 宿泊施設帰着・自由時間',
            '18:00 夕食',
            '20:00 統合ヨガセッション',
            '21:30 就寝'
          ]
        },
        {
          day: '5日目',
          activities: [
            '05:30 起床',
            '06:00 最終朝ヨガ・感謝の瞑想',
            '07:30 朝食',
            '09:00 最終内宮参拝',
            '10:30 シェアリング・クロージング',
            '12:00 チェックアウト・お見送り'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '2:00 PM Arrival at Ise-shi Station & Accommodation check-in',
            '3:00 PM Orientation & About Ise Grand Shrine',
            '4:00 PM Outer Shrine (Toyouke Daijingu) worship',
            '6:00 PM Buddhist vegetarian dinner',
            '8:00 PM First yoga session & Shinto meditation introduction',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Morning yoga (accommodation garden)',
            '7:30 AM Breakfast',
            '8:30 AM Inner Shrine (Kotaijingu) early morning worship',
            '10:00 AM Okage Yokocho exploration',
            '12:00 PM Lunch (Ise udon)',
            '2:00 PM Purification ritual at Isuzu River',
            '4:00 PM Shinto meditation & Harmony with nature',
            '6:00 PM Dinner',
            '8:00 PM Evening yoga & Gratitude meditation',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Morning yoga (Isuzu River)',
            '7:30 AM Breakfast',
            '9:00 AM Shinto lecture by priest',
            '11:00 AM Auxiliary shrine visits (Tsukiyomi-no-miya & Tsukiyomi-no-miya)',
            '12:30 PM Lunch',
            '2:00 PM Ise Bay walk & Seaside meditation',
            '4:00 PM Free time & Personal meditation',
            '6:00 PM Dinner',
            '8:00 PM Yoga & Breathing techniques',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 4',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Morning yoga',
            '7:30 AM Breakfast',
            '9:00 AM Sarutahiko Shrine worship',
            '10:30 AM Futami Okitama Shrine & Meoto Iwa worship',
            '12:00 PM Lunch (seafood cuisine)',
            '2:00 PM Seaside yoga & Meditation',
            '4:00 PM Return to accommodation & Free time',
            '6:00 PM Dinner',
            '8:00 PM Integrated yoga session',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 5',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Final morning yoga & Gratitude meditation',
            '7:30 AM Breakfast',
            '9:00 AM Final Inner Shrine worship',
            '10:30 AM Sharing & Closing',
            '12:00 PM Check-out & Farewell'
          ]
        }
      ]
    },
    'takayama-village': {
      title: language === 'ja' ? '飛騨高山・古民家ヨガリトリート' : 'Hida Takayama Folk House Yoga Retreat',
      location: language === 'ja' ? '岐阜・飛騨高山' : 'Gifu, Hida Takayama',
      duration: 4,
      capacity: 8,
      type: 'domestic',
      heroImage: 'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? '江戸時代の古民家で過ごす特別なヨガリトリート。飛騨高山の伝統文化と美しい自然に囲まれた4日間の心身回復プログラムです。'
        : 'A special yoga retreat in an Edo period folk house. A 4-day mind and body recovery program surrounded by Hida Takayama\'s traditional culture and beautiful nature.',
      includes: language === 'ja' ? [
        '3泊4日の宿泊（古民家宿）',
        '全食事（郷土料理・飛騨牛）',
        '毎日のヨガクラス',
        '白川郷見学・合掌造り体験',
        '飛騨の里民俗体験',
        'さるぼぼ作り体験',
        '高山陣屋見学',
        '温泉入浴',
        '専門インストラクター',
        'ヨガマットレンタル'
      ] : [
        '3 nights accommodation (folk house lodging)',
        'All meals (local cuisine & Hida beef)',
        'Daily yoga classes',
        'Shirakawa-go visit & Gassho-zukuri experience',
        'Hida Folk Village experience',
        'Sarubobo doll making experience',
        'Takayama Jinya visit',
        'Hot spring bathing',
        'Professional instructor',
        'Yoga mat rental'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '14:00 高山駅到着・古民家宿チェックイン',
            '15:00 オリエンテーション・古民家見学',
            '16:00 飛騨高山古い町並み散策',
            '18:00 飛騨牛の夕食',
            '20:00 初回ヨガセッション（古民家内）',
            '21:30 就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '06:00 起床',
            '06:30 朝ヨガ（古民家庭園）',
            '08:00 朝食（郷土料理）',
            '09:30 白川郷見学・合掌造り体験',
            '12:00 昼食（白川郷）',
            '15:00 高山帰着・温泉入浴',
            '17:00 自由時間',
            '18:30 夕食',
            '20:00 夜ヨガ・囲炉裏瞑想',
            '21:30 就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '06:00 起床',
            '06:30 朝ヨガ（屋外）',
            '08:00 朝食',
            '10:00 飛騨の里見学・民俗体験',
            '12:00 昼食',
            '14:00 さるぼぼ作り体験',
            '16:00 高山陣屋見学',
            '18:00 夕食',
            '20:00 リストラティブヨガ',
            '21:30 就寝'
          ]
        },
        {
          day: '4日目',
          activities: [
            '06:00 起床',
            '06:30 最終朝ヨガ（古民家）',
            '08:00 朝食',
            '10:00 シェアリング・クロージング',
            '11:30 チェックアウト・お見送り'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '2:00 PM Arrival at Takayama Station & Folk house check-in',
            '3:00 PM Orientation & Folk house tour',
            '4:00 PM Hida Takayama old town exploration',
            '6:00 PM Hida beef dinner',
            '8:00 PM First yoga session (inside folk house)',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Morning yoga (folk house garden)',
            '8:00 AM Breakfast (local cuisine)',
            '9:30 AM Shirakawa-go visit & Gassho-zukuri experience',
            '12:00 PM Lunch (Shirakawa-go)',
            '3:00 PM Return to Takayama & Hot spring bath',
            '5:00 PM Free time',
            '6:30 PM Dinner',
            '8:00 PM Evening yoga & Hearth meditation',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Morning yoga (outdoor)',
            '8:00 AM Breakfast',
            '10:00 AM Hida Folk Village visit & Folk experience',
            '12:00 PM Lunch',
            '2:00 PM Sarubobo doll making experience',
            '4:00 PM Takayama Jinya visit',
            '6:00 PM Dinner',
            '8:00 PM Restorative yoga',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 4',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Final morning yoga (folk house)',
            '8:00 AM Breakfast',
            '10:00 AM Sharing & Closing',
            '11:30 AM Check-out & Farewell'
          ]
        }
      ]
    },
    'okinawa-beach': {
      title: language === 'ja' ? '沖縄・ビーチヨガ＆島時間リトリート' : 'Okinawa Beach Yoga & Island Time Retreat',
      location: language === 'ja' ? '沖縄・石垣島' : 'Okinawa, Ishigaki Island',
      duration: 7,
      capacity: 15,
      type: 'domestic',
      heroImage: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? 'エメラルドブルーの海でのビーチヨガ。沖縄の「島時間」でゆったりと過ごす7日間のリトリートです。'
        : 'Beach yoga in emerald blue seas. A 7-day retreat to relax in Okinawan "island time".',
      includes: language === 'ja' ? [
        '6泊7日の宿泊（ビーチリゾートホテル）',
        '全食事（沖縄料理）',
        '毎日のヨガクラス',
        'ビーチヨガ体験',
        'シュノーケリング',
        '島内観光',
        '瞑想・呼吸法指導',
        '専門インストラクター'
      ] : [
        '6 nights accommodation (beach resort hotel)',
        'All meals (Okinawan cuisine)',
        'Daily yoga classes',
        'Beach yoga experience',
        'Snorkeling',
        'Island sightseeing',
        'Meditation & breathing instruction',
        'Professional instructor'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '15:00 ホテル到着・チェックイン',
            '16:00 オリエンテーション',
            '17:00 ビーチ散策',
            '18:30 夕食（沖縄料理）',
            '20:00 初回ヨガセッション',
            '21:30 就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '05:30 起床',
            '06:00 サンライズビーチヨガ',
            '08:00 朝食',
            '10:00 シュノーケリング体験',
            '12:00 昼食',
            '14:00 島内観光（竹富島）',
            '18:00 夕食',
            '20:00 夜ヨガ・瞑想',
            '21:30 就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '05:30 起床',
            '06:00 ビーチヨガ',
            '08:00 朝食',
            '10:00 マリンスポーツ体験',
            '12:00 昼食',
            '14:00 自由時間・ビーチタイム',
            '16:00 呼吸法ワークショップ',
            '18:00 夕食',
            '20:00 キャンドル瞑想',
            '21:30 就寝'
          ]
        },
        {
          day: '4日目',
          activities: [
            '05:30 起床',
            '06:00 サンライズヨガ',
            '08:00 朝食',
            '10:00 西表島観光',
            '12:00 昼食（西表島）',
            '15:00 マングローブカヤック',
            '18:00 夕食',
            '20:00 夜ヨガ',
            '21:30 就寝'
          ]
        },
        {
          day: '5日目',
          activities: [
            '05:30 起床',
            '06:00 ビーチヨガ',
            '08:00 朝食',
            '10:00 ヨガ哲学講座',
            '12:00 昼食',
            '14:00 沖縄文化体験（三線・踊り）',
            '16:00 自由時間',
            '18:00 夕食',
            '20:00 リストラティブヨガ',
            '21:30 就寝'
          ]
        },
        {
          day: '6日目',
          activities: [
            '05:30 起床',
            '06:00 サンライズヨガ',
            '08:00 朝食',
            '10:00 統合ヨガセッション',
            '12:00 昼食',
            '14:00 お土産購入・自由時間',
            '18:00 お別れディナー',
            '20:00 感謝の瞑想・クロージング',
            '21:30 就寝'
          ]
        },
        {
          day: '7日目',
          activities: [
            '06:00 起床',
            '06:30 最終ビーチヨガ',
            '08:00 朝食',
            '10:00 シェアリング・お見送り',
            '12:00 チェックアウト'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '3:00 PM Hotel arrival & Check-in',
            '4:00 PM Orientation',
            '5:00 PM Beach walk',
            '6:30 PM Dinner (Okinawan cuisine)',
            '8:00 PM First yoga session',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Sunrise beach yoga',
            '8:00 AM Breakfast',
            '10:00 AM Snorkeling experience',
            '12:00 PM Lunch',
            '2:00 PM Island tour (Taketomi Island)',
            '6:00 PM Dinner',
            '8:00 PM Evening yoga & Meditation',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Beach yoga',
            '8:00 AM Breakfast',
            '10:00 AM Marine sports experience',
            '12:00 PM Lunch',
            '2:00 PM Free time & Beach time',
            '4:00 PM Breathing workshop',
            '6:00 PM Dinner',
            '8:00 PM Candle meditation',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 4',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Sunrise yoga',
            '8:00 AM Breakfast',
            '10:00 AM Iriomote Island tour',
            '12:00 PM Lunch (Iriomote Island)',
            '3:00 PM Mangrove kayaking',
            '6:00 PM Dinner',
            '8:00 PM Evening yoga',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 5',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Beach yoga',
            '8:00 AM Breakfast',
            '10:00 AM Yoga philosophy lecture',
            '12:00 PM Lunch',
            '2:00 PM Okinawan culture experience (Sanshin & Dance)',
            '4:00 PM Free time',
            '6:00 PM Dinner',
            '8:00 PM Restorative yoga',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 6',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Sunrise yoga',
            '8:00 AM Breakfast',
            '10:00 AM Integrated yoga session',
            '12:00 PM Lunch',
            '2:00 PM Souvenir shopping & Free time',
            '6:00 PM Farewell dinner',
            '8:00 PM Gratitude meditation & Closing',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 7',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Final beach yoga',
            '8:00 AM Breakfast',
            '10:00 AM Sharing & Farewell',
            '12:00 PM Check-out'
          ]
        }
      ]
    },
    'yoshino-sakura': {
      title: language === 'ja' ? '吉野・桜の山ヨガリトリート' : 'Yoshino Cherry Blossom Mountain Yoga Retreat',
      location: language === 'ja' ? '奈良・吉野山' : 'Nara, Mount Yoshino',
      duration: 3,
      capacity: 12,
      type: 'domestic',
      heroImage: '/image copy copy copy.png',
      description: language === 'ja' 
        ? '日本一の桜の名所・吉野山での特別なヨガリトリート。3万本の桜に囲まれた3日間の心身浄化プログラムです。'
        : 'A special yoga retreat at Mount Yoshino, Japan\'s most famous cherry blossom spot. A 3-day mind and body purification program surrounded by 30,000 cherry trees.',
      includes: language === 'ja' ? [
        '2泊3日の宿泊（宿坊）',
        '全食事（精進料理）',
        '毎日のヨガクラス',
        '桜の下でのヨガ体験',
        '金峯山寺参拝',
        '如意輪寺参拝',
        '吉野山散策',
        '桜瞑想体験',
        '専門インストラクター',
        'ヨガマットレンタル'
      ] : [
        '2 nights accommodation (temple lodging)',
        'All meals (Buddhist vegetarian cuisine)',
        'Daily yoga classes',
        'Yoga under cherry blossoms',
        'Kinpusen-ji Temple worship',
        'Nyoirin-ji Temple worship',
        'Mount Yoshino exploration',
        'Cherry blossom meditation',
        'Professional instructor',
        'Yoga mat rental'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '15:00 吉野駅到着・宿坊チェックイン',
            '16:00 オリエンテーション・吉野山について',
            '17:00 金峯山寺参拝・蔵王堂見学',
            '18:30 精進料理の夕食',
            '20:00 初回ヨガセッション',
            '21:30 就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '05:30 起床',
            '06:00 朝ヨガ（桜の下）',
            '07:30 朝食',
            '09:00 吉野山散策・下千本～中千本',
            '11:00 桜の下での瞑想',
            '12:00 昼食（山上レストラン）',
            '14:00 上千本～奥千本散策',
            '16:00 宿坊帰着・自由時間',
            '18:00 夕食',
            '20:00 夜ヨガ・桜瞑想',
            '21:30 就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '05:30 起床',
            '06:00 最終朝ヨガ（桜の絶景ポイント）',
            '07:30 朝食',
            '09:00 如意輪寺参拝',
            '10:30 シェアリング・クロージング',
            '12:00 チェックアウト・お見送り'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '3:00 PM Arrival at Yoshino Station & Temple lodging check-in',
            '4:00 PM Orientation & About Mount Yoshino',
            '5:00 PM Kinpusen-ji Temple worship & Zao-do Hall visit',
            '6:30 PM Buddhist vegetarian dinner',
            '8:00 PM First yoga session',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Morning yoga (under cherry blossoms)',
            '7:30 AM Breakfast',
            '9:00 AM Mount Yoshino exploration (Shimo-senbon to Naka-senbon)',
            '11:00 AM Meditation under cherry blossoms',
            '12:00 PM Lunch (mountain restaurant)',
            '2:00 PM Kami-senbon to Oku-senbon exploration',
            '4:00 PM Return to temple lodging & Free time',
            '6:00 PM Dinner',
            '8:00 PM Evening yoga & Cherry blossom meditation',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Final morning yoga (cherry blossom scenic point)',
            '7:30 AM Breakfast',
            '9:00 AM Nyoirin-ji Temple worship',
            '10:30 AM Sharing & Closing',
            '12:00 PM Check-out & Farewell'
          ]
        }
      ]
    },
    'cebu-mountain': {
      title: language === 'ja' ? 'セブ島・マウンテンリトリート＆スパ' : 'Cebu Island Mountain Retreat & Spa',
      location: language === 'ja' ? 'フィリピン・セブ島内陸部' : 'Philippines, Cebu Island Highlands',
      duration: 7,
      capacity: 14,
      type: 'international',
      heroImage: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: language === 'ja' 
        ? 'セブ島の山間部での自然セラピー。フィリピン伝統のヒーリングとヨガの融合を体験する7日間のリトリートです。'
        : 'Nature therapy in Cebu\'s mountainous regions. A 7-day retreat experiencing the fusion of traditional Filipino healing and yoga.',
      includes: language === 'ja' ? [
        '6泊7日の宿泊（マウンテンリゾート）',
        '全食事（オーガニック料理）',
        '毎日のヨガクラス',
        'フィリピン伝統マッサージ',
        '自然散策',
        'スパトリートメント',
        '瞑想・呼吸法指導',
        '専門インストラクター'
      ] : [
        '6 nights accommodation (mountain resort)',
        'All meals (organic cuisine)',
        'Daily yoga classes',
        'Traditional Filipino massage',
        'Nature walks',
        'Spa treatments',
        'Meditation & breathing instruction',
        'Professional instructor'
      ],
      schedule: language === 'ja' ? [
        {
          day: '1日目',
          activities: [
            '15:00 リゾート到着・チェックイン',
            '16:00 オリエンテーション',
            '17:00 自然散策',
            '18:30 夕食（オーガニック料理）',
            '20:00 初回ヨガセッション',
            '21:30 就寝'
          ]
        },
        {
          day: '2日目',
          activities: [
            '05:30 起床',
            '06:00 マウンテンヨガ',
            '08:00 朝食',
            '10:00 フィリピン伝統マッサージ',
            '12:00 昼食',
            '14:00 自然散策・ハイキング',
            '16:00 自由時間',
            '18:00 夕食',
            '20:00 夜ヨガ・瞑想',
            '21:30 就寝'
          ]
        },
        {
          day: '3日目',
          activities: [
            '05:30 起床',
            '06:00 サンライズヨガ',
            '08:00 朝食',
            '10:00 スパトリートメント',
            '12:00 昼食',
            '14:00 滝見学・自然瞑想',
            '16:00 呼吸法ワークショップ',
            '18:00 夕食',
            '20:00 キャンドルヨガ',
            '21:30 就寝'
          ]
        },
        {
          day: '4日目',
          activities: [
            '05:30 起床',
            '06:00 朝ヨガ',
            '08:00 朝食',
            '10:00 地元村落訪問・文化体験',
            '12:00 昼食（村落）',
            '15:00 リゾート帰着・自由時間',
            '18:00 夕食',
            '20:00 夜ヨガ',
            '21:30 就寝'
          ]
        },
        {
          day: '5日目',
          activities: [
            '05:30 起床',
            '06:00 マウンテンヨガ',
            '08:00 朝食',
            '10:00 ヨガ哲学講座',
            '12:00 昼食',
            '14:00 アーユルヴェーダトリートメント',
            '16:00 自由時間・個人瞑想',
            '18:00 夕食',
            '20:00 リストラティブヨガ',
            '21:30 就寝'
          ]
        },
        {
          day: '6日目',
          activities: [
            '05:30 起床',
            '06:00 サンライズヨガ',
            '08:00 朝食',
            '10:00 統合ヨガセッション',
            '12:00 昼食',
            '14:00 自由時間・お土産購入',
            '18:00 お別れディナー',
            '20:00 感謝の瞑想・クロージング',
            '21:30 就寝'
          ]
        },
        {
          day: '7日目',
          activities: [
            '06:00 起床',
            '06:30 最終朝ヨガ',
            '08:00 朝食',
            '10:00 シェアリング・お見送り',
            '12:00 チェックアウト'
          ]
        }
      ] : [
        {
          day: 'Day 1',
          activities: [
            '3:00 PM Resort arrival & Check-in',
            '4:00 PM Orientation',
            '5:00 PM Nature walk',
            '6:30 PM Dinner (organic cuisine)',
            '8:00 PM First yoga session',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 2',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Mountain yoga',
            '8:00 AM Breakfast',
            '10:00 AM Traditional Filipino massage',
            '12:00 PM Lunch',
            '2:00 PM Nature walk & Hiking',
            '4:00 PM Free time',
            '6:00 PM Dinner',
            '8:00 PM Evening yoga & Meditation',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 3',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Sunrise yoga',
            '8:00 AM Breakfast',
            '10:00 AM Spa treatment',
            '12:00 PM Lunch',
            '2:00 PM Waterfall visit & Nature meditation',
            '4:00 PM Breathing workshop',
            '6:00 PM Dinner',
            '8:00 PM Candle yoga',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 4',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Morning yoga',
            '8:00 AM Breakfast',
            '10:00 AM Local village visit & Cultural experience',
            '12:00 PM Lunch (village)',
            '3:00 PM Return to resort & Free time',
            '6:00 PM Dinner',
            '8:00 PM Evening yoga',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 5',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Mountain yoga',
            '8:00 AM Breakfast',
            '10:00 AM Yoga philosophy lecture',
            '12:00 PM Lunch',
            '2:00 PM Ayurvedic treatment',
            '4:00 PM Free time & Personal meditation',
            '6:00 PM Dinner',
            '8:00 PM Restorative yoga',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 6',
          activities: [
            '5:30 AM Wake up',
            '6:00 AM Sunrise yoga',
            '8:00 AM Breakfast',
            '10:00 AM Integrated yoga session',
            '12:00 PM Lunch',
            '2:00 PM Free time & Souvenir shopping',
            '6:00 PM Farewell dinner',
            '8:00 PM Gratitude meditation & Closing',
            '9:30 PM Rest'
          ]
        },
        {
          day: 'Day 7',
          activities: [
            '6:00 AM Wake up',
            '6:30 AM Final morning yoga',
            '8:00 AM Breakfast',
            '10:00 AM Sharing & Farewell',
            '12:00 PM Check-out'
          ]
        }
      ]
    }
  };

  const retreat = allRetreatData[id as keyof typeof allRetreatData];

  if (!retreat) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-800 mb-4">
            {language === 'ja' ? 'リトリートが見つかりません' : 'Retreat not found'}
          </h1>
          <Link
            to={`${baseUrl}/retreats`}
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700"
          >
            <ArrowLeft size={16} />
            <span>{language === 'ja' ? '一覧に戻る' : 'Back to list'}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 overflow-hidden">
        <img
          src={retreat.heroImage}
          alt={retreat.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <Link
            to={`${baseUrl}/retreats`}
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-4 transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>{language === 'ja' ? '一覧に戻る' : 'Back to list'}</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-light mb-2">{retreat.title}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>{retreat.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{retreat.duration}{language === 'ja' ? '日間' : ' days'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={14} />
              <span>{language === 'ja' ? '定員' : 'Max'} {retreat.capacity}{language === 'ja' ? '名' : ' participants'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>{language === 'ja' ? 'リトリート概要' : 'Retreat Overview'}</span>
                </h2>
                <p className="text-gray-600 leading-relaxed">{retreat.description}</p>
              </div>

              {/* Includes */}
              <div>
                <h2 className="text-2xl font-medium text-gray-800 mb-4 flex items-center space-x-2">
                  <CheckCircle size={20} />
                  <span>{language === 'ja' ? '含まれるもの' : 'What\'s Included'}</span>
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {retreat.includes.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule */}
              <div>
                <h2 className="text-2xl font-medium text-gray-800 mb-6 flex items-center space-x-2">
                  <Clock size={20} />
                  <span>{language === 'ja' ? 'スケジュール' : 'Daily Schedule'}</span>
                </h2>
                <div className="space-y-6">
                  {retreat.schedule.map((day, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">{day.day}</h3>
                      <ul className="space-y-2">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="text-gray-600 text-sm">
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h3 className="text-xl font-medium text-gray-800 mb-4">
                  {language === 'ja' ? 'お申し込み' : 'Book This Retreat'}
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ja' ? '期間' : 'Duration'}:</span>
                    <span className="font-medium">{retreat.duration}{language === 'ja' ? '日間' : ' days'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ja' ? '定員' : 'Capacity'}:</span>
                    <span className="font-medium">{retreat.capacity}{language === 'ja' ? '名' : ' people'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ja' ? 'タイプ' : 'Type'}:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      retreat.type === 'domestic' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {retreat.type === 'domestic' 
                        ? (language === 'ja' ? '国内' : 'Domestic')
                        : (language === 'ja' ? '海外' : 'International')
                      }
                    </span>
                  </div>
                </div>
                <Link
                  to={`${baseUrl}/contact`}
                  className="block w-full text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  {language === 'ja' ? 'お問い合わせ・お申し込み' : 'Contact & Book Now'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RetreatDetail;