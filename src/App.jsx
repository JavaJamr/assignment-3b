import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";

import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

import { ALBUMS } from "./data/albums"

const App = () => {
  // universal states of the application
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // cart handlers -> unidirectional data flow
  //event handler to add items to the cart
  const handleAddToCart = (albums, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === albums.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === albums.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...albums, quantity }];
    });
    setIsCartOpen(true);
  };

  //update the items in the cart - update operations
  const handleUpdateQuantity = (albumsId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === albumsId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  // removing items from the cart
  const handleRemoveFromCart = (albumsId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== albumsId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // subtotal of the cart must persist universally
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // JSX formulation
  return (
    <div className="app-container">
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <CatalogPage albums={ALBUMS} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/albums/:id"
            element={
              < AlbumDetailPage
                albums={ALBUMS}
                onAddToCart={handleAddToCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} onClearCart={handleClearCart} />}
          />
        </Routes>
      </main>

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default App;