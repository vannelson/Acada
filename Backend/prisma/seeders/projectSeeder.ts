import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function seedProjects() {
  console.log("🌱 Seeding Projects...");

  const projects = Array.from({ length: 5000 }).map(() => ({
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(3).slice(0, 250), // Truncate to 250 chars
  }));

  await prisma.project.createMany({ data: projects });

  console.log("✅ 5,000 projects added.");
}
