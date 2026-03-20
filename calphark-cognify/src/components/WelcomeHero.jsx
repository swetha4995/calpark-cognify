import { motion } from 'framer-motion';
import { Bell, Gift, ShoppingCart, TrendingUp, Menu } from 'lucide-react';

export default function WelcomeHero({ userName, progress = 10 }) {
  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="relative">
      {/* Top Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 rounded-t-3xl pt-6 px-6 pb-2">
        <div className="flex items-center justify-between mb-8">
          {/* Logo and Menu */}
          <div className="flex items-center gap-3">
            <button className="text-white/90 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-white text-xl font-bold tracking-wide">CALPHARK</h1>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="text-white/90 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></span>
            </button>
            <button className="text-white/90 hover:text-white">
              <Gift className="w-5 h-5" />
            </button>
            <button className="text-white/90 hover:text-white">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Time Display */}
        <div className="text-white/80 text-sm mb-1 flex items-center gap-2">
          <span className="text-xs">12:30</span>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 px-6 pb-8 rounded-b-3xl relative">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Avatar Circle */}
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <span className="text-3xl">👨‍🎓</span>
              </div>
            </div>
            
            {/* Analytics Button */}
            <button className="absolute -right-2 -bottom-2 w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-indigo-800 transition-colors">
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>

          {/* Greeting */}
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-900 text-lg font-semibold bg-white/95 px-6 py-2 rounded-full"
          >
            {timeOfDay()} {userName}!
          </motion.h2>
        </motion.div>

        {/* Progress Badge */}
        {progress && (
          <div className="absolute top-4 left-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <p className="text-white text-xs font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              Progress {progress}%
            </p>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-b-3xl">
          {/* Stars/Sparkles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${(i * 19) % 100}%`,
                top: `${(i * 31) % 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
