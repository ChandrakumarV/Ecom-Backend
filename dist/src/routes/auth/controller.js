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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const client_1 = require("@prisma/client");
const token_1 = require("../../utils/token");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).json({ error: 'Email or Password missing' });
        return;
    }
    try {
        // check user is exit or not
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        //valid password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Incorrect Password' });
            return;
        }
        const token = (0, token_1.generateToken)({ userId: user.id, email });
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        yield prisma.token.upsert({
            where: {
                userId: user.id
            },
            create: {
                token,
                expiresAt,
                userId: user.id
            },
            update: {
                token,
                expiresAt
            }
        });
        res.json({ token });
    }
    catch (_a) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            res.status(400).json({ error: 'User already exist' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        //create user
        const user = yield prisma.user.create({
            data: { firstName, lastName, email, password: hashedPassword }
        });
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.register = register;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, token } = req.body.user;
        // Delete the token
        yield prisma.token.deleteMany({
            where: {
                userId: id,
                token
            }
        });
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.logout = logout;
