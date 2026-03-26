import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  // ✅ DEBUG LOGS (add here)
  console.log("🔥 APP LOADED");
  console.log("API URL:", process.env.REACT_APP_API_URL);

useEffect(() => {
  const url = "https://iso-agent-backend-production.up.railway.app/";

  console.log("🔥 APP LOADED");
  console.log("API URL:", url);

  fetch(url)
    .then((res) => {
      console.log("STATUS:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("DATA:", data);
      setData(data);
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
}, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* ✅ UPDATED TEXT */}
      <h1>ISO Agent ✅ UPDATED</h1>

      <h3>Backend Response:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;