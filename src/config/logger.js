const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');
const config = require('./config');

const esTransportOpts = {
  level: 'info',
  clientOpts: { node: `http://${config.ElasticSearch.ESUSER}:${config.ElasticSearch.ESPASS}@${config.ElasticSearch.ESHOST}` }
};
const esTransport = new ElasticsearchTransport(esTransportOpts);

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    esTransport,
  ],
});

module.exports = logger;
