const ts = require('time-stamp');
const auth = require('../../middlewares/auth');
const Logger = require('../../config/logger');
const express = require('express');
const router = express.Router();

router
    .route('/ingestSMS')
    .post(function (req, res, next) {
        Logger.debug(req.body);

    });
module.exports = router;