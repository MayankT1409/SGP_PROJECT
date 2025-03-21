import React, { useEffect, useRef } from 'react';

let isScriptLoaded = false;
let scriptPromise = null;

const loadGoogleMapsScript = () => {
  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    if (window.google) {
      resolve(window.google);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error('Google Maps API key is missing'));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.addEventListener('load', () => {
      isScriptLoaded = true;
      resolve(window.google);
    });

    script.addEventListener('error', () => {
      reject(new Error('Failed to load Google Maps API'));
    });

    document.head.appendChild(script);
  });

  return scriptPromise;
};

export function Map({ selectedSite, allMarkers }) {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);

  const handleMapError = (message = 'Unable to load the map') => {
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gray-100">
          <div class="text-center p-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Map Loading Error</h3>
            <p class="text-gray-600">${message}. Please check your configuration and try again.</p>
          </div>
        </div>
      `;
    }
  };

  const initializeMap = async () => {
    if (!mapRef.current) return;

    try {
      await loadGoogleMapsScript();

      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        zoom: 5,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ visibility: "on" }]
          },
          {
            featureType: "administrative.country",
            elementType: "labels.text.fill",
            stylers: [{ color: "#444444" }]
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }]
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }]
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#46bcec" }, { visibility: "on" }]
          }
        ]
      });

      infoWindowRef.current = new window.google.maps.InfoWindow();

      // Add markers for all sites
      if (allMarkers) {
        allMarkers.forEach(({ site, state }) => {
          const marker = new window.google.maps.Marker({
            position: site.location,
            map: googleMapRef.current,
            title: site.name,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#FF9933",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#FFFFFF"
            }
          });

          marker.addListener('click', () => {
            const content = `
              <div class="p-4 max-w-sm bg-white rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">${site.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${site.description}</p>
                <p class="text-xs text-gray-500">State: ${state}</p>
              </div>
            `;
            infoWindowRef.current.setContent(content);
            infoWindowRef.current.open(googleMapRef.current, marker);
            
            // Center and zoom to the clicked marker
            googleMapRef.current.setCenter(site.location);
            googleMapRef.current.setZoom(15);
          });

          markersRef.current.push(marker);
        });
      }
    } catch (error) {
      console.error('Error creating map:', error);
      handleMapError('Failed to create map');
    }
  };

  useEffect(() => {
    initializeMap();

    return () => {
      // Cleanup markers when component unmounts
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!selectedSite || !googleMapRef.current || !window.google) return;

    const { site } = selectedSite;
    
    // Center and zoom to the selected site
    googleMapRef.current.setCenter(site.location);
    googleMapRef.current.setZoom(15);

    // Find and trigger click on the corresponding marker
    const marker = markersRef.current.find(m => 
      m.getPosition().lat() === site.location.lat && 
      m.getPosition().lng() === site.location.lng
    );

    if (marker) {
      window.google.maps.event.trigger(marker, 'click');
    }
  }, [selectedSite]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="absolute inset-0" />
    </div>
  );
}