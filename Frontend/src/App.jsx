// // import React from 'react';
// // import './App.css';
// // import './index.css';
// // import Navbar from './pages/Navbar.jsx';
// // import Home from './pages/Home.jsx';



// // function App() {
// //   return (
// //     <div>
// //       <Navbar />
// //       <Home />
// //     </div>
// //   );
// // }

// // export default App

// import React from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './pages/Navbar.jsx';
// import Home from './pages/Home.jsx';
// import Login from "./pages/Login";
// import Signup from './pages/Signup';

// function App() {
//   return (
//     <div>
//       {/* Navbar will be displayed on all pages */}
//       <Navbar />

//       <Routes>
//         {/* Redirect to Home if user visits the root URL */}
//         <Route path="/" element={<Navigate to="/home" />} />
        
//         {/* Home route */}
//         <Route path="/home" element={<Home />} />
        
//         {/* Login and Signup routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from "./pages/Login";
import Signup from './pages/Signup';

function App() {
  return (
    <Router> {/* Wrap everything inside BrowserRouter */}
      <div>
        {/* Navbar will be displayed on all pages */}
        <Navbar />

        <Routes>
          {/* Redirect to Home if user visits the root URL */}
          <Route path="/" element={<Navigate to="/home" />} />
          
          {/* Home route */}
          <Route path="/home" element={<Home />} />
          
          {/* Login and Signup routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
