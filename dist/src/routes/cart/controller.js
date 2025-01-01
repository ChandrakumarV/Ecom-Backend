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
exports.removeCart = exports.udpateCart = exports.addCart = exports.getCarts = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user.id;
        const carts = yield prisma.cart.findMany({
            where: { userId },
            select: { id: true, createdAt: true, quantity: true, product: true }
        });
        const structuredData = carts.map((cart) => {
            const { product } = cart, rest = __rest(cart, ["product"]);
            return Object.assign(Object.assign(Object.assign({}, product), rest), { productId: product.id });
        });
        res.status(200).json(structuredData);
    }
    catch (error) {
        res.status(500).json({
            error: errorfind(error)
        });
    }
});
exports.getCarts = getCarts;
const addCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +req.body.user.id;
        const productId = +req.body.productId;
        const carts = yield prisma.cart.create({
            data: { quantity: 1, productId, userId }
        });
        res.status(201).json({ message: 'Cart Added', carts });
    }
    catch (error) {
        res.status(500).json({
            error: errorfind(error)
        });
    }
});
exports.addCart = addCart;
const udpateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = +req.params.id;
        const quantity = +req.body.quantity;
        if (!quantity) {
            throw new Error('Quantity is missing');
        }
        const carts = yield prisma.cart.update({
            data: { quantity },
            where: { id: cartId }
        });
        res.status(200).json({ message: 'Cart Updated', carts });
    }
    catch (error) {
        res.status(500).json({
            error: errorfind(error)
        });
    }
});
exports.udpateCart = udpateCart;
const removeCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = +req.params.id;
        const carts = yield prisma.cart.delete({
            where: { id: cartId }
        });
        res.status(200).json({ message: 'Cart removed', carts });
    }
    catch (error) {
        res.status(500).json({
            error: errorfind(error)
        });
    }
});
exports.removeCart = removeCart;
const errorfind = (err) => {
    var _a;
    console.log(err);
    return (err === null || err === void 0 ? void 0 : err.message) || ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.cause) || 'Internal server error';
};
