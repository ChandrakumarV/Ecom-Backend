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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.user;
    try {
        // check exiting user
        const user = yield prisma.user.findUnique({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                _count: { select: { cart: true } }
            },
            where: { id }
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const { _count } = user, userData = __rest(user, ["_count"]);
        const structuredData = Object.assign({ cartCount: _count.cart }, userData);
        res.json(structuredData);
    }
    catch (_a) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userId = req.body.user.id;
    delete body.user;
    try {
        if (body.password) {
            body.password = yield bcrypt_1.default.hash(body.password, 10);
        }
        const user = yield prisma.user.update({
            data: Object.assign({}, body),
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.send({ message: 'profile updated' });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error', message: err });
    }
});
exports.updateProfile = updateProfile;
