
export enum Category {
  VEGETABLE = '蔬菜',
  FRUIT = '水果',
  MEALKIT = '料理包'
}

export interface Product {
  id: string;
  category: string;
  subCategory: string;
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
  tag: string; // #一個人的精采, etc.
  portion: string; // 1人份, 2人份, etc.
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

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'product' | 'box' | 'mealkit';
}
