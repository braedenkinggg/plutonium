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

import Auth from './controllers/auth.controller';
import Users from './controllers/user.controller';
import Posts from './controllers/post.controller';

import signupSchema from './validation/schemas/signupSchema';
import loginSchema from './validation/schemas/loginSchema';
import postSchema from './validation/schemas/postSchema';
import validateSchema from './validation/validation';

import handleErrors from './middlewares/errorHandler';
import HttpError from './utils/exceptions/HttpError';

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

    private initRoutes() {
        this.app.get('/', Posts.getAll);
        this.app.post('/signup', validateSchema(signupSchema), Auth.signup);
        this.app.post('/login', validateSchema(loginSchema), Auth.login);
        this.app.post('/new', validateSchema(postSchema), Posts.create);
        this.app.get('/post/:postId', Posts.getById);
        this.app.put('/post/:postId', Posts.update);
        this.app.delete('/post/:postId', Posts.delete);
        this.app.get('/:username', Users.getByUsername);
    }

    private handleErrors() {
        this.app.use('*', (req, res, next) =>{
            next(new HttpError(404, 'Page Not Found...'));
        });

        this.app.use(handleErrors);
    }

    private connectDb() {
        mongoose.connect(process.env.MONGO_URI!)
            .then(() => console.log('Succesfully connected to DB'))
            .catch((error) => {
                console.log(error);
                process.exit(1);
            });
    }
}

export default App;