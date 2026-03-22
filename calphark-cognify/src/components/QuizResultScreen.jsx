/**
 * QuizResultScreen Component
 * Example integration of PerformanceFeedbackSystem
 * Shows how to use the feedback system in a quiz/lesson completion scenario
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PerformanceFeedbackSystem } from './PerformanceFeedbackSystem';
import { ArrowRight, RotateCcw } from 'lucide-react';

export const QuizResultScreen = ({
  score = 0,
  totalQuestions = 10,
  correctAnswers = 0,
  lessonName = 'Mathematics Basics',
  onContinue,
  onRetry,
}) => {
  const [showFeedback, setShowFeedback] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    setShowFeedback(false);
    setAnimationComplete(true);
  };

  const handleRetryClick = () => {
    setShowFeedback(true);
    setAnimationComplete(false);
    onRetry?.();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      {/* Performance Feedback System */}
      <PerformanceFeedbackSystem
        score={score}
        isOpen={showFeedback}
        onAnimationComplete={handleAnimationComplete}
      />

      {/* Result Details Card */}
      <motion.div
        className="relative w-full max-w-md mt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationComplete ? 0 : 2.5, duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/50">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">{lessonName}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200/50"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm text-gray-600 mb-1">Correct Answers</p>
              <p className="text-3xl font-bold text-purple-600">
                {correctAnswers}/{totalQuestions}
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200/50"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm text-gray-600 mb-1">Score</p>
              <p className="text-3xl font-bold text-blue-600">{Math.round(score)}%</p>
            </motion.div>
          </div>

          {/* Performance Badge */}
          <motion.div
            className="mb-6 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            {score >= 80 && (
              <div className="inline-block bg-gradient-to-r from-yellow-300 to-purple-400 rounded-full px-6 py-2">
                <span className="font-bold text-gray-900">🌟 Outstanding</span>
              </div>
            )}
            {score >= 50 && score < 80 && (
              <div className="inline-block bg-gradient-to-r from-blue-300 to-purple-300 rounded-full px-6 py-2">
                <span className="font-bold text-gray-900">💡 Great Job</span>
              </div>
            )}
            {score < 50 && (
              <div className="inline-block bg-gradient-to-r from-indigo-300 to-blue-400 rounded-full px-6 py-2">
                <span className="font-bold text-gray-900">💪 Keep Going</span>
              </div>
            )}
          </motion.div>

          {/* XP Reward */}
          <motion.div
            className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 mb-6 border border-emerald-200/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-gray-600 mb-1">XP Earned</p>
            <p className="text-2xl font-bold text-emerald-600">+{Math.round(score * 10)} XP</p>
          </motion.div>

          {/* Detailed Breakdown */}
          <motion.div
            className="bg-gray-50 rounded-2xl p-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="font-semibold text-gray-900 mb-3">Performance Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Accuracy</span>
                <span className="font-semibold text-gray-900">{Math.round(score)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-gray-600">Time Spent</span>
                <span className="font-semibold text-gray-900">3:45</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={handleRetryClick}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-xl border border-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Example usage component
 * Demonstrates the QuizResultScreen with different scores
 */
export const QuizResultDemo = () => {
  const [demoScore, setDemoScore] = useState(85);

  return (
    <div className="w-full">
      <QuizResultScreen
        score={demoScore}
        totalQuestions={10}
        correctAnswers={Math.round((demoScore / 100) * 10)}
        lessonName="Advanced Algebra"
        onContinue={() => alert('Continue to next lesson')}
        onRetry={() => alert('Retrying quiz')}
      />

      {/* Score selector for testing */}
      <div className="fixed bottom-8 left-8 bg-white/90 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/50 hidden md:block">
        <p className="text-sm font-semibold text-gray-900 mb-2">Test Different Scores:</p>
        <div className="space-y-2">
          {[45, 65, 85].map((score) => (
            <button
              key={score}
              onClick={() => setDemoScore(score)}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                demoScore === score
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {score}% ({score >= 80 ? 'High' : score >= 50 ? 'Average' : 'Low'})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
