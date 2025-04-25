import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TripNavbar from '../components/TripNavbar';
import { sendWelcomeEmail } from '../Data/email';
import '../styles/Login.css';
import CircularMenu1 from "../components/CircularMenu4";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('triptuner_user');
    if (user) {
      navigate('/triptuner');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    // Simple validation
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError('Please enter both email and password');
        return false;
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return false;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
      
      // Password validation - at least 6 characters
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isLogin) {
        // Check local storage for user
        const users = JSON.parse(localStorage.getItem('triptuner_users') || '[]');
        const user = users.find(u => u.email === formData.email);
        
        if (!user || user.password !== formData.password) {
          throw new Error('Invalid email or password');
        }
        
        // Store current user
        localStorage.setItem('triptuner_user', JSON.stringify({
          name: user.name,
          email: user.email,
          dob: user.dob
        }));
        
        setSuccess('Login successful!');
        
        // Redirect after a brief delay
        setTimeout(() => {
          navigate('/triptuner');
        }, 1000);
      } else {
        // Signup process
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('triptuner_users') || '[]');
        
        if (users.some(user => user.email === formData.email)) {
          throw new Error('A user with this email already exists');
        }
        
        // Add new user
        const newUser = { ...formData };
        users.push(newUser);
        localStorage.setItem('triptuner_users', JSON.stringify(users));
        
        // Store current user
        localStorage.setItem('triptuner_user', JSON.stringify({
          name: formData.name,
          email: formData.email,
          dob: formData.dob
        }));
        
        // Show email confirmation popup
        setShowEmailModal(true);
        
        // Send welcome email (simulated)
        await sendWelcomeEmail(formData.name, formData.email);
        
        setSuccess('Account created successfully!');
        
        // Don't redirect yet - let user see email confirmation
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
  };
  
  const closeEmailModal = () => {
    setShowEmailModal(false);
    navigate('/triptuner');
  };

  return (
    <div className="login-page">
      <TripNavbar />
      <CircularMenu1 />
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p>{isLogin ? 'Sign in to continue to TripTuner' : 'Sign up to start planning your journey'}</p>
          </div>
          
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <small>We use this to find compatible travel guides</small>
              </div>
            )}
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="auth-switch">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button" 
                onClick={toggleAuthMode} 
                className="switch-button"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
          
          <div className="navigation-options">
            <Link to="/triptuner" className="back-to-home">
              Back to TripTuner Home
            </Link>
          </div>
        </div>
        
        <div className="login-image">
          <div className="image-overlay"></div>
          <div className="image-content">
            <h2>Discover India's Treasures</h2>
            <p>Personalized travel experiences to spiritual destinations, historic sites, and cultural landmarks</p>
          </div>
        </div>
      </div>
      
      {/* Email Confirmation Modal */}
      {showEmailModal && (
        <div className="email-modal-overlay">
          <div className="email-modal">
            <button className="close-modal" onClick={closeEmailModal}>×</button>
            <div className="email-modal-content">
              <div className="email-icon">
                <i className="fa fa-envelope-open"></i>
              </div>
              <h3>Welcome to TripTuner!</h3>
              <p>We've sent a welcome email to <strong>{formData.email}</strong></p>
              <p>Check your inbox to confirm your account and get started with planning your journey.</p>
              <button className="continue-button" onClick={closeEmailModal}>
                Continue to TripTuner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login; 