// import { useState } from 'react'
// import './App.css'
// import { Routes, Route, Navigate, Outlet } from "react-router-dom"; 
// import Map from './pages/Map'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <Routes>
//       <Route path='/map' element={<Map />} />
//     </Routes>
//   )
// }

// export default App
// import React, { useState } from 'react';
// import { Sidebar } from './pages/Sidebar';
// import { Map } from './pages/Map';
// import { heritageData } from './data/heritageData';
// import { MapPin } from 'lucide-react';

// function App() {
//   const [selectedSite, setSelectedSite] = useState(null);

//   const handleSiteSelect = (site, state) => {
//     setSelectedSite({ site, state });
//   };

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <header className="bg-orange-600 text-white shadow-lg">
//         <div className="container mx-auto px-6 py-4">
//           <h1 className="text-2xl font-bold flex items-center gap-3">
//             <MapPin className="w-8 h-8" />
//             India's Heritage Sites Map
//           </h1>
//         </div>
//       </header>

//       <div className="flex h-[calc(100vh-4rem)]">
//         <Sidebar heritageData={heritageData} onSiteSelect={handleSiteSelect} />
//         <div className="flex-1">
//           <Map selectedSite={selectedSite} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { Map } from './pages/Map';
import { Sidebar } from './pages/Sidebar';
import { heritageData } from './data/heritageData';
import { Compass } from 'lucide-react';

function App() {
  const [selectedSite, setSelectedSite] = useState(null);

  const handleSiteSelect = (site, state) => {
    setSelectedSite({ site, state });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Compass className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Indian Heritage Explorer</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex h-[calc(100vh-4rem)]">
        <Sidebar heritageData={heritageData} onSiteSelect={handleSiteSelect} />
        <div className="flex-1 relative">
          <Map selectedSite={selectedSite} />
          
          {/* Overlay Text */}
          {!selectedSite && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center p-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">
                  Explore India's Rich Heritage
                </h2>
                <p className="text-xl">
                  Select a heritage site from the sidebar to discover its location and learn more about its historical significance.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;