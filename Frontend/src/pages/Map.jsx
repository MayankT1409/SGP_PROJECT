import React, { useEffect, useRef } from 'react';

export function Map({ selectedSite }) {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);

  useEffect(() => {
    // Check if the script is already loaded
    if (window.google) {
      initializeMap();
      return;
    }

    // Load the Google Maps script
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB_vWkDJyotpm6KLLWistSEIrgorWaQuhc`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    
    // Initialize map after script loads
    googleMapScript.addEventListener('load', initializeMap);
    
    document.head.appendChild(googleMapScript);

    return () => {
      // Cleanup
      googleMapScript.removeEventListener('load', initializeMap);
      if (document.head.contains(googleMapScript)) {
        document.head.removeChild(googleMapScript);
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 },
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
  };

  useEffect(() => {
    if (selectedSite && googleMapRef.current && window.google) {
      const { site, state } = selectedSite;
      
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Create new marker
      const marker = new window.google.maps.Marker({
        position: site.location,
        map: googleMapRef.current,
        animation: window.google.maps.Animation.DROP,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#FF5722",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#FFFFFF"
        }
      });

      markersRef.current.push(marker);

      // Update map center and zoom
      googleMapRef.current.setCenter(site.location);
      googleMapRef.current.setZoom(15);

      // Show info window with enhanced styling
      const content = `
        <div style="padding: 16px; max-width: 300px;">
          <h3 style="margin: 0 0 8px; font-size: 18px; color: #1a1a1a; font-weight: 600;">
            ${site.name}
          </h3>
          <p style="margin: 0 0 8px; font-size: 14px; color: #666; line-height: 1.4;">
            ${site.description}
          </p>
          <p style="margin: 0; font-size: 12px; color: #888; font-weight: 500;">
            State: ${state}
          </p>
        </div>
      `;

      infoWindowRef.current.setContent(content);
      infoWindowRef.current.open(googleMapRef.current, marker);
    }
  }, [selectedSite]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="absolute inset-0" />
    </div>
  );
}