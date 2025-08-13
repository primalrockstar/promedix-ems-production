import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, Zap } from 'lucide-react';

interface WelcomePageProps {
  onComplete: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(15);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300); // Wait for fade out animation
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-[100] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* Main Logo and Branding */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 100 100" className="text-blue-600 drop-shadow-lg">
                <rect x="35" y="10" width="30" height="80" rx="4" fill="currentColor" />
                <rect x="10" y="35" width="80" height="30" rx="4" fill="currentColor" />
                <path
                  d="M15 50 L25 50 L30 40 L35 60 L40 30 L45 70 L50 50 L85 50"
                  stroke="#60A5FA"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse"
                />
              </svg>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-blue-600">ProMedix</span>
            <span className="text-gray-600 dark:text-gray-300">EMS</span>
            <sup className="text-lg text-gray-400">™</sup>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-2">
            Next-Gen EMS Education Platform
          </p>
          
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
            🌐 promedix.com
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-xl p-6 shadow-sm">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  Important Medical Disclaimer
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed mb-3">
                  This platform is designed exclusively for educational purposes and EMT training. 
                  The content provided does not constitute medical advice, diagnosis, or treatment recommendations.
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                  <strong>Always follow current local EMS protocols and medical direction.</strong> 
                  In actual emergency situations, contact 911 immediately and follow your agency's established procedures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enter Button and Auto-proceed */}
        <div className="text-center space-y-4">
          <button
            onClick={handleSkip}
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            Enter Training Platform
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {countdown > 0 ? (
              <>Automatically proceeding in <span className="font-mono font-bold text-blue-600">{countdown}s</span></>
            ) : (
              'Loading...'
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📚</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Comprehensive Training</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">EMT-B modules, protocols, and practice scenarios</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💊</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Medication Reference</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Complete drug database with calculations</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🛠️</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Clinical Tools</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Calculators and assessment utilities</p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2025 ProMedix EMS™ - EMT-Basic Training Platform (v1.0)
          </p>
          <p className="text-xs text-blue-400 dark:text-blue-500 mt-1">
            AEMT & Paramedic modules coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
