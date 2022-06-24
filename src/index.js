
const config = require('./config/config');
const logger = require('./config/logger');
const SQL = require('./utils/SQL.js');
const app = require('./app');



//New DB connection
let server;
SQL.authenticate().then((res) => {
  logger.info('SQL Connection Successful and Authenticated');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
}).catch((err) => {
  logger.error('SQL Connection Failed, Closing Server');
  logger.error(err);
})


const exitHandler = () => {
  //Close DB Connection
  SQL.close(() => {
    logger.info('SQL Connection closed');
  }).catch((err) => {
    logger.error('SQL Connection close failed');
    logger.error(err);
  });
  //Exit
  setTimeout(() => {
    logger.info('Exiting');
    process.exit(1);
  }, 4000);
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  exitHandler();
});

process.on('SIGINT', function() {
  logger.info('SIGINT received');
  exitHandler();
});


module.exports = {
  exitHandler
}