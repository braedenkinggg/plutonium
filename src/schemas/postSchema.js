const { object, string } = require("zod");

const postSchema = object({
    body: object({
        title: string({
            required_error: "title is required",
            invalid_type_error: "title must be a string"
        }),
        content: string({
            required_error: "content is required",
            invalid_type_error: "content must be a string"
        }),
    })
});

module.exports = postSchema;