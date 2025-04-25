import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TripNavbar from '../components/TripNavbar';
import TripProgressBar from '../components/TripProgressBar';
import ClassCard from '../components/ClassCard';
import '../styles/TripHome.css';
import classesData from '../classes.json';
import CircularMenu1 from "../components/CircularMenu4";

const TripHome = () => {
  const navigate = useNavigate();
  const [travelClasses, setTravelClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    // Check if a class was previously selected
    const savedClass = localStorage.getItem('triptuner_selected_class');
    if (savedClass) {
      setSelectedClass(JSON.parse(savedClass));
    }

    // Fetch travel classes from the classes.json file
    const fetchTravelClasses = async () => {
      try {
        setLoading(true);

        // Use the imported classes.json data directly
        setTravelClasses(classesData.classes || []);
        setLoading(false);
      } catch (err) {
        setError('Error loading travel packages. Please try again later.');
        console.error('Error fetching travel classes:', err);
        setLoading(false);
      }
    };

    fetchTravelClasses();
  }, []);

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    // Store selected class in localStorage for persistence across pages
    localStorage.setItem('triptuner_selected_class', JSON.stringify(classData));

    // Check if user is logged in
    const user = localStorage.getItem('triptuner_user');
    if (!user) {
      // Show login prompt or navigate to login
      navigate('/login');
    } else {
      // If logged in, navigate to customize
      navigate('/triptuner/customize');
    }
  };

  return (
    <div className="triptuner-home">
      <TripNavbar />
      <CircularMenu1 />
      <TripProgressBar />

      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Perfect Indian Journey</h1>
          <p>
            Customize budget-friendly trips to India's most beautiful spiritual and cultural destinations.
            From Shirdi to Tirupati, create your ideal travel experience with TripTuner.
          </p>
          <button
            className="cta-button"
            onClick={() => document.getElementById('travel-classes').scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Travel Classes
          </button>
        </div>
      </div>

      <div className="how-it-works">
        <div className="container">
          <h2 className="section-title">How TripTuner Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose Travel Class</h3>
              <p>Select from our curated travel classes based on your preferences and budget</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Customize Experience</h3>
              <p>Personalize your trip with car options, room preferences, and additional places to visit</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Match with Guide</h3>
              <p>Get paired with the perfect travel broker based on your interests or zodiac compatibility</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Confirm & Enjoy</h3>
              <p>Review your personalized itinerary, confirm booking, and prepare for an amazing journey</p>
            </div>
          </div>
        </div>
      </div>

      <div id="travel-classes" className="travel-classes">
        <div className="container">
          <h2 className="section-title">Choose Your Travel Class</h2>
          <p className="section-description">
            Select a travel class that fits your style and budget. Each class can be further customized to create your perfect trip.
          </p>

          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Loading travel classes...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="retry-button"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {selectedClass && (
                <div className="selected-class-banner">
                  <p>You've selected: <strong>{selectedClass.name}</strong></p>
                  <div className="banner-actions">
                    <button
                      className="continue-customization"
                      onClick={() => navigate('/triptuner/customize')}
                    >
                      Continue Customization
                    </button>
                    <button
                      className="change-selection"
                      onClick={() => {
                        setSelectedClass(null);
                        localStorage.removeItem('triptuner_selected_class');
                      }}
                    >
                      Change Selection
                    </button>
                  </div>
                </div>
              )}

              <div className="classes-grid">
                {travelClasses.map(travelClass => (
                  <ClassCard
                    key={travelClass.id}
                    classData={travelClass}
                    onSelect={handleClassSelect}
                    isSelected={selectedClass && selectedClass.id === travelClass.id}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="featured-destinations">
        <div className="container">
          <h2 className="section-title">Featured Destinations</h2>
          <div className="destinations-grid">
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1588416499018-d8c621360556?q=80&w=400" alt="Shirdi" />
              <div className="destination-info">
                <h3>Shirdi</h3>
                <p>Spiritual home of Sai Baba and a place of peace and devotion</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1486604028229-8959c963c685?q=80&w=400" alt="Tirupati" />
              <div className="destination-info">
                <h3>Tirupati</h3>
                <p>Home to the sacred Tirumala Venkateswara Temple and beautiful hills</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://images.unsplash.com/photo-1623075191134-373350a25267?q=80&w=400" alt="Hyderabad" />
              <div className="destination-info">
                <h3>Hyderabad</h3>
                <p>Experience the perfect blend of history, culture and modern charm</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Travelers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote">"TripTuner made our family trip to Shirdi so easy and memorable. The personalized guidance was outstanding!"</div>
              <div className="author">- Priya Sharma, Delhi</div>
            </div>
            <div className="testimonial-card">
              <div className="quote">"Perfect balance of spiritual and cultural experiences. Our guide knew exactly what we would enjoy."</div>
              <div className="author">- Raj Patel, Mumbai</div>
            </div>
            <div className="testimonial-card">
              <div className="quote">"Being matched with a guide who spoke our language and understood our interests made all the difference."</div>
              <div className="author">- Ananya Reddy, Bangalore</div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Create your customized travel experience in just a few minutes</p>
          <button
            className="cta-button"
            onClick={() => document.getElementById('travel-classes').scrollIntoView({ behavior: 'smooth' })}
          >
            Plan Your Trip Now
          </button>
        </div>
      </div>

      <footer className="triptuner-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>TripTuner</h3>
              <p>Personalized travel experiences across India's spiritual destinations</p>
            </div>
            <div className="footer-links">
              <div className="footer-links-column">
                <h4>Destinations</h4>
                <ul>
                  <li>Shirdi</li>
                  <li>Tirupati</li>
                  <li>Hyderabad</li>
                  <li>Mumbai</li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h4>Company</h4>
                <ul>
                  <li>About Us</li>
                  <li>Contact</li>
                  <li>Careers</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h4>Support</h4>
                <ul>
                  <li>Help Center</li>
                  <li>Safety</li>
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 TripTuner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TripHome; 