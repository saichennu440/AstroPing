// // project/api/user/getDashas.js
// import axios from 'axios'

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end()
//   const { userId, lang = 'en', isFrom = 'kotlin' } = req.body

//   try {
//     const upstream = await axios.post(
//       'http://xmpp.astroping.com:8081/api/user/getDashas',
//       { userId, lang, isFrom }
//     )
//     res.status(200).json(upstream.data)
//   } catch (err) {
//     console.error('getDashas error:', err.response?.data || err)
//     res
//       .status(err.response?.status || 500)
//       .json({ error: err.response?.data || err.message })
//   }
// }
