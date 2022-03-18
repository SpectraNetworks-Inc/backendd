const Logger = require('../../config/logger');
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const router = express.Router();

router
    .route('/inCALL')
    .post(function (req, res, next) {
      const twiml = new VoiceResponse();
      const city = request.body.FromCity;

      twiml.say({ voice: 'alice' }, 'hello dude from ' + city);

      response.type('text/xml');
      response.send(twiml.toString());
    });



module.exports = router;
