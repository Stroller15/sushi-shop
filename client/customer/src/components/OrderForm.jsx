import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';

function OrderForm() {
  const [customerName, setCustomerName] = useState('');
  const [sushiAQty, setSushiAQty] = useState(0);
  const [sushiBQty, setSushiBQty] = useState(0);
  const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const { addToCart } = useContext(CartContext);

  const calculatePrices = () => {
    const priceA = 3;
    const priceB = 4;
    const totalPriceBeforeDiscount = (sushiAQty * priceA) + (sushiBQty * priceB);
    let discount = 0;
    const totalItems = sushiAQty + sushiBQty;

    if (totalItems >= 20) {
      discount = 0.20;
    } else if (totalItems >= 10) {
      discount = 0.10;
    }

    const currentHour = new Date().getHours();
    if (currentHour >= 11 && currentHour < 14) {
      discount += 0.20;
    }

    const discountedPrice = totalPriceBeforeDiscount * (1 - discount);
    setTotalPriceBeforeDiscount(totalPriceBeforeDiscount);
    setDiscountedPrice(discountedPrice);
  };

  const handleAddToCart = () => {
    calculatePrices();

    const newItem = {
      customerName,
      sushiAQty,
      sushiBQty,
      totalPriceBeforeDiscount,
      discountedPrice
    };

    addToCart(newItem);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddToCart();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Customer Name:</label>
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
      </div>
      <div>
        <label>Sushi A:</label>
        <input type="number" value={sushiAQty} onChange={(e) => setSushiAQty(Number(e.target.value))} required />
      </div>
      <div>
        <label>Sushi B:</label>
        <input type="number" value={sushiBQty} onChange={(e) => setSushiBQty(Number(e.target.value))} required />
      </div>
      <div>
        <button type="button" onClick={handleAddToCart}>Add to Cart</button>
        <button type="submit">Place Order</button>
      </div>
      <div>
        <p>Total Price Before Discount: {totalPriceBeforeDiscount}£</p>
        <p>Discounted Price: {discountedPrice}£</p>
      </div>
    </form>
  );
}

export default OrderForm;
