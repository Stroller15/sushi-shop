import React, { useState } from 'react';

const CustomerInterface = () => {
  const [sushiA, setSushiA] = useState(0);
  const [sushiB, setSushiB] = useState(0);
  const [cartInfo, setCartInfo] = useState(null);

  // Function to update cart and get price information
  const updateCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sushiA, sushiB }),
      });
      const data = await response.json();
      setCartInfo(data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  // Function to place an order
  const placeOrder = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sushiA, sushiB }),
      });
      const data = await response.json();
      alert(`Order placed successfully! Order ID: ${data.orderId}`);
      // Reseting the form after successful order
      setSushiA(0);
      setSushiB(0);
      setCartInfo(null);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <h2>Susan's Sushi Shop - Order</h2>
      <div>
        <label>
          Sushi A (£3):
          <input
            type="number"
            value={sushiA}
            onChange={(e) => setSushiA(parseInt(e.target.value) || 0)}
            min="0"
          />
        </label>
      </div>
      <div>
        <label>
          Sushi B (£4):
          <input
            type="number"
            value={sushiB}
            onChange={(e) => setSushiB(parseInt(e.target.value) || 0)}
            min="0"
          />
        </label>
      </div>
      <button onClick={updateCart}>Update Cart</button>
      {cartInfo && (
        <div>
          <p>Total Price: £{cartInfo.totalPrice.toFixed(2)}</p>
          <p>Discount: {(cartInfo.discount * 100).toFixed(0)}%</p>
          <p>Discounted Price: £{cartInfo.discountedPrice.toFixed(2)}</p>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default CustomerInterface;