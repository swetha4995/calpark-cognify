/**
 * PerformanceFeedbackSystem Component
 * Main component that orchestrates all performance feedback elements
 * Triggers confetti, emojis, sounds, and theme changes based on score
 * Extended animation: lasting until user taps, with multiple emoji waves and glow effects
 */
/* eslint-disable react-hooks/purity */
import { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import PropTypes from 'prop-types';
import { EmojiFloat } from './EmojiFloat';
import { useSound } from '../hooks/useSound';
import { usePerformanceTheme } from '../hooks/usePerformanceTheme';
import { Sparkles } from 'lucide-react';

export const PerformanceFeedbackSystem = ({ score, isOpen = true, onAnimationComplete }) => {
  const { playSound } = useSound();
  const { performanceLevel, getThemeClass, message, messageColor } = usePerformanceTheme(score);
  const confettiRef = useRef(null);
  const confettiCanvasRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(true);

  // Memoize particles to avoid recalculation on every render
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 1,
      delay: Math.random() * 0.5,
      repeatDelay: Math.random() * 2,
    }));
  }, []);

  const cleanupConfetti = useCallback(() => {
    confettiRef.current?.reset?.();
    confettiRef.current = null;

    if (confettiCanvasRef.current) {
      confettiCanvasRef.current.remove();
      confettiCanvasRef.current = null;
    }
  }, []);

  const triggerConfetti = useRef((intensity = 1) => {
    if (!confettiRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.setAttribute('aria-hidden', 'true');
      Object.assign(canvas.style, {
        position: 'fixed',
        inset: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '70',
      });
      document.body.appendChild(canvas);
      confettiCanvasRef.current = canvas;
      confettiRef.current = confetti.create(canvas, { resize: true, useWorker: true });
    }

    const confettiInstance = confettiRef.current;

    // Different confetti patterns based on intensity
    if (intensity >= 1) {
      // High performance: intense confetti burst
      confettiInstance({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#9333ea', '#ec4899', '#fbbf24', '#60a5fa', '#34d399'],
      });

      // Secondary burst
      setTimeout(() => {
        confettiInstance({
          particleCount: 50,
          spread: 100,
          origin: { x: 0.2, y: 0.5 },
          colors: ['#9333ea', '#fbbf24'],
        });

        confettiInstance({
          particleCount: 50,
          spread: 100,
          origin: { x: 0.8, y: 0.5 },
          colors: ['#ec4899', '#34d399'],
        });
      }, 200);
    } else if (intensity >= 0.3) {
      // Average/Low performance: moderate confetti
      confettiInstance({
        particleCount: 50,
        spread: 60,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#60a5fa', '#818cf8', '#a78bfa', '#34d399'],
      });
    }
  }).current;

  useEffect(() => {
    if (!isOpen || !showAnimation) return;

    // Determine sound to play
    let soundType = 'neutral';
    let confettiIntensity = 0;

    if (score >= 80) {
      soundType = 'applause';
      confettiIntensity = 1;
    } else if (score < 50) {
      soundType = 'softFail';
      confettiIntensity = 0.25;
    } else {
      soundType = 'neutral';
      confettiIntensity = 0.45;
    }

    const timers = [];

    // Play initial sound
    timers.push(setTimeout(() => {
      playSound(soundType);
    }, 300));

    // Trigger initial confetti
    if (confettiIntensity > 0) {
      timers.push(setTimeout(() => {
        triggerConfetti(confettiIntensity);
      }, 100));
    }

    // Repeated confetti bursts throughout the animation (every 2-3 seconds)
    for (let i = 1; i <= 3; i++) {
      timers.push(setTimeout(() => {
        triggerConfetti(confettiIntensity * 0.7);
      }, 2000 * i));
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [score, isOpen, showAnimation, playSound, triggerConfetti]);

  useEffect(() => {
    if (!isOpen || !showAnimation) {
      cleanupConfetti();
    }

    return () => {
      cleanupConfetti();
    };
  }, [cleanupConfetti, isOpen, showAnimation]);

  if (!isOpen || !showAnimation) return null;

  const handleDismiss = () => {
    cleanupConfetti();
    setShowAnimation(false);
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
      event.preventDefault();
      handleDismiss();
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 pointer-events-auto z-50 cursor-pointer"
        onClick={handleDismiss}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Dismiss performance feedback and continue"
      >
        {/* Background gradient transition */}
        <motion.div
          key="bg"
          className={`fixed inset-0 ${getThemeClass('bg')}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Floating emojis - More waves and glowy effects */}
        {isOpen && showAnimation && <EmojiFloat performanceLevel={performanceLevel} count={15} />}

        {/* Main feedback message */}
        <motion.div
          key="message"
          className="fixed inset-0 flex flex-col items-center justify-center pointer-events-auto cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onClick={handleDismiss}
        >
          <div className="relative">
            {/* Multiple glow layers for enhanced effect */}
            {performanceLevel === 'high' && (
              <>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-yellow-300 rounded-2xl blur-3xl opacity-30"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl blur-2xl opacity-20"
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                />
              </>
            )}

            {performanceLevel === 'average' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-2xl opacity-25"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            )}

            {performanceLevel === 'low' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-2xl blur-2xl opacity-25"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            )}

            {/* Message card */}
            <motion.div
              className={`relative bg-white/85 backdrop-blur-xl rounded-2xl px-6 sm:px-8 py-6 sm:py-8 shadow-2xl border border-white/30 ${
                performanceLevel === 'high' ? 'shadow-purple-200/50' : 'shadow-gray-200/50'
              }`}
              animate={
                performanceLevel === 'high'
                  ? { y: [0, -12, 0], boxShadow: ['0 10px 30px rgba(147, 51, 234, 0.2)', '0 20px 50px rgba(147, 51, 234, 0.4)', '0 10px 30px rgba(147, 51, 234, 0.2)'] }
                  : performanceLevel === 'low'
                  ? { x: [0, -3, 3, -2, 2, 0] }
                  : { y: [0, -4, 0] }
              }
              transition={
                performanceLevel === 'high'
                  ? { duration: 2, repeat: Infinity }
                  : performanceLevel === 'low'
                  ? { duration: 0.55, repeat: 3 }
                  : { duration: 2.4, repeat: Infinity }
              }
            >
              <div className="flex items-center gap-3 sm:gap-4 justify-center flex-wrap">
                {performanceLevel === 'high' && (
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))' }} />
                  </motion.div>
                )}

                <p className={`text-xl sm:text-3xl font-bold ${messageColor}`}>{message}</p>

                {performanceLevel === 'high' && (
                  <motion.div
                    animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))' }} />
                  </motion.div>
                )}
              </div>

              {/* Score display */}
              <motion.div
                className="text-center mt-4 sm:mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <p className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-lg">
                  {Math.round(score)}%
                </p>
                <p className="text-sm sm:text-base text-gray-700 mt-3 capitalize font-semibold">
                  {performanceLevel} Performance
                </p>
              </motion.div>

              <motion.button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDismiss();
                }}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-colors hover:bg-slate-800"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              >
                Continue
              </motion.button>
            </motion.div>
          </div>

          {/* Tap to continue indicator */}
          <motion.div
            className="absolute bottom-6 sm:bottom-8 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-white text-sm sm:text-base font-medium drop-shadow-lg">Tap anywhere to continue</p>
            <motion.div
              className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 bg-white rounded-full"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated particles in background (for high performance) */}
        {performanceLevel === 'high' && <ParticleEffect particles={particles} />}
      </div>
    </AnimatePresence>
  );
};

PerformanceFeedbackSystem.propTypes = {
  score: PropTypes.number.isRequired,
  isOpen: PropTypes.bool,
  onAnimationComplete: PropTypes.func,
};

/**
 * ParticleEffect Component
 * Adds subtle sparkle particles to the background
 */
const ParticleEffect = ({ particles }) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -50, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: particle.repeatDelay,
          }}
        />
      ))}
    </div>
  );
};

ParticleEffect.propTypes = {
  particles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
      delay: PropTypes.number.isRequired,
      repeatDelay: PropTypes.number.isRequired,
    })
  ).isRequired,
};
