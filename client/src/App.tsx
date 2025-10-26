import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [text, setText] = useState("");

  const handleGeocode = async () => {
    const response = await fetch("http://localhost:3000/api/geocode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: text }),
    });

    const data = await response.json();
    console.log("Backend says:", data);
    alert(data.message); // temp feedback
  };

  return (
    <div className="background">
      <div className="glass">
        <h1>📍MapIT</h1>
        <p>Convert addresses into map points instantly!</p>

        <textarea
          className="address-input"
          placeholder="Enter addresses or a webpage URL..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button className="submit-btn" onClick={handleGeocode}>
          GEOCODE
        </button>

        <p style={{
          opacity: 0.6,
          fontSize: "0.6em",
          marginTop: "12px"
        }}>
          powered by thai iced teas and google maps |･д･)ﾉ
        </p>
      </div>
    </div>
  )
}

export default App
