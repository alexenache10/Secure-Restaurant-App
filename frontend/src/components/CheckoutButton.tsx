import { Button } from "./ui/button";
import { toast } from "sonner";
import { CartItem } from "@/pages/DetailPage";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface CheckoutButtonProps {
  cartItems: Array<CartItem>;
  restaurantName: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ cartItems, restaurantName }) => {
  const isLoggedIn = localStorage.getItem('userEmail') !== null;
  const userEmail = localStorage.getItem('userEmail'); 
  const totalCost = localStorage.getItem('order');
  var integerCost = 0;
  if(totalCost != null)
    integerCost = parseInt(totalCost);
  const handleCheckout = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to continue");
      return;
    }

      try {
      const response = await fetch(`${API_BASE_URL}/api/restaurant/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          totalPrice: totalCost,
          cartItems,
          restaurantName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
        return;
      }
      const responseData = await response.json();
    const estimatedDeliveryTime = responseData.estimatedDeliveryTime;
      toast.success(`Order placed successfully! Delivery will arrive at the specified address in ${estimatedDeliveryTime} minutes!`);
    } catch (error) {
      toast.error("Failed to process the order.");
    }
  };

  return (
    <Button
      className="bg-cyan-600 flex-1"
      onClick={handleCheckout}
      disabled={!isLoggedIn || integerCost <= 0}
    >
      {isLoggedIn ? "Checkout" : "Log in first"}
    </Button>
  );
};

export default CheckoutButton;