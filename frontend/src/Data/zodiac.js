// Zodiac sign compatibility logic for TripTuner
const zodiacSigns = [
  { name: "Aries", compatibleWith: ["Leo", "Sagittarius", "Gemini", "Aquarius"] },
  { name: "Taurus", compatibleWith: ["Virgo", "Capricorn", "Cancer", "Pisces"] },
  { name: "Gemini", compatibleWith: ["Libra", "Aquarius", "Aries", "Leo"] },
  { name: "Cancer", compatibleWith: ["Scorpio", "Pisces", "Taurus", "Virgo"] },
  { name: "Leo", compatibleWith: ["Aries", "Sagittarius", "Gemini", "Libra"] },
  { name: "Virgo", compatibleWith: ["Taurus", "Capricorn", "Cancer", "Scorpio"] },
  { name: "Libra", compatibleWith: ["Gemini", "Aquarius", "Leo", "Sagittarius"] },
  { name: "Scorpio", compatibleWith: ["Cancer", "Pisces", "Virgo", "Capricorn"] },
  { name: "Sagittarius", compatibleWith: ["Aries", "Leo", "Libra", "Aquarius"] },
  { name: "Capricorn", compatibleWith: ["Taurus", "Virgo", "Scorpio", "Pisces"] },
  { name: "Aquarius", compatibleWith: ["Gemini", "Libra", "Aries", "Sagittarius"] },
  { name: "Pisces", compatibleWith: ["Cancer", "Scorpio", "Taurus", "Capricorn"] }
];

// Function to determine zodiac sign from DOB
const getZodiacSign = (day, month) => {
  // Convert month to numeric (1-12)
  const monthNum = typeof month === 'string' 
    ? new Date(Date.parse(`${month} 1, 2000`)).getMonth() + 1 
    : month;
  
  if ((monthNum === 3 && day >= 21) || (monthNum === 4 && day <= 19)) return "Aries";
  if ((monthNum === 4 && day >= 20) || (monthNum === 5 && day <= 20)) return "Taurus";
  if ((monthNum === 5 && day >= 21) || (monthNum === 6 && day <= 20)) return "Gemini";
  if ((monthNum === 6 && day >= 21) || (monthNum === 7 && day <= 22)) return "Cancer";
  if ((monthNum === 7 && day >= 23) || (monthNum === 8 && day <= 22)) return "Leo";
  if ((monthNum === 8 && day >= 23) || (monthNum === 9 && day <= 22)) return "Virgo";
  if ((monthNum === 9 && day >= 23) || (monthNum === 10 && day <= 22)) return "Libra";
  if ((monthNum === 10 && day >= 23) || (monthNum === 11 && day <= 21)) return "Scorpio";
  if ((monthNum === 11 && day >= 22) || (monthNum === 12 && day <= 21)) return "Sagittarius";
  if ((monthNum === 12 && day >= 22) || (monthNum === 1 && day <= 19)) return "Capricorn";
  if ((monthNum === 1 && day >= 20) || (monthNum === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
};

// Function to find compatible brokers based on zodiac sign
const findCompatibleBrokers = (userSign, brokers) => {
  const userZodiac = zodiacSigns.find(sign => sign.name === userSign);
  if (!userZodiac) return [];
  
  return brokers.filter(broker => 
    userZodiac.compatibleWith.includes(broker.zodiacSign)
  ).sort(() => 0.5 - Math.random()); // Randomize the order
};

export { getZodiacSign, findCompatibleBrokers, zodiacSigns }; 