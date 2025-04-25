import "./styles.css";
import { MdStorefront } from "react-icons/md";
import { PiChatsCircleThin } from "react-icons/pi";
import { useState } from "react";
import FloatingChat from "./FloatingChat";
import { MdTranslate } from "react-icons/md";

import { PiMapTrifoldLight } from "react-icons/pi";
import { GiDirectionSigns } from "react-icons/gi";

function CircularMenu1() {
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
            <a onClick={toggleChat} style={{ color: "white", fontSize: "2.0rem" }}>
              <PiChatsCircleThin />
            </a>
          </li>
          {/* 1st icon*/}
          {/* <li className="menu-item">
            <Link to="/"><AiFillHome /></Link>
          </li> */}
          <li className="menu-item">
            <a href="https://heritagetranslator.streamlit.app" target="_blank"><MdTranslate/></a>
          </li>
          {/* 5th icon*/}
          <li className="menu-item">
            <a href="/triptuner"><GiDirectionSigns/></a>
          </li>
          {/* 4th icon*/}                 
          <li className="menu-item">
            <a href="/itinerary"><PiMapTrifoldLight /></a>
          </li>

          {/* 3rd icon*/}
          <li className="menu-item">
            <a href="/trade"><MdStorefront /></a>
          </li>
        </ul>
      </nav>

      {showChat && <FloatingChat />}
    </>
  );
}

export default CircularMenu1; 