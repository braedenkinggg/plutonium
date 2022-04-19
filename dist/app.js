"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const APIError_1 = __importDefault(require("./errors/APIError"));
const app = (0, express_1.default)();
// Middlewear
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: 'http://localhost:3000/', credentials: true }));
app.use((0, express_session_1.default)({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new connect_mongo_1.default({ mongoUrl: process.env.DB_URI }),
    cookie: {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod' ? true : false,
        sameSite: true,
    }
}));
// Routes
app.use('/', authRoutes_1.default);
app.use('/', postRoutes_1.default);
app.use('/', userRoutes_1.default);
app.use('*', (req, res, next) => next(new APIError_1.default(404, 'Page not found')));
app.use(errorHandler_1.default);
// Connect to DB
mongoose_1.default.connect(process.env.DB_URI)
    .then(() => console.log('Succesfully connected to DB'))
    .catch((err) => process.exit(1));
app.listen(process.env.PORT || 9000, () => {
    console.log(`App listening on port: ${process.env.PORT} 🚀`);
});
