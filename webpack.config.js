// web.config.js (for SPA routing)
module.exports = {
    rewrites: [
      {
        source: '/:path*',
        destination: '/',
      },
    ],
  };
  