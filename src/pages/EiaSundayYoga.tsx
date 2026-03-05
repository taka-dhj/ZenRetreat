import React, { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, Phone, Mail, ChevronDown, ChevronUp, Star, Users, Leaf, Heart, Sunrise, ExternalLink } from 'lucide-react';

// Google Form URL
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScHxDk3I7DcBB_eMJlxeOfFMR7s3kgOlMR5sxD5A6C9q03R4A/viewform?embedded=true';
const FORM_DIRECT_URL = 'https://forms.gle/mH7ur3Bqe78ReFxX7';

const EiaSundayYoga: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formLoaded, setFormLoaded] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formSectionRef = useRef<HTMLElement>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Intersection Observer でフォームセクションが見えたらiframeをロード
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
    if (formSectionRef.current) {
      observer.observe(formSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('apply-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const schedule = [
    { time: '11:30', label: '開場・受付', en: 'Doors open & Check-in', icon: '🚪' },
    { time: '12:00', label: 'ビギナーヨガ', en: 'Beginner Yoga', icon: '🧘' },
    { time: '13:00', label: '有機野菜ランチ', en: 'Organic Lunch', icon: '🥗' },
    { time: '14:00', label: 'ガイド瞑想', en: 'Guided Meditation', icon: '🌿' },
    { time: '14:30', label: 'ビジョンボード作成', en: 'Vision Board Making', icon: '✨' },
    { time: '15:15', label: 'シェアタイム', en: 'Sharing Time', icon: '💬' },
    { time: '16:00', label: '終了・解散', en: 'End', icon: '🌅' },
  ];

  const dates = [
    { date: '3/22', day: '日', month: '3月', full: '2025年3月22日（日）' },
    { date: '4/5',  day: '日', month: '4月', full: '2025年4月5日（日）' },
    { date: '4/26', day: '日', month: '4月', full: '2025年4月26日（日）' },
  ];

  const testimonials = [
    {
      name: 'M.T さん (32歳)',
      role: '会社員',
      comment: '初めてのヨガで不安でしたが、先生がとても丁寧で、終わった後は体も心もすっきりしました。有機野菜ランチもとても美味しくて、また参加したいです！',
      stars: 5,
    },
    {
      name: 'Y.K さん (28歳)',
      role: 'フリーランス',
      comment: '英語に自信がなかったのですが、簡単な英語のみで用語集も配布してもらえて安心でした。瞑想の時間が特に心に響きました。ビジョンボードも楽しかった！',
      stars: 5,
    },
    {
      name: 'R.N さん (35歳)',
      role: '看護師',
      comment: '普段なかなか自分の時間が取れないのですが、このリトリートで久しぶりに自分と向き合う時間を持てました。会場のEIAもとても雰囲気が良くて癒されます。',
      stars: 5,
    },
    {
      name: 'S.H さん (26歳)',
      role: '大学生',
      comment: '学生割引もあって気軽に参加できました。ビジョンボード作りでこれからの目標が明確になって、参加してよかったです！タカ先生のお話もとても印象的でした。',
      stars: 5,
    },
  ];

  const highlights = [
    {
      icon: <Leaf size={28} className="text-emerald-600" />,
      title: '初心者歓迎のヨガ',
      desc: 'ヨガ経験ゼロでも大丈夫。超シンプルな英語のみ使用＆事前に用語集も配布。誰でも安心して参加できます。',
      bg: 'bg-emerald-50',
    },
    {
      icon: <Leaf size={28} className="text-lime-600" />,
      title: '有機野菜ランチ',
      desc: '地元の有機野菜をたっぷり使ったヘルシーなランチ付き。体の中からもきれいに。',
      bg: 'bg-lime-50',
    },
    {
      icon: <Heart size={28} className="text-rose-500" />,
      title: 'ガイド瞑想',
      desc: '忙しい日常から完全に離れ、丁寧にガイドされる瞑想で深いリラックスを体験。',
      bg: 'bg-rose-50',
    },
    {
      icon: <Star size={28} className="text-amber-500" />,
      title: 'ビジョンボード作成',
      desc: '自分の未来を視覚化するビジョンボードを作成。自分の本当にやりたいことが見えてくる時間。',
      bg: 'bg-amber-50',
    },
    {
      icon: <Users size={28} className="text-blue-500" />,
      title: 'コミュニティ',
      desc: 'シェアタイムで新しい仲間と出会える。同じ志を持つ人たちとのつながりが生まれます。',
      bg: 'bg-blue-50',
    },
    {
      icon: <Sunrise size={28} className="text-purple-500" />,
      title: '日英バイリンガル',
      desc: 'タカ（日本語・英語）が対応。在住日本人はもちろん、英語話者も一緒に参加できます。',
      bg: 'bg-purple-50',
    },
  ];

  const faqs = [
    {
      q: 'ヨガが初めてでも参加できますか？',
      a: 'もちろんです！このリトリートはビギナーヨガを中心としており、初心者の方を大歓迎しています。柔軟性や体力は必要ありません。ヨガマットや道具もご用意しています。',
    },
    {
      q: '英語が話せなくても大丈夫ですか？',
      a: 'ご安心ください！使用するのは超シンプルな英語のみです。事前にヨガ・瞑想の用語集も配布しますので、英語レベルは問いません。日本語でのフォローも可能です（日本語OK：タカ）。',
    },
    {
      q: '何を持参すればよいですか？',
      a: '動きやすい服装でお越しください。ヨガマット・小道具は会場にご用意があります。タオルと水筒（または水）をお持ちいただけると快適です。ランチはご用意しています。',
    },
    {
      q: '学生割引はありますか？',
      a: 'はい！学生の方は特別割引価格でご参加いただけます。申し込みフォームにて学生である旨をご記入ください。詳細はお申し込み確認後にご連絡します。',
    },
    {
      q: '会場へのアクセスを教えてください。',
      a: 'EIA by DAWATA（バニラッド、カントリーモール近く）です。ITパークから車で約8分のところにあります。詳しいアクセス方法はお申し込み後にご連絡します。',
    },
    {
      q: 'キャンセルポリシーを教えてください。',
      a: '開催3日前まではキャンセルを承ります。それ以降のキャンセルについてはご返金が難しい場合があります。詳細はお申し込み時にご確認ください。',
    },
  ];

  return (
    <div className="pt-16 min-h-screen">

      {/* ======== HERO ======== */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=1600')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Brand badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white/90 px-5 py-2 rounded-full text-sm font-light tracking-widest mb-8">
            <span className="text-emerald-300">ZEN RETREAT ASIA</span>
            <span className="text-white/40">×</span>
            <span className="text-teal-300">EIA by DAWATA</span>
          </div>

          <p className="text-white/80 text-base md:text-lg font-light tracking-[0.2em] mb-4">
            忙しさから離れ、自分を見つめ直す週末
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 leading-tight drop-shadow-2xl tracking-tight">
            SUNDAY RETREAT
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-emerald-300 tracking-[0.3em] mb-3">
            EIA
          </h2>
          <p className="text-white/60 text-lg md:text-xl italic mb-10">
            "Take A Pose, Find Yourself"
          </p>

          {/* Date badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {dates.map((d, i) => (
              <div key={i} className="bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-2xl px-6 py-3 text-center min-w-[80px]">
                <div className="text-xs text-white/60 tracking-widest mb-0.5">{d.month}</div>
                <div className="text-2xl font-bold">{d.date}</div>
                <div className="text-xs text-emerald-300 mt-0.5">日曜日</div>
              </div>
            ))}
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-5 px-12 rounded-full text-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50"
            >
              今すぐ申し込む ↓
            </button>
            <a
              href="#schedule"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/40 text-white font-medium py-5 px-8 rounded-full text-lg backdrop-blur-sm transition-all duration-300"
            >
              詳細を見る
            </a>
          </div>

          <div className="inline-flex items-center gap-3 text-white/80 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <span className="text-2xl font-bold text-white">₱2,000</span>
            <span className="text-white/50">|</span>
            <span className="text-white/70 text-sm">学生割引あり</span>
            <span className="text-white/50">|</span>
            <span className="text-white/70 text-sm">有機ランチ込み</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={28} className="text-white/40" />
        </div>
      </section>

      {/* ======== ABOUT ======== */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-emerald-600 text-xs tracking-widest font-semibold mb-3 uppercase">About This Retreat</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6">
              忙しい日常から一歩下がって、<br />
              <span className="text-emerald-600 font-medium">特別な週末を</span>
            </h2>
            <div className="w-16 h-0.5 bg-emerald-400 mx-auto mb-8" />
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              日々の忙しさに追われて、自分のことを後回しにしていませんか？<br />
              EIA SUNDAY RETREATは、セブ島の緑あふれるスペースで、
              ヨガ・瞑想・有機ランチ・ビジョンボードを通じて
              <strong className="text-gray-800">「本当の自分」</strong>と向き合う半日リトリートです。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🌿', title: '心を整える', desc: 'ヨガと瞑想で日常のストレスをリリース。静けさの中で本来の自分に戻る時間。' },
              { emoji: '✨', title: '未来を描く',  desc: 'ビジョンボード作成で自分の夢や目標を可視化。新しい一歩を踏み出すきっかけに。' },
              { emoji: '🤝', title: '仲間と繋がる', desc: '同じ気持ちを持つ仲間と出会い、シェアすることで心が軽くなる。新しいコミュニティへ。' },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm text-center border border-stone-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{c.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== HIGHLIGHTS ======== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-emerald-600 text-xs tracking-widest font-semibold mb-3 uppercase">What's Included</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              リトリートの<span className="text-emerald-600 font-medium">コンテンツ</span>
            </h2>
            <div className="w-16 h-0.5 bg-emerald-400 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <div key={i} className={`${h.bg} rounded-2xl p-7 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
                <div className="mb-4">{h.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{h.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SCHEDULE ======== */}
      <section id="schedule" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-emerald-600 text-xs tracking-widest font-semibold mb-3 uppercase">Schedule</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              当日の<span className="text-emerald-600 font-medium">タイムテーブル</span>
            </h2>
            <div className="w-16 h-0.5 bg-emerald-400 mx-auto mb-5" />
            <div className="inline-flex items-center gap-2 text-gray-600 text-sm bg-white/80 px-4 py-2 rounded-full border border-emerald-100">
              <Clock size={14} className="text-emerald-500" />
              11:30am – 4:00pm
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-[72px] top-3 bottom-3 w-0.5 bg-emerald-200 hidden sm:block" />
            <div className="space-y-4">
              {schedule.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-14 flex-shrink-0 text-right">
                    <span className="text-sm font-bold text-emerald-600">{item.time}</span>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-md flex items-center justify-center z-10 hidden sm:flex">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 bg-white rounded-xl px-5 py-4 shadow-sm border border-emerald-50 group-hover:border-emerald-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm md:text-base">{item.label}</div>
                        <div className="text-xs text-gray-400">{item.en}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======== VENUE + INFO ======== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-emerald-600 text-xs tracking-widest font-semibold mb-3 uppercase">Venue & Details</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              開催<span className="text-emerald-600 font-medium">詳細</span>
            </h2>
            <div className="w-16 h-0.5 bg-emerald-400 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/5537213/pexels-photo-5537213.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="EIA by DAWATA venue"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="space-y-5">
              {[
                { bg: 'bg-emerald-100', content: <><div className="text-xs text-gray-400 tracking-widest mb-1">開催日程</div><div className="font-semibold text-gray-800 space-y-0.5">{dates.map((d, i) => <div key={i}>{d.full}</div>)}</div></>, icon: '📅' },
                { bg: 'bg-teal-100',    content: <><div className="text-xs text-gray-400 tracking-widest mb-1">時間</div><div className="font-semibold text-gray-800">11:30am – 4:00pm</div></>, icon: null, iconEl: <Clock size={18} className="text-teal-600" /> },
                { bg: 'bg-blue-100',   content: <><div className="text-xs text-gray-400 tracking-widest mb-1">会場</div><div className="font-semibold text-gray-800">EIA by DAWATA</div><div className="text-gray-500 text-sm">Near Country Mall, Banilad</div><div className="text-gray-500 text-sm">IT Parkから車で約8分</div></>, icon: null, iconEl: <MapPin size={18} className="text-blue-600" /> },
                { bg: 'bg-amber-100',  content: <><div className="text-xs text-gray-400 tracking-widest mb-1">参加費</div><div className="font-bold text-2xl text-emerald-600">₱2,000</div><div className="text-gray-500 text-sm">学生割引あり（For Student）</div></>, icon: '💰' },
                { bg: 'bg-purple-100', content: <><div className="text-xs text-gray-400 tracking-widest mb-1">言語</div><div className="font-semibold text-gray-800">日本語 & English</div><div className="text-gray-500 text-sm">超シンプルな英語のみ・事前に用語集配布</div></>, icon: '🌐' },
                { bg: 'bg-rose-100',   content: <><div className="text-xs text-gray-400 tracking-widest mb-1">お問い合わせ（Taka）</div><div className="font-semibold text-gray-800">+63 956 083 1462</div><div className="text-gray-500 text-sm">日本語 or English OK</div></>, icon: null, iconEl: <Phone size={18} className="text-rose-500" /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    {item.icon ? <span className="text-lg">{item.icon}</span> : item.iconEl}
                  </div>
                  <div>{item.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======== GALLERY ======== */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-emerald-600 text-xs tracking-widest font-semibold mb-3 uppercase">Gallery</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              リトリートの<span className="text-emerald-600 font-medium">雰囲気</span>
            </h2>
            <div className="w-16 h-0.5 bg-emerald-400 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div className="col-span-2 rounded-2xl overflow-hidden">
              <img src="https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Yoga class" className="w-full h-72 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Meditation" className="w-full h-72 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Organic lunch" className="w-full h-52 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Yoga pose" className="w-full h-52 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Yoga studio" className="w-full h-52 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ======== TESTIMONIALS ======== */}
      <section className="py-20 bg-gradient-to-br from-emerald-700 to-teal-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-36 translate-x-36" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-28 -translate-x-28" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-emerald-300 text-xs tracking-widest font-semibold mb-3 uppercase">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              参加者の<span className="text-emerald-300 font-medium">声</span>
            </h2>
            <div className="w-16 h-0.5 bg-emerald-400 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 hover:bg-white/15 transition-all duration-300">
                <div className="flex mb-3 gap-0.5">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-400/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/60 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== UPCOMING DATES ======== */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-emerald-600 text-xs tracking-widest font-semibold mb-3 uppercase">Upcoming Dates</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              開催<span className="text-emerald-600 font-medium">スケジュール</span>
            </h2>
            <div className="w-16 h-0.5 bg-emerald-400 mx-auto" />
          </div>
          <div className="space-y-4">
            {dates.map((d, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-2xl px-6 py-5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 group-hover:bg-emerald-200 flex flex-col items-center justify-center transition-colors flex-shrink-0">
                    <span className="text-xs text-emerald-500 font-semibold">{d.month}</span>
                    <span className="text-2xl font-bold text-emerald-700 leading-none">{d.date.split('/')[1]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-lg">{d.full}</div>
                    <div className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
                      <Clock size={12} />
                      11:30am – 4:00pm｜EIA by DAWATA, Banilad
                    </div>
                  </div>
                </div>
                <button
                  onClick={scrollToForm}
                  className="w-full sm:w-auto text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg flex-shrink-0"
                >
                  申し込む
                </button>
              </div>
            ))}
          </div>
          {/* Nudge to form */}
          <p className="text-center text-gray-400 text-sm mt-6">
            ↓ このページ下部の申し込みフォームから簡単にお申し込みいただけます
          </p>
        </div>
      </section>

      {/* ======== FAQ ======== */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-emerald-600 text-xs tracking-widest font-semibold mb-3 uppercase">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              よくある<span className="text-emerald-600 font-medium">ご質問</span>
            </h2>
            <div className="w-16 h-0.5 bg-emerald-400 mx-auto" />
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-emerald-50/50 transition-colors"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="font-semibold text-gray-800 pr-4 text-sm md:text-base">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={20} className="text-emerald-500 flex-shrink-0" />
                    : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-stone-100 pt-4">
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
        className="py-20 bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 relative overflow-hidden"
      >
        {/* BG texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?auto=compress&cs=tinysrgb&w=1200')` }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full -translate-y-40 translate-x-40" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full translate-y-32 -translate-x-32" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-10">
            <span className="inline-block text-emerald-300 text-xs tracking-widest font-semibold mb-4 uppercase">Apply Now</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              参加申し込み
            </h2>
            <p className="text-white/70 text-lg mb-2">
              下記フォームに必要事項をご入力ください。
            </p>
            <p className="text-emerald-300 text-sm">
              ✓ 所要時間：約2分 &nbsp;｜&nbsp; ✓ 無料相談・質問もお気軽に
            </p>
          </div>

          {/* Info pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: '📅', text: '3/22・4/5・4/26 開催' },
              { icon: '💰', text: '参加費 ₱2,000（学割あり）' },
              { icon: '🥗', text: '有機ランチ込み' },
              { icon: '🧘', text: '初心者歓迎' },
            ].map((pill, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-4 py-2 rounded-full text-sm">
                <span>{pill.icon}</span>
                <span>{pill.text}</span>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Form top bar */}
            <div className="bg-emerald-500 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✎</span>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">EIA SUNDAY YOGA 申し込みフォーム</div>
                  <div className="text-emerald-100 text-xs">ZEN RETREAT ASIA × EIA by DAWATA</div>
                </div>
              </div>
              <a
                href={FORM_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-full transition-colors"
              >
                <ExternalLink size={12} />
                別タブで開く
              </a>
            </div>

            {/* iframe */}
            <div className="relative" style={{ minHeight: '680px' }}>
              {!formLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50 z-10">
                  <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mb-4" />
                  <p className="text-gray-500 text-sm">フォームを読み込み中...</p>
                </div>
              )}
              {isFormVisible && (
                <iframe
                  src={FORM_URL}
                  title="EIA Sunday Yoga 申し込みフォーム"
                  width="100%"
                  height="680"
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
            <div className="bg-stone-50 border-t border-stone-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-gray-500 text-xs text-center sm:text-left">
                フォームが表示されない場合は↓から直接お申し込みください
              </p>
              <a
                href={FORM_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-all duration-300 hover:shadow-md flex-shrink-0"
              >
                <ExternalLink size={14} />
                フォームを直接開く
              </a>
            </div>
          </div>

          {/* Post-form contact */}
          <div className="mt-10 text-center space-y-3">
            <p className="text-white/60 text-sm">
              ご不明な点は直接お問い合わせください
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:retreat-eia@zen-retreat-asia.com"
                className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors text-sm"
              >
                <Mail size={15} />
                retreat-eia@zen-retreat-asia.com
              </a>
              <span className="text-white/30 hidden sm:block">|</span>
              <a
                href="tel:+639560831462"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Phone size={15} />
                +63 956 083 1462（Taka）
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======== FOOTER STRIP ======== */}
      <section className="py-6 bg-emerald-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="flex-shrink-0" />
              <a href="mailto:retreat-eia@zen-retreat-asia.com" className="hover:text-emerald-200 transition-colors text-sm font-medium">
                retreat-eia@zen-retreat-asia.com
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="flex-shrink-0" />
              <a href="tel:+639560831462" className="hover:text-emerald-200 transition-colors text-sm font-medium">
                +63 956 083 1462（Taka）
              </a>
            </div>
            <div className="text-emerald-200 text-xs tracking-wider">
              ZEN RETREAT ASIA × EIA by DAWATA
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EiaSundayYoga;
