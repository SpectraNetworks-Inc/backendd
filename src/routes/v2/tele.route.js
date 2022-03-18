const Logger = require('../../config/logger');
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const router = express.Router();

router
    .route('/inCALL')
    .post(function (req, res, next) {
      const twiml = new VoiceResponse();
      const province = req.body.FromState;

      twiml.say({ voice: 'alice' }, 'hey dude from' + province);
      console.log(req.body);

      res.type('text/xml');
      res.send(twiml.toString());
    });

router
    .route('/inSMS')
    .post(function (req, res, next) {
      const twiml = new MessagingResponse();

      twiml.message("Fuck you");
      res.end(twiml.toString());
    });



module.exports = router;
