'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { Button } from '@/components/qbutton';
import { useParams } from 'next/navigation';
import * as toGeoJSON from '@mapbox/togeojson';
// Remove xmldom import as we'll use the browser's native DOMParser
import { MapOverlay } from './map-overlay';

import 'mapbox-gl/dist/mapbox-gl.css';

// Define GeoJSON types
type GeoJSONCoordinate = number[];
type GeoJSONPolygonCoordinate = GeoJSONCoordinate[][];
type GeoJSONPointCoordinate = GeoJSONCoordinate;

interface GeoJSONGeometry {
  type: 'Point' | 'Polygon' | 'LineString' | 'MultiPoint' | 'MultiPolygon' | 'MultiLineString' | 'GeometryCollection';
}

interface GeoJSONPointGeometry extends GeoJSONGeometry {
  type: 'Point';
  coordinates: GeoJSONPointCoordinate;
}

interface GeoJSONPolygonGeometry extends GeoJSONGeometry {
  type: 'Polygon';
  coordinates: GeoJSONPolygonCoordinate;
}

interface GeoJSONFeature {
  type: 'Feature';
  geometry: GeoJSONPointGeometry | GeoJSONPolygonGeometry;
  properties: Record<string, string | number | boolean | null>;
}

interface GeoJSONCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

