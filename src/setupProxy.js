// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://xmpp.astroping.com:8081',
      changeOrigin: true,
      secure: false,
    })
  );
};
