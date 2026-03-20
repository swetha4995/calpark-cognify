/**
 * EmojiFloat Component
 * Animated floating emoji particles based on performance level
 * Uses Framer Motion for smooth animations
 */
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const EMOJI_CONFIGS = {
  high: [
    // Wave 1
    { emoji: '🎉', delay: 0 },
    { emoji: '👏', delay: 0.1 },
    { emoji: '🌟', delay: 0.2 },
    { emoji: '✨', delay: 0.15 },
    { emoji: '🚀', delay: 0.25 },
    // Wave 2
    { emoji: '🎊', delay: 2 },
    { emoji: '⭐', delay: 2.1 },
    { emoji: '💫', delay: 2.2 },
    { emoji: '🌠', delay: 2.15 },
    { emoji: '🎆', delay: 2.25 },
    // Wave 3
    { emoji: '🏆', delay: 4 },
    { emoji: '👑', delay: 4.1 },
    { emoji: '💎', delay: 4.2 },
    { emoji: '🔥', delay: 4.15 },
    { emoji: '⚡', delay: 4.25 },
  ],
  average: [
    // Wave 1
    { emoji: '🙂', delay: 0 },
    { emoji: '👍', delay: 0.1 },
    { emoji: '💡', delay: 0.2 },
    { emoji: '📚', delay: 0.15 },
    { emoji: '✏️', delay: 0.25 },
    // Wave 2
    { emoji: '🎯', delay: 2 },
    { emoji: '📖', delay: 2.1 },
    { emoji: '🌱', delay: 2.2 },
    { emoji: '🚀', delay: 2.15 },
    { emoji: '💪', delay: 2.25 },
    // Wave 3
    { emoji: '⭐', delay: 4 },
    { emoji: '✨', delay: 4.1 },
    { emoji: '🎓', delay: 4.2 },
    { emoji: '🏅', delay: 4.15 },
  ],
  low: [
    // Wave 1
    { emoji: '💪', delay: 0 },
    { emoji: '🔥', delay: 0.15 },
    { emoji: '🚀', delay: 0.1 },
    { emoji: '⭐', delay: 0.2 },
    { emoji: '💫', delay: 0.25 },
    // Wave 2
    { emoji: '🌟', delay: 2 },
    { emoji: '✨', delay: 2.1 },
    { emoji: '🎯', delay: 2.2 },
    { emoji: '📈', delay: 2.15 },
    { emoji: '🏃', delay: 2.25 },
    // Wave 3
    { emoji: '🎉', delay: 4 },
    { emoji: '👏', delay: 4.1 },
    { emoji: '🌈', delay: 4.2 },
    { emoji: '💝', delay: 4.15 },
  ],
};

const ANIMATION_VARIANTS = {
  high: {
    hidden: { opacity: 0, y: 100, scale: 0 },
    visible: (delay) => ({
      opacity: [0, 1, 0],
      y: [100, -200, -300],
      scale: [0, 1.2, 0.8],
      rotate: [0, 25, -15],
      filter: ['blur(0px)', 'blur(0px)', 'blur(2px)'],
      transition: {
        delay,
        duration: 5,
        ease: 'easeOut',
      },
    }),
  },
  average: {
    hidden: { opacity: 0, y: 80, scale: 0 },
    visible: (delay) => ({
      opacity: [0, 0.95, 0],
      y: [80, -180, -260],
      scale: [0, 1.1, 0.75],
      rotate: [0, 15, -8],
      filter: ['blur(0px)', 'blur(0px)', 'blur(1px)'],
      transition: {
        delay,
        duration: 4.8,
        ease: 'easeOut',
      },
    }),
  },
  low: {
    hidden: { opacity: 0, y: 60, scale: 0 },
    visible: (delay) => ({
      opacity: [0, 0.9, 0],
      y: [60, -150, -230],
      scale: [0, 1, 0.7],
      rotate: [0, 10, -5],
      filter: ['blur(0px)', 'blur(0px)', 'blur(1px)'],
      transition: {
        delay,
        duration: 5.2,
        ease: 'easeOut',
      },
    }),
  },
};

export const EmojiFloat = ({ performanceLevel = 'average', count = 15 }) => {
  const config = EMOJI_CONFIGS[performanceLevel] || EMOJI_CONFIGS.average;
  const variants = ANIMATION_VARIANTS[performanceLevel] || ANIMATION_VARIANTS.average;

  // Use all emojis from config for enhanced experience
  const selectedEmojis = config.slice(0, Math.min(count, config.length));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {selectedEmojis.map((item, index) => (
        <motion.div
          key={`emoji-${index}`}
          className="fixed text-3xl sm:text-5xl font-bold drop-shadow-lg"
          style={{
            left: `${10 + (index % 5) * 18}%`,
            bottom: '5%',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(147, 51, 234, 0.4)',
            filter: 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.6))',
          }}
          initial="hidden"
          animate="visible"
          custom={item.delay}
          variants={variants}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

EmojiFloat.propTypes = {
  performanceLevel: PropTypes.oneOf(['high', 'average', 'low']),
  count: PropTypes.number,
};
