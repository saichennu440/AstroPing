// api/user/update-user.js
import axios from 'axios';

const BACKEND = 'http://xmpp.astroping.com:8081/api/user/update-user';

export default async function handler(req, res) {
  try {
    const response = await axios.post(BACKEND, req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Update user error:', err.message);
    const status = err.response?.status || 500;
    res.status(status).json({
      success: false,
      message: err.response?.data?.message || 'User update failed',
    });
  }
}
