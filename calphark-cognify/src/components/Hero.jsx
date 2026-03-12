import { motion } from 'framer-motion';
import { Flame, Zap, Trophy } from 'lucide-react';

export default function Hero({ userName, level, xp, xpMax, streak }) {
  const xpPercent = (xp / xpMax) * 100;
  const circumference = 2 * Math.PI * 58;
  const offset = circumference - (xpPercent / 100) * circumference;

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-12"
    >
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Welcome back, {userName}
        </h1>
        <p className="text-text-secondary">
          Continue your learning journey and achieve your goals
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* XP Progress Card */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6 col-span-1">
          <div className="flex flex-col items-center">
            {/* SVG Progress Ring */}
            <div className="relative mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                {/* Background Circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-dark-border"
                />
                {/* Progress Circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="url(#heroGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="progress-ring"
                />
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {level}
                </span>
                <span className="text-xs text-text-muted font-medium">LEVEL</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-text-secondary mb-1">
                <span className="font-semibold text-text-primary">{xp}</span> / {xpMax} XP
              </div>
              <div className="text-xs text-text-muted">
                {xpMax - xp} XP to next level
              </div>
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{streak} Days</div>
              <div className="text-sm text-text-secondary">Learning streak</div>
            </div>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm text-text-secondary">XP Today</span>
              </div>
              <span className="text-lg font-semibold text-text-primary">240</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span className="text-sm text-text-secondary">Badges Earned</span>
              </div>
              <span className="text-lg font-semibold text-text-primary">12</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
