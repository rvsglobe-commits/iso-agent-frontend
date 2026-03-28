import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    // Add user message
    const userMsg = { role: "user", content: message };
    setChat(prev => [...prev, userMsg]);

    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "dev"
        },
        body: JSON.stringify({
          message: message,
          standard: "17025",
          session_id: "test"
        })
      });

      const data = await res.json();

      // Add bot response
      const botMsg = { role: "assistant", content: data.reply };
      setChat(prev => [...prev, botMsg]);

    } catch (err) {
      setChat(prev => [...prev, {
        role: "assistant",
        content: "❌ Error connecting to server"
      }]);
    }

    setMessage("");
  };

  return (
    <div style={styles.container}>
      <h2>ISO Agent 🤖</h2>

      <div style={styles.chatBox}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#007bff" : "#eee",
              color: msg.role === "user" ? "#fff" : "#000"
            }}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about ISO 17025 / 17020..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial"
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    height: "400px",
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px"
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%"
  },
  inputBox: {
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "10px"
  },
  button: {
    padding: "10px 15px"
  }
};

export default App;

// old - general chat interface for testing API connectivity
// import React, { useState } from "react";

// function App() {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");

//   const sendMessage = async () => {
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer test_key"
//       },
//       body: JSON.stringify({
//         message: message,
//         standard: "17025",
//         session_id: "demo-session"
//       })
//     });

//     const data = await res.json();
//     setResponse(data.reply);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>ISO Agent 🤖</h1>

//       <input
//         type="text"
//         placeholder="Ask ISO question..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />

//       <button onClick={sendMessage}>Send</button>

//       <div style={{ marginTop: "20px" }}>
//         <h3>Response:</h3>
//         <p>{response}</p>
//       </div>
//     </div>
//   );
// }

// export default App;