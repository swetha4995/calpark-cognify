function ScoreHistory({ scores }) {
  const maxScore = Math.max(...scores.map(s => s.value));

  return (
    <section className="score-history" aria-label="Score progression timeline">
      <h2 className="score-history-title">Score Progression</h2>
      <div className="score-timeline">
        {scores.map((score, index) => {
          const heightPercent = (score.value / maxScore) * 100;
          const isHighlight = score.value >= 80;
          
          return (
            <div key={index} className="score-point">
              <div className="score-bar-container">
                <div
                  className={`score-bar ${isHighlight ? 'highlight' : ''}`}
                  style={{ height: `${Math.max(heightPercent, 10)}%` }}
                >
                  <span className="score-bar-value">{score.value}%</span>
                </div>
              </div>
              <span className="score-label">{score.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ScoreHistory;
