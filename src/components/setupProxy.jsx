const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://calorieapi-env.eba-udbdxf3g.us-east-1.elasticbeanstalk.com',
      changeOrigin: true,
    })
  );
};
