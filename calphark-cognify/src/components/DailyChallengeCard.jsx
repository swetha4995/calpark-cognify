import { motion } from 'framer-motion';
import { Target, Zap, CheckCircle } from 'lucide-react';

const dailyChallenges = [
  { id: 1, title: 'Complete 3 Lessons', progress: 2, total: 3, xp: 150, icon: '📚', completed: false },
  { id: 2, title: 'Practice 10 Problems', progress: 10, total: 10, xp: 100, icon: '✏️', completed: true },
  { id: 3, title: '20 Min Study Time', progress: 15, total: 20, xp: 75, icon: '⏱️', completed: false },
];

export default function DailyChallengeCard() {
  const totalCompleted = dailyChallenges.filter(c => c.completed).length;
  const totalChallenges = dailyChallenges.length;

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-[28px] p-6 text-white shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 5
            }}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Daily Challenges</h3>
              <p className="text-xs text-white/80">{totalCompleted}/{totalChallenges} completed</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          </motion.div>
        </div>

        {/* Challenges List */}
        <div className="space-y-3 mb-4">
          {dailyChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{challenge.icon}</span>
                  <div>
                    <p className="font-semibold text-sm">{challenge.title}</p>
                    <p className="text-xs text-white/70">{challenge.xp} XP</p>
                  </div>
                </div>
                {challenge.completed && (
                  <CheckCircle className="w-5 h-5 text-green-300 fill-green-300" />
                )}
              </div>
              {/* Progress Bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  className={`h-full rounded-full ${
                    challenge.completed 
                      ? 'bg-green-400' 
                      : 'bg-gradient-to-r from-yellow-300 to-orange-400'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-bold py-3 rounded-2xl transition-all"
        >
          View All Challenges
        </motion.button>
      </div>
    </div>
  );
}
