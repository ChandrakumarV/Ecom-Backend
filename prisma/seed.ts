import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "$2b$10$.onD7sqcJl0wF6wzDABluu/aoITzjVBszsdYw1ckaDZIfqWfD/LDm",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "$2b$10$.onD7sqcJl0wF6wzDABluu/aoITzjVBszsdYw1ckaDZIfqWfD/LDm",
  },
];

const products = [
  {
    name: "Laptop",
    detail: "High performance laptop",
    price: 1200,
    rating: 4,
    sales: 200,
  },
  {
    name: "Headphones",
    detail: "Noise-cancelling headphones",
    price: 300,
    rating: 5,
    sales: 150,
  },
  {
    name: "Smartphone",
    detail: "Latest model smartphone",
    price: 800,
    rating: 4,
    sales: 500,
  },
];
async function main() {
  const usersRes = await Promise.all(
    users.map(async (user) => {
      return prisma.user.create({
        data: user,
      });
    })
  );
  const productsRes = await Promise.all(
    products.map(async (product) => {
      return prisma.product.create({
        data: product,
      });
    })
  );

  const carts = [
    {
      userId: usersRes[0].id,
      productId: productsRes[0].id,
      quantity: 1,
    },
    {
      userId: usersRes[1].id,
      productId: productsRes[1].id,
      quantity: 2,
    },
    {
      userId: usersRes[1].id,
      productId: productsRes[2].id,
      quantity: 1,
    },
  ];

  await Promise.all(
    carts.map(async (cart) => {
      return prisma.cart.create({
        data: cart,
      });
    })
  );
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
