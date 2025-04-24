
import React, { useEffect, useRef } from 'react';

let isScriptLoaded = false;
let scriptPromise = null;

const loadGoogleMapsScript = () => {
  if (scriptPromise) return scriptPromise;

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
  const initialMarkerRef = useRef(null);

  const initializeMap = async () => {
    if (!mapRef.current) return;

    try {
      await loadGoogleMapsScript();

      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        zoom: 5,
      });

      // Add an initial red marker
      initialMarkerRef.current = new window.google.maps.Marker({
        position: { lat: 20.5937, lng: 78.9629 },
        map: googleMapRef.current,
        title: 'Initial Marker',
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
      });

      infoWindowRef.current = new window.google.maps.InfoWindow();
      updateMarkers();
    } catch (error) {
      console.error('Error creating map:', error);
    }
  };

  const updateMarkers = () => {
    if (!googleMapRef.current || !allMarkers) return;

    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    allMarkers.forEach(({ site }) => {
      if (!site.LATITUDE || !site.LONGITUDE) return;
      const location = { lat: site.LATITUDE, lng: site.LONGITUDE };

      const marker = new window.google.maps.Marker({
        position: location,
        map: googleMapRef.current,
        title: site.MONUMENT,
      });

      marker.addListener('click', () => {
        googleMapRef.current.setCenter(location);
        googleMapRef.current.setZoom(15);
      });

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    updateMarkers();
  }, [allMarkers]);

  return <div ref={mapRef} className="relative w-full h-full" />;
}
