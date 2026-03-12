import { useState } from "react";

function Settings({ isOpen, onClose, settings, onSaveSettings }) {
  const [local, setLocal] = useState(settings);

  const toggle = (key) => setLocal(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => { onSaveSettings(local); onClose(); };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2 className="settings-title">⚙️ Settings</h2>
          <button className="settings-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="settings-group">
          <p className="settings-group-title">Appearance</p>
          <div className="settings-item">
            <div className="settings-item-info">
              <p className="settings-item-label">🌙 Dark Study Mode</p>
              <p className="settings-item-desc">Easier on the eyes during night study</p>
            </div>
            <label className="toggle-wrap">
              <input type="checkbox" className="toggle-input" checked={local.darkMode} onChange={() => toggle("darkMode")} />
              <span className="toggle-track" />
            </label>
          </div>
          <div className="settings-item">
            <div className="settings-item-info">
              <p className="settings-item-label">🔔 Notifications</p>
              <p className="settings-item-desc">Get reminders for daily challenges</p>
            </div>
            <label className="toggle-wrap">
              <input type="checkbox" className="toggle-input" checked={local.notifications} onChange={() => toggle("notifications")} />
              <span className="toggle-track" />
            </label>
          </div>
          <div className="settings-item">
            <div className="settings-item-info">
              <p className="settings-item-label">🔊 Sound Effects</p>
              <p className="settings-item-desc">Play sounds for achievements</p>
            </div>
            <label className="toggle-wrap">
              <input type="checkbox" className="toggle-input" checked={local.soundEffects} onChange={() => toggle("soundEffects")} />
              <span className="toggle-track" />
            </label>
          </div>
        </div>

        <div className="settings-group">
          <p className="settings-group-title">Study Preferences</p>
          <div className="settings-item">
            <div className="settings-item-info">
              <p className="settings-item-label">⏰ Daily Reminder</p>
              <p className="settings-item-desc">Set your study reminder time</p>
            </div>
            <input
              type="time" className="settings-time-input"
              value={local.reminderTime}
              onChange={(e) => setLocal(prev => ({ ...prev, reminderTime: e.target.value }))}
            />
          </div>
        </div>

        <div className="settings-group">
          <p className="settings-group-title">Danger Zone</p>
          <button className="settings-danger-btn" onClick={() => { if (window.confirm("Reset all progress?")) alert("Reset done."); }}>
            🗑️ Reset All Progress
          </button>
        </div>

        <button className="settings-save-btn" onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
}

export default Settings;
