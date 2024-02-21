import { authUser, getAllFavourites, isValid } from '@/lib/pocketbase';
import { RecordModel } from 'pocketbase';
import { create } from 'zustand';

type authModel = typeof authUser;

type Store = {
  user?: authModel;
  isValid: boolean; // added isValid field
  favourites?: RecordModel[]; // added favourites field

  setUser: (user: RecordModel | undefined) => void;
  setIsValid: (isValid: boolean) => void; // added setIsValid method
  setFavourites: (favourites: RecordModel[]) => void;
  removeFromFavourites: (id: string) => void;
  addToFavourites: (favourite: RecordModel) => void;
};

export const useStore = create<Store>((set) => {
  // initialize favourites
  (async () => {
    const fetchedFavourites = (await getAllFavourites()) || [];
    set({ favourites: fetchedFavourites });
  })();

  return {
    user: authUser,
    isValid: isValid, // initialize isValid
    favourites: [], // initialize favourites

    setUser: (user) => set({ user }),
    setIsValid: (isValid: boolean) => set({ isValid }), // initialize setIsValid

    setFavourites: (favourites) => set({ favourites }),
    removeFromFavourites: (id) => {
      set((state) => ({
        favourites: (state.favourites || []).filter((favourite) => favourite.id !== id),
      }));
    },
    addToFavourites: (favourite) =>
      set((state) => ({ favourites: [...(state.favourites || []), favourite] })),
  };
});
