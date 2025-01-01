"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartSchema = exports.addCartSchema = void 0;
const zod_1 = require("zod");
exports.addCartSchema = zod_1.z.object({
    productId: zod_1.z.number()
});
exports.updateCartSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(1)
});
