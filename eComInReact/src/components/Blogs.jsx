
import './Blogs.css';

const blogs = [
  {
    id: 1,
    title: 'How to Care for Indoor Plants',
    description: 'Learn simple tips to keep your indoor plants healthy.',
    image: '/slider0.png',
  },
  {
    id: 2,
    title: 'Benefits of Plants at Home',
    description: 'Discover how plants can make your home feel fresh.',
    image: '/slider1.png',
  },
  {
    id: 3,
    title: 'Easy Plants for Beginners',
    description: 'Start your gardening journey with easy-care plants.',
    image: '/slider2.png',
  },
];

function Blogs() {
  return (
    <section className="blogs" id="blogs">
      <p className="blogs-subtitle">OUR BLOG</p>
      <h2>Latest Articles</h2>

      <div className="blogs-grid">
        {blogs.map((blog) => (
          <article className="blog-card" key={blog.id}>
            <img src={blog.image} alt={blog.title} />

            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <a href="#blogs">Read More →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blogs;
