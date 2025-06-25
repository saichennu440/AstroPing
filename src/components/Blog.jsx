import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import './Blog.css'

const API_BASE = import.meta.env.VITE_API_BASE
const PLACEHOLDER_IMAGE = '/images/placeholder.png' // ensure this path serves a valid image

export default function Blog({ user, onSignInClick, onProfileClick, onLogout }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    axios
      .post(`${API_BASE}/blog/get-blogs`, {
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
          <div className="spinner" />
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
    <>
      
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
              // Use 'blog_image' field from API
              const rawPath = post.blog_image || ''
              const imgSrc = rawPath
                ? rawPath.startsWith('http')
                  ? rawPath
                  : `${API_BASE.replace(/\/+$/, '')}/${rawPath.replace(/^\/+/, '')}`
                : ''

              return (
                <article key={index} className="blog-card">
                  <div className="blog-image">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={post.blog_name}
                        onError={e => {
                          if (e.currentTarget.src !== PLACEHOLDER_IMAGE) {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = PLACEHOLDER_IMAGE
                          }
                        }}
                      />
                    ) : (
                      <div className="no-image">No Image Available</div>
                    )}
                    {post.category && (
                      <div className="blog-category">{post.category}</div>
                    )}
                  </div>
                  <div className="blog-content">
                    <h3>{post.blog_name}</h3>
                    <div className="blog-meta">
                      {post.author && <span className="author">By {post.author}</span>}
                      {post.date && <span className="date">{post.date}</span>}
                      {post.readTime && <span className="read-time">{post.readTime}</span>}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
 
    </>
  )
}
