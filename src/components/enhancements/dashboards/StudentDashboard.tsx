import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { 
  BookOpen, CheckCircle, Clock, Target, TrendingUp, Award,
  Play, Calendar, Brain, FileText, Star, ChevronRight,
  BarChart3, Trophy, Zap, Users, Bell, Settings
} from 'lucide-react';

interface StudentModule {
  id: number;
  title: string;
  description: string;
  chaptersTotal: number;
  chaptersCompleted: number;
  isUnlocked: boolean;
  estimatedHours: number;
  lastAccessed?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  averageScore?: number;
}

interface RecentActivity {
  id: string;
  type: 'quiz' | 'module' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
  score?: number;
  icon: any;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  earned: boolean;
  earnedDate?: string;
  category: 'progress' | 'performance' | 'consistency';
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('overview');

  // Mock student data - replace with real API calls
  const [studentProgress] = useState({
    overallProgress: 68,
    completedModules: 8,
    totalModules: 14,
    totalHours: 45,
    currentStreak: 12,
    averageScore: 87,
    rank: 3,
    totalStudents: 24
  });

  const [studentModules] = useState<StudentModule[]>([
    {
      id: 1,
      title: "Foundations of EMS Practice",
      description: "Core EMS principles and professional foundations",
      chaptersTotal: 4,
      chaptersCompleted: 4,
      isUnlocked: true,
      estimatedHours: 6,
      lastAccessed: "Completed",
      difficulty: 'beginner',
      averageScore: 92
    },
    {
      id: 2,
      title: "Clinical Fundamentals", 
      description: "Human anatomy, medical terminology, and patient assessment",
      chaptersTotal: 5,
      chaptersCompleted: 4,
      isUnlocked: true,
      estimatedHours: 8,
      lastAccessed: "2 hours ago",
      difficulty: 'intermediate',
      averageScore: 85
    },
    {
      id: 3,
      title: "Clinical Assessment",
      description: "Systematic patient evaluation and documentation",
      chaptersTotal: 1,
      chaptersCompleted: 1,
      isUnlocked: true,
      estimatedHours: 4,
      lastAccessed: "Yesterday",
      difficulty: 'intermediate',
      averageScore: 88
    },
    {
      id: 4,
      title: "Critical Interventions",
      description: "Airway assessment and intervention techniques",
      chaptersTotal: 1,
      chaptersCompleted: 0,
      isUnlocked: true,
      estimatedHours: 5,
      difficulty: 'advanced'
    },
    {
      id: 5,
      title: "Medication Management",
      description: "EMT-B medication administration principles",
      chaptersTotal: 1,
      chaptersCompleted: 0,
      isUnlocked: false,
      estimatedHours: 4,
      difficulty: 'advanced'
    }
  ]);

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'quiz',
      title: 'Clinical Assessment Quiz',
      description: 'Scored 88% on patient evaluation',
      timestamp: '2 hours ago',
      score: 88,
      icon: Target
    },
    {
      id: '2',
      type: 'module',
      title: 'Clinical Fundamentals - Chapter 4',
      description: 'Completed "Safe Transport Techniques"',
      timestamp: '1 day ago',
      icon: BookOpen
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Study Streak',
      description: 'Achieved 12-day learning streak!',
      timestamp: '2 days ago',
      icon: Zap
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first module',
      icon: Trophy,
      earned: true,
      earnedDate: '2025-07-20',
      category: 'progress'
    },
    {
      id: '2',
      title: 'Perfect Score',
      description: 'Score 100% on any quiz',
      icon: Star,
      earned: false,
      category: 'performance'
    },
    {
      id: '3',
      title: 'Study Streak',
      description: 'Study for 7 consecutive days',
      icon: Zap,
      earned: true,
      earnedDate: '2025-08-10',
      category: 'consistency'
    },
    {
      id: '4',
      title: 'Halfway There',
      description: 'Complete 50% of all modules',
      icon: Award,
      earned: true,
      earnedDate: '2025-08-15',
      category: 'progress'
    }
  ]);

  const nextModules = useMemo(() => {
    return studentModules.filter(module => 
      module.chaptersCompleted < module.chaptersTotal && module.isUnlocked
    ).slice(0, 3);
  }, [studentModules]);

  const StatCard: React.FC<{ 
    title: string; 
    value: string | number; 
    icon: any; 
    color: string; 
    subtitle?: string;
    trend?: string;
  }> = ({ title, value, icon: Icon, color, subtitle, trend }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && <p className="text-xs text-green-600 mt-1">{trend}</p>}
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ModuleCard: React.FC<{ module: StudentModule }> = ({ module }) => {
    const progress = (module.chaptersCompleted / module.chaptersTotal) * 100;
    const isCompleted = module.chaptersCompleted === module.chaptersTotal;
    
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all ${
        !module.isUnlocked ? 'opacity-60' : 'hover:scale-105'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">{module.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{module.description}</p>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              <span>{module.chaptersTotal} chapters</span>
              <span>{module.estimatedHours}h estimated</span>
              <span className={`px-2 py-1 rounded-full ${
                module.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {module.difficulty}
              </span>
            </div>
          </div>
          
          {!module.isUnlocked && (
            <div className="ml-4">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{module.chaptersCompleted}/{module.chaptersTotal}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {module.lastAccessed && (
              <span>Last: {module.lastAccessed}</span>
            )}
            {module.averageScore && (
              <span className="ml-2">Avg: {module.averageScore}%</span>
            )}
          </div>
          
          {module.isUnlocked && (
            <Link 
              to={`/modules/${module.id}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isCompleted 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isCompleted ? 'Review' : 'Continue'}
            </Link>
          )}
        </div>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-blue-100 mb-4">Continue your EMT-B certification journey</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <span>Level: Advanced Beginner</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>Rank: #{studentProgress.rank} of {studentProgress.totalStudents}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Overall Progress"
          value={`${studentProgress.overallProgress}%`}
          icon={TrendingUp}
          color="blue"
          subtitle={`${studentProgress.completedModules}/${studentProgress.totalModules} modules`}
        />
        <StatCard
          title="Study Streak"
          value={`${studentProgress.currentStreak} days`}
          icon={Zap}
          color="orange"
          trend="+2 from last week"
        />
        <StatCard
          title="Average Score"
          value={`${studentProgress.averageScore}%`}
          icon={Target}
          color="green"
          trend="+5% improvement"
        />
        <StatCard
          title="Time Invested"
          value={`${studentProgress.totalHours}h`}
          icon={Clock}
          color="purple"
          subtitle="This month"
        />
      </div>

      {/* Continue Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue Learning</h3>
          <div className="space-y-4">
            {nextModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                    {activity.score && (
                      <div className="text-sm font-semibold text-green-600">
                        {activity.score}%
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Preview */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                <button 
                  onClick={() => setActiveView('achievements')}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {achievements.filter(a => a.earned).slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <achievement.icon className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                    <p className="text-xs text-gray-500">{achievement.earnedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Learning Progress</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {studentModules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className={`bg-white rounded-xl border-2 p-6 ${
            achievement.earned 
              ? 'border-yellow-200 bg-yellow-50' 
              : 'border-gray-200'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                achievement.earned 
                  ? 'bg-yellow-100' 
                  : 'bg-gray-100'
              }`}>
                <achievement.icon className={`w-6 h-6 ${
                  achievement.earned 
                    ? 'text-yellow-600' 
                    : 'text-gray-400'
                }`} />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  achievement.earned 
                    ? 'text-gray-900' 
                    : 'text-gray-500'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm ${
                  achievement.earned 
                    ? 'text-gray-600' 
                    : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
              </div>
            </div>
            
            {achievement.earned && achievement.earnedDate && (
              <div className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                Earned on {achievement.earnedDate}
              </div>
            )}
            
            {!achievement.earned && (
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Not yet earned
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const TabButton: React.FC<{ id: string; icon: any; label: string; }> = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveView(id)}
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
        activeView === id 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <main className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600">Track your EMT-B certification progress</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
          </button>
          <Link to="/" className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            Back to Platform
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <TabButton id="overview" icon={BarChart3} label="Overview" />
        <TabButton id="progress" icon={BookOpen} label="Modules" />
        <TabButton id="achievements" icon={Trophy} label="Achievements" />
      </div>

      {/* Content */}
      {activeView === 'overview' && renderOverview()}
      {activeView === 'progress' && renderProgress()}
      {activeView === 'achievements' && renderAchievements()}
    </main>
  );
};

export default StudentDashboard;
