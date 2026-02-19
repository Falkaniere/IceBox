export type FridgeLocation = 'FRIDGE' | 'FREEZER';

export type ExpirationStatus = 'OK' | 'WARNING' | 'EXPIRED';

// THIS INTERFACE IS DEPRECATED FOR NOW
// export interface FridgeItem {
//   id: string;
//   barcode?: string;
//   name: string;
//   brand?: string;
//   quantity?: string;

//   location: FridgeLocation;

//   expirationDate: string;
//   createdAt: string;
// }

export type ProductCategory =
  | 'fruit'
  | 'vegetable'
  | 'dairy'
  | 'meat'
  | 'drink'
  | 'snack'
  | 'frozen'
  | 'other';

export type FridgeItem = {
  id: string;
  name: string;
  qty: number;
  expiresAt: string; // ISO string
  category: ProductCategory;

  expirationStatus?: ExpirationStatus;

  createdAt: string;
};
