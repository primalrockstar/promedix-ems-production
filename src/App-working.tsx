// Working version of ProMedix EMS - Adding proper header with navigation
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, Sun, Moon, User, ChevronDown } from 'lucide-react';
import EMTBNavigation from './components/emtb/EMTBNavigation';
import WelcomePage from './components/WelcomePage';
import DisclaimerPage from './components/DisclaimerPage';
import MedicalDisclaimer from './components/MedicalDisclaimer';
import BottomNavigation from './components/BottomNavigation';

// Simple dropdown menu component
const MoreMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Study Modules', path: '/modules' },
    { label: 'Protocols', path: '/protocols' },
    { label: 'Medications', path: '/medications' },
    { label: 'Tools', path: '/tools' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Menu className="w-4 h-4" />
        <span className="text-sm font-medium">Menu</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Simple login dropdown component
const LoginDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <User className="w-4 h-4" />
        <span className="text-sm font-medium">Login</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg">
            Student Login
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-lg">
            Instructor Login
          </button>
        </div>
      )}
    </div>
  );
};

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Disclaimer Banner */}
        {showDisclaimerBanner && (
          <MedicalDisclaimer 
            variant="banner" 
            onClose={() => setShowDisclaimerBanner(false)}
            showOnce={true}
          />
        )}
        
        {/* Desktop Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 items-center px-6 py-4">
              {/* Left: Dropdown Menu */}
              <div className="flex justify-start">
                <MoreMenu />
              </div>

              {/* Center: Prominent Logo & Tagline */}
              <div className="flex justify-center">
                <Link to="/" className="flex flex-col items-center">
                  <div className="flex items-center mb-2">
                    <img 
                      src="/assets/LOGOFINAL.png" 
                      alt="ProMedix EMS Logo" 
                      className="w-80 h-80 object-contain"
                      style={{ background: 'transparent' }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium text-center">
                    Next-Gen Education Tool for Emergency Medical Services
                  </div>
                </Link>
              </div>

              {/* Right: Dark Mode & Login */}
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <LoginDropdown />
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden">
            <div className="grid grid-cols-3 items-center px-4 py-3">
              {/* Left: Menu */}
              <div className="flex justify-start">
                <MoreMenu />
              </div>

              {/* Center: Logo & Tagline */}
              <div className="flex justify-center">
                <Link to="/" className="flex flex-col items-center">
                  <img 
                    src="/assets/LOGOFINAL.png" 
                    alt="ProMedix EMS Logo" 
                    className="w-48 h-48 object-contain"
                    style={{ background: 'transparent' }}
                  />
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium text-center mt-1">
                    Next-Gen Education Tool for Emergency Medical Services
                  </div>
                </Link>
              </div>

              {/* Right: Dark Mode & Login */}
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <LoginDropdown />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-4 min-h-[calc(100vh-200px)] pb-20 lg:pb-4">
          <Routes>
            <Route path="/" element={<EMTBNavigation />} />
            <Route path="*" element={
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400">The page {window.location.pathname} could not be found.</p>
              </div>
            } />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto mb-16 lg:mb-0">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <img 
                    src="/assets/LOGOFINAL.png" 
                    alt="ProMedix EMS Logo" 
                    className="w-12 h-12 object-contain mr-3"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">ProMedix EMS</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Next-Gen Education Tool for Emergency Medical Services</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Empowering emergency medical professionals with cutting-edge training tools, 
                  comprehensive protocols, and innovative learning solutions.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  © 2025 ProMedix EMS. All rights reserved.
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link></li>
                  <li><Link to="/modules" className="hover:text-blue-600 dark:hover:text-blue-400">Study Modules</Link></li>
                  <li><Link to="/protocols" className="hover:text-blue-600 dark:hover:text-blue-400">Protocols</Link></li>
                  <li><Link to="/medications" className="hover:text-blue-600 dark:hover:text-blue-400">Medications</Link></li>
                  <li><Link to="/tools" className="hover:text-blue-600 dark:hover:text-blue-400">Tools</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Support</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><button className="hover:text-blue-600 dark:hover:text-blue-400">Help Center</button></li>
                  <li><button className="hover:text-blue-600 dark:hover:text-blue-400">Contact Us</button></li>
                  <li><button className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</button></li>
                  <li><button className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</button></li>
                  <li><button 
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setShowFullDisclaimer(true)}
                  >
                    Medical Disclaimer
                  </button></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile Bottom Navigation */}
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
