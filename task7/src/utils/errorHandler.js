import logger from './logger';

export class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const handleError = (err, res) => {
    const { statusCode, message, error } = err;
    // If we had a joi error, let's return a custom 400 json response
    if (error?.isJoi) {
        res.status(400).json({
            status: 'error',
            statusCode: 400,
            message: err.error.toString(),
            type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            metaData: 'handled by Joi Validator',
            error: err
        });
    } else if (err.statusCode) {
        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message,
            metaData: 'handled by ErrorHandlerMiddleware'
        });
    } else {
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Internal Server Error',
            error: err
        });
    }
};

// eslint-disable-next-line no-unused-vars
export const errorHandlerMiddleware = (err, req, res, next) => {
    handleError(err, res);
    logger.error(
        `${err.origin?.methodName} | args:: ${JSON.stringify(
            err.origin?.arguments
        )} | ${err.message || err}`
    );
};

export const populateErrorWithHandledFields = (err, req) => ({
    ...err,
    origin: { methodName: req.baseUrl + req.route.path, arguments: { params: req.params, query: req.query, body: req.body } }
});
