import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="background">
      <div className="glass">
        <h1>MapIT📍</h1>
        <p>Convert addresses into map points instantly!</p>

        <textarea
          className="address-input"
          placeholder="Enter addresses here..."
        ></textarea>

        <button className="submit-btn">
          Geocode
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
