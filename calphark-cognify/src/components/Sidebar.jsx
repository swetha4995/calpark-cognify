function Sidebar({ currentView, onViewChange, isCollapsed, onToggleCollapse }) {
  const navItems = [
    { id: "home", label: "🏠 Home", emoji: "🏠" },
    { id: "progress", label: "📊 Progress", emoji: "📊" },
    { id: "roadmap", label: "🗺️ Roadmap", emoji: "🗺️" },
    { id: "badges", label: "🏆 Badges", emoji: "🏆" },
    { id: "settings", label: "⚙️ Settings", emoji: "⚙️" },
  ];

  return (
    <aside className={`sidebar${isCollapsed ? " collapsed" : ""}`}>
      <div className="sidebar-header">
        <button
          className="collapse-btn"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item${currentView === item.id ? " active" : ""}`}
            onClick={() => onViewChange(item.id)}
          >
            <span className="nav-icon">{item.emoji}</span>
            {!isCollapsed && <span className="nav-label">{item.label.split(" ")[1]}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
