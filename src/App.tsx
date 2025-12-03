import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
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

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/en" element={<Home />} />
              <Route path="/retreats" element={<Retreats />} />
              <Route path="/en/retreats" element={<Retreats />} />
              <Route path="/retreat/:id" element={<RetreatDetail />} />
              <Route path="/en/retreat/:id" element={<RetreatDetail />} />
              <Route path="/japan" element={<Japan />} />
              <Route path="/en/japan" element={<Japan />} />
              <Route path="/cebu" element={<Cebu />} />
              <Route path="/en/cebu" element={<Cebu />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/en/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/en/blog/:slug" element={<BlogArticle />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/en/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/en/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/en/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/en/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;