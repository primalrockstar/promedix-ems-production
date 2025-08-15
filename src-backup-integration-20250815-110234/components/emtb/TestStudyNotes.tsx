import React, { useState } from 'react';
import { BookOpen, Clock, Target, Key, Lightbulb, AlertTriangle, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { chapter2StudyNotes, StudySection, StudyChapter } from '../../data/emtb/chapter2-study-notes';

const TestStudyNotes: React.FC = () => {
  const [selectedChapter] = useState<StudyChapter>(chapter2StudyNotes);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['intro-safety']));
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'terms' | 'concepts'>('content');

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const expandAll = () => {
    setExpandedSections(new Set(selectedChapter.sections.map(s => s.id)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const filteredSections = selectedChapter.sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.keyPoints.some(point => point.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredTerms = selectedChapter.keyTerms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EMT-B Study Notes</h1>
                <p className="text-gray-600">Comprehensive study reference materials</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Chapter {selectedChapter.chapterNumber}: {selectedChapter.title}
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search sections, key points, or terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={expandAll}
                className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mt-6 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'content', label: 'Study Content', icon: BookOpen },
              { id: 'terms', label: 'Key Terms', icon: Key },
              { id: 'concepts', label: 'Critical Concepts', icon: Lightbulb }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'content' | 'terms' | 'concepts')}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Chapter {selectedChapter.chapterNumber}: {selectedChapter.title}
              </h2>
              <p className="text-gray-700 mb-4">{selectedChapter.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {selectedChapter.estimatedStudyTime}
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  {selectedChapter.sections.length} sections
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Learning Objectives
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {selectedChapter.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {activeTab === 'content' && (
            <div className="space-y-4">
              {filteredSections.map((section) => (
                <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    {expandedSections.has(section.id) ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </button>

                  {/* Section Content */}
                  {expandedSections.has(section.id) && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-4">
                        <p className="text-gray-700 mb-4 leading-relaxed">{section.content}</p>

                        {/* Key Points */}
                        {section.keyPoints && section.keyPoints.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Key Points:</h4>
                            <ul className="space-y-1">
                              {section.keyPoints.map((point, index) => (
                                <li key={index} className="flex items-start text-gray-700">
                                  <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Clinical Note */}
                        {section.clinicalNote && (
                          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                            <div className="flex items-start">
                              <Lightbulb className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-blue-900 mb-1">Clinical Note</h4>
                                <p className="text-blue-800">{section.clinicalNote}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Remember This */}
                        {section.rememberThis && (
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                            <div className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-yellow-900 mb-1">Remember This</h4>
                                <p className="text-yellow-800 font-medium">{section.rememberThis}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Key Terms Tab */}
          {activeTab === 'terms' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Medical Terms</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {filteredTerms.map((term, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <dt className="font-semibold text-gray-900 mb-2">{term.term}</dt>
                    <dd className="text-gray-700">{term.definition}</dd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Critical Concepts Tab */}
          {activeTab === 'concepts' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Critical Concepts</h2>
              <div className="grid gap-4">
                {selectedChapter.criticalConcepts.map((concept, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-800 font-medium">{concept}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestStudyNotes;
