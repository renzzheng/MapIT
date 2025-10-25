import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="background">
      <div className="glass">
        <h1>MapIt 📍</h1>
        <p>Convert addresses into map points instantly!</p>
        <textarea className="address-input" placeholder="Enter addresses here..."></textarea>
        <button className="submit-btn">Geocode</button>
      </div>
    </div>
  )
}

export default App;
