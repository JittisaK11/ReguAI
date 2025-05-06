// src/components/ChatForm.jsx
import { useRef } from "react";

const ChatForm = ({ setChatHistory }) => {
  const inputRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // 1) Add user message
    setChatHistory(history => [
      ...history,
      { role: "user", text: userMessage }
    ]);

    // 2) Add thinking placeholder
    setChatHistory(history => [
      ...history,
      { role: "model", text: "I'm thinking 🙇🏻‍♂️ ..." }
    ]);

    try {
      // 3) Call your FastAPI endpoint
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage }),
      });
      const { answer, sources } = await res.json();

setChatHistory(hist => {
  // drop the “thinking” placeholder
  const withoutPlaceholder = hist.slice(0, -1);
  return [
    ...withoutPlaceholder,
    { role: "model", text: answer, sources }
  ];
});
    } catch (err) {
      // on error, replace placeholder with an error message
      setChatHistory(history => {
        const withoutPlaceholder = history.slice(0, -1);
        return [
          ...withoutPlaceholder,
          { role: "model", text: "Sorry, something went wrong." }
        ];
      });
    }
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        autoComplete="off"
      />
      <button type="submit" className="material-symbols-rounded">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
