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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: '$2b$10$.onD7sqcJl0wF6wzDABluu/aoITzjVBszsdYw1ckaDZIfqWfD/LDm'
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: '$2b$10$.onD7sqcJl0wF6wzDABluu/aoITzjVBszsdYw1ckaDZIfqWfD/LDm'
    }
];
const products = [
    {
        name: 'Laptop',
        detail: 'High performance laptop',
        price: 1200,
        rating: 4,
        sales: 200,
        seller: 'chandru',
        offer: 3.3
    },
    {
        name: 'Headphones',
        detail: 'Noise-cancelling headphones',
        price: 300,
        rating: 5,
        sales: 150,
        seller: 'naresh',
        offer: 3.3
    },
    {
        name: 'Smartphone',
        detail: 'Latest model smartphone',
        price: 800,
        rating: 4,
        sales: 500,
        seller: 'vijay',
        offer: 3.3
    }
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const usersRes = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
            return prisma.user.create({
                data: user
            });
        })));
        const productsRes = yield Promise.all(products.map((product) => __awaiter(this, void 0, void 0, function* () {
            return prisma.product.create({
                data: product
            });
        })));
        const carts = [
            {
                userId: usersRes[0].id,
                productId: productsRes[0].id,
                quantity: 1
            },
            {
                userId: usersRes[1].id,
                productId: productsRes[1].id,
                quantity: 2
            },
            {
                userId: usersRes[1].id,
                productId: productsRes[2].id,
                quantity: 1
            }
        ];
        yield Promise.all(carts.map((cart) => __awaiter(this, void 0, void 0, function* () {
            return prisma.cart.create({
                data: cart
            });
        })));
    });
}
main()
    .catch((e) => {
    throw e;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
