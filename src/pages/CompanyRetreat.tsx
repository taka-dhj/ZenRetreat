import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, Lightbulb, Shield, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import ContactFormModal from '../components/ContactFormModal';

// ============================================================
// 📸 PHOTO CONFIGURATION
// 写真の差し替えはここを編集するだけでOKです。
// public/ フォルダに画像を配置し、ファイル名を変更してください。
// ============================================================
const PHOTOS = {
  // ヒーロー背景画像
  hero: '/company-retreat/hero.jpg',

  // 「選ばれる理由」セクション
  reason1: '/company-retreat/reason1.jpg',    // セブ現地の深い知見（ヨガスタジオ）
  reason2: '/company-retreat/gallery2.jpg',   // 多様な要望に応える設計力（ヨガクラス屋外）
  reason3: '/company-retreat/gallery1.jpg',   // 安心感のある現地サポート（NGO子どもたち）

  // プラン紹介セクション
  plan1: '/company-retreat/plan-refresh.jpg', // 心と身体のリフレッシュプラン
  plan2: '/company-retreat/plan-strategy.jpg',// 経営合宿・戦略プラン
  plan3: '/company-retreat/plan-award.jpg',   // 表彰旅行プラン

  // 現地サポート体制セクション
  support: '/company-retreat/support.jpg',

  // 取締役プロフィール写真
  director: '/company-retreat/director.jpg',

  // ギャラリー（最大6枚）
  gallery: [
    '/company-retreat/gallery5.jpg',   // 瞑想クラス（竹の建物）→ メイン大画像
    '/company-retreat/gallery3.jpg',   // ボウル瞑想（夜景）
    '/company-retreat/reason2.jpg',    // 農園・夕日
    '/company-retreat/gallery6.jpg',   // グループ集合写真
    '/company-retreat/gallery4.jpg',   // 子どもたち学習（NGO）
    '/company-retreat/gallery1.jpg',   // 子どもたち（NGO活動）
  ],
};

