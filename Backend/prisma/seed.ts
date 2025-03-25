// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { seedProjects } from "./seeders/projectSeeder";
import { seedUsers } from "./seeders/userSeeder";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Running seeders...");

  await seedProjects();
  await seedUsers();

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
