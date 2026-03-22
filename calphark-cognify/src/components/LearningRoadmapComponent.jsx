import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';

const roadmapData = [
  { id: 1, title: 'Welcome to Cognify', topic: 'Onboarding', status: 'completed' },
  { id: 2, title: 'Numbers and Operations', topic: 'Foundations', status: 'completed' },
  { id: 3, title: 'Introduction to Algebra', topic: 'Core Math', status: 'current' },
  { id: 4, title: 'Linear Equations', topic: 'Core Math', status: 'upcoming' },
  { id: 5, title: 'Functions and Graphs', topic: 'Intermediate', status: 'upcoming' },
  { id: 6, title: 'Quiz and Mastery Check', topic: 'Assessment', status: 'locked' },
];

export default function LearningRoadmapComponent({ isDark = false }) {
  return (
    <section className={`rounded-2xl border p-5 md:p-6 overflow-hidden min-w-0 ${
      isDark 
        ? 'skeu-card-dark' 
        : 'skeu-card'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h2 className={`text-xl font-semibold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Learning Roadmap</h2>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>A guided path through your next lessons.</p>
        </div>
        <div className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
          isDark
            ? 'border-indigo-900/50 bg-indigo-900/30 text-indigo-300'
            : 'border-indigo-100 bg-indigo-50 text-indigo-700'
        }`}>
          2 of 6 completed
        </div>
      </div>

      <div className="relative pl-1 sm:pl-2 min-w-0">
        <div className={`absolute left-4 sm:left-5 top-4 bottom-4 w-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />

        <div className="space-y-4">
          {roadmapData.map((lesson, index) => {
            const isCompleted = lesson.status === 'completed';
            const isCurrent = lesson.status === 'current';
            const isLocked = lesson.status === 'locked';

            return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06, duration: 0.28 }}
              className="relative pl-9 sm:pl-10 min-w-0"
            >
              <div
                className={`absolute left-0 top-2 h-8 w-8 sm:h-10 sm:w-10 rounded-full border flex items-center justify-center ${
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : isCurrent
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : isDark ? 'bg-slate-700 border-slate-600 text-slate-400' : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : isLocked ? <Lock className="w-4 h-4" /> : <span className="text-xs font-semibold">{lesson.id}</span>}
              </div>

              <div
                className={`rounded-xl border p-3 sm:p-4 min-w-0 ${
                  isCurrent
                    ? isDark ? 'border-indigo-900/50 bg-indigo-900/30' : 'border-indigo-200 bg-indigo-50/50'
                    : isLocked
                    ? isDark ? 'border-slate-700 bg-slate-700/40 opacity-75' : 'border-slate-200 bg-slate-50/80 opacity-75'
                    : isDark ? 'border-slate-700 bg-slate-700/40' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold break-words ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{lesson.title}</p>
                    <p className={`text-xs mt-1 break-words ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{lesson.topic}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-md self-start sm:self-auto whitespace-nowrap ${
                    isCompleted
                      ? isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                      : isCurrent
                      ? isDark ? 'bg-indigo-900/40 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
                      : isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isCompleted ? 'Completed' : isCurrent ? 'Current' : isLocked ? 'Locked' : 'Upcoming'}
                  </span>
                </div>
              </div>
            </motion.div>
          );})}
        </div>
      </div>
    </section>
  );
}
