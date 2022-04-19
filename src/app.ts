// Import dependencies
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from './routes/authRoutes';
import postRouter from './routes/postRoutes';
import userRouter from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';
import ApiError from './errors/APIError';

const app: express.Application = express();

// Middlewear
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000/', credentials: true }));
app.use(session({
    name: process.env.SESS_NAME!,
    secret: process.env.SESS_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.DB_URI! }),
    cookie: {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV! === 'prod' ? true : false,
        sameSite: true,
    }
}));

// Routes
app.use('/', authRouter);
app.use('/', postRouter);
app.use('/', userRouter);
app.use('*', (req, res, next) => next(new ApiError(404, 'Page not found')));
app.use(errorHandler);

// Connect to DB
mongoose.connect(process.env.DB_URI!)
    .then(() => console.log('Succesfully connected to DB'))
    .catch((err: any) => process.exit(1));

app.listen(process.env.PORT || 9000, () => {
    console.log(`App listening on port: ${process.env.PORT} 🚀`);
});