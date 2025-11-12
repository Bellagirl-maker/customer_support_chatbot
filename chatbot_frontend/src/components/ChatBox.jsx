import { useState } from "react";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!question.trim()) return;

    // TODO: Replace with your Rails backend endpoint
    const response = await fetch("http://localhost:3000/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    setMessages([...messages, { question, answer: data.answer }]);
    setQuestion("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md p-4 rounded-xl mt-8">
      <div className="space-y-3 h-80 overflow-y-auto border p-3 rounded-md">
        {messages.map((m, i) => (
          <div key={i}>
            <p><strong>You:</strong> {m.question}</p>
            <p><strong>AI:</strong> {m.answer}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 border p-2 rounded"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
