const Logger = require('../../config/logger');
const express = require('express');
const router = express.Router();

router
    .route('/test')
    .get(function (req, res, next) {
      res.json({
        yeet: true
      });
    });

module.exports = router;
