"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_model_1 = __importDefault(require("../models/post.model"));
class HomeController {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.index = async (req, res, next) => {
            try {
                const posts = await post_model_1.default.find();
                if (posts.length === 0)
                    return next();
                res.status(200).render('pages/index', {
                    title: 'Home',
                    posts: posts
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(`${this.path}/`, this.index);
    }
}
exports.default = HomeController;
