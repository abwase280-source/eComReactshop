
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-page">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty!</h2>
          <p>Add some products to get started.</p>
          <Link to="/shop" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />

                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>₹{item.price}</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <strong>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </strong>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>
              Total Items:
              <strong>
                {' '}
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </strong>
            </p>
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
            <Link to="/checkout" className="continue-shopping">
              Proceed to Checkout
            </Link>

            <Link to="/shop" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
