export type FridgeLocation = 'FRIDGE' | 'FREEZER';

export type ExpirationStatus = 'OK' | 'WARNING' | 'EXPIRED';

export interface FridgeItem {
  id: string;
  barcode?: string;
  name: string;
  brand?: string;
  quantity?: string;

  location: FridgeLocation;

  expirationDate: string;
  createdAt: string;
}
