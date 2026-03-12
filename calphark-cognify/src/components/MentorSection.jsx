import AvatarPlaceholder from "./AvatarPlaceholder";
import MessageBox from "./MessageBox";

function MentorSection({ message }) {
  return (
    <section className="mentor-section" aria-label="AI Mentor">
      <p className="mentor-label">Your AI Mentor</p>
      <div className="mentor-inner">
        <AvatarPlaceholder size="lg" userName="AI Mentor" />
        <MessageBox message={message} />
      </div>
    </section>
  );
}

export default MentorSection;
