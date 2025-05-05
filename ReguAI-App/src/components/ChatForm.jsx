import { useState } from 'react';

export default function ChatForm({ setChatHistory }) {
  const [input, setInput] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const question = input.trim();
    if (!question) return;
    setChatHistory(h => [...h, { from: 'user', text: question }]);
    setInput('');

    // fetch from your FastAPI
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: question }),
    });
    const { answer } = await res.json();
    setChatHistory(h => [...h, { from: 'bot', text: answer }]);
  }

  return (
    <form onSubmit={handleSubmit} className="chat-form">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask me about compliance…"
      />
      <button type="submit">Send</button>
    </form>
  );
}
