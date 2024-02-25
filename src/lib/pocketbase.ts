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

export async function getCartItemsCollection(): Promise<RecordModel[]> {
  try {
    return await pb.collection('cart_items').getFullList({
      expand: 'sneaker',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addToCartItemsCollection(
  sneakerID: string,
  size: number,
  quantity: number = 1,
) {
  try {
    if (pb.authStore.model && !pb.authStore.model.id) {
      throw new Error('Ошибка');
    }

    return await pb.collection('cart_items').create(
      {
        customer: pb.authStore.model?.id,
        sneaker: sneakerID,
        quantity,
        size,
      },
      { expand: 'sneaker' },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFromCartItemsCollection(recordID: string) {
  try {
    if (pb.authStore.model && !pb.authStore.model.id) {
      throw new Error('Ошибка');
    }

    return await pb.collection('cart_items').delete(recordID);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateCartItemQuantity(recordID: string, quantity: number) {
  try {
    if (pb.authStore.model && !pb.authStore.model.id) {
      throw new Error('Ошибка');
    }

    return await pb.collection('cart_items').update(recordID, {
      quantity,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllFavourites(): Promise<RecordModel[]> {
  try {
    return await pb.collection('favourites').getFullList({
      expand: 'sneaker',
      sort: '-created',
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
    if (pb.authStore.model && !pb.authStore.model.id) {
      throw new Error('Ошибка');
    }

    return await pb.collection('favourites').delete(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOrdersCollection() {
  try {
    return await pb.collection('orders').getFullList({
      sort: '-created',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface OrderData {
  total_price: number;
  wishes: string;
  items: RecordModel[];
  delivery_point: string;
}

const defaultStatusValue = 'оплачен';

export async function createOrder(orderData: OrderData) {
  try {
    if (pb.authStore.model && !pb.authStore.model.id) {
      throw new Error('Ошибка');
    }

    return await pb
      .collection('orders')
      .create({ ...orderData, status: defaultStatusValue, customer: pb.authStore.model?.id });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getDeliveryPoints() {
  try {
    return await pb.collection('delivery_points').getFullList();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

pb.autoCancellation(false);
