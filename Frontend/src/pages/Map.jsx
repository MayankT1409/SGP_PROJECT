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
  
      const lat = parseFloat(site.LATITUDE);
      const lng = parseFloat(site.LONGITUDE);
      const location = { lat, lng };
  
      const marker = new window.google.maps.Marker({
        position: location,
        map: googleMapRef.current,
        title: site.MONUMENT,
      });
  
      // Mouseover: show photo + description + directions
      marker.addListener('mouseover', () => {
        const content = `
          <div style="max-width: 250px;">
            <img src="${site.IMAGE || '/images/fallback.jpg'}" alt="${site.MONUMENT}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 8px;" onerror="this.src='/images/fallback.jpg'" />
            <h3 style="margin: 0 0 4px; font-size: 16px;">${site.MONUMENT}</h3>
            <p style="margin: 0 0 6px; font-size: 13px;">${site.DESCRIPTION || 'No description available.'}</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" rel="noopener" style="color: #1a73e8; text-decoration: underline;">Get Directions</a>
          </div>
        `;
        infoWindowRef.current.setContent(content);
        infoWindowRef.current.setPosition(location);
        infoWindowRef.current.open(googleMapRef.current, marker);
      });
  
      // Optional: close InfoWindow on mouseout
      marker.addListener('mouseover', () => {
        const content = `
          <div style="max-width: 250px; font-family: Arial, sans-serif;">
            <img src="${site.IMAGE || '/images/fallback.jpg'}" alt="${site.MONUMENT}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 8px;" onerror="this.src='/images/fallback.jpg'" />
            <h3 style="margin: 0 0 4px; font-size: 16px; font-weight: bold;">${site.MONUMENT}</h3>
            <p style="margin: 0 0 6px; font-size: 13px; color: #555;">${site.DESCRIPTION || 'No description available.'}</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" rel="noopener"
              style="display: inline-flex; align-items: center; color: #1a73e8; font-size: 14px; text-decoration: none;">
            Get Directions
            </a>
          </div>
        `;
        infoWindowRef.current.setContent(content);
        infoWindowRef.current.open(googleMapRef.current, marker);
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

  useEffect(() => {
    if (!googleMapRef.current || !selectedSite) return;

    const { lat, lng, site } = selectedSite;

    const location = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };

    // Center the map and zoom in
    googleMapRef.current.setCenter(location);
    googleMapRef.current.setZoom(15);

    // Optional: show info window
    if (infoWindowRef.current) {
      infoWindowRef.current.setContent(`
        <div>
          <h3>${site.MONUMENT}</h3>
          <p>${site.STATE}</p>
        </div>
      `);
      infoWindowRef.current.setPosition(location);
      infoWindowRef.current.open(googleMapRef.current);
    }
  }, [selectedSite]);

  return <div ref={mapRef} className="relative w-full h-full" />;
}
