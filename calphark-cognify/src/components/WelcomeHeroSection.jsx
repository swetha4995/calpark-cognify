import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function WelcomeHeroSection({ userName, onStartLearning, isDark = false }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-3xl border overflow-hidden ${
        isDark 
          ? 'liquid-glass-dark' 
          : 'liquid-glass border-slate-200 bg-white/50'
      }`}
    >
      <div className={`absolute right-0 top-0 h-full w-1/2 pointer-events-none ${
        isDark
          ? 'bg-[radial-gradient(circle_at_top,#1e3a8a,transparent_70%)]'
          : 'bg-[radial-gradient(circle_at_top,#e0e7ff,transparent_70%)]'
      }`} />

      <div className={`relative z-10 grid md:grid-cols-[1fr_auto] gap-5 items-center p-6 md:p-8`}>
        <div>
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium mb-3 ${
            isDark
              ? 'border-indigo-900/50 bg-indigo-900/30 text-indigo-300'
              : 'border-indigo-100 bg-indigo-50 text-indigo-700'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            AI Recommendation
          </div>

          <h1 className={`text-2xl md:text-3xl font-semibold leading-tight mb-2 ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {getGreeting()}, {userName}
          </h1>

          <p className={`max-w-2xl text-sm md:text-base ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            You are maintaining a strong pace this week. Continue your current roadmap node to stay on track for Level 13.
          </p>
        </div>

        <motion.button
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ y: 0, scale: 0.98 }}
          onClick={onStartLearning}
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white text-sm font-semibold hover:from-indigo-700 hover:to-indigo-800 transition shadow-lg"
        >
          Continue Learning
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.section>
  );
}