const MapboxExample = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isKmlLoaded, setIsKmlLoaded] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const params = useParams();
  
  // KML URL for project 1650
  const kmlUrl = 'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/Seima%20REDD%20Project%20Area%20latest-nLaIGd2fch4221gqGVINlHZasRfHJA.kml';
  
  // Function to load and process KML
  const loadProjectKml = useCallback(async () => {
    if (!mapRef.current) return;
    
    try {
      // Stop the globe spinning animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      // Fetch the KML file
      const response = await fetch(kmlUrl);
      if (!response.ok) throw new Error('Failed to load KML');
      
      const kmlText = await response.text();
      
      // Parse KML to GeoJSON - Handle parsing issue
      let geoJson: GeoJSONCollection;
      
      try {
        // In the browser, we should use the browser's DOMParser
        const parser = new DOMParser();
        const kmlDom = parser.parseFromString(kmlText, 'application/xml');
        
        // Check for parsing errors
        const parserError = kmlDom.getElementsByTagName('parsererror');
        if (parserError.length) {
          throw new Error('XML parsing error');
        }
        
        geoJson = toGeoJSON.kml(kmlDom) as GeoJSONCollection;
      } catch (parseError) {
        console.error('XML parsing error:', parseError);
        
        // Alternative approach - manually create a basic GeoJSON
        // This is a fallback in case the XML parsing fails
        geoJson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [106.200, 12.850],
                    [106.200, 12.950],
                    [106.300, 12.950],
                    [106.300, 12.850],
                    [106.200, 12.850]
                  ]
                ]
              },
              properties: {
                name: 'Sample KML area (fallback)',
                description: 'This is a fallback polygon since KML parsing failed'
              }
            }
          ]
        } as GeoJSONCollection;
      }
      
      const map = mapRef.current;
      
      // Make sure map is defined
      if (!map) {
        console.error('Map not initialized');
        return;
      }
      
      // Add the KML as a new source if it doesn't exist yet
      if (!map.getSource('kml-source')) {
        map.addSource('kml-source', {
          type: 'geojson',
          data: geoJson
        });
        
        // Add a fill layer for polygons
        map.addLayer({
          id: 'kml-polygons',
          type: 'fill',
          source: 'kml-source',
          paint: {
            'fill-color': '#00FF00',
            'fill-opacity': 0.4
          },
          filter: ['==', '$type', 'Polygon']
        });
        
        // Add an outline layer
        map.addLayer({
          id: 'kml-outlines',
          type: 'line',
          source: 'kml-source',
          paint: {
            'line-color': '#000',
            'line-width': 2
          }
        });
        
        // Add points layer if any exist in the KML
        map.addLayer({
          id: 'kml-points',
          type: 'circle',
          source: 'kml-source',
          paint: {
            'circle-radius': 6,
            'circle-color': '#FF0000'
          },
          filter: ['==', '$type', 'Point']
        });
      } else {
        // Update existing source
        const source = map.getSource('kml-source') as mapboxgl.GeoJSONSource;
        source.setData(geoJson);
      }
      
      // Fit the map to the KML bounds
      const bounds = new mapboxgl.LngLatBounds();
      
      // Process GeoJSON features
      geoJson.features.forEach((feature: GeoJSONFeature) => {
        if (feature.geometry.type === 'Polygon') {
          // Get polygon coordinates
          const polygonCoords = feature.geometry.coordinates;
          if (polygonCoords.length > 0) {
            // For each coordinate pair in the first (outer) ring
            polygonCoords[0].forEach((coord) => {
              if (coord.length >= 2) {
                // LngLat coordinates (longitude, latitude)
                bounds.extend([coord[0], coord[1]] as mapboxgl.LngLatLike);
              }
            });
          }
        } else if (feature.geometry.type === 'Point') {
          const pointCoords = feature.geometry.coordinates;
          if (pointCoords.length >= 2) {
            // LngLat coordinates (longitude, latitude)
            bounds.extend([pointCoords[0], pointCoords[1]] as mapboxgl.LngLatLike);
          }
        }
      });
      
      // Check if bounds are empty
      if (!bounds.isEmpty()) {
        // Change projection from globe to mercator for better viewing of specific areas
        map.setProjection('mercator');
        
        // Zoom to fit the KML data
        map.fitBounds(bounds, {
          padding: 50,
          maxZoom: 14
        });
      } else {
        console.warn('No valid bounds found in KML data');
      }
      
      setIsKmlLoaded(true);
      
      // Open the overlay when KML is loaded
      setIsOverlayOpen(true);
    } catch (error) {
      console.error('Error loading KML:', error);
    }
  }, [kmlUrl]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmVyb3gtcWF0YWx5c3QiLCJhIjoiY203OHY5eDZ1MDBwbzJ2cHpyYXp0cHBsZCJ9.seF1Ay5Fm9gh3DS7Bp0F2g';

    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/satellite-v9',  // Satellite view for a more realistic globe effect
        center: [0, 0],  // Center at [0,0] for a globe view
        zoom: 1.5,  // Zoomed out to see most of the globe
        projection: 'globe',  // Using globe projection instead of mercator
        attributionControl: false  // Hide attribution for cleaner look
      });

      // Add custom attribution in the bottom-right
      map.addControl(new mapboxgl.AttributionControl({
        compact: true
      }), 'bottom-right');

      mapRef.current = map;

      // Variable to track rotation
      let start: number | null = null;
      
      // Globe rotation animation
      function spinGlobe(timestamp: number): void {
        if (!start) start = timestamp;
        const elapsed = timestamp - (start || 0);
        
        // Rotate the globe camera around the equator at a slow, consistent pace
        map.setCenter([(elapsed / 100) % 360 - 180, 0]);
        
        // Continue the animation
        animationRef.current = requestAnimationFrame(spinGlobe);
      }

      map.on('load', () => {
        // Add atmosphere and star effects for globe
        map.setFog({
          'color': 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6
        });

        // Start the globe rotation automatically
        animationRef.current = requestAnimationFrame(spinGlobe);
      });

      // Allow users to stop/start rotation by clicking on the globe
      map.on('click', () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        } else {
          animationRef.current = requestAnimationFrame(spinGlobe);
        }
      });
    }
    
    return () => {
      // Cleanup animation on unmount
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Cleanup map on unmount
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col h-full">
      <div className="p-2 flex gap-2 flex-wrap">
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => {
            // Only load KML if project ID is 1650
            if (params?.id === '1650') {
              loadProjectKml();
            }
          }}
          disabled={isKmlLoaded} // Disable after loading
        >
          Load project KML
        </Button>
        <Button size="sm" variant="primary">Upload project KML</Button>
        <Button size="sm" variant="primary" disabled>Draw area</Button>
        
        {isKmlLoaded && (
          <Button 
            size="sm"
            variant="secondary" 
            onClick={() => setIsOverlayOpen(!isOverlayOpen)}
            className="ml-4"
          >
            {isOverlayOpen ? 'Hide Details' : 'Show Details'}
          </Button>
        )}
      </div>
      
      {/* Full-size map container */}
      <div
        className="w-full h-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm"
      >
        {/* Map container */}
        <div 
          ref={mapContainerRef} 
          className="w-full h-full bg-slate-900"
        />
      </div>
      
      {/* Instruction overlay - click to pause rotation */}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs pointer-events-none opacity-70 transition-opacity">
        Click to pause/resume rotation
      </div>
      
      {/* Project information overlay */}
      <MapOverlay 
        open={isOverlayOpen} 
        onOpenChange={setIsOverlayOpen} 
      />
    </div>
  );
};

export default MapboxExample;