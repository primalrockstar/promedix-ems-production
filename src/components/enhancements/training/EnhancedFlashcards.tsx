import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  RotateCcw, Check, X, Brain, Target, Clock, Star,
  TrendingUp, ArrowLeft, ArrowRight, Shuffle, Settings,
  BarChart3, Trophy, Zap, BookOpen, ChevronDown, Filter,
  Download, Share2, Eye, EyeOff, Volume2, VolumeX
} from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  explanation?: string;
  mnemonics?: string;
  relatedTerms?: string[];
  imageUrl?: string;
  audioUrl?: string;
}

interface StudySession {
  sessionId: string;
  startTime: Date;
  cardsStudied: number;
  correctAnswers: number;
  averageResponseTime: number;
  strengthenedCards: string[];
  weakenedCards: string[];
  newCards: string[];
}

interface CardProgress {
  cardId: string;
  repetitionCount: number;
  easyFactor: number; // SM-2 algorithm factor
  nextReviewDate: Date;
  lastReviewed: Date;
  successRate: number;
  averageResponseTime: number;
  learningPhase: 'new' | 'learning' | 'review' | 'mastered';
}

interface SpacedRepetitionData {
  interval: number;
  repetition: number;
  efactor: number;
}

const EnhancedFlashcards: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<'study' | 'review' | 'spaced' | 'cramming'>('study');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    cardsStudied: 0,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    timeSpent: 0
  });
  const [cardProgress, setCardProgress] = useState<Map<string, CardProgress>>(new Map());
  const [studySession, setStudySession] = useState<StudySession | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Enhanced flashcard data with clinical scenarios
  const [flashcards] = useState<Flashcard[]>([
    {
      id: 'card1',
      front: 'What is the normal adult respiratory rate?',
      back: '12-20 breaths per minute',
      category: 'Vital Signs',
      difficulty: 'easy',
      tags: ['respiratory', 'normal values', 'assessment'],
      explanation: 'Normal adult respiratory rate at rest is 12-20 breaths per minute. Rates below 12 (bradypnea) or above 20 (tachypnea) may indicate medical problems.',
      mnemonics: 'Remember: 12-20 for adults, like the years from middle school to college',
      relatedTerms: ['Tachypnea', 'Bradypnea', 'Dyspnea']
    },
    {
      id: 'card2',
      front: 'Patient presents with crushing chest pain radiating to left arm, diaphoretic, and nauseous. What is your primary concern?',
      back: 'Acute Myocardial Infarction (Heart Attack)',
      category: 'Cardiac Emergencies',
      difficulty: 'medium',
      tags: ['cardiac', 'chest pain', 'emergency'],
      explanation: 'Classic presentation of MI includes chest pain (crushing, pressure), radiation to left arm/jaw/back, diaphoresis, nausea/vomiting, and shortness of breath.',
      mnemonics: 'MONA: Morphine, Oxygen, Nitroglycerin, Aspirin',
      relatedTerms: ['Angina', 'Cardiac Arrest', 'ACS']
    },
    {
      id: 'card3',
      front: 'What are the 5 Rights of Medication Administration?',
      back: 'Right Patient, Right Drug, Right Dose, Right Route, Right Time',
      category: 'Medications',
      difficulty: 'medium',
      tags: ['medications', 'safety', 'protocols'],
      explanation: 'The 5 Rights prevent medication errors. Some add 6th and 7th rights: Right Documentation and Right Reason.',
      mnemonics: 'Remember: P-D-D-R-T (Patient, Drug, Dose, Route, Time)',
      relatedTerms: ['Medication Error', 'Drug Allergy', 'Contraindications']
    },
    {
      id: 'card4',
      front: 'You arrive to find an unconscious patient with pinpoint pupils, slow shallow breathing, and needle marks on arms. What do you suspect?',
      back: 'Opioid Overdose',
      category: 'Toxicology',
      difficulty: 'medium',
      tags: ['overdose', 'opioids', 'naloxone'],
      explanation: 'Classic triad: Altered mental status, respiratory depression, and pinpoint pupils. Treatment includes airway management and naloxone administration.',
      mnemonics: 'Opioid triad: Coma, Constricted pupils, Cyanosis',
      relatedTerms: ['Naloxone', 'Respiratory Depression', 'Heroin']
    },
    {
      id: 'card5',
      front: 'What is the pediatric dose of epinephrine for anaphylaxis?',
      back: '0.15 mg IM (EpiPen Jr) for children 15-30 kg\n0.3 mg IM (EpiPen) for >30 kg',
      category: 'Pediatric Care',
      difficulty: 'hard',
      tags: ['pediatric', 'epinephrine', 'anaphylaxis'],
      explanation: 'Weight-based dosing is critical. 0.01 mg/kg is the calculation, but auto-injectors come in fixed doses.',
      mnemonics: 'Junior dose for Juniors (0.15mg), Adult dose for bigger kids (0.3mg)',
      relatedTerms: ['Anaphylaxis', 'Auto-injector', 'Allergic Reaction']
    },
    {
      id: 'card6',
      front: 'Glasgow Coma Scale: Patient opens eyes to pain, makes incomprehensible sounds, withdraws from pain. What is the GCS score?',
      back: 'GCS 8 (E2 + V2 + M4)',
      category: 'Neurological Assessment',
      difficulty: 'hard',
      tags: ['GCS', 'neurological', 'trauma'],
      explanation: 'Eyes: Pain = 2, Verbal: Incomprehensible = 2, Motor: Withdrawal = 4. Total = 8. Severe brain injury ≤8.',
      mnemonics: 'GCS 8 = Don\'t wait, intubate!',
      relatedTerms: ['TBI', 'Altered Mental Status', 'Head Trauma']
    }
  ]);

  // Spaced Repetition Algorithm (SM-2)
  const calculateNextReview = (
    quality: number, // 0-5 (0=total blackout, 5=perfect response)
    repetition: number,
    efactor: number,
    interval: number
  ): SpacedRepetitionData => {
    let newEfactor = efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    newEfactor = Math.max(1.3, newEfactor);

    let newInterval = 0;
    let newRepetition = repetition;

    if (quality < 3) {
      newRepetition = 0;
      newInterval = 1;
    } else {
      newRepetition = repetition + 1;
      if (newRepetition === 1) {
        newInterval = 1;
      } else if (newRepetition === 2) {
        newInterval = 6;
      } else {
        newInterval = Math.round(interval * newEfactor);
      }
    }

    return {
      interval: newInterval,
      repetition: newRepetition,
      efactor: newEfactor
    };
  };

  // Filter cards based on study mode and progress
  const filteredCards = useMemo(() => {
    let cards = flashcards;

    // Filter by category
    if (!selectedCategories.includes('all')) {
      cards = cards.filter(card => selectedCategories.includes(card.category));
    }

    // Filter by study mode
    switch (studyMode) {
      case 'review':
        // Show cards that need review based on spaced repetition
        cards = cards.filter(card => {
          const progress = cardProgress.get(card.id);
          if (!progress) return true; // New cards
          return new Date() >= progress.nextReviewDate;
        });
        break;
      case 'spaced':
        // Spaced repetition mode - prioritize cards due for review
        cards = cards.sort((a, b) => {
          const progressA = cardProgress.get(a.id);
          const progressB = cardProgress.get(b.id);
          
          if (!progressA && !progressB) return 0;
          if (!progressA) return -1;
          if (!progressB) return 1;
          
          return progressA.nextReviewDate.getTime() - progressB.nextReviewDate.getTime();
        });
        break;
      case 'cramming':
        // Show cards with lowest success rate first
        cards = cards.sort((a, b) => {
          const progressA = cardProgress.get(a.id);
          const progressB = cardProgress.get(b.id);
          
          const rateA = progressA?.successRate || 0;
          const rateB = progressB?.successRate || 0;
          
          return rateA - rateB;
        });
        break;
    }

    return cards;
  }, [flashcards, selectedCategories, studyMode, cardProgress]);

  const currentCard = filteredCards[currentCardIndex];
  const currentProgress = currentCard ? cardProgress.get(currentCard.id) : null;

  // Initialize study session
  useEffect(() => {
    const session: StudySession = {
      sessionId: Date.now().toString(),
      startTime: new Date(),
      cardsStudied: 0,
      correctAnswers: 0,
      averageResponseTime: 0,
      strengthenedCards: [],
      weakenedCards: [],
      newCards: []
    };
    setStudySession(session);

    const interval = setInterval(() => {
      setSessionStats(prev => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle card response
  const handleCardResponse = (difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;

    const quality = { again: 0, hard: 2, good: 4, easy: 5 }[difficulty];
    const isCorrect = quality >= 3;

    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect
    }));

    // Update card progress with spaced repetition
    const existingProgress = cardProgress.get(currentCard.id);
    const newProgress: CardProgress = existingProgress || {
      cardId: currentCard.id,
      repetitionCount: 0,
      easyFactor: 2.5,
      nextReviewDate: new Date(),
      lastReviewed: new Date(),
      successRate: 0,
      averageResponseTime: 0,
      learningPhase: 'new'
    };

    const srData = calculateNextReview(
      quality,
      newProgress.repetitionCount,
      newProgress.easyFactor,
      1
    );

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + srData.interval);

    const updatedProgress: CardProgress = {
      ...newProgress,
      repetitionCount: srData.repetition,
      easyFactor: srData.efactor,
      nextReviewDate,
      lastReviewed: new Date(),
      successRate: existingProgress 
        ? (existingProgress.successRate + (isCorrect ? 100 : 0)) / 2 
        : (isCorrect ? 100 : 0),
      learningPhase: srData.repetition === 0 ? 'learning' : 
                    srData.repetition < 3 ? 'learning' :
                    newProgress.successRate > 80 ? 'mastered' : 'review'
    };

    setCardProgress(new Map(cardProgress.set(currentCard.id, updatedProgress)));

    // Move to next card
    nextCard();
  };

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
    setIsFlipped(false);
    setShowingAnswer(false);
  };

  const previousCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setIsFlipped(false);
    setShowingAnswer(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    setShowingAnswer(!showingAnswer);
  };

  const shuffleCards = () => {
    setCurrentCardIndex(Math.floor(Math.random() * filteredCards.length));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressColor = (phase: string) => {
    switch (phase) {
      case 'new': return 'bg-gray-500';
      case 'learning': return 'bg-yellow-500';
      case 'review': return 'bg-blue-500';
      case 'mastered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const categories = ['all', ...Array.from(new Set(flashcards.map(card => card.category)))];

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No cards available</h2>
          <p className="text-gray-600">Select different categories or study mode</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/flashcards" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Enhanced Flashcards</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{currentCardIndex + 1} of {filteredCards.length}</span>
                  <span>{formatTime(sessionStats.timeSpent)}</span>
                  <span>{Math.round((sessionStats.correct / Math.max(sessionStats.cardsStudied, 1)) * 100)}% correct</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              
              <select
                value={studyMode}
                onChange={(e) => setStudyMode(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="study">Study Mode</option>
                <option value="review">Review Mode</option>
                <option value="spaced">Spaced Repetition</option>
                <option value="cramming">Cramming Mode</option>
              </select>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          if (category === 'all') {
                            setSelectedCategories(e.target.checked ? ['all'] : []);
                          } else {
                            const newCategories = e.target.checked
                              ? [...selectedCategories.filter(c => c !== 'all'), category]
                              : selectedCategories.filter(c => c !== category);
                            setSelectedCategories(newCategories.length ? newCategories : ['all']);
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 mr-2"
                      />
                      <span className="text-sm capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={autoPlay}
                      onChange={(e) => setAutoPlay(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 mr-2"
                    />
                    <span className="text-sm">Auto-advance cards</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={audioEnabled}
                      onChange={(e) => setAudioEnabled(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 mr-2"
                    />
                    <span className="text-sm">Audio pronunciation</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Panel */}
        {showAnalytics && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Analytics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{sessionStats.cardsStudied}</div>
                <div className="text-sm text-gray-600">Cards Studied</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{sessionStats.correct}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((sessionStats.correct / Math.max(sessionStats.cardsStudied, 1)) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="mb-6">
          <div 
            className={`relative w-full h-96 bg-white rounded-xl border-2 shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              isFlipped ? 'border-blue-500' : 'border-gray-200'
            }`}
            onClick={flipCard}
          >
            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              {!isFlipped ? (
                /* Front of card */
                <div className="text-center">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentCard.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      currentCard.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentCard.difficulty}
                    </span>
                    
                    {currentProgress && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                        getProgressColor(currentProgress.learningPhase)
                      }`}>
                        {currentProgress.learningPhase}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentCard.front}</h2>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    Category: {currentCard.category}
                  </div>
                  
                  {currentCard.tags && (
                    <div className="flex flex-wrap justify-center gap-2">
                      {currentCard.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-6 text-gray-400">
                    <p className="text-sm">Click to reveal answer</p>
                  </div>
                </div>
              ) : (
                /* Back of card */
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 text-center">{currentCard.back}</h2>
                  
                  {currentCard.explanation && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                      <p className="text-blue-800 text-sm">{currentCard.explanation}</p>
                    </div>
                  )}
                  
                  {currentCard.mnemonics && (
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Memory Aid</h4>
                      <p className="text-purple-800 text-sm">{currentCard.mnemonics}</p>
                    </div>
                  )}
                  
                  {currentCard.relatedTerms && (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Related Terms</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentCard.relatedTerms.map((term, index) => (
                          <span key={index} className="px-2 py-1 bg-white text-gray-700 rounded border text-xs">
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={previousCard}
            className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={shuffleCards}
            className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <Shuffle className="w-5 h-5" />
          </button>
          
          <button
            onClick={flipCard}
            className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextCard}
            className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Spaced Repetition Response Buttons */}
        {isFlipped && studyMode === 'spaced' && (
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => handleCardResponse('again')}
              className="px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium"
            >
              Again
              <div className="text-xs opacity-75">&lt;1m</div>
            </button>
            <button
              onClick={() => handleCardResponse('hard')}
              className="px-4 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 text-sm font-medium"
            >
              Hard
              <div className="text-xs opacity-75">~6m</div>
            </button>
            <button
              onClick={() => handleCardResponse('good')}
              className="px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium"
            >
              Good
              <div className="text-xs opacity-75">~1d</div>
            </button>
            <button
              onClick={() => handleCardResponse('easy')}
              className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
            >
              Easy
              <div className="text-xs opacity-75">~4d</div>
            </button>
          </div>
        )}

        {/* Simple Response Buttons for other modes */}
        {isFlipped && studyMode !== 'spaced' && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
                nextCard();
              }}
              className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium flex items-center justify-center"
            >
              <X className="w-5 h-5 mr-2" />
              Incorrect
            </button>
            <button
              onClick={() => {
                setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
                nextCard();
              }}
              className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium flex items-center justify-center"
            >
              <Check className="w-5 h-5 mr-2" />
              Correct
            </button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentCardIndex + 1} / {filteredCards.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / filteredCards.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFlashcards;
