import { motion } from 'framer-motion';
import { Home, Map, BookOpen, Gamepad2, Bot } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'roadmap', icon: Map, label: 'Roadmap' },
  { id: 'lessons', icon: BookOpen, label: 'Lessons' },
  { id: 'games', icon: Gamepad2, label: 'Practice' },
  { id: 'mentor', icon: Bot, label: 'Mentor' },
];

export default function BottomNavigation({ currentView, onNavigate, isDark = false }) {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
    >
      <div className={`backdrop-blur-xl border-t shadow-lg ${isDark ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-slate-200'}`}>
        <div className="flex items-center justify-around px-4 py-3 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition ${
                  isActive ? 'text-indigo-600' : isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {isActive && (
                  <span className="absolute -top-1 h-1.5 w-8 rounded-full bg-indigo-600" />
                )}

                <div className="relative z-10 p-1">
                  <Icon className="w-5 h-5" />
                </div>

                <span className="relative z-10 text-[11px] font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`h-safe backdrop-blur-xl ${isDark ? 'bg-slate-900/95' : 'bg-white/95'}`} />
    </motion.nav>
  );
}
