import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapView from './MapView';
import { exportAddressesToCSV } from "./utils/csvExporter";

function App() {
  const [text, setText] = useState("");
  const [mapPoints, setMapPoints] = useState<any[]>([]); // stores lat/lng points returned from backend

  const handleGeocode = async () => {
    const response = await fetch("http://localhost:3000/api/geocode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: text }),
    });

    // parse JSON response
    const data = await response.json();
    console.log("Geocode results:", data.results);

    // update map points state with valid lat/lng results
    setMapPoints(
      data.results?.filter((r: any) => r.lat && r.lng) || []
    );
  };

  const handleExport = () => {
    exportAddressesToCSV(mapPoints);
  };
  

  return (
    <div className="background">
      <div className="glass">
      <h1>
        <span className="map-text">Map</span><span className="it-text">IT</span>
      </h1>
        <p className="subtitle">Convert addresses into map points instantly!</p>
        <textarea
          className="address-input"
          placeholder="Enter addresses or a webpage URL with locations..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button className="btn submit" onClick={handleGeocode}>
          PIN IT FOR ME!
        </button>

        <button className="btn export" onClick={handleExport}>
          EXPORT TO CSV
        </button>

        <div className="map-container">
          <MapView points={mapPoints} />
        </div>


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
