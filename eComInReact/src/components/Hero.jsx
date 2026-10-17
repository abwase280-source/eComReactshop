
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const slides = [
  {
    image: '/slider0.png',
    alt: 'Plants Shop hero slide 1',
    label: 'WELCOME TO PLANTS SHOP',
    title: 'Bring Nature Into Your Home',
    description:
      'Discover beautiful indoor plants and create your own green space.',
  },
  {
    image: '/slider1.png',
    alt: 'Plants Shop hero slide 2',
    label: 'MAKE YOUR SPACE GREEN',
    title: 'Refresh Your Home With Plants',
    description:
      'Find beautiful plants to bring freshness and life into your home.',
  },
  {
    image: '/slider2.png',
    alt: 'Plants Shop hero slide 3',
    label: 'GROW YOUR OWN GREEN SPACE',
    title: 'Discover Your Favourite Plants',
    description:
      'Explore our collection and find the perfect plants for your space.',
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  function previousSlide() {
    setCurrentSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  }

  function nextSlide() {
    setCurrentSlide((current) => (current + 1) % slides.length);
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-label">{slides[currentSlide].label}</p>

        <h1>{slides[currentSlide].title}</h1>

        <p className="hero-description">
          {slides[currentSlide].description}
        </p>

        <Link to="/shop" className="hero-btn">
          Shop Now
        </Link>
      </div>

      <div className="hero-slider">
        <div className="hero-image-wrapper">
          {slides.map((slide, index) => (
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              className={`hero-image ${
                currentSlide === index ? 'active' : ''
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          className="hero-arrow hero-prev"
          onClick={previousSlide}
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        <button
          type="button"
          className="hero-arrow hero-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#10095;
        </button>

        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={`hero-dot ${
                currentSlide === index ? 'active' : ''
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
