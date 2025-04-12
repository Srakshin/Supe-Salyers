// import React, { useState } from "react";
// import "./FloatingChat.css";

// function FloatingChat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");


//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages([...messages, userMessage]);

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await res.json();
//       const botReply = { sender: "bot", text: data.reply };
//       setMessages((prev) => [...prev, botReply]);
//     } catch (err) {
//       setMessages((prev) => [...prev, { sender: "bot", text: "Error contacting server" }]);
//     }

//     setInput("");
//   };

//   return (
//     <div className="floating-chat-box">
//       <div className="chat-header">🤖 Ask Me Anything</div>
//       <div className="chat-messages">
//         {messages.map((m, i) => (
//           <div key={i} className={`message ${m.sender}`}>
//             {m.text}
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default FloatingChat;
import React, { useState } from "react";
import "./FloatingChat.css";

function FloatingChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(true); // For toggling chat visibility
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true); // Start typing indicator

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error contacting server" }]);
    } finally {
      setIsTyping(false); // Hide typing
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  if (!visible) return null;

  return (
    <div className="floating-chat-box">
      <div className="chat-header">
        🤖 Ask Me Anything
        <span className="close-btn" onClick={() => setVisible(false)}>✖</span>
      </div>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.sender === "bot" && <span className="bot-icon">🤖 </span>}
            {m.text}
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>
      {/* <div className="suggestions">
        <span onClick={() => setInput("Tell me about Taj Mahal")}>Taj Mahal</span>
        <span onClick={() => setInput("What are Indian classical dances?")}>Classical Dances</span>
        <span onClick={() => setInput("What’s special in Rajasthan?")}>Rajasthan</span>
      </div> */}

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default FloatingChat;
