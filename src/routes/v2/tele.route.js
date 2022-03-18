const Logger = require('../../config/logger');
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const router = express.Router();

router
    .route('/inCALL')
    .post(function (req, res, next) {
      const twiml = new VoiceResponse();
      const city = req.body.FromCity;

      twiml.say({ voice: 'alice' }, 'hello dude from ' + city);

      res.type('text/xml');
      res.send(twiml.toString());
    });



module.exports = router;
