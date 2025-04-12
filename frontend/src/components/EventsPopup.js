import React, { useState } from "react";
import "./EventsPopup.css";

const today = new Date().toDateString();

const events = [
  {
    name: "Hanuman Jayanti",
    date: "Sat Apr 12 2025",
    description: "Celebrates the birth of Lord Hanuman."
  },
  {
    name: "Baisakhi",
    date: "Sun Apr 13 2025",
    description: "Harvest festival in Punjab, marks Sikh New Year."
  },
  {
    name: "Tamil New Year (Puthandu)",
    date: "Mon Apr 14 2025",
    description: "Tamil calendar New Year with rituals and feasts."
  },
  {
    name: "Vishu",
    date: "Mon Apr 14 2025",
    description: "Malayalam New Year with Vishukkani, fireworks."
  },
  {
    name: "Bohag Bihu",
    date: "Mon Apr 14 2025",
    description: "Assamese New Year and harvest festival."
  }
];

function EventsPopup() {
  const [visible, setVisible] = useState(true);
  const liveEvents = events.filter(e => new Date(e.date) >= new Date());

  if (!visible) return null;

  return (
    <div className="floating-popup-box">
      <div className="popup-header">
        🎉 Live Indian Events
        <span className="close-btn" onClick={() => setVisible(false)}>✖</span>
      </div>
      <div className="popup-content">
        {liveEvents.length === 0 ? (
          <p>No live events today.</p>
        ) : (
          <ul>
            {liveEvents.map((event, index) => (
              <li key={index}>
                <strong>{event.name}</strong> <br />
                <span style={{ fontSize: "12px", color: "#333" }}>{event.date}</span>
                <div style={{ fontSize: "13px", marginTop: "4px" }}>{event.description}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default EventsPopup;
