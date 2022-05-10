const ts = require('time-stamp');
const auth = require('../../middlewares/auth');
const Logger = require('../../config/logger');
const express = require('express');
const router = express.Router();

router
    .route('/ingestsms')
    .post(function (req, res, next) {
      Logger.log(req.body);
      res.send('OK');
    });

module.exports = router;



/**
 * @swagger
 * tags:
 *   name: SMS
 *   description: SMS Systtem
 */

/**
 * @swagger
 * /ingestsms:
 *   post:
 *     summary: Ingests SMS Data from twilio
 *     description: Ingest Endpoint.
 *     tags: [SMS]
 *     responses:
 *       "201":
 *         description: Ingested
 *
 */

