import { authUser, isUserValid } from '@/lib/pocketbase';
import { create } from 'zustand';

export interface User {
  id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  created: string;
  updated: string;
  avatar: string;
  phone_number: string;
}

type Store = {
  user: User | null;
  setUser: (user: User | null) => void;
  isValid: boolean; // added isValid field
  setIsValid: (isValid: boolean) => void; // added setIsValid method
};

export const useStore = create<Store>((set) => ({
  user: authUser as User | null,
  setUser: (user) => set({ user }),
  isValid: isUserValid, // initialize isValid
  setIsValid: (isValid: boolean) => set({ isValid }), // initialize setIsValid
}));
