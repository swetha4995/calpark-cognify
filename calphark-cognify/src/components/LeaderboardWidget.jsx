import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Sarah Chen', xp: 2980, avatar: '👧', color: 'from-yellow-400 to-orange-500', streak: 15 },
  { rank: 2, name: 'Alex Kumar', xp: 2840, avatar: '👦', color: 'from-gray-400 to-gray-500', streak: 12 },
  { rank: 3, name: 'Maya Wilson', xp: 2750, avatar: '👱‍♀️', color: 'from-orange-600 to-orange-700', streak: 10 },
  { rank: 4, name: 'Jordan Lee', xp: 2680, avatar: '🧒', color: 'from-purple-500 to-pink-500', streak: 8 },
  { rank: 5, name: 'Emma Davis', xp: 2590, avatar: '👧', color: 'from-blue-500 to-cyan-500', streak: 9 },
];

export default function LeaderboardWidget({ isDark = false }) {
  return (
    <section className={`rounded-2xl border ${
      isDark 
        ? 'skeu-card-dark' 
        : 'skeu-card'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
            isDark
              ? 'bg-amber-900/30 border-amber-900/50'
              : 'bg-amber-50 border-amber-200'
          }`}>
            <Crown className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h3 className={`text-base font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Leaderboard</h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Top learners this week</p>
          </div>
        </div>
        <button className={`text-xs font-medium hover:opacity-80 transition ${
          isDark
            ? 'text-indigo-400'
            : 'text-indigo-600'
        }`}>
          View all
        </button>
      </div>

      <div className="space-y-2.5">
        {leaderboardData.map((user, index) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-3 p-2.5 rounded-lg border ${
              isDark
                ? 'bg-slate-700/50 border-slate-600'
                : 'bg-slate-50 border-slate-100'
            }`}
          >
            <div className={`text-sm font-semibold w-5 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              #{user.rank}
            </div>
            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center text-lg ${
              isDark
                ? 'bg-slate-600 border-slate-500'
                : 'bg-white border-slate-200'
            }`}>
              {user.avatar}
            </div>
            <div className="flex-1">
              <p className={`font-medium text-sm ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{user.name}</p>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{user.xp} XP</p>
            </div>
            <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {user.streak}d
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
