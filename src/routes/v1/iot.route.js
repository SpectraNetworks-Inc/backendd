const ts = require('time-stamp');
const Logger = require('../../config/logger');
const express = require('express');
const router = express.Router();
const smsService = require('../../services/sms.service');
const hueService = require('../../services/hue.service');


//waterpump data endpoint
router.post('/rx', function (req, res, next) {
    if (req.body.isOn == true) {
        smsService.sendSMStoAdmin(`Pump has been Activated - ${ts('YYYY/MM:ss')}`);
        hueService.tempRedBdrm();
        Logger.log('Activated Pump');
    }
    if (req.body.isOn == false){
        smsService.sendSMStoAdmin(`Pump has been Deactivated - ${ts('YYYY/MM:ss')}`);
        Logger.log('Deactivated Pump');
    }
    res.send('OK');
    });







    
module.exports = router;
