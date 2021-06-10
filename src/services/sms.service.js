const config = require('../config/config');
const client = require('twilio')(config.twilio.asid, config.twilio.authtoken);


const sendSMStoAdmin = async (txtMsg) => {
    client.messages.create({
        body: txtMsg,
        from: '+17787185773',
        to: '+17785319012'
   })
  .then(message => console.log(`TXT_ID - ${message.sid}`));
}

module.exports = sendSMStoAdmin