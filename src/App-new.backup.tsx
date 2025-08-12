console.error("🚨 NEW APP-NEW.TSX IS RUNNING!");
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ARMedicationVisualization from './components/ARMedicationVisualization';
import EMSChatbot from './components/EMSChatbot';
import VoiceControl from './components/VoiceControl';
import { 
  Home, 
  BookOpen, 
  Stethoscope, 
  Activity, 
  AlertCircle, 
  Users, 
  FileText, 
  Settings,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Star,
  ChevronRight
} from 'lucide-react';

// Mock Data - FIXED COMMENT SYNTAX
const mockProtocols = [
  { id: 1, title: "Cardiac Arrest", category: "Cardiac", level: "EMT-B", priority: "High", description: "Adult cardiac arrest protocol with CPR and AED" },
  { id: 2, title: "Airway Management", category: "Airway", level: "EMT-B", priority: "High", description: "Basic airway management techniques and devices" },
  { id: 3, title: "Trauma Assessment", category: "Trauma", level: "EMT-B", priority: "Medium", description: "Systematic trauma assessment and stabilization" },
  { id: 4, title: "Medical Assessment", category: "Medical", level: "EMT-B", priority: "Medium", description: "Comprehensive medical patient assessment" },
  { id: 5, title: "CPR Guidelines", category: "Cardiac", level: "EMT-B", priority: "High", description: "Current CPR guidelines and techniques" },
  { id: 6, title: "Bleeding Control", category: "Trauma", level: "EMT-B", priority: "High", description: "Hemorrhage control and shock prevention" },
  { id: 7, title: "Respiratory Distress", category: "Respiratory", level: "EMT-B", priority: "Medium", description: "Assessment and treatment of breathing difficulties" },
  { id: 8, title: "Allergic Reactions", category: "Medical", level: "EMT-B", priority: "Medium", description: "Anaphylaxis recognition and epinephrine administration" }
];

const mockSkills = [
  { id: 1, name: "CPR/AED", category: "Cardiac", proficiency: 85, lastPracticed: "2024-01-15" },
  { id: 2, name: "Bag-Valve-Mask", category: "Airway", proficiency: 92, lastPracticed: "2024-01-20" },
  { id: 3, name: "Spinal Immobilization", category: "Trauma", proficiency: 78, lastPracticed: "2024-01-10" },
  { id: 4, name: "Vital Signs", category: "Assessment", proficiency: 95, lastPracticed: "2024-01-22" },
  { id: 5, name: "Hemorrhage Control", category: "Trauma", proficiency: 88, lastPracticed: "2024-01-18" }
];

const mockScenarios = [
  { id: 1, title: "Chest Pain Call", difficulty: "Beginner", duration: "15 min", completed: true },
  { id: 2, title: "Motor Vehicle Accident", difficulty: "Intermediate", duration: "25 min", completed: false },
  { id: 3, title: "Pediatric Fever", difficulty: "Beginner", duration: "12 min", completed: true },
  { id: 4, title: "Unconscious Patient", difficulty: "Advanced", duration: "30 min", completed: false }
];

