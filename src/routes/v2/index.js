const express = require('express');
const config = require('../../config/config');

// Route Import
const testRoute = require('./test.route');
const emailRoute = require('./email.route');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/email',
    route: emailRoute,
  },
];

const devRoutes = [
  {
    path: '/test',
    route: testRoute,
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
