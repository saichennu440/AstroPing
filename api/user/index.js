// api/user/index.js
import axios from 'axios';

const BACKEND = 'http://xmpp.astroping.com:8081/api/user';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // Forward the Authorization header (your JWT) if present
    const headers = {};
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    // Hit the real backend’s GET /api/user
    const response = await axios.get(BACKEND, { headers });

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Fetch user error:', err.message);
    const status = err.response?.status || 500;
    return res
      .status(status)
      .json({
        success: false,
        message: err.response?.data?.message || 'Failed to load user',
      });
  }
}
