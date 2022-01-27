"use strict";
/*
    Main App file
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const post_controller_1 = __importDefault(require("./controllers/post.controller"));
const signupSchema_1 = __importDefault(require("./validation/schemas/signupSchema"));
const loginSchema_1 = __importDefault(require("./validation/schemas/loginSchema"));
const postSchema_1 = __importDefault(require("./validation/schemas/postSchema"));
const validation_1 = __importDefault(require("./validation/validation"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const HttpError_1 = __importDefault(require("./utils/exceptions/HttpError"));
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
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:3000/',
            credentials: true
        }));
        this.app.use((0, express_session_1.default)({
            name: 'sid',
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            store: new connect_mongo_1.default({ mongoUrl: process.env.MONGO_URI }),
            cookie: {
                path: '/',
                httpOnly: true,
                secure: false,
                sameSite: true
            }
        }));
    }
    initRoutes() {
        this.app.get('/', post_controller_1.default.getAll);
        this.app.post('/signup', (0, validation_1.default)(signupSchema_1.default), auth_controller_1.default.signup);
        this.app.post('/login', (0, validation_1.default)(loginSchema_1.default), auth_controller_1.default.login);
        this.app.post('/new', (0, validation_1.default)(postSchema_1.default), post_controller_1.default.create);
        this.app.get('/post/:postId', post_controller_1.default.getById);
        this.app.put('/post/:postId', post_controller_1.default.update);
        this.app.delete('/post/:postId', post_controller_1.default.delete);
        this.app.get('/:username', user_controller_1.default.getByUsername);
    }
    handleErrors() {
        this.app.use('*', (req, res, next) => {
            next(new HttpError_1.default(404, 'Page Not Found...'));
        });
        this.app.use(errorHandler_1.default);
    }
    connectDb() {
        mongoose_1.default.connect(process.env.MONGO_URI)
            .then(() => console.log('Succesfully connected to DB'))
            .catch((error) => {
            console.log(error);
            process.exit(1);
        });
    }
}
exports.default = App;
