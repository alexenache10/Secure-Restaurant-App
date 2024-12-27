import React, { useState } from "react";
import { deleteRestaurantByUserEmail } from "../api/RestaurantApi"; // Importă funcția pentru ștergerea restaurantelor
import EditRestaurantModal from "./EditRestaurantModal"; // Importă modalul de editare
import { toast } from "sonner";
import {useUpdateRestaurant} from "../api/RestaurantApi";
import { Restaurant } from '../types'; // Importă tipul Restaurant din fișierul types.ts

interface Props {
  restaurants: Restaurant[];
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
}

const RestaurantTable: React.FC<Props> = ({ restaurants, setRestaurants }) => {
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null); // Stare pentru restaurantul de editat

  // Funcție pentru ștergerea unui restaurant
  const handleDeleteRestaurant = async (email: string) => {
    if (window.confirm(`Are you sure you want to delete this restaurant?`)) {
      try {
        await deleteRestaurantByUserEmail(email); // Apel API pentru ștergere
        setRestaurants((prevRestaurants) =>
          prevRestaurants.filter((restaurant) => restaurant.userEmail !== email)
        );
        toast.success('Successfully deleted restaurant!');
      } catch (error) {
        console.error("Failed to delete restaurant:", error);
        toast.error('Failed deleting restaurant!');
      }
    }
  };

  // Funcție pentru salvarea modificărilor
  const { updateRestaurant } = useUpdateRestaurant();

// În `handleUpdateRestaurant`, asigură-te că obiectul `updatedRestaurant` conține toate câmpurile așteptate
const handleUpdateRestaurant = (updatedRestaurant: Restaurant) => {
  if (!updatedRestaurant.userEmail) {
    toast.error("User email is required to update the restaurant.");
    return;
  }

  // Apelează funcția de actualizare, fără a folosi async/await sau then
  updateRestaurant({ updatedRestaurant, userEmail: updatedRestaurant.userEmail });

  // Actualizează lista de restaurante
  setRestaurants((prevRestaurants) =>
    prevRestaurants.map((restaurant) =>
      restaurant.userEmail === updatedRestaurant.userEmail
        ? updatedRestaurant // înlocuiește restaurantul cu cel actualizat
        : restaurant
    )
  );

  // Închide modalul de editare
  setEditingRestaurant(null);
  toast.success("Restaurant updated successfully!");
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
              <td className="px-2 py-2">{Number(restaurant.deliveryPrice).toFixed(2)}</td>
              <td className="px-2 py-2">{restaurant.estimatedDeliveryTime} mins</td>
              <td className="px-2 py-2">{restaurant.cuisines.join(", ")}</td>
              <td className="px-2 py-2">
                <a href={restaurant.imageUrl} target="_blank" rel="noopener noreferrer">
                  {restaurant.imageUrl}
                </a>
              </td>
              <td className="px-2 py-2">
                {new Date(restaurant.lastUpdated).toLocaleDateString()}
              </td>
              <td className="px-2 py-2">{restaurant.userEmail}</td>
              <td className="px-2 py-2">
                <button
                  onClick={() => setEditingRestaurant(restaurant)}
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRestaurant(restaurant.userEmail)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingRestaurant && (
        <EditRestaurantModal
          restaurant={editingRestaurant}
          onClose={() => setEditingRestaurant(null)}
          onSave={handleUpdateRestaurant}
        />
      )}
    </div>
  );
};

export default RestaurantTable;
