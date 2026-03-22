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

export default function LessonExplorer({ onStartLesson, isDark = false }) {
  return (
    <section className={`rounded-2xl border p-6 ${
      isDark ? 'liquid-glass-dark' : 'liquid-glass border-slate-200 bg-white/70'
    }`}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className={`text-xl font-semibold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Lessons</h2>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Continue your active modules or start the next lesson.</p>
        </div>
        <button className={`text-sm font-medium transition-colors ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}>
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className={`rounded-xl border p-4 transition shadow-sm hover:shadow-md ${
              lesson.isLocked ? 'opacity-75' : ''
            } ${lesson.isCompleted
              ? isDark
                ? 'border-emerald-900/40 bg-emerald-900/20'
                : 'border-emerald-200 bg-emerald-50/40'
              : isDark
                ? 'border-slate-700 bg-slate-900/40'
                : 'border-slate-200 bg-white'}`}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                <div className={`inline-flex items-center text-[11px] px-2 py-1 rounded-md border mb-2 ${
                  isDark
                    ? lesson.difficulty === 'Beginner'
                      ? 'bg-emerald-900/40 text-emerald-300 border-emerald-800'
                      : lesson.difficulty === 'Intermediate'
                        ? 'bg-amber-900/40 text-amber-300 border-amber-800'
                        : 'bg-rose-900/40 text-rose-300 border-rose-800'
                    : getDifficultyColor(lesson.difficulty)
                }`}>
                  {lesson.difficulty}
                </div>
                  <h3 className={`text-base font-semibold leading-snug ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {lesson.title}
                  </h3>
                </div>

                <div className="text-2xl leading-none">{lesson.illustration}</div>
              </div>

              <div className="mb-4">
                {!lesson.isLocked && (
                  <>
                    <div className={`flex items-center justify-between text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span>Progress</span>
                      <span className="font-semibold">{lesson.progress}/{lesson.total}</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(lesson.progress / lesson.total) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                        className="h-full bg-indigo-600 rounded-full"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className={`flex items-center gap-3 mb-4 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{lesson.xp} XP</span>
                </div>
              </div>

              <div className="mt-auto">
                {lesson.isLocked ? (
                  <button disabled className={`w-full h-10 text-sm font-medium rounded-lg flex items-center justify-center gap-2 cursor-not-allowed ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                    <Lock className="w-4 h-4" />
                    <span>Locked</span>
                  </button>
                ) : lesson.isCompleted ? (
                  <button
                    onClick={() => onStartLesson(lesson.id)}
                    className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Review</span>
                  </button>
                ) : lesson.progress > 0 ? (
                  <button
                    onClick={() => onStartLesson(lesson.id)}
                    className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Continue</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onStartLesson(lesson.id)}
                    className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Lesson</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
