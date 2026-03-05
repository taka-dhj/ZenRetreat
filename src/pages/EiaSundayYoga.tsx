import React, { useState, useRef } from 'react';
import { Clock, Phone, Mail, ChevronDown, ChevronUp, Star, ExternalLink, MapPin } from 'lucide-react';

// ✅ 正しいフォームID（短縮URLのリダイレクト先から取得）
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfgLzMQmd0Jz5VunP3sh5NfbbghRGtVigKrHX2YtfWxkL2rBA/viewform?embedded=true';
const FORM_DIRECT_URL = 'https://forms.gle/mH7ur3Bqe78ReFxX7';

// Google Maps embed — EIA by DAWATA (Place ID: 0x33a9992f9c25a687:0x748d0b860a8e0a18)
const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d976.8!2d123.8854!3d10.3327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9992f9c25a687%3A0x748d0b860a8e0a18!2sEia%20by%20Dawata!5e0!3m2!1sja!2sph!4v1709600000000!5m2!1sja!2sph';

// ────────────────────────────────────────────────
// カラーパレット（チラシ準拠）
//   ゴールデンイエロー : #C9A227 / #D4AF37
//   コーラルオレンジ   : #E85D4A / #F07060
//   クリーム背景       : #FBF7F0 / #F5EFE6
//   ダークテキスト     : #2C2C2C / #3D3D3D
//   ライトベージュ     : #EDE6D8
// ────────────────────────────────────────────────

