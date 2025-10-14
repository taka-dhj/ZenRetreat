import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Retreats from './pages/Retreats';
import RetreatDetail from './pages/RetreatDetail';
import Domestic from './pages/Domestic';
import International from './pages/International';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
              <Route path="/domestic" element={<Domestic />} />
              <Route path="/en/domestic" element={<Domestic />} />
              <Route path="/international" element={<International />} />
              <Route path="/en/international" element={<International />} />
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