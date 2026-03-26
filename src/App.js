import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer test_key"
      },
      body: JSON.stringify({
        message: message,
        standard: "17025",
        session_id: "demo-session"
      })
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ISO Agent 🤖</h1>

      <input
        type="text"
        placeholder="Ask ISO question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      <div style={{ marginTop: "20px" }}>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;