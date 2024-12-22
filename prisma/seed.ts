import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      password: "securepass456",
    },
    {
      first_name: "Michael",
      last_name: "Brown",
      email: "michael.brown@example.com",
      password: "pass789secure",
    },
    {
      first_name: "Emily",
      last_name: "Davis",
      email: "emily.davis@example.com",
      password: "emily@2024",
    },
    {
      first_name: "Chris",
      last_name: "Taylor",
      email: "chris.taylor@example.com",
      password: "taylorpassword",
    },
  ];

  // user seed
  for (const user of users) {
    const userData = await prisma.user.create({
      data: user,
    });

    const token = randomBytes(32).toString("hex");

    await prisma.token.create({
      data: {
        userId: userData.id,
        token: token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // Token expires in 24 hours
      },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
