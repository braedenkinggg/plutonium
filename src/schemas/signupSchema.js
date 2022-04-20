const { object, string } = require("zod");

const signupSchema = object({
    body: object({
        username: string({
            required_error: "username is required",
            invalid_type_error: "username must be a string"
        }).min(3, "Usernames must be between 3-20 characters in length")
          .max(20, "Usernames must be between 3-20 characters in length"),

        email: string({
            required_error: "email is required",
            invalid_type_error: "email must be a string"
        }).email("email is not valid"),
        
        password: string({
            required_error: "password is required",
            invalid_type_error: "password must be a string"
        }).min(8, "password must be at least 8 characters in length"),

        confirmPassword: string({
            required_error: "confirmPassword is required",
            invalid_type_error: "confirmPassword must be a string"
        })
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })
});

module.exports = signupSchema;