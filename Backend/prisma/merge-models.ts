import fs from "fs";
import path from "path";

const modelsPath = path.join(__dirname, "models");
const schemaPath = path.join(__dirname, "schema.prisma");

// Load header (datasource & generator)
const baseSchema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
`;

const modelFiles = fs.readdirSync(modelsPath)
  .filter(file => file.endsWith(".prisma"))
  .map(file => fs.readFileSync(path.join(modelsPath, file), "utf8"));

// Merge & write schema.prisma
fs.writeFileSync(schemaPath, `${baseSchema}\n\n${modelFiles.join("\n\n")}`);

console.log("✅ Prisma schema generated successfully!");
