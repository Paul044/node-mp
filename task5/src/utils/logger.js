import winston, { format } from 'winston';
const { combine, timestamp, colorize, printf } = format;

const printFormat = printf(({ level, message, time }) => {
    return `[${time}] ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(colorize(), timestamp(), printFormat),
    transports: [new winston.transports.Console()]
});

export const apiLoggerMiddleware = (req, res, next) => {
    const logObj = {
        method: req.method,
        url: req.baseUrl + req.route.path,
        arguments: { params: req.params, query: req.query, body: req.body }
    };
    logger.info(JSON.stringify(logObj));
    next();
};

export function serviceLoggerDecorator(target, name, descriptor) {
    const original = descriptor.value;
    if (typeof original === 'function') {
        // eslint-disable-next-line func-names
        descriptor.value = function (...args) {
            logger.info(
                `service:: ${target.constructor.name} method:: ${name} args:: ${args}`
            );
            try {
                const result = original.apply(this, args);
                return result;
            } catch (e) {
                logger.info(`Error: ${e}`);
                throw e;
            }
        };
    }
    return descriptor;
}

export default logger;
