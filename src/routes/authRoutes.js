// Import dependencies
const { Router } = require("express");

// Import Controller
const { signup, login, logout } = require("../controllers/authController");

// Import validation middleware and schemas
const signupSchema = require("../schemas/signupSchema");
const loginSchema = require("../schemas/loginSchema");
const validateSchema = require("../middlewares/validateSchema");
const validateSession = require("../middlewares/validateSession");

const authRouter = Router();

authRouter.post("/signup", validateSchema(signupSchema), signup);
authRouter.post("/login", validateSchema(loginSchema), login);
authRouter.post("/logout", validateSession, logout);

module.exports = authRouter;