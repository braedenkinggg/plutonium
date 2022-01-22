class HttpError extends Error {
    public statusCode;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default HttpError;