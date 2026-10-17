
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      setError('Enter a valid 6-digit PIN code.');
      return;
    }

    const order = {
      orderId: `PLANT-${Date.now()}`,
      customer: form,
      items: cartItems,
      total: cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Placed',
    };

    try {
      const savedOrders = JSON.parse(
        localStorage.getItem('plant-shop-orders') || '[]'
      );

      localStorage.setItem(
        'plant-shop-orders',
        JSON.stringify([...savedOrders, order])
      );

      clearCart();
      navigate('/order-success', {
        state: { order },
      });
    } catch {
      setError('Unable to save your order. Please try again.');
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="checkout-page">
        <h1>Your cart is empty</h1>
        <p>Add products before proceeding to checkout.</p>
        <Link to="/shop" className="checkout-btn">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery Details</h2>

          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            autoComplete="name"
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <label htmlFor="phone">Mobile Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={form.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
          />

          <label htmlFor="address">Full Address</label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            autoComplete="street-address"
            rows={3}
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            autoComplete="address-level2"
          />

          <label htmlFor="pincode">PIN Code</label>
          <input
            id="pincode"
            name="pincode"
            inputMode="numeric"
            maxLength={6}
            value={form.pincode}
            onChange={handleChange}
            required
            autoComplete="postal-code"
          />

          {error && <p className="checkout-error">{error}</p>}

          <button type="submit" className="checkout-btn">
            Place Order
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />

              <div>
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className="checkout-total">
            <span>Total Amount</span>
            <strong>₹{cartTotal.toFixed(2)}</strong>
          </div>

          <p className="checkout-note">
            Demo checkout — no payment will be collected.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
