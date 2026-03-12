import { motion } from 'framer-motion';
import { Bot, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import AvatarPlaceholder from './AvatarPlaceholder';

export default function AIMentorCard({ onOpenMentor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-[28px] p-8 overflow-hidden shadow-2xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300 rounded-full blur-3xl" />
      </div>

      {/* Floating Sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            delay: i * 0.4,
            repeat: Infinity,
          }}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <Sparkles className="w-4 h-4 text-yellow-200" />
        </motion.div>
      ))}

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Left: AI Avatar */}
        <div className="flex justify-center">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* 3D AI Mentor Avatar Placeholder */}
            <div className="relative">
              <AvatarPlaceholder size="xl" userName="AI Mentor" className="shadow-2xl" />
              
              {/* Floating Icons */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl">💡</span>
              </motion.div>
              
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                }}
                className="absolute -bottom-2 -left-2 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl">✨</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="text-white">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Bot className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Assistant</span>
            </div>

            <h2 className="text-3xl font-bold mb-3">
              Meet Your AI Mentor
            </h2>

            <p className="text-white/90 mb-6 text-lg">
              Get instant help with homework, clear your doubts, and learn at your own pace with personalized guidance.
            </p>

            {/* Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-sm">24/7 Available for Questions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-sm">Personalized Learning Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎯</span>
                </div>
                <span className="text-sm">Step-by-Step Explanations</span>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenMentor}
              className="group bg-white text-purple-600 font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <span>Ask AI Mentor</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
