import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import OrderList from "@/components/OrderList"; 
import background from "../assets/cookingbackground.png"
const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();
  const { orders } = useGetMyRestaurantOrders();
  const isEditing = !!restaurant;
  console.log('starting to test...');
  return (
    
      <div className="min-h-screen bg-cover bg-fixed bg-opacity-70 bg-no-repeat bg-center"
           style={{ backgroundImage: `url(${background})` }}>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="space-y-5 bg-gray-50 bg-opacity-80 p-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold">{orders?.length || 0} orders</h2>
          <OrderList orders={orders ?? []} />
        </TabsContent>
        <TabsContent value="manage-restaurant">
          <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRestaurantPage;
