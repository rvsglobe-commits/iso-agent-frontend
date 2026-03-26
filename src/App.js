import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  // ✅ DEBUG LOGS (add here)
  console.log("🔥 APP LOADED");
  console.log("API URL:", process.env.REACT_APP_API_URL);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
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