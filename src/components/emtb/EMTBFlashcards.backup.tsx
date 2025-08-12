import React, { useState } from 'react';
import { Brain, CheckCircle, RotateCcw, ArrowLeft, ArrowRight, Shuffle } from 'lucide-react';

// Chapter 1: EMS Ecosystem Essentials (15 cards)
const chapter1Flashcards = [
  {
    id: "ch1-001",
    question: "What are the four levels of EMT training in the National EMS Scope of Practice?",
    answer: "Emergency Medical Responder (EMR), Emergency Medical Technician (EMT), Advanced EMT (AEMT), and Paramedic.",
    category: "EMS Systems",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch1-002",
    question: "What does the acronym NHTSA stand for and what is their role in EMS?",
    answer: "National Highway Traffic Safety Administration. They develop national standards for EMS training, equipment, and system development.",
    category: "EMS Regulation",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-003",
    question: "A patient calls 911 for chest pain. Describe the EMS system response from dispatch to hospital care.",
    answer: "1) Dispatcher receives call and obtains information, 2) Appropriate EMS unit is dispatched, 3) EMTs respond, assess, and treat patient, 4) Patient is transported to appropriate hospital, 5) Hospital receives report and continues care.",
    category: "System Operations",
    difficulty: "medium",
    type: "scenario"
  },
  {
    id: "ch1-004",
    question: "What are the primary roles and responsibilities of an EMT?",
    answer: "Scene safety, patient assessment, emergency medical care, safe patient transport, communication with medical direction, and accurate documentation.",
    category: "EMT Roles",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch1-005",
    question: "What is the difference between online and offline medical direction?",
    answer: "Online medical direction involves direct communication with a physician during patient care. Offline medical direction includes protocols, standing orders, and training provided in advance.",
    category: "Medical Direction",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-006",
    question: "An EMT wants to administer a medication that requires medical direction. What steps should they follow?",
    answer: "Contact medical direction, provide patient information and assessment findings, clearly state the medication request, receive and confirm orders, document the interaction.",
    category: "Medical Direction",
    difficulty: "hard",
    type: "application"
  },
  {
    id: "ch1-007",
    question: "What are the essential components of a comprehensive EMS system?",
    answer: "Regulation and policy, resource management, human resources and training, transportation, facilities, communications, public information and education, medical direction, and trauma systems.",
    category: "System Components",
    difficulty: "hard",
    type: "recognition"
  },
  {
    id: "ch1-008",
    question: "What is the purpose of EMS protocols and standing orders?",
    answer: "Protocols provide step-by-step procedures for specific conditions. Standing orders allow EMTs to perform certain treatments without direct physician contact, enabling faster patient care.",
    category: "Protocols",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-009",
    question: "A rural EMS system has limited resources. What factors should be considered for system design?",
    answer: "Response times, available personnel, training levels, equipment needs, communication systems, transport distances to hospitals, mutual aid agreements, and community needs assessment.",
    category: "System Design",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch1-010",
    question: "What is the role of quality improvement in EMS systems?",
    answer: "Continuous evaluation of system performance, identifying areas for improvement, analyzing patient outcomes, updating protocols, and ensuring high-quality patient care through data-driven decisions.",
    category: "Quality Improvement",
    difficulty: "medium",
    type: "assessment"
  },
  {
    id: "ch1-011",
    question: "What are the minimum training requirements for EMT certification?",
    answer: "Completion of state-approved EMT course (typically 120-150 hours), passing written and practical examinations, CPR certification, and meeting physical and mental health requirements.",
    category: "EMT Training",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch1-012",
    question: "How do EMS systems integrate with other emergency services?",
    answer: "Through unified command structures, shared communication systems, coordinated response protocols, joint training exercises, and established mutual aid agreements with fire, police, and emergency management.",
    category: "System Integration",
    difficulty: "medium",
    type: "application"
  },
  {
    id: "ch1-013",
    question: "What is the significance of evidence-based medicine in EMS?",
    answer: "Uses scientific research and clinical studies to guide treatment protocols, ensures treatments are proven effective, improves patient outcomes, and supports continuous system improvement.",
    category: "Evidence-Based Practice",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-014",
    question: "An EMS system is developing new protocols. What stakeholders should be involved in the process?",
    answer: "Medical director, EMTs and paramedics, hospital physicians, nurses, system administrators, training coordinators, quality improvement staff, and community representatives.",
    category: "Protocol Development",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch1-015",
    question: "What are the key performance indicators used to evaluate EMS system effectiveness?",
    answer: "Response times, patient survival rates, protocol compliance, customer satisfaction, cost-effectiveness, training completion rates, and clinical outcome measures.",
    category: "Performance Metrics",
    difficulty: "hard",
    type: "assessment"
  }
];

