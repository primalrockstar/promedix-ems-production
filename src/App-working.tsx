// Working version of ProMedix EMS - Adding welcome/disclaimer flow
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EMTBNavigation from './components/emtb/EMTBNavigation';
import WelcomePage from './components/WelcomePage';
import DisclaimerPage from './components/DisclaimerPage';
import MedicalDisclaimer from './components/MedicalDisclaimer';

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('promedix_welcome_seen');
  });

  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);
  
  const [showDisclaimerBanner, setShowDisclaimerBanner] = useState(() => {
    return !localStorage.getItem('promedix_disclaimer_accepted');
  });

  const handleWelcomeComplete = () => {
    localStorage.setItem('promedix_welcome_seen', 'true');
    setShowWelcome(false);
    setShowFullDisclaimer(true);
  };

  const handleDisclaimerComplete = () => {
    localStorage.setItem('promedix_disclaimer_accepted', 'true');
    setShowFullDisclaimer(false);
    setShowDisclaimerBanner(false);
  };

  // Show welcome page
  if (showWelcome) {
    return <WelcomePage onComplete={handleWelcomeComplete} />;
  }

  // Show full disclaimer page
  if (showFullDisclaimer) {
    return <DisclaimerPage onComplete={handleDisclaimerComplete} autoAdvance={true} />;
  }

  // Main app content
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Disclaimer Banner */}
        {showDisclaimerBanner && (
          <MedicalDisclaimer 
            variant="banner" 
            onClose={() => setShowDisclaimerBanner(false)}
            showOnce={true}
          />
        )}
        
        {/* Simple Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-center">
              <img 
                src="/assets/LOGOFINAL.png" 
                alt="ProMedix EMS Logo" 
                className="w-16 h-16 object-contain"
                style={{ background: 'transparent' }}
              />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">ProMedix EMS</h1>
                <p className="text-sm text-gray-600">Your trusted companion to formal EMT-B training</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<EMTBNavigation />} />
            <Route path="*" element={
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                <p className="text-gray-600">The page {window.location.pathname} could not be found.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
