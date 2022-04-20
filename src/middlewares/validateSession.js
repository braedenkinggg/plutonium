const APIError = require("../errors/APIError");

function validateSession(req, res, next) {
    if(!req.session.userId) return next(new APIError(403, "Please login to complete this action"));
    return next();
}

module.exports = validateSession;