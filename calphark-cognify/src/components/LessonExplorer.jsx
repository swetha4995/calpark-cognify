import { motion } from 'framer-motion';
import { Play, Lock, CheckCircle, Clock, Star, TrendingUp } from 'lucide-react';

const lessons = [
  {
    id: 1,
    title: 'Introduction to Algebra',
    difficulty: 'Beginner',
    progress: 5,
    total: 5,
    duration: '15 min',
    xp: 100,
    isCompleted: true,
    isLocked: false,
    illustration: '🎯',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50'
  },
  {
    id: 2,
    title: 'Linear Equations Basics',
    difficulty: 'Beginner',
    progress: 3,
    total: 5,
    duration: '20 min',
    xp: 120,
    isCompleted: false,
    isLocked: false,
    illustration: '📐',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50'
  },
  {
    id: 3,
    title: 'Quadratic Functions',
    difficulty: 'Intermediate',
    progress: 0,
    total: 6,
    duration: '25 min',
    xp: 150,
    isCompleted: false,
    isLocked: false,
    illustration: '📊',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50'
  },
  {
    id: 4,
    title: 'Advanced Polynomials',
    difficulty: 'Advanced',
    progress: 0,
    total: 8,
    duration: '30 min',
    xp: 200,
    isCompleted: false,
    isLocked: true,
    illustration: '🚀',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'from-orange-50 to-amber-50'
  },
  {
    id: 5,
    title: 'Trigonometry Fundamentals',
    difficulty: 'Intermediate',
    progress: 0,
    total: 7,
    duration: '22 min',
    xp: 180,
    isCompleted: false,
    isLocked: true,
    illustration: '📏',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50'
  },
  {
    id: 6,
    title: 'Calculus Introduction',
    difficulty: 'Advanced',
    progress: 0,
    total: 10,
    duration: '35 min',
    xp: 250,
    isCompleted: false,
    isLocked: true,
    illustration: '∫',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50'
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-700 border-green-200';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Advanced': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export default function LessonExplorer({ onStartLesson }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Explore Lessons</h2>
          <p className="text-gray-500">Continue where you left off or start something new</p>
        </div>
        <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`relative bg-white rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 ${
              lesson.isLocked ? 'opacity-75' : ''
            }`}
          >
            {/* Gradient Header */}
            <div className={`relative h-32 bg-gradient-to-br ${lesson.bgColor} flex items-center justify-center overflow-hidden`}>
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-12 translate-x-12" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-10 -translate-x-10" />
              
              {/* Illustration */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-6xl relative z-10"
              >
                {lesson.illustration}
              </motion.div>

              {/* Difficulty Badge */}
              <div className={`absolute top-3 left-3 px-3 py-1 border rounded-full text-xs font-semibold ${getDifficultyColor(lesson.difficulty)}`}>
                {lesson.difficulty}
              </div>

              {/* Completion/Lock Badge */}
              {lesson.isCompleted && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
              {lesson.isLocked && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {lesson.title}
              </h3>

              {/* Progress Bar */}
              {!lesson.isLocked && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span className="font-semibold">{lesson.progress}/{lesson.total}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(lesson.progress / lesson.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${lesson.color} rounded-full`}
                    />
                  </div>
                </div>
              )}

              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-yellow-600">{lesson.xp} XP</span>
                </div>
              </div>

              {/* Action Button */}
              {lesson.isLocked ? (
                <button disabled className="w-full bg-gray-200 text-gray-500 font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed">
                  <Lock className="w-4 h-4" />
                  <span>Locked</span>
                </button>
              ) : lesson.isCompleted ? (
                <button
                  onClick={() => onStartLesson(lesson.id)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Review</span>
                </button>
              ) : lesson.progress > 0 ? (
                <button
                  onClick={() => onStartLesson(lesson.id)}
                  className={`w-full bg-gradient-to-r ${lesson.color} hover:opacity-90 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all`}
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Continue</span>
                </button>
              ) : (
                <button
                  onClick={() => onStartLesson(lesson.id)}
                  className={`w-full bg-gradient-to-r ${lesson.color} hover:opacity-90 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all`}
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Lesson</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
