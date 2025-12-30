import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  ja: {
    'nav.retreats': 'リトリート一覧',
    'nav.japan': '日本ツアー',
    'nav.cebu': 'セブツアー',
    'nav.instructors': 'インストラクター',
    'nav.contact': 'お問い合わせ',
    'nav.blog': 'ブログ',
    'hero.title': '頑張りすぎた心と体を、ゼロに戻す旅。',
    'hero.subtitle': '忙しい日常を離れ、自然と静寂に包まれる数日間。『本来のあなた』を取り戻すリトリート旅。',
    'hero.cta': '心身をリセットするプランを見る',
    'about.title': '私たちについて',
    'about.description': 'ZEN RETREAT ASIAでは、ホリスティックなウェルネスアプローチを通じて、心身の調和を目指しています。日本の伝統的な癒しの知恵と現代のウェルネス技術を融合し、真の癒しを提供いたします。',
    'retreats.featured': 'おすすめリトリート',
    'retreats.japan': '日本リトリート',
    'retreats.cebu': 'セブリトリート',
    'common.learn-more': '詳細を見る',
    'common.days': '日間',
    'common.capacity': '定員',
    'common.people': '名',
    'contact.form.name': 'お名前',
    'contact.form.email': 'メールアドレス',
    'contact.form.retreat': '希望リトリート',
    'contact.form.message': 'お問い合わせ内容',
    'contact.form.submit': '送信する',
    'contact.form.select': '選択してください',
    'footer.company': '会社情報',
    'footer.support': 'サポート',
    'footer.follow': 'フォローしてください',
    'retreat.overview': 'リトリート概要',
    'retreat.program': 'プログラム詳細',
    'retreat.includes': '体験内容例',
    'retreat.schedule': 'スケジュール例',
    'instructor.specialty': '専門',
    'instructor.qualifications': '資格',
    'home.why.title': 'ZEN RETREAT ASIAを選ぶ理由',
    'home.why.expertise': '専門知識',
    'home.why.expertise.desc': '経験豊富なインストラクターによる本格的な指導',
    'home.why.locations': '厳選された場所',
    'home.why.locations.desc': '日本の美しい自然と伝統文化が体験できる特別な場所',
    'home.why.holistic': 'ホリスティックアプローチ',
    'home.why.holistic.desc': '心・体・精神の調和を重視した総合的なプログラム',
  },
  en: {
    'nav.retreats': 'All Retreats',
    'nav.japan': 'Japan Tours',
    'nav.cebu': 'Cebu Tours',
    'nav.instructors': 'Instructors',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'hero.title': 'Deepen Your Bond in the Silence of Japan.',
    'hero.subtitle': 'An exclusive spiritual journey for you. Experience authentic Zen meditation and nature, hand in hand.',
    'hero.cta': 'Discover Hidden Retreat',
    'about.title': 'About Us',
    'about.description': 'At ZEN RETREAT ASIA, we aim for harmony of mind and body through a holistic wellness approach. We combine traditional Japanese healing wisdom with modern wellness techniques to provide true healing.',
    'retreats.featured': 'Featured Retreats',
    'retreats.japan': 'Japan Retreats',
    'retreats.cebu': 'Cebu Retreats',
    'common.learn-more': 'Learn More',
    'common.days': ' Days',
    'common.capacity': 'Max',
    'common.people': ' participants',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.retreat': 'Preferred Retreat',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.select': 'Please select',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.follow': 'Follow Us',
    'retreat.overview': 'Retreat Overview',
    'retreat.program': 'Program Details',
    'retreat.includes': 'Sample Activities',
    'retreat.schedule': 'Sample Schedule',
    'instructor.specialty': 'Specialty',
    'instructor.qualifications': 'Qualifications',
    'home.why.title': 'Why Choose ZEN RETREAT ASIA',
    'home.why.expertise': 'Expertise',
    'home.why.expertise.desc': 'Authentic guidance by experienced instructors',
    'home.why.locations': 'Curated Locations',
    'home.why.locations.desc': 'Special places where you can experience Japan\'s beautiful nature and traditional culture',
    'home.why.holistic': 'Holistic Approach',
    'home.why.holistic.desc': 'Comprehensive programs focusing on harmony of mind, body, and spirit',
  }
};

const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  const path = window.location.pathname;
  if (path.startsWith('/ja')) return 'ja';
  
  const stored = localStorage.getItem('preferredLang') as Language;
  if (stored && ['ja', 'en'].includes(stored)) return stored;
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  return browserLang.startsWith('ja') ? 'ja' : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    setLanguage(detectBrowserLanguage());
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferredLang', lang);
    
    const currentPath = window.location.pathname;
    let newPath: string;
    
    // 現在のパスから言語プレフィックスを除去
    const pathWithoutLang = currentPath.replace(/^\/(ja|en)/, '') || '/';
    
    if (lang === 'ja') {
      // 日本語の場合は /ja を追加
      newPath = '/ja' + pathWithoutLang;
    } else {
      // 英語の場合はプレフィックスなし
      newPath = pathWithoutLang;
    }
    
    window.history.pushState({}, '', newPath);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
      {children}
    </LanguageContext.Provider>
  );
};