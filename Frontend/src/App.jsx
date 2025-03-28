import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './pages/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import MapPage from './pages/MapPage';
import Chatbot from './pages/Chatbot.jsx';
import Food from "./pages/Food";
import Festival from "./pages/Festival";

const NavbarLayout = ({ children }) => {   
  return (     
    <>       
      <Navbar /> 
      {children}         
    </>   
  ); 
}; 

function App() {
  const location = useLocation();

  // Define the routes where the Navbar should not be displayed
  const noNavbarRoutes = ['/login', '/signup'];

  // Check if the current route is in the noNavbarRoutes array
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/heritage-map" element={<MapPage />} />
        <Route path="/Chatbot" element={<Chatbot />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/food" element={<Food />} />
        <Route path="/festival" element={<Festival />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;