import { motion } from 'framer-motion';
import { Bot, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import AvatarPlaceholder from './AvatarPlaceholder';

export default function AIMentorCard({ onOpenMentor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top,#e0e7ff,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-start gap-4 mb-5"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            className="shrink-0"
          >
            <AvatarPlaceholder size="lg" userName="AI Mentor" className="shadow-2xl" />
          </motion.div>

          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full mb-3 text-indigo-700">
              <Bot className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">AI Mentor</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mb-2">Need a quick hint?</h2>
            <p className="text-sm text-slate-600">
              Get help with questions, homework, and personalized next steps.
            </p>
          </div>
        </motion.div>

        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <MessageCircle className="w-4 h-4 text-indigo-500" />
            <span>Instant doubt solving</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Personalized explanations</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenMentor}
          className="group w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-xl transition flex items-center justify-center gap-2"
        >
          <span>Ask AI Mentor</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}
