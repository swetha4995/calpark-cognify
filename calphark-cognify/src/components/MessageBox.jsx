function MessageBox({ message }) {
  return (
    <div className="message-box">
      <p className="message-mentor-name">
        <span className="message-online-dot" aria-hidden="true" />
        Cognify AI
      </p>
      <p className="message-text">{message}</p>
      <div className="message-footer">
        <span className="message-tag personalized">✦ Personalized</span>
        <span className="message-tag adaptive">⚙ Adaptive</span>
      </div>
    </div>
  );
}

export default MessageBox;
