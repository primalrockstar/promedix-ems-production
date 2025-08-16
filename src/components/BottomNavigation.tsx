import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Heart, Calculator, Menu } from 'lucide-react';

// Bottom Navigation Component for Mobile
const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bottomNavItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Modules', path: '/modules', icon: BookOpen },
    { name: 'EMT-B', path: '/emtb', icon: Heart },
    { name: 'Tools', path: '/tools', icon: Calculator },
    { name: 'More', path: '/more', icon: Menu },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
      <div className="grid grid-cols-5 h-16">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
