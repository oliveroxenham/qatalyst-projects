import { NextResponse } from 'next/server';
import type { Project } from '@/app/types/project';

const mockProjects:Project[] = [
  {
    id: 1,
    imgUrl: 'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img1-cR4Tlqih35QOMhPnC8AIH1BYoqRqPC.png',
    title: 'Forest Conservation Project',
    country: 'US',
    countryName: 'United States',
    lastUpdated: 'Jan 4, 2022',
    tags: [
      { value: 'Verra', type: 'VERRA' },
      { value: '1650', type: 'VERRA' },
      { value: '15.3m tCO2e', type: 'MANUAL' },
      { value: 'Nature-based', type: 'MANUAL' },
      { value: 'Verified', type: 'MANUAL' },
    ],
    owner: 'Kopal Agarwal',
  },
  {
    id: 2,
    imgUrl: 'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/img2-Pesg4thDgdnsXKVZ2eMbgqK6e5jckg.png',
    title: 'Renewable Energy Initiative',
    country: 'CA',
    countryName: 'Canada',
    lastUpdated: 'Mar 12, 2023',
    tags: [
      { value: 'Verra', type: 'VERRA' },
      { value: '1200', type: 'VERRA' },
      { value: '8.2m tCO2e', type: 'MANUAL' },
      { value: 'Energy', type: 'MANUAL' },
      { value: 'Verified', type: 'MANUAL' },
    ],
    owner: 'John Smith',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  return delay(2000).then(() => NextResponse.json(mockProjects));
}
