import winston from "winston";
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// type Logger = {
//   timestamp: string;
//   level: 'info' | 'warn' | 'error' | 'debug';
//   message: string;
// };

export const logger = winston.createLogger({
  level: 'info', // nível mínimo que será logado (debug < info < warn < error) MAOEI teste 2 2 1 234
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(), // mostra no terminal
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/info.log'),
      level: 'info',
    }), // grava no arquivo
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/warn.log'),
      level: 'warn',
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
    }), // grava no arquivo
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/debug.log'),
      level: 'debug',
    }), // grava no arquivo
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/app.log'),
    }), // grava no arquivo
  ],
});
