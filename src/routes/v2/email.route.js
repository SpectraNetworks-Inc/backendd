const Logger = require('../../config/logger');
const Email = require('../../services/email.service');
const express = require('express');
const router = express.Router();

router
    .route('/:to/:subject/:msg')
    .get(function (req, res, next) {
      if (!req.params.to){
        res.send('to address required');
      } else {
        Email.sendEmail(req.params.to, req.params.subject, req.params.msg);
      }
      res.json({
        status: 'Success'
      });
    });

module.exports = router;
