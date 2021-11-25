const express = require('express');
const config = require('../../config/config');

// Route Import
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const iotRoute = require('./iot.route');
const shorturlRoute = require('./shorturl.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/iot',
    route: iotRoute,
  },
  {
    path: '/shorturl',
    route: shorturlRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
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
