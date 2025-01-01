"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const cart_1 = __importDefault(require("./cart"));
const products_1 = __importDefault(require("./products"));
const user_1 = __importDefault(require("./user"));
const tokenValidation_1 = require("../middleware/tokenValidation");
const profile_1 = __importDefault(require("./profile"));
const router = express_1.default.Router();
router.use('/', auth_1.default);
router.use('/products', tokenValidation_1.tokenValidation, products_1.default);
router.use('/cart', tokenValidation_1.tokenValidation, cart_1.default);
router.use('/user', tokenValidation_1.tokenValidation, user_1.default);
router.use('/profile', tokenValidation_1.tokenValidation, profile_1.default);
exports.default = router;
