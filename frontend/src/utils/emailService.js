/**
 * Utility function to send confirmation emails to users after booking
 */

/**
 * Sends a confirmation email to the user after successful booking
 * @param {Object} userData - The user data object containing email and name
 * @param {Object} tripDetails - The trip details object
 * @param {Object} brokerDetails - The broker details object
 * @param {String} bookingId - The booking ID
 * @returns {Promise} - A promise that resolves when the email is sent
 */
export const sendConfirmationEmail = async (userData, tripDetails, brokerDetails, bookingId) => {
  // In a real application, this would be an API call to the backend
  // which would then use a service like SendGrid, Mailgun, etc.
  // For this prototype, we'll simulate the API call with a timeout
  
  return new Promise((resolve, reject) => {
    try {
      // Simulate network delay
      setTimeout(() => {
        console.log('Confirmation email sent to:', userData.email);
        console.log('Email contains:', {
          bookingId,
          tripDestination: tripDetails.destination,
          tripDates: `${tripDetails.startDate} to ${tripDetails.endDate}`,
          brokerName: brokerDetails.name,
          brokerContact: brokerDetails.email
        });
        
        // In a real app, we would track whether the email was sent successfully
        // For now, we'll just resolve the promise
        resolve({
          success: true,
          message: `Confirmation email sent to ${userData.email}`
        });
      }, 1500);
    } catch (error) {
      reject({
        success: false,
        message: 'Failed to send confirmation email',
        error: error.message
      });
    }
  });
};

/**
 * Formats a booking ID with a prefix and leading zeros
 * @param {Number} id - The numeric ID to format
 * @returns {String} - The formatted booking ID
 */
export const formatBookingId = (id) => {
  return `STS-${String(id).padStart(6, '0')}`;
}; 