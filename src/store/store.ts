import {
  authUser,
  getAllFavourites,
  getCartItemsCollection,
  getDeliveryPoints,
  getOrdersCollection,
  getSneakersCategories,
  isValid,
} from '@/lib/pocketbase';
import { RecordModel } from 'pocketbase';
import { create } from 'zustand';

type authModel = typeof authUser;

type RecordModelWithItems = RecordModel & {
  items: RecordModel[];
};

type Store = {
  user?: authModel;
  isValid: boolean; // added isValid field
  favourites?: RecordModel[]; // added favourites field
  cartItems?: RecordModel[];
  deliveryPoints: RecordModel[];
  orders: RecordModelWithItems[];
  categories?: RecordModel[];

  setUser: (user: RecordModel | undefined) => void;
  setIsValid: (isValid: boolean) => void; // added setIsValid method

  setFavourites: (favourites: RecordModel[]) => void;
  removeFromFavourites: (id: string) => void;
  addToFavourites: (favourite: RecordModel) => void;

  setCartItems: (items: RecordModel[]) => void;
  removeFromCartItems: (id: string) => void;
  addToCartItems: (item: RecordModel) => void;
  clearCartItems: () => void;

  changeCartItemQuantity: (id: string, quantity: number) => void;

  addOrder: (order: RecordModel) => void;
};

export const useStore = create<Store>((set) => {
  // initialize favourites
  (async () => {
    const fetchedFavourites = (await getAllFavourites()) || [];
    set({ favourites: fetchedFavourites });
  })();

  // initialize cart_items
  (async () => {
    const fetchedCartItems = (await getCartItemsCollection()) || [];
    set({ cartItems: fetchedCartItems });
  })();

  // initialize delivery_points
  (async () => {
    const fetchedDeliveryPoints = (await getDeliveryPoints()) || [];
    set({ deliveryPoints: fetchedDeliveryPoints });
  })();

  // initialize orders
  (async () => {
    const fetchedOrders = ((await getOrdersCollection()) || []) as RecordModelWithItems[];
    set({ orders: fetchedOrders });
  })();

  // initialize categories
  (async () => {
    const fetchedCategories = (await getSneakersCategories()) || [];
    set({ categories: fetchedCategories });
  })();

  return {
    user: authUser,
    isValid: isValid, // initialize isValid
    favourites: [], // initialize favourites
    cartItems: [],
    deliveryPoints: [],
    orders: [],

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

    setCartItems: (items) => set({ cartItems: items }),
    removeFromCartItems: (id) => {
      set((state) => ({
        cartItems: (state.cartItems || []).filter((item) => item.id !== id),
      }));
    },
    addToCartItems: (item) => set((state) => ({ cartItems: [...(state.cartItems || []), item] })),
    clearCartItems: () => set({ cartItems: [] }),

    changeCartItemQuantity: (id, quantity) => {
      set((state) => ({
        cartItems: (state.cartItems || []).map((item) => {
          if (item.id === id) {
            return { ...item, quantity };
          }
          return item;
        }),
      }));
    },

    addOrder: (order) =>
      set((state) => ({ orders: [...state.orders, order as RecordModelWithItems] })),
  };
});

export function getCartItem(id: string) {
  return useStore.getState().cartItems?.find((f) => f.expand?.sneaker.id === id);
}

export function getDeliveryPoint(id: string) {
  return useStore.getState().deliveryPoints.find((f) => f.id === id);
}

export type { RecordModelWithItems };
