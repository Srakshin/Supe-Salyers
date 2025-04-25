import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Translator from "./pages/Translator";
// import FloatingChat from "./components/FloatingChat";
import StreetView from "./pages/StreetView"; 


// STATES

// import { Ecommerce } from "./pages/Ecommerce";
// import CulturePage from "./pages/Culture";
import { OutroTransition } from "./components/Transition";
import { TradePage } from "./pages/TradePage";

// import NavB from "./components/NavB";

import AOS from 'aos';
import 'aos/dist/aos.css';

import Itinerary from "./pages/Itinerary"; 

const App = () => {
  useEffect(() => {
    // Initialize AOS with performance optimizations
    AOS.init({
      // Global settings
      disable: false, // Accepts 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // Name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // Class applied after initialization
      animatedClassName: 'aos-animate', // Class applied on animation
      useClassNames: false, // If true, will add content of `data-aos` as classes on scroll
      
      // Settings that can improve performance
      disableMutationObserver: false, // Disables automatic mutations' detections
      debounceDelay: 50, // The delay on debounce in milliseconds
      throttleDelay: 99, // The delay on throttle in milliseconds
      
      // Animation settings
      offset: 120, // Offset (in px) from the original trigger point
      delay: 0, // Delay animation (values from 0 to 3000, with step 50ms)
      duration: 750, // Duration of animation (values from 0 to 3000, with step 50ms)
      easing: 'ease', // Default easing for AOS animations
      once: true, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // Defines which position of the element regarding to window should trigger the animation
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/trans" element={<OutroTransition />} />

      <Route exact path="/" index element={<Home />} />
      {/* <Route path="/trade" element={<Ecommerce />} /> */}
      <Route path="/trade" element={<TradePage />} />
      {/* <Route path="/trade/more" element={<TradePage2 />} /> */}
      <Route path="/itinerary" element={<Itinerary />} /> 
      {/* text to speech */}
      <Route path="/translate" element={<Translator/>} />
    
      <Route path="/streetview" element={<StreetView />} />
    </Routes>
  );
};

export default App;
