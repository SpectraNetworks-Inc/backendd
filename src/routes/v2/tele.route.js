const Logger = require('../../config/logger');
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const router = express.Router();

router
    .route('/inCALL')
    .post(function (req, res, next) {
      const twiml = new VoiceResponse();

      twiml.play({ loop: 2 }, 'https://scisso.s3.us-west-2.amazonaws.com/static/heh.mp3');
      console.log(req.body);

      res.type('text/xml');
      res.send(twiml.toString());
    });

router
    .route('/inSMS')
    .post(function (req, res, next) {
      console.log(req.body);
      res.setStatus(200);
    });

router
    .route('/changeMSG')
    .post(function (req, res, next) {
      console.log(req.body);
      res.setStatus(200);
    });



module.exports = router;
