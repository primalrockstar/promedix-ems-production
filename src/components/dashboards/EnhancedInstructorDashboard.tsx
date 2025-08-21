import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { 
  Users, BookOpen, ClipboardList, TrendingUp, Award, Settings,
  CheckCircle, Clock, AlertTriangle, Eye, Download, Plus,
  Search, Filter, MoreVertical, Calendar, Bell
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
  lastActive: string;
  overallProgress: number;
  currentModule: string;
  completedModules: number;
  totalModules: number;
  quizScores: number[];
  status: 'active' | 'inactive' | 'at-risk';
}

interface QuizAttempt {
  id: string;
  studentName: string;
  quizName: string;
  score: number;
  timeSpent: string;
  completedAt: string;
  attempts: number;
}

interface ModuleAnalytics {
  id: number;
  title: string;
  studentsEnrolled: number;
  averageCompletion: number;
  averageScore: number;
  timeSpent: string;
  difficultyRating: number;
}

const EnhancedInstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - replace with real API calls
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      enrollmentDate: '2025-07-15',
      lastActive: '2 hours ago',
      overallProgress: 85,
      currentModule: 'Trauma Fundamentals',
      completedModules: 8,
      totalModules: 14,
      quizScores: [92, 88, 95, 78],
      status: 'active'
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      email: 'mike.r@email.com',
      enrollmentDate: '2025-07-20',
      lastActive: '1 day ago',
      overallProgress: 65,
      currentModule: 'Circulatory Emergencies',
      completedModules: 6,
      totalModules: 14,
      quizScores: [85, 72, 91, 69],
      status: 'active'
    },
    {
      id: '3',
      name: 'Emily Chen',
      email: 'emily.c@email.com',
      enrollmentDate: '2025-06-30',
      lastActive: '5 days ago',
      overallProgress: 35,
      currentModule: 'Clinical Assessment',
      completedModules: 3,
      totalModules: 14,
      quizScores: [68, 55, 74],
      status: 'at-risk'
    }
  ]);

  const [recentQuizAttempts] = useState<QuizAttempt[]>([
    {
      id: '1',
      studentName: 'Sarah Johnson',
      quizName: 'Trauma Assessment Quiz',
      score: 92,
      timeSpent: '12 min',
      completedAt: '2 hours ago',
      attempts: 1
    },
    {
      id: '2',
      studentName: 'Mike Rodriguez',
      quizName: 'Medication Administration',
      score: 78,
      timeSpent: '18 min',
      completedAt: '4 hours ago',
      attempts: 2
    }
  ]);

  const [moduleAnalytics] = useState<ModuleAnalytics[]>([
    {
      id: 1,
      title: 'Foundations of EMS Practice',
      studentsEnrolled: 24,
      averageCompletion: 92,
      averageScore: 87,
      timeSpent: '4.2 hrs',
      difficultyRating: 2.1
    },
    {
      id: 2,
      title: 'Clinical Fundamentals',
      studentsEnrolled: 20,
      averageCompletion: 78,
      averageScore: 82,
      timeSpent: '5.8 hrs',
      difficultyRating: 3.2
    }
  ]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || student.status === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [students, searchTerm, selectedFilter]);

  const overviewStats = useMemo(() => {
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === 'active').length;
    const atRiskStudents = students.filter(s => s.status === 'at-risk').length;
    const averageProgress = students.reduce((sum, s) => sum + s.overallProgress, 0) / totalStudents;
    
    return {
      totalStudents,
      activeStudents,
      atRiskStudents,
      averageProgress: Math.round(averageProgress)
    };
  }, [students]);

  const TabButton: React.FC<{ id: string; icon: any; label: string; }> = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
        activeTab === id 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  const StatCard: React.FC<{ title: string; value: string | number; icon: any; color: string; subtitle?: string }> = 
    ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={overviewStats.totalStudents}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Students"
          value={overviewStats.activeStudents}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="At Risk"
          value={overviewStats.atRiskStudents}
          icon={AlertTriangle}
          color="yellow"
        />
        <StatCard
          title="Avg Progress"
          value={`${overviewStats.averageProgress}%`}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Quiz Attempts</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {recentQuizAttempts.map((attempt) => (
              <div key={attempt.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{attempt.studentName}</p>
                    <p className="text-sm text-gray-600">{attempt.quizName}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${attempt.score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {attempt.score}%
                    </p>
                    <p className="text-xs text-gray-500">{attempt.completedAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Module Performance</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {moduleAnalytics.slice(0, 3).map((module) => (
              <div key={module.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{module.title}</p>
                    <p className="text-sm text-gray-600">{module.studentsEnrolled} students</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{module.averageScore}%</p>
                    <p className="text-xs text-gray-500">Avg Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Students</option>
          <option value="active">Active</option>
          <option value="at-risk">At Risk</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Module</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${student.overallProgress}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-900">{student.overallProgress}%</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {student.completedModules}/{student.totalModules} modules
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.currentModule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : student.status === 'at-risk'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Module Analytics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {moduleAnalytics.map((module) => (
                <tr key={module.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {module.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {module.studentsEnrolled}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {module.averageCompletion}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {module.averageScore}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {module.timeSpent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`w-3 h-3 rounded-full mr-1 ${
                            star <= module.difficultyRating ? 'bg-yellow-400' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <main className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
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
        <TabButton id="overview" icon={TrendingUp} label="Overview" />
        <TabButton id="students" icon={Users} label="Students" />
        <TabButton id="analytics" icon={BookOpen} label="Analytics" />
        <TabButton id="settings" icon={Settings} label="Settings" />
      </div>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'students' && renderStudents()}
      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Settings</h3>
          <p className="text-gray-600">Settings panel coming soon...</p>
        </div>
      )}
    </main>
  );
};

export default EnhancedInstructorDashboard;
