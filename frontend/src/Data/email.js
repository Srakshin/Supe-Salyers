// Simulated email sender function for TripTuner

/**
 * Send a mock confirmation email for a trip booking
 * @param {Object} tripDetails - Details of the booked trip
 * @param {Object} userDetails - User information
 * @param {Object} brokerDetails - Assigned broker information
 * @returns {Promise<boolean>} - Whether the email was sent successfully
 */
export const sendConfirmationEmail = async (tripDetails, userDetails, brokerDetails) => {
  // In a real app, this would connect to an email service
  console.log("📧 SENDING CONFIRMATION EMAIL");
  console.log("===========================");
  console.log(`To: ${userDetails.email}`);
  console.log(`Subject: Your Trip to ${tripDetails.destination} is Confirmed!`);
  console.log("----------------------------");
  console.log(`Dear ${userDetails.name},`);
  console.log(`\nThank you for booking your trip to ${tripDetails.destination} with TripTuner!`);
  console.log("\nTrip Details:");
  console.log(`- Destination: ${tripDetails.destination}`);
  console.log(`- Travel Class: ${tripDetails.travelClass}`);
  console.log(`- Dates: ${tripDetails.startDate} to ${tripDetails.endDate}`);
  console.log(`- Car: ${tripDetails.car}`);
  console.log(`- Room: ${tripDetails.room}`);
  console.log(`- Total Price: ₹${tripDetails.totalPrice.toLocaleString()}`);
  console.log("\nYour Broker:");
  console.log(`- Name: ${brokerDetails.name}`);
  console.log(`- Contact: ${brokerDetails.contact}`);
  console.log(`\nYour broker will contact you soon with more information.`);
  console.log("\nHappy travels!\nThe TripTuner Team");
  console.log("===========================");

  // Simulate network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

/**
 * Send a welcome email to newly registered users
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @returns {Promise<boolean>} - Whether the email was sent successfully
 */
export const sendWelcomeEmail = async (name, email) => {
  console.log("📧 SENDING WELCOME EMAIL");
  console.log("===========================");
  console.log(`To: ${email}`);
  console.log(`Subject: Welcome to TripTuner!`);
  console.log("----------------------------");
  console.log(`Dear ${name},`);
  console.log(`\nWelcome to TripTuner! We're excited to help you plan your next adventure.`);
  console.log(`\nWith TripTuner, you can create personalized trips to popular Indian destinations,`);
  console.log(`get matched with the perfect travel broker, and enjoy a hassle-free travel experience.`);
  console.log(`\nGet started by exploring our travel classes and customizing your perfect trip!`);
  console.log(`\nHappy travels!\nThe TripTuner Team`);
  console.log("===========================");

  // Simulate network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}; 