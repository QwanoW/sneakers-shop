export interface Brand {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  photo: string;
  title: string;
  updated: string;
}

export interface Category {
  category: string;
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  updated: string;
}

export interface Sneaker {
  brand: string;
  category: string;
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  expand: {
    brand: Brand;
    category: Category;
  };
  field: string;
  gender: string;
  id: string;
  past_price: number;
  price: number;
  title: string;
  updated: string;
}
