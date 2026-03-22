/**
 * Custom hook for playing sound effects
 * Handles sound playback with error handling and audio context management
 */
import { useCallback } from 'react';

export const useSound = () => {
  const startMildMusic = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const masterGain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      masterGain.gain.value = 0.0001;
      filter.type = 'lowpass';
      filter.frequency.value = 900;
      filter.Q.value = 0.8;
      masterGain.connect(filter);
      filter.connect(audioContext.destination);

      const padOscillator = audioContext.createOscillator();
      padOscillator.type = 'triangle';
      padOscillator.frequency.value = 220;
      padOscillator.connect(masterGain);

      const textureOscillator = audioContext.createOscillator();
      textureOscillator.type = 'sine';
      textureOscillator.frequency.value = 329.63;
      textureOscillator.connect(masterGain);

      const wobble = audioContext.createOscillator();
      const wobbleGain = audioContext.createGain();
      wobble.type = 'sine';
      wobble.frequency.value = 0.08;
      wobbleGain.gain.value = 14;
      wobble.connect(wobbleGain);
      wobbleGain.connect(padOscillator.detune);
      wobbleGain.connect(textureOscillator.detune);

      padOscillator.start();
      textureOscillator.start();
      wobble.start();

      audioContext.resume?.();
      masterGain.gain.setTargetAtTime(0.035, audioContext.currentTime, 0.8);

      const progression = [
        { root: 220, texture: 329.63 },
        { root: 196, texture: 293.66 },
        { root: 246.94, texture: 369.99 },
        { root: 174.61, texture: 261.63 },
      ];

      let progressionIndex = 0;
      const interval = window.setInterval(() => {
        progressionIndex = (progressionIndex + 1) % progression.length;
        const nextChord = progression[progressionIndex];

        padOscillator.frequency.setTargetAtTime(nextChord.root, audioContext.currentTime, 0.9);
        textureOscillator.frequency.setTargetAtTime(nextChord.texture, audioContext.currentTime, 0.9);
        filter.frequency.setTargetAtTime(800 + progressionIndex * 90, audioContext.currentTime, 1.2);
      }, 3600);

      let stopped = false;

      return () => {
        if (stopped) {
          return;
        }

        stopped = true;
        window.clearInterval(interval);
        masterGain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.35);
        padOscillator.stop(audioContext.currentTime + 0.6);
        textureOscillator.stop(audioContext.currentTime + 0.6);
        wobble.stop(audioContext.currentTime + 0.6);
        window.setTimeout(() => {
          audioContext.close().catch(() => {});
        }, 600);
      };
    } catch (error) {
      console.warn('Ambient music start failed:', error);
      return () => {};
    }
  }, []);

  const playSound = useCallback((soundType) => {
    try {
      // Create audio context-based sounds using Web Audio API
      // This avoids dependency on external audio files
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      const playTone = (frequency, duration, type = 'sine', amplitude = 0.2) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        // Fade in and out to prevent clicking
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(amplitude, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration - 0.05);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      };

      switch (soundType) {
        case 'success':
          // Success sound: rising tone
          playTone(523.25, 0.15, 'sine', 0.18); // C5
          setTimeout(() => playTone(659.25, 0.15, 'sine', 0.18), 150); // E5
          setTimeout(() => playTone(783.99, 0.3, 'sine', 0.2), 300); // G5
          break;

        case 'neutral':
          // Neutral sound: gentle tone
          playTone(440, 0.25, 'sine', 0.12); // A4
          setTimeout(() => playTone(494, 0.25, 'sine', 0.12), 250); // B4
          break;

        case 'motivation':
          // Motivational sound: uplifting progression
          playTone(349.23, 0.1, 'triangle', 0.14); // F4
          setTimeout(() => playTone(440, 0.1, 'triangle', 0.14), 100); // A4
          setTimeout(() => playTone(523.25, 0.2, 'triangle', 0.16), 200); // C5
          break;

        case 'applause':
          // Bright celebratory sequence
          playTone(523.25, 0.08, 'triangle', 0.14);
          setTimeout(() => playTone(659.25, 0.08, 'triangle', 0.14), 90);
          setTimeout(() => playTone(783.99, 0.08, 'triangle', 0.16), 180);
          setTimeout(() => playTone(1046.5, 0.25, 'sine', 0.18), 270);
          break;

        case 'softFail':
          // Gentle descending cue for low score
          playTone(329.63, 0.12, 'sine', 0.12);
          setTimeout(() => playTone(293.66, 0.12, 'sine', 0.12), 130);
          setTimeout(() => playTone(261.63, 0.2, 'sine', 0.14), 260);
          break;

        default:
          break;
      }
    } catch (error) {
      console.warn('Sound playback failed:', error);
      // Silently fail - don't break the app if audio doesn't work
    }
  }, []);

  return { playSound, startMildMusic };
};