// Chapter 2: Safety Protocols for Responders (15 cards)
const chapter2Flashcards = [
  {
    id: "ch2-001",
    question: "What percentage of first responders have seen traumatic events, and what percentage have been diagnosed with mental health issues?",
    answer: "84% of first responders have seen traumatic events, and 34% have been diagnosed with mental health issues like depression or PTSD.",
    category: "Workforce Safety",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch2-002",
    question: "Define the difference between eustress and distress in emergency medical services.",
    answer: "Eustress causes positive responses like increased focus and job satisfaction from performing well in tough situations. Distress causes negative responses like feeling overwhelmed or anxious.",
    category: "Stress Management",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch2-003",
    question: "An EMT notices a colleague seems exhausted, cynical, and showing poor performance after months of high-stress calls. What condition should they be concerned about?",
    answer: "Burnout - which is exhaustion, cynicism, and poor performance from long-term job stress that can lead to medical errors and decreased morale.",
    category: "Mental Health",
    difficulty: "medium",
    type: "scenario"
  },
  {
    id: "ch2-004",
    question: "List the five key strategies to increase resilience for EMTs.",
    answer: "1. Eat a healthy diet, 2. Get 7 to 9 hours of sleep daily, 3. Build strong relationships with family, friends, and co-workers, 4. Exercise daily, 5. Practice mindfulness.",
    category: "Wellness",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch2-005",
    question: "What is the proper order for donning (putting on) PPE?",
    answer: "Gown first, then mask, then eyewear, then gloves. Always doff (remove) the mask last to avoid contamination.",
    category: "Infection Control",
    difficulty: "hard",
    type: "application"
  },
  {
    id: "ch2-006",
    question: "A patient asks an EMT 'Am I going to die?' How should the EMT respond appropriately?",
    answer: "Be honest without scaring the patient, avoid false promises like 'Everything will be alright,' remain calm and caring, and always allow for hope even in serious situations.",
    category: "Patient Communication",
    difficulty: "medium",
    type: "scenario"
  },
  {
    id: "ch2-007",
    question: "What are the five stages of grief identified by Dr. Elizabeth Kubler-Ross?",
    answer: "Denial, Anger, Bargaining, Depression, and Acceptance. These stages can occur in any order during the grieving process.",
    category: "Grief Support",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch2-008",
    question: "An EMT has been working 24-hour shifts and is experiencing fatigue that could compromise patient safety. What management strategies should be implemented?",
    answer: "Work shifts shorter than 24 hours, use fatigue surveys for assessment, provide access to caffeine and naps while on duty, and receive education on fatigue risks.",
    category: "Fatigue Management",
    difficulty: "hard",
    type: "application"
  },
  {
    id: "ch2-009",
    question: "Define Standard Precautions according to CDC guidelines.",
    answer: "Standard precautions mean assuming every person might be infected, so always use infection control procedures including proper PPE, hand washing, and safe disposal of sharp items.",
    category: "Infection Control",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch2-010",
    question: "What is the difference between Disease Prevention and Health Promotion?",
    answer: "Disease Prevention focuses on medical care to avoid illness (like vaccinations and screenings). Health Promotion focuses on personal habits to improve health (like proper diet and exercise).",
    category: "Health Management",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch2-011",
    question: "During a traumatic call involving a child fatality, an EMT experiences critical incident stress. What support options are available?",
    answer: "Critical Incident Stress Management (CISM) including defusing sessions during/after the event, debriefing sessions 24-72 hours later with mental health professionals, Employee Assistance Programs, or private counseling.",
    category: "Critical Incident Stress",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch2-012",
    question: "What are the key principles for safe lifting practices in EMS?",
    answer: "Pre-plan the move, bend your legs not your waist, keep the weight close to your body, and lift straight up using your legs.",
    category: "Injury Prevention",
    difficulty: "easy",
    type: "application"
  },
  {
    id: "ch2-013",
    question: "How many hours of sleep do adults need each night, and what individual strategies help with fatigue management?",
    answer: "Adults need 7 to 9 hours of sleep each night. Individual strategies include getting quality sleep, taking short naps, doing physical and mental exercise, avoiding caffeine/alcohol before bed, keeping consistent sleep schedule, and exposing yourself to natural light during waking hours.",
    category: "Sleep Management",
    difficulty: "medium",
    type: "assessment"
  },
  {
    id: "ch2-014",
    question: "An EMT suspects a coworker is impaired by alcohol or drugs during a shift. What is the appropriate action?",
    answer: "Report the impaired coworker immediately. Covering for them can cause serious harm to patients. Substance abuse increases accidents, creates tension, and leads to poor treatment decisions.",
    category: "Workplace Safety",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch2-015",
    question: "What constitutes proper protective clothing layers for cold weather EMS operations?",
    answer: "Multiple layers: thin inner layer to wick away moisture, thermal middle layer for insulation, and outer layer to resist wind and wetness. Avoid cotton in cold, wet conditions as it absorbs moisture and causes chilling.",
    category: "Protective Equipment",
    difficulty: "medium",
    type: "application"
  }
];

