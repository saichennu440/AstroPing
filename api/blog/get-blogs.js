// api/blog/get-blogs.js
import axios from 'axios'

// upstream HTTP endpoint (insecure)
const BACKEND = 'http://xmpp.astroping.com:8081/api/blog/get-blogs'

export default async function handler(req, res) {
  try {
    // Expecting a JSON body with { page, limit }
    const { page, limit } = req.body

    // Forward the POST body to the backend
    const response = await axios.post(BACKEND, { page, limit })

    // Relay status and data back to your React app
    res.status(response.status).json(response.data)
  } catch (err) {
    console.error('Blog proxy error:', err.message)
    res
      .status(err.response?.status || 500)
      .json({
        success: false,
        message: 'Could not load blogs.',
        error: err.message,
      })
  }
}
