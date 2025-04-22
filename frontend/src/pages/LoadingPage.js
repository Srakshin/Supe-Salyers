import "../styles/LoadingPage.css"
import { useEffect, useState, useRef } from "react";

export const LoadingPage = ({ percentage }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [dots, setDots] = useState('.');
  const [smoothProgress, setSmoothProgress] = useState(0);
  const prevPercentage = useRef(0);
  
  // Create animated dots for loading text
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.');
    }, 400);
    
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Smooth out the progress animation
  useEffect(() => {
    const targetProgress = typeof percentage === 'number' ? 
      Math.min(100, Math.max(0, percentage)) : 0;
    
    // If the difference is significant, animate smoothly
    if (Math.abs(targetProgress - smoothProgress) > 1) {
      const duration = 500; // Animation duration in ms
      const frameRate = 60; // Frames per second
      const frames = duration / (1000 / frameRate);
      const increment = (targetProgress - smoothProgress) / frames;
      
      let frame = 0;
      const animationInterval = setInterval(() => {
        frame++;
        if (frame >= frames) {
          setSmoothProgress(targetProgress);
          clearInterval(animationInterval);
        } else {
          setSmoothProgress(prev => prev + increment);
        }
      }, 1000 / frameRate);
      
      return () => clearInterval(animationInterval);
    }
  }, [percentage, smoothProgress]);
  
  // Add fade out animation when loading is nearly complete
  useEffect(() => {
    // Only trigger fade out if previously we weren't at 100%
    if (percentage > 95 && prevPercentage.current < 95) {
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 800); // Longer delay for more natural transition
      
      return () => clearTimeout(timer);
    }
    
    prevPercentage.current = percentage;
  }, [percentage]);
  
  // Calculate the loading progress for visual indicators
  const progressPercent = Math.floor(smoothProgress);
  
  return (
    <div id="loading-wrapper" className={fadeOut ? 'fade-out' : ''}>
      <div className="loading-content-container">
        {/* Chakra symbol SVG - representing Indian culture */}
        <svg className="loading-icon" viewBox="0 0 100 100">
          <circle className="loading-circle-bg" cx="50" cy="50" r="40" />
          <circle 
            className="loading-circle" 
            cx="50" 
            cy="50" 
            r="40" 
            style={{ 
              strokeDashoffset: 251.2 - (251.2 * progressPercent / 100),
              transform: `rotate(-90deg)`,
              transformOrigin: 'center'
            }}
          />
          {/* Simple decorative elements resembling a rangoli pattern */}
          <g transform="translate(50, 50)" style={{ opacity: 0.5 }}>
            <path d="M0,-30 L0,30 M-30,0 L30,0" stroke="#ddd" strokeWidth="1" />
            <path d="M-20,-20 L20,20 M-20,20 L20,-20" stroke="#ddd" strokeWidth="1" />
          </g>
        </svg>
        
        <div id="loading-text">
          <div className="loading-title">Discovering India{dots}</div>
          <div className="loading-percentage">{progressPercent}%</div>
        </div>
        
        <div className="loading-bar-container">
          <div 
            className="loading-bar" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};