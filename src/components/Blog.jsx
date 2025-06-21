import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Blog.css'
import { Link } from 'react-router-dom'
const API_BASE = import.meta.env.VITE_API_BASE

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    axios
      .post(`${API_BASE}/api/blog/get-blogs`, {
        page: 1,
        limit: 5
      })
      .then(res => {
        if (res.data.success) {
          setPosts(res.data.blogs || [])
        } else {
          setError('No blogs available.')
        }
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load blogs.')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="blog">
        <div className="container">
          <p>Loading blogs…</p>
        </div>
      </section>
    )
  }
  if (error) {
    return (
      <section className="blog">
        <div className="container">
          <p className="error">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="blog">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Blogs</h2>
          <Link to="/blogs" className="view-all">
            View All
          </Link>
        </div>

        <div className="blog-grid">
          {posts.map((post, index) => {
            // ensure full URL for image
            const imgSrc =
              post.image?.startsWith('http')
                ? post.image
                : `${API_BASE}${post.image}`
            return (
              <article key={index} className="blog-card">
                <div className="blog-image">
                  <img src={imgSrc} alt={post.title} />
                  {post.category && (
                    <div className="blog-category">{post.category}</div>
                  )}
                </div>
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <div className="blog-meta">
                    {post.author && (
                      <span className="author">By {post.author}</span>
                    )}
                    {post.date && <span className="date">{post.date}</span>}
                    {post.readTime && (
                      <span className="read-time">{post.readTime}</span>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
