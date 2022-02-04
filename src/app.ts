/*
    Main App file
*/

import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import errorHandler from './middlewares/errorHandler';
import ApiError from './utils/exceptions/ApiError';

import routes from './routes/routes';

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
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: 'http://localhost:3000/',
            credentials: true
        }));

        this.app.use(session({
            name: process.env.SESSION_NAME!,
            secret: process.env.SESSION_SECRET!,
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({ mongoUrl: process.env.MONGO_URI! }),
            cookie: {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV! === 'prod' ? true : false,
                sameSite: true
            }
        }));

        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../views'));
    }

    private initRoutes(): void {
        this.app.use(routes);
    }

    private handleErrors(): void {
        this.app.use('*', (req, res, next) => {
            return next(new ApiError(404, 'Page not found'));
        });

        this.app.use(errorHandler);
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