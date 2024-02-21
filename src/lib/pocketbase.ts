import Pocketbase, { RecordModel } from 'pocketbase';

export const pb = new Pocketbase(import.meta.env.VITE_POCKETBASE_URL);
export const authUser = pb.authStore.model;
export const isValid = pb.authStore.isValid;

export async function createUser(userData: FormData) {
  try {
    return await pb.collection('users').create(userData);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function loginUser(userData: { email: string; password: string }) {
  try {
    return await pb.collection('users').authWithPassword(userData.email, userData.password);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllSneakers(page: number = 1, perPage: number = 50) {
  try {
    return await pb.collection('sneakers').getList(page, perPage, {
      expand: 'brand,category',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSneakerByID(id: string): Promise<RecordModel> {
  try {
    return await pb.collection('sneakers').getOne(id, {
      expand: 'brand,category',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getLastSneakers() {
  try {
    return await pb.collection('sneakers').getFullList(6, {
      sort: '-created',
      expand: 'brand,category',
      fields: 'title,price,field,collectionName,id,type,brand(name),category(name)',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getBrands() {
  try {
    return await pb.collection('brands').getFullList();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllFavourites(): Promise<RecordModel[]> {
  try {
    return await pb.collection('favourites').getFullList({
      expand: 'sneaker',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addToFavouritesCollection(id: string) {
  try {
    if (pb.authStore.model && !pb.authStore.model.id) {
      throw new Error('Ошибка');
    }

    return await pb.collection('favourites').create(
      {
        customer: pb.authStore.model?.id,
        sneaker: id,
      },
      { expand: 'sneaker' },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFromFavouritesCollection(id: string) {
  try {
    return await pb.collection('favourites').delete(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

pb.autoCancellation(false);
