
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'https://street-shoppe.firebaseio.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/data': '/'
      },
    })
  );
};