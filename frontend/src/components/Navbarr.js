import "./styles.css";
import { MdStorefront } from "react-icons/md";
// import { BiSolidUpArrowAlt } from "react-icons/bi";
import { RiMapPin2Line } from "react-icons/ri";
import { PiChatsCircleThin } from "react-icons/pi";
import { useState } from "react";
import FloatingChat from "./FloatingChat";
// import { PiUsersThreeLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { PiMapTrifoldLight } from "react-icons/pi";

function Navbarjs() {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = (e) => {
    e.preventDefault(); // so it doesn't navigate
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
            <a href="/india"><RiMapPin2Line /></a>
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

export default Navbarjs;
