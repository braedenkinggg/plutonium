"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const APIError_1 = __importDefault(require("../errors/APIError"));
// Register
async function register(req, res, next) {
    const { username, email, password } = req.body;
    try {
        const newUser = await User_1.default.create({
            username: username,
            email: email,
            password: password,
        });
        req.session.userId = newUser.id;
        return res.status(200).json(newUser);
    }
    catch (err) {
        if (err.code === 11000)
            return next(new APIError_1.default(409, 'User already exists'));
        next(err);
    }
}
exports.register = register;
// Login
async function login(req, res, next) {
    const { username, password } = req.body;
    try {
        // Check if user exists
        const user = await User_1.default.findOne({ username });
        if (!user)
            return next(new APIError_1.default(404, 'User does not exist'));
        // Check if password is valid
        const validPassword = await user.verifyPwd(password);
        if (!validPassword)
            return next(new APIError_1.default(400, 'Incorrect password'));
        // Login user
        req.session.userId = user.id;
        return res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
}
exports.login = login;
// Logout
async function logout(req, res, next) {
    try {
        req.session.destroy(() => res.clearCookie('sid'));
        return res.status(200).json('User has been logged out');
    }
    catch (err) {
        next(err);
    }
}
exports.logout = logout;
exports.default = { register, login, logout };
