import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ClassCard.css';

const ClassCard = ({ classData, onSelect, isSelected }) => {
  const { id, name, description, places, basePrice, duration, image } = classData;

  const handleClick = () => {
    if (onSelect) {
      onSelect(classData);
    }
  };

  return (
    <div className={`class-card ${isSelected ? 'selected' : ''}`}>
      {isSelected && (
        <div className="selected-indicator">
          <span>✓ Selected</span>
        </div>
      )}
      
      <div className="class-card-image-container">
        <img src={image} alt={name} className="class-card-image" />
        <div className="class-card-overlay">
          <span className="class-card-duration">{duration}</span>
        </div>
      </div>
      
      <div className="class-card-content">
        <div className="class-card-header">
          <h3 className="class-card-title">{name}</h3>
          <div className="class-card-price">₹{basePrice.toLocaleString()}</div>
        </div>
        
        <p className="class-card-description">{description}</p>
        
        <div className="class-card-places">
          <h4 className="class-card-subtitle">Included Places</h4>
          <div className="class-card-places-tags">
            {places.slice(0, 3).map((place, index) => (
              <span key={index} className="class-card-place-tag">
                {place}
              </span>
            ))}
            {places.length > 3 && (
              <span className="class-card-place-tag more">
                +{places.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="class-card-actions">
          {isSelected ? (
            <Link 
              to="/triptuner/customize"
              className="class-card-customize-btn selected"
            >
              Continue Customization
            </Link>
          ) : (
            <button 
              className="class-card-customize-btn"
              onClick={handleClick}
            >
              Select & Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCard; 