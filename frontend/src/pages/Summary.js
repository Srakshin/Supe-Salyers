import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TripNavbar from '../components/TripNavbar';
import TripProgressBar from '../components/TripProgressBar';
import { sendConfirmationEmail } from '../Data/email';
import '../styles/Summary.css';
import CircularMenu1 from "../components/CircularMenu4";

const Summary = () => {
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState(null);
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('pending'); // pending, processing, success, failed
  
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
    
    // Check if broker is selected
    const brokerStr = localStorage.getItem('triptuner_selected_broker');
    if (!brokerStr) {
      navigate('/triptuner/broker');
      return;
    }
    
    setUser(JSON.parse(userStr));
    setTripDetails(JSON.parse(tripStr));
    setSelectedBroker(JSON.parse(brokerStr));
    setLoading(false);
  }, [navigate]);
  
  const handleBookTrip = async () => {
    try {
      setBookingStatus('processing');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send confirmation email (simulated)
      await sendConfirmationEmail(
        tripDetails,
        user,
        selectedBroker
      );
      
      // Store booking in localStorage
      const bookingDetails = {
        id: 'TT' + Date.now().toString().slice(-8),
        tripDetails,
        selectedBroker,
        user,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      // Store in bookings array
      const existingBookings = JSON.parse(localStorage.getItem('triptuner_bookings') || '[]');
      existingBookings.push(bookingDetails);
      localStorage.setItem('triptuner_bookings', JSON.stringify(existingBookings));
      
      setBookingStatus('success');
    } catch (err) {
      console.error('Error booking trip:', err);
      setBookingStatus('failed');
      setError('Failed to complete booking. Please try again.');
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Handle back to Home
  const handleBackToHome = () => {
    navigate('/triptuner');
  };
  
  if (loading) {
    return (
      <div className="summary-page">
        <TripNavbar />
        <TripProgressBar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading trip details...</p>
        </div>
      </div>
    );
  }
  
  if (error && bookingStatus !== 'success') {
    return (
      <div className="summary-page">
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
    <div className="summary-page">
      <TripNavbar />
      <TripProgressBar />
      <CircularMenu1 />
      <div className="summary-container">
        {bookingStatus === 'success' ? (
          <div className="booking-success">
            <div className="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h1>Booking Confirmed!</h1>
            <p className="success-message">Your trip to {tripDetails.destination} has been successfully booked.</p>
            <div className="booking-details">
              <p className="booking-id">Booking Reference: <span>TT{Date.now().toString().slice(-8)}</span></p>
              <p>A confirmation email has been sent to {user.email}</p>
              <p>Your guide {selectedBroker.name} will contact you soon with more details.</p>
            </div>
            <button 
              className="home-button"
              onClick={handleBackToHome}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="summary-content">
            <div className="summary-header">
              <h1>Trip Summary</h1>
              <p>Review your trip details before confirming</p>
            </div>
            
            <div className="summary-sections">
              <div className="summary-section trip-details-section">
                <h2 className="section-title">Trip Details</h2>
                <div className="trip-overview">
                  <div className="trip-destination">
                    <h3>Destination</h3>
                    <p>{tripDetails.destination}</p>
                  </div>
                  <div className="trip-class">
                    <h3>Travel Class</h3>
                    <p>{tripDetails.travelClass}</p>
                  </div>
                  <div className="trip-dates">
                    <h3>Travel Dates</h3>
                    <p>{formatDate(tripDetails.startDate)} to {formatDate(tripDetails.endDate)}</p>
                  </div>
                </div>
                
                <div className="trip-customizations">
                  <div className="customization-item">
                    <h3>Transportation</h3>
                    <p>{tripDetails.car}</p>
                  </div>
                  <div className="customization-item">
                    <h3>Accommodation</h3>
                    <p>{tripDetails.room}</p>
                  </div>
                </div>
                
                <div className="trip-places">
                  <h3>Included Places</h3>
                  <div className="places-list">
                    {tripDetails.includedPlaces.map((place, index) => (
                      <span key={index} className="place-tag">{place}</span>
                    ))}
                  </div>
                  
                  {tripDetails.extraPlaces && tripDetails.extraPlaces.length > 0 && (
                    <>
                      <h3>Additional Places</h3>
                      <div className="places-list">
                        {tripDetails.extraPlaces.map((place, index) => (
                          <span key={index} className="place-tag extra">{place}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="summary-section broker-section">
                <h2 className="section-title">Your Guide</h2>
                <div className="broker-details">
                  <div className="broker-photo">
                    <img src={selectedBroker.photo} alt={selectedBroker.name} />
                  </div>
                  <div className="broker-info">
                    <h3>{selectedBroker.name}</h3>
                    <div className="broker-badge">
                      <span>{selectedBroker.experience} Years Experience</span>
                    </div>
                    <p className="broker-bio">{selectedBroker.bio}</p>
                    <div className="broker-contact">
                      <p><strong>Languages:</strong> {selectedBroker.languages.join(', ')}</p>
                      <p><strong>Specialties:</strong> {selectedBroker.specialties.join(', ')}</p>
                      <p><strong>Contact:</strong> {selectedBroker.contact}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="summary-section pricing-section">
                <h2 className="section-title">Pricing Details</h2>
                <div className="price-details">
                  <div className="price-row">
                    <span>Base Price</span>
                    <span>₹{(tripDetails.totalPrice * 0.8).toLocaleString()}</span>
                  </div>
                  <div className="price-row">
                    <span>Customizations</span>
                    <span>₹{(tripDetails.totalPrice * 0.15).toLocaleString()}</span>
                  </div>
                  <div className="price-row">
                    <span>Guide Fee</span>
                    <span>₹{(tripDetails.totalPrice * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="price-row total">
                    <span>Total Price</span>
                    <span>₹{tripDetails.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="summary-section payment-section">
                <h2 className="section-title">Payment Details</h2>
                <p className="payment-note">For demo purposes, no actual payment will be processed.</p>
              </div>
            </div>
            
            <div className="booking-actions">
              <button 
                className="back-button"
                onClick={() => navigate('/triptuner/broker')}
              >
                Back
              </button>
              <button 
                className={`book-button ${bookingStatus === 'processing' ? 'processing' : ''}`}
                onClick={handleBookTrip}
                disabled={bookingStatus === 'processing'}
              >
                {bookingStatus === 'processing' ? (
                  <>
                    <span className="spinner-small"></span>
                    Processing...
                  </>
                ) : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary; 