import { Order, Restaurant } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_BACKEND = 'http://172.30.82.238:7000'

const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
  };
};



export const useGetMyRestaurant = () => {
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {

    const userEmail = localStorage.getItem('userEmail');

    const response = await fetch(`${API_BACKEND}/api/my/restaurant?userEmail=${userEmail}`, {
      method: "GET",
      headers: getAuthHeaders(),
    }); 

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {


  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const userEmail = localStorage.getItem('userEmail');
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`${API_BACKEND}/api/my/restaurant?userEmail=${userEmail}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
    },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const token = localStorage.getItem("jwtToken");
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const userEmail = localStorage.getItem('userEmail');
  const response = await fetch(`${API_BACKEND}/api/my/restaurant?userEmail=${userEmail}`, {
    method: "PUT",
    body: restaurantFormData,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant Updated");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { updateRestaurant, isLoading };
};
export const useGetMyRestaurantOrders = () => {
  const userEmail = localStorage.getItem('userEmail');
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const response = await fetch(`${API_BACKEND}/api/my/restaurant/order?userEmail=${userEmail}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrder = () => {


  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {


    const response = await fetch(
      `${API_BACKEND}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};

