import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function Sidebar({ heritageData, onSiteSelect }) {
  const [expandedStates, setExpandedStates] = useState({});

  const toggleState = (state) => {
    setExpandedStates(prev => ({
      ...prev,
      [state]: !prev[state]
    }));
  };

  return (
    <div className="w-80 bg-white shadow-lg overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Heritage Sites</h2>
        <div className="space-y-2">
          {Object.entries(heritageData).map(([state, sites]) => (
            <div key={state} className="border rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => toggleState(state)}
              >
                <span className="font-semibold text-gray-700">{state}</span>
                {expandedStates[state] ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedStates[state] && (
                <div className="border-t">
                  {sites.map((site) => (
                    <button
                      key={site.name}
                      className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                      onClick={() => onSiteSelect(site, state)}
                    >
                      <h3 className="font-medium text-gray-800">{site.name}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
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