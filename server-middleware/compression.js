// server-middleware/compression.js
const compression = require('compression');

module.exports = compression({
  threshold: 0, // apply compression for all sizes
  level: 9      // maximum compression
});