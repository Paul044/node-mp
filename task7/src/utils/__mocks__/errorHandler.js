
export class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const populateErrorWithHandledFields = (err, req) => ({
    err,
    req
});
