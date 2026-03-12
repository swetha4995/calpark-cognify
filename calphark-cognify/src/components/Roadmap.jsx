function Roadmap({ chapters }) {
  return (
    <div className="roadmap-container">
      <h2 className="roadmap-title">Your Learning Journey</h2>
      <p className="roadmap-subtitle">Navigate your personalized path to mastery</p>
      <div className="roadmap-path">
        {chapters.map((chapter) => {
          const status = chapter.status;
          const dot = status === "completed" ? "check" : status === "current" ? "now" : "lock";
          return (
            <div key={chapter.id} className="roadmap-node">
              <div className={`roadmap-node-dot ${status}`}>{status === "completed" ? "checkmark" : status === "current" ? "now" : "lock"}</div>
              <div className={`roadmap-card ${status}`}>
                <div className="roadmap-chapter-top">
                  <h3 className="roadmap-chapter-title"><span className="roadmap-chapter-icon">{chapter.icon} </span>{chapter.title}</h3>
                  {status === "completed" && <span className="roadmap-score-badge">{chapter.score}%</span>}
                </div>
                <p className="roadmap-chapter-desc">{chapter.description}</p>
                {status === "current" && chapter.progress !== undefined && (
                  <div className="roadmap-progress-bar"><div className="roadmap-progress-fill" style={{ width: chapter.progress + "%" }} /></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Roadmap;
