class ExpressError extends Error {
    constructor(statusCode, message) {
        // Call the parent constructor of Error
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;