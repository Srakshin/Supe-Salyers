import React, { useState, useEffect } from "react";
import "../styles/Itinerary.css";
import Navbarjs from "../components/Navbarr";
import { LoadingPage } from "./LoadingPage";

const ItineraryPage = () => {
  const [location, setLocation] = useState("");
  const [days, setDays] = useState();
  const [month, setMonth] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  
  // Simulate initial page loading
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setInitialLoading(false);
        }, 300);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
    // Reset and start progress animation for API call
    setLoadingProgress(0);
    let progress = 0;
    const progressInterval = setInterval(() => {
      // Increment more slowly for API call to avoid reaching 100% too quickly
      progress += Math.random() * 3;
      if (progress > 90) progress = 90; // Cap at 90% until real data arrives
      setLoadingProgress(progress);
    }, 200);

    try {
      const response = await fetch("http://localhost:5000/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, days, month }),
      });

      const data = await response.json();
      clearInterval(progressInterval);
      setLoadingProgress(100);
      setItinerary(data.itinerary);
      setTimeout(() => setLoading(false), 500);
    } catch (error) {
      clearInterval(progressInterval);
      setLoadingProgress(100);
      setItinerary("⚠️ Error fetching itinerary.");
      console.error(error);
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <div className="heritage-container">
      {(initialLoading || loading) && <LoadingPage percentage={loadingProgress} />}
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
          </div>
        )}

      </div>
    </div>
  );
};

export default ItineraryPage;