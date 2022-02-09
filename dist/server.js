"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const server = new app_1.default();
process.on('uncaughtException', error => {
    console.log('Uncaught Exception!', error);
    process.exit(1);
});
process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection!', error);
    process.exit(1);
});
server.listen();
