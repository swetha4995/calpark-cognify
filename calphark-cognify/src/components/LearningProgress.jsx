import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';

export default function LearningProgress() {
  const courses = [
    {
      id: 1,
      title: 'Advanced Algebra',
      progress: 75,
      timeLeft: '2h 30m',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      title: 'Calculus Fundamentals',
      progress: 45,
      timeLeft: '4h 15m',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      title: 'Linear Equations',
      progress: 90,
      timeLeft: '30m',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">Continue Learning</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-dark-surface border border-dark-border rounded-lg p-6 card-hover group"
          >
            {/* Course Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">{course.title}</h3>
                <div className="flex items-center gap-1.5 text-text-muted text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{course.timeLeft} left</span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${course.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Progress</span>
                <span className="text-sm font-semibold text-text-primary">{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${course.color} rounded-full`}
                />
              </div>
            </div>

            {/* Continue Button */}
            <button className="w-full btn-primary flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              <span>Continue</span>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
