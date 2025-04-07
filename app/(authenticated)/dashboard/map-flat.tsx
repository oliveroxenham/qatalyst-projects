'use client';
import React, { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import mapboxgl from 'mapbox-gl';
import { useTheme } from 'next-themes';
import 'mapbox-gl/dist/mapbox-gl.css';

interface CountryMarker {
  name: string;
  coordinates: [number, number];
  color: string;
}

export interface MapboxMapRef {
  focusOnCountry: (country: string) => void;
}

const MapboxMap = forwardRef<MapboxMapRef, { countries?: CountryMarker[] }>(({ 
  countries = [] 
}, ref) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  // Function to focus on a country
  const focusOnCountry = useCallback((countryName: string) => {
    if (!mapRef.current) return;
    
    // Find the country by name
    const country = countries.find(c => c.name === countryName);
    if (!country) return;
    
    // Update selected country
    setSelectedCountry(countryName);
    
    // Fly to the country with a closer zoom level
    mapRef.current.flyTo({
      center: country.coordinates,
      zoom: 5, // Increased zoom for better focus on the country
      duration: 1500,
      essential: true
    });
    
    // Find the marker for this country and show its popup
    const markerIndex = countries.findIndex(c => c.name === countryName);
    if (markerIndex >= 0 && markersRef.current[markerIndex]) {
      const marker = markersRef.current[markerIndex];
      
      // Make the marker stand out
      const markerEl = marker.getElement();
      if (markerEl) {
        // Reset all markers to original size
        markersRef.current.forEach(m => {
          const el = m.getElement();
          if (el) {
            el.style.width = "15px";
            el.style.height = "15px";
            el.style.zIndex = "1";
          }
        });
        
        // Highlight the selected marker
        markerEl.style.width = "22px";
        markerEl.style.height = "22px";
        markerEl.style.zIndex = "10";
      }
      
      // Show the popup
      marker.getPopup().addTo(mapRef.current);
    }
  }, [countries]);

  // Effect to handle selectedCountry changes
  useEffect(() => {
    if (selectedCountry && mapRef.current) {
      focusOnCountry(selectedCountry);
    }
  }, [selectedCountry, focusOnCountry]);
  
  // Expose the focusOnCountry method using useImperativeHandle
  useImperativeHandle(ref, () => ({
    focusOnCountry: (countryName: string) => {
      // Directly call the focusOnCountry function
      focusOnCountry(countryName);
    }
  }), [focusOnCountry]);

  // Effect to update map style when theme changes
  useEffect(() => {
    if (mapRef.current) {
      const mapStyle = resolvedTheme === 'dark' 
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11';
      
      mapRef.current.setStyle(mapStyle);
    }
  }, [resolvedTheme]);

  useEffect(() => {
    // Initialize Mapbox
    mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmVyb3gtcWF0YWx5c3QiLCJhIjoiY203OHY5eDZ1MDBwbzJ2cHpyYXp0cHBsZCJ9.seF1Ay5Fm9gh3DS7Bp0F2g';

    if (mapContainerRef.current) {
      // Use light style for light theme, dark style for dark theme
      const mapStyle = resolvedTheme === 'dark' 
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11';
        
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: mapStyle,
        center: [0, 20], // Centered slightly north to better show populated areas
        zoom: 1.2,
        projection: 'mercator', // Use mercator projection for flat map
        attributionControl: false
      });

      map.addControl(new mapboxgl.AttributionControl({
        compact: true
      }), 'bottom-right');

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      mapRef.current = map;

      map.on('load', () => {

        // Add country markers once map is loaded
        countries.forEach(country => {
          // Create custom element for marker
          const markerElement = document.createElement('div');
          markerElement.className = 'mapbox-marker';
          markerElement.style.width = '15px';
          markerElement.style.height = '15px';
          markerElement.style.borderRadius = '50%';
          markerElement.style.backgroundColor = country.color;
          // Use dark border for light theme, light border for dark theme
          markerElement.style.border = resolvedTheme === 'dark' 
            ? '2px solid white' 
            : '2px solid rgba(0, 0, 0, 0.7)';
          markerElement.style.boxShadow = resolvedTheme === 'dark'
            ? '0 0 10px rgba(255, 255, 255, 0.3)'
            : '0 0 10px rgba(0, 0, 0, 0.3)';
          
          // Create popup for country name
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 20
          }).setText(country.name);
          
          // Create marker
          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat(country.coordinates)
            .setPopup(popup)
            .addTo(map);
          
          // Show popup on mouse enter
          markerElement.addEventListener('mouseenter', () => {
            marker.getPopup().addTo(map);
          });
          
          // Hide popup on mouse leave
          markerElement.addEventListener('mouseleave', () => {
            marker.getPopup().remove();
          });
          
          // Track markers for cleanup
          markersRef.current.push(marker);
        });
      });
    }
    
    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => {
        marker.remove();
      });
      
      // Cleanup map on unmount
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [countries]);

  return (
    <div className="relative flex flex-col h-full">
      {/* Map container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-lg overflow-hidden"
      />
    </div>
  );
});

// Add display name
MapboxMap.displayName = 'MapboxMap';

export default MapboxMap;