function TopNav({ userName, currentView, onViewChange, onSettingsOpen }) {
  return (
    <nav className="top-nav">
      <div className="top-nav-content">
        <div className="logo-section">
          <span className="logo-icon">🧠</span>
          <h1 className="logo-text">Calphark Cognify</h1>
        </div>

        <div className="nav-links">
          <button
            className={`nav-link${currentView === "home" ? " active" : ""}`}
            onClick={() => onViewChange("home")}
          >
            🏠 Home
          </button>
          <button
            className={`nav-link${currentView === "roadmap" ? " active" : ""}`}
            onClick={() => onViewChange("roadmap")}
          >
            🗺️ Roadmap
          </button>
          <button
            className={`nav-link${currentView === "progress" ? " active" : ""}`}
            onClick={() => onViewChange("progress")}
          >
            📊 Progress
          </button>
        </div>

        <div className="user-section">
          <div className="user-info">
            <span className="user-avatar">{userName?.[0]?.toUpperCase() || "U"}</span>
            <span className="user-name-text">{userName}</span>
          </div>
          <button className="settings-btn" onClick={onSettingsOpen} aria-label="Settings">
            ⚙️
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
