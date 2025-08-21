import React, { useState, useMemo } from 'react';
import { 
  BarChart3, TrendingUp, Clock, Brain, Target, Zap,
  BookOpen, CheckCircle, AlertTriangle, Star, Trophy,
  Calendar, Eye, FileText, Download, Share2
} from 'lucide-react';

interface StudyAnalytics {
  studentId: string;
  chapterId: string;
  sessionData: {
    totalTime: number;
    readingSessions: number;
    averageSessionLength: number;
    lastAccessed: Date;
    completionRate: number;
  };
  comprehensionMetrics: {
    readingSpeed: number;
    retentionRate: number;
    engagementScore: number;
    difficultyRating: number;
  };
  interactionData: {
    highlightsCreated: number;
    notesWritten: number;
    questionsAsked: number;
    quizAttempts: number;
    averageQuizScore: number;
  };
  learningPatterns: {
    preferredStudyTime: string;
    averageBreakInterval: number;
    focusSpanMinutes: number;
    retentionDecayRate: number;
  };
}

interface ClassAnalytics {
  totalStudents: number;
  chapterCompletion: { [chapterId: string]: number };
  averageScores: { [chapterId: string]: number };
  strugglingTopics: Array<{
    topic: string;
    averageScore: number;
    completionRate: number;
    timeSpent: number;
  }>;
  topPerformers: Array<{
    studentName: string;
    overallScore: number;
    studyTime: number;
    completionRate: number;
  }>;
}

const StudyAnalyticsDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'individual' | 'class' | 'comparison'>('individual');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'semester'>('week');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');

  // Mock analytics data - would be fetched from API
  const [studentAnalytics] = useState<StudyAnalytics>({
    studentId: 'student123',
    chapterId: 'chapter1',
    sessionData: {
      totalTime: 2730, // seconds
      readingSessions: 5,
      averageSessionLength: 546,
      lastAccessed: new Date(),
      completionRate: 85
    },
    comprehensionMetrics: {
      readingSpeed: 245,
      retentionRate: 78,
      engagementScore: 92,
      difficultyRating: 3.2
    },
    interactionData: {
      highlightsCreated: 12,
      notesWritten: 8,
      questionsAsked: 3,
      quizAttempts: 2,
      averageQuizScore: 87
    },
    learningPatterns: {
      preferredStudyTime: 'evening',
      averageBreakInterval: 25,
      focusSpanMinutes: 22,
      retentionDecayRate: 0.15
    }
  });

  const [classAnalytics] = useState<ClassAnalytics>({
    totalStudents: 24,
    chapterCompletion: {
      'chapter1': 92,
      'chapter2': 87,
      'chapter3': 75,
      'chapter4': 68,
      'chapter5': 45
    },
    averageScores: {
      'chapter1': 85,
      'chapter2': 82,
      'chapter3': 78,
      'chapter4': 72,
      'chapter5': 69
    },
    strugglingTopics: [
      { topic: 'Cardiac Emergencies', averageScore: 68, completionRate: 72, timeSpent: 1890 },
      { topic: 'Trauma Assessment', averageScore: 71, completionRate: 78, timeSpent: 2100 },
      { topic: 'Respiratory Care', averageScore: 74, completionRate: 81, timeSpent: 1650 }
    ],
    topPerformers: [
      { studentName: 'Sarah Johnson', overallScore: 94, studyTime: 4200, completionRate: 96 },
      { studentName: 'Mike Rodriguez', overallScore: 91, studyTime: 3800, completionRate: 94 },
      { studentName: 'Emily Chen', overallScore: 89, studyTime: 4100, completionRate: 92 }
    ]
  });

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 90) return 'bg-green-500';
    if (rate >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const StatCard: React.FC<{ 
    title: string; 
    value: string | number; 
    icon: any; 
    color: string; 
    subtitle?: string;
    trend?: { value: number; direction: 'up' | 'down' };
  }> = ({ title, value, icon: Icon, color, subtitle, trend }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${
              trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`w-3 h-3 mr-1 ${trend.direction === 'down' ? 'rotate-180' : ''}`} />
              {trend.value}% from last week
            </div>
          )}
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const renderIndividualAnalytics = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Study Time"
          value={formatTime(studentAnalytics.sessionData.totalTime)}
          icon={Clock}
          color="blue"
          subtitle="This week"
          trend={{ value: 15, direction: 'up' }}
        />
        <StatCard
          title="Reading Speed"
          value={`${studentAnalytics.comprehensionMetrics.readingSpeed} WPM`}
          icon={Zap}
          color="purple"
          subtitle="Words per minute"
          trend={{ value: 8, direction: 'up' }}
        />
        <StatCard
          title="Retention Rate"
          value={`${studentAnalytics.comprehensionMetrics.retentionRate}%`}
          icon={Brain}
          color="green"
          subtitle="Quiz performance"
          trend={{ value: 5, direction: 'up' }}
        />
        <StatCard
          title="Engagement"
          value={`${studentAnalytics.comprehensionMetrics.engagementScore}%`}
          icon={Star}
          color="yellow"
          subtitle="Interaction level"
        />
      </div>

      {/* Study Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Study Patterns
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Preferred Study Time</span>
              <span className="text-sm font-medium capitalize">{studentAnalytics.learningPatterns.preferredStudyTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Focus Span</span>
              <span className="text-sm font-medium">{studentAnalytics.learningPatterns.focusSpanMinutes} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Break Interval</span>
              <span className="text-sm font-medium">{studentAnalytics.learningPatterns.averageBreakInterval} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Study Sessions</span>
              <span className="text-sm font-medium">{studentAnalytics.sessionData.readingSessions}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Learning Activity
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Highlights Created</span>
              <span className="text-sm font-medium">{studentAnalytics.interactionData.highlightsCreated}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Notes Written</span>
              <span className="text-sm font-medium">{studentAnalytics.interactionData.notesWritten}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Quiz Attempts</span>
              <span className="text-sm font-medium">{studentAnalytics.interactionData.quizAttempts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Quiz Score</span>
              <span className={`text-sm font-medium ${getScoreColor(studentAnalytics.interactionData.averageQuizScore)}`}>
                {studentAnalytics.interactionData.averageQuizScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Personalized Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Study Recommendation</h4>
            <p className="text-sm text-blue-800">
              Your optimal study time is in the evening. Consider scheduling 25-minute focused sessions with 5-minute breaks.
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Strength Area</h4>
            <p className="text-sm text-green-800">
              Excellent engagement with interactive content. Your highlighting and note-taking boost retention by 23%.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Improvement Opportunity</h4>
            <p className="text-sm text-yellow-800">
              Reading speed is below average. Try speed reading exercises to improve comprehension efficiency.
            </p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Focus Enhancement</h4>
            <p className="text-sm text-purple-800">
              Your focus span peaks at 22 minutes. Use the Pomodoro technique for optimal learning sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClassAnalytics = () => (
    <div className="space-y-6">
      {/* Class Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={classAnalytics.totalStudents}
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Average Completion"
          value={`${Math.round(Object.values(classAnalytics.chapterCompletion).reduce((a, b) => a + b, 0) / Object.keys(classAnalytics.chapterCompletion).length)}%`}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Average Score"
          value={`${Math.round(Object.values(classAnalytics.averageScores).reduce((a, b) => a + b, 0) / Object.keys(classAnalytics.averageScores).length)}%`}
          icon={Target}
          color="purple"
        />
        <StatCard
          title="At Risk Students"
          value={3}
          icon={AlertTriangle}
          color="red"
          subtitle="Below 70% completion"
        />
      </div>

      {/* Chapter Performance Heatmap */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Chapter Performance Heatmap
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(classAnalytics.chapterCompletion).map(([chapter, completion]) => {
            const score = classAnalytics.averageScores[chapter];
            return (
              <div key={chapter} className="text-center">
                <div className={`w-full h-20 rounded-lg flex items-center justify-center text-white font-semibold ${
                  score >= 85 ? 'bg-green-500' :
                  score >= 75 ? 'bg-yellow-500' :
                  score >= 65 ? 'bg-orange-500' : 'bg-red-500'
                }`}>
                  {score}%
                </div>
                <p className="text-xs text-gray-600 mt-2 capitalize">{chapter.replace('chapter', 'Ch ')}</p>
                <p className="text-xs text-gray-500">{completion}% complete</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center mt-6 space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span>85%+ (Excellent)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
            <span>75-84% (Good)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
            <span>65-74% (Needs Work)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span>&lt;65% (At Risk)</span>
          </div>
        </div>
      </div>

      {/* Struggling Topics & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            Topics Needing Attention
          </h3>
          <div className="space-y-4">
            {classAnalytics.strugglingTopics.map((topic, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{topic.topic}</h4>
                  <span className={`text-sm font-semibold ${getScoreColor(topic.averageScore)}`}>
                    {topic.averageScore}%
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{topic.completionRate}% completion</span>
                  <span>{formatTime(topic.timeSpent)} avg time</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${getCompletionColor(topic.completionRate)}`}
                    style={{ width: `${topic.completionRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Top Performers
          </h3>
          <div className="space-y-4">
            {classAnalytics.topPerformers.map((student, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{student.studentName}</h4>
                  <span className="text-sm font-semibold text-green-600">
                    {student.overallScore}%
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{student.completionRate}% complete</span>
                  <span>{formatTime(student.studyTime)} studied</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-500 mr-2">#{index + 1}</span>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${student.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Study Analytics</h1>
              <p className="text-gray-600">Insights and performance metrics</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="semester">This Semester</option>
              </select>
              
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Download className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Toggle */}
        <div className="flex space-x-2 mb-8">
          <button
            onClick={() => setViewMode('individual')}
            className={`px-4 py-2 rounded-lg font-medium ${
              viewMode === 'individual' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setViewMode('class')}
            className={`px-4 py-2 rounded-lg font-medium ${
              viewMode === 'class' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Class Overview
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`px-4 py-2 rounded-lg font-medium ${
              viewMode === 'comparison' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Comparison
          </button>
        </div>

        {/* Content */}
        {viewMode === 'individual' && renderIndividualAnalytics()}
        {viewMode === 'class' && renderClassAnalytics()}
        {viewMode === 'comparison' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison View</h3>
            <p className="text-gray-600">Compare student performance across different metrics...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyAnalyticsDashboard;
