import { useRef } from "react";

const ChatForm = ({setChatHistory}) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if(!userMessage) return;
        inputRef.current.value = "";

        // Update chat history with user message
        setChatHistory((history) => [...history, {role: "user", text: userMessage }]);

        // "Thinking..." message for the bot
        setTimeout(() => setChatHistory((history) => [...history, {role: "model", text: "I'm thinking 🙇🏻‍♂️ ..."}]), 600);
    };

    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required/>
            <button className="material-symbols-rounded">arrow_upward</button>
        </form>
    );
};

export default ChatForm;