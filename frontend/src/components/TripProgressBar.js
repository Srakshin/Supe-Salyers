import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/TripProgressBar.css';

const TripProgressBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Define the steps in order
  const steps = [
    { path: '/triptuner', label: 'Choose Class', icon: '🏠' },
    { path: '/triptuner/customize', label: 'Customize', icon: '✏️' },
    { path: '/triptuner/broker', label: 'Select Broker', icon: '👤' },
    { path: '/triptuner/summary', label: 'Summary', icon: '📋' },
    { path: '/booking-confirmation', label: 'Booking', icon: '✓' }
  ];
  
  // Determine current step index
  const getCurrentStepIndex = () => {
    const current = steps.findIndex(step => currentPath.includes(step.path));
    return current >= 0 ? current : 0;
  };
  
  const currentStepIndex = getCurrentStepIndex();
  
  return (
    <div className="trip-progress-bar">
      <div className="trip-progress-container">
        {steps.map((step, index) => (
          <div 
            key={step.path} 
            className={`trip-progress-step ${index <= currentStepIndex ? 'active' : ''} ${index === currentStepIndex ? 'current' : ''}`}
          >
            <div className="trip-progress-icon">{step.icon}</div>
            <div className="trip-progress-label">{step.label}</div>
            {index < steps.length - 1 && (
              <div className={`trip-progress-connector ${index < currentStepIndex ? 'active' : ''}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripProgressBar; 