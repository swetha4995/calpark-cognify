/**
 * Custom hook for managing performance-based theme switching
 * Dynamically applies background gradients and visual effects based on performance level
 */
import { useState, useEffect, useCallback } from 'react';

const THEME_CONFIGS = {
  high: {
    bgGradient: 'from-purple-500/20 via-pink-400/20 to-yellow-300/20',
    accentColor: 'from-purple-400 to-yellow-300',
    glowColor: 'glow-yellow',
    textColor: 'text-purple-900',
    borderColor: 'border-purple-300/50',
    message: 'Outstanding! Keep shining! ✨',
    messageColor: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600',
  },
  average: {
    bgGradient: 'from-blue-400/15 via-purple-300/15 to-lavender-200/15',
    accentColor: 'from-blue-400 to-purple-300',
    glowColor: 'glow-blue',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-300/40',
    message: 'Good progress, keep going! 💡',
    messageColor: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600',
  },
  low: {
    bgGradient: 'from-indigo-500/20 via-purple-500/20 to-blue-600/20',
    accentColor: 'from-indigo-500 to-blue-600',
    glowColor: 'glow-indigo',
    textColor: 'text-indigo-900',
    borderColor: 'border-indigo-300/50',
    message: "You can improve! Let's try again! 💪",
    messageColor: 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600',
  },
};

export const usePerformanceTheme = (score) => {
  const [performanceLevel, setPerformanceLevel] = useState('average');
  const [config, setConfig] = useState(THEME_CONFIGS.average);

  useEffect(() => {
    let level = 'average';
    if (score >= 80) {
      level = 'high';
    } else if (score < 50) {
      level = 'low';
    }

    // Only update if level changed to avoid cascading renders
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPerformanceLevel((prev) => (prev !== level ? level : prev));
    setConfig(THEME_CONFIGS[level]);

    // Add animation class to trigger transitions smoothly
    document.documentElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  }, [score]);

  const getThemeClass = useCallback(
    (element = 'bg') => {
      if (element === 'bg') {
        return `bg-gradient-to-br ${config.bgGradient}`;
      } else if (element === 'accent') {
        return `bg-gradient-to-r ${config.accentColor}`;
      } else if (element === 'text') {
        return config.messageColor;
      }
      return '';
    },
    [config]
  );

  return {
    performanceLevel,
    config,
    getThemeClass,
    ...config,
  };
};
