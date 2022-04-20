// Import dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");
const APIError = require("./errors/APIError");

const authRouter = require("./routes/authRoutes");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middlewear
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000/", credentials: true }));
app.use(session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.DB_URI }),
    cookie: {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod" ? true : false,
        sameSite: true,
    }
}));

// Routes
app.use("/", authRouter);
app.use("/", postRouter);
app.use("/", userRouter);
app.use("*", (req, res, next) => next(new APIError(404, "Page not found")));
app.use(errorHandler);

// Connect to DB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log("Succesfully connected to DB"))
    .catch(err => process.exit(1));

app.listen(process.env.PORT || 9000, () => {
    console.log(`App listening on port: ${process.env.PORT} 🚀`);
});