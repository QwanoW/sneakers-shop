import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructImageURL(file_name: string, collectionID: string, recordID: string) {
  return (
    import.meta.env.VITE_POCKETBASE_URL +
    '/api/files/' +
    collectionID +
    '/' +
    recordID +
    '/' +
    file_name
  );
}
