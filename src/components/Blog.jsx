import './Blog.css'

const Blog = () => {
  const blogPosts = [
    {
      title: 'Compatible Signs For a Gemini Woman',
      image: '/assets/blog.png',
      author: 'Team AstroPing',
      date: 'April 6, 2024',
      category: 'Gemini',
      readTime: '5 min read'
    },
    {
      title: 'Compatible Signs For a Scorpio Woman',
      image: '/assets/blog.png',
      author: 'Team AstroPing',
      date: 'April 7, 2024',
      category: 'Scorpio',
      readTime: '4 min read'
    },
    {
      title: 'Compatible Signs For a Cancer Woman',
      image: '/assets/blog.png',
      author: 'Team AstroPing',
      date: 'April 8, 2024',
      category: 'Cancer',
      readTime: '6 min read'
    }
  ]

  return (
    <section className="blog">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Blogs</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <article key={index} className="blog-card">
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
                <div className="blog-category">{post.category}</div>
              </div>
              <div className="blog-content">
                <h3>{post.title}</h3>
                <div className="blog-meta">
                  <span className="author">By {post.author}</span>
                  <span className="date">{post.date}</span>
                  <span className="read-time">{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