const EiaSundayYoga: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const formSectionRef = useRef<HTMLElement>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToForm = () => {
    const el = document.getElementById('apply-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const schedule = [
    { time: '11:30', label: '開場・受付',         en: 'Doors open & Check-in', icon: '🚪' },
    { time: '12:00', label: 'Beginner Yoga',       en: 'ビギナーヨガ',          icon: '🧘' },
    { time: '13:00', label: 'Organic Lunch',       en: '有機野菜ランチ',        icon: '🥗' },
    { time: '14:00', label: 'Guided Meditation',   en: 'ガイド瞑想',            icon: '🌿' },
    { time: '14:30', label: 'Vision Board Making', en: 'ビジョンボード作成',    icon: '✨' },
    { time: '15:15', label: 'Sharing Time',        en: 'シェアタイム',          icon: '💬' },
    { time: '16:00', label: '終了・解散',           en: 'End',                  icon: '🌅' },
  ];

  const dates = [
    { date: '22', month: '3', dayName: 'SUN', full: '2025年3月22日（日）' },
    { date: '5',  month: '4', dayName: 'SUN', full: '2025年4月5日（日）'  },
    { date: '26', month: '4', dayName: 'SUN', full: '2025年4月26日（日）' },
  ];

  const testimonials = [
    {
      name: 'M.T さん（32歳）',
      role: '会社員',
      comment: '初めてのヨガで不安でしたが、先生がとても丁寧で、終わった後は体も心もすっきりしました。有機野菜ランチもとても美味しくて、また参加したいです！',
      stars: 5,
    },
    {
      name: 'Y.K さん（28歳）',
      role: 'フリーランス',
      comment: '英語に自信がなかったのですが、簡単な英語のみで用語集も配布してもらえて安心でした。瞑想の時間が特に心に響きました。ビジョンボードも楽しかった！',
      stars: 5,
    },
    {
      name: 'R.N さん（35歳）',
      role: '看護師',
      comment: '普段なかなか自分の時間が取れないのですが、このリトリートで久しぶりに自分と向き合う時間を持てました。会場のEIAもとても雰囲気が良くて癒されます。',
      stars: 5,
    },
    {
      name: 'S.H さん（26歳）',
      role: '大学生',
      comment: '学生割引もあって気軽に参加できました。ビジョンボード作りでこれからの目標が明確になって、参加してよかったです！タカ先生のお話もとても印象的でした。',
      stars: 5,
    },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif", backgroundColor: '#FBF7F0' }}>

      {/* ══════════════════════════════════════════════
          HERO — ヨガ写真 + ゴールドグラデーション
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        {/* 背景写真 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=1600')` }}
        />
        {/* ゴールド寄りのグラデーションオーバーレイ */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, rgba(201,162,39,0.55) 0%, rgba(251,247,240,0.25) 35%, rgba(44,44,44,0.75) 100%)'
        }} />
        {/* ゴールドのトップライン */}
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: 'linear-gradient(to right, #C9A227, #F0D060, #C9A227)' }} />

        <div className="relative z-10 w-full max-w-xl mx-auto px-6 text-center">
          {/* ブランドバッジ */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium tracking-widest mb-8"
            style={{ background: 'rgba(251,247,240,0.88)', color: '#2C2C2C', border: '1px solid rgba(201,162,39,0.5)' }}
          >
            <span style={{ color: '#C9A227', fontWeight: 700 }}>ZEN RETREAT ASIA</span>
            <span style={{ color: '#C9A227', opacity: 0.5 }}>×</span>
            <span style={{ color: '#2C2C2C' }}>EIA by DAWATA</span>
          </div>

          {/* サブコピー */}
          <p className="text-base tracking-widest mb-4 font-light" style={{ color: 'rgba(255,255,255,0.92)', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
            忙しさから離れ、自分を見つめ直す週末
          </p>

          {/* ビッグタイトル — チラシのゴールドを再現 */}
          <h1
            className="font-black leading-none tracking-tight mb-1"
            style={{
              fontSize: 'clamp(4rem, 16vw, 7rem)',
              color: '#D4AF37',
              textShadow: '3px 3px 0px rgba(255,255,255,0.4), 0 6px 30px rgba(201,162,39,0.5)',
              WebkitTextStroke: '1px rgba(160,120,10,0.35)',
            }}
          >
            SUNDAY
          </h1>
          <h1
            className="font-black leading-none tracking-tight mb-6"
            style={{
              fontSize: 'clamp(3.5rem, 15vw, 6.5rem)',
              color: '#D4AF37',
              textShadow: '3px 3px 0px rgba(255,255,255,0.4), 0 6px 30px rgba(201,162,39,0.5)',
              WebkitTextStroke: '1px rgba(160,120,10,0.35)',
            }}
          >
            RETREAT
          </h1>

          {/* イタリック英語コピー */}
          <p className="text-lg italic font-light mb-8 tracking-wide" style={{ color: 'rgba(255,255,255,0.90)', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
            "Take A Pose, Find Yourself"
          </p>

          {/* 日付バッジ — チラシ風ゴールド枠 */}
          <div className="flex justify-center gap-3 mb-10">
            {dates.map((d, i) => (
              <div
                key={i}
                className="text-center px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(251,247,240,0.92)', border: '2px solid #C9A227', minWidth: '68px', boxShadow: '0 4px 14px rgba(201,162,39,0.30)' }}
              >
                <div className="text-xs font-bold tracking-widest" style={{ color: '#C9A227' }}>{d.month}/</div>
                <div className="font-black leading-none" style={{ fontSize: '2.4rem', color: '#C9A227' }}>{d.date}</div>
                <div className="text-xs font-bold tracking-widest mt-0.5" style={{ color: '#C9A227' }}>{d.dayName}</div>
              </div>
            ))}
          </div>

          {/* TIME / VENUE / FEE ボックス */}
          <div
            className="text-left px-5 py-4 rounded-2xl mb-10 w-full space-y-3"
            style={{ background: 'rgba(251,247,240,0.93)', border: '1px solid rgba(201,162,39,0.35)', boxShadow: '0 6px 24px rgba(0,0,0,0.18)' }}
          >
            {[
              { label: 'TIME',  value: '11:30am – 4:00pm',   sub: null, gold: false },
              { label: 'VENUE', value: 'EIA by DAWATA',       sub: 'Near Country Mall, Banilad　ITパークから車で約8分', gold: false },
              { label: 'FEE',   value: '₱2,000 (For Student)', sub: null, gold: true },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 text-xs font-bold tracking-widest px-2 py-1 rounded mt-0.5"
                  style={{ background: '#2C2C2C', color: '#FBF7F0', minWidth: '54px', textAlign: 'center' }}
                >
                  {row.label}
                </div>
                <div>
                  <div className="font-bold leading-tight" style={{ color: row.gold ? '#C9A227' : '#2C2C2C', fontSize: row.gold ? '1.25rem' : '1rem' }}>
                    {row.value}
                  </div>
                  {row.sub && <div className="text-xs mt-0.5" style={{ color: '#888' }}>{row.sub}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* CTAボタン */}
          <div className="flex flex-col gap-3">
            <button
              onClick={scrollToForm}
              className="w-full font-bold py-5 rounded-2xl text-lg tracking-wide transition-all duration-300 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #E85D4A, #F07060)', color: '#fff', boxShadow: '0 6px 24px rgba(232,93,74,0.45)' }}
            >
              お申し込みはこちら ↓
            </button>
            <a
              href="#about"
              className="w-full text-center font-medium py-4 rounded-2xl text-base tracking-wide transition-all duration-300"
              style={{ background: 'rgba(251,247,240,0.85)', color: '#2C2C2C', border: '1px solid rgba(44,44,44,0.2)' }}
            >
              詳細を見る
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} style={{ color: 'rgba(255,255,255,0.55)' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT — クリーム背景・ゴールド→コーラルグラデ
      ══════════════════════════════════════════════ */}
      <section id="about" className="py-20 relative overflow-hidden" style={{ background: '#FBF7F0' }}>
        {/* 淡いゴールドグラデ装飾 */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-20 -translate-y-1/3 translate-x-1/3"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />

        <div className="max-w-xl mx-auto px-6 relative">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #C9A227, #E85D4A)' }} />
              <h2 className="text-2xl font-bold leading-snug" style={{ color: '#2C2C2C' }}>
                忙しい日常から一歩下がって、<br />
                <span style={{ color: '#E85D4A' }}>本来の自分とつながる</span>特別な時間
              </h2>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 flex-shrink-0 opacity-0" />
              <div>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#444' }}>
                  セブに来たきっかけは？1年後、どんな自分でいたい？<br />
                  忙しさに埋もれがちな、大切な質問と向き合う時間。
                </p>
                <p className="text-base leading-relaxed" style={{ color: '#444' }}>
                  ヨガや瞑想、身体の喜ぶ食事をしながらイマを再確認。<br />
                  ドリームボードに未来をまとめて、あなたの留学を、<br />
                  もっと意味深いものに。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { emoji: '🌿', title: '心を整える',   desc: 'ヨガと瞑想で日常のストレスをリリース。静けさの中で本来の自分に戻る時間。', accent: '#C9A227' },
              { emoji: '✨', title: '未来を描く',   desc: 'ビジョンボード作成で自分の夢や目標を可視化。新しい一歩を踏み出すきっかけに。', accent: '#D4AF37' },
              { emoji: '🤝', title: '仲間と繋がる', desc: '同じ気持ちを持つ仲間と出会い、シェアすることで心が軽くなる。新しいコミュニティへ。', accent: '#E85D4A' },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #EDE6D8', boxShadow: '0 2px 12px rgba(201,162,39,0.08)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${c.accent}18` }}>
                  {c.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1.5" style={{ color: '#2C2C2C' }}>{c.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#666' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT YOU'LL EXPERIENCE — ベージュ背景
      ══════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #F5EFE6 0%, #FBF7F0 100%)' }}>
        <div className="max-w-xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #C9A227, #D4AF37)' }} />
            <div>
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: '#C9A227' }}>What You'll Experience</div>
              <h2 className="text-2xl font-bold" style={{ color: '#2C2C2C' }}>含まれるもの</h2>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { time: '12:00', en: 'Beginner Yoga',       ja: 'ビギナーヨガ',       icon: '🧘', desc: '初心者OK。超シンプルな英語のみ＆事前に用語集配布。' },
              { time: '13:00', en: 'Organic Lunch',       ja: '有機野菜ランチ',     icon: '🥗', desc: '地元の有機野菜をたっぷり使ったヘルシーなランチ付き。' },
              { time: '14:00', en: 'Guided Meditation',   ja: 'ガイド瞑想',         icon: '🌿', desc: '丁寧にガイドされる瞑想で深いリラックスを体験。' },
              { time: '14:30', en: 'Vision Board Making', ja: 'ビジョンボード作成', icon: '✨', desc: '自分の未来を視覚化。本当にやりたいことが見えてくる。' },
              { time: '15:15', en: 'Sharing Time',        ja: 'シェアタイム',       icon: '💬', desc: '同じ志を持つ仲間とつながれる交流タイム。' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #EDE6D8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div className="flex-shrink-0 text-center" style={{ minWidth: '52px' }}>
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs font-bold" style={{ color: '#C9A227' }}>{item.time}</div>
                </div>
                <div className="w-px self-stretch mx-1" style={{ background: 'linear-gradient(to bottom, #C9A227, #EDE6D8)' }} />
                <div className="flex-1">
                  <div className="font-bold text-base" style={{ color: '#2C2C2C' }}>{item.en}</div>
                  <div className="text-sm mb-1.5 font-semibold" style={{ color: '#C9A227' }}>{item.ja}</div>
                  <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ENGLISH BEGINNERS — ゴールドボーダー
      ══════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: '#FBF7F0' }}>
        <div className="max-w-xl mx-auto px-6">
          <div
            className="p-7 rounded-3xl"
            style={{ background: '#fff', border: '2px solid #C9A227', boxShadow: '0 4px 24px rgba(201,162,39,0.15)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #E85D4A, #C9A227)' }} />
              <h2 className="text-xl font-bold" style={{ color: '#E85D4A' }}>English Beginners? No Problem!</h2>
            </div>
            <ul className="space-y-3 mb-5">
              {[
                '使うのは超シンプルな英語のみ',
                '事前にヨガ・瞑想の用語集を配布',
                '日本語でのフォローも可能（Taka: 日本語OK）',
                '英語レベルは全く問いません！',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: '#444' }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: '#C9A227', color: '#fff' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
              Your English level doesn't matter here! 使うのは簡単な英語のみで<br />
              事前に用語集も配布。初心者大歓迎！
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SCHEDULE — ゴールドグラデ背景
      ══════════════════════════════════════════════ */}
      <section id="schedule" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #FBF7F0 0%, #F5EFE6 50%, #EDE6D8 100%)' }}>
        {/* 装飾円 */}
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15 translate-y-1/3 -translate-x-1/3"
          style={{ background: 'radial-gradient(circle, #C9A227 0%, transparent 70%)' }} />

        <div className="max-w-xl mx-auto px-6 relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #C9A227, #D4AF37)' }} />
            <div>
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: '#C9A227' }}>Schedule</div>
              <h2 className="text-2xl font-bold" style={{ color: '#2C2C2C' }}>当日のタイムテーブル</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-8 ml-5 text-base font-bold" style={{ color: '#2C2C2C' }}>
            <Clock size={18} style={{ color: '#C9A227' }} />
            11:30am – 4:00pm
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(to bottom, #C9A227, #EDE6D8)' }} />
            <div className="space-y-4">
              {schedule.map((item, i) => (
                <div key={i} className="flex items-center gap-4 pl-14 relative">
                  <div
                    className="absolute left-4 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10"
                    style={{ background: '#fff', borderColor: '#C9A227', boxShadow: '0 0 0 3px rgba(201,162,39,0.15)' }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: '#C9A227' }} />
                  </div>
                  <div className="flex items-center gap-4 flex-1 p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #EDE6D8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-black text-base" style={{ color: '#C9A227' }}>{item.time}</span>
                        <span className="font-bold text-base" style={{ color: '#2C2C2C' }}>{item.label}</span>
                      </div>
                      <div className="text-sm mt-0.5" style={{ color: '#888' }}>{item.en}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VENUE & DETAILS — Googleマップ表示
      ══════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: '#FBF7F0' }}>
        <div className="max-w-xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #E85D4A, #C9A227)' }} />
            <div>
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: '#E85D4A' }}>Venue & Details</div>
              <h2 className="text-2xl font-bold" style={{ color: '#2C2C2C' }}>開催詳細</h2>
            </div>
          </div>

          {/* ✅ Googleマップ埋め込み */}
          <div className="rounded-3xl overflow-hidden mb-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)', border: '1px solid #EDE6D8' }}>
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="280"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EIA by DAWATA - Banilad, Cebu City"
            />
            {/* マップ下のラベル */}
            <div className="flex items-center gap-3 px-5 py-3" style={{ background: '#fff', borderTop: '1px solid #EDE6D8' }}>
              <MapPin size={16} style={{ color: '#E85D4A', flexShrink: 0 }} />
              <div className="flex-1">
                <div className="font-bold text-sm" style={{ color: '#2C2C2C' }}>EIA by DAWATA</div>
                <div className="text-xs" style={{ color: '#888' }}>8 Adelfa St, El Dorado Subdivision, Banilad, Cebu City</div>
              </div>
              <a
                href="https://maps.app.goo.gl/nUrNdLw7G9gQN1Vk6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 transition-all"
                style={{ background: '#E85D4A', color: '#fff' }}
              >
                <ExternalLink size={11} />
                地図を開く
              </a>
            </div>
          </div>

          {/* 詳細ボックス */}
          <div className="p-6 rounded-3xl" style={{ background: '#fff', border: '1px solid #EDE6D8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            {[
              { label: 'TIME',     value: '11:30am – 4:00pm',   sub: null, gold: false },
              { label: 'VENUE',    value: 'EIA by DAWATA',       sub: 'Near Country Mall, Banilad　ITパークから車で約8分', gold: false },
              { label: 'FEE',      value: '₱2,000',              sub: '学生割引あり（For Student）', gold: true },
              { label: 'LANGUAGE', value: '日本語 & English',    sub: '超シンプルな英語のみ・事前に用語集配布', gold: false },
            ].map((row, i) => (
              <div key={i} className={`flex items-start gap-4 py-4 ${i !== 3 ? 'border-b' : ''}`} style={{ borderColor: '#EDE6D8' }}>
                <div
                  className="flex-shrink-0 text-xs font-bold tracking-widest px-2.5 py-1.5 rounded-lg mt-0.5"
                  style={{ background: '#2C2C2C', color: '#FBF7F0', minWidth: '72px', textAlign: 'center' }}
                >
                  {row.label}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-base leading-tight" style={{ color: row.gold ? '#C9A227' : '#2C2C2C', fontSize: row.gold ? '1.5rem' : '1rem' }}>
                    {row.value}
                  </div>
                  {row.sub && <div className="text-sm mt-1" style={{ color: '#888' }}>{row.sub}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* 日程カレンダー */}
          <div className="mt-6 p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FBF7F0, #F5EFE6)', border: '1px solid #EDE6D8' }}>
            <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#888' }}>開催日程</div>
            <div className="flex justify-around">
              {dates.map((d, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center mx-auto mb-1"
                    style={{ background: '#fff', border: '2px solid #C9A227', boxShadow: '0 2px 8px rgba(201,162,39,0.2)' }}
                  >
                    <div className="text-xs font-bold" style={{ color: '#C9A227' }}>{d.month}月</div>
                    <div className="font-black leading-none" style={{ fontSize: '1.8rem', color: '#C9A227' }}>{d.date}</div>
                  </div>
                  <div className="text-xs font-bold tracking-widest" style={{ color: '#C9A227' }}>{d.dayName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #F5EFE6 0%, #FBF7F0 100%)' }}>
        <div className="max-w-xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #C9A227, #D4AF37)' }} />
            <div>
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: '#C9A227' }}>Gallery</div>
              <h2 className="text-2xl font-bold" style={{ color: '#2C2C2C' }}>リトリートの雰囲気</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
              <img src="https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Yoga class" className="w-full h-56 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.10)' }}>
              <img src="https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Meditation" className="w-full h-40 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.10)' }}>
              <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Organic lunch" className="w-full h-40 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.10)' }}>
              <img src="https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Yoga pose" className="w-full h-40 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.10)' }}>
              <img src="https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Yoga studio" className="w-full h-40 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS — ダークゴールドグラデ
      ══════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #2C2C2C 0%, #3D3020 50%, #2C2C2C 100%)' }}>
        {/* 装飾 */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 -translate-y-1/4 translate-x-1/4"
          style={{ background: 'radial-gradient(circle, #C9A227 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 translate-y-1/4 -translate-x-1/4"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />

        <div className="relative max-w-xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #D4AF37, #C9A227)' }} />
            <div>
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: '#C9A227' }}>Testimonials</div>
              <h2 className="text-2xl font-bold" style={{ color: '#FBF7F0' }}>参加者の声</h2>
            </div>
          </div>
          <div className="space-y-5">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,162,39,0.30)', boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={16} style={{ color: '#D4AF37', fill: '#D4AF37' }} />
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-5 italic" style={{ color: 'rgba(251,247,240,0.90)' }}>
                  &ldquo;{t.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0"
                    style={{ background: 'rgba(201,162,39,0.22)', color: '#D4AF37', border: '1px solid rgba(201,162,39,0.35)' }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-base" style={{ color: '#FBF7F0' }}>{t.name}</div>
                    <div className="text-sm" style={{ color: 'rgba(255,255,255,0.50)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          UPCOMING DATES
      ══════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#FBF7F0' }}>
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-15 -translate-y-1/4 translate-x-1/4"
          style={{ background: 'radial-gradient(circle, #E85D4A 0%, transparent 70%)' }} />

        <div className="max-w-xl mx-auto px-6 relative">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #E85D4A, #C9A227)' }} />
            <div>
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: '#E85D4A' }}>Upcoming Dates</div>
              <h2 className="text-2xl font-bold" style={{ color: '#2C2C2C' }}>開催スケジュール</h2>
            </div>
          </div>
          <div className="space-y-4">
            {dates.map((d, i) => (
              <div key={i} className="p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #EDE6D8', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #FBF7F0, #F5EFE6)', border: '2px solid #C9A227', boxShadow: '0 2px 8px rgba(201,162,39,0.2)' }}
                  >
                    <span className="text-xs font-bold" style={{ color: '#C9A227' }}>{d.month}月</span>
                    <span className="font-black leading-none" style={{ fontSize: '2rem', color: '#C9A227' }}>{d.date}</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg" style={{ color: '#2C2C2C' }}>{d.full}</div>
                    <div className="flex items-center gap-1.5 text-sm mt-1" style={{ color: '#888' }}>
                      <Clock size={13} />
                      11:30am – 4:00pm｜EIA by DAWATA
                    </div>
                  </div>
                </div>
                <button
                  onClick={scrollToForm}
                  className="w-full font-bold py-4 rounded-xl text-base transition-all duration-300 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #E85D4A, #F07060)', color: '#fff', boxShadow: '0 4px 14px rgba(232,93,74,0.30)' }}
                >
                  この日程で申し込む
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ — ベージュ背景
      ══════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #F5EFE6 0%, #FBF7F0 100%)' }}>
        <div className="max-w-xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #C9A227, #D4AF37)' }} />
            <div>
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: '#C9A227' }}>FAQ</div>
              <h2 className="text-2xl font-bold" style={{ color: '#2C2C2C' }}>よくあるご質問</h2>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { q: 'ヨガが初めてでも参加できますか？',    a: 'もちろんです！このリトリートはビギナーヨガを中心としており、初心者の方を大歓迎しています。柔軟性や体力は必要ありません。ヨガマットや道具もご用意しています。' },
              { q: '英語が話せなくても大丈夫ですか？',     a: 'ご安心ください！使用するのは超シンプルな英語のみです。事前にヨガ・瞑想の用語集も配布しますので、英語レベルは問いません。日本語でのフォローも可能です（日本語OK：Taka）。' },
              { q: '何を持参すればよいですか？',           a: '動きやすい服装でお越しください。ヨガマット・小道具は会場にご用意があります。タオルと水筒をお持ちいただけると快適です。ランチはご用意しています。' },
              { q: '学生割引はありますか？',               a: 'はい！学生の方は特別割引価格でご参加いただけます。申し込みフォームにて学生である旨をご記入ください。詳細はお申し込み確認後にご連絡します。' },
              { q: '会場へのアクセスを教えてください。',   a: 'EIA by DAWATA（バニラッド、カントリーモール近く）です。ITパークから車で約8分のところにあります。詳しいアクセス方法はお申し込み後にご連絡します。' },
              { q: 'キャンセルポリシーを教えてください。', a: '開催3日前まではキャンセルを承ります。それ以降のキャンセルについてはご返金が難しい場合があります。詳細はお申し込み時にご確認ください。' },
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EDE6D8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <button
                  className="w-full flex items-center justify-between px-5 py-5 text-left"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="font-bold text-base pr-4 leading-snug" style={{ color: '#2C2C2C' }}>{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={22} style={{ color: '#C9A227', flexShrink: 0 }} />
                    : <ChevronDown size={22} style={{ color: '#aaa', flexShrink: 0 }} />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-base leading-relaxed border-t pt-4" style={{ color: '#555', borderColor: '#EDE6D8' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          APPLY FORM — メインCV（ダーク＋ゴールドグラデ）
      ══════════════════════════════════════════════ */}
      <section
        id="apply-form"
        ref={formSectionRef}
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #2C2C2C 0%, #3D3020 40%, #2C2020 100%)' }}
      >
        {/* 背景装飾 */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?auto=compress&cs=tinysrgb&w=1200')` }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3"
          style={{ background: 'radial-gradient(circle, #C9A227 0%, transparent 70%)' }} />
        {/* ゴールドのトップライン */}
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: 'linear-gradient(to right, #C9A227, #F0D060, #C9A227)' }} />

        <div className="relative max-w-xl mx-auto px-6">
          {/* ヘッダー */}
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#C9A227' }}>Apply Now</div>
            <h2 className="font-black mb-3 leading-tight" style={{ fontSize: '2.5rem', color: '#FBF7F0' }}>お申し込み</h2>
            <p className="text-base mb-2" style={{ color: 'rgba(251,247,240,0.70)' }}>下記フォームにご記入ください</p>
            <p className="text-sm" style={{ color: '#C9A227' }}>✓ 所要時間：約2分　｜　✓ ご質問もお気軽に</p>
          </div>

          {/* 情報ピル */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: '📅', text: '3/22・4/5・4/26 開催' },
              { icon: '💰', text: '₱2,000（学割あり）' },
              { icon: '🥗', text: '有機ランチ込み' },
              { icon: '🧘', text: '初心者歓迎' },
            ].map((pill, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.30)', color: '#FBF7F0' }}>
                <span className="text-lg">{pill.icon}</span>
                <span className="font-medium">{pill.text}</span>
              </div>
            ))}
          </div>

          {/* フォームカード */}
          <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 10px 50px rgba(0,0,0,0.45)', border: '1px solid rgba(201,162,39,0.30)' }}>
            {/* カードヘッダー */}
            <div className="px-5 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #C9A227, #D4AF37)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.25)' }}>
                  <span className="text-white text-base font-bold">✎</span>
                </div>
                <div>
                  <div className="font-bold text-sm leading-tight" style={{ color: '#fff' }}>EIA SUNDAY YOGA 申し込みフォーム</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.80)' }}>ZEN RETREAT ASIA × EIA by DAWATA</div>
                </div>
              </div>
              <a
                href={FORM_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs flex-shrink-0 ml-2"
                style={{ background: 'rgba(255,255,255,0.25)', color: '#fff' }}
              >
                <ExternalLink size={12} />
                別タブ
              </a>
            </div>

            {/* ✅ Google Form iframe（正しいURL） */}
            <div style={{ background: '#fff' }}>
              <iframe
                src={FORM_URL}
                title="EIA Sunday Yoga 申し込みフォーム"
                width="100%"
                height="900"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                style={{ display: 'block' }}
              >
                読み込んでいます…
              </iframe>
            </div>

            {/* フォームフッター */}
            <div className="px-5 py-5" style={{ background: '#F5EFE6', borderTop: '1px solid #EDE6D8' }}>
              <p className="text-sm text-center mb-3" style={{ color: '#888' }}>
                フォームが表示されない場合はこちら
              </p>
              <a
                href={FORM_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-xl text-base transition-all duration-300 w-full"
                style={{ background: 'linear-gradient(135deg, #E85D4A, #F07060)', color: '#fff', boxShadow: '0 4px 14px rgba(232,93,74,0.35)' }}
              >
                <ExternalLink size={18} />
                フォームを直接開く
              </a>
            </div>
          </div>

          {/* 連絡先 */}
          <div className="mt-10 text-center space-y-4">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>ご不明な点はお気軽にご連絡ください</p>
            <a href="mailto:retreat-eia@zen-retreat-asia.com"
              className="flex items-center justify-center gap-2 text-base"
              style={{ color: '#D4AF37' }}>
              <Mail size={18} />
              retreat-eia@zen-retreat-asia.com
            </a>
            <a href="tel:+639560831462"
              className="flex items-center justify-center gap-2 text-base"
              style={{ color: 'rgba(251,247,240,0.65)' }}>
              <Phone size={18} />
              +63 956 083 1462（Taka）
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER — ゴールドグラデーション
      ══════════════════════════════════════════════ */}
      <section className="py-8" style={{ background: 'linear-gradient(135deg, #C9A227, #D4AF37, #B8911F)' }}>
        <div className="max-w-xl mx-auto px-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="font-black text-lg tracking-wide" style={{ color: '#fff' }}>ZEN RETREAT ASIA</div>
            <div className="font-medium text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>× EIA by DAWATA</div>
            <div className="w-12 h-px my-1" style={{ background: 'rgba(255,255,255,0.40)' }} />
            <a href="mailto:retreat-eia@zen-retreat-asia.com" className="flex items-center gap-2 text-sm" style={{ color: '#fff' }}>
              <Mail size={14} />
              retreat-eia@zen-retreat-asia.com
            </a>
            <a href="tel:+639560831462" className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <Phone size={14} />
              +63 956 083 1462（Taka）
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EiaSundayYoga;
