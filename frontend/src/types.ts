export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  money: number;
  country: string;

};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export interface Restaurant {
  _id: string; // Adaugă această proprietate pentru a respecta structura de backend
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  lastUpdated: Date;
  userEmail: string;
  user: string; // Dacă este relevant pentru backend
  menuItems: any[]; // Asum că este un array de obiecte pentru meniuri
}

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    addressLine1: string;
    city: string;
  };
  totalAmount: number;
  createdAt: string;
  restaurantId: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};