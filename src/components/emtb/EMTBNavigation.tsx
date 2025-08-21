﻿import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Heart, Stethoscope, Clock, Star, ChevronRight, Brain, BookOpen, Target } from 'lucide-react';

const EMTBNavigation: React.FC = () => {
  const navigationCards = [
    {
      title: 'EMT-B Calculators',
      description: 'Professional medical calculators for EMT-B scope practice',
      icon: Calculator,
      path: '/emtb/calculators',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600',
      items: ['Glasgow Coma Scale', 'Pediatric Vital Signs', 'Rule of Nines', 'Blood Pressure Assessment', 'Medication Dosing']
    },
    {
      title: 'EMT-B Protocols',
      description: 'Core emergency medical protocols and procedures',
      icon: FileText,
      path: '/emtb/protocols',
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
      items: ['Primary Assessment', 'Airway Management', 'Oxygen Administration', 'CPR Guidelines', 'Bleeding Control']
    },
    {
      title: 'EMT-B Medications',
      description: 'Comprehensive database of EMT-B scope medications',
      icon: Heart,
      path: '/emtb/medications',
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      iconColor: 'text-red-600',
      items: ['Oxygen', 'Epinephrine', 'Nitroglycerin', 'Aspirin', 'Oral Glucose', 'Activated Charcoal', 'Albuterol', 'Naloxone']
    },
    {
      title: 'EMT-B Flashcards',
      description: 'Interactive study cards extracted from your existing content',
      icon: Brain,
      path: '/emtb/flashcards',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600',
      items: ['Patient Assessment Cards', 'Airway & Breathing Cards', 'Medication Cards', 'Trauma Care Cards']
  },
    {
      title: 'EMT-B Study Notes',
      description: '14 comprehensive modules with 41 chapters plus bonus content',
      icon: BookOpen,
      path: '/emtb/study-notes',
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      iconColor: 'text-yellow-600',
      items: ['14 Core Modules', '41 Study Chapters', 'Bonus: Human Body Systems', 'Interactive Flashcards', 'Clinical Pearls']
    },
    {
      title: 'Practice Quizzes',
      description: 'Comprehensive practice tests for all 14 EMT-B modules',
      icon: Target,
      path: '/practice-quiz',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      iconColor: 'text-orange-600',
      items: ['30 Questions per Module', 'Timed Practice Tests', 'Progress Tracking', 'Detailed Explanations', 'NREMT-Style Questions']
    },
    {
      title: 'Medication Simulations',
      description: 'Step-by-step medication administration scenarios',
      icon: Stethoscope,
      path: '/emtb/med-simulations',
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      iconColor: 'text-indigo-600',
      items: ['Epinephrine for Anaphylaxis', 'Naloxone for Opioid Overdose', 'Albuterol for Asthma']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div id="study" className="text-center space-y-4">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Link to="/">
              <img 
                src="/assets/LOGOFINAL.png" 
                alt="ProMedix EMS Logo" 
                className="w-64 h-auto object-contain mb-1"
                style={{ background: 'transparent' }}
              />
            </Link>
            <div className="flex justify-center">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Emergency Medical Technician - Basic
              </span>
            </div>
            <div className="text-sm text-gray-600 text-center mt-2 max-w-md">
              The Next-Gen Education Tool for Emergency Medical Services
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Your trusted companion to formal EMT-B training—designed for clarity, retention, and confident field application.
        </p>
      </div>

      <div id="emtb" className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {navigationCards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            id={index === 0 ? "tools" : index === 3 ? "more" : undefined}
            className={`block p-6 border-2 rounded-xl transition-all duration-200 ${card.color} group`}
          >
            <div className="flex items-start justify-between mb-4">
              <card.icon className={`h-10 w-10 ${card.iconColor} group-hover:scale-110 transition-transform`} />
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
            <p className="text-gray-600 mb-4">{card.description}</p>
            
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-700 mb-2">Includes:</div>
              {card.items.slice(0, 3).map((item, itemIndex) => (
                <div key={itemIndex} className="text-sm text-gray-600 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                  {item}
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EMTBNavigation;




