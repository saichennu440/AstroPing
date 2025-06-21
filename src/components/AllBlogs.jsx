import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import './AllBlogs.css'
const API_BASE = import.meta.env.VITE_API_BASE

export default function AllBlogs() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchBlogs = async (pageNum) => {
    setLoading(true)
    try {
      const res = await axios.post(`${API_BASE}/blog/get-blogs`, {
        page: pageNum,
        limit: 10
      })
      if (res.data.success) {
        const newPosts = res.data.blogs || []
        setPosts(prev => [...prev, ...newPosts])
        if (newPosts.length < 10) setHasMore(false)
      } else {
        setError('No more blogs.')
        setHasMore(false)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to load blogs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs(page)
  }, [page])

  return (
    <>
      <Header />
      <section className="all-blogs section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">All Blogs</h2>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="blog-grid">
            {posts.map((post, idx) => {
              const imgSrc =
                post.image?.startsWith('http')
                  ? post.image
                  : `${API_BASE}${post.image}`
              return (
                <article key={idx} className="blog-card">
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

          {!loading && hasMore && (
            <button
              className="btn outline"
              onClick={() => setPage(prev => prev + 1)}
            >
              View More
            </button>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
