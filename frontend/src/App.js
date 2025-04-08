import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IndiaMap from "./pages/IndiaMap";
// import FloatingChat from "./components/FloatingChat";


// STATES

// import { Ecommerce } from "./pages/Ecommerce";
// import CulturePage from "./pages/Culture";
import { OutroTransition } from "./components/Transition";
import { TradePage } from "./pages/NewEcommerce";
// import AddDataComponent from "./pages/AddData";

// import NavB from "./components/NavB";

import AOS from 'aos';
import 'aos/dist/aos.css';

import StatePage from "./pages/StatePage";
import { TradePage2 } from "./pages/EcommercePage2";
import Itinerary from "./pages/Itinerary"; 

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Routes>
      <Route path="/trans" element={<OutroTransition />} />

      <Route exact path="/" index element={<Home />} />
      <Route path="/india" element={<IndiaMap />} />
      {/* <Route path="/trade" element={<Ecommerce />} /> */}
      <Route path="/trade" element={<TradePage />} />
      <Route path="/trade/more" element={<TradePage2 />} />
      {/* <Route path="/addData" element={<AddDataComponent />} /> */}
      <Route path={"/state/:stateName"} element={<StatePage />} />
      <Route path="/itinerary" element={<Itinerary />} /> 
    </Routes>
  );
};

export default App;
