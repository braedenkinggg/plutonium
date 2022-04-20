const APIError = require("../errors/APIError");

function validateSchema(schema) {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });

            return next();
        } catch(err) {
            return next(new APIError(400, err.issues[0].message));
        }
    }
}

module.exports = validateSchema;