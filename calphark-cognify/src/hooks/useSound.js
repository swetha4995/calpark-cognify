/**
 * Custom hook for playing sound effects
 * Handles sound playback with error handling and audio context management
 */
import { useCallback } from 'react';

export const useSound = () => {
  const playSound = useCallback((soundType) => {
    try {
      // Create audio context-based sounds using Web Audio API
      // This avoids dependency on external audio files
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      const playTone = (frequency, duration, type = 'sine') => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        // Fade in and out to prevent clicking
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration - 0.05);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      };

      switch (soundType) {
        case 'success':
          // Success sound: rising tone
          playTone(523.25, 0.15); // C5
          setTimeout(() => playTone(659.25, 0.15), 150); // E5
          setTimeout(() => playTone(783.99, 0.3), 300); // G5
          break;

        case 'neutral':
          // Neutral sound: gentle tone
          playTone(440, 0.25); // A4
          setTimeout(() => playTone(494, 0.25), 250); // B4
          break;

        case 'motivation':
          // Motivational sound: uplifting progression
          playTone(349.23, 0.1); // F4
          setTimeout(() => playTone(440, 0.1), 100); // A4
          setTimeout(() => playTone(523.25, 0.2), 200); // C5
          break;

        default:
          break;
      }
    } catch (error) {
      console.warn('Sound playback failed:', error);
      // Silently fail - don't break the app if audio doesn't work
    }
  }, []);

  return { playSound };
};
