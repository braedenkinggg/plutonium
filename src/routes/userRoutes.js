const { Router } = require("express");

// Import controller
const { getUser } = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/:uname", getUser);

module.exports = userRouter;