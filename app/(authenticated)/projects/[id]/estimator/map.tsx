'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    }
  ]
};

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmVyb3gtcWF0YWx5c3QiLCJhIjoiY203OHY5eDZ1MDBwbzJ2cHpyYXp0cHBsZCJ9.seF1Ay5Fm9gh3DS7Bp0F2g';

    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-77.032, 38.913], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });

      mapRef.current = map;

      map.on('load', () => {
        // Add a GeoJSON source
        map.addSource('my-geojson', {
          type: 'geojson',
          data: JSON.parse(JSON.stringify(geojson))
        });
      
        // Add a new layer using the GeoJSON source
        map.addLayer({
          id: 'geojson-layer',
          type: 'circle',
          source: 'my-geojson',
          paint: {
            'circle-radius': 6,
            'circle-color': '#B42222'
          }
        });
      });
    }
  }, []);

  return (
    <div
      style={{ height: '500px', width: '100%' }}
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default MapboxExample;

/*
const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    }
  ]
};

map.on('load', () => {
  // Add a GeoJSON source
  map.addSource('my-geojson', {
    type: 'geojson',
    data: geojson
  });

  // Add a new layer using the GeoJSON source
  map.addLayer({
    id: 'geojson-layer',
    type: 'circle',
    source: 'my-geojson',
    paint: {
      'circle-radius': 6,
      'circle-color': '#B42222'
    }
  });
});
*/