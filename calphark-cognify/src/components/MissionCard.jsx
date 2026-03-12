function MissionCard({ mission }) {
  const { chapter, subject, score, improvement, difficulty } = mission;

  return (
    <section className="mission-card" aria-label="Today mission">
      <div className="mission-top">
        <div>
          <p className="mission-label">🎯 Today&apos;s Challenge</p>
          <h2 className="mission-chapter">{chapter}</h2>
        </div>
        <span className="mission-subject-tag">{subject}</span>
      </div>
      <div className="mission-stats">
        <div className="mission-stat">
          <div className="mission-stat-value score">{score}%</div>
          <div className="mission-stat-label">Last Score</div>
        </div>
        <div className="mission-stat">
          <div className="mission-stat-value improvement">+{improvement}%</div>
          <div className="mission-stat-label">Improvement</div>
        </div>
        <div className="mission-stat">
          <div className="mission-stat-value difficulty">{difficulty}</div>
          <div className="mission-stat-label">Difficulty</div>
        </div>
      </div>
    </section>
  );
}

export default MissionCard;
