import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({chat}) => {
  return (
    <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message`}>
      {/* Render ChatbotIcon if the role is 'model' */}
      {chat.role === "model" && <ChatbotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
