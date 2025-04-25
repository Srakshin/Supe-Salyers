import React from 'react';
import '../styles/BrokerCard.css';

const BrokerCard = ({ broker, selected, onSelect }) => {
  const { name, bio, languages, experience, rating, photo, zodiacSign, specialties } = broker;
  
  // Generate star rating elements
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<span key={i} className="star full">★</span>);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<span key={i} className="star half">★</span>);
    } else {
      stars.push(<span key={i} className="star empty">★</span>);
    }
  }
  
  return (
    <div 
      className={`broker-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect && onSelect(broker)}
    >
      <div className="broker-card-header">
        <div className="broker-card-photo">
          <img src={photo} alt={name} />
          {selected && <div className="selected-indicator"></div>}
        </div>
        
        <div className="broker-card-info">
          <h3 className="broker-card-name">{name}</h3>
          <div className="broker-card-rating">
            <div className="stars">{stars}</div>
            <span className="rating-value">{rating.toFixed(1)}</span>
          </div>
          <div className="broker-card-meta">
            <span className="broker-experience">{experience} years experience</span>
            <span className="broker-zodiac">{zodiacSign}</span>
          </div>
        </div>
      </div>
      
      <div className="broker-card-body">
        <p className="broker-card-bio">{bio}</p>
        
        <div className="broker-card-details">
          <div className="broker-card-languages">
            <h4>Languages</h4>
            <div className="language-tags">
              {languages.map((lang, index) => (
                <span key={index} className="language-tag">{lang}</span>
              ))}
            </div>
          </div>
          
          <div className="broker-card-specialties">
            <h4>Specializes in</h4>
            <div className="specialty-tags">
              {specialties.map((specialty, index) => (
                <span key={index} className="specialty-tag">{specialty}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {selected && (
        <div className="broker-card-selected-label">
          Your Matched Broker
        </div>
      )}
      
      {!selected && (
        <div className="broker-card-select-action">
          <button className="broker-select-btn">
            Select as Guide
          </button>
        </div>
      )}
    </div>
  );
};

export default BrokerCard; 