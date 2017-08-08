const winston = require('winston');

switch (process.env.NODE_ENV) {
  case 'test':
    winston.remove(winston.transports.Console);
    break;
  case 'production':
    winston.add(winston.transports.File, { filename: 'error.log' });
    break;
  default:
}

module.exports = winston.log;
