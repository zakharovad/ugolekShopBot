import * as winston from "winston";
import dotenv from 'dotenv';

dotenv.config();

class Logger{
    loggerInfo:winston.Logger;
    loggerError:winston.Logger;
    loggerDebug:winston.Logger;
    constructor(){
        this.loggerInfo = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.json(),
            ),
            transports: [
                new winston.transports.Console({
                    level: "info",
                    format: winston.format.simple(),
                }),
                new winston.transports.File({
                        filename: process.cwd() + '/logs/info.log',
                        level: "info",
                        maxsize: 1024 * 1024 * 10,
                        silent: false,

                    }
                ),
            ],
            levels: {
                info: 0
            },
        });
        this.loggerError = winston.createLogger({
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.json(),
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.simple(),
                    level: "error",
                }),
                new winston.transports.File({
                    filename: process.cwd() + '/logs/error.log',
                    level: "error",
                    maxsize: 1024 * 1024 * 10,
                    silent: false,

                }),
            ],
        });
        this.loggerDebug = winston.createLogger({
            level: 'debug',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.json(),
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.simple(),
                    level: "debug",
                }),
                new winston.transports.File({
                    filename: process.cwd() + '/logs/test.log',
                    level: "debug",
                    maxsize: 1024 * 1024 * 10,
                    silent: false,

                }),
            ],
        });
    }
    error(data:any){
        this.loggerError.error(data);
    }
    info(data:any){
        this.loggerInfo.info(data);
    }
    debug(data:any){
        this.loggerDebug.debug(data);
    }

}

export default new Logger()