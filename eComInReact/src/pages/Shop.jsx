
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Shop.css';
import axios from 'axios';

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { addToCart } = useCart();

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios(
          'https://dummyjson.com/products?limit=0'
        );

       
        const data = response.data;

        setProducts(data.products);

        const uniqueCategories = [
          ...new Set(
            data.products.map((product) => product.category)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <section className="shop-page">
      <h1>Our Shop</h1>
      <p>Explore our complete collection.</p>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="shop-filters">
            <label htmlFor="category-filter">
              Filter by category:
            </label>

            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value)
              }
            >
              <option value="all">All Products</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category
                    .replaceAll('-', ' ')
                    .replace(/\b\w/g, (letter) =>
                      letter.toUpperCase()
                    )}
                </option>
              ))}
            </select>
          </div>

          <p className="shop-count">
            Showing {filteredProducts.length} products
          </p>

          <div className="shop-grid">
            {filteredProducts.map((product) => (
              <article className="shop-card" key={product.id}>
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
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Shop;
