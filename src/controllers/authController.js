const User = require("../models/User");
const APIError = require("../errors/APIError");

// Register
async function signup(req, res, next) {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ 
            username: username, 
            email: email, 
            password: password, 
        });

        req.session.userId = user.id;
        return res.status(200).json(user);
    } catch(err) {
        if(err.code === 11000) return next(new APIError(409, "User already exists"));
        next(err);
    }
}

// Login
async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({username});
        if(!user) return next(new APIError(404, "User does not exist"));

        // Check if password is valid
        const validPassword = await user.verifyPwd(password);
        if(!validPassword) return next(new APIError(400, "Incorrect password"));

        // Login user
        req.session.userId = user.id;
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

// Logout
async function logout(req, res, next) {
    try {
        req.session.destroy(() => res.clearCookie("sid"));
        return res.status(200).json("User has been logged out");
    } catch(err) {
        next(err);
    }
}

module.exports = { 
    signup,
    login, 
    logout 
}