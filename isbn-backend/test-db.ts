import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaMariaDb(connectionString);

const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
});

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connection successful!");

    // Try a simple query
    const userCount = await prisma.user.count();
    console.log(`📊 User count: ${userCount}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
