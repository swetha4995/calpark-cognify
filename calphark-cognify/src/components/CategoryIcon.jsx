import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, BookText, Star, Compass } from 'lucide-react';

const iconMap = {
  lessons: BookOpen,
  games: Gamepad2,
  stories: BookText,
  activities: Star,
  discover: Compass,
};

export default function CategoryIcon({ type, label, bgColor, index }) {
  const Icon = iconMap[type] || BookOpen;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
      className="flex flex-col items-center gap-2 cursor-pointer group"
    >
      <div className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <span className="text-xs text-gray-700 font-medium">{label}</span>
    </motion.div>
  );
}
