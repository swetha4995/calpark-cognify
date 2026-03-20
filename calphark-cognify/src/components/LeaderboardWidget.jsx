import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Sarah Chen', xp: 2980, avatar: '👧', color: 'from-yellow-400 to-orange-500', streak: 15 },
  { rank: 2, name: 'Alex Kumar', xp: 2840, avatar: '👦', color: 'from-gray-400 to-gray-500', streak: 12 },
  { rank: 3, name: 'Maya Wilson', xp: 2750, avatar: '👱‍♀️', color: 'from-orange-600 to-orange-700', streak: 10 },
  { rank: 4, name: 'Jordan Lee', xp: 2680, avatar: '🧒', color: 'from-purple-500 to-pink-500', streak: 8 },
  { rank: 5, name: 'Emma Davis', xp: 2590, avatar: '👧', color: 'from-blue-500 to-cyan-500', streak: 9 },
];

export default function LeaderboardWidget() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Crown className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Leaderboard</h3>
            <p className="text-xs text-slate-500">Top learners this week</p>
          </div>
        </div>
        <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">
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
            className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100"
          >
            <div className="text-sm font-semibold text-slate-500 w-5 text-center">
              #{user.rank}
            </div>
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-lg">
              {user.avatar}
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-800 text-sm">{user.name}</p>
              <p className="text-xs text-slate-500">{user.xp} XP</p>
            </div>
            <div className="text-xs font-medium text-slate-500">
              {user.streak}d
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
