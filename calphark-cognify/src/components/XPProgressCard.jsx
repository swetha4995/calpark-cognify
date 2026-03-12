import { motion } from 'framer-motion';
import { Trophy, Flame, Target, Award } from 'lucide-react';

export default function XPProgressCard({ user }) {
  const xpPercent = (user.xp / user.xpMax) * 100;
  const xpRemaining = user.xpMax - user.xp;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (xpPercent / 100) * circumference;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Main XP Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="md:col-span-2 bg-white rounded-[28px] p-8 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Your Progress</h3>
            <p className="text-gray-500">Keep going! You're on fire! 🔥</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Circular Progress */}
          <div className="relative">
            <svg className="w-40 h-40 transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-gray-100"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#xpProgressGradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="xpProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#F43F5E" />
                </linearGradient>
              </defs>
            </svg>
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                {user.level}
              </motion.div>
              <span className="text-sm text-gray-500 font-medium">LEVEL</span>
            </div>
          </div>

          {/* Progress Details */}
          <div className="flex-1">
            <div className="space-y-4">
              {/* XP Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Experience Points</span>
                  <span className="text-sm text-gray-500">{user.xp} / {user.xpMax} XP</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercent}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  </motion.div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{xpRemaining} XP to Level {user.level + 1}</p>
              </div>

              {/* Daily Goal */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Daily Goal</span>
                  <span className="text-sm text-green-600 font-semibold">75%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  />
                </div>
              </div>

              {/* Motivational Text */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-orange-200/50">
                <p className="text-sm font-medium text-gray-700">
                  🎯 <span className="font-bold text-orange-600">Amazing!</span> Complete 2 more lessons to reach your daily goal!
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="space-y-6">
        {/* Streak Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-[28px] p-6 text-white shadow-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold">{user.streak}</p>
              <p className="text-sm text-white/80">Day Streak</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <p className="text-xs font-medium">🔥 Keep it up! Don't break the chain!</p>
          </div>
        </motion.div>

        {/* Achievements Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-[28px] p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-md">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-gray-800">Achievements</h4>
          </div>
          <div className="flex items-center gap-2">
            {['🏆', '⭐', '💎', '🎯'].map((emoji, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-2xl shadow-sm"
              >
                {emoji}
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">+3 more to unlock</p>
        </motion.div>
      </div>
    </div>
  );
}
