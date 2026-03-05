import React, { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, Phone, Mail, ChevronDown, ChevronUp, Star, Users, Leaf, Heart, Sunrise, ExternalLink } from 'lucide-react';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfgLzMQmd0Jz5VunP3sh5NfbbghRGtVigKrHX2YtfWxkL2rBA/viewform?embedded=true';
const FORM_DIRECT_URL = 'https://forms.gle/mH7ur3Bqe78ReFxX7';
const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d976.8!2d123.8854!3d10.3327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9992f9c25a687%3A0x748d0b860a8e0a18!2sEia%20by%20Dawata!5e0!3m2!1sja!2sph!4v1709600000000!5m2!1sja!2sph';

const EiaSundayYoga: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formLoaded, setFormLoaded] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formSectionRef = useRef<HTMLElement>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (formSectionRef.current) observer.observe(formSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('apply-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const schedule = [
    { time: '11:30', label: '開場・受付',       en: 'Doors open & Check-in',  icon: '🚪' },
    { time: '12:00', label: 'ビギナーヨガ',      en: 'Beginner Yoga',           icon: '🧘' },
    { time: '13:00', label: '野菜ランチ',    en: 'Organic Lunch',           icon: '🥗' },
    { time: '14:00', label: 'ガイド瞑想',        en: 'Guided Meditation',       icon: '🌿' },
    { time: '14:30', label: 'ビジョンボード作成', en: 'Vision Board Making',     icon: '✨' },
    { time: '15:15', label: 'シェアタイム',      en: 'Sharing Time',            icon: '💬' },
    { time: '16:00', label: '終了・解散',        en: 'End',                     icon: '🌅' },
  ];

  const dates = [
    { date: '3/22', month: '3月', full: '2025年3月22日（日）' },
    { date: '4/5',  month: '4月', full: '2025年4月5日（日）' },
    { date: '4/26', month: '4月', full: '2025年4月26日（日）' },
  ];

  const testimonials = [
    {
      name: 'M.T さん（32歳）',
      role: '会社員',
      comment: '初めてのヨガで不安でしたが、先生がとても丁寧で、終わった後は体も心もすっきりしました。野菜ランチもとても美味しくて、また参加したいです！',
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
      comment: '学生価格で参加できて、内容の充実度に驚きました。ビジョンボード作りでこれからの目標が明確になって、参加してよかったです！タカ先生のお話もとても印象的でした。',
      stars: 5,
    },
  ];

  const highlights = [
    { icon: <Leaf size={32} className="text-amber-600" />,  title: '初心者歓迎のヨガ',    desc: 'ヨガ経験ゼロでも大丈夫。超シンプルな英語のみ使用＆事前に用語集も配布。誰でも安心して参加できます。', bg: 'bg-amber-50' },
    { icon: <Leaf size={32} className="text-yellow-600" />,     title: '野菜ランチ',       desc: '地元の野菜をたっぷり使ったヘルシーなランチ付き。体の中からもきれいに。', bg: 'bg-yellow-50' },
    { icon: <Heart size={32} className="text-rose-500" />,    title: 'ガイド瞑想',           desc: '忙しい日常から完全に離れ、丁寧にガイドされる瞑想で深いリラックスを体験。', bg: 'bg-rose-50' },
    { icon: <Star size={32} className="text-amber-500" />,    title: 'ビジョンボード作成',   desc: '自分の未来を視覚化するビジョンボードを作成。自分の本当にやりたいことが見えてくる時間。', bg: 'bg-amber-50' },
    { icon: <Users size={32} className="text-blue-500" />,    title: 'コミュニティ',         desc: 'シェアタイムで新しい仲間と出会える。同じ志を持つ人たちとのつながりが生まれます。', bg: 'bg-blue-50' },
    { icon: <Sunrise size={32} className="text-purple-500" />, title: '日英バイリンガル',    desc: 'タカ（日本語・英語）が対応。在住日本人はもちろん、英語話者も一緒に参加できます。', bg: 'bg-purple-50' },
  ];

  const faqs = [
    { q: 'ヨガが初めてでも参加できますか？',      a: 'もちろんです！このリトリートはビギナーヨガを中心としており、初心者の方を大歓迎しています。柔軟性や体力は必要ありません。ヨガマットや道具もご用意しています。' },
    { q: '英語が話せなくても大丈夫ですか？',       a: 'ご安心ください！使用するのは超シンプルな英語のみです。事前にヨガ・瞑想の用語集も配布しますので、英語レベルは問いません。日本語でのフォローも可能です（日本語OK：タカ）。' },
    { q: '何を持参すればよいですか？',             a: '動きやすい服装でお越しください。ヨガマット・小道具は会場にご用意があります。タオルと水筒（または水）をお持ちいただけると快適です。ランチはご用意しています。' },
    { q: '参加費を教えてください。',               a: '一般 ₱2,500、学生 ₱2,000、リピーター ₱1,500 です（いずれもランチ込み）。申し込みフォームにて該当の区分をご記入ください。' },
    { q: '会場へのアクセスを教えてください。',     a: 'EIA by DAWATA（バニラッド、カントリーモール近く）です。ITパークから車で約8分のところにあります。詳しいアクセス方法はお申し込み後にご連絡します。' },
    { q: 'キャンセルポリシーを教えてください。',   a: '開催3日前まではキャンセルを承ります。それ以降のキャンセルについてはご返金が難しい場合があります。詳細はお申し込み時にご確認ください。' },
  ];

  return (
    <div className="pt-16 min-h-screen">

      {/* ======== HERO ======== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=1600')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto w-full">
          {/* Brand badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white/90 px-5 py-2.5 rounded-full text-sm font-light tracking-wider mb-8">
            <span className="text-amber-300 font-medium">ZEN RETREAT ASIA</span>
            <span className="text-white/40">×</span>
            <span className="text-yellow-300 font-medium">EIA by DAWATA</span>
          </div>

          <p className="text-white/80 text-base font-light tracking-[0.15em] mb-5">
            忙しさから離れ、自分を見つめ直す週末
          </p>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-3 leading-tight drop-shadow-2xl">
            SUNDAY<br />RETREAT
          </h1>
          <h2 className="text-4xl font-light text-amber-300 tracking-[0.4em] mb-4">
            EIA
          </h2>
          <p className="text-white/60 text-lg italic mb-10">
            "Take A Pose, Find Yourself"
          </p>

          {/* Date badges */}
          <div className="flex justify-center gap-4 mb-12">
            {dates.map((d, i) => (
              <div key={i} className="bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-2xl px-5 py-3 text-center min-w-[72px]">
                <div className="text-xs text-white/60 tracking-widest mb-1">{d.month}</div>
                <div className="text-2xl font-bold leading-none">{d.date}</div>
                <div className="text-xs text-amber-300 mt-1">日曜日</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-4 mb-8">
            <button
              onClick={scrollToForm}
              className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white font-bold py-5 px-8 rounded-2xl text-xl shadow-2xl transition-all duration-300 hover:shadow-amber-500/40"
            >
              今すぐ申し込む ↓
            </button>
            <a
              href="#schedule"
              className="w-full text-center bg-white/10 hover:bg-white/20 border border-white/40 text-white font-medium py-4 px-8 rounded-2xl text-lg backdrop-blur-sm transition-all duration-300"
            >
              詳細を見る
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 w-full">
            <div className="text-xs text-white/50 tracking-widest uppercase text-center mb-3">参加費</div>
            <div className="flex justify-around gap-2">
              <div className="text-center">
                <div className="text-xs text-white/60 mb-1">一般</div>
                <div className="text-xl font-bold text-white">₱2,500</div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-xs text-amber-300 font-semibold mb-1">学生</div>
                <div className="text-2xl font-bold text-amber-300">₱2,000</div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-xs text-white/60 mb-1">リピーター</div>
                <div className="text-xl font-bold text-white">₱1,500</div>
              </div>
            </div>
            <div className="text-center text-white/50 text-xs mt-3">ランチ込み</div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white/40" />
        </div>
      </section>

      {/* ======== ABOUT ======== */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-amber-600 text-xs tracking-widest font-semibold mb-4 uppercase">About This Retreat</span>
            <h2 className="text-3xl font-light text-gray-800 mb-5 leading-snug">
              忙しい日常から一歩下がって、<br />
              <span className="text-amber-600 font-medium">特別な週末を</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-400 mx-auto mb-6" />
            <p className="text-gray-600 text-base leading-relaxed">
              日々の忙しさに追われて、自分のことを後回しにしていませんか？<br /><br />
              EIA SUNDAY RETREATは、セブ島の緑あふれるスペースで、
              ヨガ・瞑想・ランチ・ビジョンボードを通じて
              <strong className="text-gray-800">「本当の自分」</strong>と向き合う半日リトリートです。
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { emoji: '🌿', title: '心を整える',    desc: 'ヨガと瞑想で日常のストレスをリリース。静けさの中で本来の自分に戻る時間。' },
              { emoji: '✨', title: '未来を描く',    desc: 'ビジョンボード作成で自分の夢や目標を可視化。新しい一歩を踏み出すきっかけに。' },
              { emoji: '🤝', title: '仲間と繋がる',  desc: '同じ気持ちを持つ仲間と出会い、シェアすることで心が軽くなる。新しいコミュニティへ。' },
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

      {/* ======== HIGHLIGHTS ======== */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-amber-600 text-xs tracking-widest font-semibold mb-4 uppercase">What's Included</span>
            <h2 className="text-3xl font-light text-gray-800 mb-4">
              リトリートの<span className="text-amber-600 font-medium">コンテンツ</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-400 mx-auto" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {highlights.map((h, i) => (
              <div key={i} className={`${h.bg} rounded-2xl p-6 flex items-start gap-5`}>
                <div className="flex-shrink-0 mt-0.5">{h.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1.5">{h.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SCHEDULE ======== */}
      <section id="schedule" className="py-16 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-amber-600 text-xs tracking-widest font-semibold mb-4 uppercase">Schedule</span>
            <h2 className="text-3xl font-light text-gray-800 mb-4">
              当日の<span className="text-amber-600 font-medium">タイムテーブル</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-400 mx-auto mb-5" />
            <div className="inline-flex items-center gap-2 text-gray-700 bg-white px-5 py-2.5 rounded-full border border-amber-100 shadow-sm text-base">
              <Clock size={16} className="text-amber-500" />
              <span className="font-medium">11:30am – 4:00pm</span>
            </div>
          </div>
          <div className="space-y-3">
            {schedule.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-amber-50 flex items-center gap-4">
                <div className="w-14 flex-shrink-0 text-center">
                  <span className="text-sm font-bold text-amber-600">{item.time}</span>
                </div>
                <div className="w-px h-8 bg-amber-100 flex-shrink-0" />
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 text-base">{item.label}</div>
                  <div className="text-sm text-gray-400 mt-0.5">{item.en}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== VENUE + INFO ======== */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-amber-600 text-xs tracking-widest font-semibold mb-4 uppercase">Venue & Details</span>
            <h2 className="text-3xl font-light text-gray-800 mb-4">
              開催<span className="text-amber-600 font-medium">詳細</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-400 mx-auto" />
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg mb-8" style={{ border: '1px solid #fde68a' }}>
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="260"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EIA by DAWATA - Banilad, Cebu City"
            />
            <div className="flex items-center gap-3 px-5 py-3 bg-white border-t border-amber-100">
              <MapPin size={15} className="text-amber-500 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-800">EIA by DAWATA</div>
                <div className="text-xs text-gray-500">8 Adelfa St, El Dorado Subdivision, Banilad, Cebu City</div>
              </div>
              <a href="https://maps.app.goo.gl/nUrNdLw7G9gQN1Vk6" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 bg-amber-500 text-white">
                <ExternalLink size={11} />
                地図を開く
              </a>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                bg: 'bg-amber-50', borderColor: 'border-amber-100',
                icon: '📅', label: '開催日程',
                content: <div className="space-y-1">{dates.map((d, i) => <div key={i} className="text-gray-800 font-semibold text-base">{d.full}</div>)}</div>
              },
              {
                bg: 'bg-yellow-50', borderColor: 'border-yellow-100',
                iconEl: <Clock size={22} className="text-yellow-600" />, label: '時間',
                content: <div className="text-gray-800 font-semibold text-base">11:30am – 4:00pm</div>
              },
              {
                bg: 'bg-blue-50', borderColor: 'border-blue-100',
                iconEl: <MapPin size={22} className="text-blue-600" />, label: '会場',
                content: <><div className="text-gray-800 font-semibold text-base">EIA by DAWATA</div><div className="text-gray-500 text-sm mt-0.5">Near Country Mall, Banilad</div><div className="text-gray-500 text-sm">IT Parkから車で約8分</div></>
              },
              {
                bg: 'bg-amber-50', borderColor: 'border-amber-100',
                icon: '💰', label: '参加費',
                content: <>
                  <div className="flex gap-4 flex-wrap">
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">一般</div>
                      <div className="font-bold text-lg text-gray-800">₱2,500</div>
                    </div>
                    <div>
                      <div className="text-xs text-amber-500 font-semibold mb-0.5">学生</div>
                      <div className="font-bold text-xl text-amber-600">₱2,000</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">リピーター</div>
                      <div className="font-bold text-lg text-gray-800">₱1,500</div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs mt-1">ランチ込み</div>
                </>
              },
              {
                bg: 'bg-purple-50', borderColor: 'border-purple-100',
                icon: '🌐', label: '言語',
                content: <><div className="text-gray-800 font-semibold text-base">日本語 & English</div><div className="text-gray-500 text-sm mt-0.5">超シンプルな英語のみ・事前に用語集配布</div></>
              },
              {
                bg: 'bg-rose-50', borderColor: 'border-rose-100',
                iconEl: <Phone size={22} className="text-rose-500" />, label: 'お問い合わせ（Taka）',
                content: <><div className="text-gray-800 font-semibold text-base">+63 956 083 1462</div><div className="text-gray-500 text-sm mt-0.5">日本語 or English OK</div></>
              },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} border ${item.borderColor} rounded-2xl px-5 py-4 flex items-start gap-4`}>
                <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.icon ? <span className="text-xl">{item.icon}</span> : item.iconEl}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 tracking-widest uppercase mb-1">{item.label}</div>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== GALLERY ======== */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block text-amber-600 text-xs tracking-widest font-semibold mb-4 uppercase">Gallery</span>
            <h2 className="text-3xl font-light text-gray-800 mb-4">
              リトリートの<span className="text-amber-600 font-medium">雰囲気</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-400 mx-auto" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* EIAの会場・プール — 横幅フル */}
            <div className="col-span-2 rounded-2xl overflow-hidden shadow-sm">
              <img src="/eia_venue_pool.jpg" alt="EIA by DAWATA 会場" className="w-full h-56 object-cover object-center" />
            </div>
            {/* ヨガクラス */}
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img src="/eia_yoga_class.jpg" alt="ヨガクラスの様子" className="w-full h-44 object-cover object-center" />
            </div>
            {/* スタジオ内部 */}
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img src="/eia_studio.jpg" alt="ヨガスタジオ" className="w-full h-44 object-cover object-center" />
            </div>
            {/* ランチ */}
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img src="/eia_food.jpg" alt="ランチ" className="w-full h-44 object-cover object-center" />
            </div>
            {/* ヨガポーズ（pexels） */}
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img src="https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=600" alt="ヨガ" className="w-full h-44 object-cover object-center" />
            </div>
            {/* 用語集 — 横幅フル */}
            <div className="col-span-2 rounded-2xl overflow-hidden shadow-sm border border-amber-100">
              <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-100 flex items-center gap-2">
                <span className="text-base">📖</span>
                <span className="text-sm font-semibold text-amber-700">ヨガ初心者ガイド：呼吸と基本動作</span>
                <span className="ml-auto text-xs text-amber-500">事前に配布します</span>
              </div>
              <img src="/yoga_glossary.png" alt="ヨガ用語集 呼吸と基本動作" className="w-full object-contain bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ======== TESTIMONIALS ======== */}
      <section className="py-16 bg-gradient-to-br from-amber-700 to-yellow-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        <div className="relative max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-amber-300 text-xs tracking-widest font-semibold mb-4 uppercase">Testimonials</span>
            <h2 className="text-3xl font-light text-white mb-4">
              参加者の<span className="text-amber-300 font-medium">声</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-400 mx-auto" />
          </div>
          <div className="space-y-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex mb-3 gap-1">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/90 text-base leading-relaxed mb-5 italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-amber-400/30 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-base">{t.name}</div>
                    <div className="text-white/60 text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== UPCOMING DATES ======== */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-amber-600 text-xs tracking-widest font-semibold mb-4 uppercase">Upcoming Dates</span>
            <h2 className="text-3xl font-light text-gray-800 mb-4">
              開催<span className="text-amber-600 font-medium">スケジュール</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-400 mx-auto" />
          </div>
          <div className="space-y-4">
            {dates.map((d, i) => (
              <div
                key={i}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-5"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-amber-500 font-semibold">{d.month}</span>
                    <span className="text-3xl font-bold text-amber-700 leading-none">{d.date.split('/')[1]}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">{d.full}</div>
                    <div className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
                      <Clock size={13} />
                      11:30am – 4:00pm｜EIA by DAWATA
                    </div>
                  </div>
                </div>
                <button
                  onClick={scrollToForm}
                  className="w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold py-4 rounded-xl transition-all duration-300 text-base"
                >
                  この日程で申し込む
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-5">
            ↓ 下の申し込みフォームから簡単にお申し込みできます
          </p>
        </div>
      </section>

      {/* ======== FAQ ======== */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-amber-600 text-xs tracking-widest font-semibold mb-4 uppercase">FAQ</span>
            <h2 className="text-3xl font-light text-gray-800 mb-4">
              よくある<span className="text-amber-600 font-medium">ご質問</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-400 mx-auto" />
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
                <button
                  className="w-full flex items-center justify-between px-5 py-5 text-left"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="font-semibold text-gray-800 pr-4 text-base leading-snug">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={22} className="text-amber-500 flex-shrink-0" />
                    : <ChevronDown size={22} className="text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-base leading-relaxed border-t border-stone-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== APPLY FORM — MAIN CV ======== */}
      <section
        id="apply-form"
        ref={formSectionRef}
        className="py-16 bg-gradient-to-br from-amber-900 via-yellow-900 to-stone-900 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?auto=compress&cs=tinysrgb&w=1200')` }}
        />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

        <div className="relative max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-amber-300 text-xs tracking-widest font-semibold mb-4 uppercase">Apply Now</span>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              参加申し込み
            </h2>
            <p className="text-white/70 text-lg mb-3">
              下記フォームにご記入ください
            </p>
            <p className="text-amber-300 text-sm">
              ✓ 所要時間：約2分　｜　✓ ご質問もお気軽に
            </p>
          </div>

          {/* Info pills */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: '📅', text: '3/22・4/5・4/26 開催' },
              { icon: '💰', text: '一般₱2,500 / 学生₱2,000' },
              { icon: '🥗', text: 'ランチ込み' },
              { icon: '🧘', text: '初心者歓迎' },
            ].map((pill, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-4 py-3 rounded-xl text-sm">
                <span className="text-lg">{pill.icon}</span>
                <span className="font-medium">{pill.text}</span>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Top bar */}
            <div className="bg-amber-500 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-base font-bold">✎</span>
                </div>
                <div>
                  <div className="text-white font-bold text-sm leading-tight">EIA SUNDAY YOGA 申し込みフォーム</div>
                  <div className="text-amber-100 text-xs mt-0.5">ZEN RETREAT ASIA × EIA by DAWATA</div>
                </div>
              </div>
              <a
                href={FORM_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-2 rounded-full transition-colors flex-shrink-0 ml-2"
              >
                <ExternalLink size={12} />
                別タブ
              </a>
            </div>

            {/* iframe */}
            <div className="relative" style={{ minHeight: '700px' }}>
              {!formLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50 z-10">
                  <div className="w-14 h-14 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-5" />
                  <p className="text-gray-500 text-base">フォームを読み込み中...</p>
                </div>
              )}
              {isFormVisible && (
                <iframe
                  src={FORM_URL}
                  title="EIA Sunday Yoga 申し込みフォーム"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="block"
                  onLoad={() => setFormLoaded(true)}
                  style={{ opacity: formLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
                >
                  読み込んでいます…
                </iframe>
              )}
            </div>

            {/* Form footer */}
            <div className="bg-stone-50 border-t border-stone-100 px-5 py-5">
              <p className="text-gray-500 text-sm text-center mb-3">
                フォームが表示されない場合はこちら
              </p>
              <a
                href={FORM_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl text-base transition-all duration-300 w-full"
              >
                <ExternalLink size={18} />
                フォームを直接開く
              </a>
            </div>
          </div>

          {/* Post-form contact */}
          <div className="mt-10 text-center space-y-4">
            <p className="text-white/60 text-sm">ご不明な点はお気軽にご連絡ください</p>
            <a
              href="mailto:retreat-eia@zen-retreat-asia.com"
              className="flex items-center justify-center gap-2 text-amber-300 hover:text-amber-200 transition-colors text-base"
            >
              <Mail size={18} />
              retreat-eia@zen-retreat-asia.com
            </a>
            <a
              href="tel:+639560831462"
              className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors text-base"
            >
              <Phone size={18} />
              +63 956 083 1462（Taka）
            </a>
          </div>
        </div>
      </section>

      {/* ======== FOOTER STRIP ======== */}
      <section className="py-6 bg-amber-600">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex flex-col items-center gap-3 text-white text-center">
            <div className="font-semibold text-base">ZEN RETREAT ASIA × EIA by DAWATA</div>
            <a href="mailto:retreat-eia@zen-retreat-asia.com" className="flex items-center gap-2 hover:text-amber-200 transition-colors text-sm">
              <Mail size={15} />
              retreat-eia@zen-retreat-asia.com
            </a>
            <a href="tel:+639560831462" className="flex items-center gap-2 hover:text-amber-200 transition-colors text-sm">
              <Phone size={15} />
              +63 956 083 1462（Taka）
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EiaSundayYoga;
