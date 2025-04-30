import React, { useState, useEffect } from 'react';
import { Map } from '../pages/Map.jsx';
import { heritageData } from "../data/heritageData.js";
import { MapPin, Search, Menu, X } from 'lucide-react';

function MapPage() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [allMarkers, setAllMarkers] = useState([]);

  useEffect(() => {
    // Prepare all markers on initial load
    const markers = heritageData.map(site => ({
      site,
      state: site.STATE,
    }));
    setAllMarkers(markers);
  }, []);

  const states = [...new Set(heritageData.map(site => site.STATE).filter(state => typeof state === 'string'))];


  const filteredStates = states.filter(state =>
    typeof state === 'string' && state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
          </div>
        </div>
      </header>

      <div className="flex">
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
                    {heritageData
                      .filter(site => site.STATE === state)
                      .map(site => (
                        <button
                          key={site.SL_NO}
                          onClick={() => setSelectedSite({
                            site,
                            state,
                            lat: site.LATITUDE,
                            lng: site.LONGITUDE
                          })}
                          className="w-full p-3 flex items-start space-x-4 rounded-lg hover:bg-amber-50 transition-colors duration-200"
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={site.IMAGE}
                              alt={site.MONUMENT}
                              onError={(e) => { e.target.src = '/images/fallback.jpg'; }}
                              className="h-16 w-16 rounded-md object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4 text-amber-600" />
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {site.MONUMENT}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {site.DESCRIPTION || 'No description available.'}
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

