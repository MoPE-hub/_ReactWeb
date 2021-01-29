const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://192.168.1.13:8080',
          changeOrigin: true
      })
  )
}
