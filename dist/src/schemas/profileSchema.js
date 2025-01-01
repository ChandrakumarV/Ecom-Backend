"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    firstName: zod_1.z.string().max(20),
    lastName: zod_1.z.string().max(40),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().optional()
});
