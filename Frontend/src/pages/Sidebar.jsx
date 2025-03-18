import React, { useState } from 'react';
import { Landmark, ChevronDown, ChevronUp } from 'lucide-react';

export function Sidebar({ heritageData, onSiteSelect }) {
  const [expandedState, setExpandedState] = useState(null);

  return (
    <div className="w-80 bg-gray-900 text-white shadow-lg overflow-y-auto h-[calc(100vh-4rem)]">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Landmark className="w-6 h-6 text-orange-500" />
          Heritage Sites
        </h2>
        <div className="space-y-2">
          {Object.entries(heritageData).map(([state, sites]) => (
            <div key={state} className="rounded-lg overflow-hidden">
              <button
                className={`w-full text-left p-4 flex items-center justify-between transition-colors duration-200 ${
                  expandedState === state 
                    ? 'bg-orange-600' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => setExpandedState(expandedState === state ? null : state)}
              >
                <span className="font-medium">{state}</span>
                {expandedState === state ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedState === state && (
                <div className="bg-gray-800">
                  {sites.map((site) => (
                    <button
                      key={site.name}
                      className="w-full text-left p-4 hover:bg-gray-700 transition-colors duration-200 border-t border-gray-700"
                      onClick={() => onSiteSelect(site, state)}
                    >
                      <h3 className="font-medium text-orange-500">{site.name}</h3>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {site.description}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}