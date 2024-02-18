import Pocketbase from 'pocketbase';

export const pb = new Pocketbase(import.meta.env.VITE_POCKETBASE_URL);
export const isUserValid = pb.authStore.isValid;
export const authUser = pb.authStore.model;

export async function getAllSneakers(page: number = 1, perPage: number = 50) {
  return await pb.collection('sneakers').getList(page, perPage, {
    expand: 'brand,category',
  });
}

export async function getSneakerByID(id: string) {
  return await pb.collection('sneakers').getOne(id, {
    expand: 'brand,category',
  });
}

export async function getLastSneakers() {
  return await pb.collection('sneakers').getFullList(6, {
    sort: '-created',
    expand: 'brand,category',
    fields: 'title,price,field,collectionName,id,type,brand(name),category(name)',
  });
}

export async function getBrands() {
  return await pb.collection('brands').getFullList();
}

pb.autoCancellation(false);
