function ActionButton({ label = "Start Today's Mission" }) {
  return (
    <div className="action-button-container">
      <button className="action-button">
        <span className="btn-icon" aria-hidden="true">🚀</span>
        {label}
      </button>
    </div>
  );
}

export default ActionButton;
