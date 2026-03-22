import { motion } from 'framer-motion';
import { Flame, Award, Trophy, Target } from 'lucide-react';

export default function XPProgressCard({ user, isDark = false }) {
  const xpPercent = (user.xp / user.xpMax) * 100;
  const xpRemaining = user.xpMax - user.xp;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`lg:col-span-2 rounded-2xl ${
          isDark 
            ? 'skeu-card-dark' 
            : 'skeu-card'
        }`}
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h2 className={`text-xl font-semibold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Learning Progress</h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Consistent practice compounds over time.</p>
          </div>
          <div className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 ${
            isDark
              ? 'border-indigo-900/50 bg-indigo-900/30'
              : 'border-indigo-100 bg-indigo-50'
          }`}>
            <span className={`text-xs font-medium ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>Level</span>
            <span className={`text-sm font-semibold ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>{user.level}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>XP Progress</span>
              <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{user.xp} / {user.xpMax}</span>
            </div>
            <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-indigo-600"
              />
            </div>
            <p className={`mt-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{xpRemaining} XP to Level {user.level + 1}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Daily Target</span>
              <span className={`text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>75%</span>
            </div>
            <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 0.7 }}
                className="h-full rounded-full bg-emerald-500"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <div className={`rounded-2xl border p-4 ${
          isDark
            ? 'skeu-card-dark'
            : 'skeu-card'
        }`}>
          <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Progress Snapshot</p>
          <div className="space-y-3">
            <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
              isDark
                ? 'bg-slate-700/50'
                : 'bg-slate-50'
            }`}>
              <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Daily Streak</span>
              </div>
              <span className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{user.streak} days</span>
            </div>

            <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
              isDark
                ? 'bg-slate-700/50'
                : 'bg-slate-50'
            }`}>
              <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-sm">Achievements</span>
              </div>
              <span className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>12 badges</span>
            </div>

            <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
              isDark
                ? 'bg-slate-700/50'
                : 'bg-slate-50'
            }`}>
              <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <Target className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">Weekly Goal</span>
              </div>
              <span className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>5/7 sessions</span>
            </div>

            <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
              isDark
                ? 'bg-slate-700/50'
                : 'bg-slate-50'
            }`}>
              <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <Trophy className="w-4 h-4 text-indigo-500" />
                <span className="text-sm">Leaderboard</span>
              </div>
              <span className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Rank #4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
