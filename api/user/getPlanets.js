// // project/api/user/getPlanets.js
// import axios from 'axios'

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end()
//   const { userId } = req.body

//   try {
//     const upstream = await axios.post(
//       'http://xmpp.astroping.com:8081/api/user/getPlanets',
//       { userId }
//     )
//     res.status(200).json(upstream.data)
//   } catch (err) {
//     console.error('getPlanets error:', err.response?.data || err)
//     res
//       .status(err.response?.status || 500)
//       .json({ error: err.response?.data || err.message })
//   }
// }
