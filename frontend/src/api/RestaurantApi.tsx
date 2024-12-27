import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useMutation, useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};

export const getAllRestaurants = async () => {
  const response = await fetch(`${API_BASE_URL}/api/restaurant/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch restaurants");
  }
  return await response.json();
};

export const deleteRestaurantByUserEmail = async (userEmail: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/restaurant/delete`, {
    method: "DELETE",  // Metoda DELETE
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userEmail }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete restaurant");
  }
};

export const useUpdateRestaurant = () => {
  const updateRestaurantRequest = async (
    updatedRestaurant: Restaurant, // Vom trimite restaurantul ca obiect JSON
    userEmail: string
  ): Promise<Restaurant> => {
    if (!userEmail) {
      throw new Error("User email is required to update the restaurant");
    }
    console.log(updatedRestaurant);  // Verificăm ce trimitem

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/update?userEmail=${userEmail}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Setăm Content-Type pentru JSON
        },
        body: JSON.stringify(updatedRestaurant), // Trimitem obiectul restaurant ca JSON
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
  } = useMutation(({ updatedRestaurant, userEmail }: { updatedRestaurant: Restaurant; userEmail: string }) =>
    updateRestaurantRequest(updatedRestaurant, userEmail)
  );

  return { updateRestaurant, isLoading };
};
