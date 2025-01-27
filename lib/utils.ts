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
}