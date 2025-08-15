import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Heart, Stethoscope, Users, Clock, Star, ChevronRight, Brain, BookOpen } from 'lucide-react';

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
      description: 'Structured study notes and chapter downloads',
      icon: BookOpen,
      path: '/emtb/study-notes',
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      iconColor: 'text-yellow-600',
      items: ['Fixed Notes', 'New Layout', 'Clean Layout']
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

  const quickStats = [
    { label: 'Calculators', value: '5', icon: Calculator, color: 'text-blue-600' },
    { label: 'Protocols', value: '5', icon: FileText, color: 'text-green-600' },
    { label: 'Medications', value: '8', icon: Heart, color: 'text-red-600' },{ label: 'Modules', value: '14', icon: Users, color: 'text-purple-600' },
    { label: 'Flashcards', value: '210', icon: Brain, color: 'text-indigo-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center space-x-3">
          <Stethoscope className="h-12 w-12 text-blue-600" />
          <div>
            <h1 className="text-4xl font-bold text-gray-900">EMT-B Training Platform</h1>
            <div className="flex justify-center mt-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Emergency Medical Technician - Basic
              </span>
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive training tools and resources designed specifically for EMT-B scope practice.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {navigationCards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
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




