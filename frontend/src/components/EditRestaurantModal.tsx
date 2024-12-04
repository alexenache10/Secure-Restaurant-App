import React, { useState } from "react";

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
  restaurant: Restaurant;
  onClose: () => void;
  onSave: (updatedRestaurant: Restaurant) => void;
}

const EditRestaurantModal: React.FC<Props> = ({ restaurant, onClose, onSave }) => {
  const [updatedRestaurant, setUpdatedRestaurant] = useState(restaurant);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedRestaurant({ ...updatedRestaurant, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedRestaurant);
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="z-10 w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Restaurant</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Restaurant Name:
            </label>
            <input
              type="text"
              name="restaurantName"
              value={updatedRestaurant.restaurantName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              User Email:
            </label>
            <input
              type="text"
              name="userEmail"
              value={updatedRestaurant.userEmail}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Delivery price:
            </label>
            <input
              type="text"
              name="deliveryPrice"
              value={updatedRestaurant.deliveryPrice/100}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
             Country:
            </label>
            <input
              type="text"
              name="country"
              value={updatedRestaurant.country}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
             City:
            </label>
            <input
              type="text"
              name="city"
              value={updatedRestaurant.city}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
             Cuisines:
            </label>
            <input
              type="text"
              name="cuisines"
              value={updatedRestaurant.cuisines}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRestaurantModal;