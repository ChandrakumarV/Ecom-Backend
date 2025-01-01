"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const tokenValidation_1 = require("../../middleware/tokenValidation");
const validationMiddleware_1 = require("../../middleware/validationMiddleware");
const authSchema_1 = require("../../schemas/authSchema");
const loginRouter = express_1.default.Router();
loginRouter.post('/login', (0, validationMiddleware_1.validateData)(authSchema_1.loginSchema), controller_1.login);
loginRouter.post('/register', (0, validationMiddleware_1.validateData)(authSchema_1.registrationSchema), controller_1.register);
loginRouter.delete('/logout', tokenValidation_1.tokenValidation, controller_1.logout);
exports.default = loginRouter;
