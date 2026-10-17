
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-about">
          <h2>Plants Shop</h2>
          <p>Bring nature into your home with beautiful plants.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: info@aimcs.in</p>
          <p>Open daily for your green needs.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Plants Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
