import React from "react";
import "../styles/EcoNavbar.css";
function EcoNavbar() {
  return (
    <div className="eco-navbar-main">
      <nav className="eco-navbar">
        <ul className="eco-nav-list">
          <li>
          <a
            href="/"
            style={{
            color: 'black',
            textDecoration: 'none',
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 'bold',
            textShadow: '0 0 0 black'
            }}>Home</a>
          </li>
          <li>
          <a
            href="/trade/more"
            style={{
            color: 'black',
            textDecoration: 'none',
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 'bold',
            textShadow: '0 0 0 black'
            }}>See More</a>
          </li>
          <li>
          <a
            href="/india"
            style={{
            color: 'black',
            textDecoration: 'none',
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 'bold',
            textShadow: '0 0 0 black'
            }}>Explore India</a>
          </li>
          <li>
          <a
            href="/hottest"
            style={{
            color: 'black',
            textDecoration: 'none',
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 'bold',
            textShadow: '0 0 0 black'
            }}>Hottest</a>
          </li>
          <li>
          <a
            href="#my-footer"
            style={{
            color: 'black',
            textDecoration: 'none',
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 'bold',
            textShadow: '0 0 0 black'
            }}>About Us!</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default EcoNavbar;
