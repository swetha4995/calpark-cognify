import { motion } from 'framer-motion';

export default function SubjectCard({ subject, icon, color, progress, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group`}
    >
      {/* Icon */}
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        {/* Subject Name */}
        <h3 className="text-gray-800 font-semibold text-base">
          {subject}
        </h3>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
            className={`h-full rounded-full ${color}`}
          />
        </div>
      </div>

      {/* Hover Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
    </motion.div>
  );
}
