import { motion } from 'framer-motion';
import { Flame, Award, Trophy, Target } from 'lucide-react';

export default function XPProgressCard({ user }) {
  const xpPercent = (user.xp / user.xpMax) * 100;
  const xpRemaining = user.xpMax - user.xp;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-1">Learning Progress</h2>
            <p className="text-sm text-slate-500">Consistent practice compounds over time.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-1.5">
            <span className="text-xs font-medium text-indigo-700">Level</span>
            <span className="text-sm font-semibold text-indigo-700">{user.level}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">XP Progress</span>
              <span className="text-sm text-slate-500">{user.xp} / {user.xpMax}</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-indigo-600"
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">{xpRemaining} XP to Level {user.level + 1}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Daily Target</span>
              <span className="text-sm font-medium text-emerald-600">75%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
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
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500 mb-3">Progress Snapshot</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Daily Streak</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">{user.streak} days</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-sm">Achievements</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">12 badges</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Target className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">Weekly Goal</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">5/7 sessions</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Trophy className="w-4 h-4 text-indigo-500" />
                <span className="text-sm">Leaderboard</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">Rank #4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
