// import React, { useState, useEffect } from "react";
// import { Map } from "./map.jsx";
// import { Sidebar } from "./Sidebar.jsx"; // Corrected import path
// import { heritageData } from "../data/heritageData.js";
// import { Landmark } from "lucide-react";
// import { Link } from "react-router-dom";

// function MapPage() {
//   const [selectedSite, setSelectedSite] = useState(null);
//   const [allMarkers, setAllMarkers] = useState([]);

//   useEffect(() => {
//     // Prepare all markers on initial load
//     const markers = [];
//     Object.entries(heritageData).forEach(([state, sites]) => {
//       sites.forEach(site => {
//         markers.push({ site, state });
//       });
//     });
//     setAllMarkers(markers);
//   }, []);

//   const handleSiteSelect = (site, state) => {
//     setSelectedSite({ site, state });
//   };

//   return (
//     <div className="min-h-screen flex flex-col">

//       {/* Main Content */}
//       <main className="flex flex-1 h-[calc(100vh-4rem)]">
//         <Sidebar heritageData={heritageData} onSiteSelect={handleSiteSelect} />
//         <div className="flex-1 relative">
//           <Map selectedSite={selectedSite} allMarkers={allMarkers} />

//           {/* Overlay Text */}
//           {!selectedSite && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center p-8">
//               <div className="max-w-2xl">
//                 <h2 className="text-4xl font-bold mb-4">
//                   Locate top heritage sites in India!
//                 </h2>
//                 <p className="text-xl">
//                   This map depicts the top historical sites in India in terms of their geographical location.
//                   Click on any pointer to learn more about the place and to appreciate the diversity!
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default MapPage;


// 2:
// import React, { useState, useEffect} from 'react';
// import { MapPin, Search, Menu, X } from 'lucide-react';
// // import React, { useState, useEffect } from "react";
// import { Map } from "./map.jsx";
// import { heritageData } from "../data/heritageData.js";
// import { Landmark } from "lucide-react";
// import { Link } from "react-router-dom";

// function MapPage() {
//   const [selectedState, setSelectedState] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const filteredStates = Object.keys(heritageData).filter(state =>
//     state.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   useEffect(() => {
//     // Prepare all markers on initial load
//     const markers = [];
//     Object.entries(heritageData).forEach(([state, sites]) => {
//       sites.forEach(site => {
//         markers.push({ site, state });
//       });
//     });
//     setAllMarkers(markers);
//   }, []);

//   const handleSiteSelect = (site, state) => {
//         setSelectedSite({ site, state });
//       };
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-gray-900">Heritage Map</h1>
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
//             >
//               {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className={`${isSidebarOpen ? 'block' : 'hidden'} w-80 bg-white border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto`}>
//         <Sidebar heritageData={heritageData} onSiteSelect={handleSiteSelect} />
//           <div className="p-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search states..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//               />
//             </div>

//             <div className="mt-6 space-y-4">
//               {filteredStates.map(state => (
//                 <div key={state} className="space-y-2">
//                   <h3 className="font-semibold text-gray-900">{state}</h3>
//                   <div className="space-y-2">
//                     {heritageData[state].map(site => (
//                       <button
//                         key={site.name}
//                         onClick={() => setSelectedState(state)}
//                         className="w-full p-3 flex items-start space-x-4 rounded-lg hover:bg-amber-50 transition-colors duration-200"
//                       >
//                         <div className="flex-shrink-0">
//                           <img
//                             src={site.image}
//                             alt={site.name}
//                             className="h-16 w-16 rounded-md object-cover"
//                           />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center space-x-1">
//                             <MapPin className="h-4 w-4 text-amber-600" />
//                             <p className="text-sm font-medium text-gray-900 truncate">
//                               {site.name}
//                             </p>
//                           </div>
//                           <p className="mt-1 text-sm text-gray-500 line-clamp-2">
//                             {site.description}
//                           </p>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </aside>

//         {/* Map Container */}
//         <main className="flex-1 h-[calc(100vh-64px)] bg-gray-100 p-4">
//           <div className="h-full rounded-lg bg-white shadow-sm border border-gray-200 flex items-center justify-center">
//             <div className="text-center p-8">
//               <MapPin className="mx-auto h-12 w-12 text-amber-600" />
//               <h3 className="mt-4 text-lg font-medium text-gray-900">Interactive Map Coming Soon</h3>
//               <p className="mt-2 text-sm text-gray-500">
//                 Our interactive map feature is currently under development. Stay tuned for an immersive experience!
//               </p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default MapPage;


// 3
// import React, { useState } from 'react';
// import { MapPin, Search, Menu, X } from 'lucide-react';

