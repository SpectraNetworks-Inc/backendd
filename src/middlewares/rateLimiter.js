const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many requests from this IP, please try again in 15 minutes',
  skipSuccessfulRequests: true,
});

module.exports = {
  authLimiter,
};
