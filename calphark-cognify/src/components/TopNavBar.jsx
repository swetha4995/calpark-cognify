import { motion } from 'framer-motion';
import { Search, Bell, Settings, Trophy, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function TopNavBar({ user, onNavigate }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const xpPercent = user ? Math.round((user.xp / user.xpMax) * 100) : 0;

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl"
    >
      <div className="h-[72px] px-4 md:px-6 flex items-center justify-between gap-3">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
            C
          </div>
          <div className="hidden sm:block text-left">
            <h1 className="text-[15px] font-semibold text-slate-900 leading-tight">Calphark Cognify</h1>
            <p className="text-xs text-slate-500">Learning Platform</p>
          </div>
        </button>

        <div className="hidden md:flex flex-1 max-w-2xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search lessons, topics, quizzes..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {user && (
            <div className="hidden lg:flex items-center gap-2.5 px-3 py-2 rounded-xl border border-amber-200 bg-amber-50/70">
              <Trophy className="w-4 h-4 text-amber-600" />
              <div className="min-w-[110px]">
                <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                  <span>{user.xp} XP</span>
                  <span>Lv {user.level}</span>
                </div>
                <div className="h-1.5 bg-amber-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercent}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-amber-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          )}

          <button className="relative h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition">
            <Bell className="w-4 h-4 text-slate-600 mx-auto" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="hidden sm:flex h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition items-center justify-center"
          >
            <Settings className="w-4 h-4 text-slate-600" />
          </button>

          {user && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="h-10 pl-2.5 pr-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="hidden md:block text-sm text-slate-700 font-medium">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-lg p-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-50">My Profile</button>
                  <button onClick={() => onNavigate('settings')} className="w-full text-left px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-50">Settings</button>
                  <button className="w-full text-left px-3 py-2 text-sm text-rose-600 rounded-lg hover:bg-rose-50">Sign Out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