// Components
const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">EMT-B Dashboard</h1>
        <p className="text-slate-600 mt-1">Your emergency medical training command center</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Total Protocols</p>
              <p className="text-2xl font-bold text-slate-900">{mockProtocols.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">High Priority</p>
              <p className="text-2xl font-bold text-slate-900">
                {mockProtocols.filter(p => p.priority === 'High').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Skills Practiced</p>
              <p className="text-2xl font-bold text-slate-900">{mockSkills.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Avg Proficiency</p>
              <p className="text-2xl font-bold text-slate-900">
                {Math.round(mockSkills.reduce((acc, skill) => acc + skill.proficiency, 0) / mockSkills.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Protocols */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Quick Access Protocols</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {mockProtocols.slice(0, 4).map(protocol => (
                <div key={protocol.id} className="p-3 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-800">{protocol.title}</h3>
                      <p className="text-sm text-slate-600">{protocol.category}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      protocol.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {protocol.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Progress */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Skills Progress</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockSkills.slice(0, 4).map(skill => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-800">{skill.name}</span>
                    <span className="text-sm text-slate-600">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Protocols = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  
  const categories = ['All', ...Array.from(new Set(mockProtocols.map(p => p.category)))];
  
  const filteredProtocols = mockProtocols.filter(protocol => {
    const matchesSearch = protocol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || protocol.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">EMT-B Protocols</h1>
        <p className="text-slate-600 mt-1">Comprehensive emergency medical protocols for EMT-Basic level</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search protocols..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <select
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProtocols.map(protocol => (
          <div key={protocol.id} className="bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800">{protocol.title}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  protocol.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {protocol.priority}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-4">{protocol.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">{protocol.category}</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Practical Skills</h1>
        <p className="text-slate-600 mt-1">Master essential EMT-B practical skills and track your progress</p>
      </div>

      {/* Skills Overview */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Your Skills Progress</h2>
        <div className="space-y-4">
          {mockSkills.map(skill => (
            <div key={skill.id} className="p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium text-slate-800">{skill.name}</h3>
                  <p className="text-sm text-slate-600">{skill.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-slate-800">{skill.proficiency}%</div>
                  <div className="text-xs text-slate-500">Last practiced: {skill.lastPracticed}</div>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { category: "Airway", icon: "🫁", count: 3, color: "blue" },
          { category: "Cardiac", icon: "❤️", count: 2, color: "red" },
          { category: "Trauma", icon: "🩹", count: 4, color: "orange" },
          { category: "Assessment", icon: "🔍", count: 3, color: "green" }
        ].map(cat => (
          <div key={cat.category} className="bg-white rounded-lg border border-slate-200 p-6 hover:border-blue-300 transition-colors cursor-pointer">
            <div className="text-center">
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-slate-800 mb-2">{cat.category}</h3>
              <p className="text-slate-600 text-sm">{cat.count} skills available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Scenarios = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Practice Scenarios</h1>
        <p className="text-slate-600 mt-1">Interactive scenarios to test your EMT-B knowledge and skills</p>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockScenarios.map(scenario => (
          <div key={scenario.id} className="bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800">{scenario.title}</h3>
                {scenario.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  scenario.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  scenario.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {scenario.difficulty}
                </span>
                <span>{scenario.duration}</span>
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {scenario.completed ? 'Review Scenario' : 'Start Scenario'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComingSoon = ({ title }: { title: string }) => {
  return (
    <div className="min-h-96 flex flex-col items-center justify-center text-center space-y-4">
      <div className="p-4 bg-blue-100 rounded-full">
        <AlertCircle className="h-12 w-12 text-blue-600" />
      </div>
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <p className="text-slate-600 max-w-md">
        This section is currently in development. We're working hard to bring you comprehensive {title.toLowerCase()} content soon!
      </p>
      <div className="text-sm text-slate-500">
        Currently focused on EMT-B level content
      </div>
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="text-lg font-bold">ProMedix<span className="text-blue-400">EMS</span></div>
        <div className="text-xs text-slate-400">EMT-B Training</div>
      </div>
      
      <nav className="flex-1">
        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-6">
            Core Training
          </div>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'bg-blue-600 text-white' : ''}`}
              >
                <Home className="mr-3 h-5 w-5" /> Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/protocols" 
                className={`nav-link ${isActive('/protocols') ? 'bg-blue-600 text-white' : ''}`}
              >
                <BookOpen className="mr-3 h-5 w-5" /> EMT-B Protocols
              </Link>
            </li>
            <li>
              <Link 
                to="/skills" 
                className={`nav-link ${isActive('/skills') ? 'bg-blue-600 text-white' : ''}`}
              >
                <Stethoscope className="mr-3 h-5 w-5" /> Practical Skills
              </Link>
            </li>
            <li>
              <Link 
                to="/scenarios" 
                className={`nav-link ${isActive('/scenarios') ? 'bg-blue-600 text-white' : ''}`}
              >
                <Activity className="mr-3 h-5 w-5" /> Practice Scenarios
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-6">
            Advanced Levels
          </div>
          <ul className="space-y-2">
            <li>
              <Link to="/aemt" className="nav-link opacity-50">
                <Users className="mr-3 h-5 w-5" /> AEMT <span className="text-xs ml-auto">Coming Soon</span>
              </Link>
            </li>
            <li>
              <Link to="/paramedic" className="nav-link opacity-50">
                <FileText className="mr-3 h-5 w-5" /> Paramedic <span className="text-xs ml-auto">Coming Soon</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-6">
            Resources
          </div>
          <ul className="space-y-2">
            <li>
              <Link to="/settings" className="nav-link opacity-50">
                <Settings className="mr-3 h-5 w-5" /> Settings <span className="text-xs ml-auto">Soon</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/protocols" element={<Protocols />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/scenarios" element={<Scenarios />} />
              <Route path="/aemt" element={<ComingSoon title="AEMT Training" />} />
              <Route path="/paramedic" element={<ComingSoon title="Paramedic Training" />} />
              <Route path="/settings" element={<ComingSoon title="Settings" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;

