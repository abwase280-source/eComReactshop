
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header" id="home">
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo.png" alt="Plants Shop" />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav
          id="main-navigation"
          className={`nav ${menuOpen ? 'nav-open' : ''}`}
        >
          <div className="nav-links">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>

            <Link to="/shop" className="nav-link" onClick={closeMenu}>
              Shop
            </Link>

            <Link to="/#products" className="nav-link" onClick={closeMenu}>
              Products
            </Link>

            <Link to="/#blogs" className="nav-link" onClick={closeMenu}>
              Blogs
            </Link>

            <Link to="/#contact" className="nav-link" onClick={closeMenu}>
              Contact
            </Link>

            <Link to="/cart" className="cart-link" onClick={closeMenu}>
              🛒 Cart
              <span className="cart-count">{cartCount}</span>
            </Link>
          </div>

          <div className="nav-buttons">
            <button
              className="login-btn"
              type="button"
              onClick={closeMenu}
            >
              Sign In
            </button>

            <button
              className="signup-btn"
              type="button"
              onClick={closeMenu}
            >
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
