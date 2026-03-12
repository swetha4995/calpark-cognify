import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function LessonCard({ title, description, progress, maxScore, isLocked, character, bgColor, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative bg-gradient-to-br ${bgColor} rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ${!isLocked ? 'cursor-pointer' : 'opacity-75'}`}
    >
      <div className="flex items-center justify-between">
        {/* Left Content */}
        <div className="flex-1">
          <h3 className="text-gray-800 font-semibold text-base mb-1">
            {title}
          </h3>
          <p className="text-gray-600 text-xs mb-3 pr-2">
            {description}
          </p>

          {/* Action Button */}
          {isLocked ? (
            <button className="bg-gray-300 text-gray-600 px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              Unlock
            </button>
          ) : (
            <button className="bg-orange-400 hover:bg-orange-500 text-white px-5 py-1.5 rounded-full text-xs font-medium transition-colors">
              Start
            </button>
          )}
        </div>

        {/* Right Content - Character & Score */}
        <div className="flex flex-col items-center">
          <div className="text-5xl mb-2">
            {character}
          </div>
          <div className="bg-gray-900 text-white px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-xs font-bold">{progress}</span>
            <span className="text-xs text-gray-400">/{maxScore}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
