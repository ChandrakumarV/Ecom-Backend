import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    password: "hashed_password_123", // Replace with actual hashed password
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    password: "hashed_password_456", // Replace with actual hashed password
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
