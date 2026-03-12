import { motion } from 'framer-motion';
import { CheckCircle, Lock, Trophy, Star, Zap } from 'lucide-react';

const roadmapData = [
  {
    id: 1,
    title: 'Getting Started',
    lessons: [
      { id: 1, name: 'Welcome', status: 'completed', icon: '🎉' },
      { id: 2, name: 'Basics', status: 'completed', icon: '📚' },
      { id: 3, name: 'First Quiz', status: 'completed', icon: '✏️' },
    ]
  },
  {
    id: 2,
    title: 'Foundations',
    isMilestone: true,
    lessons: [
      { id: 4, name: 'Numbers', status: 'completed', icon: '🔢' },
      { id: 5, name: 'Operations', status: 'completed', icon: '➕' },
      { id: 6, name: 'Practice', status: 'current', icon: '💪' },
    ]
  },
  {
    id: 3,
    title: 'Intermediate',
    lessons: [
      { id: 7, name: 'Algebra', status: 'locked', icon: '📐' },
      { id: 8, name: 'Functions', status: 'locked', icon: '📊' },
      { id: 9, name: 'Equations', status: 'locked', icon: '🧮' },
    ]
  },
  {
    id: 4,
    title: 'Advanced',
    isMilestone: true,
    lessons: [
      { id: 10, name: 'Calculus', status: 'locked', icon: '∫' },
      { id: 11, name: 'Geometry', status: 'locked', icon: '📏' },
      { id: 12, name: 'Final Test', status: 'locked', icon: '🎓' },
    ]
  },
];

const LessonNode = ({ lesson, index, sectionIndex }) => {
  const isCompleted = lesson.status === 'completed';
  const isCurrent = lesson.status === 'current';
  const isLocked = lesson.status === 'locked';

  const getNodeColor = () => {
    if (isCompleted) return 'from-green-400 to-emerald-500';
    if (isCurrent) return 'from-purple-500 to-pink-500';
    return 'from-gray-300 to-gray-400';
  };

  const offset = index % 2 === 0 ? 'translate-x-0' : 'translate-x-12';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: sectionIndex * 0.2 + index * 0.1 }}
      className={`relative ${offset}`}
    >
      <motion.button
        whileHover={!isLocked ? { scale: 1.1, rotate: 5 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
        disabled={isLocked}
        className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${getNodeColor()} shadow-lg flex items-center justify-center ${
          isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:shadow-2xl'
        } transition-all duration-300 group`}
      >
        {/* Glow effect for current lesson */}
        {isCurrent && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl bg-purple-500 blur-xl"
          />
        )}

        {/* Icon/Status */}
        <div className="relative z-10 text-3xl">
          {isCompleted && <CheckCircle className="w-10 h-10 text-white fill-white" />}
          {isCurrent && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="w-10 h-10 text-white fill-white" />
            </motion.div>
          )}
          {isLocked && <Lock className="w-8 h-8 text-white" />}
        </div>

        {/* Sparkles for completed */}
        {isCompleted && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-20, -40],
                  opacity: [1, 0],
                  scale: [0, 1]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute"
                style={{
                  left: `${20 + i * 30}%`,
                  top: '-10px'
                }}
              >
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </>
        )}
      </motion.button>

      {/* Lesson Name */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: sectionIndex * 0.2 + index * 0.1 + 0.2 }}
        className={`text-center mt-2 text-sm font-medium ${
          isLocked ? 'text-gray-400' : 'text-gray-700'
        }`}
      >
        {lesson.icon} {lesson.name}
      </motion.p>
    </motion.div>
  );
};

export default function LearningRoadmapComponent() {
  return (
    <div className="bg-white rounded-[28px] p-8 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Your Learning Journey</h2>
          <p className="text-gray-500">Follow the path to mastery</p>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-2xl">
          <p className="text-sm font-semibold text-purple-700">6/12 Completed</p>
        </div>
      </div>

      <div className="relative">
        {/* Vertical Path Line */}
        <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-purple-500 to-gray-300 rounded-full" />

        {/* Journey Steps */}
        <div className="space-y-12">
          {roadmapData.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sectionIndex * 0.2 }}
              className="relative"
            >
              {/* Milestone Trophy */}
              {section.isMilestone && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: sectionIndex * 0.2, type: 'spring' }}
                  className="absolute -left-6 top-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl z-10"
                >
                  <Trophy className="w-8 h-8 text-white" />
                </motion.div>
              )}

              {/* Section Header */}
              <div className="ml-20 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Chapter {section.id}: {section.title}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(section.lessons.filter(l => l.status === 'completed').length / section.lessons.length) * 100}%` }}
                      transition={{ duration: 1, delay: sectionIndex * 0.2 + 0.3 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {section.lessons.filter(l => l.status === 'completed').length}/{section.lessons.length}
                  </span>
                </div>
              </div>

              {/* Lesson Nodes */}
              <div className="ml-20 grid grid-cols-3 gap-8">
                {section.lessons.map((lesson, index) => (
                  <LessonNode
                    key={lesson.id}
                    lesson={lesson}
                    index={index}
                    sectionIndex={sectionIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* End Trophy */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: 'spring' }}
          className="mt-12 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50"
            />
            <div className="relative bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
