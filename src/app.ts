import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import session from 'express-session';
import cors from 'cors';

import HttpError from './utils/exceptions/HttpError';
import handleErrors from './middlewares/errorHandler';

import signupSchema from './validation/schemas/signupSchema';
import loginSchema from './validation/schemas/loginSchema';
import postSchema from './validation/schemas/postSchema';
import validateSchema from './validation/validation';

import SignupController from './controllers/auth/signup.controller';
import LoginController from './controllers/auth/login.controller';
import UserController from './controllers/user.controller';
import PostController from './controllers/post.controller';

class App {
    public app: express.Application;
    

    constructor() {
        this.app = express();
        this.config();
        this.initRoutes();
        this.handleErrors();
        this.connectDb();
    }

    public listen() {
        this.app.listen(process.env.PORT || 9000, () => {
            console.log(`App listening on port: ${process.env.PORT} 🚀`);
        });
    }

    private config() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(session({
            secret: process.env.SESSION_SECRET!,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 2
            }
        }));
    }

    private initRoutes() {
        this.app.get('/', PostController.getPosts);
        this.app.post('/signup', validateSchema(signupSchema), SignupController.signup);
        this.app.post('/login', validateSchema(loginSchema), LoginController.login);
        this.app.post('/post/new', validateSchema(postSchema), PostController.createPost);
        this.app.get('/:username', UserController.getUserByUsername);
        this.app.get('/:username/posts', UserController.getUserPosts);
    }

    private handleErrors() {
        this.app.use('*', (req, res, next) =>{
            next(new HttpError(404, 'Page Not Found...'));
        });

        this.app.use(handleErrors);
    }

    private connectDb() {
        mongoose.connect(process.env.MONGO_URI!)
            .then(() => {
                console.log('Successfully connected to database 📝');
            })
            .catch((error: any) => {
                console.log('Database connection unsuccessful');
                console.log(error);
                process.exit(1);
            });
    }
}

export default App;