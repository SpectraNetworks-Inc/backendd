const ts = require('time-stamp');
const auth = require('../../middlewares/auth');
const Logger = require('../../config/logger');
const express = require('express');
const smsService = require('../../services/sms.service');
const hueService = require('../../services/hue.service');

const router = express.Router();

//waterpump data endpoint
router
    .route('/rx')
    .post(function (req, res, next) {
        if (req.body.isOn == true) {
            smsService.sendSMStoAdmin(`Pump has been Activated - ${ts('YYYY/MM:ss')}`);
            hueService.tempRedBdrm();
            Logger.info('Activated Pump');
        }
        if (req.body.isOn == false){
            smsService.sendSMStoAdmin(`Pump has been Deactivated - ${ts('YYYY/MM:ss')}`);
            Logger.info('Deactivated Pump');
        }
        res.send('OK');
    });





    
module.exports = router;
