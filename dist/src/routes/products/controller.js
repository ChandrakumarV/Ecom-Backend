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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.udpateProduct = exports.addProduct = exports.getProduct = exports.getProducts = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.user.id;
    try {
        const products = yield prisma.product.findMany({
            include: {
                cart: {
                    where: {
                        userId
                    }
                }
            }
        });
        const structuredData = products.map((product) => {
            const { cart } = product, rest = __rest(product, ["cart"]);
            return Object.assign(Object.assign({}, rest), { isAddedToCart: cart.length > 0 });
        });
        res.status(200).json(structuredData);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: 'Internal server error', message: err === null || err === void 0 ? void 0 : err.message });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user.id;
        const product_id = +req.params.id;
        const product = yield prisma.product.findUnique({
            where: { id: product_id },
            include: {
                cart: {
                    where: {
                        userId
                    }
                }
            }
        });
        const _a = product, { cart } = _a, rest = __rest(_a, ["cart"]);
        res.status(200).json(Object.assign(Object.assign({}, rest), { isAddedToCart: cart.length > 0 }));
    }
    catch (err) {
        res
            .status(500)
            .json({ error: 'Internal server error', message: err === null || err === void 0 ? void 0 : err.message });
    }
});
exports.getProduct = getProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { detail, name, price, rating, sales, offer, seller } = req.body;
        const products = yield prisma.product.create({
            data: { detail, name, price, rating, sales, offer, seller }
        });
        res.status(200).json(products);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: 'Internal server error', message: err === null || err === void 0 ? void 0 : err.message });
    }
});
exports.addProduct = addProduct;
const udpateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = +req.params.id;
        const body = req.body;
        delete body.userId;
        if (!body) {
            throw new Error('Body cannot be empty');
        }
        const product = yield prisma.product.update({
            data: Object.assign({}, body),
            where: { id: product_id }
        });
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json({
            error: err.meta.cause || err.message || 'Internal server error'
        });
    }
});
exports.udpateProduct = udpateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = +req.params.id;
        const product = yield prisma.product.delete({
            where: { id: product_id }
        });
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json({
            error: err.meta.cause || err.message || 'Internal server error'
        });
    }
});
exports.deleteProduct = deleteProduct;
