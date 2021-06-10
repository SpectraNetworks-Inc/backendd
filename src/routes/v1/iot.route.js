const ts = require('time-stamp');
const express = require('express');
const router = express.Router();
const smsService = require('../../services/sms.service');
const hueService = require('../../services/hue.service');



//waterpump data
router.post('/rx', function (req, res, next) {

    if (req.body.isOn == true) {
        smsService(`Pump has been Activated - ${ts('YYYY/MM:ss')}`);
        hueService.tempRedBdrm();
        console.log('Activated Pump');
    }
    if (req.body.isOn == false){
        smsService(`Pump has been Deactivated - ${ts('YYYY/MM:ss')}`);
        console.log('Deactivated Pump');
    }
    res.send('OK');
    });



module.exports = router;
