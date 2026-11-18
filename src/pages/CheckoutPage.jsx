import React, { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = ({ cart, onClearCart }) => {
  //Check whether the user has confirmed payment submission.
  const [isSubmitted, setIsSubmitted] = useState(false);

  //Initialize the form field data object.
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  //Store card validation errors.
  const [cardError, setCardError] = useState("");

  //Compute the cart subtotal.
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  //Add taxes and compute total.
  const taxes = subtotal * 0.06;
  const total = subtotal + taxes;

  //Handle form field changes.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Validate card number: exactly 16 digits.
  const validateCardNumber = (number) => {
    const digits = number.replace(/\s/g, "");
    return /^[0-9]{16}$/.test(digits);
  };

  //Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();

    const cardNumber = e.target.elements.cardNumber.value;

    if (!validateCardNumber(cardNumber)) {
      setCardError("Card number must contain exactly 16 digits.");
      return;
    }

    setCardError("");
    setIsSubmitted(true);
    onClearCart();
  };

  //Successful checkout screen.
  if (isSubmitted) {
    return (
      <div className="checkout-success">
        <h2>Order Placed Successfully</h2>
        <p>
          Thank you, {formData.fullName}. A confirmation email is sent to{" "}
          {formData.email}.
        </p>
        <Link className="btn btn-primary" to="/">
          Return to HomePage
        </Link>
      </div>
    );
  }

  //Empty cart edge case.
  if (cart.length === 0) {
    return (
      <div className="empty-cart-page">
        <h2>Your cart is empty.</h2>
        <Link className="btn btn-secondary" to="/">
          Shop for some items please.
        </Link>
      </div>
    );
  }

//Actual Page Starts here
  return (
    <div className="checkout-container">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span className="current">Checkout</span>
      </nav>

      <h1>Checkout and Order Confirmation</h1>

      <div className="checkout-grid">

        {/* FORM element */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              minLength="2"
              maxLength="60"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jane Smith"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="JaneSmith@Oakland.edu"
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="123 Main St"
              required
              minLength="1"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              name="city"
              id="city"
              required
              minLength="1"
              placeholder="Rochester Hills"
              title="Please enter a valid city name."
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          {/* Postal Code */}
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code *</label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              required
              pattern="[0-9]{5}(-[0-9]{4})?"
              placeholder="12345"
              title="Enter a valid ZIP code (12345 or 12345-6789)."
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>

          {/* Card Number */}
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              required
              inputMode="numeric"
              pattern="[0-9 ]{16,19}"
              maxLength="19"
              placeholder="1234 5678 9012 3456"
            />

            {cardError && (
              <p className="form-error" role="alert">
                {cardError}
              </p>
            )}
          </div>
          {/* CVV */}
          <div className="form-group">
            <label htmlFor="cvv">CVV *</label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              required
              inputMode="numeric"
              pattern="[0-9 ]{3}"
              maxLength="3"
              placeholder="123"
            />
            {/* Expiration Date */}
            <div className="form-group">
              <label htmlFor="expiryDate">Expiration Date *</label>
              <input
                type="month"
                name="expiryDate"
                id="expiryDate"
                placeholder="MM/YYYY"
                required
                min={new Date().toISOString().slice(0, 7)}
                
              />
            </div>
            {cardError && (
              <p className="form-error" role="alert">
                {cardError}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Complete Order (${total.toFixed(2)})
          </button>
        </form>

        {/* INVOICE or SUMMARY section */}
        <aside className="order-summary-card">
          <h3>Order Summary</h3>

          <ul className="summary-list">
            {cart.map((item) => (
              <li key={item.id} className="summary-row">
                <span>
                  {item.title} &times; {item.quantity}
                </span>
                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <hr />

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Tax (6%):</span>
            <span>${taxes.toFixed(2)}</span>
          </div>

          <div className="summary-row total-row">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default CheckoutPage;
