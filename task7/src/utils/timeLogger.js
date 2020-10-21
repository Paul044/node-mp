import { performance } from 'perf_hooks';
import logger from './logger';

export const timeLoggerInitializeMiddleware = (req, res, next) => {
    res.locals.startTime = performance.now();
    next();
};

export const timeLoggerFinalizeMiddleware = (req, res, next) => {
    const startTime = res.locals.startTime;
    if (res.locals.startTime) {
        const executionTime = performance.now() - startTime;
        logger.info(`${res.req.method} ${res.req.url} | EXECUTION TIME:: ${executionTime}`);
    }
    next();
};
