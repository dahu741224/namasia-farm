export type StoreTab = 'veggie' | 'mealkit' | 'fruit';

export interface Product {
  id: string;
  category: string;     // '蔬菜' | '水果' ...
  subCategory: string;  // '葉菜類' | '釋迦' ...
  name: string;
  isSeasonal: boolean;
  isVeg: boolean;
  canFreeze: boolean;
  price: number;
  note: string;
  weight: number;
  imageUrl?: string;
}

export interface MealKit {
  id: string;
  tag: string;
  portion: string;
  name: string;
  meat: string;
  veggie: string;
  sauce: string;
  time: string;
  steps: string;
  price: number;
}

export interface VeggieBox {
  id: string;
  name: string;
  price: number;
  retailPrice: number;
  items: string[];
  description: string;
  color: string;
}

export type CartItemType = 'product' | 'mealkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: CartItemType;
}
