"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Import controller
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
userRouter.get('/:uname', userController_1.getUser);
exports.default = userRouter;
