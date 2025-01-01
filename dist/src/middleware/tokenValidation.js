"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = tokenValidation;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function tokenValidation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: "Token doesn't exist" });
            return;
        }
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const token = authHeader.split(' ')[1];
        const storedToken = yield prisma.token.findUnique({
            where: { token }
        });
        if (!storedToken || new Date() > (storedToken === null || storedToken === void 0 ? void 0 : storedToken.expiresAt)) {
            res.status(401).json({ error: 'Token expired or invalid' });
            return;
        }
        const user = yield prisma.user.findUnique({
            where: { id: storedToken.userId }
        });
        req.body.user = Object.assign(Object.assign({}, user), { token });
        next();
    });
}
