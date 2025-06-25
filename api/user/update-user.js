// // api/user/update-user.js
// import axios from 'axios'

// const BACKEND = 'http://xmpp.astroping.com:8081/api/user/update-user'

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method Not Allowed' })
//   }

//   try {
//     // Forward the client’s authorization header
//     const headers = {}
//     if (req.headers.authorization) {
//       headers.Authorization = req.headers.authorization
//     }

//     const response = await axios.post(BACKEND, req.body, { headers })
//     return res.status(response.status).json(response.data)
//   } catch (err) {
//     console.error('Update user error:', err.message)
//     const status = err.response?.status || 500
//     return res.status(status).json({
//       success: false,
//       message: err.response?.data?.message || 'User update failed',
//     })
//   }
// }
