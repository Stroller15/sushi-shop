import React, { useState, useEffect } from 'react';

const SusanInterface = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <h2>Susan's Sushi Shop - Orders</h2>
      <button onClick={fetchOrders}>Refresh Orders</button>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Time</th>
            <th>Sushi A</th>
            <th>Sushi B</th>
            <th>Total Price</th>
            <th>Total Discount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td>{order.sushi_a_quantity}</td>
              <td>{order.sushi_b_quantity}</td>
              <td>£{order.total_price.toFixed(2)}</td>
              <td>£{order.total_discount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SusanInterface;