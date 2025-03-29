// import React, { useState, useEffect } from 'react';
// import { FiArrowRight } from 'react-icons/fi';
// import './home.css';

// const Navbar = () => {
//     return(
//         <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4">
//         <div className="max-w-screen-xl mx-auto flex justify-between items-center px-8">
//           {/* Logo - Stays on the Left */}
//           <a href="/" className="flex items-center gap-10 text-gray-800">
//             <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
//               <span className="text-white font-bold">HC</span>
//             </div>
//             <span className="text-xl font-semibold">HeritageConnect</span>
//           </a>

//           {/* Navigation - Moves to Right */}
//           <nav className="hidden md:flex items-center gap-6 ml-auto">
//             <a href="/" className="text-gray-800 hover:text-amber-700 transition">Home</a>
//             <a href="/events" className="text-gray-800 hover:text-amber-700 transition">Cultural Events</a>
//             <a href="/heritage-map" className="text-gray-800 hover:text-amber-700 transition">Heritage places</a>
//             <a href="/Chatbot" className="text-gray-800 hover:text-amber-700 transition">Chatbot</a>
//             <a href="/about" className="text-gray-800 hover:text-amber-700 transition">About</a>
//           </nav>

//           {/* Join Button */}
//           <a href="/signup" className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-full transition ml-6">
//             Join Now
//           </a>
//         </div>
//       </header>
//     );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate('/'); // Redirect to home
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-10 text-gray-800">
          <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">HC</span>
          </div>
          <span className="text-xl font-semibold">HeritageConnect</span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          <a href="/" className="text-gray-800 hover:text-amber-700 transition">Home</a>
          <a href="/heritage-map" className="text-gray-800 hover:text-amber-700 transition">Heritage places</a>
          <a href="/Chatbot" className="text-gray-800 hover:text-amber-700 transition">Chatbot</a>
        </nav>

        {/* User Authentication */}
        {user ? (
          <div className="relative">
            {/* <button 
              className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.name.charAt(0).toUpperCase()}
            </button> */}
            <button
              className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center ml-10"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.name.charAt(0).toUpperCase()}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => navigate('/profile')}
                >
                  <FiUser className="mr-2" /> Profile
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/signup" className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-full transition ml-6">
            Join Now
          </a>
        )}
      </div>
    </header>
  );
};

export default Navbar;
