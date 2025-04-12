import "./styles.css";
import { MdStorefront } from "react-icons/md";
import { RiMapPin2Line } from "react-icons/ri";
import { PiChatsCircleThin, PiMapTrifoldLight, PiCalendarLight } from "react-icons/pi";  
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import FloatingChat from "./FloatingChat";
import EventsPopup from "./EventsPopup";  

function Navbarjs() {
    const [showChat, setShowChat] = useState(false);
    const [showEvents, setShowEvents] = useState(false);

    const toggleChat = (e) => {
        e.preventDefault();
        setShowChat(prev => !prev);
    };

 
    const toggleEventsPopup = (e) => {
        e.preventDefault();
        setShowEvents(prev => !prev);
    };

    return (
        <>
            <nav className="menu" id="menu">
                <input className="menu-toggler" type="checkbox" />
                <label htmlFor="menu-toggler"></label>

                <ul style={{ transition: "all 300ms linear" }}>
                    {/* Chat Icon */}
                    <li className="menu-item">
                        <a href="#" onClick={toggleChat}><PiChatsCircleThin /></a>
                    </li>

                    {/* Events Icon */}
                    <li className="menu-item">
                        <a href="#" onClick={toggleEventsPopup}><PiCalendarLight /></a>
                    </li>

                    {/* Map */}
                    <li className="menu-item">
                        <Link to="/india"><RiMapPin2Line /></Link>
                    </li>

                    {/* Itinerary */}
                    <li className="menu-item">
                        <Link to="/itinerary"><PiMapTrifoldLight /></Link>
                    </li>

                    {/* Trade */}
                    <li className="menu-item">
                        <Link to="/trade"><MdStorefront /></Link>
                    </li>
                </ul>
            </nav>

            {showChat && <FloatingChat />}
            {showEvents && <EventsPopup onClose={toggleEventsPopup} />}
        </>
    );
}

export default Navbarjs;
