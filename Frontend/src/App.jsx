import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './pages/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from "./pages/Login.jsx";
import Signup from './pages/Signup.jsx';
import MapPage from './pages/MapPage.jsx';
import Chatbot from './pages/Chatbot.jsx';
import Food from "./pages/Food.jsx";
import Festival from "./pages/Festival.jsx";
import Craft from './pages/Craft.jsx';
import Profile from './pages/Profile.jsx';

// NavbarLayout component is not being used, so we can remove it
function App() {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/signup'];
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {shouldShowNavbar && <Navbar />}
      <main className={shouldShowNavbar ? 'pt-16' : ''}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/heritage-map" element={<MapPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/food" element={<Food />} />
          <Route path="/festival" element={<Festival />} />
          <Route path="/crafts" element={<Craft />} />
        </Routes>
      </main>
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