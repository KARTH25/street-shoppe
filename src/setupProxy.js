
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/street-shoppe-apis',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api/street-shoppe-apis/': '/'
      },
    })
  );
  app.use(
    '/api/data',
    createProxyMiddleware({
      target: 'https://street-shoppe.firebaseio.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/data': '/'
      },
    })
  );
};