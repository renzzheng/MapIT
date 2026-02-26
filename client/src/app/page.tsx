"use client";

import { useState } from "react";
import MapView from "@/components/MapView";
import { exportAddressesToCSV } from "@/utils/csvExporter";

export default function Home() {
  const [text, setText] = useState("");
  const [mapPoints, setMapPoints] = useState<any[]>([]);

  const handleGeocode = async () => {
    const response = await fetch("/api/geocode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: text }),
    });
    const data = await response.json();
    setMapPoints(data.results?.filter((r: any) => r.lat && r.lng) || []);
  };

  return (
    <div className="background">
      <div className="glass">
        <h1>
          <span className="map-text">Map  </span><span className="it-text">It</span>
        </h1>
        <p className="subtitle">Convert addresses into map points instantly!</p>
        <textarea
          className="address-input"
          placeholder="Enter addresses or a webpage URL with locations..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn submit" onClick={handleGeocode}>PIN IT FOR ME!</button>
        <button className="btn export" onClick={() => exportAddressesToCSV(mapPoints)}>EXPORT TO CSV</button>
        <div className="map-container">
          <MapView points={mapPoints} />
        </div>
        <p style={{ opacity: 0.6, fontSize: "0.6em", marginTop: "12px" }}>
          powered by thai iced teas and google maps |･д･)ﾉ
        </p>
      </div>
    </div>
  );
}