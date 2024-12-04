// src/components/OrderList.tsx

import React from 'react';
import { Order } from "@/types";

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">Order ID</th>
            <th scope="col" className="py-3 px-6">User Email</th>
            <th scope="col" className="py-3 px-6">Total Amount</th>
            <th scope="col" className="py-3 px-6">Date</th>
            <th scope="col" className="py-3 px-6">Delivery City</th>
            <th scope="col" className="py-3 px-6">Delivery Address</th>
            <th scope="col" className="py-3 px-6">Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 px-6">{order._id}</td>
              <td className="py-4 px-6">{order.user.email}</td>
              <td className="py-4 px-6">{order.totalAmount} LEI</td>
              <td className="py-4 px-6">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="py-4 px-6">{order.deliveryDetails.city}</td>
              <td className="py-4 px-6">{order.deliveryDetails.addressLine1}</td>
              <td className="py-4 px-6">
                {order.cartItems.map((item, index) => (
                  <div key={index} className="font-medium text-gray-900 dark:text-white">
                    {item.quantity} x {item.name}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
