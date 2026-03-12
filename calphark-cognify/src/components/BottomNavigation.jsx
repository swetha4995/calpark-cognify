import { motion } from 'framer-motion';
import { Home, Map, BookOpen, BarChart3, User } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'roadmap', icon: Map, label: 'Roadmap' },
  { id: 'lessons', icon: BookOpen, label: 'Lessons' },
  { id: 'analytics', icon: BarChart3, label: 'Progress' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export default function BottomNavigation({ currentView, onNavigate }) {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Main Nav Bar */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
        <div className="flex items-center justify-around px-4 py-3 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center gap-1 group"
              >
                {/* Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-[20px] shadow-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <div className={`relative z-10 p-2 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                  <Icon className={`w-6 h-6 ${!isActive && 'group-hover:text-purple-600'} transition-colors`} />
                </div>

                {/* Label */}
                <span className={`relative z-10 text-xs font-medium ${
                  isActive ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Safe Area for iOS */}
      <div className="h-safe bg-white/90 backdrop-blur-xl" />
    </motion.nav>
  );
}
