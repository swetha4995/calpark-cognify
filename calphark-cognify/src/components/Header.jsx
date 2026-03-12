function Header({ userName }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title-section">
          <div className="header-logo-row">
            <span className="header-icon" aria-hidden="true">🧠</span>
            <h1>Calphark Cognify</h1>
          </div>
          <p className="header-subtitle">AI-Powered Adaptive Mentor</p>
          <span className="header-badge">✦ Personalized for You</span>
        </div>
        {userName && (
          <div className="header-user-section">
            <div className="user-pill">
              <div className="user-avatar-mini">{userName[0].toUpperCase()}</div>
              <span className="user-name">{userName}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
