import { motion } from 'framer-motion';
import { Search, Bell, Settings, Trophy, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function TopNavBar({ user, onNavigate }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const xpPercent = user ? (user.xp / user.xpMax) * 100 : 0;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50 shadow-sm"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <span className="text-white text-xl font-bold">C</span>
          </motion.div>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-gradient-primary">
              Calphark Cognify
            </h1>
            <p className="text-xs text-gray-600">AI-Powered Learning</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search lessons, topics, quizzes..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* XP Progress */}
          {user && (
            <div className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-warning-50 to-warning-100/50 px-4 py-2 rounded-2xl border border-warning-200/50">
              <Trophy className="w-5 h-5 text-warning-600" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700">{user.xp} XP</span>
                  <div className="w-16 h-1.5 bg-warning-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPercent}%` }}
                      className="h-full bg-gradient-to-r from-warning-500 to-warning-600"
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500">Level {user.level}</span>
              </div>
            </div>
          )}

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('settings')}
            className="hidden md:block p-2.5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </motion.button>

          {/* User Profile */}
          {user && (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 pl-2 pr-3 py-2 bg-gradient-to-r from-primary-50 to-accent-50 hover:from-primary-100 hover:to-accent-100 rounded-2xl transition-all border border-primary-200/50"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </motion.button>

              {/* Dropdown */}
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-4 bg-gradient-to-r from-primary-50 to-accent-50 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">Level {user.level} Explorer</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-xl text-sm text-gray-700 transition-colors">
                      My Profile
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-xl text-sm text-gray-700 transition-colors">
                      Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-rose-50 rounded-xl text-sm text-rose-600 transition-colors">
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
