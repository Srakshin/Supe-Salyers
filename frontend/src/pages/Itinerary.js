import React, { useState } from "react";
import "../styles/Itinerary.css";
import Navbarjs from "../components/Navbarr";

const ItineraryPage = () => {
  const [location, setLocation] = useState("");
  const [days, setDays] = useState();
  const [month, setMonth] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleGenerate = async () => {
    if (!location || !month || !days) {
      alert("Please fill in all fields before generating your itinerary.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, days, month }),
      });

      const data = await response.json();
      setItinerary(data.itinerary);
    } catch (error) {
      setItinerary("⚠️ Error fetching itinerary.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleDownloadPDF = async () => {
    if (!itinerary) return;

    try {
      const response = await fetch("http://localhost:5000/download-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itinerary }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Travel_Itinerary.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };


  return (
    <div className="heritage-container">
      <Navbarjs />
      <div className="heritage-card">
        <h1 className="heritage-title">🕌 Bharat Darshan Yatra Planner</h1>
        <p className="heritage-subtitle">
          Discover the soul of India with an AI-powered journey across our diverse land.
        </p>

        <div className="form-grid">
          <input
            type="text"
            placeholder="📍 Destination (e.g., Jaipur, Kerala)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            min="1"
            max="7"
            placeholder="Number of Days"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="" disabled>Select Month</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

        </div>

        <button
          className="generate-button"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Crafting Your Yatra..." : "🧭 Create My Yatra"}
        </button>


        {itinerary && (
          <div className="result-box">
            <h2 className="result-title">✅ Here is your itinerary:</h2>
            <pre>{itinerary}</pre>
            <button className="generate-button" onClick={handleDownloadPDF}>
              📄 Download as PDF
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ItineraryPage;