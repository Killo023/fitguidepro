import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const kgToLbs = (kg: number) => parseFloat((kg * 2.20462).toFixed(1));
export const lbsToKg = (lbs: number) => parseFloat((lbs / 2.20462).toFixed(1));
export const cmToInches = (cm: number) => parseFloat((cm / 2.54).toFixed(1));
export const inchesToCm = (inches: number) => parseFloat((inches * 2.54).toFixed(1));

export const formatWeight = (kg: number, units: 'metric' | 'imperial') => {
    if (units === 'imperial') {
        return `${kgToLbs(kg)} lbs`;
    }
    return `${kg} kg`;
}
