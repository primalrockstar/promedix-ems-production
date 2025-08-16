import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Heart, Activity, Calculator, Menu, Home, FileText } from 'lucide-react';

// Simple Dashboard Component
const SimpleDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Large Logo */}
              <img 
                src="/assets/promedix-logo.svg" 
                alt="ProMedix EMS" 
                className="w-96 h-auto md:w-48 lg:w-96"
              />
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/study" className="text-gray-700 hover:text-blue-600">Study</Link>
              <Link to="/protocols" className="text-gray-700 hover:text-blue-600">Protocols</Link>
              <Link to="/tools" className="text-gray-700 hover:text-blue-600">Tools</Link>
            </nav>
          </div>
        </header>

        {/* Welcome Message */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to ProMedix EMS</h1>
          <p className="text-gray-600 text-lg">Your comprehensive EMT-B training platform with 45 chapters and 14 modules</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold">14 Modules</h3>
                <p className="text-gray-600">Complete training program</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold">45 Chapters</h3>
                <p className="text-gray-600">Detailed study notes</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Calculator className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold">Clinical Tools</h3>
                <p className="text-gray-600">Calculators & protocols</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Study Modules */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Study Modules</h2>
            <div className="space-y-3">
              {[
                'Foundations of EMS Practice',
                'Clinical Fundamentals', 
                'Clinical Assessment',
                'Critical Interventions',
                'Medication Management'
              ].map((module, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <span className="font-medium">{module}</span>
                  <span className="text-sm text-gray-500">Module {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 text-blue-700">
                <BookOpen className="w-6 h-6 mr-2" />
                Study Notes
              </button>
              <button className="flex items-center justify-center p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 text-green-700">
                <Activity className="w-6 h-6 mr-2" />
                Protocols
              </button>
              <button className="flex items-center justify-center p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 text-purple-700">
                <Calculator className="w-6 h-6 mr-2" />
                Calculators
              </button>
              <button className="flex items-center justify-center p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 text-red-700">
                <Heart className="w-6 h-6 mr-2" />
                Medications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Study Page
const StudyPage = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Study Materials</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-4">45 Chapters Available</h2>
        <p className="text-gray-600">Comprehensive EMT-B study materials covering all essential topics.</p>
      </div>
    </div>
  </div>
);

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SimpleDashboard />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/protocols" element={<div className="p-6"><h1>Protocols Coming Soon</h1></div>} />
        <Route path="/tools" element={<div className="p-6"><h1>Tools Coming Soon</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
