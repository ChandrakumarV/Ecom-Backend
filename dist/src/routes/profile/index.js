"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validationMiddleware_1 = require("../../middleware/validationMiddleware");
const profileSchema_1 = require("../../schemas/profileSchema");
const profileRouter = express_1.default.Router();
profileRouter.get('/', controller_1.getProfile);
profileRouter.post('/', (0, validationMiddleware_1.validateData)(profileSchema_1.updateProfileSchema), controller_1.updateProfile);
exports.default = profileRouter;
