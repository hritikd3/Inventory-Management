export interface Room {
  id: string;
  name: string;
  type: string;
  count: number;
  items: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  items: InventoryItem[];
}