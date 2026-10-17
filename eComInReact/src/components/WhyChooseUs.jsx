
import './WhyChooseUs.css';

const reasons = [
  {
    id: 1,
    icon: '🌱',
    title: 'Quality Products',
    description: 'Carefully selected products for your home.',
  },
  {
    id: 2,
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Convenient delivery right to your doorstep.',
  },
  {
    id: 3,
    icon: '💚',
    title: 'Customer Support',
    description: 'We are here to help with your shopping.',
  },
];

function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <div className="why-heading">
        <p>WHY CHOOSE US</p>
        <h2>Making Your Shopping Easier</h2>
      </div>

      <div className="why-grid">
        {reasons.map((reason) => (
          <div className="why-card" key={reason.id}>
            <span>{reason.icon}</span>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
