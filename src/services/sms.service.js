const config = require('../config/config');
const client = require('twilio')(config.twilio.asid, config.twilio.authtoken);


const sendSMStoAdmin = async (txtMsg) => {
    client.messages.create({
        body: txtMsg,
        from: config.twilio.from,
        to: config.twilio.adminNumber
   })
  .then(message => console.log(`TXT_ID - ${message.sid}`));
}

module.exports = sendSMStoAdmin