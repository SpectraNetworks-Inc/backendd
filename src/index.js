
const config = require('./config/config');
const logger = require('./config/logger');

const mongoose = require('mongoose');
const app = require('./app');
//const log = require('./services/elasticsearch.service');


let server;
mongoose.connect("mongodb://"+config.mongoose.cosmosHost+":"+config.mongoose.cosmosPort+"/"+config.mongoose.cosmosDB+"?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@tyree@", {
  auth: {
    user: config.mongoose.cosmosUser,
    password: config.mongoose.cosmosPassword
  },
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  logger.info('Connected to CosmosDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});



const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
