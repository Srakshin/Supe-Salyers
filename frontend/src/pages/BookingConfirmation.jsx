import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, Paper, Grid, Divider, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Navbar from "../components/Navbar";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("confirmed"); // can be "confirmed", "pending", or "failed"

  useEffect(() => {
    // In a real app, you'd fetch booking details from the backend
    // For now, we'll use mock data or from location state
    
    const mockBookingDetails = location.state?.bookingDetails || {
      id: "BK" + Math.floor(Math.random() * 10000),
      date: new Date().toLocaleDateString(),
      time: "10:00 AM",
      location: "Tokyo, Japan",
      activity: "Tokyo Tower Admission",
      participants: 2,
      totalPrice: "$45.00",
      paymentMethod: "Credit Card",
      confirmationNumber: "TYO" + Math.floor(Math.random() * 100000)
    };
    
    setTimeout(() => {
      setBookingDetails(mockBookingDetails);
      setLoading(false);
    }, 1000);
  }, [location]);

  const getStatusDisplay = () => {
    switch(status) {
      case "confirmed":
        return {
          icon: <CheckCircleIcon sx={{ fontSize: 50, color: "success.main" }} />,
          text: "Booking Confirmed!",
          color: "success.main"
        };
      case "pending":
        return {
          icon: <AccessTimeIcon sx={{ fontSize: 50, color: "warning.main" }} />,
          text: "Booking Pending",
          color: "warning.main"
        };
      case "failed":
        return {
          icon: <ErrorIcon sx={{ fontSize: 50, color: "error.main" }} />,
          text: "Booking Failed",
          color: "error.main"
        };
      default:
        return {
          icon: <CheckCircleIcon sx={{ fontSize: 50, color: "success.main" }} />,
          text: "Booking Confirmed!",
          color: "success.main"
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  if (loading) {
    return (
      <>
        <Navbar />
        <Container sx={{ py: 4 }}>
          <Typography variant="h5" align="center">
            Loading booking details...
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            {statusDisplay.icon}
            <Typography variant="h4" color={statusDisplay.color} fontWeight="bold" mt={2}>
              {statusDisplay.text}
            </Typography>
            {status === "confirmed" && (
              <Typography variant="body1" mt={1} color="text.secondary">
                Your booking has been confirmed. Please check your email for details.
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Booking Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Confirmation Number</Typography>
                <Typography variant="body1" fontWeight="medium">{bookingDetails.confirmationNumber}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Booking ID</Typography>
                <Typography variant="body1">{bookingDetails.id}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Date</Typography>
                <Typography variant="body1">{bookingDetails.date}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Time</Typography>
                <Typography variant="body1">{bookingDetails.time}</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Activity Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Activity</Typography>
                <Typography variant="body1" fontWeight="medium">{bookingDetails.activity}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Location</Typography>
                <Typography variant="body1">{bookingDetails.location}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Participants</Typography>
                <Typography variant="body1">{bookingDetails.participants} people</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Payment Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Total Amount</Typography>
                <Typography variant="body1" fontWeight="bold">{bookingDetails.totalPrice}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Payment Method</Typography>
                <Typography variant="body1">{bookingDetails.paymentMethod}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Payment Status</Typography>
                <Chip 
                  label={status === "confirmed" ? "Paid" : status === "pending" ? "Pending" : "Failed"} 
                  color={status === "confirmed" ? "success" : status === "pending" ? "warning" : "error"}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/itinerary")}
            >
              View Itinerary
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default BookingConfirmation; 