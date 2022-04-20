const User = require("../models/User");
const APIError = require("../errors/APIError");

// Get a user
async function getUser(req, res, next) {
    const { uname } = req.params;

    try {
        // Check if user exists
        const user = await User.findOne({ username: uname }).populate("posts");
        if (!user) return next(new APIError(404, "User not found"));

        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

module.exports = { getUser };