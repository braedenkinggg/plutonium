/*
    Main App file
*/

import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import cors from 'cors';

import AuthController from './controllers/auth.controller';
import UserController from './controllers/user.controller';
import PostController from './controllers/post.controller';

import signupSchema from './validation/schema/signupSchema';
import loginSchema from './validation/schema/loginSchema';
import postSchema from './validation/schema/postSchema';
import validateSchema from './validation/schema/validateSchema';

import handleErrors from './middlewares/errorHandler';
import HttpError from './utils/exceptions/HttpError';
import os from 'os';

class App {
    public app: express.Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.initRoutes();
        this.handleErrors();
        this.connectDb();
    }

    public listen(): void {
        this.app.listen(process.env.PORT || 9000, () => {
            console.log(`App listening on port: ${process.env.PORT} 🚀`);
        });
    }

    private config(): void {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: 'http://localhost:3000/',
            credentials: true
        }));
        this.app.use(session({
            name: 'sid',
            secret: process.env.SESSION_SECRET!,
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({ mongoUrl: process.env.MONGO_URI! }),
            cookie: {
                path: '/',
                httpOnly: true,
                secure: false,
                sameSite: true
            }
        }));
    }

    private initRoutes(): void {
        this.app.get('/', PostController.getAllPosts);
        this.app.post('/signup', validateSchema(signupSchema), AuthController.signup);
        this.app.post('/login', validateSchema(loginSchema), AuthController.login);
        this.app.post('/posts/new', validateSchema(postSchema), PostController.createPost);
        this.app.get('/posts/:postId', PostController.getPost);
        this.app.put('/posts/:postId', PostController.updatePost);
        this.app.delete('/posts/:postId', PostController.deletePost);
        this.app.get('/:username', UserController.getUser);
    }

    private handleErrors(): void {
        this.app.use('*', (req, res, next) =>{
            next(new HttpError(404, 'Page Not Found...'));
        });

        this.app.use(handleErrors);
    }

    private connectDb(): void {
        mongoose.connect(process.env.MONGO_URI!)
            .then(() => {
                console.log('Succesfully connected to DB')
            })
            .catch((error) => {
                console.log(error);
                process.exit(1);
            });
    }
}

export default App;