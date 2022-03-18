const express = require('express');
const config = require('../../config/config');

// Route Import
const emailRoute = require('./email.route');
const teleRoute = require('./tele.route');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/tele',
    route: teleRoute,
  },
  {
    path: '/email',
    route: emailRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router
    .route('/heartbeat')
    .get(function (req, res, next) {
      res.json('OK');

    });
/* istanbul ignore next */

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
