import { motion } from 'framer-motion';

export default function LevelProgress({ level, title, progress }) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-white/90 text-xs font-medium mb-1">Level {level}</p>
          <p className="text-white text-sm font-semibold">{title}</p>
        </div>
        <div className="text-3xl">
          {progress >= 100 ? '🎉' : '💪'}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="relative h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full relative"
        >
          <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
        </motion.div>
        
        {/* Progress Knob */}
        <motion.div
          initial={{ left: '0%' }}
          animate={{ left: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-lg"
        />
      </div>
    </div>
  );
}
