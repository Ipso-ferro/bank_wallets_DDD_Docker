"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InitControllers_1 = require("./initializers/InitControllers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// console.log(process.env)
const listApiController = (0, InitControllers_1.createControllers)();
listApiController.forEach((controller) => {
    app.use(controller.path, controller.router());
});
app.listen(process.env.SERVER_PORT, () => {
    console.log("working");
});
