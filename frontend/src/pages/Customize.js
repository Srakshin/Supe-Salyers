import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TripNavbar from '../components/TripNavbar';
import TripProgressBar from '../components/TripProgressBar';
import '../styles/Customize.css';
import classesData from '../classes.json';
import CircularMenu1 from "../components/CircularMenu1";

const Customize = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classIdParam = queryParams.get('classId');
  
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [extraPlaces, setExtraPlaces] = useState([]);
  
  // Customization options
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedExtraPlaces, setSelectedExtraPlaces] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Calculate min start date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minStartDate = tomorrow.toISOString().split('T')[0];
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('triptuner_user');
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Fetch class data from either localStorage or classes.json
    const fetchClassData = async () => {
      try {
        setLoading(true);
        
        // Try to get the selected class from localStorage
        const storedClass = localStorage.getItem('triptuner_selected_class');
        
        // If a class ID was provided in the URL and there's no stored class
        // or the stored class ID doesn't match the URL parameter,
        // we need to fetch the class data
        if (classIdParam && (!storedClass || JSON.parse(storedClass).id !== parseInt(classIdParam))) {
          const classes = classesData.classes || [];
          const foundClass = classes.find(cls => cls.id === parseInt(classIdParam));
          
          if (foundClass) {
            setSelectedClass(foundClass);
            // Store in localStorage for future use
            localStorage.setItem('triptuner_selected_class', JSON.stringify(foundClass));
          } else {
            setError('Travel class not found. Please go back and select a valid class.');
          }
        } else if (storedClass) {
          // Use the class data from localStorage
          setSelectedClass(JSON.parse(storedClass));
        } else {
          setError('No travel class selected. Please go back and select a class.');
        }
        
        // Set extra places data
        setExtraPlaces(classesData.extraPlaces || []);
        
      } catch (err) {
        setError('Failed to load travel class data. Please try again.');
        console.error('Error loading class data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClassData();
  }, [classIdParam, navigate]);
  
  // Set default selections when class data is loaded
  useEffect(() => {
    if (selectedClass) {
      setSelectedCar(selectedClass.defaultCar);
      setSelectedRoom(selectedClass.defaultRoom);
      updateTotalPrice(
        selectedClass.defaultCar, 
        selectedClass.defaultRoom, 
        selectedExtraPlaces
      );
    }
  }, [selectedClass]);
  
  // Calculate total price when selections change
  const updateTotalPrice = (car, room, extras) => {
    if (!selectedClass) return;
    
    // Start with base price
    let price = selectedClass.basePrice;
    
    // Add car adjustment
    const selectedCarOption = selectedClass.carOptions.find(option => option.name === car);
    if (selectedCarOption) {
      price += selectedCarOption.priceAdjustment;
    }
    
    // Add room adjustment
    const selectedRoomOption = selectedClass.roomOptions.find(option => option.name === room);
    if (selectedRoomOption) {
      price += selectedRoomOption.priceAdjustment;
    }
    
    // Add extras
    extras.forEach(extraId => {
      const extra = extraPlaces.find(place => place.id === extraId);
      if (extra) {
        price += extra.price;
      }
    });
    
    setTotalPrice(price);
  };
  
  // Handle car selection
  const handleCarSelect = (carName) => {
    setSelectedCar(carName);
    updateTotalPrice(carName, selectedRoom, selectedExtraPlaces);
  };
  
  // Handle room selection
  const handleRoomSelect = (roomName) => {
    setSelectedRoom(roomName);
    updateTotalPrice(selectedCar, roomName, selectedExtraPlaces);
  };
  
  // Handle extra place toggle
  const handleExtraPlaceToggle = (placeId) => {
    const updatedPlaces = selectedExtraPlaces.includes(placeId)
      ? selectedExtraPlaces.filter(id => id !== placeId)
      : [...selectedExtraPlaces, placeId];
    
    setSelectedExtraPlaces(updatedPlaces);
    updateTotalPrice(selectedCar, selectedRoom, updatedPlaces);
  };
  
  // Handle date selection
  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    
    // Automatically set end date based on duration if it's not already set
    if (selectedClass && !endDate) {
      const durationDays = parseInt(selectedClass.duration.split(' ')[0]);
      const newEndDate = new Date(date);
      newEndDate.setDate(newEndDate.getDate() + durationDays);
      setEndDate(newEndDate.toISOString().split('T')[0]);
    }
  };
  
  // Handle proceed to next step
  const handleProceed = () => {
    if (!startDate) {
      alert('Please select a start date for your trip.');
      return;
    }
    
    // Store trip details in localStorage
    const tripDetails = {
      travelClass: selectedClass.name,
      destination: selectedClass.name.includes('Telangana') ? 'Telangana' : 
                   selectedClass.name.includes('Tirupati') ? 'Tirupati' : 
                   selectedClass.places[0]?.includes('Shirdi') ? 'Shirdi' : selectedClass.places[0],
      car: selectedCar,
      room: selectedRoom,
      startDate,
      endDate,
      totalPrice,
      extraPlaces: selectedExtraPlaces.map(id => {
        const place = extraPlaces.find(p => p.id === id);
        return place ? place.name : '';
      }).filter(Boolean),
      includedPlaces: selectedClass.places
    };
    
    localStorage.setItem('triptuner_trip_details', JSON.stringify(tripDetails));
    
    // Navigate to broker selection page
    navigate('/triptuner/broker');
  };
  
  if (loading) {
    return (
      <div className="customize-page">
        <TripNavbar />
        <TripProgressBar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading customization options...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="customize-page">
        <TripNavbar />
        <TripProgressBar />
        <div className="error-container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/triptuner')} className="error-action-button">
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="customize-page">
      <TripNavbar />
      <TripProgressBar />
      <CircularMenu1 />
      <div className="customize-container">
        <div className="customize-header">
          <h1>Customize Your {selectedClass?.name} Trip</h1>
          <p>Personalize your travel experience to fit your preferences and budget</p>
        </div>
        
        <div className="customize-content">
          <div className="customize-options">
            {/* Travel dates selection */}
            <div className="customize-section">
              <h2 className="section-title">Select Travel Dates</h2>
              <div className="date-selection">
                <div className="date-input">
                  <label htmlFor="start-date">Start Date</label>
                  <input 
                    type="date" 
                    id="start-date" 
                    min={minStartDate}
                    value={startDate}
                    onChange={handleStartDateChange}
                    required
                  />
                </div>
                <div className="date-input">
                  <label htmlFor="end-date">End Date</label>
                  <input 
                    type="date" 
                    id="end-date" 
                    min={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={!startDate}
                  />
                  <small>Based on {selectedClass?.duration}</small>
                </div>
              </div>
            </div>
            
            {/* Car selection */}
            <div className="customize-section">
              <h2 className="section-title">Select Transportation</h2>
              <div className="car-options">
                {selectedClass?.carOptions.map((car) => (
                  <div 
                    key={car.name}
                    className={`option-card ${selectedCar === car.name ? 'selected' : ''}`}
                    onClick={() => handleCarSelect(car.name)}
                  >
                    <div className="option-image">
                      <img src={car.image} alt={car.name} />
                    </div>
                    <div className="option-info">
                      <h3>{car.name}</h3>
                      <div className="option-price">
                        {car.priceAdjustment > 0 ? 
                          `+₹${car.priceAdjustment.toLocaleString()}` : 
                          'Included'
                        }
                      </div>
                    </div>
                    {selectedCar === car.name && (
                      <div className="selected-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Room selection */}
            <div className="customize-section">
              <h2 className="section-title">Select Accommodation</h2>
              <div className="room-options">
                {selectedClass?.roomOptions.map((room) => (
                  <div 
                    key={room.name}
                    className={`option-card ${selectedRoom === room.name ? 'selected' : ''}`}
                    onClick={() => handleRoomSelect(room.name)}
                  >
                    <div className="option-image">
                      <img src={room.image} alt={room.name} />
                    </div>
                    <div className="option-info">
                      <h3>{room.name}</h3>
                      <div className="option-price">
                        {room.priceAdjustment > 0 ? 
                          `+₹${room.priceAdjustment.toLocaleString()}` : 
                          'Included'
                        }
                      </div>
                    </div>
                    {selectedRoom === room.name && (
                      <div className="selected-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Extra places selection */}
            <div className="customize-section">
              <h2 className="section-title">Add Extra Places to Visit</h2>
              <p className="section-desc">Enhance your trip with these additional experiences</p>
              
              <div className="extra-places">
                {extraPlaces.map((place) => (
                  <div 
                    key={place.id}
                    className={`place-card ${selectedExtraPlaces.includes(place.id) ? 'selected' : ''}`}
                    onClick={() => handleExtraPlaceToggle(place.id)}
                  >
                    <div className="place-image">
                      <img src={place.image} alt={place.name} />
                      {selectedExtraPlaces.includes(place.id) && (
                        <div className="selected-overlay">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="place-info">
                      <h3>{place.name}</h3>
                      <div className="place-meta">
                        <span className="place-duration">{place.duration}</span>
                        <span className="place-price">₹{place.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="trip-summary">
            <div className="summary-card">
              <h2>Trip Summary</h2>
              
              <div className="summary-detail">
                <h3>Travel Class</h3>
                <p>{selectedClass?.name}</p>
              </div>
              
              <div className="summary-detail">
                <h3>Included Places</h3>
                <div className="places-list">
                  {selectedClass?.places.map((place, index) => (
                    <span key={index} className="place-tag">{place}</span>
                  ))}
                </div>
              </div>
              
              {selectedExtraPlaces.length > 0 && (
                <div className="summary-detail">
                  <h3>Additional Places</h3>
                  <div className="places-list">
                    {selectedExtraPlaces.map((placeId) => {
                      const place = extraPlaces.find(p => p.id === placeId);
                      return place ? (
                        <span key={placeId} className="place-tag extra">{place.name}</span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
              
              <div className="summary-detail">
                <h3>Duration</h3>
                <p>{selectedClass?.duration}</p>
              </div>
              
              {startDate && (
                <div className="summary-detail">
                  <h3>Travel Dates</h3>
                  <p>{new Date(startDate).toLocaleDateString('en-IN')} to {new Date(endDate).toLocaleDateString('en-IN')}</p>
                </div>
              )}
              
              <div className="summary-detail">
                <h3>Selected Car</h3>
                <p>{selectedCar}</p>
              </div>
              
              <div className="summary-detail">
                <h3>Selected Room</h3>
                <p>{selectedRoom}</p>
              </div>
              
              <div className="price-summary">
                <div className="base-price">
                  <span>Base Price</span>
                  <span>₹{selectedClass?.basePrice.toLocaleString()}</span>
                </div>
                
                <div className="total-price">
                  <span>Total Price</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                className="proceed-button"
                onClick={handleProceed}
                disabled={!startDate}
              >
                Proceed to Find Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize; 