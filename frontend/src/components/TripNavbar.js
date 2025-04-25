import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/TripNavbar.css';

const TripNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('triptuner_user');
  
  // Function to check if a link is active
  const isActive = (path) => {
    const currentPath = location.pathname;
    if (path === '/triptuner' && currentPath === '/triptuner') return true;
    return currentPath.includes(path);
  };

  // Determine which navigation items to show based on the current user flow
  const showCustomize = isLoggedIn || location.pathname.includes('/triptuner/customize');
  const showBroker = isLoggedIn || location.pathname.includes('/triptuner/broker');
  const showSummary = isLoggedIn || location.pathname.includes('/triptuner/summary');
  const showConfirmation = isLoggedIn || location.pathname.includes('/booking-confirmation');
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('triptuner_user');
    navigate('/triptuner');
  };

  // Toggle email popup
  const toggleEmailPopup = () => {
    setShowEmailPopup(!showEmailPopup);
  };

  return (
    <>
      <nav className="trip-navbar">
        <div className="trip-navbar-container">
          <div className="trip-navbar-logo">
            <Link to="/triptuner">
              <span className="text-primary">Trip</span>
              <span className="text-secondary">Tuner</span>
            </Link>
          </div>
          
          <div className="trip-navbar-links">
            <Link 
              to="/triptuner" 
              className={`trip-navbar-link ${isActive('/triptuner') && !location.pathname.includes('/triptuner/') ? 'active' : ''}`}
            >
              Home
            </Link>
            
            {showCustomize && (
              <Link 
                to="/triptuner/customize" 
                className={`trip-navbar-link ${isActive('/triptuner/customize') ? 'active' : ''}`}
              >
                Customize
              </Link>
            )}
            
            {showBroker && (
              <Link 
                to="/triptuner/broker" 
                className={`trip-navbar-link ${isActive('/triptuner/broker') ? 'active' : ''}`}
              >
                Find Broker
              </Link>
            )}
            
            {showSummary && (
              <Link 
                to="/triptuner/summary" 
                className={`trip-navbar-link ${isActive('/triptuner/summary') ? 'active' : ''}`}
              >
                Summary
              </Link>
            )}
            
            {showConfirmation && (
              <Link 
                to="/booking-confirmation" 
                className={`trip-navbar-link ${isActive('/booking-confirmation') ? 'active' : ''}`}
              >
                Booking
              </Link>
            )}
          </div>
          
          <div className="trip-navbar-auth">
            {isLoggedIn ? (
              <div className="trip-navbar-user-menu">
                <button onClick={toggleEmailPopup} className="trip-navbar-button trip-navbar-email-btn">
                  <i className="fa fa-envelope"></i>
                </button>
                <button onClick={handleLogout} className="trip-navbar-button trip-navbar-logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="trip-navbar-button">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      
      {/* Email Popup */}
      {showEmailPopup && (
        <div className="email-popup">
          <div className="email-popup-content">
            <button className="email-popup-close" onClick={toggleEmailPopup}>×</button>
            <h3>Your Messages</h3>
            <div className="email-popup-messages">
              <p>No new messages</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TripNavbar; 