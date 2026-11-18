import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const CartDrawer = ({ isOpen, cart, onClose, onUpdateQuantity, onRemove }) => {

    
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");
  // if the drawer is not open then break out of this component
  if (!isOpen) return null;

//Combined Subtotal with check stock.
const calculateSubtotal = () => {
  let total = 0;
  let exceedsStock = false;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    if (item.quantity > item.stock) {
      exceedsStock = true;
    }
  });

  setWarning(exceedsStock ? "Quantity Exceeds Stock" : "");

  return total;
};
//Created an alias seperate subtotal function for future reference
const subtotal = calculateSubtotal();

  //Locks down Cart buttons in case we are at stock so users cant get more. If this process is bypassed a warning will be shown and they cant checkout
  const exceedsStock = cart.some(
  (item) => item.quantity > item.stock
  );
  //Error handeling for if stock is greater than whats available
    const handleQuantityChange = (item, amount) => {
      const newQuantity = item.quantity + amount;

      if (amount < 0) {
        onUpdateQuantity(item.id, amount);
        return;
      }

      //Prevent quantity increases beyond available stock.
      if (newQuantity > item.stock) {
        setWarning("Quantity Exceeds Stock");
        return;
      }

      setWarning("");
      onUpdateQuantity(item.id, amount);
    };

  // the first introduction to auto-navigation
  // when a user complete an action on the page take them somewhere
  const handleProceedToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Your Cart ({cart.length})</h2>
          <button type="button" className="btn-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart">Your cart is currently empty</div>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-img"
                  />

                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <p className="cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  <div className="qty-controls">
                    <button onClick={() => handleQuantityChange(item, -1)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => handleQuantityChange(item, 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>

                    <button
                      className="btn-remove"
                      onClick={() => {
                        onRemove(item.id);
                        setWarning("");
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {warning && (
          <p className="stock-warning" role="alert">
            {warning}
          </p>
        )}
        </div>
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span>Subtotal:</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={handleProceedToCheckout}
          disabled={exceedsStock}
        >
          Proceed to Checkout
        </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;