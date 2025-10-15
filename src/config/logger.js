const winston = require('winston');
const path = require('path');
// testando 3
const logger = winston.createLogger({
  level: 'info', // nível mínimo que será logado (debug < info < warn < error) MAOEI teste
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // mostra no terminal
    new winston.transports.File({ filename: path.join(__dirname, '../../logs/info.log'), level:"info"}), // grava no arquivo
	new winston.transports.File({ filename: path.join(__dirname, '../../logs/warn.log'), level:"warn"}),
	new winston.transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level:"error"}), // grava no arquivo
	new winston.transports.File({ filename: path.join(__dirname, '../../logs/debug.log'), level:"debug"}), // grava no arquivo
	new winston.transports.File({ filename: path.join(__dirname, '../../logs/app.log')}), // grava no arquivo
  ]
});

module.exports =  {logger};