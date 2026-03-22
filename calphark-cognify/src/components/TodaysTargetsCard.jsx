import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Flame, Target } from 'lucide-react';

const targets = [
  { id: 1, label: 'Complete 1 roadmap node', done: true },
  { id: 2, label: 'Practice 10 questions', done: false },
  { id: 3, label: 'Review yesterday notes', done: false },
];

export default function TodaysTargetsCard({ isDark = false }) {
  const completed = targets.filter((target) => target.done).length;
  const progress = Math.round((completed / targets.length) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl border p-5 md:p-6 min-w-0 ${
        isDark 
          ? 'skeu-card-dark' 
          : 'skeu-card'
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-4 min-w-0">
        <div className="min-w-0">
          <h3 className={`text-base font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Today's Targets</h3>
          <p className={`text-xs break-words ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Stay consistent with daily milestones.</p>
        </div>
        <div className={`h-9 w-9 rounded-lg border flex items-center justify-center ${
          isDark
            ? 'bg-emerald-900/30 border-emerald-900/50'
            : 'bg-emerald-50 border-emerald-100'
        }`}>
          <Target className="w-4 h-4 text-emerald-600" />
        </div>
      </div>

      <div className="mb-4">
        <div className={`flex items-center justify-between text-xs mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <span>{completed}/{targets.length} completed</span>
          <span>{progress}%</span>
        </div>
        <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45 }}
            className="h-full rounded-full bg-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-2.5 mb-4">
        {targets.map((target) => (
          <div key={target.id} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ${
            isDark
              ? 'bg-slate-700/50'
              : 'bg-slate-50'
          }`}>
            {target.done ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <Circle className="w-4 h-4 text-slate-400" />
            )}
            <span className={`text-sm break-words ${target.done ? (isDark ? 'text-slate-200' : 'text-slate-700') : (isDark ? 'text-slate-300' : 'text-slate-600')}`}>
              {target.label}
            </span>
          </div>
        ))}
      </div>

      <div className={`rounded-lg border px-3 py-2 flex items-center gap-2 ${
        isDark
          ? 'border-amber-900/50 bg-amber-900/30'
          : 'border-amber-200 bg-amber-50'
      }`}>
        <Flame className="w-4 h-4 text-amber-600" />
        <p className={`text-xs ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>Keep your streak active with one more study session.</p>
      </div>
    </motion.section>
  );
}
