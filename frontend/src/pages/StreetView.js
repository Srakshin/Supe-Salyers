import React, { useState } from 'react';
import '../styles/StreetView.css';
import Navbarjs from "../components/Navbarr";
const StreetView = () => {
  const [place, setPlace] = useState('');

  const handleSearch = async () => {
    if (!place) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${place},India&format=json`);
      const data = await response.json();

      if (data.length === 0) {
        alert("Location not found in India!");
        return;
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      const url = `https://www.mapillary.com/app/?lat=${lat}&lng=${lon}&z=17`;
      window.open(url, '_blank');
    } catch (err) {
      console.error(err);
      alert("Error finding location.");
    }
  };

  return (
    <div className="streetview-container">
        <Navbarjs />
      <h1>🛕 Explore India - Street View (Mapillary)</h1>
      <input
        type="text"
        placeholder="Enter Indian Place (e.g. Charminar)"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default StreetView;
