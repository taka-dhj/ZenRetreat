import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Retreats from './pages/Retreats';
import RetreatDetail from './pages/RetreatDetail';
import Japan from './pages/Japan';
import Cebu from './pages/Cebu';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import Instructors from './pages/Instructors';

// Google Analytics の型定義
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Google Analytics 4: ページビューを送信
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-YM7EKE4SDE', {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname]);

  return null;
}

function LanguageRedirect() {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // ルートパス（/）にアクセスして日本語が検出された場合、/ja/にリダイレクト
    if (pathname === '/' && language === 'ja') {
      navigate('/ja/', { replace: true });
    }
  }, [pathname, language, navigate]);

  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <LanguageRedirect />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ja" element={<Home />} />
              <Route path="/retreats" element={<Retreats />} />
              <Route path="/ja/retreats" element={<Retreats />} />
              <Route path="/retreat/:id" element={<RetreatDetail />} />
              <Route path="/ja/retreat/:id" element={<RetreatDetail />} />
              <Route path="/japan" element={<Japan />} />
              <Route path="/ja/japan" element={<Japan />} />
              <Route path="/cebu" element={<Cebu />} />
              <Route path="/ja/cebu" element={<Cebu />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/ja/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/ja/blog/:slug" element={<BlogArticle />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ja/contact" element={<Contact />} />
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/ja/instructors" element={<Instructors />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/ja/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/ja/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/ja/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </main>
          <Footer />
        </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;