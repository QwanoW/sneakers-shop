import Pocketbase from 'pocketbase';

export const pb = new Pocketbase(import.meta.env.VITE_POCKETBASE_URL);
export const isUserValid = pb.authStore.isValid;
export const authUser = pb.authStore.model;

export async function getAllSneakers(page = 1, perPage = 50) {
  return await pb.collection('sneakers').getList(page, perPage, {
    expand: 'brand,category',
  });
}

export async function getSneakerByID(id: string) {
  return await pb.collection('sneakers').getOne(id, {
    expand: 'brand,category',
  });
}

pb.autoCancellation(false);
