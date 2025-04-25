import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TripNavbar from '../components/TripNavbar';
import TripProgressBar from '../components/TripProgressBar';
import BrokerCard from '../components/BrokerCard';
import { getZodiacSign, findCompatibleBrokers } from '../Data/zodiac';
import '../styles/Broker.css';
import brokersData from '../brokers.json'; // Direct import of brokers data
import CircularMenu1 from "../components/CircularMenu1";
const Broker = () => {
  const navigate = useNavigate();
  const [brokers, setBrokers] = useState([]);
  const [matchedBrokers, setMatchedBrokers] = useState([]);
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [matchMethod, setMatchMethod] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [tripDetails, setTripDetails] = useState(null);
  
  // Form state for social media matching
  const [socialForm, setSocialForm] = useState({
    interests: '',
    languages: [],
    preferredExperience: 'any',
    specialtyPreference: ''
  });
  
  // Available languages for selection
  const availableLanguages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Gujarati', 'Marathi', 'Bengali', 'Punjabi', 'Malayalam', 'Sanskrit'];
  
  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('triptuner_user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    
    // Check if trip details exist
    const tripStr = localStorage.getItem('triptuner_trip_details');
    if (!tripStr) {
      navigate('/triptuner/customize');
      return;
    }
    
    setUser(JSON.parse(userStr));
    setTripDetails(JSON.parse(tripStr));
    
    // Fetch brokers data - use directly imported data
    try {
      setLoading(true);
      // Use the imported brokers data
      setBrokers(brokersData.brokers || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to load broker data. Please try again.');
      console.error('Error loading brokers data:', err);
      setLoading(false);
    }
  }, [navigate]);
  
  // Handle social form changes
  const handleSocialFormChange = (e) => {
    const { name, value } = e.target;
    setSocialForm({
      ...socialForm,
      [name]: value
    });
  };
  
  // Handle language checkbox changes
  const handleLanguageChange = (language) => {
    setSocialForm(prev => {
      const updatedLanguages = prev.languages.includes(language)
        ? prev.languages.filter(lang => lang !== language)
        : [...prev.languages, language];
      
      return {
        ...prev,
        languages: updatedLanguages
      };
    });
  };
  
  // Match brokers based on zodiac sign
  const matchByZodiac = () => {
    if (!user?.dob) {
      setError('Your date of birth is needed for zodiac matching. Please update your profile.');
      return;
    }
    
    try {
      // Parse DOB to get zodiac sign
      const dobDate = new Date(user.dob);
      const day = dobDate.getDate();
      const month = dobDate.getMonth() + 1; // JavaScript months are 0-based
      
      const userZodiac = getZodiacSign(day, month);
      console.log(`User zodiac sign: ${userZodiac}`);
      
      // Find compatible brokers
      const compatible = findCompatibleBrokers(userZodiac, brokers);
      setMatchedBrokers(compatible.length > 0 ? compatible : brokers);
      
      // Select a default broker (first match)
      if (compatible.length > 0) {
        setSelectedBroker(compatible[0]);
      }
      
      setMatchMethod('zodiac');
    } catch (err) {
      console.error('Error in zodiac matching:', err);
      setError('Could not perform zodiac matching. Using random matches instead.');
      setMatchedBrokers([...brokers].sort(() => 0.5 - Math.random()));
    }
  };
  
  // Match brokers based on social preferences
  const matchBySocialPreferences = (e) => {
    e.preventDefault();
    
    // Filter brokers based on form criteria
    let filteredBrokers = [...brokers];
    
    // Filter by selected languages
    if (socialForm.languages.length > 0) {
      filteredBrokers = filteredBrokers.filter(broker => 
        socialForm.languages.some(language => broker.languages.includes(language))
      );
    }
    
    // Filter by preferred experience
    if (socialForm.preferredExperience !== 'any') {
      const minExperience = parseInt(socialForm.preferredExperience);
      filteredBrokers = filteredBrokers.filter(broker => broker.experience >= minExperience);
    }
    
    // Filter by specialty if provided
    if (socialForm.specialtyPreference) {
      const specialtyLower = socialForm.specialtyPreference.toLowerCase();
      filteredBrokers = filteredBrokers.filter(broker => 
        broker.specialties.some(specialty => 
          specialty.toLowerCase().includes(specialtyLower)
        ) ||
        broker.bio.toLowerCase().includes(specialtyLower)
      );
    }
    
    // If no brokers match the criteria, use all brokers
    if (filteredBrokers.length === 0) {
      setError('No exact matches found for your preferences. Showing all guides.');
      filteredBrokers = [...brokers];
    } else {
      setError(null);
    }
    
    // Sort by matching interests (if provided)
    if (socialForm.interests) {
      const interestsLower = socialForm.interests.toLowerCase();
      filteredBrokers.sort((a, b) => {
        const aMatch = a.bio.toLowerCase().includes(interestsLower) || 
                      a.specialties.some(s => s.toLowerCase().includes(interestsLower));
        const bMatch = b.bio.toLowerCase().includes(interestsLower) || 
                      b.specialties.some(s => s.toLowerCase().includes(interestsLower));
        
        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
      });
    }
    
    setMatchedBrokers(filteredBrokers);
    
    // Select a default broker (first match)
    if (filteredBrokers.length > 0) {
      setSelectedBroker(filteredBrokers[0]);
    }
    
    setMatchMethod('social');
  };
  
  // Handle broker selection
  const handleBrokerSelect = (broker) => {
    setSelectedBroker(broker);
  };
  
  // Proceed to summary with selected broker
  const handleProceed = () => {
    if (!selectedBroker) {
      alert('Please select a guide to proceed.');
      return;
    }
    
    // Save selected broker to localStorage
    localStorage.setItem('triptuner_selected_broker', JSON.stringify(selectedBroker));
    
    // Navigate to summary page
    navigate('/triptuner/summary');
  };
  
  if (loading) {
    return (
      <div className="broker-page">
        <TripNavbar />
        <TripProgressBar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Finding the perfect guide for your journey...</p>
        </div>
      </div>
    );
  }
  
  if (error && !matchedBrokers.length) {
    return (
      <div className="broker-page">
        <TripNavbar />
        <TripProgressBar />
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button 
            className="back-button"
            onClick={() => navigate('/triptuner/customize')}
          >
            Back to Customize
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="broker-page">
      <TripNavbar />
      <TripProgressBar />
      <CircularMenu1 />
      <div className="broker-container">
        <div className="broker-header">
          <h1>Find Your Perfect Travel Guide</h1>
          <p>Get matched with a guide who will make your trip to {tripDetails?.destination} unforgettable</p>
        </div>
        
        {!matchMethod ? (
          <div className="match-selection">
            <div className="match-options">
              <div className="match-option" onClick={matchByZodiac}>
                <div className="match-icon zodiac-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a7 7 0 00-7 7M12 2a7 7 0 017 7M12 22a7 7 0 01-7-7M12 22a7 7 0 007-7"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h2>Match by Zodiac Sign</h2>
                <p>Let the stars guide you to your perfect travel companion based on astrological compatibility</p>
                <button className="match-button">Match with Zodiac</button>
              </div>
              
              <div className="match-option">
                <div className="match-icon social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path>
                  </svg>
                </div>
                <h2>Match by Preferences</h2>
                <p>Tell us your interests, language preferences, and what matters most to you for a personalized match</p>
                <button 
                  className="match-button"
                  onClick={() => setMatchMethod('social-form')}
                >
                  Set Preferences
                </button>
              </div>
            </div>
          </div>
        ) : matchMethod === 'social-form' ? (
          <div className="social-form-container">
            <h2>Tell Us Your Preferences</h2>
            <p>Help us find the perfect guide by sharing what matters most to you</p>
            
            <form onSubmit={matchBySocialPreferences} className="social-form">
              <div className="form-group">
                <label htmlFor="interests">Interests and Activities</label>
                <input
                  type="text"
                  id="interests"
                  name="interests"
                  value={socialForm.interests}
                  onChange={handleSocialFormChange}
                  placeholder="E.g., historical sites, cultural experiences, adventure"
                />
              </div>
              
              <div className="form-group">
                <label>Preferred Languages</label>
                <div className="checkbox-group">
                  {availableLanguages.map(language => (
                    <label key={language} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={socialForm.languages.includes(language)}
                        onChange={() => handleLanguageChange(language)}
                      />
                      {language}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="preferredExperience">Guide Experience Level</label>
                <select
                  id="preferredExperience"
                  name="preferredExperience"
                  value={socialForm.preferredExperience}
                  onChange={handleSocialFormChange}
                >
                  <option value="any">Any experience level</option>
                  <option value="3">At least 3 years</option>
                  <option value="5">At least 5 years</option>
                  <option value="7">At least 7 years</option>
                  <option value="10">At least 10 years</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="specialtyPreference">Specialty Preference</label>
                <input
                  type="text"
                  id="specialtyPreference"
                  name="specialtyPreference"
                  value={socialForm.specialtyPreference}
                  onChange={handleSocialFormChange}
                  placeholder="E.g., spiritual tours, adventure, food, family-friendly"
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="back-button"
                  onClick={() => setMatchMethod('')}
                >
                  Back
                </button>
                <button type="submit" className="match-button">
                  Find My Guide
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="matched-brokers-container">
            <div className="match-info">
              {matchMethod === 'zodiac' ? (
                <p className="match-method">
                  <span className="highlight">Matched by Zodiac Sign</span> · Based on your birth date: {new Date(user.dob).toLocaleDateString('en-IN')}
                </p>
              ) : (
                <p className="match-method">
                  <span className="highlight">Matched by Preferences</span> · Based on your selected criteria
                </p>
              )}
              
              {error && <p className="match-error">{error}</p>}
              
              <p className="match-count">Found {matchedBrokers.length} potential guides for your trip</p>
            </div>
            
            <div className="broker-results">
              <div className="broker-list">
                {matchedBrokers.map(broker => (
                  <BrokerCard
                    key={broker.id}
                    broker={broker}
                    selected={selectedBroker?.id === broker.id}
                    onSelect={handleBrokerSelect}
                  />
                ))}
              </div>
              
              <div className="broker-actions">
                <button 
                  className="back-button"
                  onClick={() => setMatchMethod('')}
                >
                  Try Different Match
                </button>
                <button 
                  className="proceed-button"
                  onClick={handleProceed}
                  disabled={!selectedBroker}
                >
                  Continue with Selected Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Broker; 