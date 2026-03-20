/**
 * QuizIntegration Component
 * Demonstrates practical integration of PerformanceFeedbackSystem
 * Users can take a quiz and see their performance feedback
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PerformanceFeedbackSystem } from './PerformanceFeedbackSystem';
import { RotateCcw, CheckCircle2, Clock, Zap } from 'lucide-react';

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correct: 2,
  },
  {
    id: 2,
    question: 'What is 15 + 27?',
    options: ['42', '40', '38', '45'],
    correct: 0,
  },
  {
    id: 3,
    question: 'Which planet is closest to the sun?',
    options: ['Venus', 'Mercury', 'Earth', 'Mars'],
    correct: 1,
  },
  {
    id: 4,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correct: 3,
  },
  {
    id: 5,
    question: 'Who wrote Romeo and Juliet?',
    options: ['Jane Austen', 'William Shakespeare', 'Mark Twain', 'Charles Dickens'],
    correct: 1,
  },
  {
    id: 6,
    question: 'What is the chemical symbol for Gold?',
    options: ['Gd', 'Go', 'Au', 'Gl'],
    correct: 2,
  },
  {
    id: 7,
    question: 'What is the smallest prime number?',
    options: ['0', '1', '2', '3'],
    correct: 2,
  },
  {
    id: 8,
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correct: 2,
  },
  {
    id: 9,
    question: 'What is the freezing point of water in Celsius?',
    options: ['100', '0', '-10', '50'],
    correct: 1,
  },
  {
    id: 10,
    question: 'What is the speed of light?',
    options: [
      '300,000 km/s',
      '150,000 km/s',
      '450,000 km/s',
      '200,000 km/s',
    ],
    correct: 0,
  },
];

export const QuizIntegration = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(SAMPLE_QUESTIONS.length).fill(null));
  const [quizComplete, setQuizComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === SAMPLE_QUESTIONS[index].correct) {
        correct += 1;
      }
    });
    return Math.round((correct / SAMPLE_QUESTIONS.length) * 100);
  };

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore();
      setShowFeedback(true);
      setQuizComplete(true);
      if (onQuizComplete) {
        onQuizComplete(score);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers(Array(SAMPLE_QUESTIONS.length).fill(null));
    setQuizComplete(false);
    setShowFeedback(false);
  };

  const score = calculateScore();
  const question = SAMPLE_QUESTIONS[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Performance Feedback */}
      {showFeedback && (
        <PerformanceFeedbackSystem
          score={score}
          isOpen={true}
          onAnimationComplete={() => setShowFeedback(false)}
        />
      )}

      {!quizComplete ? (
        <>
          {/* Quiz Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Question {currentQuestion + 1}</p>
                <h2 className="text-3xl font-bold">Quick Quiz</h2>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{currentQuestion + 1}</div>
                <div className="text-sm text-white/80">of {SAMPLE_QUESTIONS.length}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / SAMPLE_QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card-premium p-8"
          >
            <p className="text-2xl font-bold text-gray-900 mb-8">{question.question}</p>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                    answers[currentQuestion] === index
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion] === index
                          ? 'border-indigo-500 bg-indigo-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {answers[currentQuestion] === index && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <motion.button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Previous
              </motion.button>

              <motion.button
                onClick={handleNext}
                disabled={answers[currentQuestion] === null}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentQuestion === SAMPLE_QUESTIONS.length - 1 ? 'Submit' : 'Next'}
              </motion.button>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
              <p className="text-gray-600">Great job! Here's your performance summary.</p>
            </div>

            {/* Score Display */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <motion.div
                className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm text-gray-600 mb-2">Score</p>
                <p className="text-4xl font-bold text-indigo-600">{score}%</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm text-gray-600 mb-2">Correct</p>
                <p className="text-4xl font-bold text-emerald-600">
                  {Math.round((score / 100) * SAMPLE_QUESTIONS.length)}/{SAMPLE_QUESTIONS.length}
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm text-gray-600 mb-2">XP Earned</p>
                <p className="text-4xl font-bold text-purple-600">+{Math.round(score * 10)}</p>
              </motion.div>
            </div>

            {/* Performance Breakdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-xl p-6 mb-8"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Performance Level</h3>

              {score >= 80 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <span className="text-lg font-medium text-gray-900">Outstanding Performance! 🌟</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-9">
                    You've demonstrated excellent understanding of the material. Keep maintaining this excellence!
                  </p>
                </div>
              )}

              {score >= 50 && score < 80 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-blue-600" />
                    <span className="text-lg font-medium text-gray-900">Good Progress! 💡</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-9">
                    You're doing well! With a bit more practice, you'll master this topic.
                  </p>
                </div>
              )}

              {score < 50 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-indigo-600" />
                    <span className="text-lg font-medium text-gray-900">Keep Learning! 💪</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-9">
                    Nice effort! Review the material and try again. Every attempt brings you closer to mastery.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleRetry}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};
