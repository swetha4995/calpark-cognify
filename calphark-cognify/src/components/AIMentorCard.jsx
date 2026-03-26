import { motion } from 'framer-motion';
import { Bot, MessageCircle, Sparkles, Zap, ArrowRight, BookOpen, Lightbulb, GraduationCap, Brain, Code2, Users, TrendingUp, ChevronRight, Star, Shield, Clock } from 'lucide-react';

export default function AIMentorCard({ onOpenMentor, isDark = false }) {
  const capabilities = [
    { icon: BookOpen, label: 'Deep Explanations', desc: 'Learn concepts thoroughly', color: 'from-blue-500 to-cyan-500' },
    { icon: Code2, label: 'Code Help', desc: 'Debug & understand', color: 'from-emerald-500 to-teal-500' },
    { icon: Brain, label: 'Smart Quizzes', desc: 'Test your knowledge', color: 'from-violet-500 to-purple-500' },
    { icon: TrendingUp, label: 'Track Progress', desc: 'Monitor improvement', color: 'from-amber-500 to-orange-500' },
  ];

  const stats = [
    { value: '50K+', label: 'Happy Learners' },
    { value: '98%', label: 'Satisfaction' },
    { value: '<2s', label: 'Avg Response' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      onClick={onOpenMentor}
      className={`relative overflow-hidden rounded-3xl cursor-pointer group ${
        isDark
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-700/50'
          : 'bg-gradient-to-br from-white via-slate-50 to-white border border-slate-200/80 shadow-xl shadow-violet-500/5'
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-20 -left-20 w-56 h-56 bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [-20, 20, -20], 
                x: [10, -10, 10],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 4 + i, 
                repeat: Infinity, 
                delay: i * 0.5,
                ease: 'easeInOut'
              }}
              className={`absolute w-2 h-2 rounded-full ${
                isDark ? 'bg-violet-500/40' : 'bg-violet-400/60'
              }`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 p-6 md:p-8">
        {/* Header Section */}
        <div className="flex items-start gap-5 mb-6">
          {/* Avatar */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative shrink-0"
          >
            {/* Glow effect */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-4 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 rounded-3xl blur-xl"
            />
            
            {/* Avatar Container */}
            <div className="relative w-18 h-18 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-fuchsia-500/40">
              <Brain className="w-9 h-9 text-white" />
              
              {/* Status indicator */}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-3 border-white flex items-center justify-center"
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              </motion.span>
            </div>
          </motion.div>

          {/* Title & Badge */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  AI Powered
                </span>
              </motion.span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Available 24/7
              </motion.span>
            </div>
            
            <h2 className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                AI Learning Assistant
              </span>
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Your personal mentor, available anytime
            </p>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.08, type: 'spring' }}
              whileHover={{ scale: 1.03, y: -2 }}
              className={`group relative p-4 rounded-2xl overflow-hidden transition-all duration-300 ${
                isDark 
                  ? 'bg-slate-800/50 hover:bg-slate-800' 
                  : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cap.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cap.color} flex items-center justify-center mb-3 shadow-lg`}>
                <cap.icon className="w-5 h-5 text-white" />
              </div>
              
              <h4 className={`font-semibold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {cap.label}
              </h4>
              <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 p-[2px] mb-5"
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: [-100, 400] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          
          <div className="relative bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 rounded-[14px] px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="block text-white font-bold text-lg leading-tight">Start Learning Now</span>
                  <span className={`text-xs ${isDark ? 'text-violet-200' : 'text-violet-100'}`}>
                    Get personalized help instantly
                  </span>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-7 h-7 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className={`text-center p-3 rounded-xl ${
                isDark ? 'bg-slate-800/30' : 'bg-slate-50'
              }`}
            >
              <span className={`block text-xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent`}>
                {stat.value}
              </span>
              <span className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 mt-4">
          {[
            { icon: Shield, text: 'Safe & Secure' },
            { icon: Clock, text: '24/7 Support' },
            { icon: Star, text: 'Top Rated' },
          ].map((badge, idx) => (
            <div key={idx} className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <badge.icon className="w-3.5 h-3.5" />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
