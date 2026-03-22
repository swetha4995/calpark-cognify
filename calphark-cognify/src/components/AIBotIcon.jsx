import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

const SIZE_MAP = {
  sm: {
    container: 'h-10 w-10',
    radius: 'rounded-[18px]',
    icon: 'h-5 w-5',
    accent: 'h-5 w-5',
    sparkle: 'h-3 w-3',
  },
  md: {
    container: 'h-14 w-14',
    radius: 'rounded-[22px]',
    icon: 'h-7 w-7',
    accent: 'h-6 w-6',
    sparkle: 'h-3.5 w-3.5',
  },
  lg: {
    container: 'h-16 w-16',
    radius: 'rounded-[24px]',
    icon: 'h-8 w-8',
    accent: 'h-6 w-6',
    sparkle: 'h-4 w-4',
  },
  xl: {
    container: 'h-20 w-20',
    radius: 'rounded-[28px]',
    icon: 'h-10 w-10',
    accent: 'h-7 w-7',
    sparkle: 'h-4 w-4',
  },
};

export default function AIBotIcon({ size = 'md', animate = true, className = '' }) {
  const config = SIZE_MAP[size] ?? SIZE_MAP.md;

  return (
    <div className={`relative ${config.container} ${className}`}>
      <motion.div
        animate={animate ? { scale: [1, 1.06, 1], opacity: [0.25, 0.45, 0.25] } : undefined}
        transition={animate ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : undefined}
        className={`absolute -inset-2 ${config.radius} bg-emerald-300/35 blur-xl`}
      />

      <motion.div
        animate={animate ? { y: [0, -2, 0], rotate: [0, 2, -2, 0] } : undefined}
        transition={animate ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } : undefined}
        className={`relative flex h-full w-full items-center justify-center overflow-hidden border border-white/30 ${config.radius} bg-gradient-to-br from-emerald-300 via-teal-400 to-cyan-500 shadow-[0_18px_40px_-24px_rgba(20,184,166,0.9)]`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_58%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_45%,rgba(15,23,42,0.12))]" />

        <div className="relative flex items-center justify-center text-slate-900">
          <Bot className={config.icon} strokeWidth={2.2} />
        </div>

        <div className={`absolute -right-1 top-0 flex items-center justify-center rounded-full border border-white/60 bg-white/85 text-teal-600 shadow-md ${config.accent}`}>
          <Sparkles className={config.sparkle} strokeWidth={2.4} />
        </div>
      </motion.div>
    </div>
  );
}
