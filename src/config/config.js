const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    COSMOS_USER: Joi.string().required().description('Azure CosmosDB Username'),
    COSMOS_PASSWORD: Joi.string().required().description('Azure CosmosDB Password'),
    COSMOS_DBNAME: Joi.string().required().description('Azure CosmosDB DBName'),
    COSMOS_HOST: Joi.string().required().description('Azure CosmosDB Host'),
    COSMOS_PORT: Joi.string().required().description('Azure CosmosDB Port'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    TWILIO_ACCOUNTSID: Joi.string().description('Twilio Account SID for sms'),
    TWILIO_AUTHTOKEN: Joi.string().description('Twilio Auth Token for sms'),
    FROMNUMBER: Joi.string().description("Twilio from number"),
    ADMINNUMBER: Joi.string().description("Phone Number for emergency api contact"),
    PHILIPSHUE_U: Joi.string().description("Philips Hue Username"),
    LOGROCKETURI: Joi.string().description("LogRocket URI"),
    ESHOST: Joi.string().description("Elastic Search Host with Port"),
    ESUSER: Joi.string().description("Elastic Search Username"),
    ESPASS: Joi.string().description("Elastic Search Password"),
    APMSERVER: Joi.string().description("APM Server with protocol and port"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {

  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    cosmosUser: envVars.COSMOS_USER,
    cosmosPassword: envVars.COSMOS_PASSWORD,
    cosmosDB: envVars.COSMOS_DBNAME,
    cosmosHost: envVars.COSMOS_HOST,
    cosmosPort: envVars.COSMOS_PORT,
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  twilio: {
    asid: envVars.TWILIO_ACCOUNTSID,
    authtoken: envVars.TWILIO_AUTHTOKEN,
    from: envVars.FROMNUMBER,
    adminNumber: envVars.ADMINNUMBER,
  },
  philipsHue: {
    username: envVars.PHILIPSHUE_U,
  },
  LogRocket_URI: envVars.LOGROCKETURI,
  ElasticSearch: {
    ESHOST: envVars.ESHOST,
    ESUSER: envVars.ESUSER,
    ESPASS: envVars.ESPASS,
    APMSERVER: envVars.APMSERVER,
  }
};
