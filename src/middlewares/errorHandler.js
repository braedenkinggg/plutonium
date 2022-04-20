const APIError = require("../errors/APIError");

function errorHandler(err, req, res, next) {
    console.log(err);
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            error: true,
            statusCode: err.statusCode,
            message: err.message,
        });    
    }
    
    return res.status(500).json({
        error: true,
        statusCode: 500,
        message: "Internal Server Error",
    });
}

module.exports = errorHandler;