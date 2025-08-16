// Working version of ProMedix EMS - Minimal with just EMTBNavigation
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EMTBNavigation from './components/emtb/EMTBNavigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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
