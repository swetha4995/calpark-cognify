import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, BookText, Code, FlaskConical, ArrowUpRight } from 'lucide-react';

const categories = [
  {
    id: 'lessons',
    icon: BookOpen,
    title: 'Lessons',
    description: 'Interactive learning modules',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    emoji: '📚',
    count: 12
  },
  {
    id: 'games',
    icon: Gamepad2,
    title: 'Games',
    description: 'Fun practice challenges',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    emoji: '🎮',
    count: 8
  },
  {
    id: 'stories',
    icon: BookText,
    title: 'Stories',
    description: 'Learn through narratives',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
    emoji: '📖',
    count: 15
  },
  {
    id: 'coding',
    icon: Code,
    title: 'Coding Challenges',
    description: 'Build real projects',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'from-orange-50 to-amber-50',
    emoji: '💻',
    count: 6
  },
  {
    id: 'discovery',
    icon: FlaskConical,
    title: 'Discovery Lab',
    description: 'Explore & experiment',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50',
    emoji: '🔬',
    count: 10
  },
];

export default function LearningCategories({ onSelectCategory }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Learning Categories</h2>
          <p className="text-gray-500">Choose your learning path</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon;

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(category.id)}
              className="group relative bg-white rounded-[24px] p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.06 }}
                  transition={{ duration: 0.35 }}
                  className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-[20px] flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-3">
                  {category.description}
                </p>

                {/* Count Badge */}
                <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center gap-1 bg-gradient-to-r ${category.color} px-3 py-1 rounded-full`}>
                    <span className="text-white text-xs font-bold">{category.count}</span>
                    <span className="text-white text-xs">items</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>

              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-white/40 blur-lg pointer-events-none" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
