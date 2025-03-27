import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const formatConfig = {
  maximumFractionDigits: 2,
};

const numberFormatter = new Intl.NumberFormat('en-US', formatConfig);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formattedNumberString = (n: number) => {
  return numberFormatter.format(n);
};

export const abbreviateNumber = (n: number) => {
  if (n >= 1000000) return formattedNumberString(n / 1000000) + 'M';
  if (n >= 1000) return formattedNumberString(n / 1000) + 'K';
  return formattedNumberString(n);
};

export const getInitialsFromName = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
};

/**
 * Enhanced fetch function with caching capabilities
 * @param url The URL to fetch from
 * @param options Standard fetch options plus cache configuration
 * @param responseType Type of response to expect ('json' or 'text')
 * @returns Promise with the fetched data
 */
export async function cachedFetch<T>(
  url: string | URL, 
  options: RequestInit & { 
    revalidate?: number, // Time in seconds to revalidate
    tags?: string[], // Cache tags for revalidation
    responseType?: 'json' | 'text' // Type of response expected
  } = {}
): Promise<T> {
  const { revalidate, tags, responseType = 'json', ...fetchOptions } = options;
  
  // Default cache settings
  const cacheOptions: RequestInit = {
    cache: 'force-cache',
    ...fetchOptions
  };
  
  // Add next.js specific cache options if provided
  if (revalidate || tags) {
    cacheOptions.next = {
      ...(revalidate ? { revalidate } : {}),
      ...(tags ? { tags } : {})
    };
  }

  const response = await fetch(url, cacheOptions);
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  
  // Parse the response based on the specified type
  if (responseType === 'text') {
    return response.text() as unknown as T;
  }
  
  return response.json();
}