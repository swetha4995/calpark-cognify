import { motion } from 'framer-motion';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function WelcomeHeroSection({ userName, onStartLearning }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-[28px] p-8 md:p-10 overflow-hidden shadow-2xl"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl"
        />
        
        {/* Sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -30],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 3
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
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="text-white">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
          >
            <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-sm font-medium">Level up your skills today!</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            {getGreeting()}, <br />
            <span className="text-yellow-200">{userName}!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/90 mb-6"
          >
            Continue your <span className="font-semibold text-yellow-200">learning adventure</span> today! You're doing amazing! 🚀
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartLearning}
            className="group bg-white text-purple-600 font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3"
          >
            <span className="text-lg">Start Learning</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-6 mt-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-white/70">Day Streak</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-white/70">Completed</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Learning Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          className="relative hidden md:block"
        >
          {/* Illustration Container */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-yellow-300/30 blur-3xl rounded-full" />
            
            {/* Main Illustration */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 text-center"
            >
              {/* Character */}
              <div className="text-9xl mb-4 drop-shadow-2xl">
                🎓
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-0 text-4xl"
              >
                📚
              </motion.div>
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  x: [0, -5, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute bottom-10 left-0 text-4xl"
              >
                ✨
              </motion.div>
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{ duration: 2.8, repeat: Infinity }}
                className="absolute top-10 left-10 text-3xl"
              >
                🌟
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