// Combine all flashcards (30 total)
const allFlashcards = [...chapter1Flashcards, ...chapter2Flashcards];

const EMTBFlashcards: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [studySession, setStudySession] = useState({
    correct: 0,
    needReview: 0,
    total: 0
  });

  // Get unique categories
  const categories = ['all', ...new Set(allFlashcards.map(card => card.category))];
  
  // Filter cards by category
  const filteredCards = selectedCategory === 'all' 
    ? allFlashcards 
    : allFlashcards.filter(card => card.category === selectedCategory);

  const currentFlashcard = filteredCards[currentCard];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % filteredCards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setShowAnswer(false);
  };

  const shuffleCards = () => {
    setCurrentCard(Math.floor(Math.random() * filteredCards.length));
    setShowAnswer(false);
  };

  const markCard = (correct: boolean) => {
    setStudySession(prev => ({
      correct: correct ? prev.correct + 1 : prev.correct,
      needReview: correct ? prev.needReview : prev.needReview + 1,
      total: prev.total + 1
    }));
    nextCard();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (filteredCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Brain className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">No flashcards found</h1>
            <p className="text-gray-600">Please select a different category.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EMT-B Flashcards</h1>
                <p className="text-gray-600">30 professional study cards for EMT-B training</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Study Progress</div>
              <div className="flex space-x-4 text-sm">
                <span className="text-green-600">✓ {studySession.correct}</span>
                <span className="text-red-600">⚠ {studySession.needReview}</span>
                <span className="text-gray-600">Total: {studySession.total}</span>
              </div>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentCard(0);
                  setShowAnswer(false);
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? `All Categories (${allFlashcards.length})` : category}
              </button>
            ))}
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-lg shadow-lg p-8 min-h-96">
          <div className="text-center">
            {/* Card Info */}
            <div className="flex justify-between items-center mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentFlashcard.difficulty)}`}>
                {currentFlashcard.difficulty.toUpperCase()}
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {currentFlashcard.category}
              </span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {currentFlashcard.type}
              </span>
            </div>
            
            {/* Question/Answer */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {showAnswer ? 'Answer' : 'Question'}
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 min-h-32 flex items-center justify-center">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {showAnswer ? currentFlashcard.answer : currentFlashcard.question}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                {showAnswer ? 'Show Question' : 'Show Answer'}
              </button>
              
              {showAnswer && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => markCard(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Got It
                  </button>
                  <button
                    onClick={() => markCard(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Need Review
                  </button>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevCard}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  {currentCard + 1} of {filteredCards.length}
                </span>
                <button
                  onClick={shuffleCards}
                  className="bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  <Shuffle className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={nextCard}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">30</div>
              <div className="text-sm text-gray-600">Total Cards</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">2</div>
              <div className="text-sm text-gray-600">Chapters</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{filteredCards.length}</div>
              <div className="text-sm text-gray-600">Current Set</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMTBFlashcards;
