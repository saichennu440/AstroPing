// // api/horoscope/get-horoscope.js
// import axios from 'axios'

// const BACKEND = 'http://xmpp.astroping.com:8081/api/horoscope/get-horoscope'

// export default async function handler(req, res) {
//   try {
//     // Vercel will accept both GET-with-query or POST-with-body
//     const { sign, day } =
//       req.method === 'POST'
//         ? req.body
//         : req.query

//     const response = await axios.get(BACKEND, {
//       params: { sign, day }
//     })

//     res
//       .status(response.status)
//       .json(response.data)
//   } catch (error) {
//     console.error('Proxy error:', error.message)
//     res
//       .status(error.response?.status || 500)
//       .json({
//         success: false,
//         message: error.response?.data?.message || error.message
//       })
//   }
// }
