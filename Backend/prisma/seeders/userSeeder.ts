// seeders/userSeeder.ts
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedUsers() {
  const plainPassword = "0";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.user.createMany({
    data: [
      {
        email: "admin@gmail.com",
        name: "admin",
        password: hashedPassword,
      },
      {
        email: "nelson@example.com",
        name: "nelson",
        password: hashedPassword,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ User seeder complete!");
}
