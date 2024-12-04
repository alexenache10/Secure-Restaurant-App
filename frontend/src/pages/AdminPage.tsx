import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/MyUserApi';
import { getAllRestaurants } from '../api/RestaurantApi';
import UserTable from '../components/UserTable';
import RestaurantTable from '../components/RestaurantTable';
import backgroundImage from '../assets/admin.png'; // Asigură-te că calea este corectă

// Definirea tipului Restaurant
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

const AdminPage = () => {
  const [currentTab, setCurrentTab] = useState('users');
  const [users, setUsers] = useState([]);
  
  // Specificăm tipul pentru restaurants
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchRestaurants = async () => {
      try {
        const fetchedRestaurants = await getAllRestaurants();
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchUsers();
    fetchRestaurants();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-opacity-20 py-10" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-white bg-opacity-95 shadow-xl rounded-lg p-10 max-w-6xl w-full">
        <h1 className="text-3xl mb-8 text-center font-bold text-gray-700">Administration Page</h1>
        <div className="flex border-b">
          <button 
            onClick={() => setCurrentTab('users')} 
            className={`mr-4 pb-2 font-semibold ${currentTab === 'users' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
            Users
          </button>
          <button 
            onClick={() => setCurrentTab('restaurants')} 
            className={`pb-2 font-semibold ${currentTab === 'restaurants' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
            Restaurants
          </button>
        </div>
        <div className="mt-6">
          {currentTab === 'users' && <UserTable users={users} />}
          {currentTab === 'restaurants' && <RestaurantTable restaurants={restaurants} setRestaurants={setRestaurants} />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
