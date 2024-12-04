export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  money: string;
  country: string;

};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};


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