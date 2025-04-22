
import "./styles.css";
import { GiStreetLight } from "react-icons/gi"

import { MdTranslate } from "react-icons/md";
import { PiChatsCircleThin } from "react-icons/pi";
import { useState } from "react";
import FloatingChat from "./FloatingChat";

import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { PiMapTrifoldLight } from "react-icons/pi";

function Navbarjs() {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = (e) => {
    e.preventDefault(); 
    setShowChat((prev) => !prev);
  };

  return (
    <>
      <nav className="menu" id="menu">
        <input className="menu-toggler" type="checkbox" />
        <label htmlFor="menu-toggler"></label>

        <ul style={{ transition: "all 300ms linear" }}>
          {/* 2nd icon*/}
          <li className="menu-item">
            {/* Change this to toggle popup */}
            <a href="#" onClick={toggleChat}><PiChatsCircleThin /></a>
          </li>
          {/* 1st icon*/}
          <li className="menu-item">
            <Link to="/"><AiFillHome /></Link>
          </li>
          {/* 5th icon*/}
          <li className="menu-item">
            <a href="https://heritagetranslator.streamlit.app" target="_blank"><MdTranslate/></a>
          </li>
          {/* 4th icon*/}
          <li className="menu-item">
            <a href="/itinerary"><PiMapTrifoldLight /></a>
          </li>

          {/* 3rd icon*/}
          <li className="menu-item">
            <a href="/streetview"><GiStreetLight /></a>
          </li>
        </ul>
      </nav>

      {showChat && <FloatingChat />}
    </>
  );
}

export default Navbarjs;
