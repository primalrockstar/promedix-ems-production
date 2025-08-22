// Balanced Practice Quiz System Implementation
// This file implements the balanced 615-question system alongside the existing quiz system
// Safe to deploy - won't break existing functionality

import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, Target, BookOpen, BarChart3 } from 'lucide-react';
import { chapter1Questions, chapter2Questions } from '../data/practice-quizzes-new-balanced';
import { balancedQuizConfig } from '../data/practice-quizzes-balanced-system';

interface BalancedQuizSystemProps {
  onClose?: () => void;
}

export const BalancedQuizSystem: React.FC<BalancedQuizSystemProps> = ({ onClose }) => {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Get current chapter questions
  const getCurrentChapterQuestions = () => {
    switch (currentChapter) {
      case 1:
        return chapter1Questions;
      case 2:
        return chapter2Questions;
      default:
        return []; // Placeholder for other chapters
    }
  };

  const currentQuestions = getCurrentChapterQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    setCompletedQuestions(prev => prev + 1);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + currentQuestion.points);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompletedQuestions(0);
    setShowResults(false);
    setQuizStarted(false);
  };

  const getScorePercentage = () => {
    const totalPossiblePoints = currentQuestions.reduce((sum, q) => sum + q.points, 0);
    return totalPossiblePoints > 0 ? Math.round((score / totalPossiblePoints) * 100) : 0;
  };

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Balanced Quiz System</h1>
          </div>
          <p className="text-gray-600 text-lg">
            New balanced assessment system with 15 questions per chapter across all 41 chapters
          </p>
        </div>

        {/* System Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              System Overview
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-semibold">{balancedQuizConfig.totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span>Questions per Chapter:</span>
                <span className="font-semibold">{balancedQuizConfig.questionsPerChapter}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Chapters:</span>
                <span className="font-semibold">{balancedQuizConfig.totalChapters}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Modules:</span>
                <span className="font-semibold">{balancedQuizConfig.totalModules}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Implementation Status
            </h3>
            <div className="space-y-2 text-sm text-green-800">
              <div className="flex justify-between">
                <span>Completed:</span>
                <span className="font-semibold">
                  Chapter {balancedQuizConfig.implementationStatus.completed.chapters.length} 
                  ({balancedQuizConfig.implementationStatus.completed.questions} questions)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Remaining:</span>
                <span className="font-semibold">
                  {balancedQuizConfig.implementationStatus.remaining.chapters} chapters 
                  ({balancedQuizConfig.implementationStatus.remaining.questions} questions)
                </span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ 
                    width: `${(balancedQuizConfig.implementationStatus.completed.questions / balancedQuizConfig.totalQuestions) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Chapters */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Chapters</h3>
          <div className="grid gap-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Chapter 1: EMS System Fundamentals</h4>
                  <p className="text-sm text-gray-600">Module 1: Foundations of EMS Practice</p>
                  <p className="text-sm text-gray-500">15 questions • 23 points total</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentChapter(1);
                    setQuizStarted(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Quiz
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Chapter 2: Responder Safety & Resilience</h4>
                  <p className="text-sm text-gray-600">Module 1: Foundations of EMS Practice</p>
                  <p className="text-sm text-gray-500">15 questions • 23 points total</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentChapter(2);
                    setQuizStarted(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Quiz
                </button>
              </div>
            </div>
            
            {/* Placeholder for other chapters */}
            {Array.from({ length: 39 }, (_, i) => i + 3).map(chapterNum => (
              <div key={chapterNum} className="border rounded-lg p-4 bg-gray-100 opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-700">
                      Chapter {chapterNum}: {balancedQuizConfig.chapterTitles[chapterNum as keyof typeof balancedQuizConfig.chapterTitles]}
                    </h4>
                    <p className="text-sm text-gray-500">Coming Soon</p>
                  </div>
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {onClose && (
          <div className="text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Main Quiz System
            </button>
          </div>
        )}
      </div>
    );
  }

  if (showResults) {
    const percentage = getScorePercentage();
    const passed = percentage >= 80;

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <AlertCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Chapter {currentChapter} Complete!
          </h2>
          <p className="text-gray-600">
            {currentChapter === 1 ? 'EMS System Fundamentals' : 'Responder Safety & Resilience'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{percentage}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={resetQuiz}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retake Chapter {currentChapter}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Main System
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Chapter {currentChapter}: {currentChapter === 1 ? 'EMS System Fundamentals' : 'Responder Safety & Resilience'}
          </h1>
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {currentQuestions.length}</p>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>Points: {currentQuestion?.points || 0}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(((currentQuestionIndex + 1) / currentQuestions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="mb-8">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
              {currentQuestionIndex + 1}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {currentQuestion.question}
              </h2>
              <div className="flex gap-2 text-xs">
                <span className={`px-2 py-1 rounded ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {currentQuestion.category}
                </span>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-red-500 bg-red-50 text-red-900'
                      : 'border-blue-500 bg-blue-50'
                    : showExplanation && index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-semibold mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Explanation:</h3>
              <p className="text-blue-800">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Exit Quiz
            </button>
            <div>
              {!showExplanation ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {currentQuestionIndex === currentQuestions.length - 1 ? 'View Results' : 'Next Question'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalancedQuizSystem;
