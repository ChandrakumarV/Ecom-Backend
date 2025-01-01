"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registrationSchema = void 0;
const zod_1 = require("zod");
exports.registrationSchema = zod_1.z.object({
    firstName: zod_1.z.string().max(15),
    lastName: zod_1.z.string().max(15),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(12)
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string().min(8)
});
