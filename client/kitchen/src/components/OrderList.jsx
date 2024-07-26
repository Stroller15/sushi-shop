import React, { useState, useEffect } from 'react';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:8000/fetch_orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders List</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>Order ID: {order.id}</h3>
          <p>Customer Name: {order.customer_name}</p>
          <p>Order Time: {new Date(order.order_time).toLocaleString()}</p>
          <p>Total Price: {order.total_price}£</p>
          <p>Discount Applied: {order.discount_applied}</p>
          <p>Final Price: {order.final_price}£</p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item.quantity} x {item.sushi_type}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
