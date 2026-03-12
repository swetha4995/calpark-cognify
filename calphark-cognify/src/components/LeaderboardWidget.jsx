import { motion } from 'framer-motion';
import { Crown, TrendingUp, Medal } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Sarah Chen', xp: 2980, avatar: '👧', color: 'from-yellow-400 to-orange-500', streak: 15 },
  { rank: 2, name: 'Alex Kumar', xp: 2840, avatar: '👦', color: 'from-gray-400 to-gray-500', streak: 12 },
  { rank: 3, name: 'Maya Wilson', xp: 2750, avatar: '👱‍♀️', color: 'from-orange-600 to-orange-700', streak: 10 },
  { rank: 4, name: 'Jordan Lee', xp: 2680, avatar: '🧒', color: 'from-purple-500 to-pink-500', streak: 8 },
  { rank: 5, name: 'Emma Davis', xp: 2590, avatar: '👧', color: 'from-blue-500 to-cyan-500', streak: 9 },
];

const getRankIcon = (rank) => {
  if (rank === 1) return { icon: '🥇', label: 'Gold' };
  if (rank === 2) return { icon: '🥈', label: 'Silver' };
  if (rank === 3) return { icon: '🥉', label: 'Bronze' };
  return { icon: '⭐', label: `#${rank}` };
};

export default function LeaderboardWidget() {
  return (
    <div className="bg-white rounded-[28px] p-6 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-md">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Leaderboard</h3>
            <p className="text-xs text-gray-500">Top learners this week</p>
          </div>
        </div>
        <button className="text-purple-600 text-sm font-semibold hover:text-purple-700">
          View All
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-4 mb-8">
        {/* 2nd Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              {leaderboardData[1].avatar}
            </div>
            <div className="absolute -top-2 -right-2 text-2xl">
              🥈
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-400 to-gray-500 w-20 h-16 rounded-t-2xl flex flex-col items-center justify-center text-white">
            <p className="text-xs font-bold">2nd</p>
            <p className="text-lg font-bold">{leaderboardData[1].xp}</p>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center -mt-4"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-3xl mb-2"
          >
            👑
          </motion.div>
          <div className="relative mb-2">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl shadow-2xl"
            >
              {leaderboardData[0].avatar}
            </motion.div>
            <div className="absolute -top-2 -right-2 text-3xl">
              🥇
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-24 h-24 rounded-t-2xl flex flex-col items-center justify-center text-white shadow-lg">
            <p className="text-xs font-bold">1st</p>
            <p className="text-2xl font-bold">{leaderboardData[0].xp}</p>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              {leaderboardData[2].avatar}
            </div>
            <div className="absolute -top-2 -right-2 text-2xl">
              🥉
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 w-20 h-12 rounded-t-2xl flex flex-col items-center justify-center text-white">
            <p className="text-xs font-bold">3rd</p>
            <p className="text-lg font-bold">{leaderboardData[2].xp}</p>
          </div>
        </motion.div>
      </div>

      {/* Rest of List */}
      <div className="space-y-3">
        {leaderboardData.slice(3).map((user, index) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            <div className="text-lg font-bold text-gray-400 w-6">
              #{user.rank}
            </div>
            <div className={`w-10 h-10 bg-gradient-to-br ${user.color} rounded-xl flex items-center justify-center text-xl shadow-sm`}>
              {user.avatar}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
              <p className="text-xs text-gray-500">{user.xp} XP</p>
            </div>
            <div className="flex items-center gap-1 text-orange-500">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-semibold">{user.streak}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
