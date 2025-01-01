"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.decodeToken = decodeToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken({ userId, email }) {
    const token = jsonwebtoken_1.default.sign({ userId, email }, process.env.SECRET_KEY, {
        expiresIn: '1h'
    });
    return token;
}
function decodeToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        return decoded;
    }
    catch (_a) {
        throw new Error('Invalid or expired token');
    }
}
