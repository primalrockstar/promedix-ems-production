import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EMTBNavigation from './components/emtb/EMTBNavigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">ProMedix EMS - Simplified</h1>
        </div>
        <Routes>
          <Route path="/" element={<EMTBNavigation />} />
          <Route path="*" element={<div className="p-8 text-red-500">Route not found: {window.location.pathname}</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
