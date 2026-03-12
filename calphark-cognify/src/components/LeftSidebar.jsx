import { motion } from 'framer-motion';
import { 
  Home, 
  Map, 
  BookOpen, 
  Gamepad2, 
  Trophy, 
  Users, 
  BarChart3, 
  Bot, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { id: 'home', icon: Home, label: 'Home', color: 'from-blue-500 to-cyan-500' },
  { id: 'roadmap', icon: Map, label: 'Learning Roadmap', color: 'from-purple-500 to-pink-500' },
  { id: 'lessons', icon: BookOpen, label: 'Lessons', color: 'from-green-500 to-emerald-500' },
  { id: 'games', icon: Gamepad2, label: 'Practice Games', color: 'from-orange-500 to-amber-500' },
  { id: 'achievements', icon: Trophy, label: 'Achievements', color: 'from-yellow-500 to-orange-500' },
  { id: 'leaderboard', icon: Users, label: 'Leaderboard', color: 'from-indigo-500 to-purple-500' },
  { id: 'analytics', icon: BarChart3, label: 'Progress Analytics', color: 'from-cyan-500 to-blue-500' },
  { id: 'mentor', icon: Bot, label: 'AI Mentor', color: 'from-pink-500 to-rose-500' },
  { id: 'settings', icon: Settings, label: 'Settings', color: 'from-gray-500 to-slate-500' },
];

export default function LeftSidebar({ currentView, onNavigate, isCollapsed, onToggleCollapse }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? '80px' : '280px',
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
        className="hidden lg:block fixed left-0 top-[73px] bottom-0 bg-white border-r border-gray-200/50 shadow-sm z-40 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Collapse Toggle */}
          <div className="p-4 border-b border-gray-100">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleCollapse}
              className="w-full flex items-center justify-center p-2.5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                    isActive 
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg shadow-purple-500/20' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-purple-600'} transition-colors`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Label */}
                  {!isCollapsed && (
                    <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
                      {item.label}
                    </span>
                  )}

                  {/* Sparkle effect on active */}
                  {isActive && !isCollapsed && (
                    <Sparkles className="w-4 h-4 text-white/70 ml-auto" />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Bottom Section - Daily Challenge */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 border-t border-gray-100"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-2xl">🎯</div>
                  <h4 className="font-bold text-sm">Daily Challenge</h4>
                </div>
                <p className="text-xs text-white/90 mb-3">
                  Complete 5 lessons to earn bonus XP!
                </p>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-white/90 rounded-full"
                  />
                </div>
                <p className="text-xs text-white/80 mt-2">3/5 completed</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
