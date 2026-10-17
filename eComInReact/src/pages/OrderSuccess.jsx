
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <section className="order-success">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for shopping with Plants Shop.</p>

        {order && (
          <>
            <p>
              Order ID: <strong>{order.orderId}</strong>
            </p>
            <p>
              Order Total: <strong>₹{order.total.toFixed(2)}</strong>
            </p>
          </>
        )}

        <Link to="/shop" className="checkout-btn">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}

export default OrderSuccess;
