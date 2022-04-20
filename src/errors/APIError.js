class APIError extends Error {
    constructor(status, message) {
        super(message);
        this.statusCode = status;
        this.message = message;
    }
}

module.exports = APIError;