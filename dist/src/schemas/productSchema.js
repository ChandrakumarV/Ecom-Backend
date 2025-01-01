"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.addProductSchema = void 0;
const zod_1 = require("zod");
exports.addProductSchema = zod_1.z.object({
    name: zod_1.z.string().max(20),
    detail: zod_1.z.string().max(40),
    price: zod_1.z.number(),
    rating: zod_1.z.number().max(5),
    sales: zod_1.z.number()
});
exports.updateProductSchema = exports.addProductSchema;
