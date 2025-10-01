import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Retreats from './pages/Retreats';
import RetreatDetail from './pages/RetreatDetail';
import Domestic from './pages/Domestic';
import International from './pages/International';
import Instructors from './pages/Instructors';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import CancellationPolicy from './pages/CancellationPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <LanguageProvider>
      <Router>
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
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/en/instructors" element={<Instructors />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/en/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/en/blog" element={<Blog />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/en/faq" element={<FAQ />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />
              <Route path="/en/cancellation-policy" element={<CancellationPolicy />} />
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