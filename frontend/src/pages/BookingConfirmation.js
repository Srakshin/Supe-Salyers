import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TripNavbar from '../components/TripNavbar';
import { formatBookingId } from '../utils/emailService';
import '../styles/BookingConfirmation.css';
import CircularMenu1 from "../components/CircularMenu1";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [showEmailPopup, setShowEmailPopup] = useState(true);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching booking details
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('triptuner_user');
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Get selected trip and broker from localStorage
    const selectedClass = JSON.parse(localStorage.getItem('triptuner_selected_class') || '{}');
    const selectedBroker = JSON.parse(localStorage.getItem('triptuner_selected_broker') || '{}');
    
    // In a real app, we would fetch the booking details from the API
    const fetchBookingDetails = async () => {
      try {
        // Simulate API call delay
        setTimeout(() => {
          // Generate a random booking ID
          const bookingId = Math.floor(100000 + Math.random() * 900000).toString();
          
          // Mock data for display purposes
          setBooking({
            id: bookingId,
            formattedId: formatBookingId(bookingId),
            trip: {
              destination: selectedClass.name || 'TripTuner Custom Journey',
              startDate: '2023-11-15',
              endDate: '2023-11-25',
              image: selectedClass.image || 'https://images.unsplash.com/photo-1602391833977-358a52198938?q=80&w=1000'
            },
            broker: {
              name: selectedBroker.name || 'Travel Expert',
              email: selectedBroker.email || 'support@triptuner.com',
              phone: selectedBroker.phone || '+91 98765 43210'
            },
            user: {
              name: JSON.parse(user).name || 'User',
              email: JSON.parse(user).email || 'user@example.com'
            },
            price: {
              total: selectedClass.price || 2499.99,
              deposit: (selectedClass.price * 0.2) || 499.99,
              balance: (selectedClass.price * 0.8) || 2000
            },
            status: 'Confirmed',
            paymentMethod: 'Credit Card',
            createdAt: new Date().toISOString()
          });
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [navigate]);

  // Handle email popup close
  const handleCloseEmailPopup = () => {
    setShowEmailPopup(false);
  };

  // Handle manual redirect
  const handleReturnHome = () => {
    navigate('/triptuner');
  };

  if (loading) {
    return (
      <div className="booking-confirmation-page">
        <TripNavbar />
        <CircularMenu1 />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Finalizing your booking...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-confirmation-page">
      <TripNavbar />
      
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p>Your adventure trip has been successfully booked.</p>
        </div>

        <div className="booking-details">
          <h2>Booking Details</h2>
          <p className="booking-id">Booking ID: <span>{booking.formattedId}</span></p>
          <p className="booking-date">Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
          
          <div className="trip-summary">
            <div className="trip-image">
              <img src={booking.trip.image} alt={booking.trip.destination} />
            </div>
            <div className="trip-info">
              <h3>{booking.trip.destination}</h3>
              <p>Dates: {booking.trip.startDate} to {booking.trip.endDate}</p>
              <p>Status: <span className="status-confirmed">{booking.status}</span></p>
            </div>
          </div>
          
          <div className="payment-summary">
            <h3>Payment Information</h3>
            <div className="payment-details">
              <div className="payment-item">
                <span>Total Price:</span>
                <span>₹{booking.price.total.toFixed(2)}</span>
              </div>
              <div className="payment-item">
                <span>Deposit Paid:</span>
                <span>₹{booking.price.deposit.toFixed(2)}</span>
              </div>
              <div className="payment-item balance">
                <span>Remaining Balance:</span>
                <span>₹{booking.price.balance.toFixed(2)}</span>
              </div>
              <div className="payment-item method">
                <span>Payment Method:</span>
                <span>{booking.paymentMethod}</span>
              </div>
            </div>
          </div>
          
          <div className="contact-info">
            <h3>Your Travel Broker</h3>
            <p>If you have any questions about your trip, please contact your broker:</p>
            <div className="broker-details">
              <p>{booking.broker.name}</p>
              <p>{booking.broker.email}</p>
              <p>{booking.broker.phone}</p>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <p>A confirmation email has been sent to {booking.user.email}</p>
          <div className="action-buttons">
            <button className="print-button">
              <i className="fa fa-print"></i> Print Confirmation
            </button>
            <button className="home-button" onClick={handleReturnHome}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
      
      {/* Email Confirmation Popup */}
      {showEmailPopup && (
        <div className="email-popup-overlay">
          <div className="email-popup-modal">
            <button className="close-popup" onClick={handleCloseEmailPopup}>×</button>
            <div className="email-popup-content">
              <div className="email-icon">
                <i className="fa fa-envelope"></i>
              </div>
              <h3>Booking Confirmation Sent!</h3>
              <p>We've sent a booking confirmation to <strong>{booking.user.email}</strong></p>
              <p>All the details of your trip are included in the email.</p>
              <button className="close-popup-button" onClick={handleCloseEmailPopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation; 