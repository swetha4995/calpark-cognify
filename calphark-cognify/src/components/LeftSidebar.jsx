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
  Zap
} from 'lucide-react';

const menuItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'roadmap', icon: Map, label: 'Learning Roadmap' },
  { id: 'lessons', icon: BookOpen, label: 'Lessons' },
  { id: 'games', icon: Gamepad2, label: 'Practice' },
  { id: 'achievements', icon: Trophy, label: 'Achievements' },
  { id: 'leaderboard', icon: Users, label: 'Leaderboard' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'mentor', icon: Bot, label: 'AI Mentor' },
  { id: 'quiz', icon: Zap, label: 'Quiz & Performance' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function LeftSidebar({ currentView, onNavigate, isCollapsed, onToggleCollapse, isDark = false }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? '80px' : '280px',
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
        className={`hidden lg:block fixed left-0 top-[73px] bottom-0 border-r z-40 overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className={`px-4 py-3 border-b flex items-center justify-between ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
            {!isCollapsed && <p className={`text-xs font-semibold tracking-wide uppercase ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Navigation</p>}
            <button
              onClick={onToggleCollapse}
              className={`h-8 w-8 rounded-lg border transition inline-flex items-center justify-center ${
                isDark ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              {isCollapsed ? <ChevronRight className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} /> : <ChevronLeft className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />}
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                      : isDark
                      ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100 border border-transparent'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  {isActive && (
                    <span className="h-5 w-1 rounded-full bg-indigo-600" />
                  )}

                  <div className={`flex-shrink-0 ${isActive ? 'text-indigo-700' : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {!isCollapsed && (
                    <span className={`text-sm font-medium ${isActive ? 'text-indigo-700' : isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {!isCollapsed && (
            <div className={`p-4 border-t ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
              <div className={`rounded-xl border p-4 ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'}`}>
                <p className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Daily Goal</p>
                <p className={`text-sm font-medium mb-3 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>Complete 5 lessons today</p>
                <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <div className="h-full w-3/5 rounded-full bg-indigo-500" />
                </div>
                <p className={`mt-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>3 of 5 completed</p>
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
