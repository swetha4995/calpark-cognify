/**
 * QuizIntegration Component
 * Demonstrates practical integration of PerformanceFeedbackSystem
 * Users can take a quiz and see their performance feedback
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PerformanceFeedbackSystem } from './PerformanceFeedbackSystem';
import { RotateCcw, CheckCircle2, Clock, Zap, Volume2, VolumeX, ArrowLeft, ArrowRight, Sparkles, Trophy, Target, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSound } from '../hooks/useSound';

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

export const QuizIntegration = ({ onQuizComplete, isDark = false, soundEffects = true }) => {
  const { playSound, startMildMusic } = useSound();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(SAMPLE_QUESTIONS.length).fill(null));
  const [quizComplete, setQuizComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const stopMusicRef = useRef(() => {});

  useEffect(() => {
    return () => {
      stopMusicRef.current();
    };
  }, []);

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

      stopMusicRef.current();
      setIsMusicOn(false);

      if (soundEffects) {
        if (score >= 80) {
          playSound('applause');
          setTimeout(() => playSound('applause'), 520);
          confetti({ particleCount: 180, spread: 85, origin: { y: 0.4 } });
          setTimeout(() => {
            confetti({ particleCount: 100, spread: 120, origin: { x: 0.2, y: 0.7 } });
            confetti({ particleCount: 100, spread: 120, origin: { x: 0.8, y: 0.7 } });
          }, 250);
        } else if (score >= 50) {
          playSound('success');
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.45 } });
        } else {
          playSound('softFail');
          setTimeout(() => playSound('motivation'), 380);
          confetti({
            particleCount: 35,
            spread: 55,
            origin: { y: 0.5 },
            colors: ['#60a5fa', '#818cf8', '#93c5fd'],
            scalar: 0.85,
          });
        }
      }

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

  const toggleMusic = () => {
    if (isMusicOn) {
      stopMusicRef.current();
      setIsMusicOn(false);
      return;
    }

    const stop = startMildMusic();
    stopMusicRef.current = stop;
    setIsMusicOn(true);
  };

  const score = calculateScore();
  const question = SAMPLE_QUESTIONS[currentQuestion];
  const completionTheme =
    score >= 80
      ? {
          eyebrow: 'Standing ovation',
          title: 'Outstanding finish',
          subtitle: 'That was smooth, confident work. This completion state now lands with a stronger premium feel and a full applause moment.',
          heroGlow: 'from-amber-300/35 via-fuchsia-300/20 to-violet-400/35',
          badgeTone: isDark
            ? 'border-amber-400/30 bg-amber-400/10 text-amber-200'
            : 'border-amber-200 bg-amber-50 text-amber-700',
          performanceIcon: Trophy,
          gradientColors: ['#f59e0b', '#ec4899', '#8b5cf6'],
        }
      : score >= 50
      ? {
          eyebrow: 'Warm applause',
          title: 'Strong momentum',
          subtitle: 'A polished result with clear progress. The finish stays calm, smooth, and professional while keeping the celebration alive.',
          heroGlow: 'from-sky-300/30 via-indigo-300/15 to-violet-400/30',
          badgeTone: isDark
            ? 'border-sky-400/30 bg-sky-400/10 text-sky-200'
            : 'border-sky-200 bg-sky-50 text-sky-700',
          performanceIcon: TrendingUp,
          gradientColors: ['#38bdf8', '#6366f1', '#8b5cf6'],
        }
      : {
          eyebrow: 'Comeback energy',
          title: 'Good effort, keep building',
          subtitle: 'The finish now stays supportive and polished, with softer motion so retrying feels encouraging instead of harsh.',
          heroGlow: 'from-indigo-300/30 via-blue-300/15 to-cyan-400/25',
          badgeTone: isDark
            ? 'border-indigo-400/30 bg-indigo-400/10 text-indigo-200'
            : 'border-indigo-200 bg-indigo-50 text-indigo-700',
          performanceIcon: Target,
          gradientColors: ['#818cf8', '#3b82f6', '#06b6d4'],
        };
  const PerformanceIcon = completionTheme.performanceIcon;

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
            className={`relative overflow-hidden p-6 border-0 text-white rounded-[28px] ${isDark ? 'liquid-glass-dark' : 'liquid-glass'} bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500`}
          >
            <div className="absolute -top-12 right-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-10 h-24 w-24 rounded-full bg-sky-300/20 blur-3xl" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Question {currentQuestion + 1}</p>
                <h2 className="text-3xl font-bold">Quick Quiz</h2>
                <p className="mt-2 text-sm text-white/75">Stay in flow with a soft focus track while you answer.</p>
              </div>

              <div className="flex flex-col items-start gap-3 sm:items-end">
                <motion.button
                  type="button"
                  onClick={toggleMusic}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={isMusicOn}
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-slate-950/20 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 backdrop-blur-xl transition-colors hover:bg-slate-950/30"
                  title={isMusicOn ? 'Stop music' : 'Play music'}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      isMusicOn ? 'bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.95)]' : 'bg-white/55'
                    }`}
                  />
                  <span>{isMusicOn ? 'Stop Music' : 'Play Music'}</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                    {isMusicOn ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </span>
                </motion.button>

                <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-left backdrop-blur-md sm:text-right">
                  <div className="text-4xl font-bold">{currentQuestion + 1}</div>
                  <div className="text-sm text-white/80">of {SAMPLE_QUESTIONS.length} questions</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative mt-5 h-2 rounded-full bg-white/20 overflow-hidden">
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
            className={`p-8 rounded-2xl ${isDark ? 'skeu-card-dark' : 'skeu-card'}`}
          >
            <p className={`text-2xl font-bold mb-8 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{question.question}</p>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                    answers[currentQuestion] === index
                      ? isDark
                        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-200'
                        : 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : isDark
                      ? 'border-slate-600 hover:border-slate-500 text-slate-100 hover:bg-slate-700/40'
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
                            : isDark ? 'border-slate-400' : 'border-gray-300'
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
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <motion.button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`group flex-1 rounded-2xl border px-5 py-4 font-semibold shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none ${
                  isDark
                    ? 'border-slate-600/80 bg-slate-900/50 text-slate-100 hover:border-slate-400 hover:bg-slate-800/70'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/70'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="inline-flex items-center gap-3">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                      isDark ? 'bg-slate-800 text-slate-200 group-hover:bg-slate-700' : 'bg-slate-100 text-slate-600 group-hover:bg-white'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                  Previous
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={handleNext}
                disabled={answers[currentQuestion] === null}
                className="group relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-5 py-4 text-white font-semibold shadow-[0_18px_35px_-20px_rgba(79,70,229,0.85)] transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_55%)] opacity-80" />
                <span className="relative inline-flex items-center gap-3">
                  <span>{currentQuestion === SAMPLE_QUESTIONS.length - 1 ? 'Submit Quiz' : 'Next Question'}</span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </span>
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
