// // /api/proxy-horoscope.js
// import axios from 'axios';

// const HTTP_API = 'http://xmpp.astroping.com:8081';

// export default async function handler(req, res) {
//   try {
//     // Accept both GET-with-query and POST-with-body
//     const { sign, day } =
//       req.method === 'POST' ? req.body : req.query;

//     const apiRes = await axios.get(
//       `${HTTP_API}/api/horoscope/get-horoscope`,
//       {
//         // axios GET-with-body (Twilio style) often needs `data`
//         // some backends take query params instead; adjust if needed
//         data: { sign, day },
//       }
//     );

//     return res.status(200).json(apiRes.data);
//   } catch (err) {
//     console.error('Proxy error:', err);
//     return res
//       .status(err.response?.status || 500)
//       .json({ success: false, message: err.message });
//   }
// }