// // Heritage data with locations and images
// const heritageData = {
//   'Uttar Pradesh': [
//     {
//       name: 'Taj Mahal',
//       location: { lat: 27.1751, lng: 78.0421 },
//       description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna.',
//       image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80'
//     },
//     {
//       name: 'Fatehpur Sikri',
//       location: { lat: 27.0940, lng: 77.6711 },
//       description: 'A city founded in the 16th century by a Mughal Emperor.',
//       image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80'
//     }
//   ],
//   'Rajasthan': [
//     {
//       name: 'Hawa Mahal',
//       location: { lat: 26.9239, lng: 75.8267 },
//       description: 'Palace of Winds, built from red and pink sandstone.',
//       image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80'
//     },
//     {
//       name: 'Amber Fort',
//       location: { lat: 26.9855, lng: 75.8513 },
//       description: 'Historic fortress built in the 16th century.',
//       image: 'https://images.unsplash.com/photo-1565018054866-968e244dd8a8?auto=format&fit=crop&q=80'
//     }
//   ],
//   'Karnataka': [
//     {
//       name: 'Hampi',
//       location: { lat: 15.3350, lng: 76.4600 },
//       description: 'Ancient ruins of the Vijayanagara Empire.',
//       image: 'https://images.unsplash.com/photo-1590050752117-2c9a54a2464b?auto=format&fit=crop&q=80'
//     }
//   ]
// };

// function MapPage() {
//   const [selectedState, setSelectedState] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const filteredStates = Object.keys(heritageData).filter(state =>
//     state.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-gray-900">Heritage Map</h1>
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
//             >
//               {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className={`${isSidebarOpen ? 'block' : 'hidden'} w-80 bg-white border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto`}>
//           <div className="p-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search states..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//               />
//             </div>

//             <div className="mt-6 space-y-4">
//               {filteredStates.map(state => (
//                 <div key={state} className="space-y-2">
//                   <h3 className="font-semibold text-gray-900">{state}</h3>
//                   <div className="space-y-2">
//                     {heritageData[state].map(site => (
//                       <button
//                         key={site.name}
//                         onClick={() => setSelectedState(state)}
//                         className="w-full p-3 flex items-start space-x-4 rounded-lg hover:bg-amber-50 transition-colors duration-200"
//                       >
//                         <div className="flex-shrink-0">
//                           <img
//                             src={site.image}
//                             alt={site.name}
//                             className="h-16 w-16 rounded-md object-cover"
//                           />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center space-x-1">
//                             <MapPin className="h-4 w-4 text-amber-600" />
//                             <p className="text-sm font-medium text-gray-900 truncate">
//                               {site.name}
//                             </p>
//                           </div>
//                           <p className="mt-1 text-sm text-gray-500 line-clamp-2">
//                             {site.description}
//                           </p>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </aside>

//         {/* Map Container */}
//         <main className="flex-1 h-[calc(100vh-64px)] bg-gray-100 p-4">
//           <div className="h-full rounded-lg bg-white shadow-sm border border-gray-200 flex items-center justify-center">
//             <div className="text-center p-8">
//               <MapPin className="mx-auto h-12 w-12 text-amber-600" />
//               <h3 className="mt-4 text-lg font-medium text-gray-900">Interactive Map Coming Soon</h3>
//               <p className="mt-2 text-sm text-gray-500">
//                 Our interactive map feature is currently under development. Stay tuned for an immersive experience!
//               </p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default MapPage;


// 4:
import React, { useState, useEffect } from 'react';
import { Map } from './map.jsx';
import { heritageData } from "../data/heritageData.js";
import { MapPin, Search, Menu, X } from 'lucide-react';



function MapPage() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [allMarkers, setAllMarkers] = useState([]);

  useEffect(() => {
    // Prepare all markers on initial load
    const markers = [];
    Object.entries(heritageData).forEach(([state, sites]) => {
      sites.forEach(site => {
        markers.push({ site, state });
      });
    });
    setAllMarkers(markers);
  }, []);

  const filteredStates = Object.keys(heritageData).filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Heritage Map</h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'block' : 'hidden'} w-80 bg-white border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto`}>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search states..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="mt-6 space-y-4">
              {filteredStates.map(state => (
                <div key={state} className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{state}</h3>
                  <div className="space-y-2">
                    {heritageData[state].map(site => (
                      <button
                        key={site.name}
                        onClick={() => setSelectedSite({ site, state })}
                        className="w-full p-3 flex items-start space-x-4 rounded-lg hover:bg-amber-50 transition-colors duration-200"
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={site.image}
                            alt={site.name}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4 text-amber-600" />
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {site.name}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {site.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Map Container */}
        <main className="flex-1 h-[calc(100vh-64px)] bg-gray-100 p-4">
          <div className="h-full rounded-lg bg-white shadow-sm border border-gray-200 overflow-hidden">
            <Map selectedSite={selectedSite} allMarkers={allMarkers} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MapPage;