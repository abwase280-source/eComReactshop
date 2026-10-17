
import './Features.css';

const features = [
  {
    id: 1,
    icon: '🌱',
    title: 'Fresh Plants',
    description: 'Discover beautiful plants for your home.',
  },
  {
    id: 2,
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Get your favourite plants delivered.',
  },
  {
    id: 3,
    icon: '🌿',
    title: 'Easy Care',
    description: 'Find plants that fit your lifestyle.',
  },
  {
    id: 4,
    icon: '💚',
    title: 'Healthy Plants',
    description: 'Bring natural beauty into your space.',
  },
];

function Features() {
  return (
    <section className="features">
      <div className="features-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.id}>
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
