import React from 'react';
import { CartProvider } from './CartContext';
import OrderForm from './OrderForm';
import Cart from './Cart';

function App() {
  return (
    <CartProvider>
      <div>
        <OrderForm />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
