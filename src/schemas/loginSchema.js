const { object, string } = require("zod");

const loginSchema = object({
    body: object({
        username: string({
            required_error: "username is required",
            invalid_type_error: "username must be a string"
        }).min(3, "Invlaid Username or Password"),

        password: string({
            required_error: "password is required",
            invalid_type_error: "password must be a string"
        }).min(8, "Invlaid Username or Password")
    })
});


module.exports = loginSchema;