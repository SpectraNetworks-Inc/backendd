const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const smsService = require('./services/sms.service');
const app = express();
const Logger = require('./config/logger');
const Push = require('./services/pushover.service');
//const Git = require('./utils/gitData');


// Version routes
const routesv1 = require('./routes/v1');


if (config.env !== 'review') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Render EJS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

app.get('/env', async function(req, res){
      if (config.env == 'review'){
        res.json({
          error: err
        });
      } else {
        res.json({
          error: 'Internal Server Error'
        });
      }
});

// v1 api routes
app.use('/v1', routesv1);


// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


if (!process.env.ENVIROMENT){
  Push.sendNotification(`API Started ENV:${config.env}`, 'myphone');

}else {
  switch (process.env.ENVIROMENT) {
    case 'dev':
      Push.sendNotification('API Started [Development Branch]', config.Pushover.devices);
      break;
    case 'review':
      Push.sendNotification('API Started [Review Branch]', config.Pushover.devices);
      break;
    case 'prod':
      Push.sendNotification('API Started [Production Branch]', config.Pushover.devices);
      break;
    default:
      Push.sendNotification('API Started [No ENV]', config.Pushover.devices);
    }
}

module.exports = app;
