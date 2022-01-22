import { object, string } from "zod";

const signupSchema = object({
    body: object({
        username: string({
            required_error: 'username is required',
            invalid_type_error: 'username must be a string'
        }).min(3, 'Usernames must be 3-16 characters long')
          .max(16, 'Usernames must be 3-16 characters long'),
        
        fullName: string({
            invalid_type_error: 'fullName must be a string'
        }),

        email: string({
            required_error: 'email is required',
            invalid_type_error: 'email must be a string'
        }).email('email is not valid'),
        
        password: string({
            required_error: 'password is required',
            invalid_type_error: 'password must be a string'
        }).min(8, 'password must be at least 8 characters'),

        confirmPassword: string({
            required_error: 'confirmPassword is required',
            invalid_type_error: 'confirmPassword must be a string'
        })
    }).refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    })
});

export default signupSchema;