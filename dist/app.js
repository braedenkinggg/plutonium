"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const ApiError_1 = __importDefault(require("./utils/errors/ApiError"));
const routes_1 = __importDefault(require("./routes/routes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.initRoutes();
        this.handleErrors();
        this.connectDb();
    }
    listen() {
        this.app.listen(process.env.PORT || 9000, () => {
            console.log(`App listening on port: ${process.env.PORT} 🚀`);
        });
    }
    config() {
        this.app.use((0, helmet_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:3000/',
            credentials: true
        }));
        this.app.use((0, express_session_1.default)({
            name: process.env.SESSION_NAME,
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            store: new connect_mongo_1.default({ mongoUrl: process.env.MONGO_URI }),
            cookie: {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'prod' ? true : false,
                sameSite: true
            }
        }));
    }
    initRoutes() {
        this.app.use(routes_1.default);
    }
    handleErrors() {
        this.app.use('*', (req, res, next) => {
            return next(new ApiError_1.default(404, 'Page not found'));
        });
        this.app.use(errorHandler_1.default);
    }
    connectDb() {
        mongoose_1.default.connect(process.env.MONGO_URI)
            .then(() => console.log('Succesfully connected to DB'))
            .catch((err) => {
            console.log(err);
            process.exit(1);
        });
    }
}
exports.default = App;
