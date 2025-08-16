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
    { label: 'Dashboard', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Study Modules', action: () => {
      const element = document.getElementById('study');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: 'Protocols', action: () => {
      const element = document.getElementById('emtb');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: 'Medications', action: () => {
      const element = document.getElementById('tools');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: 'Tools', action: () => {
      const element = document.getElementById('more');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }},
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
            <button
              key={index}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg"
            >
              {item.label}
            </button>
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
          <button 
            onClick={() => {
              alert('Student Login - Coming Soon!\n\nFeatures will include:\n• Student Dashboard\n• Progress Tracking\n• Study Materials Access');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg"
          >
            Student Login
          </button>
          <button 
            onClick={() => {
              alert('Instructor Login - Coming Soon!\n\nFeatures will include:\n• Instructor Dashboard\n• Student Management\n• Content Administration');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-lg"
          >
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
    // Temporarily disable welcome for testing - set to false
    return false; // !localStorage.getItem('promedix_welcome_seen');
  });

  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);
  
  const [showDisclaimerBanner, setShowDisclaimerBanner] = useState(() => {
    // Temporarily disable disclaimer banner for testing - set to false  
    return false; // !localStorage.getItem('promedix_disclaimer_accepted');
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
                      className="w-96 h-96 object-contain"
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
            {/* Top Row: Menu and Controls */}
            <div className="flex items-center justify-between px-4 py-2">
              {/* Left: Menu Button */}
              <MoreMenu />

              {/* Right: Dark Mode & Login */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Login"
                >
                  <User className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Row: Large Logo & Tagline */}
            <div className="flex justify-center pb-3">
              <Link to="/" className="flex flex-col items-center">
                <img 
                  src="/assets/LOGOFINAL.png" 
                  alt="ProMedix EMS Logo" 
                  className="w-48 h-48 object-contain"
                />
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium text-center mt-1">
                  Next-Gen Education Tool for Emergency Medical Services
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-4 min-h-[calc(100vh-200px)] pb-20 lg:pb-4">
          <Routes>
            <Route path="/" element={<EMTBNavigation />} />
            <Route path="/emtb/calculators" element={
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">EMT-B Calculators</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Glasgow Coma Scale</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Assess level of consciousness</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Open Calculator
                    </button>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Pediatric Vital Signs</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Age-based vital sign ranges</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Open Calculator
                    </button>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Rule of Nines</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Calculate burn surface area</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Open Calculator
                    </button>
                  </div>
                </div>
              </div>
            } />
            <Route path="/emtb/protocols" element={
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">EMT-B Protocols</h1>
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Primary Assessment</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Initial patient evaluation protocol</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span>Scene safety and BSI</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span>General impression</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span>Airway assessment</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Airway Management</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Comprehensive airway protocols</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        <span>Head-tilt chin-lift</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        <span>Jaw-thrust maneuver</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        <span>Suction techniques</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/emtb/medications" element={
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">EMT-B Medications</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4 text-red-600">Oxygen</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Classification:</strong> Gas</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Indications:</strong> Hypoxia, Respiratory distress</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Dosage:</strong> 2-15 LPM as needed</p>
                    <p className="text-gray-600 dark:text-gray-400"><strong>Route:</strong> Inhalation</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4 text-red-600">Epinephrine</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Classification:</strong> Sympathomimetic</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Indications:</strong> Anaphylaxis, Severe asthma</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Dosage:</strong> 0.3mg (Adult), 0.15mg (Pediatric)</p>
                    <p className="text-gray-600 dark:text-gray-400"><strong>Route:</strong> Intramuscular</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4 text-red-600">Aspirin</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Classification:</strong> Antiplatelet</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Indications:</strong> Chest pain, Suspected MI</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Dosage:</strong> 160-325mg chewed</p>
                    <p className="text-gray-600 dark:text-gray-400"><strong>Route:</strong> Oral</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4 text-red-600">Oral Glucose</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Classification:</strong> Carbohydrate</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Indications:</strong> Hypoglycemia (conscious patient)</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Dosage:</strong> 15-20g tube</p>
                    <p className="text-gray-600 dark:text-gray-400"><strong>Route:</strong> Oral</p>
                  </div>
                </div>
              </div>
            } />
            <Route path="/emtb/flashcards" element={
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">EMT-B Flashcards</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-700">
                    <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">Patient Assessment Cards</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Interactive cards for patient evaluation</p>
                    <div className="text-sm text-purple-600 dark:text-purple-400 mb-4">47 Cards Available</div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                      Start Study Session
                    </button>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-700">
                    <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">Airway & Breathing</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Respiratory assessment and management</p>
                    <div className="text-sm text-purple-600 dark:text-purple-400 mb-4">52 Cards Available</div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                      Start Study Session
                    </button>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-700">
                    <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">Medication Cards</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">EMT-B scope medications and dosages</p>
                    <div className="text-sm text-purple-600 dark:text-purple-400 mb-4">38 Cards Available</div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                      Start Study Session
                    </button>
                  </div>
                </div>
              </div>
            } />
            <Route path="/emtb/study-notes" element={
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">EMT-B Study Notes</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-2 border-yellow-200 dark:border-yellow-700">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-800 dark:text-yellow-200">Chapter 1: EMS Systems</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Introduction to Emergency Medical Services</p>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-4">Complete Study Guide</div>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
                      Read Chapter
                    </button>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-2 border-yellow-200 dark:border-yellow-700">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-800 dark:text-yellow-200">Chapter 2: Workforce Safety</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Safety and wellness principles</p>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-4">Complete Study Guide</div>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
                      Read Chapter
                    </button>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-2 border-yellow-200 dark:border-yellow-700">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-800 dark:text-yellow-200">Chapter 3: Medical, Legal, Ethics</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Legal and ethical considerations</p>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-4">Complete Study Guide</div>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
                      Read Chapter
                    </button>
                  </div>
                </div>
              </div>
            } />
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
                  <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-600 dark:hover:text-blue-400 text-left">Dashboard</button></li>
                  <li><button onClick={() => {
                    const element = document.getElementById('study');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }} className="hover:text-blue-600 dark:hover:text-blue-400 text-left">Study Modules</button></li>
                  <li><button onClick={() => {
                    const element = document.getElementById('emtb');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }} className="hover:text-blue-600 dark:hover:text-blue-400 text-left">Protocols</button></li>
                  <li><button onClick={() => {
                    const element = document.getElementById('tools');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }} className="hover:text-blue-600 dark:hover:text-blue-400 text-left">Medications</button></li>
                  <li><button onClick={() => {
                    const element = document.getElementById('more');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }} className="hover:text-blue-600 dark:hover:text-blue-400 text-left">Tools</button></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Support</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><button 
                    onClick={() => alert('Help Center - Coming Soon!\n\nWe\'re building comprehensive help documentation including:\n• Getting Started Guide\n• Feature Tutorials\n• Troubleshooting\n• FAQ Section')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 text-left"
                  >Help Center</button></li>
                  <li><button 
                    onClick={() => alert('Contact Us - Coming Soon!\n\nReach out to our team:\n• Technical Support\n• General Inquiries\n• Feature Requests\n• Bug Reports')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 text-left"
                  >Contact Us</button></li>
                  <li><button 
                    onClick={() => alert('Privacy Policy - Coming Soon!\n\nOur commitment to your privacy:\n• Data Protection\n• Information Usage\n• Cookie Policy\n• User Rights')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 text-left"
                  >Privacy Policy</button></li>
                  <li><button 
                    onClick={() => alert('Terms of Service - Coming Soon!\n\nPlatform usage terms:\n• User Responsibilities\n• Service Limitations\n• Account Guidelines\n• Legal Information')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 text-left"
                  >Terms of Service</button></li>
                  <li><button 
                    className="hover:text-blue-600 dark:hover:text-blue-400 text-left"
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
