import React from "react";
import { deleteRestaurantByUserEmail } from "../api/RestaurantApi"; // Importă funcția pentru ștergerea restaurantelor

interface Restaurant {
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  lastUpdated: Date;
  userEmail: string;
}

interface Props {
  restaurants: Restaurant[];
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>; // Funcția pentru actualizarea restaurantelor
}

const RestaurantTable: React.FC<Props> = ({ restaurants, setRestaurants }) => {


  // Funcție pentru ștergerea unui restaurant
  const handleDeleteRestaurant = async (email: string) => {
    if (window.confirm(`Are you sure you want to delete this restaurant?`)) {
      try {
        await deleteRestaurantByUserEmail(email); // Apel API pentru ștergere
        // Actualizează lista locală de restaurante după ștergere
        setRestaurants((prevRestaurants) =>
          prevRestaurants.filter((restaurant) => restaurant.userEmail !== email)
        );
      } catch (error) {
        console.error("Failed to delete restaurant:", error);
      }
    }
  };

  return (
    <div className="overflow-x-auto max-h-90">
      <table className="w-full table-auto bg-transparent">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-xs leading-normal">
            <th className="px-2 py-2">Restaurant Name</th>
            <th className="px-2 py-2">City</th>
            <th className="px-2 py-2">Country</th>
            <th className="px-2 py-2">Delivery Price</th>
            <th className="px-2 py-2">Estimated Delivery Time</th>
            <th className="px-2 py-2">Cuisines</th>
            <th className="px-2 py-2">Image URL</th>
            <th className="px-2 py-2">Last Updated</th>
            <th className="px-2 py-2">User Email</th>
            <th className="px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm font-medium">
          {restaurants.map((restaurant, index) => (
            <tr key={index}>
              <td className="px-2 py-2">{restaurant.restaurantName}</td>
              <td className="px-2 py-2">{restaurant.city}</td>
              <td className="px-2 py-2">{restaurant.country}</td>
              <td className="px-2 py-2">{restaurant.deliveryPrice / 100}</td>
              <td className="px-2 py-2">{restaurant.estimatedDeliveryTime} mins</td>
              <td className="px-2 py-2">{restaurant.cuisines.join(", ")}</td>
              <td className="px-2 py-2">
                <a href={restaurant.imageUrl} target="_blank" rel="noopener noreferrer">
                  {restaurant.imageUrl}
                </a>
              </td>
              <td className="px-2 py-2">{new Date(restaurant.lastUpdated).toLocaleDateString()}</td>
              <td className="px-2 py-2">{restaurant.userEmail}</td>
              <td className="px-2 py-2">
                <button onClick={() => handleDeleteRestaurant(restaurant.userEmail)} className="mr-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantTable;
