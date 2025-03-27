'use client';

import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues with mapbox
const GlobeView = dynamic(() => import('./map'), { 
  ssr: false,
  loading: () => (
    <div className="flex-1 w-full h-full bg-gray-900 animate-pulse flex items-center justify-center">
      <div className="text-white/50">Loading globe...</div>
    </div>
  )
});

export default function MapClientComponent() {
  return <GlobeView />;
}