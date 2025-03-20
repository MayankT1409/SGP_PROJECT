import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';
import './index.css';
import Navbar from './pages/Navbar.jsx';
import Home from './pages/Home.jsx';
import MapPage from './pages/MapPage';

const NavbarLayout = ({ children }) => {   
  return (     
    <>       
      <Navbar /> 
      {children}         
    </>   
  ); 
}; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heritage-map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;