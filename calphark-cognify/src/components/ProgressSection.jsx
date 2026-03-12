function ProgressSection({ level, xp, xpMax, streak, badges }) {
  const xpPercent = Math.min(100, Math.round((xp / xpMax) * 100));
  const circumference = 2 * Math.PI * 58; // radius 58
  const offset = circumference - (xpPercent / 100) * circumference;

  return (
    <section className="progress-section-modern" aria-label="Your Progress">
      <h2 className="section-title">
        <span className="title-icon">📊</span>
        Your Progress
      </h2>

      <div className="progress-grid">
        {/* Circular XP Ring */}
        <div className="progress-card circular-progress-card">
          <div className="circular-progress">
            <svg className="progress-ring" width="140" height="140">
              <circle
                className="progress-ring-bg"
                cx="70"
                cy="70"
                r="58"
                fill="none"
                stroke="rgba(99,102,241,0.1)"
                strokeWidth="10"
              />
              <circle
                className="progress-ring-fill"
                cx="70"
                cy="70"
                r="58"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 70 70)"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progress-center">
              <div className="level-number">{level}</div>
              <div className="level-label">Level</div>
            </div>
            <div className="progress-glow"></div>
          </div>
          <div className="progress-details">
            <div className="xp-info">
              <span className="xp-current">{xp}</span>
              <span className="xp-separator">/</span>
              <span className="xp-max">{xpMax}</span>
              <span className="xp-unit">XP</span>
            </div>
            <div className="xp-remaining">{xpMax - xp} XP to next level</div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="progress-card streak-card">
          <div className="streak-icon-large">🔥</div>
          <div className="streak-info">
            <div className="streak-number">{streak}</div>
            <div className="streak-label">Day Streak</div>
          </div>
          <div className="streak-message">Keep it going!</div>
        </div>

        {/* Weekly XP Chart */}
        <div className="progress-card chart-card">
          <h3 className="card-title">This Week</h3>
          <div className="mini-chart">
            {[65, 72, 68, 81, 78, 85, 90].map((value, i) => (
              <div key={i} className="chart-bar-wrapper">
                <div 
                  className="chart-bar" 
                  style={{ height: `${value}%` }}
                  data-value={value}
                >
                  <div className="chart-bar-fill"></div>
                </div>
                <div className="chart-label">{['M','T','W','T','F','S','S'][i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Badge Collection */}
      {badges && badges.length > 0 && (
        <div className="badge-showcase">
          <h3 className="section-subtitle">
            <span className="subtitle-icon">🏆</span>
            Achievements
          </h3>
          <div className="badge-float-container">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`floating-badge ${badge.earned ? 'earned' : 'locked'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="badge-circle">
                  <span className="badge-emoji">{badge.icon}</span>
                  {badge.earned && <div className="badge-shine"></div>}
                  {!badge.earned && <div className="badge-lock-overlay">🔒</div>}
                </div>
                <div className="badge-name">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProgressSection;
