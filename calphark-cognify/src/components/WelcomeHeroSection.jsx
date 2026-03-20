import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function WelcomeHeroSection({ userName, onStartLearning }) {
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
      className="relative rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm overflow-hidden"
    >
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top,#e0e7ff,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-5 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI Recommendation
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-tight mb-2">
            {getGreeting()}, {userName}
          </h1>

          <p className="text-slate-600 max-w-2xl text-sm md:text-base">
            You are maintaining a strong pace this week. Continue your current roadmap node to stay on track for Level 13.
          </p>
        </div>

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
          onClick={onStartLearning}
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
        >
          Continue Learning
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.section>
  );
}