// フォールバック画像（写真未設定の場合に使用するPexels画像）
const FALLBACK = {
  hero:     'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1600',
  reason1:  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
  reason2:  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
  reason3:  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
  plan1:    'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800',
  plan2:    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
  plan3:    'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=800',
  support:  'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
  director: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  gallery: [
    'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3225522/pexels-photo-3225522.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
};

/** ローカル画像が存在しない場合にフォールバックする */
function imgSrc(local: string, fallback: string): string {
  // ビルド時に存在する画像はそのまま使用。
  // 開発・本番ともにローカルパスを優先し、404の場合はフォールバックをonErrorで設定
  return local || fallback;
}

// ============================================================
const CompanyRetreat: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const faqs = [
    {
      q: '何名から対応していただけますか？',
      a: '5名様から対応しております。少人数の役員合宿から、大規模な社員旅行まで柔軟にご対応いたします。',
    },
    {
      q: 'プログラムのカスタマイズは可能ですか？',
      a: 'はい、可能です。社員旅行・経営合宿・表彰旅行・チームビルディングなど、目的に応じてプログラムを設計いたします。事前のヒアリングで御社のニーズを丁寧に伺います。',
    },
    {
      q: '予算の目安を教えてください。',
      a: '規模や内容によって異なります。まずはお気軽にお問い合わせください。ご予算に合わせた最適なプランをご提案いたします。',
    },
    {
      q: 'セブへの渡航手続きのサポートはありますか？',
      a: 'フライト手配・ビザ・保険など、渡航に関するご相談にも対応しております。現地スタッフとの連携で、スムーズな渡航をサポートします。',
    },
    {
      q: '緊急時の対応はどうなっていますか？',
      a: '現地スタッフによる24時間サポート体制を整備しています。緊急時の医療機関への案内や、帰国サポートなど、安心できる体制を構築しています。',
    },
    {
      q: '日本語での対応は可能ですか？',
      a: 'はい。取締役が日本語・英語に対応しており、日本からの企業様も安心してご参加いただけます。',
    },
  ];

  const plans = [
    {
      icon: '🏝️',
      title: '心と身体のリフレッシュ',
      subtitle: 'Wellness Retreat',
      desc: 'ヨガ、瞑想、ビーチアクティビティで日常のストレスを解放。チームが共にリフレッシュし、前向きなエネルギーを取り戻します。',
      tags: ['ヨガ・瞑想', 'ビーチアクティビティ', 'ウェルネス'],
      img: PHOTOS.plan1,
      fallback: FALLBACK.plan1,
    },
    {
      icon: '💡',
      title: '経営合宿・戦略立案',
      subtitle: 'Strategy Retreat',
      desc: '非日常の環境で行う経営会議・ワークショップ。日常業務から離れることで、中長期の戦略立案や組織課題の議論が深まります。',
      tags: ['経営会議', 'ワークショップ', '戦略立案'],
      img: PHOTOS.plan2,
      fallback: FALLBACK.plan2,
    },
    {
      icon: '🏆',
      title: '表彰旅行・チームビルディング',
      subtitle: 'Award Trip',
      desc: '優秀な社員への感謝と称賛を込めた表彰旅行。特別な体験を通じてモチベーションと組織への帰属意識を高めます。',
      tags: ['表彰旅行', 'チームビルディング', 'モチベーション向上'],
      img: PHOTOS.plan3,
      fallback: FALLBACK.plan3,
    },
  ];

  const reasons = [
    {
      icon: <MapPin size={28} className="text-blue-600" />,
      title: 'セブ現地への深い知見',
      desc: '取締役が8年間セブに在住し、現地NGO活動を通じて培った知見。観光地だけでなく、地域の実情まで理解した提案が可能です。',
      img: PHOTOS.reason1,
      fallback: FALLBACK.reason1,
      bg: 'bg-blue-50',
    },
    {
      icon: <Lightbulb size={28} className="text-amber-600" />,
      title: '多様な要望に応える設計力',
      desc: '社員旅行、経営合宿、表彰旅行、チームビルディングなど、目的に応じてカスタマイズされたプログラムを設計。安全性・快適性・学びを両立させます。',
      img: PHOTOS.reason2,
      fallback: FALLBACK.reason2,
      bg: 'bg-amber-50',
    },
    {
      icon: <Shield size={28} className="text-green-600" />,
      title: '安心感のある現地サポート',
      desc: '現地スタッフとの連携により、緊急時対応から日常的なサポートまで、安心できるリトリート環境を実現します。',
      img: PHOTOS.reason3,
      fallback: FALLBACK.reason3,
      bg: 'bg-green-50',
    },
  ];

  return (
    <div className="pt-16 min-h-screen">

      {/* ======== HERO ======== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${imgSrc(PHOTOS.hero, FALLBACK.hero)}')` }}
          onError={(e) => {
            (e.currentTarget as HTMLDivElement).style.backgroundImage = `url('${FALLBACK.hero}')`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
        {/* Top accent line – blue for corporate */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto w-full">
          {/* Brand badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white/90 px-5 py-2.5 rounded-full text-sm font-light tracking-wider mb-8">
            <span className="text-blue-300 font-medium">ZEN RETREAT ASIA</span>
            <span className="text-white/40">×</span>
            <span className="text-blue-200 font-medium">Cebu Retreat</span>
          </div>

          <p className="text-white/80 text-base font-light tracking-[0.15em] mb-4">
            日常を離れ、セブで
          </p>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
            チームのパフォーマンスを<br />
            <span className="text-blue-300">解き放つ</span>
          </h1>

          <p className="text-white/70 text-xl font-light mb-10">
            心と身体をリフレッシュし、新たな視点を得る海外リトリート
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['社員旅行', '経営合宿', '表彰旅行', 'チームビルディング'].map((tag, i) => (
              <span
                key={i}
                className="bg-white/15 backdrop-blur-sm border border-white/30 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 active:from-green-700 active:to-blue-700 text-white font-bold py-5 px-10 rounded-2xl text-xl shadow-2xl transition-all duration-300 hover:shadow-green-500/40"
            >
              無料相談・お問い合わせ ↓
            </button>
            <a
              href="#reasons"
              className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 border border-white/40 text-white font-medium py-4 px-8 rounded-2xl text-lg backdrop-blur-sm transition-all duration-300"
            >
              詳細を見る
            </a>
          </div>

          {/* Stats */}
          <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 w-full max-w-lg mx-auto">
            <div className="flex justify-around gap-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2019<span className="text-sm font-normal">年〜</span></div>
                <div className="text-xs text-white/60">セブ在住</div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-300">5<span className="text-sm font-normal">名〜</span></div>
                <div className="text-xs text-white/60">少人数から対応</div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24<span className="text-sm font-normal">h</span></div>
                <div className="text-xs text-white/60">現地サポート</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white/40" />
        </div>
      </section>

      {/* ======== PROBLEM / CONCEPT ======== */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-blue-600 text-xs tracking-widest font-semibold mb-4 uppercase">Concept</span>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-5 leading-snug">
              社員旅行を<span className="text-blue-600 font-medium">「ただの慰安」</span>で<br />
              終わらせない
            </h2>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-8" />
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              社員旅行を「ただの慰安」で終わらせず、組織の結束や視野の拡張につなげる。<br />
              それがZEN RETREAT ASIAの考える海外リトリートです。
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              海外という非日常の環境に身を置くことで、社員同士の対話はより深まり、<br className="hidden sm:block" />
              日常の業務では見えにくい課題や可能性が見えてきます。
            </p>
          </div>

          {/* 3 Values */}
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                emoji: '🏄',
                title: '心と身体のリフレッシュ',
                desc: 'ヨガ、瞑想、ビーチアクティビティで日常のストレスを解放',
              },
              {
                emoji: '🔭',
                title: '新たな視点の獲得',
                desc: '非日常環境での対話を通じて、組織の課題解決の糸口を発見',
              },
              {
                emoji: '🤝',
                title: '組織の結束強化',
                desc: '共通の体験を通じて、チームの一体感を醸成',
              },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-5 border border-stone-100">
                <div className="text-4xl flex-shrink-0">{c.emoji}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1.5">{c.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== REASONS ======== */}
      <section id="reasons" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-blue-600 text-xs tracking-widest font-semibold mb-4 uppercase">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
              ZEN RETREAT ASIAが<span className="text-blue-600 font-medium">選ばれる理由</span>
            </h2>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-5" />
            <p className="text-gray-500 text-base">
              セブ現地への深い知見と、多様な要望に応える設計力で、<br />
              企業様の理想的なリトリートを実現します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((r, i) => (
              <div key={i} className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-stone-100">
                {/* 写真エリア */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={imgSrc(r.img, r.fallback)}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = r.fallback; }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                {/* テキストエリア */}
                <div className={`${r.bg} px-6 py-6`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                      {r.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 leading-snug">{r.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== PLANS ======== */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-blue-600 text-xs tracking-widest font-semibold mb-4 uppercase">Plans</span>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
              リトリート<span className="text-blue-600 font-medium">プラン</span>
            </h2>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-5" />
            <p className="text-gray-500 text-base">
              企業様のニーズに合わせた、カスタマイズされたリトリートプランをご提案します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imgSrc(plan.img, plan.fallback)}
                    alt={plan.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = plan.fallback; }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-blue-600/90 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                      {plan.subtitle}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{plan.icon}</span>
                    <h3 className="text-xl font-bold text-gray-800">{plan.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{plan.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {plan.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-700 px-6 py-3 rounded-full text-sm font-medium shadow-sm">
              <span>✨</span>
              <span>その他のプラン（表彰旅行、新入社員研修など）もご相談ください</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======== SUPPORT ======== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-blue-600 text-xs tracking-widest font-semibold mb-4 uppercase">Local Support</span>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
              現地<span className="text-blue-600 font-medium">サポート体制</span>
            </h2>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* 写真 */}
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src={imgSrc(PHOTOS.support, FALLBACK.support)}
                alt="現地サポート体制"
                className="w-full h-72 lg:h-96 object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK.support; }}
                loading="lazy"
              />
            </div>

            {/* テキスト */}
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                ZEN RETREAT ASIAの工程をコーディネートするDiscovery Hidden Japan株式会社取締役は、2019年よりセブに在住し、
                現地NGO活動を通じて地域と深い関係を構築しています。<br /><br />
                この経験と現地ネットワークを活かし、安全で快適、かつ意義あるリトリート体験を実現します。
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Users size={18} className="text-blue-600" />, text: '現地スタッフによる24時間サポート', bg: 'bg-blue-50', border: 'border-blue-100' },
                  { icon: <Shield size={18} className="text-green-600" />, text: '緊急時対応体制の整備', bg: 'bg-green-50', border: 'border-green-100' },
                  { icon: <CheckCircle size={18} className="text-amber-600" />, text: '地域との信頼関係に基づくサポート', bg: 'bg-amber-50', border: 'border-amber-100' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-4 ${item.bg} border ${item.border} rounded-2xl px-5 py-4`}>
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-gray-800 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== DIRECTOR PROFILE ======== */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32" />

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-white/70 text-xs tracking-widest font-semibold mb-4 uppercase">Profile</span>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
              DHJ取締役<span className="text-white font-medium">プロフィール</span>
            </h2>
            <div className="w-16 h-0.5 bg-white/60 mx-auto" />
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* 写真エリア */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-3xl overflow-hidden ring-4 ring-white/30 shadow-2xl">
                    <img
                      src={imgSrc(PHOTOS.director, FALLBACK.director)}
                      alt="取締役プロフィール"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK.director; }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg border border-white/30">
                    2019年よりセブに在住
                  </div>
                </div>
              </div>

              {/* プロフィール本文 */}
              <div className="lg:col-span-2">
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  2019年よりセブに在住し、現地NGO活動を通じて地域社会に貢献。
                  企業向けリトリートの企画・運営経験豊富。
                </p>
                <p className="text-white/80 text-base leading-relaxed mb-8">
                  参加企業の満足度向上と、セブ地域社会への貢献の両立を目指しています。
                </p>

                {/* バッジ群 */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: '🗓️', label: '2019年よりセブに在住' },
                    { icon: '🤝', label: '現地NGO活動' },
                    { icon: '🌏', label: '日本語・英語対応' },
                    { icon: '🏢', label: '企業リトリート実績多数' },
                  ].map((badge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/15 border border-white/25 text-white/90 px-4 py-2 rounded-xl text-sm font-medium"
                    >
                      <span>{badge.icon}</span>
                      <span>{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== GALLERY ======== */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 text-xs tracking-widest font-semibold mb-4 uppercase">Gallery</span>
            <h2 className="text-3xl font-light text-gray-800 mb-4">
              リトリートの<span className="text-blue-600 font-medium">雰囲気</span>
            </h2>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-4" />

          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* 1枚目 – 横幅フル */}
            <div className="col-span-2 md:col-span-3 rounded-3xl overflow-hidden shadow-lg h-64 md:h-80">
              <img
                src={imgSrc(PHOTOS.gallery[0], FALLBACK.gallery[0])}
                alt="リトリートの様子 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK.gallery[0]; }}
                loading="lazy"
              />
            </div>
            {/* 2〜3枚目 */}
            {[1, 2].map((idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden shadow-md h-52">
                <img
                  src={imgSrc(PHOTOS.gallery[idx], FALLBACK.gallery[idx])}
                  alt={`リトリートの様子 ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK.gallery[idx]; }}
                  loading="lazy"
                />
              </div>
            ))}
            {/* 4〜6枚目 */}
            {[3, 4, 5].map((idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden shadow-md h-48">
                <img
                  src={imgSrc(PHOTOS.gallery[idx], FALLBACK.gallery[idx])}
                  alt={`リトリートの様子 ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK.gallery[idx]; }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FAQ ======== */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 text-xs tracking-widest font-semibold mb-4 uppercase">FAQ</span>
            <h2 className="text-3xl font-light text-gray-800 mb-4">
              よくある<span className="text-blue-600 font-medium">ご質問</span>
            </h2>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto" />
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-stone-50 rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-800 pr-4 text-base leading-snug">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={22} className="text-blue-500 flex-shrink-0" />
                    : <ChevronDown size={22} className="text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-600 text-base leading-relaxed border-t border-stone-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CONTACT CTA ======== */}
      <section
        id="contact-section"
        className="py-24 bg-gradient-to-r from-green-600 to-blue-600 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            リトリートプランについてのご相談は<br className="hidden sm:block" />お気軽にどうぞ
          </h2>
          <p className="text-xl mb-8 opacity-90">
            セブ在住の取締役が、御社に最適なプランをご提案します。
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="font-medium">お問い合わせ</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />



    </div>
  );
};

export default CompanyRetreat;
