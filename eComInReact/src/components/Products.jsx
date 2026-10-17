
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { addToCart } = useCart();

  useEffect(() => {
    async function getProducts() {
      try {
       
        const response = await axios(
          'https://dummyjson.com/products/category/home-decoration?limit=3'
        );

        const data = response.data;
        setProducts(data.products.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <section className="products" id="products">
      <p className="products-subtitle">OUR COLLECTION</p>
      <h2>Popular Products</h2>

      {loading && <p>Loading products...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
              />

              <h3>{product.title}</h3>
              <p>₹{product.price}</p>

              <button
                type="button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <Link to="/shop" className="view-all-btn">
        View All Products
      </Link>
    </section>
  );
}

export default Products;
