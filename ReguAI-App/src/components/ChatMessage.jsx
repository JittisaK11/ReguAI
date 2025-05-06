// src/components/ChatMessage.jsx
import ChatbotIcon from "./ChatbotIcon";

export default function ChatMessage({ chat }) {
  const { role, text, sources } = chat;
  const isBot = role === "model";

  return (
    <div className={`message ${isBot ? "bot" : "user"}-message`}>
      {isBot && <ChatbotIcon className="chat-logo" />}

      {/* single bubble containing answer + sources */}
      <div className="message-text">
        {/* the answer */}
        <p>{text}</p>

        {/* the citations, only for bot */}
        {isBot && sources && (
          <div className="message-sources">
            <p className="sources-label"><strong>Sources:</strong></p>
            {sources.map((s, i) => (
              <p key={i} className="source-entry">
                <strong>{s.heading}:</strong> {s.snippet}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
