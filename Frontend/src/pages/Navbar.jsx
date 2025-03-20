import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './home.css';

const Navbar = () => {
    return(
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-8">
          {/* Logo - Stays on the Left */}
          <a href="/" className="flex items-center gap-10 text-gray-800">
            <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">HC</span>
            </div>
            <span className="text-xl font-semibold">HeritageConnect</span>
          </a>
          
          {/* Navigation - Moves to Right */}
          <nav className="hidden md:flex items-center gap-6 ml-auto">
            <a href="/" className="text-gray-800 hover:text-amber-700 transition">Home</a>
            <a href="/events" className="text-gray-800 hover:text-amber-700 transition">Cultural Events</a>
            <a href="/heritage-map" className="text-gray-800 hover:text-amber-700 transition">Heritage</a>
            <a href="/gallery" className="text-gray-800 hover:text-amber-700 transition">Gallery</a>
            <a href="/about" className="text-gray-800 hover:text-amber-700 transition">About</a>
          </nav>
          
          {/* Join Button */}
          <a href="/join" className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-full transition ml-6">
            Join Now
          </a>
        </div>
      </header>
    );
};

export default Navbar;