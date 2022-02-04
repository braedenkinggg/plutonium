import { object, string } from "zod";

const userSchema = object({
    body: object({
        fullName: string({
            invalid_type_error: 'Full Name must be a string'
        }),
        biography: string({
            invalid_type_error: 'Biography must be a string'
        }),
        link: string({
            invalid_type_error: 'Github must be a string'
        })
    })
});

export default userSchema;