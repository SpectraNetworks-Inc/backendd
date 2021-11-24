const Push = require('pushover-notifications');
const Logger = require('../config/logger');
const config = require('../config/config');

if (!config.Pushover.userToken || !config.Pushover.token){
  Logger.info('No Pushover Keys. Not using it');
} else {
  Logger.info('Pushover Keys Exist Enabling Service');
  const p = new Push({
    user: config.Pushover.userToken,
    token: config.Pushover.token
  });



  function sendNotification(msg, device) {
    var json = {
      message: msg,
      title: "Backend Daemon Notification",
      sound: 'magic',
      device: device,
      priority: 1, //Forced Regular notification for now
      timestamp: Date.now()
    };
    p.send(json, function (err, result) {
      if (err) {
        throw err;
      }
      Logger.info(`Sent Notification to [Device(s):${device}] | ${result} |`);
    });
  }
}


module.exports = {
  sendNotification
};
