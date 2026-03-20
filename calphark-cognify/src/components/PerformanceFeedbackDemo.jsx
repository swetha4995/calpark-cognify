/**
 * PerformanceFeedbackDemo Component
 * Simple interactive demo to test the PerformanceFeedbackSystem
 * Great for development and testing
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PerformanceFeedbackSystem } from './PerformanceFeedbackSystem';

export const PerformanceFeedbackDemo = () => {
  const [activeScore, setActiveScore] = useState(null);
  const [isShowing, setIsShowing] = useState(false);

  const testScores = [
    { label: 'Low Performance', score: 35, color: 'from-indigo-600 to-blue-600' },
    { label: 'Average Performance', score: 65, color: 'from-blue-600 to-purple-600' },
    { label: 'High Performance', score: 92, color: 'from-purple-600 to-pink-600' },
  ];

  const handleShowFeedback = (score) => {
    setActiveScore(score);
    setIsShowing(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-6 sm:p-8">
      {/* Feedback System */}
      {isShowing && (
        <PerformanceFeedbackSystem
          score={activeScore}
          isOpen={true}
          onAnimationComplete={() => {
            setTimeout(() => {
              setIsShowing(false);
            }, 1000);
          }}
        />
      )}

      {/* Demo Container */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Performance Feedback System
          </h1>
          <p className="text-lg text-gray-600">
            Interactive demo - Click any button to see the feedback animation
          </p>
        </motion.div>

        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testScores.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleShowFeedback(item.score)}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div
                  className={`bg-gradient-to-r ${item.color} rounded-xl h-24 sm:h-32 flex items-center justify-center mb-4 text-white text-4xl sm:text-5xl font-bold`}
                >
                  {item.score}%
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  {item.score >= 80
                    ? 'Exceptional results with full celebration'
                    : item.score >= 50
                      ? 'Good progress with encouragement'
                      : 'Motivational support for improvement'}
                </p>
                <button
                  className={`w-full bg-gradient-to-r ${item.color} text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg`}
                >
                  Test Feedback
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Experience</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* High Performance Features */}
            <div>
              <h3 className="font-semibold text-purple-600 mb-3 flex items-center gap-2">
                <span className="text-2xl">🎉</span> High Performance (80%+)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✨ Canvas confetti burst animation</li>
                <li>🎉 5 floating emojis with rotation</li>
                <li>🔊 Uplifting success sound</li>
                <li>💫 Glowing purple-to-gold gradient background</li>
                <li>✨ Animated sparkle particles</li>
                <li>⭐ "Outstanding! Keep shining!" message</li>
              </ul>
            </div>

            {/* Average Performance Features */}
            <div>
              <h3 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span> Average Performance (50-80%)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>👍 4 calm floating emojis</li>
                <li>🔊 Soft encouragement sound</li>
                <li>💙 Blue-to-lavender background gradient</li>
                <li>📈 Smooth, gentle animations</li>
                <li>✨ Lighter visual effects</li>
                <li>📝 "Good progress, keep going!" message</li>
              </ul>
            </div>

            {/* Low Performance Features */}
            <div>
              <h3 className="font-semibold text-indigo-600 mb-3 flex items-center gap-2">
                <span className="text-2xl">💪</span> Low Performance (&lt;50%)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>🚀 Motivational emojis (💪🔥🚀)</li>
                <li>🔊 Uplifting motivational sound</li>
                <li>💜 Deep indigo-to-blue gradient</li>
                <li>⏱️ Slower, encouraging animations</li>
                <li>✨ Supportive particle effects</li>
                <li>🎯 "You can improve! Let's try again!" message</li>
              </ul>
            </div>

            {/* Technical Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚙️</span> Technical Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>🎬 Smooth Framer Motion animations</li>
                <li>🔊 Web Audio API for sounds</li>
                <li>🎯 Canvas-confetti integration</li>
                <li>📱 Mobile responsive design</li>
                <li>⚡ Zero lag, optimized performance</li>
                <li>🎨 Tailwind CSS styling</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 border border-purple-200/50"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Integration Guide</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
            {`import { PerformanceFeedbackSystem } from '@/components/PerformanceFeedbackSystem';

export const MyQuiz = () => {
  const [score, setScore] = useState(0);
  
  return (
    <>
      <PerformanceFeedbackSystem 
        score={score}
        isOpen={score > 0}
        onAnimationComplete={() => console.log('Done!')}
      />
      {/* Your quiz content */}
    </>
  );
};`}
          </pre>
        </motion.div>
      </div>
    </div>
  );
};
